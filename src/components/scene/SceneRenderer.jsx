import AnimatedScene from './AnimatedScene.jsx'
import LoopScene from './LoopScene.jsx'
import StaticScene from './StaticScene.jsx'

function SceneRenderer({ revealedHighlightCount, scene }) {
  if (!scene) {
    return null
  }

  if (scene.type === 'loop') {
    return (
      <div className="h-full w-full">
        <LoopScene key={`${scene.id}:${scene.assetUrl}`} scene={scene} />
      </div>
    )
  }

  if (scene.type === 'animated') {
    return (
      <div className="h-full w-full">
        <AnimatedScene
          key={`${scene.id}:${scene.asset}`}
          revealedHighlightCount={revealedHighlightCount}
          scene={scene}
        />
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <StaticScene key={`${scene.id}:${scene.assetUrl}`} scene={scene} />
    </div>
  )
}

export default SceneRenderer
