# Phase 1 보고서

## 완료된 작업 목록

- `usePlayerNavigation.js`를 추가해 재생 상태 reducer를 별도 훅으로 분리했습니다.
- `playbackHistory.js`를 추가해 씬별 마지막 트리거 단계를 기록하고 복원할 수 있게 했습니다.
- 왼쪽 화살표와 `이전 씬` 버튼으로 이전 씬 이동이 가능하도록 연결했습니다.
- `PlayerProgressBar.jsx`를 추가해 현재 씬 위치를 표시하고 클릭으로 원하는 씬으로 점프할 수 있게 했습니다.
- 씬 점프 시 대상 씬은 항상 기준 상태(`triggerStep = 0`)로 시작하도록 정리했습니다.
- `animated`, `procedural` 씬에서 이전 씬 이동 시 마지막으로 본 트리거 단계가 복원되도록 처리했습니다.
- 마지막 씬 완료 시 최종 트리거 단계가 유지되도록 재생 상태 처리를 보정했습니다.
- 기존 `static`, `loop`, `animated`, `procedural` 재생 경로와 ZIP 검증 규칙은 그대로 유지했습니다.

## 변경된 컴포넌트 및 훅 요약

- `src/hooks/usePlayerNavigation.js`
  - 다음 진행, 이전 씬, 씬 점프, 자동 advance 완료를 한 reducer로 관리합니다.
- `src/lib/playbackHistory.js`
  - 씬 인덱스별 마지막 `triggerStep`을 기록하고 조회합니다.
- `src/hooks/usePresentationState.js`
  - 기존 재생 훅을 `usePlayerNavigation` 기반 래퍼로 단순화했습니다.
- `src/hooks/useKeyboardTrigger.js`
  - `Space`, `PageDown` 외에 `ArrowLeft`를 이전 씬 단축키로 처리합니다.
- `src/components/navigation/KeyboardShortcutLayer.jsx`
  - 다음/이전 콜백을 모두 전달하도록 바뀌었습니다.
- `src/components/navigation/PlayerPrevButton.jsx`
  - 이전 씬 이동용 온스크린 버튼입니다.
- `src/components/navigation/PlayerProgressBar.jsx`
  - 전체 씬 위치 표시와 씬 점프를 담당합니다.
- `src/App.jsx`
  - 이전 씬 버튼, 진행 바, 새 키보드 이동 로직을 footer에 연결했습니다.
- `src/lib/constants.js`
  - 다음 진행 키와 이전 씬 키를 분리한 상수를 추가했습니다.

## 디렉토리 구조 (tree 형태)

```text
src
├─ App.jsx
├─ components
│  └─ navigation
│     ├─ KeyboardShortcutLayer.jsx
│     ├─ PlayerPrevButton.jsx
│     ├─ PlayerProgressBar.jsx
│     └─ TriggerController.jsx
├─ hooks
│  ├─ useKeyboardTrigger.js
│  ├─ usePlayerNavigation.js
│  └─ usePresentationState.js
└─ lib
   ├─ constants.js
   └─ playbackHistory.js
phase-reports
└─ phase-01-v4.md
```

## 미완료 또는 다음 페이즈로 넘긴 항목

- 스테이지 클릭으로 다음 진행
- 씬 전환 인디케이터
- 발표 종료 화면과 처음으로 돌아가기 UX
- fullscreen 첫 진입 안내 툴팁
- 플레이어 하단 진행 바의 시각적 폴리시 정리

## 특이사항 또는 결정 사항

- 진행 바로 씬을 점프하면 대상 씬은 항상 기준 상태로 초기화됩니다.
- 이전 씬 이동은 현재 씬 내부의 한 단계 뒤로 가는 기능이 아니라, 한 씬 이전으로 이동한 뒤 그 씬의 마지막 기록 상태를 복원하는 방식입니다.
- 방문 이력이 없는 씬으로 복원할 경우 `triggerStep`은 `0`으로 처리합니다.
- 플레이어의 manifest 검증 규칙이나 레거시 ZIP 허용 범위는 이번 phase에서 강화하지 않았습니다.
- 검증은 `npm run lint`, `npm run build`, reducer 스모크 테스트(`이전 씬 복원`, `씬 점프 초기화`, `마지막 procedural 완료 상태`)로 확인했습니다.
