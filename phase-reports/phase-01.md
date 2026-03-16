# Phase 1 완료 보고서

## 완료된 작업 목록

- `manifestSchema.js`에 `scene.script` 선택 필드를 추가해 v2.0.0 데이터 계약 초안을 반영했습니다.
- `manifestValidation.js`에 `script`가 들어올 경우 문자열이어야 한다는 규칙을 추가했습니다.
- `useZipPresentation.js`에서 `script` 필드를 재생 상태로 넘기지 않도록 분리해 플레이어가 해당 필드를 조용히 무시하도록 처리했습니다.
- `constants.js`에 16:9 캔버스 비율 상수를 추가해 이후 플레이어 스테이지 고정 작업의 기준값을 마련했습니다.
- 플레이어 검증 규칙은 강화하지 않았고, v1.0.0 ZIP의 PNG/JPG 기반 static 씬과 수동 업로드 MP4 loop 씬이 계속 재생 가능한 계약을 유지했습니다.
- `npm run lint`, `npm run build`를 통과했고, 레거시 PNG/MP4 자산 경로와 `script`가 섞인 manifest 스모크 테스트도 통과했습니다.

## 각 컴포넌트 및 훅의 역할 요약

- `useZipPresentation.js`: ZIP에서 읽은 scene 데이터 중 `script`를 재생 상태에서 제외하고, 기존 재생 흐름은 그대로 유지합니다.
- `manifestSchema.js`: 플레이어가 이해할 수 있는 manifest 구조를 정의하며, `script`는 선택 필드로만 허용합니다.
- `manifestValidation.js`: `script`가 존재할 때 타입만 확인하고, 자산 형식에 대한 추가 제한은 두지 않습니다.
- `constants.js`: 차기 페이즈에서 사용할 16:9 뷰포트 기준 상수를 제공합니다.

## 디렉토리 구조 (tree 형태)

```text
kinesent-player
|-- package.json
|-- phase-reports
|   |-- phase-01.md
|   |-- phase-02.md
|   |-- phase-03-player.md
|   |-- phase-05.md
|   `-- phase-06.md
`-- src
    |-- App.jsx
    |-- main.jsx
    |-- hooks
    |   |-- useFullscreen.js
    |   |-- useKeyboardTrigger.js
    |   |-- usePresentationState.js
    |   |-- useScenePreload.js
    |   `-- useZipPresentation.js
    `-- lib
        |-- assetUrlRegistry.js
        |-- constants.js
        |-- manifestSchema.js
        |-- manifestValidation.js
        |-- sceneProgress.js
        |-- svgHighlightParser.js
        `-- zipReader.js
```

## 미완료 또는 다음 페이즈로 넘긴 항목

- 전체화면 진입 시 오버레이를 완전히 숨기는 UI 정리
- 플레이어 스테이지의 실제 16:9 고정 렌더링
- 전체화면/창 모드 공통 레이아웃 보정
- v2.0.0 전용 플레이어 QA

## 특이사항 또는 결정 사항

- 플레이어는 하위 호환 우선 정책을 유지합니다. v2.0.0 에디터가 SVG 전용 static, 생성 기반 loop를 강제하더라도 플레이어는 v1.0.0 ZIP의 PNG/JPG/MP4를 그대로 재생해야 합니다.
- `script` 필드는 플레이어에서 사용하지 않으므로 재생 상태에서 제거만 하고 오류로 취급하지 않습니다.
- 이번 페이즈에서는 플레이어 기능을 늘리지 않고 계약과 호환성만 정리했습니다.
