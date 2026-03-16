import { useAspectRatioViewport } from '../../hooks/useAspectRatioViewport.js'

function AspectRatioViewport({ children, isFullscreen }) {
  const {
    aspectRatioValue,
    containerRef,
    hasViewport,
    letterbox,
    viewportHeight,
    viewportWidth,
  } = useAspectRatioViewport()

  return (
    <div
      ref={containerRef}
      className={`flex h-full w-full items-center justify-center overflow-hidden ${
        isFullscreen ? 'bg-black' : 'bg-transparent'
      }`}
      style={{
        '--kinesent-letterbox-top': `${letterbox.top}px`,
        '--kinesent-letterbox-right': `${letterbox.right}px`,
        '--kinesent-letterbox-bottom': `${letterbox.bottom}px`,
        '--kinesent-letterbox-left': `${letterbox.left}px`,
      }}
    >
      <div
        className={`relative max-h-full max-w-full overflow-hidden ${
          isFullscreen
            ? 'bg-black'
            : 'rounded-[2rem] border border-white/10 bg-slate-950/88 shadow-[0_30px_120px_rgba(2,6,23,0.65)]'
        }`}
        style={{
          aspectRatio: aspectRatioValue,
          width: hasViewport ? `${viewportWidth}px` : undefined,
          height: hasViewport ? `${viewportHeight}px` : undefined,
        }}
      >
        {!isFullscreen ? (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_42%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.08),transparent_40%)]" />
        ) : null}
        <div className="relative h-full w-full overflow-hidden bg-black">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AspectRatioViewport
