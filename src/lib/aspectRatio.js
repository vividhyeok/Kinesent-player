export function calculateAspectRatioFit({
  containerWidth,
  containerHeight,
  aspectWidth,
  aspectHeight,
}) {
  const safeContainerWidth = Math.max(0, Number(containerWidth) || 0)
  const safeContainerHeight = Math.max(0, Number(containerHeight) || 0)
  const safeAspectWidth = Math.max(1, Number(aspectWidth) || 1)
  const safeAspectHeight = Math.max(1, Number(aspectHeight) || 1)

  if (safeContainerWidth === 0 || safeContainerHeight === 0) {
    return {
      width: 0,
      height: 0,
      aspectRatio: safeAspectWidth / safeAspectHeight,
    }
  }

  const targetAspectRatio = safeAspectWidth / safeAspectHeight
  const containerAspectRatio = safeContainerWidth / safeContainerHeight

  if (containerAspectRatio > targetAspectRatio) {
    const height = Math.floor(safeContainerHeight)
    const width = Math.floor(height * targetAspectRatio)

    return {
      width,
      height,
      aspectRatio: targetAspectRatio,
    }
  }

  const width = Math.floor(safeContainerWidth)
  const height = Math.floor(width / targetAspectRatio)

  return {
    width,
    height,
    aspectRatio: targetAspectRatio,
  }
}

export function getLetterboxOffsets({
  containerWidth,
  containerHeight,
  width,
  height,
}) {
  const safeContainerWidth = Math.max(0, Number(containerWidth) || 0)
  const safeContainerHeight = Math.max(0, Number(containerHeight) || 0)
  const safeWidth = Math.max(0, Number(width) || 0)
  const safeHeight = Math.max(0, Number(height) || 0)
  const horizontalGap = Math.max(0, safeContainerWidth - safeWidth)
  const verticalGap = Math.max(0, safeContainerHeight - safeHeight)

  return {
    top: Math.floor(verticalGap / 2),
    right: Math.ceil(horizontalGap / 2),
    bottom: Math.ceil(verticalGap / 2),
    left: Math.floor(horizontalGap / 2),
  }
}

export function formatAspectRatioValue(aspectWidth, aspectHeight) {
  return `${aspectWidth} / ${aspectHeight}`
}
