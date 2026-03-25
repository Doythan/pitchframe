# PitchFrame

조축/친구들끼리 포메이션을 만들고, 방송 그래픽처럼 프로답게 내보내는 전술 카드 메이커.

## 기능

- **포메이션 선택** — 8가지 프리셋 (미니 피치 썸네일 카드 UI)
- **선수 이름 편집** — Starting XI + 후보 선수 (인원 자유)
- **드래그로 위치 조정** — 피치 위 선수 마커를 마우스로 드래그
- **팀명 / 전술 설명 수정**
- **실시간 미리보기** — 방송 프리뷰 카드 스타일
- **PNG export** — 2x 해상도
- **자동 저장** — localStorage에 상태 유지 (새로고침 후 복원)

## 지원 포메이션

| 포메이션 | 스타일 |
|---|---|
| 4-4-2 | Classic |
| 4-3-3 | Attack |
| 4-2-3-1 | Modern |
| 3-5-2 | Wing Play |
| 4-1-4-1 | Defensive |
| 3-4-3 | Offensive |
| 5-3-2 | Fortress |
| 4-3-2-1 | Christmas Tree |

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (+ persist)
- html-to-image

## 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 접속
