import {
  PROCEDURAL_SCENE_TEMPLATES,
  SCENE_TYPES,
} from './constants.js'

export const SCENE_SCHEMA = {
  id: 'string',
  title: 'string',
  type: SCENE_TYPES.join(' | '),
  asset: 'string (required for static | loop | animated)',
  template: `${PROCEDURAL_SCENE_TEMPLATES.join(' | ')} (required for procedural)`,
  config: 'object (required for procedural)',
  triggers: 'number',
  highlightOrder: ['string'],
  advanceOnLastHighlight: 'boolean (optional)',
  script: 'string (optional, ignored by player)',
}

export const MANIFEST_SCHEMA = {
  title: 'string',
  scenes: [SCENE_SCHEMA],
}

export function createManifestExample() {
  return {
    title: '발표 제목',
    scenes: [
      {
        id: 'scene-1',
        title: '도입',
        type: 'static',
        asset: 'assets/scene-1.svg',
        triggers: 1,
        script: '발표자가 이 씬에서 말할 메모입니다.',
      },
      {
        id: 'scene-2',
        title: '스택 개념',
        type: 'procedural',
        template: 'stack3d',
        config: {
          color: '#4A90E2',
          maxSize: 5,
          items: ['A', 'B', 'C'],
        },
        triggers: 3,
      },
      {
        id: 'scene-3',
        title: '회로 설명',
        type: 'animated',
        asset: 'assets/scene-3.svg',
        triggers: 4,
        highlightOrder: ['signal1', 'signal2', 'signal3'],
        advanceOnLastHighlight: false,
      },
    ],
  }
}
