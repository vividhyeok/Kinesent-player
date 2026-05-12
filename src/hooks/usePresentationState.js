import { usePlayerNavigation } from './usePlayerNavigation.js'

export function usePresentationState(presentation) {
  const navigation = usePlayerNavigation(presentation)
  const currentScene = presentation?.scenes[navigation.currentSceneIndex] ?? null

  return {
    currentScene,
    currentSceneIndex: navigation.currentSceneIndex,
    currentTriggerStep: navigation.currentTriggerStep,
    revealedHighlightCount: navigation.currentTriggerStep,
    isPresentationComplete: navigation.isPresentationComplete,
    isAutoAdvancing: navigation.isAutoAdvancing,
    totalScenes: navigation.totalScenes,
    canGoPrevious: navigation.canGoPrevious,
    triggerNext: navigation.triggerNext,
    triggerPreviousScene: navigation.triggerPreviousScene,
    jumpToScene: navigation.jumpToScene,
    restartPresentation: navigation.restartPresentation,
  }
}
