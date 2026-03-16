import { normalizeProceduralScene } from '../lib/proceduralValidation.js'

function clampStep(currentTriggerStep, maxStep) {
  if (!Number.isInteger(currentTriggerStep) || currentTriggerStep < 0) {
    return 0
  }

  return Math.min(currentTriggerStep, Math.max(0, maxStep))
}

function getViewScale(template, config) {
  const items = Array.isArray(config?.items) ? config.items.length : 0
  const maxSize = Number.isInteger(config?.maxSize) ? config.maxSize : items

  if (template === 'stack3d') {
    return Math.max(8, maxSize * 1.45)
  }

  if (template === 'queue3d') {
    return Math.max(8.5, maxSize * 1.4)
  }

  if (template === 'linkedlist3d') {
    return Math.max(7.5, items * 1.6)
  }

  if (template === 'array3d') {
    return Math.max(7.5, items * 1.45)
  }

  return 8
}

export function useProceduralSceneState(scene, currentTriggerStep) {
  const normalizedScene = normalizeProceduralScene(scene)
  const totalSteps =
    Number.isInteger(scene?.triggers) && scene.triggers > 0 ? scene.triggers : 0
  const step = clampStep(currentTriggerStep, totalSteps)

  return {
    template: normalizedScene.template,
    config: normalizedScene.config,
    step,
    totalSteps,
    viewScale: getViewScale(normalizedScene.template, normalizedScene.config),
  }
}
