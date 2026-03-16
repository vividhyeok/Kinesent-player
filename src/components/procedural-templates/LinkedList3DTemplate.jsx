import { DiagramBlock, DiagramLabel, HorizontalArrow } from '../procedural/DiagramPrimitives.jsx'

function getBaseColor(config) {
  return config?.color || '#4A90E2'
}

function getItemLabel(configItem, fallbackIndex) {
  const nextLabel = String(configItem ?? '').trim()
  return nextLabel || `노드 ${fallbackIndex + 1}`
}

function LinkedList3DTemplate({ config, step }) {
  const items = Array.isArray(config?.items) ? config.items : []
  const activeIndex =
    step > 0 ? Math.min(step - 1, Math.max(0, items.length - 1)) : -1
  const slotGap = 2.15
  const startX = -((Math.max(items.length, 1) - 1) * slotGap) / 2

  return (
    <group>
      <DiagramLabel fontSize={0.28} position={[0, 2.05, 0]}>
        Linked List
      </DiagramLabel>

      {items.map((item, index) => {
        const positionX = startX + index * slotGap

        return (
          <group key={`${item}-${index}`}>
            <DiagramBlock
              color={getBaseColor(config)}
              isActive={index === activeIndex}
              label={getItemLabel(item, index)}
              position={[positionX, 0.55, 0]}
              width={1.55}
            />
            <DiagramLabel fontSize={0.18} position={[positionX, -0.45, 0]}>
              {`node ${index}`}
            </DiagramLabel>
            {index < items.length - 1 ? (
              <HorizontalArrow
                color={index < activeIndex ? '#d1d5db' : '#6b7280'}
                length={0.78}
                position={[positionX + 1.18, 0.55, 0]}
              />
            ) : null}
          </group>
        )
      })}
    </group>
  )
}

export default LinkedList3DTemplate
