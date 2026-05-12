import { useEffect, useRef, useState } from 'react'

export function usePlaybackCompletion({
  isPresentationComplete,
  onRestart,
}) {
  const wasCompleteRef = useRef(false)
  const [isEndScreenVisible, setIsEndScreenVisible] = useState(false)

  useEffect(() => {
    const wasComplete = wasCompleteRef.current
    wasCompleteRef.current = isPresentationComplete

    let timerId = null

    if (isPresentationComplete && !wasComplete) {
      timerId = window.setTimeout(() => {
        setIsEndScreenVisible(true)
      }, 0)
    }

    if (!isPresentationComplete) {
      timerId = window.setTimeout(() => {
        setIsEndScreenVisible(false)
      }, 0)
    }

    return () => {
      if (timerId !== null) {
        window.clearTimeout(timerId)
      }
    }
  }, [isPresentationComplete])

  function closeEndScreen() {
    setIsEndScreenVisible(false)
  }

  function restartPresentation() {
    setIsEndScreenVisible(false)
    onRestart?.()
  }

  return {
    isEndScreenVisible,
    closeEndScreen,
    restartPresentation,
  }
}
