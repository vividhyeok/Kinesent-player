# 키네센트 플레이어

키네센트 플레이어는 ZIP 기반 발표 패키지를 브라우저에서 바로 재생하는 React + Vite 애플리케이션입니다. 설치 없이 Chrome에서 URL만 열어 발표를 진행할 수 있도록 설계되어 있습니다.

## 주요 기능

- ZIP 드래그 앤 드롭 또는 파일 선택으로 발표 열기
- `static`, `loop`, `animated` 씬 재생
- `Space`, `PageDown` 기반 진행 제어
- 전체화면 전환 지원
- 현재 씬 번호와 전체 씬 수 상시 표시
- 잘못된 ZIP, 잘못된 manifest, 누락 에셋에 대한 한국어 오류 안내

## 개발 실행

```bash
npm install
npm run dev
```

개발 서버가 열리면 브라우저에서 안내 화면이 보이고, ZIP 파일을 올려 바로 재생 흐름을 확인할 수 있습니다.

## 빌드

```bash
npm run build
```

빌드 결과물은 `dist` 폴더에 생성됩니다. Vercel 배포 시에도 이 결과물을 기준으로 정적 배포됩니다.

## 사용 방법

1. `kinesent-editor`에서 발표 ZIP을 내보냅니다.
2. 배포된 플레이어 URL 또는 로컬 개발 서버를 엽니다.
3. ZIP 파일을 화면에 드래그하거나 `ZIP 파일 선택` 버튼으로 엽니다.
4. `Space` 또는 `PageDown`으로 발표를 진행합니다.
5. 필요하면 우측 상단의 전체화면 버튼으로 화면을 확장합니다.

## Vercel 배포 방법

1. Vercel에서 새 프로젝트를 생성합니다.
2. 저장소 루트를 `kinesent-player` 폴더로 지정하거나, 해당 폴더만 별도 저장소로 연결합니다.
3. 프레임워크는 Vite로 두고 기본 빌드 명령 `npm run build`를 사용합니다.
4. 출력 디렉토리는 `dist`를 사용합니다.
5. 루트의 `vercel.json`이 모든 경로를 `index.html`로 다시 연결하므로 SPA 라우팅 문제 없이 배포할 수 있습니다.

## ZIP 구성

플레이어는 아래 구조의 ZIP을 기대합니다.

```text
manifest.json
assets/
  scene1.mp4
  scene2.svg
  scene3.png
```

`manifest.json` 안의 `asset` 경로와 ZIP 내부 파일 경로가 정확히 일치해야 합니다.
