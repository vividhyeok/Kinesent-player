function TriggerController({ disabled, onTrigger }) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-300/12 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200/60 hover:bg-emerald-300/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-slate-500"
      disabled={disabled}
      onClick={onTrigger}
      type="button"
    >
      다음 진행
    </button>
  )
}

export default TriggerController
