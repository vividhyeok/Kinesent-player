# Phase 2 보고서

## 완료된 작업 목록

- `StageClickLayer.jsx`와 `useStageClickAdvance.js`를 추가해 스테이지 클릭으로 다음 트리거를 실행할 수 있게 했습니다.
- 키보드, 하단 진행 버튼, 스테이지 클릭이 같은 debounce 경로를 공유하도록 묶어 중복 입력을 줄였습니다.
- `SceneTransitionIndicator.jsx`를 추가해 씬 인덱스가 바뀔 때만 600ms 전환 인디케이터가 나타나도록 했습니다.
- `FullscreenExitHint.jsx`를 추가해 fullscreen 첫 진입 시 한 번만 ESC 안내를 표시하도록 했습니다.
- `PlayerEndScreen.jsx`와 `usePlaybackCompletion.js`를 추가해 마지막 씬 종료 후 `처음으로` / `닫기` 종료 화면을 띄우도록 했습니다.
- `usePlayerNavigation.js`에 restart 경로를 추가해 종료 화면에서 1번 씬으로 즉시 되돌아갈 수 있게 했습니다.
- `LoopScene.jsx`의 수동 재생 패널을 stage interactive 영역으로 표시해 stage click과 충돌하지 않도록 했습니다.
- `PlaybackHint.jsx` 문구를 갱신해 다음 진행과 이전 씬 이동 안내를 같이 보여주도록 했습니다.
- 기존 `static`, `loop`, `animated`, `procedural` 재생과 레거시 ZIP 허용 정책은 그대로 유지했습니다.

## 변경된 컴포넌트 및 훅 요약

- `src/components/stage/StageClickLayer.jsx`
  - 스테이지 전체를 감싸는 투명 클릭 레이어입니다.
- `src/hooks/useStageClickAdvance.js`
  - 다음 진행 요청을 debounce하고 interactive 영역 클릭은 무시합니다.
- `src/components/navigation/SceneTransitionIndicator.jsx`
  - 씬 전환 시 짧게 나타나는 시각 cue입니다.
- `src/components/overlay/FullscreenExitHint.jsx`
  - fullscreen 첫 진입 시 1회 노출되는 ESC 안내입니다.
- `src/components/navigation/PlayerEndScreen.jsx`
  - 발표 종료 후 마지막 씬 위에 겹쳐지는 종료 화면입니다.
- `src/hooks/usePlaybackCompletion.js`
  - 재생 완료 감지, 종료 화면 노출, 다시 시작/닫기 동작을 관리합니다.
- `src/hooks/usePlayerNavigation.js`
  - `restart` 액션을 추가했습니다.
- `src/hooks/usePresentationState.js`
  - `restartPresentation`을 외부로 노출합니다.
- `src/App.jsx`
  - 종료 화면, stage click, fullscreen 안내, 전환 인디케이터를 연결했습니다.
- `src/components/scene/LoopScene.jsx`
  - 수동 재생 패널을 stage interactive 영역으로 표시했습니다.
- `src/components/overlay/PlaybackHint.jsx`
  - 앞/뒤 이동 안내 문구를 갱신했습니다.
- `src/index.css`
  - 전환 인디케이터와 fullscreen 안내용 keyframe 애니메이션을 추가했습니다.

## 디렉토리 구조 (tree 형태)

```text
src
├─ App.jsx
├─ components
│  ├─ navigation
│  │  ├─ PlayerEndScreen.jsx
│  │  ├─ PlayerPrevButton.jsx
│  │  ├─ PlayerProgressBar.jsx
│  │  ├─ SceneTransitionIndicator.jsx
│  │  └─ TriggerController.jsx
│  ├─ overlay
│  │  ├─ FullscreenExitHint.jsx
│  │  └─ PlaybackHint.jsx
│  ├─ scene
│  │  └─ LoopScene.jsx
│  └─ stage
│     └─ StageClickLayer.jsx
├─ hooks
│  ├─ usePlaybackCompletion.js
│  ├─ usePlayerNavigation.js
│  ├─ usePresentationState.js
│  └─ useStageClickAdvance.js
├─ index.css
└─ lib
   └─ playbackHistory.js
phase-reports
├─ phase-01-v4.md
└─ phase-02-v4.md
```

## 미완료 또는 다음 페이즈로 넘긴 항목

- in-editor 미리보기
- loop 생성 상태 단계 표시와 취소 버튼
- SVG 생성 진행 상태 표시
- procedural 시각 스케일/카메라 보정
- 비용 툴팁과 revision scope 표시

## 특이사항 또는 결정 사항

- 종료 화면은 기존 마지막 씬 콘텐츠를 유지한 채 위에 overlay로만 표시합니다.
- fullscreen 모드에서도 종료 화면은 의도된 UI로 유지하고, 전환 인디케이터만 숨기도록 했습니다.
- fullscreen ESC 안내는 세션당 1회만 노출되며, fullscreen이 해제되면 즉시 사라집니다.
- stage click은 `data-stage-interactive="true"`가 붙은 영역에서는 동작하지 않도록 처리했습니다.
- right-click은 별도 처리 없이 다음 진행을 발생시키지 않는 클릭 경로만 사용했습니다.
- 검증은 `npm run lint`, `npm run build`, navigation restart 스모크 테스트로 확인했습니다.
- fullscreen 안내의 실제 1회 노출 타이밍과 종료 화면 레이어링은 브라우저 수동 확인이 추가로 있으면 더 안전합니다.
