# Phase 02 보고서

## 완료된 작업 목록

- ZIP 드래그 앤 드롭 입력을 처리하는 `ZipDropzone.jsx`를 구현했다.
- 클릭 기반 ZIP 선택 폴백인 `ZipOpenButton.jsx`를 구현했다.
- 로딩 진행률과 현재 작업 단계를 표시하는 `LoadingOverlay.jsx`를 구현했다.
- manifest 또는 자산 오류를 한국어로 안내하는 `LoadErrorPanel.jsx`를 구현했다.
- JSZip 기반 ZIP 읽기와 경로 정규화를 처리하는 `src/lib/zipReader.js`를 구현했다.
- 객체 URL 생성과 해제를 담당하는 `src/lib/assetUrlRegistry.js`를 구현했다.
- ZIP 로딩, manifest 검증, 자산 준비, 오류 상태 전환을 담당하는 `src/hooks/useZipPresentation.js`를 구현했다.
- 씬 타입별 렌더러인 `SceneRenderer.jsx`, `StaticScene.jsx`, `LoopScene.jsx`, `AnimatedScene.jsx`를 구현했다.
- SVG 내부 id 해석과 하이라이트 대상 탐색을 처리하는 `src/lib/svgHighlightParser.js`를 구현했다.
- animated 씬의 단계 진행 규칙을 계산하는 `src/lib/sceneProgress.js`를 구현했다.
- 현재 씬 인덱스와 animated 하이라이트 진행 상태를 관리하는 `src/hooks/usePresentationState.js`를 구현했다.
- Spacebar, PageDown 입력을 연결하는 `KeyboardShortcutLayer.jsx`, `src/hooks/useKeyboardTrigger.js`를 구현했다.
- 전체화면 상태와 토글을 처리하는 `src/hooks/useFullscreen.js`, `FullscreenButton.jsx`를 구현했다.
- 현재 씬 수/전체 씬 수를 항상 표시하는 `SceneCounterBadge.jsx`를 구현했다.
- 단축키 안내를 표시하는 `PlaybackHint.jsx`를 구현했다.
- 플레이어 레이아웃 구성 요소 `PlayerShell.jsx`, `PlayerHeader.jsx`, `PlayerStage.jsx`, `PlayerFooter.jsx`를 구현했다.
- 인접 씬 자산 프리로드를 수행하는 `src/hooks/useScenePreload.js`를 구현했다.
- `App.jsx`를 전체 Phase 2 재생 흐름에 맞게 연결했다.
- `jszip` 의존성을 `kinesent-player`에만 추가했다.
- `npm run lint`, `npm run build`를 통과했다.
- 임시 샘플 ZIP을 생성해 ZIP 읽기, manifest 검증, blob URL 생성, animated 단계 진행 규칙을 별도 스크립트로 확인했다.

## 각 컴포넌트 및 훅의 역할 요약

### 레이아웃

- `App.jsx`
  - ZIP 입력, 로딩, 에러, 재생 상태를 한 화면에서 연결한다.

- `PlayerShell.jsx`
  - 플레이어 전체 배경, 레이아웃 프레임, fullscreen 대상 루트를 제공한다.

- `PlayerHeader.jsx`
  - 발표 제목, ZIP 열기 버튼, 씬 카운터, 전체화면 버튼을 표시한다.

- `PlayerStage.jsx`
  - 실제 씬이 렌더링되는 16:9 무대 영역을 제공한다.

- `PlayerFooter.jsx`
  - 단축키 안내와 수동 진행 버튼을 배치한다.

### 로더

- `ZipDropzone.jsx`
  - drag enter/leave/drop 이벤트를 처리하고 ZIP 파일만 받는다.

- `ZipOpenButton.jsx`
  - 파일 선택 창을 열고 ZIP 형식을 1차 확인한다.

- `LoadingOverlay.jsx`
  - 현재 단계와 진행률을 덮개 화면으로 보여준다.

- `LoadErrorPanel.jsx`
  - 복구 안내와 오류 메시지를 한국어로 보여준다.

### 씬 렌더링

- `SceneRenderer.jsx`
  - `static`, `loop`, `animated` 타입에 따라 렌더러를 분기한다.

- `StaticScene.jsx`
  - 이미지 자산을 무대에 맞춰 표시한다.

- `LoopScene.jsx`
  - mp4 자산을 반복 재생하고 자동 재생 차단 시 재시도 버튼을 보여준다.

- `AnimatedScene.jsx`
  - SVG 마크업을 직접 삽입하고 `highlightOrder` 순서에 따라 하이라이트 상태를 갱신한다.

### 오버레이 및 입력

- `SceneCounterBadge.jsx`
  - `현재 씬 / 전체 씬` 정보를 항상 표시한다.

- `PlaybackHint.jsx`
  - Spacebar, PageDown 사용법과 animated 진행 방식을 안내한다.

- `FullscreenButton.jsx`
  - 브라우저 전체화면 토글 버튼을 제공한다.

- `TriggerController.jsx`
  - 키보드 외에도 수동으로 다음 진행을 실행할 수 있는 버튼이다.

