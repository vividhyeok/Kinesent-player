function PlayerPrevButton({ disabled, onClick }) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-full border border-sky-300/35 bg-sky-300/12 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:border-sky-200/60 hover:bg-sky-300/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-slate-500"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      이전 씬
    </button>
  )
}

export default PlayerPrevButton
