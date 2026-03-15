function parseSvgDocument(svgMarkup) {
  const parser = new DOMParser()
  const document = parser.parseFromString(svgMarkup, 'image/svg+xml')
  const parserError = document.querySelector('parsererror')

  if (parserError) {
    throw new Error('SVG 문서를 해석할 수 없습니다.')
  }

  const svgElement = document.documentElement

  if (!svgElement || svgElement.nodeName.toLowerCase() !== 'svg') {
    throw new Error('SVG 루트 요소를 찾을 수 없습니다.')
  }

  return {
    document,
    svgElement,
  }
}

function escapeSelector(value) {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value)
  }

  return value.replace(/([^\w-])/g, '\\$1')
}

export function analyzeSvgMarkup(svgMarkup) {
  const { svgElement } = parseSvgDocument(svgMarkup)
  const ids = new Set()

  svgElement.querySelectorAll('[id]').forEach((element) => {
    const id = element.getAttribute('id')?.trim()

    if (id) {
      ids.add(id)
    }
  })

  return {
    svgMarkup: svgElement.outerHTML,
    ids,
  }
}

export function findMissingHighlightIds(ids, highlightOrder) {
  return highlightOrder.filter((id) => !ids.has(id))
}

export function resolveHighlightTargets(containerElement, highlightOrder) {
  const svgRoot = containerElement.querySelector('svg')

  if (!svgRoot) {
    return {
      svgRoot: null,
      targets: [],
      missingIds: [...highlightOrder],
    }
  }

  const targets = []
  const missingIds = []

  highlightOrder.forEach((id) => {
    const target = svgRoot.querySelector(`#${escapeSelector(id)}`)

    if (!target) {
      missingIds.push(id)
      return
    }

    targets.push(target)
  })

  return {
    svgRoot,
    targets,
    missingIds,
  }
}
