import { useEffect, useEffectEvent } from 'react'
import {
  KEYBOARD_NEXT_TRIGGER_CODES,
  KEYBOARD_PREVIOUS_SCENE_CODES,
} from '../lib/constants.js'

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  )
}

export function useKeyboardTrigger({ enabled, onNext, onPrevious }) {
  const handleKeydown = useEffectEvent((event) => {
    if (!enabled) {
      return
    }

    if (
      event.defaultPrevented ||
      event.repeat ||
      event.isComposing ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return
    }

    if (isEditableTarget(event.target)) {
      return
    }

    if (KEYBOARD_NEXT_TRIGGER_CODES.has(event.code)) {
      event.preventDefault()
      onNext?.()
      return
    }

    if (KEYBOARD_PREVIOUS_SCENE_CODES.has(event.code)) {
      event.preventDefault()
      onPrevious?.()
    }
  })

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    function handleEvent(event) {
      handleKeydown(event)
    }

    window.addEventListener('keydown', handleEvent, { capture: true })

    return () => {
      window.removeEventListener('keydown', handleEvent, { capture: true })
    }
  }, [enabled])
}
