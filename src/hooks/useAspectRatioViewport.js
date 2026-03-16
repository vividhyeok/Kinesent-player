import { useLayoutEffect, useRef, useState } from 'react'
import {
  CANVAS_ASPECT_RATIO_HEIGHT,
  CANVAS_ASPECT_RATIO_WIDTH,
} from '../lib/constants.js'
import {
  calculateAspectRatioFit,
  formatAspectRatioValue,
  getLetterboxOffsets,
} from '../lib/aspectRatio.js'

const INITIAL_VIEWPORT_STATE = {
  containerWidth: 0,
  containerHeight: 0,
  width: 0,
  height: 0,
  letterbox: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}

function hasViewportChanged(previousState, nextState) {
  return (
    previousState.containerWidth !== nextState.containerWidth ||
    previousState.containerHeight !== nextState.containerHeight ||
    previousState.width !== nextState.width ||
    previousState.height !== nextState.height ||
    previousState.letterbox.top !== nextState.letterbox.top ||
    previousState.letterbox.right !== nextState.letterbox.right ||
    previousState.letterbox.bottom !== nextState.letterbox.bottom ||
    previousState.letterbox.left !== nextState.letterbox.left
  )
}

export function useAspectRatioViewport() {
  const containerRef = useRef(null)
  const [viewportState, setViewportState] = useState(INITIAL_VIEWPORT_STATE)

  useLayoutEffect(() => {
    const containerElement = containerRef.current

    if (!containerElement) {
      return undefined
    }

    function updateViewport() {
      const nextContainerWidth = containerElement.clientWidth
      const nextContainerHeight = containerElement.clientHeight
      const nextViewport = calculateAspectRatioFit({
        containerWidth: nextContainerWidth,
        containerHeight: nextContainerHeight,
        aspectWidth: CANVAS_ASPECT_RATIO_WIDTH,
        aspectHeight: CANVAS_ASPECT_RATIO_HEIGHT,
      })
      const nextState = {
        containerWidth: nextContainerWidth,
        containerHeight: nextContainerHeight,
        width: nextViewport.width,
        height: nextViewport.height,
        letterbox: getLetterboxOffsets({
          containerWidth: nextContainerWidth,
          containerHeight: nextContainerHeight,
          width: nextViewport.width,
          height: nextViewport.height,
        }),
      }

      setViewportState((previousState) =>
        hasViewportChanged(previousState, nextState) ? nextState : previousState,
      )
    }

    updateViewport()

    const resizeObserver =
      typeof ResizeObserver === 'function'
        ? new ResizeObserver(() => {
            updateViewport()
          })
        : null

    resizeObserver?.observe(containerElement)
    window.addEventListener('resize', updateViewport)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', updateViewport)
    }
  }, [])

  return {
    containerRef,
    viewportWidth: viewportState.width,
    viewportHeight: viewportState.height,
    letterbox: viewportState.letterbox,
    hasViewport: viewportState.width > 0 && viewportState.height > 0,
    aspectRatioValue: formatAspectRatioValue(
      CANVAS_ASPECT_RATIO_WIDTH,
      CANVAS_ASPECT_RATIO_HEIGHT,
    ),
  }
}
