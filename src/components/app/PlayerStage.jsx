function PlayerStage({ children }) {
  return (
    <main className="flex min-h-0 flex-1 items-center px-4 py-4 sm:px-6 sm:py-6">
      <section className="mx-auto flex h-full w-full max-w-7xl flex-1 items-center justify-center">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-[0_30px_120px_rgba(2,6,23,0.65)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_42%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.08),transparent_40%)]" />
          <div className="relative flex h-full w-full items-center justify-center">
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}

export default PlayerStage
