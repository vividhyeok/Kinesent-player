import { useRef } from 'react'
import PlayerFooter from './components/app/PlayerFooter.jsx'
import PlayerHeader from './components/app/PlayerHeader.jsx'
import PlayerShell from './components/app/PlayerShell.jsx'
import PlayerStage from './components/app/PlayerStage.jsx'
import LoadErrorPanel from './components/loader/LoadErrorPanel.jsx'
import LoadingOverlay from './components/loader/LoadingOverlay.jsx'
import ZipDropzone from './components/loader/ZipDropzone.jsx'
import ZipOpenButton from './components/loader/ZipOpenButton.jsx'
import KeyboardShortcutLayer from './components/navigation/KeyboardShortcutLayer.jsx'
import TriggerController from './components/navigation/TriggerController.jsx'
import PlaybackHint from './components/overlay/PlaybackHint.jsx'
import SceneRenderer from './components/scene/SceneRenderer.jsx'
import { useFullscreen } from './hooks/useFullscreen.js'
import { usePresentationState } from './hooks/usePresentationState.js'
import { useScenePreload } from './hooks/useScenePreload.js'
import { useZipPresentation } from './hooks/useZipPresentation.js'
import { PLAYER_TITLE } from './lib/constants.js'

function App() {
  const shellRef = useRef(null)
  const { isFullscreen, isFullscreenSupported, toggleFullscreen } = useFullscreen(
    shellRef,
  )
  const {
    clearError,
    error,
    loadPresentation,
    loadingState,
    presentation,
    setManualError,
    status,
  } = useZipPresentation()
  const {
    currentScene,
    currentSceneIndex,
    revealedHighlightCount,
    totalScenes,
    triggerNext,
  } = usePresentationState(presentation)

  useScenePreload(presentation, currentSceneIndex)

  function handleFileReject(message) {
    setManualError('ZIP 파일 형식을 확인해 주세요.', [message])
  }

  const currentSceneNumber = totalScenes > 0 ? currentSceneIndex + 1 : 0
  const isReady = status === 'ready'
  const isLoading = status === 'loading'
  const shouldRenderScene = Boolean(presentation && currentScene && status !== 'error')

  return (
    <ZipDropzone
      disabled={isLoading}
      onFileReject={handleFileReject}
      onFileSelect={loadPresentation}
    >
      <PlayerShell ref={shellRef}>
        <PlayerHeader
          currentSceneNumber={currentSceneNumber}
          isBusy={isLoading}
          isFullscreen={isFullscreen}
          isFullscreenSupported={isFullscreenSupported}
          onFileReject={handleFileReject}
          onFileSelect={loadPresentation}
          onToggleFullscreen={toggleFullscreen}
          sourceFileName={presentation?.sourceFileName}
          title={presentation?.title || PLAYER_TITLE}
          totalScenes={totalScenes}
        />

        <PlayerStage>
          {status === 'error' ? (
            <LoadErrorPanel error={error} onClear={clearError}>
              <ZipOpenButton
                label="다른 ZIP 열기"
                onFileReject={handleFileReject}
                onFileSelect={loadPresentation}
              />
            </LoadErrorPanel>
          ) : null}

          {status !== 'error' && !shouldRenderScene ? (
            <div className="flex h-full w-full items-center justify-center px-6 py-8">
              <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 px-8 py-10 text-center shadow-2xl shadow-slate-950/30 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                  플레이어 대기 중
                </p>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  ZIP 파일을 열어 발표를 시작하세요
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
                  화면 위로 ZIP 파일을 드래그하거나 아래 버튼으로 발표 ZIP을 선택할 수 있습니다.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <ZipOpenButton
                    className="px-6 py-3 text-base"
                    label="ZIP 파일 선택"
                    onFileReject={handleFileReject}
                    onFileSelect={loadPresentation}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {shouldRenderScene ? (
            <SceneRenderer
              revealedHighlightCount={revealedHighlightCount}
              scene={currentScene}
            />
          ) : null}

          {isLoading ? (
            <LoadingOverlay
              label={loadingState.label}
              percent={loadingState.percent}
            />
          ) : null}
        </PlayerStage>

        <PlayerFooter>
          <PlaybackHint isPresentationReady={isReady} />
          <TriggerController disabled={!isReady || !currentScene} onTrigger={triggerNext} />
        </PlayerFooter>

        <KeyboardShortcutLayer enabled={isReady} onTrigger={triggerNext} />
      </PlayerShell>
    </ZipDropzone>
  )
}

export default App
