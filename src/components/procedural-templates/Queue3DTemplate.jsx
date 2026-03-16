import { DiagramBlock, DiagramLabel } from '../procedural/DiagramPrimitives.jsx'

function getQueueState(step, itemCount) {
  const enqueuedCount = Math.min(step, itemCount)
  const dequeuedCount =
    step > itemCount ? Math.min(step - itemCount, itemCount) : 0

  return {
    enqueuedCount,
    dequeuedCount,
    visibleCount: Math.max(0, enqueuedCount - dequeuedCount),
  }
}

function getBaseColor(config) {
  return config?.color || '#4A90E2'
}

function getItemLabel(configItem, fallbackIndex) {
  const nextLabel = String(configItem ?? '').trim()
  return nextLabel || `아이템 ${fallbackIndex + 1}`
}

function QueueFrame({ maxSize }) {
  const frameWidth = Math.max(4.4, maxSize * 1.55)

  return (
    <group position={[0, -0.06, -0.76]}>
      <mesh>
        <boxGeometry args={[frameWidth, 0.14, 1.28]} />
        <meshBasicMaterial color="#1f2430" />
      </mesh>
      <mesh position={[-frameWidth * 0.5 + 0.18, 0.32, 0]}>
        <boxGeometry args={[0.16, 0.78, 1.28]} />
        <meshBasicMaterial color="#272d39" />
      </mesh>
      <mesh position={[frameWidth * 0.5 - 0.18, 0.32, 0]}>
        <boxGeometry args={[0.16, 0.78, 1.28]} />
        <meshBasicMaterial color="#272d39" />
      </mesh>
    </group>
  )
}

function Queue3DTemplate({ config, step }) {
  const items = Array.isArray(config?.items) ? config.items : []
  const maxSize = Number.isInteger(config?.maxSize) && config.maxSize > 0
    ? config.maxSize
    : Math.max(items.length, 1)
  const { enqueuedCount, dequeuedCount, visibleCount } = getQueueState(step, items.length)
  const activeFrontIndex = visibleCount > 0 ? dequeuedCount : -1
  const slotGap = 1.52
  const startX = -((Math.max(maxSize, 1) - 1) * slotGap) / 2
  const incomingOffset = 2.4

  return (
    <group>
      <QueueFrame maxSize={maxSize} />
      <DiagramLabel fontSize={0.28} position={[0, 2.1, 0]}>
        Queue
      </DiagramLabel>

      {items.map((item, index) => {
        const isVisible = index >= dequeuedCount && index < enqueuedCount
        const visibleSlot = index - dequeuedCount
        const targetX = startX + visibleSlot * slotGap
        const parkedX = startX + (index + 1) * slotGap + incomingOffset

        return (
          <DiagramBlock
            key={`${item}-${index}`}
            color={getBaseColor(config)}
            isActive={index === activeFrontIndex}
            label={getItemLabel(item, index)}
            position={[isVisible ? targetX : parkedX, 0.45, 0]}
            scale={isVisible ? [1, 1, 1] : [0.001, 0.001, 0.001]}
          />
        )
      })}
    </group>
  )
}

export default Queue3DTemplate
