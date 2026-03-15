import AnimatedScene from './AnimatedScene.jsx'
import LoopScene from './LoopScene.jsx'
import StaticScene from './StaticScene.jsx'

function SceneRenderer({ revealedHighlightCount, scene }) {
  if (!scene) {
    return null
  }

  if (scene.type === 'loop') {
    return <LoopScene key={`${scene.id}:${scene.assetUrl}`} scene={scene} />
  }

  if (scene.type === 'animated') {
    return (
      <AnimatedScene
        key={`${scene.id}:${scene.asset}`}
        revealedHighlightCount={revealedHighlightCount}
        scene={scene}
      />
    )
  }

  return <StaticScene key={`${scene.id}:${scene.assetUrl}`} scene={scene} />
}

export default SceneRenderer
