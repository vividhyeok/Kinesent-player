export function getVisibleHighlightIds(scene, revealedHighlightCount) {
  if (!scene || scene.type !== 'animated') {
    return []
  }

  return scene.highlightOrder.slice(0, revealedHighlightCount)
}

export function getTriggerOutcome(scene, revealedHighlightCount) {
  if (!scene) {
    return {
      action: 'noop',
      nextRevealedHighlightCount: revealedHighlightCount,
    }
  }

  if (scene.type !== 'animated') {
    return {
      action: 'advance',
      nextRevealedHighlightCount: 0,
    }
  }

  if (revealedHighlightCount < scene.highlightOrder.length) {
    const nextRevealedHighlightCount = revealedHighlightCount + 1
    const isLastHighlight = nextRevealedHighlightCount === scene.highlightOrder.length

    if (isLastHighlight && scene.advanceOnLastHighlight === true) {
      return {
        action: 'advance',
        nextRevealedHighlightCount,
        highlightId: scene.highlightOrder[revealedHighlightCount],
      }
    }

    return {
      action: 'highlight',
      nextRevealedHighlightCount,
      highlightId: scene.highlightOrder[revealedHighlightCount],
    }
  }

  return {
    action: 'advance',
    nextRevealedHighlightCount: revealedHighlightCount,
  }
}
