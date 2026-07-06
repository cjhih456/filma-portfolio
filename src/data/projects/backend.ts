import type { ProjectProfile } from '../../types/portfolio'

export const backendProject: ProjectProfile = {
  id: 'backend',
  name: 'FILMA API',
  repo: 'kakamu_be',
  period: '2026-04 ~ 2026-07',
  summary:
    '멀티 페르소나 기반 영화 추천 SNS 백엔드입니다.\n\nUser(활동)와 Persona(추천) 이중 컨텍스트, Redis 캐싱, ML API 연동, K8s/Helm 배포와 OpenTelemetry 관측을 담당했습니다.',
  techStack: [
    'FastAPI',
    'PostgreSQL + PgBouncer',
    'Redis',
    'OpenTelemetry',
    'Helm / HPA',
    'Locust',
  ],
  detail: {
    headline: '멀티 페르소나 영화 추천 SNS API',
    role: '4인 팀 백엔드 공동 1위 — 143 commits (32.5%), 피드·검색·성능·ML 연동 집중',
    architecture:
      'Endpoint → Service → Model 3계층 레이어드 아키텍처입니다. JWT로 User 인증, X-Persona-Id로 ML/추천 컨텍스트를 분리합니다.\n\nPostgreSQL(PgBouncer) + Redis 캐시·카운터, ML API httpx 연동, OpenTelemetry → Grafana Tempo 관측을 적용했습니다.',
    dataFlow:
      'Client → FastAPI (/api)\n  → Service (비즈니스 로직)\n    → PostgreSQL / Redis\n    → ML API (recommend, chat SSE, ingest)',
    highlights: [
      {
        title: '400 → 900 VU 부하 개선',
        description:
          'DB 튜닝 → Telemetry 병목 분석 → aggregate·Redis 캐싱 → HPA 순으로 개선. avg 1,007ms → 496ms.',
      },
      {
        title: '피드 N+1 제거',
        description:
          '2단계 파이프라인 + JSONB aggregate 물리 테이블 + Redis MGET으로 피드 조회 쿼리를 일괄화했습니다.',
      },
      {
        title: 'Redis Write-Back',
        description:
          'like_count 실시간 INCR/DECR + 5분 주기 DB 동기화, Lua 스크립트로 race condition을 방지합니다.',
      },
      {
        title: 'K8s / Helm',
        description:
          'PgBouncer, PostgreSQL tuning, back-chart HPA(CPU 70%), GitHub Actions → Docker → Helm GitOps 배포.',
      },
    ],
    scope: [
      'Users & Auth (JWT, 카카오, Firebase)',
      'Community (post, comment, like, save)',
      'Content (movie, search)',
      'AI & ML 연동',
      'Persona & Relations',
      'System (health, batch, tracing)',
    ],
  },
  stories: [
    {
      id: 'be-load-test-journey',
      title: '400 VU → 900 VU 부하 테스트 의사결정 여정',
      tags: ['부하테스트', 'Helm', 'OpenTelemetry', '성능'],
      issue:
        '개선 전 ramp 400 VU에서 tail latency가 폭발했습니다. p99는 약 54초, GET /posts 평균 1,169ms였습니다.\n\nmedian(90ms)과 avg(1,007ms)의 격차가 DB·쿼리 병목을 시사했고, 트래픽을 2배 이상 확장하려면 어디가 한계인지 데이터 기반으로 판단할 필요가 있었습니다.',
      solution:
        '다음 네 단계 순서로 개선했습니다.\n\n① DB 튜닝\nHelm data-chart에서 PostgreSQL shared_buffers=5GB, work_mem=16MB, max_connections=350을 적용했습니다. PgBouncer transaction pool(maxClientConn=500)과 SQLAlchemy pool_size=50을 맞췄습니다.\n\n② Telemetry\nOpenTelemetry span을 Grafana Tempo로 보내 get_posts trace에서 DB wait와 N+1 패턴을 식별했습니다.\n\n③ 쿼리·캐싱\nPostReadServiceNew 2단계 파이프라인, JSONB aggregate 물리 테이블, Redis post info MGET(TTL 3600s)을 도입했습니다.\n\n④ Infra\nback-chart HPA(CPU 70%, max 3 replicas)로 스케일 여유를 확보한 뒤 900 VU까지 재검증했습니다.',
      metrics: [
        { label: 'VU', value: '400 → 900 (2.25×)' },
        { label: 'Average', value: '1,007ms → 496ms (−51%)' },
        { label: 'p99', value: '~54s → ~6s' },
        { label: 'RPS', value: '100 → 298 (+198%)' },
        { label: '실패율', value: '0.002% → 0.045%' },
      ],
      references: [
        {
          label: 'Before: 400 VU stats',
          path: 'kakamu_load_test/reports_before/16-ramp-400vu-preissued-token_stats.csv',
        },
        {
          label: 'After: 900 VU stats',
          path: 'kakamu_load_test/reports/06-ml-900vu_stats.csv',
        },
        {
          label: 'Helm data-chart values',
          path: 'kakamu_helm/charts/data-chart/values.yaml',
        },
        {
          label: 'back HPA',
          path: 'kakamu_helm/charts/back-chart/templates/back_hpa.yaml',
        },
      ],
      chartId: 'load-test-before-after',
    },
    {
      id: 'be-feed-n1',
      title: '피드 조회 N+1 해결',
      tags: ['PostgreSQL', 'Redis', 'aggregate'],
      issue:
        '게시물 피드 조회 시 mention, hashtag, movie, like, comment를 게시물마다 개별 조회하여 N+1 쿼리가 폭발했습니다.\n\nTelemetry에서도 get_posts span 하위에 반복 SELECT가 누적되는 패턴이 확인되었습니다.',
      solution:
        'PostReadServiceNew로 1단계 경량 선별(post+user)과 2단계 aggregate·캐시 보강을 분리했습니다.\n\npost_hashtag_agg, post_mention_agg, post_movie_agg 물리 테이블(JSONB)과 write-through 갱신, Redis MGET post info 캐시를 결합했습니다. 회귀 테스트로 중복 aggregate 호출을 방지했습니다.',
      metrics: [
        { label: 'PR', value: '#88 ~ #92 연속 머지' },
        { label: '테스트', value: 'duplicate_agg_query 방지' },
        { label: '캐시 TTL', value: '3600s' },
      ],
      references: [
        {
          label: 'read_post_new.py',
          path: 'kakamu_be/app/service/post/read_post_new.py',
        },
      ],
      chartId: 'api-latency',
    },
    {
      id: 'be-like-count',
      title: '좋아요 카운트 실시간성과 DB 정합성',
      tags: ['Redis', 'Write-Back', '동시성'],
      issue:
        '높은 동시성에서 like_count의 정확성과 응답 속도 사이 트레이드오프가 있었습니다.\n\nDB만으로는 실시간 카운터를 보장하기 어려웠습니다.',
      solution:
        '읽기는 Redis 카운터를 우선하고, 쓰기는 INCR/DECR로 즉시 반영합니다.\n\nstat_sync_worker가 5분 주기로 DB에 write-back하며, Lua DELETE_IF_MATCH로 동기화 시 race condition을 방지했습니다.',
      metrics: [
        { label: '동기화 주기', value: '300s (5분)' },
        { label: 'Race 방지', value: 'Lua DELETE_IF_MATCH' },
      ],
      references: [
        {
          label: 'sync_task.py',
          path: 'kakamu_be/app/service/system/sync_task.py',
        },
      ],
    },
    {
      id: 'be-persona-context',
      title: 'User / Persona 이중 컨텍스트',
      tags: ['아키텍처', 'ML 연동', 'JWT'],
      issue:
        'SNS 활동의 주체(User)와 ML 추천·알고리즘의 주체(Persona)가 다릅니다.\n\n단일 JWT만으로는 페르소나별 추천 컨텍스트를 전달할 수 없었습니다.',
      solution:
        'JWT로 User 인증, X-Persona-Id 헤더로 Persona 컨텍스트를 분리했습니다.\n\nget_current_persona DI로 소유권·상태를 검증하고, ML ingest·recommend·chat 시 User/Persona 데이터를 분리 전송합니다.',
      metrics: [
        { label: '페르소나 상한', value: '유저당 최대 5개' },
        { label: 'ML 연동', value: 'ingest · recommend · chat SSE' },
      ],
      references: [
        {
          label: 'persona.py deps',
          path: 'kakamu_be/app/api/deps/persona.py',
        },
      ],
    },
  ],
}
