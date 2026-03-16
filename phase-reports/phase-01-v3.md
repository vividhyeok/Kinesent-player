# Phase 1 v3.0.0 보고서

## 완료된 작업 목록

- `procedural` 씬 타입을 플레이어 manifest 스키마와 검증 규칙에 추가했습니다.
- `template`, `config`, `script` 필드를 포함한 v3 manifest 계약을 정의했고, `script`는 플레이어에서 무시하도록 유지했습니다.
- 레거시 ZIP 호환성을 유지하면서 `static` PNG/JPG, 수동 업로드 MP4 loop 재생 규칙을 그대로 보존했습니다.
- `useZipPresentation.js`에서 procedural 씬은 ZIP 내부 자산 파일 없이도 로드되도록 분기했습니다.
- procedural 설정 정규화를 위한 `proceduralValidation.js`를 추가했습니다.
- 실제 3D 런타임이 연결되기 전까지 procedural 씬이 깨지지 않도록 임시 `ProceduralScene.jsx` placeholder를 추가했습니다.

## 변경된 컴포넌트 및 훅 요약

- `src/hooks/useZipPresentation.js`
  - procedural 씬은 자산 검사와 blob URL 생성 경로에서 제외하고, `template`/`config`를 정규화해 presentation state에 넣습니다.
- `src/lib/manifestSchema.js`
  - procedural 예시와 `template`/`config` 필드를 포함한 v3 계약 문서를 정의합니다.
- `src/lib/manifestValidation.js`
  - `procedural` 타입을 허용하고, 기존 legacy static/loop/animated 검증은 유지한 채 procedural 전용 규칙만 추가합니다.
- `src/lib/proceduralValidation.js`
  - procedural 템플릿 이름과 config 기본값/정규화 규칙을 관리합니다.
- `src/components/scene/SceneRenderer.jsx`
  - procedural 타입을 별도 renderer 분기로 연결합니다.
- `src/components/scene/ProceduralScene.jsx`
  - Phase 2 실제 R3F 렌더러 전까지 procedural 씬이 안전하게 표시되도록 하는 placeholder입니다.

## 디렉토리 구조

```text
src
├─ components
│  └─ scene
│     ├─ AnimatedScene.jsx
│     ├─ LoopScene.jsx
│     ├─ ProceduralScene.jsx
│     ├─ SceneRenderer.jsx
│     └─ StaticScene.jsx
├─ hooks
│  └─ useZipPresentation.js
└─ lib
   ├─ constants.js
   ├─ manifestSchema.js
   ├─ manifestValidation.js
   └─ proceduralValidation.js
```

## 미완료 또는 다음 페이즈로 넘긴 항목

- React Three Fiber 기반 procedural 실시간 렌더러
- `stack3d`, `queue3d`, `linkedlist3d`, `array3d` 템플릿 구현
- orthographic isometric 카메라와 trigger 기반 animation state
- procedural 씬의 실제 플레이백 polish 및 성능 검증

## 특이사항 또는 결정 사항

- 플레이어는 v2.0.0 및 이전 ZIP에 대해 계속 관대하게 동작하도록 유지했습니다. procedural 추가로 기존 PNG/JPG static, 수동 MP4 loop 검증을 강화하지 않았습니다.
- Phase 1에서는 procedural manifest를 받아들이는 것까지가 범위이므로, 화면에는 임시 placeholder만 표시하고 실제 3D 렌더링은 다음 페이즈로 넘겼습니다.
- 검증은 `npm run lint`, `npm run build` 통과로 확인했고, 추가로 procedural + legacy PNG manifest 스모크 테스트를 통과했습니다.
