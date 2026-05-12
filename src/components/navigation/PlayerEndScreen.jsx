function PlayerEndScreen({
  isVisible,
  onClose,
  onRestart,
}) {
  if (!isVisible) {
    return null
  }

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/38 px-6 py-8 backdrop-blur-[3px]"
      data-stage-interactive="true"
    >
      <div className="w-full max-w-lg rounded-[2rem] border border-white/12 bg-slate-950/82 px-8 py-8 text-center shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
          발표 종료
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          발표가 끝났습니다
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          처음부터 다시 보거나 현재 마지막 씬에 그대로 머무를 수 있습니다.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            className="inline-flex items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/12 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/65 hover:bg-cyan-300/20"
            onClick={onRestart}
            type="button"
          >
            처음으로
          </button>
          <button
            className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/22 hover:bg-white/10"
            onClick={onClose}
            type="button"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlayerEndScreen
