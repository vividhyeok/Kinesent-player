import { useEffect, useReducer } from 'react'
import { SAME_TRIGGER_ADVANCE_DELAY_MS } from '../lib/constants.js'
import { getTriggerOutcome } from '../lib/sceneProgress.js'

const INITIAL_PROGRESS = {
  currentSceneIndex: 0,
  currentTriggerStep: 0,
  isPresentationComplete: false,
  pendingAdvance: null,
}

function createInitialState() {
  return {
    ...INITIAL_PROGRESS,
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

function progressReducer(state, action) {
  if (action.type === 'reset') {
    return createInitialState()
  }

  if (action.type === 'complete-auto-advance') {
    if (!state.pendingAdvance) {
      return state
    }

    if (state.pendingAdvance.type === 'scene') {
      return {
        currentSceneIndex: state.pendingAdvance.targetSceneIndex,
        currentTriggerStep: 0,
        isPresentationComplete: false,
        pendingAdvance: null,
      }
    }

    return {
      ...state,
      isPresentationComplete: true,
      pendingAdvance: null,
    }
  }

  if (action.type === 'trigger') {
    const { presentation } = action

    if (!presentation || state.pendingAdvance) {
      return state
    }

    const activeScene = presentation.scenes[state.currentSceneIndex]

    if (!activeScene) {
      return state
    }

    const outcome = getTriggerOutcome(activeScene, state.currentTriggerStep)

    if (outcome.action === 'step') {
      return {
        ...state,
        currentTriggerStep: outcome.nextTriggerStep,
        isPresentationComplete: false,
      }
    }

    if (outcome.action === 'advance') {
      const hasNextScene = state.currentSceneIndex < presentation.scenes.length - 1
      const advancedWithinScene = outcome.nextTriggerStep > state.currentTriggerStep

      if (advancedWithinScene) {
        return {
          ...state,
          currentTriggerStep: outcome.nextTriggerStep,
          isPresentationComplete: false,
          pendingAdvance: createPendingAdvance(
            hasNextScene ? state.currentSceneIndex + 1 : null,
          ),
        }
      }

      if (hasNextScene) {
        return {
          currentSceneIndex: state.currentSceneIndex + 1,
          currentTriggerStep: 0,
          isPresentationComplete: false,
          pendingAdvance: null,
        }
      }

      return {
        ...state,
        isPresentationComplete: true,
      }
    }
  }

  return state
}

export function usePresentationState(presentation) {
  const [progress, dispatch] = useReducer(progressReducer, undefined, createInitialState)

  useEffect(() => {
    dispatch({
      type: 'reset',
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

  const currentScene = presentation?.scenes[progress.currentSceneIndex] ?? null
  const totalScenes = presentation?.scenes.length ?? 0

  function triggerNext() {
    if (!presentation || !currentScene) {
      return
    }

    dispatch({
      type: 'trigger',
      presentation,
    })
  }

  return {
    currentScene,
    currentSceneIndex: progress.currentSceneIndex,
    currentTriggerStep: progress.currentTriggerStep,
    revealedHighlightCount: progress.currentTriggerStep,
    isPresentationComplete: progress.isPresentationComplete,
    isAutoAdvancing: Boolean(progress.pendingAdvance),
    totalScenes,
    triggerNext,
  }
}
