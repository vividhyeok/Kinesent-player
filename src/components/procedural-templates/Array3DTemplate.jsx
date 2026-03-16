import { DiagramBlock, DiagramLabel } from '../procedural/DiagramPrimitives.jsx'

function getBaseColor(config) {
  return config?.color || '#4A90E2'
}

function getItemLabel(configItem, fallbackIndex) {
  const nextLabel = String(configItem ?? '').trim()
  return nextLabel || `셀 ${fallbackIndex + 1}`
}

function Array3DTemplate({ config, step }) {
  const items = Array.isArray(config?.items) ? config.items : []
  const activeIndex =
    step > 0 ? Math.min(step - 1, Math.max(0, items.length - 1)) : -1
  const slotGap = 1.6
  const startX = -((Math.max(items.length, 1) - 1) * slotGap) / 2

  return (
    <group>
      <DiagramLabel fontSize={0.28} position={[0, 1.85, 0]}>
        Array
      </DiagramLabel>

      {items.map((item, index) => {
        const positionX = startX + index * slotGap

        return (
          <group key={`${item}-${index}`}>
            <DiagramBlock
              color={getBaseColor(config)}
              isActive={index === activeIndex}
              label={getItemLabel(item, index)}
              position={[positionX, 0.6, 0]}
              width={1.2}
            />
            <DiagramLabel fontSize={0.18} position={[positionX, -0.45, 0]}>
              {String(index)}
            </DiagramLabel>
          </group>
        )
      })}
    </group>
  )
}

export default Array3DTemplate
