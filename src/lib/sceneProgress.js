export function getVisibleHighlightIds(scene, currentTriggerStep) {
  if (!scene || scene.type !== 'animated') {
    return []
  }

  return scene.highlightOrder.slice(0, currentTriggerStep)
}

export function getTriggerOutcome(scene, currentTriggerStep) {
  if (!scene) {
    return {
      action: 'noop',
      nextTriggerStep: currentTriggerStep,
    }
  }

  if (scene.type === 'procedural') {
    if (currentTriggerStep < scene.triggers) {
      const nextTriggerStep = currentTriggerStep + 1

      if (nextTriggerStep === scene.triggers) {
        return {
          action: 'advance',
          nextTriggerStep,
        }
      }

      return {
        action: 'step',
        nextTriggerStep,
      }
    }

    return {
      action: 'advance',
      nextTriggerStep: currentTriggerStep,
    }
  }

  if (scene.type !== 'animated') {
    return {
      action: 'advance',
      nextTriggerStep: 0,
    }
  }

  if (currentTriggerStep < scene.highlightOrder.length) {
    const nextTriggerStep = currentTriggerStep + 1
    const isLastHighlight = nextTriggerStep === scene.highlightOrder.length

    if (isLastHighlight && scene.advanceOnLastHighlight === true) {
      return {
        action: 'advance',
        nextTriggerStep,
        highlightId: scene.highlightOrder[currentTriggerStep],
      }
    }

    return {
      action: 'step',
      nextTriggerStep,
      highlightId: scene.highlightOrder[currentTriggerStep],
    }
  }

  return {
    action: 'advance',
    nextTriggerStep: currentTriggerStep,
  }
}
