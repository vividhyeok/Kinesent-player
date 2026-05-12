import { useEffect, useRef, useState } from 'react'

const TRANSITION_INDICATOR_DURATION_MS = 600

function SceneTransitionIndicator({
  currentSceneIndex,
  currentSceneTitle,
  isFullscreen,
}) {
  const previousSceneIndexRef = useRef(null)
  const [indicatorState, setIndicatorState] = useState({
    sceneIndex: 0,
    sceneTitle: '',
    token: 0,
    visible: false,
  })

  useEffect(() => {
    const previousSceneIndex = previousSceneIndexRef.current
    previousSceneIndexRef.current = currentSceneIndex

    let showTimerId = null
    let hideTimerId = null

    if (isFullscreen) {
      showTimerId = window.setTimeout(() => {
        setIndicatorState((previousState) => ({
          ...previousState,
          visible: false,
        }))
      }, 0)

      return () => {
        window.clearTimeout(showTimerId)
      }
    }

    if (
      previousSceneIndex === null ||
      previousSceneIndex === currentSceneIndex ||
      !Number.isInteger(currentSceneIndex)
    ) {
      return undefined
    }

    showTimerId = window.setTimeout(() => {
      setIndicatorState((previousState) => ({
        sceneIndex: currentSceneIndex,
        sceneTitle: currentSceneTitle,
        token: previousState.token + 1,
        visible: true,
      }))
    }, 0)

    hideTimerId = window.setTimeout(() => {
      setIndicatorState((previousState) => ({
        ...previousState,
        visible: false,
      }))
    }, TRANSITION_INDICATOR_DURATION_MS)

    return () => {
      window.clearTimeout(showTimerId)
      window.clearTimeout(hideTimerId)
    }
  }, [currentSceneIndex, currentSceneTitle, isFullscreen])

  if (isFullscreen || !indicatorState.visible) {
    return null
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 z-20 flex justify-center px-4">
      <div
        className="rounded-full border border-white/12 bg-slate-950/68 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-cyan-100 shadow-[0_18px_48px_rgba(2,6,23,0.34)] backdrop-blur animate-[kinesent-scene-transition_600ms_ease-out_forwards]"
        key={indicatorState.token}
      >
        {indicatorState.sceneIndex + 1}. {indicatorState.sceneTitle}
      </div>
    </div>
  )
}

export default SceneTransitionIndicator
