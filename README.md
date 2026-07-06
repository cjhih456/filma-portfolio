# FILMA (KAKAMU) Portfolio

멀티 페르소나 기반 영화 추천 SNS **FILMA**의 Full-Stack 포트폴리오 SPA입니다.

## 페이지 구성

| 경로 | 내용 |
|------|------|
| `/` | Index — 프로젝트 개요, 카드 네비게이션, Git 기여도 |
| `/frontend` | Expo 모노레포 — Dual Seeding, Secure Store, STAR 스토리 |
| `/backend` | FastAPI API — 부하 테스트 차트, N+1 해결, Helm 인프라 |
| `/ml` | GraphRAG — 임베딩 평가, Outbox, 하이브리드 추천 |

## 실행

```bash
pnpm install
pnpm dev
```

## 빌드

```bash
pnpm build
pnpm preview
```

## 기술 스택

- React 19 + TypeScript + Vite
- React Router 7
- Recharts

## 데이터 출처

- Frontend: `kakamu/docs/portfolio/`
- Backend: `kakamu_be/docs/PORTFOLIO_BASE.md`
- ML: `kakamu_ml/docs/portfolio_foundation.md`
- Load test: `kakamu_load_test/reports_before/`, `reports/`
- Infra: `kakamu_helm/`
