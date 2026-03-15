function PlayerFooter({ children }) {
  return (
    <footer className="shrink-0 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/50 px-5 py-4 shadow-xl shadow-slate-950/20 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        {children}
      </div>
    </footer>
  )
}

export default PlayerFooter
