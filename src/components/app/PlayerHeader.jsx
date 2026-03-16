import FullscreenButton from '../overlay/FullscreenButton.jsx'
import SceneCounterBadge from '../overlay/SceneCounterBadge.jsx'
import ZipOpenButton from '../loader/ZipOpenButton.jsx'

function PlayerHeader({
  title,
  sourceFileName,
  currentSceneNumber,
  totalScenes,
  isFullscreen,
  isFullscreenSupported,
  onToggleFullscreen,
  onFileSelect,
  onFileReject,
  isBusy,
}) {
  if (isFullscreen) {
    return null
  }

  return (
    <header className="shrink-0 px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/56 px-5 py-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            발표 재생
          </p>
          <h1 className="mt-2 truncate text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {title}
          </h1>
          <p className="mt-1 truncate text-sm text-slate-400">
            {sourceFileName || 'ZIP 파일을 열면 발표 제목과 파일명이 표시됩니다.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SceneCounterBadge
            currentSceneNumber={currentSceneNumber}
            isFullscreen={isFullscreen}
            totalScenes={totalScenes}
          />
          <ZipOpenButton
            disabled={isBusy}
            label="ZIP 열기"
            onFileReject={onFileReject}
            onFileSelect={onFileSelect}
          />
          <FullscreenButton
            disabled={!isFullscreenSupported}
            isFullscreen={isFullscreen}
            onClick={onToggleFullscreen}
          />
        </div>
      </div>
    </header>
  )
}

export default PlayerHeader
