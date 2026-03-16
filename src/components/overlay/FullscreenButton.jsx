function FullscreenButton({ disabled, isFullscreen, onClick }) {
  if (isFullscreen) {
    return null
  }

  return (
    <button
      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:border-white/25 hover:bg-white/10 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-slate-500"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      전체화면
    </button>
  )
}

export default FullscreenButton
