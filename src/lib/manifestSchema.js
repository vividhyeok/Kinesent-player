import { SCENE_TYPES } from './constants.js'

export const SCENE_SCHEMA = {
  id: 'string',
  title: 'string',
  type: SCENE_TYPES.join(' | '),
  asset: 'string',
  triggers: 'number',
  highlightOrder: ['string'],
  advanceOnLastHighlight: 'boolean (optional)',
  script: 'string (optional)',
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
        asset: 'assets/scene-1.png',
        triggers: 1,
        script: '발표자가 이 씬에서 말할 메모입니다.',
      },
      {
        id: 'scene-2',
        title: '회로 설명',
        type: 'animated',
        asset: 'assets/scene-2.svg',
        triggers: 3,
        highlightOrder: ['signal1', 'signal2', 'signal3'],
        advanceOnLastHighlight: false,
      },
    ],
  }
}
