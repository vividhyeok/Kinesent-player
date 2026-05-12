function PlayerProgressBar({
  currentSceneIndex,
  disabled,
  onJump,
  totalScenes,
}) {
  if (totalScenes <= 1) {
    return null
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium text-slate-400">
        <span>씬 이동</span>
        <span>
          {currentSceneIndex + 1} / {totalScenes}
        </span>
      </div>
      <div
        aria-label="씬 진행 바"
        className="flex w-full items-center gap-1"
        role="group"
      >
        {Array.from({ length: totalScenes }, (_, sceneIndex) => {
          const isActive = sceneIndex === currentSceneIndex
          const isVisited = sceneIndex < currentSceneIndex

          return (
            <button
              aria-label={`${sceneIndex + 1}번 씬으로 이동`}
              className={`h-3 min-w-0 flex-1 rounded-full transition ${
                isActive
                  ? 'bg-cyan-300 shadow-[0_0_0_1px_rgba(103,232,249,0.45)]'
                  : isVisited
                    ? 'bg-emerald-300/45 hover:bg-emerald-300/60'
                    : 'bg-white/12 hover:bg-white/20'
              } disabled:cursor-not-allowed disabled:bg-white/10`}
              disabled={disabled}
              key={sceneIndex}
              onClick={() => onJump(sceneIndex)}
              type="button"
            >
              <span className="sr-only">{sceneIndex + 1}번 씬으로 이동</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerProgressBar
