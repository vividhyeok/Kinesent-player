import { useEffect, useRef, useState } from 'react'

const FULLSCREEN_EXIT_HINT_DURATION_MS = 3000

function FullscreenExitHint({ isFullscreen }) {
  const hasShownRef = useRef(false)
  const previousFullscreenRef = useRef(false)
  const [hintState, setHintState] = useState({
    token: 0,
    visible: false,
  })

  useEffect(() => {
    const enteredFullscreen = isFullscreen && !previousFullscreenRef.current
    previousFullscreenRef.current = isFullscreen

    let showTimerId = null
    let hideTimerId = null

    if (enteredFullscreen && !hasShownRef.current) {
      hasShownRef.current = true

      showTimerId = window.setTimeout(() => {
        setHintState((previousState) => ({
          token: previousState.token + 1,
          visible: true,
        }))
      }, 0)

      hideTimerId = window.setTimeout(() => {
        setHintState((previousState) => ({
          ...previousState,
          visible: false,
        }))
      }, FULLSCREEN_EXIT_HINT_DURATION_MS)
    }

    if (!isFullscreen) {
      showTimerId = window.setTimeout(() => {
        setHintState((previousState) => ({
          ...previousState,
          visible: false,
        }))
      }, 0)
    }

    return () => {
      if (showTimerId !== null) {
        window.clearTimeout(showTimerId)
      }

      if (hideTimerId !== null) {
        window.clearTimeout(hideTimerId)
      }
    }
  }, [isFullscreen])

  useEffect(() => {
    if (!hintState.visible) {
      return undefined
    }

    function handleKeydown(event) {
      if (event.key === 'Escape') {
        setHintState((previousState) => ({
          ...previousState,
          visible: false,
        }))
      }
    }

    window.addEventListener('keydown', handleKeydown, { capture: true })

    return () => {
      window.removeEventListener('keydown', handleKeydown, { capture: true })
    }
  }, [hintState.visible])

  if (!hintState.visible) {
    return null
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 z-40 flex justify-center px-4">
      <div
        className="rounded-full border border-white/12 bg-slate-950/78 px-4 py-2 text-sm font-medium text-white shadow-[0_18px_48px_rgba(2,6,23,0.42)] backdrop-blur-md animate-[kinesent-fullscreen-hint_3000ms_ease-out_forwards]"
        key={hintState.token}
      >
        전체화면 모드입니다. ESC 키를 눌러 나갈 수 있습니다.
      </div>
    </div>
  )
}

export default FullscreenExitHint
