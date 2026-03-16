import AspectRatioViewport from '../stage/AspectRatioViewport.jsx'

function PlayerStage({ children, isFullscreen }) {
  return (
    <main
      className={`flex min-h-0 flex-1 items-center ${
        isFullscreen ? 'px-0 py-0' : 'px-4 py-4 sm:px-6 sm:py-6'
      }`}
    >
      <section
        className={`mx-auto flex h-full w-full flex-1 items-center justify-center ${
          isFullscreen ? 'max-w-none' : 'max-w-7xl'
        }`}
      >
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <AspectRatioViewport isFullscreen={isFullscreen}>
            {children}
          </AspectRatioViewport>
        </div>
      </section>
    </main>
  )
}

export default PlayerStage
