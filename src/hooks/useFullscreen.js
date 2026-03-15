import { useEffect, useEffectEvent, useRef, useState } from 'react'

function canUseFullscreen() {
  return typeof document !== 'undefined' && document.fullscreenEnabled
}

export function useFullscreen(targetRef) {
  const originalBodyOverflowRef = useRef(
    typeof document !== 'undefined' ? document.body.style.overflow : '',
  )
  const [isFullscreen, setIsFullscreen] = useState(
    typeof document !== 'undefined' ? Boolean(document.fullscreenElement) : false,
  )

  const syncFullscreenState = useEffectEvent(() => {
    setIsFullscreen(Boolean(document.fullscreenElement))
  })

  useEffect(() => {
    document.addEventListener('fullscreenchange', syncFullscreenState)

    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState)
    }
  }, [])

  useEffect(() => {
    const originalBodyOverflow = originalBodyOverflowRef.current

    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalBodyOverflow
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow
    }
  }, [isFullscreen])

  async function toggleFullscreen() {
    if (!canUseFullscreen()) {
      return
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        return
      }

      const targetElement = targetRef.current ?? document.documentElement
      await targetElement.requestFullscreen()
    } catch {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
  }

  return {
    isFullscreen,
    isFullscreenSupported: canUseFullscreen(),
    toggleFullscreen,
  }
}
