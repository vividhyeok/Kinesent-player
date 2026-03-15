import { useEffect, useEffectEvent } from 'react'
import { KEYBOARD_TRIGGER_CODES } from '../lib/constants.js'

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

export function useKeyboardTrigger({ enabled, onTrigger }) {
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

    if (!KEYBOARD_TRIGGER_CODES.has(event.code) || isEditableTarget(event.target)) {
      return
    }

    event.preventDefault()
    onTrigger()
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
