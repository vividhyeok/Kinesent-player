import { PROCEDURAL_TEMPLATE_SET } from './constants.js'

const DEFAULT_PROCEDURAL_TEMPLATE = 'stack3d'

const TEMPLATE_DEFAULTS = {
  stack3d: {
    color: '#4A90E2',
    maxSize: 5,
    items: ['A', 'B', 'C'],
  },
  queue3d: {
    color: '#50E3C2',
    maxSize: 5,
    items: ['A', 'B', 'C'],
  },
  linkedlist3d: {
    color: '#F5A623',
    items: ['A', 'B', 'C'],
    activeIndex: 0,
  },
  array3d: {
    color: '#7ED321',
    items: ['A', 'B', 'C', 'D'],
    activeIndex: 0,
    swapPair: [0, 1],
  },
}

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value))
}

function normalizeColor(value, fallback) {
  const nextValue = String(value ?? '').trim()
  return /^#[0-9a-f]{6}$/i.test(nextValue) ? nextValue : fallback
}

function normalizePositiveInteger(value, fallback) {
  return Number.isInteger(value) && value > 0 ? value : fallback
}

function normalizeStringArray(value, fallback) {
  const nextItems = Array.isArray(value)
    ? value
        .map((item) => String(item ?? '').trim())
        .filter(Boolean)
    : []

  return nextItems.length > 0 ? nextItems : [...fallback]
}

function normalizeIndex(value, itemCount, fallback = 0) {
  if (!Number.isInteger(value) || value < 0) {
    return fallback
  }

  if (itemCount === 0) {
    return 0
  }

  return Math.min(value, itemCount - 1)
}

function normalizeSwapPair(value, itemCount, fallback = [0, 1]) {
  const nextValue = Array.isArray(value)
    ? value.filter((item) => Number.isInteger(item) && item >= 0)
    : []

  if (nextValue.length >= 2) {
    const left = normalizeIndex(nextValue[0], itemCount, 0)
    const right = normalizeIndex(nextValue[1], itemCount, 1)

    if (left !== right) {
      return [left, right]
    }
  }

  if (itemCount <= 1) {
    return [0, 0]
  }

  return [
    normalizeIndex(fallback[0], itemCount, 0),
    normalizeIndex(fallback[1], itemCount, 1),
  ]
}

export function isProceduralSceneType(sceneType) {
  return sceneType === 'procedural'
}

export function normalizeProceduralTemplate(value) {
  return PROCEDURAL_TEMPLATE_SET.has(value)
    ? value
    : DEFAULT_PROCEDURAL_TEMPLATE
}

export function createDefaultProceduralConfig(template) {
  const normalizedTemplate = normalizeProceduralTemplate(template)
  return cloneValue(TEMPLATE_DEFAULTS[normalizedTemplate])
}

export function normalizeProceduralConfig(template, config) {
  const normalizedTemplate = normalizeProceduralTemplate(template)
  const baseConfig = createDefaultProceduralConfig(normalizedTemplate)
  const nextConfig = isPlainObject(config) ? config : {}

  if (normalizedTemplate === 'stack3d' || normalizedTemplate === 'queue3d') {
    return {
      color: normalizeColor(nextConfig.color, baseConfig.color),
      maxSize: normalizePositiveInteger(nextConfig.maxSize, baseConfig.maxSize),
      items: normalizeStringArray(nextConfig.items, baseConfig.items),
    }
  }

  if (normalizedTemplate === 'linkedlist3d') {
    const items = normalizeStringArray(nextConfig.items, baseConfig.items)

    return {
      color: normalizeColor(nextConfig.color, baseConfig.color),
      items,
      activeIndex: normalizeIndex(nextConfig.activeIndex, items.length),
    }
  }

  const items = normalizeStringArray(nextConfig.items, baseConfig.items)

  return {
    color: normalizeColor(nextConfig.color, baseConfig.color),
    items,
    activeIndex: normalizeIndex(nextConfig.activeIndex, items.length),
    swapPair: normalizeSwapPair(nextConfig.swapPair, items.length, baseConfig.swapPair),
  }
}

export function normalizeProceduralScene(scene) {
  const template = normalizeProceduralTemplate(scene?.template)

  return {
    template,
    config: normalizeProceduralConfig(template, scene?.config),
  }
}

export function hasValidProceduralConfigShape(scene) {
  return (
    typeof scene?.template === 'string' &&
    PROCEDURAL_TEMPLATE_SET.has(scene.template) &&
    isPlainObject(scene.config)
  )
}
