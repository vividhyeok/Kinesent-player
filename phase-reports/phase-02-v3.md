# Phase 02 v3 보고서

## 완료된 작업 목록

- `@react-three/fiber`, `@react-three/drei`, `three`를 `kinesent-player`에 추가했습니다.
- `ProceduralCanvas.jsx`와 `useProceduralCamera.js`를 추가해 16:9 스테이지 안에서 공통으로 쓰는 직교 투영 등각 3D 캔버스를 구성했습니다.
- `ProceduralScene.jsx`를 실제 procedural 재생 엔트리로 교체하고, 템플릿 레지스트리(`proceduralTemplates.js`)를 통해 템플릿별 렌더링을 연결했습니다.
- `useProceduralSceneState.js`를 추가해 `currentTriggerStep`을 procedural 템플릿이 사용할 단계 상태로 정규화했습니다.
- `stack3d`, `queue3d`, `linkedlist3d`, `array3d` 템플릿을 각각 구현했습니다.
- `SceneRenderer.jsx`, `App.jsx`, `usePresentationState.js`, `sceneProgress.js`를 갱신해 procedural 씬이 기존 재생 흐름 안에서 트리거를 소비하고 다음 씬으로 넘어가도록 연결했습니다.
- `useScenePreload.js`를 수정해 procedural 씬은 파일 에셋 프리로드 대상에서 제외했습니다.
- 기존 `static`, `loop`, `animated` 렌더링 경로와 레거시 ZIP 허용 정책은 유지했습니다.
- `npm run lint`, `npm run build`를 통과했습니다.

## 변경된 컴포넌트 및 훅 요약

- `src/components/procedural/ProceduralCanvas.jsx`
  - procedural 템플릿 공통 캔버스 래퍼입니다.
  - 다크 배경, 직교 카메라, 고정 조명 구성을 담당합니다.
- `src/components/procedural/DiagramPrimitives.jsx`
  - 박스, 라벨, 화살표 같은 공통 3D 다이어그램 조각을 제공합니다.
  - 템플릿 간 스타일 일관성을 유지합니다.
- `src/components/scene/ProceduralScene.jsx`
  - procedural 씬 진입점입니다.
  - 템플릿 이름을 해석하고 알 수 없는 템플릿이면 한국어 fallback 메시지를 표시합니다.
- `src/components/procedural-templates/Stack3DTemplate.jsx`
  - push 이후 pop 단계까지 표현하는 스택 3D 다이어그램 템플릿입니다.
- `src/components/procedural-templates/Queue3DTemplate.jsx`
  - enqueue 이후 dequeue 단계까지 표현하는 큐 3D 다이어그램 템플릿입니다.
- `src/components/procedural-templates/LinkedList3DTemplate.jsx`
  - 연결 리스트 노드와 화살표, 순차 방문 하이라이트를 렌더링합니다.
- `src/components/procedural-templates/Array3DTemplate.jsx`
  - 배열 셀, 인덱스 라벨, 현재 하이라이트 셀을 렌더링합니다.
- `src/hooks/useProceduralCamera.js`
  - 표준 등각 시점 각도를 유지하면서 캔버스 크기에 맞는 직교 카메라 줌을 계산합니다.
- `src/hooks/useProceduralSceneState.js`
  - manifest의 procedural 설정을 템플릿에서 바로 쓸 수 있는 `step`, `viewScale`, `config` 상태로 정리합니다.
- `src/hooks/usePresentationState.js`
  - animated와 procedural이 공통으로 쓰는 단계 상태를 `currentTriggerStep` 기준으로 관리하도록 정리했습니다.
- `src/lib/sceneProgress.js`
  - procedural 씬의 단계 진행과 마지막 트리거 이후 씬 전환 규칙을 계산합니다.
- `src/lib/proceduralTemplates.js`
  - 템플릿 문자열과 실제 React 컴포넌트를 매핑합니다.
- `src/hooks/useScenePreload.js`
  - procedural 씬은 에셋 URL이 없으므로 프리로드 대상에서 제외합니다.

## 디렉토리 구조 (tree 형태)

```text
kinesent-player
├─ package.json
├─ package-lock.json
├─ src
│  ├─ App.jsx
│  ├─ components
│  │  ├─ procedural
│  │  │  ├─ DiagramPrimitives.jsx
│  │  │  └─ ProceduralCanvas.jsx
│  │  ├─ procedural-templates
│  │  │  ├─ Array3DTemplate.jsx
│  │  │  ├─ LinkedList3DTemplate.jsx
│  │  │  ├─ Queue3DTemplate.jsx
│  │  │  └─ Stack3DTemplate.jsx
│  │  └─ scene
│  │     ├─ AnimatedScene.jsx
│  │     ├─ LoopScene.jsx
│  │     ├─ ProceduralScene.jsx
│  │     ├─ SceneRenderer.jsx
│  │     └─ StaticScene.jsx
│  ├─ hooks
│  │  ├─ usePresentationState.js
│  │  ├─ useProceduralCamera.js
│  │  ├─ useProceduralSceneState.js
│  │  └─ useScenePreload.js
│  └─ lib
│     ├─ proceduralTemplates.js
│     ├─ proceduralValidation.js
│     └─ sceneProgress.js
└─ phase-reports
   └─ phase-02-v3.md
```

## 미완료 또는 다음 페이즈로 넘긴 항목

- procedural 씬 편집 UI와 config 편집 기능은 에디터 Phase 3 이후 작업으로 남겨 두었습니다.
- procedural 씬 전용 성능 최적화와 추가 템플릿 확장은 이번 페이즈 범위에 포함하지 않았습니다.
- 실제 브라우저 상호작용 기반 시각 QA는 다음 통합 QA 페이즈에서 다시 확인할 예정입니다.

## 특이사항 또는 결정 사항

- procedural 씬도 기존 `AspectRatioViewport` 안에서 렌더링되도록 유지해 기존 16:9 정책과 충돌하지 않게 구성했습니다.
- procedural 진행 상태는 별도 전용 상태를 추가하지 않고 `currentTriggerStep` 공통 모델로 통합해 animated와 동일한 재생 패턴을 따르도록 정리했습니다.
- 알 수 없는 procedural 템플릿 이름은 로딩 실패로 처리하지 않고 씬 내부의 한국어 fallback 메시지로 보여주도록 했습니다.
- R3F 도입 이후 프로덕션 번들에 500kB 초과 경고가 발생하지만 현재는 빌드 실패는 아니며, 코드 분할 여부는 이후 성능 점검 페이즈에서 판단하기로 했습니다.
- `npm run lint`, `npm run build`는 모두 통과했습니다.
- 실제 크롬에서 스페이스바/리모컨 입력에 맞춘 3D 애니메이션 체감 품질은 이 환경에서 자동화하지 못해 수동 브라우저 검증이 추가로 필요합니다.
