import { useLayoutEffect, useRef, useState } from 'react'
import { resolveHighlightTargets } from '../../lib/svgHighlightParser.js'

function applyHighlightStyles(targets, revealedHighlightCount) {
  targets.forEach((target, index) => {
    const isActive = index < revealedHighlightCount

    target.style.transition =
      'opacity 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms cubic-bezier(0.22, 1, 0.36, 1), transform 260ms cubic-bezier(0.22, 1, 0.36, 1)'
    target.style.transformBox = 'fill-box'
    target.style.transformOrigin = 'center'
    target.style.willChange = 'opacity, filter, transform'
    target.style.opacity = isActive ? '1' : '0.24'
    target.style.filter = isActive
      ? 'drop-shadow(0 0 16px rgba(34, 211, 238, 0.6)) brightness(1.12) saturate(1.05)'
      : 'saturate(0.45) brightness(0.84)'
    target.style.transform = isActive ? 'translateZ(0) scale(1.01)' : 'translateZ(0) scale(1)'
  })
}

function prepareSvgRoot(svgRoot) {
  if (!svgRoot) {
    return
  }

  svgRoot.setAttribute('width', '100%')
  svgRoot.setAttribute('height', '100%')
  svgRoot.style.width = '100%'
  svgRoot.style.height = '100%'
  svgRoot.style.maxWidth = '100%'
  svgRoot.style.maxHeight = '100%'
}

function AnimatedScene({ revealedHighlightCount, scene }) {
  const containerRef = useRef(null)
  const targetElementsRef = useRef([])
  const [missingIds, setMissingIds] = useState([])

  useLayoutEffect(() => {
    const containerElement = containerRef.current

    if (!containerElement) {
      return undefined
    }

    containerElement.innerHTML = scene.svgMarkup

    const { svgRoot, targets, missingIds: nextMissingIds } = resolveHighlightTargets(
      containerElement,
      scene.highlightOrder,
    )

    prepareSvgRoot(svgRoot)
    targetElementsRef.current = targets
    setMissingIds(nextMissingIds)

    return () => {
      targetElementsRef.current = []
      containerElement.innerHTML = ''
    }
  }, [scene.highlightOrder, scene.id, scene.svgMarkup])

  useLayoutEffect(() => {
    applyHighlightStyles(targetElementsRef.current, revealedHighlightCount)
  }, [revealedHighlightCount, scene.id])

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-slate-950 p-4 sm:p-6">
      <div
        ref={containerRef}
        className="h-full w-full [&_svg]:mx-auto [&_svg]:block"
      />

      {missingIds.length > 0 ? (
        <div className="absolute bottom-5 left-5 rounded-2xl border border-amber-300/40 bg-slate-950/82 px-4 py-3 text-sm text-amber-50 shadow-lg shadow-slate-950/25 backdrop-blur">
          표시할 수 없는 id: {missingIds.join(', ')}
        </div>
      ) : null}
    </div>
  )
}

export default AnimatedScene
