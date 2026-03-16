import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

const ISOMETRIC_HORIZONTAL_RADIAN = Math.PI / 4
const ISOMETRIC_VERTICAL_RADIAN = Math.atan(Math.sin(Math.PI / 4))

function createIsometricDirection() {
  const cosVertical = Math.cos(ISOMETRIC_VERTICAL_RADIAN)

  return {
    x: cosVertical * Math.sin(ISOMETRIC_HORIZONTAL_RADIAN),
    y: Math.sin(ISOMETRIC_VERTICAL_RADIAN),
    z: cosVertical * Math.cos(ISOMETRIC_HORIZONTAL_RADIAN),
  }
}

export function useProceduralCamera(cameraRef, viewScale = 8) {
  const { size } = useThree()

  useEffect(() => {
    const camera = cameraRef.current

    if (!camera) {
      return
    }

    const direction = createIsometricDirection()
    const distance = Math.max(10, viewScale * 2.35)
    const zoom = Math.max(26, size.height / Math.max(viewScale, 1))

    camera.position.set(
      direction.x * distance,
      direction.y * distance,
      direction.z * distance,
    )
    camera.up.set(0, 1, 0)
    camera.near = -100
    camera.far = 100
    camera.zoom = zoom
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [cameraRef, size.height, size.width, viewScale])
}
