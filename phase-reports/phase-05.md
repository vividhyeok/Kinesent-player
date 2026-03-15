# Phase 5 완료 보고서

## 완료된 작업 목록

- `useScenePreload.js`를 보강해 현재 씬과 인접 씬(이전, 다음)을 적극적으로 예열하고, 더 이상 필요 없는 프리로드 리소스를 즉시 정리하도록 수정했습니다.
- `assetUrlRegistry.js`를 보강해 새 ZIP을 다시 불러올 때와 컴포넌트 언마운트 시점에 생성된 object URL이 전부 해제되도록 정리 경로를 명확히 했습니다.
- `useZipPresentation.js`에 ZIP 내부 에셋 누락 검사 로직을 추가해, ZIP 구조는 유효하지만 특정 씬의 에셋 파일이 빠진 경우 명확한 한국어 오류를 표시하도록 했습니다.
- `LoopScene.jsx`를 조정해 Chrome 정책에 맞는 `muted autoplay`를 우선 시도하고, 자동 재생이 차단되면 수동 재생 버튼과 안내 문구를 한국어로 표시하도록 했습니다.
- `AnimatedScene.jsx`를 다듬어 하이라이트 전환에 부드러운 CSS 트랜지션을 적용했고, 누락된 SVG ID가 있을 때 경고 메시지를 표시하도록 했습니다.
- `usePresentationState.js`를 조정해 `advanceOnLastHighlight`가 `false`일 때는 마지막 하이라이트 후 대기하고, `true`일 때는 마지막 하이라이트와 같은 트리거에서 자연스럽게 다음 씬으로 넘어가도록 끝단 동작을 보정했습니다.
- `useFullscreen.js`, `PlayerShell.jsx`, `PlayerStage.jsx`, `PlayerHeader.jsx`, `PlayerFooter.jsx`를 조정해 전체화면 전환 시 레이아웃이 화면을 안정적으로 채우고 오버플로우나 잘림 없이 유지되도록 했습니다.
- `SceneCounterBadge.jsx`에 반투명 배경, 테두리, 그림자, 블러를 추가해 어떤 배경에서도 읽히도록 가독성을 높였습니다.
- `PlaybackHint.jsx`를 조정해 일정 시간 입력이 없으면 자동으로 숨고, 마우스 이동이나 키 입력이 들어오면 다시 나타나도록 했습니다.
- `LoadErrorPanel.jsx`, `LoadingOverlay.jsx`, `ZipDropzone.jsx`, `ZipOpenButton.jsx`, `FullscreenButton.jsx`, `TriggerController.jsx`, `App.jsx`의 문구와 상태 표시를 한국어 기준으로 다듬었습니다.
- `npm run lint`, `npm run build`를 통과했고, `kinesent-editor`에서 내보낸 45개 씬 ZIP으로 headless Chromium 재생 흐름을 검증했습니다.
- 자동 재생 차단 상황은 브라우저의 `play()` 거부를 시뮬레이션하는 방식으로 검증했고, 누락 에셋 ZIP에 대해서도 오류 패널의 한국어 메시지를 확인했습니다.

## 변경된 컴포넌트 및 훅 요약

