# Phase 6 완료 보고서

## 완료된 작업 목록

- 루트에 `vercel.json`을 추가해 모든 경로를 `index.html`로 재작성하도록 설정했습니다.
- `package.json`의 `build` 스크립트가 `vite build`를 사용하고, 출력 결과가 `dist`에 생성되는 것을 다시 확인했습니다.
- `vite.config.js`에 로컬 절대 경로나 Vercel 배포를 깨뜨릴 설정이 없는 것을 확인했습니다.
- `README.md`를 한국어로 교체해 플레이어 사용 방법과 Vercel 배포 절차를 문서화했습니다.
- 사용하지 않는 기본 정적 자산 `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `public/icons.svg`를 제거했습니다.
- 빌드된 플레이어를 로컬 정적 서버로 띄워 에디터 산출물과의 통합 QA를 진행했습니다.
- `npm run lint`, `npm run build`를 통과했습니다.

## QA 시나리오별 결과 (통과 / 실패 / 미확인)

- 시나리오 1 — 기본 재생 흐름: 통과
  - 에디터 UI에서 `static`, `loop`, `animated`, `animated(advanceOnLastHighlight: true)`, `static` 순서의 ZIP을 생성했습니다.
  - 플레이어에서 ZIP을 드래그 앤 드롭으로 열었고, `img`, `video`, `svg` 렌더링을 각각 확인했습니다.
  - `Space`로 1번 씬에서 2번 씬으로, `PageDown`으로 2번 씬에서 3번 씬으로 진행되는 것을 확인했습니다.
- 시나리오 2 — animated 씬 트리거: 통과
  - `advanceOnLastHighlight: false` 씬은 마지막 하이라이트 후 한 번 더 입력해야 다음 씬으로 이동했습니다.
  - `advanceOnLastHighlight: true` 씬은 마지막 하이라이트와 같은 입력에서 다음 씬으로 이동했습니다.
- 시나리오 3 — 대량 씬: 통과
  - 에디터 export 경로를 사용해 45개 정적 씬 ZIP을 생성했고, 플레이어에서 `1 / 45` 표시까지 약 179ms 안에 로드됐습니다.
  - 이후 연속 진행에서 `6 / 45`까지 즉시 반응하는 것을 확인했습니다.
  - QuickJump 검증은 에디터 쪽 보고서와 동일한 통합 QA로 통과했습니다.
- 시나리오 4 — 오류 처리: 통과
  - 잘못된 `manifest.json` ZIP에서 `manifest.json 검증에 실패했습니다.`와 검증 메시지가 한국어로 표시됐습니다.
  - 누락 에셋 ZIP에서 `ZIP 안에 누락된 에셋 파일이 있습니다.`와 누락 경로가 한국어로 표시됐습니다.
- 시나리오 5 — manifest import 및 프롬프트 생성기: 통과
  - 해당 검증은 에디터 쪽 통합 QA에서 완료했고, 플레이어는 그 결과 ZIP을 정상 재생했습니다.
- 시나리오 6 — 전체화면: 통과
  - 전체화면 진입 시 `document.fullscreenElement` 활성화를 확인했습니다.
  - `SceneCounterBadge`가 전체화면에서도 계속 표시되는 것을 확인했습니다.

## 디렉토리 구조

```text
kinesent-player
|-- README.md
|-- vercel.json
|-- package.json
|-- vite.config.js
|-- public
|   `-- favicon.svg
|-- phase-reports
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

## 미완료 또는 다음 버전으로 넘긴 항목

- 실제 Vercel 프로젝트 연결과 실배포 실행은 계정/조직 권한이 필요한 작업이라 이번 로컬 작업 범위에서는 수행하지 않았습니다.
- 브라우저별 수동 QA 확대는 v1.0.0 배포 이후 필요 시 다음 버전에서 보강할 수 있습니다.

## 특이사항 또는 결정 사항

- 통합 QA는 `dist` 빌드 결과를 로컬 정적 서버에 올린 뒤 headless Chromium으로 수행했습니다.
- 기본 재생 시나리오용 ZIP은 에디터 UI에서 실제로 생성한 파일을 사용했습니다.
- 대량 씬 ZIP과 오류 유도 ZIP은 에디터 export 경로 및 보조 스크립트로 생성했습니다.
- `start.bat`은 에디터 쪽에서 `npm run build` 후 `npx serve dist`를 호출하도록 수정됐고, 실행 시 `npm` 프로세스 기동까지 확인했습니다.
