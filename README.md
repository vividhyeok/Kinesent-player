# 키네센트 플레이어 v2.0.0

키네센트 플레이어는 발표용 ZIP 파일을 브라우저에서 바로 열어 재생하는 React + Vite 앱입니다. Vercel에 독립 배포되며, `kinesent-editor`에서 내보낸 ZIP을 설치 없이 Chrome에서 바로 실행할 수 있습니다.

## v2.0.0 핵심 사항

- 모든 씬이 16:9 고정 viewport 안에서 재생됩니다.
- 전체화면에 들어가면 모든 UI가 숨겨지고 씬 콘텐츠만 남습니다.
- `script` 필드가 포함된 manifest를 읽어도 무시하고 재생합니다.
- v1.0.0 ZIP의 PNG/JPG static, 수동 MP4 loop도 계속 재생합니다.

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
4. 전체화면 버튼을 누르면 UI가 사라지고 씬만 보입니다.
5. `Esc` 또는 브라우저 전체화면 종료 동작으로 다시 UI를 복원합니다.

## 지원하는 씬과 호환성

- `static`: SVG, PNG, JPG
- `loop`: MP4
- `animated`: SVG + `highlightOrder`

플레이어는 하위 호환을 유지하므로, v1.0.0에서 만든 ZIP도 계속 열립니다.

## ZIP 형식

```text
manifest.json
assets/
  scene1.svg
  scene2.svg
  scene3.mp4
```

- `manifest.json`의 `asset` 경로와 ZIP 내부 파일 경로가 정확히 일치해야 합니다.
- `script` 필드가 있어도 재생에는 영향을 주지 않습니다.

## Vercel 배포

플레이어는 SPA로 배포되므로 루트의 `vercel.json`을 함께 사용합니다.

1. Vercel에서 저장소를 연결합니다.
2. 루트 디렉터리를 `kinesent-player`로 지정합니다.
3. 빌드 명령은 `npm run build`, 출력 디렉터리는 `dist`를 사용합니다.
4. `vercel.json`의 rewrite 설정으로 모든 경로를 `index.html`로 보냅니다.

## 오류 처리

- 잘못된 ZIP
- 잘못된 manifest
- 누락된 자산 파일
- 자동 재생 차단

위 상황은 모두 한국어 오류 또는 안내 문구로 표시됩니다.
