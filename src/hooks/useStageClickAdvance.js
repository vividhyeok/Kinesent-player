import { useCallback, useEffect, useRef } from 'react'

const STAGE_CLICK_DEBOUNCE_MS = 180

function getNow() {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now()
  }

  return Date.now()
}

function isInteractiveStageTarget(target) {
  return target instanceof Element && Boolean(target.closest('[data-stage-interactive="true"]'))
}

export function useStageClickAdvance({ enabled, onAdvance }) {
  const onAdvanceRef = useRef(onAdvance)
  const lastAdvanceAtRef = useRef(0)

  useEffect(() => {
    onAdvanceRef.current = onAdvance
  }, [onAdvance])

  const requestAdvance = useCallback(() => {
    if (!enabled) {
      return false
    }

    const now = getNow()

    if (now - lastAdvanceAtRef.current < STAGE_CLICK_DEBOUNCE_MS) {
      return false
    }

    lastAdvanceAtRef.current = now
    onAdvanceRef.current?.()

    return true
  }, [enabled])

  const handleStageClickCapture = useCallback(
    (event) => {
      if (!enabled || event.defaultPrevented) {
        return
      }

      if (isInteractiveStageTarget(event.target)) {
        return
      }

      requestAdvance()
    },
    [enabled, requestAdvance],
  )

  return {
    requestAdvance,
    handleStageClickCapture,
  }
}
