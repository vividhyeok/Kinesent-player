# Phase 2 완료 보고서

## 완료된 작업 목록

- `src/lib/aspectRatio.js`를 추가해 16:9 프레임 맞춤 크기 계산과 letterbox 여백 계산을 분리했습니다.
- `src/hooks/useAspectRatioViewport.js`를 추가해 현재 플레이어 스테이지 크기에 맞는 최대 16:9 viewport를 계산하고, resize 시 다시 계산하도록 구성했습니다.
- `src/components/stage/AspectRatioViewport.jsx`를 추가해 모든 씬 렌더링이 고정된 16:9 프레임 안에서만 일어나도록 감쌌습니다.
- `PlayerStage.jsx`를 갱신해 기존 자유 크기 스테이지 대신 `AspectRatioViewport`를 기준으로 씬을 렌더링하도록 변경했습니다.
- `PlayerShell.jsx`를 갱신해 일반 모드에서는 기존 장식형 배경을 유지하고, fullscreen에서는 장식 없는 검은 배경만 남도록 정리했습니다.
- `PlayerHeader.jsx`, `PlayerFooter.jsx`, `SceneCounterBadge.jsx`, `PlaybackHint.jsx`, `FullscreenButton.jsx`를 갱신해 fullscreen 진입 시 모든 UI chrome이 완전히 사라지도록 처리했습니다.
- `SceneRenderer.jsx`를 갱신해 모든 씬 타입이 16:9 프레임 내부를 꽉 채우는 동일한 렌더링 경로를 타도록 정리했습니다.
- `App.jsx`를 갱신해 fullscreen 버튼은 실제 씬이 렌더링되는 상태에서만 활성화되고, fullscreen 상태는 shell/stage/footer/hint 렌더링에 직접 반영되도록 조립했습니다.
- 플레이어의 하위 호환 정책은 유지했습니다. `StaticScene.jsx`는 계속 SVG/PNG/JPG를 렌더링하고, `LoopScene.jsx`는 수동 업로드 MP4와 생성 MP4를 구분하지 않습니다.
- `useZipPresentation.js`, `manifestValidation.js`의 permissive 계약은 그대로 유지되어 `script` 필드는 여전히 경고 없이 무시됩니다.
- `npm run lint`, `npm run build`를 통과했고, 16:9 수학 유틸리티 스모크 테스트와 레거시 PNG/JPG/MP4 manifest 스모크 테스트를 통과했습니다.

## 변경된 컴포넌트 및 훅 요약

- `App.jsx`: fullscreen 가능 여부와 현재 씬 렌더 상태를 연결하고, shell/stage/footer에 fullscreen 상태를 전달합니다.
- `PlayerShell.jsx`: 일반 모드와 fullscreen 모드의 배경/장식 레이어를 분기합니다.
- `PlayerStage.jsx`: 스테이지를 `AspectRatioViewport` 안으로 고정하고 fullscreen 시 외곽 padding을 제거합니다.
- `AspectRatioViewport.jsx`: 실제 16:9 프레임을 만들고 scene 콘텐츠를 그 안에만 렌더링합니다.
- `useAspectRatioViewport.js`: `ResizeObserver`와 window resize를 사용해 viewport 크기와 letterbox 값을 재계산합니다.
- `aspectRatio.js`: 순수 수학 계산만 담당하는 16:9 fit/letterbox 유틸리티입니다.
- `PlayerHeader.jsx`: fullscreen 시 완전히 숨고, 일반 모드에서는 scene counter와 ZIP 열기, fullscreen 버튼을 배치합니다.
- `PlayerFooter.jsx`: fullscreen 시 완전히 숨고, 일반 모드에서만 힌트와 수동 트리거 버튼을 보여줍니다.
- `SceneCounterBadge.jsx`: fullscreen 시 렌더하지 않고, 일반 모드에서는 현재 씬 번호를 표시합니다.
- `PlaybackHint.jsx`: fullscreen 시 렌더하지 않고, 일반 모드에서는 기존 자동 숨김 동작을 유지합니다.
- `FullscreenButton.jsx`: fullscreen 진입 후에는 화면 위에 남지 않도록 렌더 자체를 멈춥니다.
- `SceneRenderer.jsx`: scene 타입과 관계없이 16:9 프레임 내부 전체 영역을 기준으로 씬 컴포넌트를 마운트합니다.

## 디렉토리 구조 (tree 형태)

```text
kinesent-player
|-- package.json
|-- phase-reports
|   |-- phase-01.md
|   |-- phase-02-v2.md
|   |-- phase-02.md
|   |-- phase-03-player.md
|   |-- phase-05.md
|   `-- phase-06.md
`-- src
    |-- App.jsx
    |-- index.css
    |-- main.jsx
    |-- components
    |   |-- app
    |   |   |-- PlayerFooter.jsx
    |   |   |-- PlayerHeader.jsx
    |   |   |-- PlayerShell.jsx
    |   |   `-- PlayerStage.jsx
    |   |-- loader
    |   |   |-- LoadErrorPanel.jsx
    |   |   |-- LoadingOverlay.jsx
    |   |   |-- ZipDropzone.jsx
    |   |   `-- ZipOpenButton.jsx
    |   |-- navigation
    |   |   |-- KeyboardShortcutLayer.jsx
    |   |   `-- TriggerController.jsx
    |   |-- overlay
    |   |   |-- FullscreenButton.jsx
    |   |   |-- PlaybackHint.jsx
    |   |   `-- SceneCounterBadge.jsx
    |   |-- scene
    |   |   |-- AnimatedScene.jsx
    |   |   |-- LoopScene.jsx
    |   |   |-- SceneRenderer.jsx
    |   |   `-- StaticScene.jsx
    |   `-- stage
    |       `-- AspectRatioViewport.jsx
    |-- hooks
    |   |-- useAspectRatioViewport.js
    |   |-- useFullscreen.js
    |   |-- useKeyboardTrigger.js
    |   |-- usePresentationState.js
    |   |-- useScenePreload.js
    |   `-- useZipPresentation.js
    `-- lib
        |-- aspectRatio.js
        |-- assetUrlRegistry.js
        |-- constants.js
        |-- manifestSchema.js
        |-- manifestValidation.js
        |-- sceneProgress.js
        |-- svgHighlightParser.js
        `-- zipReader.js
```

## 미완료 또는 다음 페이즈로 넘긴 항목

- 실제 브라우저 환경에서의 fullscreen 수동 QA
- 전체 플레이어 통합 시나리오 점검
- 에디터와 연결한 end-to-end ZIP 검증
- v2.0.0 나머지 플레이어 폴리시 및 최종 릴리스 정리

## 특이사항 또는 결정 사항

- 하위 호환 정책은 그대로 유지했습니다. v1.0.0 ZIP의 PNG/JPG static, 수동 업로드 MP4 loop, `script` 필드는 모두 계속 허용됩니다.
- fullscreen에서는 chrome을 완전히 숨기고, 16:9 viewport 바깥 영역은 검은 letterbox로 남겨 scene 콘텐츠만 보이도록 했습니다.
- fullscreen 버튼은 씬이 실제로 렌더링되는 상태에서만 활성화되도록 했습니다. ZIP을 아직 열지 않은 상태에서는 fullscreen으로 들어가지 않습니다.
- 이 환경에서는 로컬 Chrome/Edge headless 실행 경로를 바로 찾지 못해 브라우저 자동화 QA는 수행하지 못했습니다. 대신 `npm run lint`, `npm run build`, 16:9 계산 스모크 테스트, 레거시 manifest 스모크 테스트로 구현 안정성을 확인했습니다.
