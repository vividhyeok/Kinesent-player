function LoadingOverlay({ label, percent }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/76 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-slate-900/90 px-6 py-7 shadow-2xl shadow-slate-950/40">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-300" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              불러오는 중
            </p>
            <p className="mt-2 text-base leading-7 text-slate-200">{label}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-200 transition-[width] duration-200"
              style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
            />
          </div>
          <p className="mt-2 text-right text-sm text-slate-400">{percent}%</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay
