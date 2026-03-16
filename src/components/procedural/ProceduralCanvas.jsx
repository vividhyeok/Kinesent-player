import { Suspense, useRef } from 'react'
import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useProceduralCamera } from '../../hooks/useProceduralCamera.js'

function ProceduralCameraRig({ cameraRef, viewScale }) {
  useProceduralCamera(cameraRef, viewScale)
  return null
}

export function ProceduralCanvas({ children, viewScale = 8 }) {
  const cameraRef = useRef(null)

  return (
    <div className="h-full w-full bg-[#0f0f0f]">
      <Canvas
        orthographic
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        shadows={false}
      >
        <color attach="background" args={['#0f0f0f']} />
        <Suspense fallback={null}>
          <OrthographicCamera
            makeDefault
            position={[8, 8, 8]}
            ref={cameraRef}
            zoom={56}
          />
          <ProceduralCameraRig cameraRef={cameraRef} viewScale={viewScale} />
          <ambientLight intensity={1.15} />
          <directionalLight intensity={0.85} position={[8, 12, 10]} />
          <directionalLight intensity={0.35} position={[-6, 8, -4]} />
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
