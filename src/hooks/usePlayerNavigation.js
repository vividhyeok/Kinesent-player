import { useEffect, useReducer } from 'react'
import { SAME_TRIGGER_ADVANCE_DELAY_MS } from '../lib/constants.js'
import {
  createPlaybackHistory,
  getRecordedTriggerStep,
  recordTriggerStep,
} from '../lib/playbackHistory.js'
import { getTriggerOutcome } from '../lib/sceneProgress.js'

const INITIAL_PROGRESS = {
  currentSceneIndex: 0,
  currentTriggerStep: 0,
  isPresentationComplete: false,
  pendingAdvance: null,
  playbackHistory: createPlaybackHistory(),
}

export function createPlayerNavigationState(hasScenes = false) {
  return {
    ...INITIAL_PROGRESS,
    playbackHistory: createPlaybackHistory(hasScenes ? 0 : null, 0),
  }
}

function createPendingAdvance(targetSceneIndex) {
  if (targetSceneIndex === null) {
    return {
      type: 'complete',
    }
  }

  return {
    type: 'scene',
    targetSceneIndex,
  }
}

function getSceneCount(presentation) {
  return Array.isArray(presentation?.scenes) ? presentation.scenes.length : 0
}

function clampSceneIndex(sceneIndex, totalScenes) {
  if (!Number.isInteger(sceneIndex) || totalScenes <= 0) {
    return null
  }

  if (sceneIndex < 0 || sceneIndex >= totalScenes) {
    return null
  }

  return sceneIndex
}

function snapshotCurrentScene(state) {
  return recordTriggerStep(
    state.playbackHistory,
    state.currentSceneIndex,
    state.currentTriggerStep,
  )
}

function moveToScene(state, targetSceneIndex, targetTriggerStep) {
  const nextHistory = recordTriggerStep(
    snapshotCurrentScene(state),
    targetSceneIndex,
    targetTriggerStep,
  )

  return {
    currentSceneIndex: targetSceneIndex,
    currentTriggerStep: targetTriggerStep,
    isPresentationComplete: false,
    pendingAdvance: null,
    playbackHistory: nextHistory,
  }
}

export function reducePlayerNavigationState(state, action) {
  if (action.type === 'reset') {
    return createPlayerNavigationState(getSceneCount(action.presentation) > 0)
  }

  if (action.type === 'restart') {
    return createPlayerNavigationState(getSceneCount(action.presentation) > 0)
  }

  if (action.type === 'complete-auto-advance') {
    if (!state.pendingAdvance) {
      return state
    }

    if (state.pendingAdvance.type === 'scene') {
      return moveToScene(state, state.pendingAdvance.targetSceneIndex, 0)
    }

    return {
      ...state,
      isPresentationComplete: true,
      pendingAdvance: null,
    }
  }

  if (action.type === 'previous-scene') {
    const totalScenes = getSceneCount(action.presentation)

    if (totalScenes === 0 || state.currentSceneIndex <= 0) {
      return state
    }

    const nextHistory = snapshotCurrentScene(state)
    const targetSceneIndex = state.currentSceneIndex - 1
    const restoredTriggerStep = getRecordedTriggerStep(nextHistory, targetSceneIndex)

    return {
      currentSceneIndex: targetSceneIndex,
      currentTriggerStep: restoredTriggerStep,
      isPresentationComplete: false,
      pendingAdvance: null,
      playbackHistory: recordTriggerStep(
        nextHistory,
        targetSceneIndex,
        restoredTriggerStep,
      ),
    }
  }

  if (action.type === 'jump-to-scene') {
    const totalScenes = getSceneCount(action.presentation)
    const targetSceneIndex = clampSceneIndex(action.targetSceneIndex, totalScenes)

    if (targetSceneIndex === null) {
      return state
    }

    return moveToScene(state, targetSceneIndex, 0)
  }

  if (action.type === 'trigger') {
    const totalScenes = getSceneCount(action.presentation)

    if (totalScenes === 0 || state.pendingAdvance || state.isPresentationComplete) {
      return state
    }

    const activeScene = action.presentation.scenes[state.currentSceneIndex]

    if (!activeScene) {
      return state
    }

    const outcome = getTriggerOutcome(activeScene, state.currentTriggerStep)
    const nextHistory = snapshotCurrentScene(state)

    if (outcome.action === 'step') {
      return {
        ...state,
        currentTriggerStep: outcome.nextTriggerStep,
        isPresentationComplete: false,
        playbackHistory: recordTriggerStep(
          nextHistory,
          state.currentSceneIndex,
          outcome.nextTriggerStep,
        ),
      }
    }

    if (outcome.action === 'advance') {
      const hasNextScene = state.currentSceneIndex < totalScenes - 1
      const advancedWithinScene = outcome.nextTriggerStep > state.currentTriggerStep
      const advancedHistory = advancedWithinScene
        ? recordTriggerStep(
            nextHistory,
            state.currentSceneIndex,
            outcome.nextTriggerStep,
          )
        : nextHistory

      if (advancedWithinScene && hasNextScene) {
        return {
          ...state,
          currentTriggerStep: outcome.nextTriggerStep,
          isPresentationComplete: false,
          pendingAdvance: createPendingAdvance(state.currentSceneIndex + 1),
          playbackHistory: advancedHistory,
        }
      }

      if (advancedWithinScene && !hasNextScene) {
        return {
          ...state,
          currentTriggerStep: outcome.nextTriggerStep,
          isPresentationComplete: true,
          pendingAdvance: null,
          playbackHistory: advancedHistory,
        }
      }

      if (hasNextScene) {
        return moveToScene(
          {
            ...state,
            pendingAdvance: null,
            playbackHistory: advancedHistory,
          },
          state.currentSceneIndex + 1,
          0,
        )
      }

      return {
        ...state,
        isPresentationComplete: true,
        pendingAdvance: null,
        playbackHistory: advancedHistory,
      }
    }
  }

  return state
}

export function usePlayerNavigation(presentation) {
  const [progress, dispatch] = useReducer(
    reducePlayerNavigationState,
    createPlayerNavigationState(getSceneCount(presentation) > 0),
  )

  useEffect(() => {
    dispatch({
      type: 'reset',
      presentation,
    })
  }, [presentation])

  useEffect(() => {
    if (!progress.pendingAdvance) {
      return undefined
    }

    const timerId = window.setTimeout(() => {
      dispatch({ type: 'complete-auto-advance' })
    }, SAME_TRIGGER_ADVANCE_DELAY_MS)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [progress.pendingAdvance])

  const totalScenes = getSceneCount(presentation)

  function triggerNext() {
    dispatch({
      type: 'trigger',
      presentation,
    })
  }

  function triggerPreviousScene() {
    dispatch({
      type: 'previous-scene',
      presentation,
    })
  }

  function jumpToScene(targetSceneIndex) {
    dispatch({
      type: 'jump-to-scene',
      presentation,
      targetSceneIndex,
    })
  }

  function restartPresentation() {
    dispatch({
      type: 'restart',
      presentation,
    })
  }

  return {
    currentSceneIndex: progress.currentSceneIndex,
    currentTriggerStep: progress.currentTriggerStep,
    totalScenes,
    isPresentationComplete: progress.isPresentationComplete,
    isAutoAdvancing: Boolean(progress.pendingAdvance),
    canGoPrevious: progress.currentSceneIndex > 0,
    triggerNext,
    triggerPreviousScene,
    jumpToScene,
    restartPresentation,
  }
}
