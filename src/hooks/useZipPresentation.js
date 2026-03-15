import { startTransition, useEffect, useRef, useState } from 'react'
import { createAssetUrlRegistry } from '../lib/assetUrlRegistry.js'
import {
  ANIMATED_EXTENSIONS,
  IMAGE_EXTENSIONS,
  LOOP_VIDEO_EXTENSIONS,
  MANIFEST_FILE_NAME,
} from '../lib/constants.js'
import { validateManifest } from '../lib/manifestValidation.js'
import {
  getArchiveEntry,
  getFileExtension,
  guessMimeTypeFromPath,
  isZipFileCandidate,
  normalizeZipPath,
  openZipArchive,
  readZipBlob,
  readZipText,
} from '../lib/zipReader.js'
import { analyzeSvgMarkup, findMissingHighlightIds } from '../lib/svgHighlightParser.js'

const IDLE_LOADING_STATE = {
  label: '',
  percent: 0,
}

function createLoadError(title, messages) {
  return {
    title,
    messages: messages.filter(Boolean),
  }
}

function normalizeCaughtError(error) {
  if (error?.name === 'AbortPresentationLoad') {
    return null
  }

  if (error?.title && Array.isArray(error.messages)) {
    return error
  }

  return createLoadError('ZIP 파일을 열지 못했습니다.', [
    error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    '다른 ZIP 파일로 다시 시도해 주세요.',
  ])
}

function assertSceneAssetType(scene) {
  const extension = getFileExtension(scene.asset)

  if (scene.type === 'static' && !IMAGE_EXTENSIONS.has(extension)) {
    throw createLoadError(`"${scene.title}" 씬의 에셋 형식을 확인해 주세요.`, [
      'static 씬은 이미지 파일만 지원합니다.',
      `현재 확장자: ${extension || '없음'}`,
    ])
  }

  if (scene.type === 'loop' && !LOOP_VIDEO_EXTENSIONS.has(extension)) {
    throw createLoadError(`"${scene.title}" 씬의 에셋 형식을 확인해 주세요.`, [
      'loop 씬은 mp4 파일만 지원합니다.',
      `현재 확장자: ${extension || '없음'}`,
    ])
  }

  if (scene.type === 'animated' && !ANIMATED_EXTENSIONS.has(extension)) {
    throw createLoadError(`"${scene.title}" 씬의 에셋 형식을 확인해 주세요.`, [
      'animated 씬은 SVG 파일만 지원합니다.',
      `현재 확장자: ${extension || '없음'}`,
    ])
  }
}

function createProgressUpdater(setLoadingState, totalAssets) {
  return (index, percent, sceneTitle) => {
    const safeTotal = Math.max(totalAssets, 1)
    const computedPercent = 35 + ((index + percent / 100) / safeTotal) * 55

    setLoadingState({
      label: `"${sceneTitle}" 씬 에셋을 준비하는 중입니다.`,
      percent: Math.min(95, Math.max(35, Math.round(computedPercent))),
    })
  }
}

function getAssetCacheKey(sceneType, assetPath) {
  return sceneType === 'animated' ? `svg:${assetPath}` : `blob:${assetPath}`
}

function createArchiveAssetSummary(scenes, archiveEntries) {
  const missingAssets = []

  scenes.forEach((scene) => {
    const normalizedAssetPath = normalizeZipPath(scene.asset)

    if (!getArchiveEntry(archiveEntries, normalizedAssetPath)) {
      missingAssets.push({
        sceneTitle: scene.title,
        assetPath: normalizedAssetPath,
      })
    }
  })

  return {
    missingAssets,
  }
}

