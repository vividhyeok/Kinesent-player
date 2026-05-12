import { useKeyboardTrigger } from '../../hooks/useKeyboardTrigger.js'

function KeyboardShortcutLayer({ enabled, onNext, onPrevious }) {
  useKeyboardTrigger({
    enabled,
    onNext,
    onPrevious,
  })

  return null
}

export default KeyboardShortcutLayer
