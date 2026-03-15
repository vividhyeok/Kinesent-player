import { useKeyboardTrigger } from '../../hooks/useKeyboardTrigger.js'

function KeyboardShortcutLayer({ enabled, onTrigger }) {
  useKeyboardTrigger({
    enabled,
    onTrigger,
  })

  return null
}

export default KeyboardShortcutLayer