export function useZipPresentation() {
  const [status, setStatus] = useState('idle')
  const [presentation, setPresentation] = useState(null)
  const [loadingState, setLoadingState] = useState(IDLE_LOADING_STATE)
  const [error, setError] = useState(null)
  const activeRegistryRef = useRef(createAssetUrlRegistry())
  const loadTokenRef = useRef(0)

  useEffect(() => {
    return () => {
      activeRegistryRef.current.revokeAll()
    }
  }, [])

  function replaceActiveRegistry() {
    activeRegistryRef.current.revokeAll()
    activeRegistryRef.current = createAssetUrlRegistry()
    return activeRegistryRef.current
  }

  function setManualError(title, messages) {
    replaceActiveRegistry()
    setPresentation(null)
    setStatus('error')
    setLoadingState(IDLE_LOADING_STATE)
    setError(createLoadError(title, messages))
  }

  function clearError() {
    setError(null)
    setLoadingState(IDLE_LOADING_STATE)
    setStatus(presentation ? 'ready' : 'idle')
  }

  async function loadPresentation(file) {
    const nextLoadToken = loadTokenRef.current + 1
    loadTokenRef.current = nextLoadToken

    const registry = replaceActiveRegistry()

    function ensureCurrentLoad() {
      if (loadTokenRef.current !== nextLoadToken) {
        registry.revokeAll()
        const abortError = new Error('최신 ZIP 로드 요청으로 교체되었습니다.')
        abortError.name = 'AbortPresentationLoad'
        throw abortError
      }
    }

    try {
      if (!isZipFileCandidate(file)) {
        throw createLoadError('ZIP 파일 형식을 확인해 주세요.', [
          '.zip 파일만 열 수 있습니다.',
        ])
      }

      setStatus('loading')
      setError(null)
      setLoadingState({
        label: 'ZIP 파일을 여는 중입니다.',
        percent: 5,
      })

      const archive = await openZipArchive(file)
      ensureCurrentLoad()

      if (!archive.manifestEntry) {
        throw createLoadError(`${MANIFEST_FILE_NAME}을 찾을 수 없습니다.`, [
          'ZIP 루트에 manifest.json이 포함되어 있는지 확인해 주세요.',
        ])
      }

      setLoadingState({
        label: `${MANIFEST_FILE_NAME}을 읽는 중입니다.`,
        percent: 18,
      })

      const manifestText = await readZipText(archive.manifestEntry, (percent) => {
        setLoadingState({
          label: `${MANIFEST_FILE_NAME}을 읽는 중입니다.`,
          percent: Math.max(18, Math.min(30, Math.round(18 + percent * 0.12))),
        })
      })

      ensureCurrentLoad()

      let manifest

      try {
        manifest = JSON.parse(manifestText)
      } catch {
        throw createLoadError(`${MANIFEST_FILE_NAME} 형식이 올바르지 않습니다.`, [
          'JSON 문법 오류가 없는지 확인해 주세요.',
        ])
      }

      const validationResult = validateManifest(manifest)

      if (!validationResult.isValid) {
        throw createLoadError(`${MANIFEST_FILE_NAME} 검증에 실패했습니다.`, [
          ...validationResult.errors,
        ])
      }

      const archiveAssetSummary = createArchiveAssetSummary(
        manifest.scenes,
        archive.entries,
      )

      if (archiveAssetSummary.missingAssets.length > 0) {
        throw createLoadError('ZIP 안에 누락된 에셋 파일이 있습니다.', [
          'manifest.json에는 정의되어 있지만 ZIP 내부에서 찾지 못한 파일이 있습니다.',
          ...archiveAssetSummary.missingAssets.map(
            (item) => `"${item.sceneTitle}" 씬: ${item.assetPath}`,
          ),
          '에디터에서 다시 export하거나 누락된 assets 파일을 포함해 주세요.',
        ])
      }

      const uniqueAssetPaths = [
        ...new Set(manifest.scenes.map((scene) => normalizeZipPath(scene.asset))),
      ]
      const updateAssetProgress = createProgressUpdater(
        setLoadingState,
        uniqueAssetPaths.length,
      )
      const assetCache = new Map()
      const processedScenes = []

      for (let sceneIndex = 0; sceneIndex < manifest.scenes.length; sceneIndex += 1) {
        ensureCurrentLoad()

        const scene = manifest.scenes[sceneIndex]
        const normalizedAssetPath = normalizeZipPath(scene.asset)
        const assetCacheKey = getAssetCacheKey(scene.type, normalizedAssetPath)
        assertSceneAssetType(scene)

        if (!assetCache.has(assetCacheKey)) {
          const assetEntry = getArchiveEntry(archive.entries, normalizedAssetPath)
          const assetOrder = uniqueAssetPaths.indexOf(normalizedAssetPath)
          const mimeType = guessMimeTypeFromPath(normalizedAssetPath)

          if (scene.type === 'animated') {
            const svgMarkup = await readZipText(assetEntry, (percent) => {
              updateAssetProgress(assetOrder, percent, scene.title)
            })

            ensureCurrentLoad()

            const analyzedSvg = analyzeSvgMarkup(svgMarkup)
            const missingIds = findMissingHighlightIds(
              analyzedSvg.ids,
              scene.highlightOrder,
            )

            if (missingIds.length > 0) {
              throw createLoadError(
                `"${scene.title}" 씬의 highlightOrder를 확인해 주세요.`,
                [
                  `SVG 내부에 없는 id: ${missingIds.join(', ')}`,
                  '에디터에서 SVG ID와 highlightOrder를 다시 확인한 뒤 export해 주세요.',
                ],
              )
            }

            assetCache.set(assetCacheKey, {
              path: normalizedAssetPath,
              mimeType,
              svgMarkup: analyzedSvg.svgMarkup,
              assetUrl: null,
            })
          } else {
            const assetBlob = await readZipBlob(assetEntry, mimeType, (percent) => {
              updateAssetProgress(assetOrder, percent, scene.title)
            })

            ensureCurrentLoad()

            assetCache.set(assetCacheKey, {
              path: normalizedAssetPath,
              mimeType,
              svgMarkup: null,
              assetUrl: registry.register(normalizedAssetPath, assetBlob),
            })
          }
        }

        const assetData = assetCache.get(assetCacheKey)

        processedScenes.push({
          ...scene,
          asset: normalizedAssetPath,
          highlightOrder: Array.isArray(scene.highlightOrder)
            ? scene.highlightOrder
            : [],
          assetUrl: assetData.assetUrl,
          assetMimeType: assetData.mimeType,
          svgMarkup: assetData.svgMarkup,
        })
      }

      ensureCurrentLoad()

      setLoadingState({
        label: '발표 화면을 준비하는 중입니다.',
        percent: 100,
      })

      startTransition(() => {
        setPresentation({
          sourceFileName: file.name,
          title: manifest.title,
          scenes: processedScenes,
        })
        setStatus('ready')
        setLoadingState(IDLE_LOADING_STATE)
        setError(null)
      })
    } catch (caughtError) {
      const normalizedError = normalizeCaughtError(caughtError)

      if (!normalizedError) {
        return
      }

      registry.revokeAll()
      setPresentation(null)
      setStatus('error')
      setLoadingState(IDLE_LOADING_STATE)
      setError(normalizedError)
    }
  }

  return {
    status,
    presentation,
    loadingState,
    error,
    loadPresentation,
    clearError,
    setManualError,
  }
}
