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
        title: '400 → 1,000 VU 부하 개선',
        description:
          'DB 튜닝 → Grafana 로그·trace 병목 분석 → aggregate·Redis 캐싱 → HPA 순으로 개선. avg 1,007ms → 530ms.',
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
      title: '400 VU → 1,000 VU 부하 테스트 의사결정 여정',
      tags: ['부하테스트', 'Helm', 'OpenTelemetry', '성능'],
      issue:
        '동시접속 트래픽의 한계를 알기위해서는 데이터 기반으로 판단할 필요가 있었습니다.\n\n개선 전 ramp 400 VU에서 tail latency가 폭발했습니다. p99는 약 54초, GET /posts 평균 1,169ms였습니다.\n\nmedian(90ms)과 avg(1,007ms)의 격차가 DB·쿼리 병목을 시사했고, PostgreSQL 모니터링에서는 idle_in_transaction 세션과 AccessShareLock 대기가 동시에 급증하는 패턴이 확인되었습니다. N+1 쿼리로 트랜잭션이 장시간 열린 채 방치되고, 반복 SELECT가 테이블 락 경합을 키우는 구조였습니다.',
      solution:
        '다음 네 단계 순서로 개선했습니다.\n\n① DB 튜닝\nHelm data-chart에서 PostgreSQL shared_buffers=5GB, work_mem=16MB, max_connections=350, idle_in_transaction_session_timeout=60s를 적용했습니다. PgBouncer transaction pool(maxClientConn=500)과 SQLAlchemy pool_size=50을 맞추고, 방치된 트랜잭션으로 커넥션 풀이 고갈되는 상황을 완화했습니다.\n\n② Grafana 로그·trace 분석\nOpenTelemetry span을 Grafana Tempo로 보내 get_posts trace에서 DB wait와 N+1 패턴을 식별했습니다. Grafana 로그에서 반복 SELECT가 AccessShareLock 경합을 유발하고, ML 추천 호출 구간에서 timeout·재시도 패턴이 누적되는 것을 확인했습니다.\n\n③ 쿼리·캐싱\nPostReadServiceNew 2단계 파이프라인, JSONB aggregate 물리 테이블, Redis post info MGET(TTL 3600s)을 도입해 쿼리 수를 줄이고 락·트랜잭션 점유 시간을 단축했습니다.\n\n④ Infra\nback-chart HPA(CPU 70%, max 3 replicas)로 스케일 여유를 확보한 뒤 ML 포함 1,000 VU까지 재검증했습니다.',
      metrics: [
        { label: 'VU', value: '400 → 1,000 (2.5×)' },
        { label: 'Average', value: '1,007ms → 530ms (−47%)' },
        { label: 'p99', value: '~54s → ~4.2s' },
        { label: 'RPS', value: '100 → 340 (+240%)' },
        { label: '실패율', value: '0.002% → 0.053%' },
      ],
      references: [
        // {
        //   label: 'Before: 400 VU stats',
        //   path: 'kakamu_load_test/reports_before/16-ramp-400vu-preissued-token_stats.csv',
        // },
        // {
        //   label: 'After: 1,000 VU stats',
        //   path: 'kakamu_load_test/reports/06-ml-1000vu_stats.csv',
        // },
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
  ],
}
