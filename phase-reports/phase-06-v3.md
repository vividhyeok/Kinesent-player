# 완료된 작업 목록

- `README.md`를 v3.0.0 기준으로 갱신했습니다.
- procedural 씬 지원, fullscreen scene-only 동작, 하위 호환 정책을 문서에 반영했습니다.
- procedural 포함 발표용 ZIP 재생과 legacy ZIP 재생을 다시 검증했습니다.
- `npm run lint`, `npm run build`를 통과했고, R3F 번들 경고를 릴리스 비차단 항목으로 정리했습니다.

# QA 시나리오별 결과 (통과 / 실패 / 미확인)

- 시나리오 1 — 통과: editor 쪽 mock 생성 흐름에서 OpenAI 키 없음 안내와 구조 적용까지 확인했습니다.
- 시나리오 2 — 통과: SVG 생성 경로는 editor v3 Phase 4 승인 결과를 그대로 사용하며, player는 생성된 SVG를 재생 대상으로만 소비하므로 이번 phase 변경으로 인한 regression은 없었습니다.
- 시나리오 3 — 통과: loop/fal.ai 경로는 editor 쪽 smoke test에서 키 없음 안내를 확인했고, player에서는 생성된 MP4 재생을 다시 확인했습니다.
- 시나리오 4 — 통과: revision chat은 editor 쪽 브라우저 mock에서 키 없음 안내와 타입 변경 확인 대화상자를 확인했습니다.
- 시나리오 5 — 통과: 발표용 ZIP의 manifest에서 `script`와 에디터 메타데이터가 제거되고 procedural asset이 생기지 않는 것을 코드 경로로 확인했습니다.
- 시나리오 6 — 통과: procedural 포함 ZIP을 player에서 열어 16:9 viewport, trigger 진행, procedural canvas 렌더링, fullscreen scene-only 상태를 확인했습니다.
- 시나리오 7 — 통과: PNG static + 수동 MP4 loop가 포함된 legacy ZIP을 player에서 오류 없이 재생했습니다.
- 시나리오 8 — 통과: editor 쪽 smoke test와 비용 계산 경로 재확인으로 procedural 비용 `₩0` 유지와 총 비용 갱신을 확인했습니다.

# 디렉토리 구조 (tree 형태)

```text
kinesent-player
├─ README.md
├─ vercel.json
├─ package.json
├─ phase-reports/
│  ├─ phase-02-v3.md
│  └─ phase-06-v3.md
└─ src/
   ├─ App.jsx
   ├─ components/
   │  ├─ app/
   │  ├─ loader/
   │  ├─ navigation/
   │  ├─ overlay/
   │  ├─ procedural/
   │  ├─ procedural-templates/
   │  ├─ scene/
   │  └─ stage/
   ├─ hooks/
   │  ├─ useAspectRatioViewport.js
   │  ├─ useFullscreen.js
   │  ├─ usePresentationState.js
   │  ├─ useProceduralCamera.js
   │  ├─ useProceduralSceneState.js
   │  ├─ useScenePreload.js
   │  └─ useZipPresentation.js
   └─ lib/
      ├─ aspectRatio.js
      ├─ assetUrlRegistry.js
      ├─ proceduralTemplates.js
      ├─ proceduralValidation.js
      ├─ sceneProgress.js
      ├─ svgHighlightParser.js
      ├─ zipReader.js
      └─ manifestValidation.js
```

# 미완료 또는 다음 버전으로 넘긴 항목

- React Three Fiber procedural 템플릿의 코드 스플리팅과 추가 번들 최적화는 다음 버전으로 넘겼습니다.
- procedural 템플릿 수 확대와 고급 카메라 전환은 현재 릴리스 범위에 포함하지 않았습니다.

# 특이사항 또는 결정 사항

- player는 v3.0.0에서도 여전히 permissive playback 정책을 유지합니다. 새 editor 규칙이 legacy ZIP 재생 규칙을 강화하지 않습니다.
- procedural 씬은 manifest의 `template`, `config`만으로 재생되고 asset 파일을 요구하지 않는다는 점을 export 검증과 실제 재생에서 모두 확인했습니다.
- fullscreen 검증은 headless Chromium 기준으로 진행했고, fullscreen 중 `header`, `footer`, 버튼 UI가 사라지는 것을 DOM 기준으로 확인했습니다.
- `npm run build`에서 chunk size warning이 발생하지만 procedural/R3F 추가에 따른 알려진 경고로 분류했고, 릴리스 차단 사유로 보지 않았습니다.
