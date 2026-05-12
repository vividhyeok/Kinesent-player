export function createPlaybackHistory(initialSceneIndex = null, initialTriggerStep = 0) {
  if (!Number.isInteger(initialSceneIndex) || initialSceneIndex < 0) {
    return {}
  }

  return {
    [initialSceneIndex]: Math.max(0, initialTriggerStep),
  }
}

export function getRecordedTriggerStep(playbackHistory, sceneIndex) {
  if (!Number.isInteger(sceneIndex) || sceneIndex < 0) {
    return 0
  }

  const recordedStep = playbackHistory?.[sceneIndex]

  if (!Number.isInteger(recordedStep) || recordedStep < 0) {
    return 0
  }

  return recordedStep
}

export function recordTriggerStep(playbackHistory, sceneIndex, triggerStep) {
  if (!Number.isInteger(sceneIndex) || sceneIndex < 0) {
    return playbackHistory ?? {}
  }

  const nextTriggerStep = Number.isInteger(triggerStep) && triggerStep >= 0 ? triggerStep : 0

  if (playbackHistory?.[sceneIndex] === nextTriggerStep) {
    return playbackHistory ?? {}
  }

  return {
    ...(playbackHistory ?? {}),
    [sceneIndex]: nextTriggerStep,
  }
}
