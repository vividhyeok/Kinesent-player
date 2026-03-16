import { DiagramBlock, DiagramLabel } from '../procedural/DiagramPrimitives.jsx'

function getVisibleCount(step, itemCount) {
  if (step <= itemCount) {
    return step
  }

  return Math.max(0, itemCount - (step - itemCount))
}

function getTopIndex(visibleCount) {
  return visibleCount > 0 ? visibleCount - 1 : -1
}

function getBaseColor(config) {
  return config?.color || '#4A90E2'
}

function getItemLabel(configItem, fallbackIndex) {
  const nextLabel = String(configItem ?? '').trim()
  return nextLabel || `아이템 ${fallbackIndex + 1}`
}

function StackFrame({ maxSize }) {
  const frameHeight = Math.max(2.4, maxSize * 0.78 + 0.7)

  return (
    <group position={[0, frameHeight * 0.5 - 0.25, -0.72]}>
      <mesh position={[0, -frameHeight * 0.5, 0]}>
        <boxGeometry args={[2.15, 0.12, 1.3]} />
        <meshBasicMaterial color="#20242d" />
      </mesh>
      <mesh position={[-1.02, 0, 0]}>
        <boxGeometry args={[0.12, frameHeight, 1.3]} />
        <meshBasicMaterial color="#242a35" />
      </mesh>
      <mesh position={[1.02, 0, 0]}>
        <boxGeometry args={[0.12, frameHeight, 1.3]} />
        <meshBasicMaterial color="#242a35" />
      </mesh>
    </group>
  )
}

function Stack3DTemplate({ config, step }) {
  const items = Array.isArray(config?.items) ? config.items : []
  const maxSize = Number.isInteger(config?.maxSize) && config.maxSize > 0
    ? config.maxSize
    : Math.max(items.length, 1)
  const visibleCount = getVisibleCount(step, items.length)
  const activeTopIndex = getTopIndex(visibleCount)
  const blockBaseY = -1.35
  const blockGap = 0.78
  const dropOffset = 2.8

  return (
    <group>
      <StackFrame maxSize={maxSize} />
      <DiagramLabel fontSize={0.28} position={[0, 2.55, 0]}>
        Stack
      </DiagramLabel>

      {items.map((item, index) => {
        const isVisible = index < visibleCount
        const targetY = blockBaseY + index * blockGap

        return (
          <DiagramBlock
            key={`${item}-${index}`}
            color={getBaseColor(config)}
            isActive={index === activeTopIndex}
            label={getItemLabel(item, index)}
            position={[0, isVisible ? targetY : targetY + dropOffset, 0]}
            scale={isVisible ? [1, 1, 1] : [0.001, 0.001, 0.001]}
          />
        )
      })}
    </group>
  )
}

export default Stack3DTemplate
