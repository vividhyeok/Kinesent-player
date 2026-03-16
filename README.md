# 키네센트 플레이어 v3.0.0

키네센트 플레이어는 발표용 ZIP 파일을 브라우저에서 바로 열어 재생하는 React + Vite 기반 앱입니다. Vercel에 독립 배포되며, `kinesent-editor`에서 만든 ZIP을 설치 없이 Chrome에서 바로 실행할 수 있습니다.

## v3.0.0 변경 사항

- `procedural` 씬 타입을 새로 지원합니다.
- procedural 씬은 16:9 고정 viewport 안에서 실시간 3D 템플릿으로 렌더링됩니다.
- 전체화면 진입 시 모든 UI를 숨기고 씬 콘텐츠만 표시합니다.
- 기존 ZIP에 대한 하위 호환 정책을 유지합니다.

## 지원하는 씬 타입

- `static`: SVG, PNG, JPG
- `loop`: MP4
- `animated`: SVG + `highlightOrder`
- `procedural`: `template` + `config`

procedural 템플릿 목록:

- `stack3d`
- `queue3d`
- `linkedlist3d`
- `array3d`

## 하위 호환성 정책

플레이어는 새 규칙보다 재생 호환성을 우선합니다.

- v1.0.0, v2.0.0 ZIP도 계속 열 수 있습니다.
- PNG/JPG 기반 static 씬을 계속 렌더링합니다.
- 수동 업로드 MP4 loop 씬도 계속 재생합니다.
- manifest 안에 `script` 필드가 있어도 오류 없이 무시합니다.

즉, SVG 전용 static, AI 생성 loop 같은 규칙은 에디터 작성 규칙일 뿐이고 플레이어 검증 규칙을 강화하지 않습니다.

## 실행 방법

```bash
npm install
npm run dev
```

프로덕션 빌드는 아래 명령으로 생성합니다.

```bash
npm run build
```

## 사용 방법

1. 플레이어를 엽니다.
2. ZIP 파일을 드래그하거나 파일 선택 버튼으로 엽니다.
3. `Space` 또는 `PageDown`으로 발표를 진행합니다.
4. 전체화면 버튼을 누르면 UI가 사라지고 씬만 남습니다.
5. 전체화면을 종료하면 헤더, 힌트, 씬 카운터가 다시 나타납니다.

## procedural 씬 동작 방식

- asset 파일 없이 manifest의 `template`, `config`, `triggers`만 사용합니다.
- 모든 procedural 씬은 다크 배경 `#0f0f0f` 위에서 orthographic isometric 카메라로 렌더링됩니다.
- 재질은 `MeshToonMaterial` 또는 `MeshBasicMaterial`만 사용하며 텍스처와 그림자는 사용하지 않습니다.
- 각 트리거마다 애니메이션 단계가 다음 상태로 진행되고, 모든 단계가 끝나면 다음 씬으로 넘어갑니다.

## ZIP 형식

```text
manifest.json
assets/
  scene1.svg
  scene2.svg
  scene3.mp4
```

- `static`, `animated`, `loop` 씬은 `asset` 경로가 ZIP 내부 파일과 일치해야 합니다.
- `procedural` 씬은 asset 파일이 필요하지 않습니다.
- `template`과 `config`가 manifest에 포함되어 있으면 바로 렌더링합니다.

## 오류 처리

다음 상황은 모두 한국어 안내 문구로 표시됩니다.

- 잘못된 ZIP
- 잘못된 manifest
- 누락된 asset 파일
- 자동 재생 차단
- 알 수 없는 procedural 템플릿

## Vercel 배포

플레이어는 SPA로 배포되며 루트의 `vercel.json`을 사용합니다.

1. Vercel에서 저장소를 연결합니다.
2. Root Directory를 `kinesent-player`로 설정합니다.
3. Build Command는 `npm run build`, Output Directory는 `dist`를 사용합니다.
4. `vercel.json`의 rewrite 설정으로 모든 경로를 `index.html`로 보냅니다.

## 릴리스 참고

- React Three Fiber 도입으로 번들 크기 경고가 있을 수 있지만 v3.0.0 릴리스 차단 사유는 아닙니다.
- 이후 버전에서 템플릿별 코드 스플리팅을 적용해 초기 번들 크기를 더 줄일 수 있습니다.
