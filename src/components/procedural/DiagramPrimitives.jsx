import { Billboard, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color } from 'three'

function hexToRgb(hexColor) {
  const normalizedHex = String(hexColor ?? '')
    .replace('#', '')
    .trim()

  if (!/^[0-9a-fA-F]{6}$/.test(normalizedHex)) {
    return { red: 74, green: 144, blue: 226 }
  }

  return {
    red: Number.parseInt(normalizedHex.slice(0, 2), 16),
    green: Number.parseInt(normalizedHex.slice(2, 4), 16),
    blue: Number.parseInt(normalizedHex.slice(4, 6), 16),
  }
}

function rgbToHex({ red, green, blue }) {
  return `#${[red, green, blue]
    .map((channel) =>
      Math.max(0, Math.min(255, Math.round(channel)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`
}

function lightenHexColor(hexColor, amount = 0.4) {
  const { red, green, blue } = hexToRgb(hexColor)

  return rgbToHex({
    red: red + (255 - red) * amount,
    green: green + (255 - green) * amount,
    blue: blue + (255 - blue) * amount,
  })
}

function smoothLerpFactor(delta, speed = 8) {
  return 1 - Math.exp(-delta * speed)
}

export function DiagramLabel({
  children,
  color = '#ffffff',
  fontSize = 0.26,
  position = [0, 0, 0],
}) {
  return (
    <Billboard position={position}>
      <Text
        anchorX="center"
        anchorY="middle"
        color={color}
        fontSize={fontSize}
        outlineColor="#0f0f0f"
        outlineWidth={0.025}
      >
        {children}
      </Text>
    </Billboard>
  )
}

export function DiagramBlock({
  label,
  color = '#4A90E2',
  depth = 1,
  height = 0.7,
  isActive = false,
  labelPosition = [0, 0, 0.55],
  position = [0, 0, 0],
  scale = [1, 1, 1],
  textColor = '#ffffff',
  width = 1.5,
}) {
  const groupRef = useRef(null)
  const materialRef = useRef(null)
  const nextColorRef = useRef(new Color(color))

  useFrame((_, delta) => {
    const group = groupRef.current
    const material = materialRef.current

    if (!group || !material) {
      return
    }

    const damping = smoothLerpFactor(delta)
    const [targetX, targetY, targetZ] = position
    const [targetScaleX, targetScaleY, targetScaleZ] = scale
    const targetColor = isActive ? lightenHexColor(color, 0.4) : color

    group.position.x += (targetX - group.position.x) * damping
    group.position.y += (targetY - group.position.y) * damping
    group.position.z += (targetZ - group.position.z) * damping
    group.scale.x += (targetScaleX - group.scale.x) * damping
    group.scale.y += (targetScaleY - group.scale.y) * damping
    group.scale.z += (targetScaleZ - group.scale.z) * damping

    nextColorRef.current.set(targetColor)
    material.color.lerp(nextColorRef.current, damping)
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshToonMaterial ref={materialRef} color={isActive ? lightenHexColor(color, 0.4) : color} />
      </mesh>
      <DiagramLabel color={textColor} fontSize={0.23} position={labelPosition}>
        {label}
      </DiagramLabel>
    </group>
  )
}

export function HorizontalArrow({
  color = '#6b7280',
  length = 1.2,
  position = [0, 0, 0],
}) {
  return (
    <group position={position}>
      <mesh position={[-0.12, 0, 0]}>
        <boxGeometry args={[length, 0.08, 0.08]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[length * 0.5 + 0.15, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.18, 0.34, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}