- `KeyboardShortcutLayer.jsx`
  - 키보드 입력 훅을 화면에 연결하는 비가시 구성 요소다.

### 훅

- `useZipPresentation.js`
  - ZIP 열기, manifest 파싱, 자산 캐시, 오류 상태, 로딩 상태를 관리한다.

- `usePresentationState.js`
  - 현재 씬 번호와 animated 하이라이트 수를 관리하고 다음 진행 동작을 계산한다.

- `useKeyboardTrigger.js`
  - Spacebar와 PageDown을 듣고 중복 입력을 막는다.

- `useFullscreen.js`
  - Fullscreen API 상태 동기화와 토글을 감싼다.

- `useScenePreload.js`
  - 현재 씬 주변의 이미지/비디오 자산을 미리 요청한다.

### 라이브러리

- `zipReader.js`
  - ZIP 열기, 경로 정규화, 텍스트/블롭 읽기, mime 추정을 담당한다.

- `assetUrlRegistry.js`
  - 객체 URL 생성과 일괄 해제를 담당한다.

- `svgHighlightParser.js`
  - SVG를 해석하고 highlight 대상 id를 찾는다.

- `sceneProgress.js`
  - animated 씬의 다음 동작이 하이라이트인지 다음 씬 이동인지 계산한다.

## 디렉토리 구조

`node_modules`, `dist`는 제외했다.

```text
kinesent-player
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ src
│  ├─ assets
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ app
│  │  │  ├─ PlayerFooter.jsx
│  │  │  ├─ PlayerHeader.jsx
│  │  │  ├─ PlayerShell.jsx
│  │  │  └─ PlayerStage.jsx
│  │  ├─ loader
│  │  │  ├─ LoadErrorPanel.jsx
│  │  │  ├─ LoadingOverlay.jsx
│  │  │  ├─ ZipDropzone.jsx
│  │  │  └─ ZipOpenButton.jsx
│  │  ├─ navigation
│  │  │  ├─ KeyboardShortcutLayer.jsx
│  │  │  └─ TriggerController.jsx
│  │  ├─ overlay
│  │  │  ├─ FullscreenButton.jsx
│  │  │  ├─ PlaybackHint.jsx
│  │  │  └─ SceneCounterBadge.jsx
│  │  └─ scene
│  │     ├─ AnimatedScene.jsx
│  │     ├─ LoopScene.jsx
│  │     ├─ SceneRenderer.jsx
│  │     └─ StaticScene.jsx
│  ├─ hooks
│  │  ├─ useFullscreen.js
│  │  ├─ useKeyboardTrigger.js
│  │  ├─ usePresentationState.js
│  │  ├─ useScenePreload.js
│  │  └─ useZipPresentation.js
│  ├─ lib
│  │  ├─ assetUrlRegistry.js
│  │  ├─ constants.js
│  │  ├─ manifestSchema.js
│  │  ├─ manifestValidation.js
│  │  ├─ sceneProgress.js
│  │  ├─ svgHighlightParser.js
│  │  └─ zipReader.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ phase-reports
│  └─ phase-02.md
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
└─ vite.config.js
```

## 미완료 또는 다음 페이즈로 넘긴 항목

- 플레이어 성능 고도화와 더 공격적인 프리로드 전략은 다음 페이즈에서 다룬다.
- 40개 이상 대형 발표 ZIP에 대한 체감 성능 최적화는 다음 페이즈에서 다룬다.
- 플레이어 시각 완성도와 세부 프레젠테이션 폴리시는 다음 페이즈에서 다룬다.
- 에디터 관련 구현은 이번 페이즈에서 건드리지 않았다.
- 브라우저 자동화 기반 end-to-end 테스트는 이번 페이즈 범위에 포함하지 않았다.

## 특이사항 또는 결정 사항

- animated 씬은 PPT에 가깝게 동작하도록 마지막 하이라이트를 먼저 보여주고, 그 다음 트리거에서 다음 씬으로 이동하도록 처리했다.
- 같은 자산 경로를 `static`과 `animated`에서 다르게 사용할 가능성을 고려해 자산 캐시 키를 타입별로 분리했다.
- 객체 URL은 새 ZIP 로드 시점과 훅 해제 시점에 모두 정리하도록 구성했다.
- 내부 import 경로는 `.js`, `.jsx` 확장자를 명시해 브라우저 빌드와 표준 ESM 환경 모두에서 해석 가능하도록 맞췄다.
- 자동 검증 결과:
  - `npm run lint` 통과
  - `npm run build` 통과
  - 임시 샘플 ZIP으로 `zipReader`, manifest 검증, blob URL 생성, animated 진행 순서를 확인했다.
- 제한 사항:
  - 현재 환경에서는 실제 브라우저 상호작용까지 자동화하지 못했고, 브라우저 수동 확인은 아직 남아 있다.
  - Vite 기본 정적 자산(`src/assets/*`, `public/icons.svg`)은 현재 코드에서 사용하지 않지만 이번 페이즈에서는 정리 대상에 포함하지 않았다.
