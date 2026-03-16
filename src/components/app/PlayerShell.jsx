import { forwardRef } from 'react'

const PlayerShell = forwardRef(function PlayerShell(
  { children, isFullscreen },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`relative flex h-[100dvh] min-h-screen flex-col overflow-hidden text-slate-50 ${
        isFullscreen
          ? 'bg-black'
          : 'bg-[radial-gradient(circle_at_top,#1e293b_0%,#0f172a_38%,#020617_100%)]'
      }`}
    >
      {!isFullscreen ? (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      ) : null}
      <div className="relative flex h-full min-h-0 flex-col">{children}</div>
    </div>
  )
})

export default PlayerShell
