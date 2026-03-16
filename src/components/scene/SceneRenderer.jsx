import AnimatedScene from './AnimatedScene.jsx'
import LoopScene from './LoopScene.jsx'
import ProceduralScene from './ProceduralScene.jsx'
import StaticScene from './StaticScene.jsx'

function SceneRenderer({ currentTriggerStep, scene }) {
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
          revealedHighlightCount={currentTriggerStep}
          scene={scene}
        />
      </div>
    )
  }

  if (scene.type === 'procedural') {
    return (
      <div className="h-full w-full">
        <ProceduralScene
          config={scene.config}
          currentTriggerStep={currentTriggerStep}
          sceneTitle={scene.title}
          template={scene.template}
          triggers={scene.triggers}
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
