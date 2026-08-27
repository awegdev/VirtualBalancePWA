# VAULT — 나만의 금고 (데모 가상계좌)

Face ID(생체 인증)로 잠그고 여는 **연습·데모용** 가상계좌 웹앱입니다.
순수 HTML/CSS/JS로만 만들어져 있어 서버 없이 **GitHub Pages**에 바로 올릴 수 있어요.

## 담긴 기능

- **가상계좌 생성**: 별명과 시작 잔액(최대 ₩999,999,999)을 정해 나만의 금고를 만듭니다.
- **Face ID 인증**: [WebAuthn](https://developer.mozilla.org/ko/docs/Web/API/Web_Authentication_API) API로 기기의 실제 생체 인증(iPhone/Mac Face ID·Touch ID, Windows Hello, 안드로이드 지문 등)을 사용해 잠금을 해제합니다. 생체 인증을 지원하지 않는 기기에서는 자동으로 데모 스캔 애니메이션으로 대체돼 흐름을 계속 체험할 수 있어요.
- **입금 / 출금**: 하단 시트에서 금액을 입력하거나 프리셋 버튼으로 빠르게 처리합니다. 출금은 잔액을 초과할 수 없어요.
- **실시간 알림**: 브라우저 [Notification API](https://developer.mozilla.org/ko/docs/Web/API/Notification)로 입출금 시 기기 알림을 띄우고, 지원 기기에서는 짧은 진동(Vibration API)도 함께 울립니다. 인앱 토스트 알림은 항상 표시됩니다.
- **거래 내역**: 모든 입출금이 시각과 함께 기록되며 새로고침해도 유지됩니다.
- **PWA 지원**: `manifest.json`이 포함되어 있어 홈 화면에 추가하면 앱처럼 실행돼요.

> ⚠️ 이 앱은 **학습·데모 목적**의 가상 계좌입니다. 실제 은행·금융기관과 연결되어 있지 않으며, 모든 데이터(잔액, 거래 내역, 등록된 인증 정보)는 오직 사용자의 브라우저 `localStorage`에만 저장됩니다. 서버로 전송되는 정보는 없습니다.

## 폴더 구성

```
.
├── index.html    # 전체 앱 (구조/스타일/로직 포함)
├── manifest.json # PWA 매니페스트
├── icon.svg      # 앱 아이콘
└── README.md
```

## GitHub Pages로 배포하기

1. 새 GitHub 저장소를 만들고 이 폴더의 파일들(`index.html`, `manifest.json`, `icon.svg`)을 그대로 업로드(푸시)합니다.
   ```bash
   git init
   git add .
   git commit -m "VAULT 데모 가상계좌 앱"
   git branch -M main
   git remote add origin https://github.com/<사용자명>/<저장소명>.git
   git push -u origin main
   ```
2. GitHub 저장소 페이지에서 **Settings → Pages**로 이동합니다.
3. **Source**를 `Deploy from a branch`로 선택하고, Branch는 `main` / `/ (root)`로 지정한 뒤 **Save**를 누릅니다.
4. 1~2분 후 `https://<사용자명>.github.io/<저장소명>/` 주소로 접속하면 앱이 열립니다.

## 참고 사항

- **Face ID(WebAuthn)와 알림(Notification) 권한은 반드시 HTTPS 환경에서만 정상 동작**합니다. GitHub Pages는 기본적으로 HTTPS이므로 별도 설정 없이 바로 사용 가능해요.
- iPhone에서는 **Safari**로 접속해야 Face ID(플랫폼 인증기)가 정상적으로 뜹니다.
- 데스크톱처럼 생체 인증 하드웨어가 없는 기기에서는 등록/해제 시 자동으로 "데모 모드"로 전환되어 스캔 애니메이션 후 통과됩니다.
- 브라우저 알림은 웹페이지가 열려 있는 동안(백그라운드 탭 포함) 표시됩니다. 앱을 완전히 종료한 상태에서도 알림을 받으려면 Service Worker 기반 Push 알림과 별도 서버가 필요합니다(이 데모의 범위 밖입니다).
- 전체 초기화는 대시보드의 **초기화** 버튼으로 언제든 가능합니다.

## 커스터마이즈 팁

- 색상·타이포그래피는 `index.html` 상단 `:root` CSS 변수에서 한 번에 조정할 수 있어요 (`--gold`, `--bg`, `--disp` 등).
- 시작 잔액 프리셋은 `#presetChips` 안의 `data-amt` 값을 바꾸면 됩니다.
- 계좌번호 형식은 `genAccountNumber()` 함수에서 자유롭게 바꿀 수 있어요.
