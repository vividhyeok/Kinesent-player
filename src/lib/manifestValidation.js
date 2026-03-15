import { SCENE_TYPE_SET } from './constants.js'
import { MANIFEST_SCHEMA } from './manifestSchema.js'

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => isNonEmptyString(item))
}

function isNonEmptyStringArray(value) {
  return isStringArray(value) && value.length > 0
}

function validateScene(scene, index) {
  const errors = []
  const path = `scenes[${index}]`

  if (!isPlainObject(scene)) {
    errors.push(`${path} 항목은 객체여야 합니다.`)
    return errors
  }

  if (!isNonEmptyString(scene.id)) {
    errors.push(`${path}.id는 비어 있지 않은 문자열이어야 합니다.`)
  }

  if (!isNonEmptyString(scene.title)) {
    errors.push(`${path}.title은 비어 있지 않은 문자열이어야 합니다.`)
  }

  if (!isNonEmptyString(scene.type) || !SCENE_TYPE_SET.has(scene.type)) {
    errors.push(`${path}.type은 static, loop, animated 중 하나여야 합니다.`)
  }

  if (!isNonEmptyString(scene.asset)) {
    errors.push(`${path}.asset은 비어 있지 않은 문자열이어야 합니다.`)
  }

  if (!isPositiveInteger(scene.triggers)) {
    errors.push(`${path}.triggers는 1 이상의 정수여야 합니다.`)
  }

  if (scene.type === 'animated') {
    if (!isNonEmptyStringArray(scene.highlightOrder)) {
      errors.push(
        `${path}.highlightOrder는 animated 씬에서 비어 있지 않은 문자열 배열이어야 합니다.`,
      )
    }
  } else if (scene.highlightOrder !== undefined && !isStringArray(scene.highlightOrder)) {
    errors.push(`${path}.highlightOrder는 문자열 배열이어야 합니다.`)
  }

  if (
    scene.advanceOnLastHighlight !== undefined &&
    typeof scene.advanceOnLastHighlight !== 'boolean'
  ) {
    errors.push(`${path}.advanceOnLastHighlight는 boolean 값이어야 합니다.`)
  }

  return errors
}

export function validateManifest(manifest) {
  const errors = []

  if (!isPlainObject(manifest)) {
    return {
      isValid: false,
      errors: ['manifest는 객체여야 합니다.'],
      schema: MANIFEST_SCHEMA,
    }
  }

  if (!isNonEmptyString(manifest.title)) {
    errors.push('title은 비어 있지 않은 문자열이어야 합니다.')
  }

  if (!Array.isArray(manifest.scenes) || manifest.scenes.length === 0) {
    errors.push('scenes는 비어 있지 않은 배열이어야 합니다.')
  } else {
    manifest.scenes.forEach((scene, index) => {
      errors.push(...validateScene(scene, index))
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
    schema: MANIFEST_SCHEMA,
  }
}
