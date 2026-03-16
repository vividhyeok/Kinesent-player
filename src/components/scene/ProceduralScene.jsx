import { ProceduralCanvas } from '../procedural/ProceduralCanvas.jsx'
import Array3DTemplate from '../procedural-templates/Array3DTemplate.jsx'
import LinkedList3DTemplate from '../procedural-templates/LinkedList3DTemplate.jsx'
import Queue3DTemplate from '../procedural-templates/Queue3DTemplate.jsx'
import Stack3DTemplate from '../procedural-templates/Stack3DTemplate.jsx'
import { useProceduralSceneState } from '../../hooks/useProceduralSceneState.js'
import { getTemplate } from '../../lib/proceduralTemplates.js'

function UnknownTemplateFallback({ sceneTitle, template }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0f0f0f] px-6 py-8 text-center">
      <div className="max-w-xl rounded-[2rem] border border-amber-300/25 bg-slate-900/85 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.55)]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
          Procedural 오류
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          {sceneTitle}
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          알 수 없는 procedural 템플릿이라서 이 씬을 렌더링할 수 없습니다.
        </p>
        <p className="mt-3 rounded-full bg-amber-100/10 px-4 py-2 text-sm font-semibold text-amber-100">
          템플릿: {template || '없음'}
        </p>
      </div>
    </div>
  )
}

function ProceduralTemplateRouter({ config, step, template }) {
  if (template === 'stack3d') {
    return <Stack3DTemplate config={config} step={step} />
  }

  if (template === 'queue3d') {
    return <Queue3DTemplate config={config} step={step} />
  }

  if (template === 'linkedlist3d') {
    return <LinkedList3DTemplate config={config} step={step} />
  }

  if (template === 'array3d') {
    return <Array3DTemplate config={config} step={step} />
  }

  return null
}

function ProceduralScene({
  currentTriggerStep,
  template,
  config,
  sceneTitle,
  triggers,
}) {
  const proceduralState = useProceduralSceneState(
    {
      type: 'procedural',
      template,
      config,
      triggers,
    },
    currentTriggerStep,
  )

  if (!getTemplate(proceduralState.template)) {
    return (
      <UnknownTemplateFallback
        sceneTitle={sceneTitle}
        template={template}
      />
    )
  }

  return (
    <ProceduralCanvas viewScale={proceduralState.viewScale}>
      <ProceduralTemplateRouter
        config={proceduralState.config}
        step={proceduralState.step}
        template={proceduralState.template}
      />
    </ProceduralCanvas>
  )
}

export default ProceduralScene