- `App.jsx`: 로딩, 오류, 프레젠테이션 상태 분기를 한국어 UX에 맞게 정리하고 전체 흐름을 조립합니다.
- `PlayerShell.jsx`, `PlayerHeader.jsx`, `PlayerStage.jsx`, `PlayerFooter.jsx`: 전체화면 포함 플레이어 레이아웃의 안전한 크기 계산과 오버레이 배치를 담당합니다.
- `LoadErrorPanel.jsx`: 복구 가능한 안내 문구와 재시도 방향을 한국어로 보여줍니다.
- `LoadingOverlay.jsx`: ZIP 파싱 및 에셋 준비 진행 상태를 한국어로 표시합니다.
- `ZipDropzone.jsx`, `ZipOpenButton.jsx`: ZIP 입력 진입점을 제공하고 잘못된 파일 형식에 대한 메시지를 보여줍니다.
- `SceneRenderer.jsx`: 씬 타입별 렌더러를 고유 key와 함께 분기해 씬 전환 시 내부 상태가 깨끗하게 초기화되도록 합니다.
- `StaticScene.jsx`: 정적 이미지를 표시합니다.
- `LoopScene.jsx`: 루프 비디오 자동 재생, 차단 시 수동 재생 안내, 재시도 흐름을 담당합니다.
- `AnimatedScene.jsx`: SVG 하이라이트 적용, 트랜지션, 누락 ID 안내를 담당합니다.
- `SceneCounterBadge.jsx`: 현재 씬 수와 전체 씬 수를 항상 읽기 쉬운 형태로 고정 표시합니다.
- `PlaybackHint.jsx`: 단축키 힌트를 표시하고 일정 시간 비활성 상태에서 자동 숨김 처리합니다.
- `FullscreenButton.jsx`: 전체화면 전환 버튼과 현재 상태 문구를 표시합니다.
- `TriggerController.jsx`: 사용자의 다음 진행 입력을 한 곳에서 처리합니다.
- `useZipPresentation.js`: ZIP 읽기, manifest 검증, 에셋 누락 검사, object URL 생성 및 정리를 총괄합니다.
- `useScenePreload.js`: 현재 씬과 인접 씬의 이미지/비디오를 선행 로드하고 불필요한 프리로드 리소스를 해제합니다.
- `usePresentationState.js`: 현재 씬 인덱스, animated 진행 단계, 자동 진행 타이밍을 관리합니다.
- `useFullscreen.js`: Fullscreen API와 body overflow 잠금을 래핑합니다.
- `assetUrlRegistry.js`: 에셋별 object URL 생성, 조회, 개별 해제, 일괄 해제를 담당합니다.
- `constants.js`: 프리로드 반경, 힌트 자동 숨김 시간, 같은 트리거에서의 자동 진행 지연값 등 플레이어 상수를 관리합니다.

## 디렉토리 구조

```text
kinesent-player
|-- package.json
|-- phase-reports
|   |-- phase-02.md
|   |-- phase-03-player.md
|   `-- phase-05.md
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
    |   `-- scene
    |       |-- AnimatedScene.jsx
    |       |-- LoopScene.jsx
    |       |-- SceneRenderer.jsx
    |       `-- StaticScene.jsx
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

- Vercel 배포 설정 점검과 배포 전 체크리스트 정리는 다음 Phase 6에서 진행합니다.
- 최종 통합 QA 문서화와 브라우저별 수동 점검 범위 확대는 다음 Phase 6에서 진행합니다.
- 에디터와 플레이어를 묶은 사용자 가이드 문서 정리는 다음 Phase 6에서 진행합니다.

## 특이사항 또는 결정 사항

- 프리로드는 현재 씬과 인접 씬을 우선 대상으로 잡았고, 현재 루프 씬은 이미 화면에서 재생 중인 비디오가 있으므로 별도 숨김 프리로드를 중복 생성하지 않도록 정리했습니다.
- `advanceOnLastHighlight: true`는 마지막 하이라이트를 보여준 뒤 매우 짧은 지연 후 다음 씬으로 전환하도록 처리해, 같은 트리거에서 넘어가면서도 하이라이트 변화가 시각적으로 보이도록 조정했습니다.
- 누락 에셋 검사는 object URL 생성 전에 먼저 수행해, 불완전한 ZIP을 일부만 로드한 상태로 플레이어가 진입하지 않도록 했습니다.
- 45개 씬 ZIP과 누락 에셋 ZIP은 `kinesent-editor`의 export 경로를 사용해 생성해 검증했습니다. 이로써 에디터 산출물이 플레이어에서 바로 열리는 흐름을 함께 확인했습니다.
- 자동 재생 차단 검증은 실제 브라우저 정책을 강제로 유발하기 어렵기 때문에, headless Chromium에서 `HTMLMediaElement.play()` 거부를 시뮬레이션하는 방식으로 수동 재생 안내 UI를 확인했습니다.
