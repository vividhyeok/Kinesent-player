import { useEffect, useRef } from 'react'
import { PRELOAD_SCENE_RADIUS } from '../lib/constants.js'

function createImagePreload(assetUrl) {
  const image = new Image()

  image.decoding = 'async'
  image.loading = 'eager'
  image.fetchPriority = 'high'
  image.src = assetUrl
  image.decode?.().catch(() => {})

  return () => {
    image.src = ''
  }
}

function createVideoPreload(assetUrl) {
  const video = document.createElement('video')

  video.preload = 'auto'
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.src = assetUrl
  video.load()

  return () => {
    video.pause()
    video.removeAttribute('src')
    video.load()
  }
}

function cleanupPreloadMap(preloadMap) {
  preloadMap.forEach((cleanup) => cleanup())
  preloadMap.clear()
}

export function useScenePreload(presentation, currentSceneIndex) {
  const preloadCleanupMapRef = useRef(new Map())

  useEffect(() => {
    const preloadCleanupMap = preloadCleanupMapRef.current

    return () => {
      cleanupPreloadMap(preloadCleanupMap)
    }
  }, [])

  useEffect(() => {
    const preloadCleanupMap = preloadCleanupMapRef.current

    if (!presentation) {
      cleanupPreloadMap(preloadCleanupMap)
      return undefined
    }

    const nextActiveKeys = new Set()
    const startIndex = Math.max(0, currentSceneIndex - PRELOAD_SCENE_RADIUS)
    const endIndex = Math.min(
      presentation.scenes.length - 1,
      currentSceneIndex + PRELOAD_SCENE_RADIUS,
    )

    for (let sceneIndex = startIndex; sceneIndex <= endIndex; sceneIndex += 1) {
      const scene = presentation.scenes[sceneIndex]

      if (!scene?.assetUrl || scene.type === 'animated') {
        continue
      }

      // 현재 loop 씬은 실제 렌더러가 재생을 담당하므로 중복 preload를 만들지 않습니다.
      if (scene.type === 'loop' && sceneIndex === currentSceneIndex) {
        continue
      }

      const preloadKey = `${scene.type}:${scene.id}:${scene.assetUrl}`
      nextActiveKeys.add(preloadKey)

      if (!preloadCleanupMap.has(preloadKey)) {
        const cleanup =
          scene.type === 'loop'
            ? createVideoPreload(scene.assetUrl)
            : createImagePreload(scene.assetUrl)

        preloadCleanupMap.set(preloadKey, cleanup)
      }
    }

    preloadCleanupMap.forEach((cleanup, preloadKey) => {
      if (nextActiveKeys.has(preloadKey)) {
        return
      }

      cleanup()
      preloadCleanupMap.delete(preloadKey)
    })

    return undefined
  }, [presentation, currentSceneIndex])
}
