export const overview = {
  title: 'FILMA (KAKAMU)',
  subtitle: '멀티 페르소나 기반 영화 추천 SNS — Full-Stack Portfolio',
  description:
    'Expo 크로스플랫폼 클라이언트, FastAPI 백엔드, GraphRAG ML 서버를 단일 서비스로 설계·구현한 엔드투엔드 프로젝트입니다.\n\ngit 기여도와 부하 테스트 Before/After 수치로 성과를 검증합니다.',
  period: '2026-04 ~ 2026-07',
  domains: [
    {
      id: 'frontend' as const,
      label: 'Frontend',
      stack: 'Expo 55 · React Native · TanStack Query · pnpm/Turbo',
    },
    {
      id: 'backend' as const,
      label: 'Backend',
      stack: 'FastAPI · PostgreSQL · Redis · K8s/Helm · OpenTelemetry',
    },
    {
      id: 'ml' as const,
      label: 'ML',
      stack: 'Neo4j · LangGraph · vLLM · Qwen3 · Thompson Bandit',
    },
  ],
}
