function SceneCounterBadge({ currentSceneNumber, totalScenes, isFullscreen }) {
  if (isFullscreen) {
    return null
  }

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-slate-950/78 px-4 py-2 text-sm text-slate-100 shadow-[0_12px_36px_rgba(2,6,23,0.42)] backdrop-blur-md">
      <span className="font-medium text-slate-300">현재 씬 / 전체 씬</span>
      <strong className="text-base font-semibold text-white">
        {currentSceneNumber} / {totalScenes}
      </strong>
    </div>
  )
}

export default SceneCounterBadge
