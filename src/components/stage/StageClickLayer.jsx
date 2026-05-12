function StageClickLayer({
  children,
  enabled,
  onStageClickCapture,
}) {
  return (
    <div
      className={`relative h-full w-full ${enabled ? 'cursor-pointer' : ''}`}
      onClickCapture={onStageClickCapture}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
      />
    </div>
  )
}

export default StageClickLayer
