import type { ProjectProfile } from '../../types/portfolio'

export const frontendProject: ProjectProfile = {
  id: 'frontend',
  name: 'filma',
  repo: 'kakamu',
  period: '2026-05 ~ 2026-07',
  summary:
    'Expo 기반 iOS·Android·Web 단일 코드베이스 영화 소셜 앱입니다.\n\npnpm/Turbo 모노레포에서 @kakamu/api → @kakamu/query → apps/client 단방향 데이터 흐름을 설계했습니다.',
  techStack: [
    'Expo SDK 55',
    'React Native Web',
    'TanStack Query v5',
    'Zustand',
    'NativeWind',
    'expo-secure-store',
  ],
  detail: {
    headline: '크로스플랫폼 영화 소셜 클라이언트',
    role: 'Expo 모노레포 단독 주도 — 534 commits (98.7%), apps/client + 7개 공유 패키지 설계·구현',
    architecture:
      'apps/* → packages/* 단방향 의존을 강제합니다. 화면(app)은 라우팅·조합만 담당하고, HTTP는 @kakamu/api, 캐시·mutation은 @kakamu/query, UI는 @kakamu/ui로 분리했습니다.\n\n플랫폼 차이(카카오 로그인, Secure Store, Firebase 전화인증)는 apps/client/lib/에 격리하고, 패키지는 TokenBridge·PersonaBridge로 앱 컨텍스트를 모릅니다.',
    dataFlow:
      '@kakamu/api (HTTP)\n  → @kakamu/query (TanStack Query, 캐시·optimistic)\n    → components/featured/* (도메인 UI)\n      → @kakamu/ui (프리미티브)',
    highlights: [
      {
        title: '모노레포 레이어 분리',
        description:
          'Turborepo + pnpm workspace. packages가 apps를 import하지 않도록 아키텍처 규칙과 패키지 경계로 강제했습니다.',
      },
      {
        title: '크로스플랫폼 인증',
        description:
          '카카오·Firebase 전화·JWT refresh를 .native/.web 분기로 처리하고, setAuthTokens() 단일 진입점을 유지합니다.',
      },
      {
        title: '캐시 아키텍처',
        description:
          'Query Key Factory, Dual Seeding, optimistic patch 헬퍼로 피드·검색·상세 간 정합성을 확보했습니다.',
      },
      {
        title: '웹 SSR 배포',
        description:
          'expo export (server output) + Express client-server + Docker/Helm 파이프라인으로 웹을 운영합니다.',
      },
    ],
    scope: [
      '인증 (카카오·로컬·전화)',
      '페르소나 CRUD',
      '피드·댓글·좋아요·저장',
      '검색·Sonar·영화 상세',
      'SSE 채팅',
      '프로필·팔로우',
    ],
  },
  stories: [
    {
      id: 'fe-dual-seeding',
      title: 'Dual Seeding으로 캐시 정합성 확보',
      tags: ['TanStack Query', '캐시', '상태 최적화'],
      issue:
        '무한 스크롤 피드와 검색(live/for-you)에서 게시물 상세로 진입할 때마다 동일 post를 다시 요청했습니다.\n\n좋아요·저장 optimistic update가 list 슬롯과 detail 슬롯 사이에서 어긋나 카운트·플래그 불일치가 반복되었고, 피드 UX를 빠르게 유지하면서 서버 상태와 클라이언트 캐시를 일치시킬 구조가 필요했습니다.',
      solution:
        '도메인별 Query Key Factory를 계층화하고, 목록 응답을 detail 슬롯에 선적재하는 seedPostDetailCache·seedPostDetailCacheFromList를 post-infinite-cache 모듈로 추출했습니다.\n\nmutation 이후에는 patchPostInCaches로 infinite list와 detail 캐시를 동시에 패치합니다. 화면별 분기 없이 재사용 가능한 헬퍼로 optimistic 프리미티브(snapshot → patch → restore → invalidate) 흐름을 고정했습니다.',
      metrics: [
        { label: '캐시 헬퍼 도메인', value: 'post · comment · user · saved-movie' },
        { label: 'seeding 연동', value: 'search-live · search-for-you' },
        { label: 'git PR', value: 'refact/cache-architect' },
        { label: '기여 커밋', value: '534 / 541 (98.7%)' },
      ],
      references: [
        {
          label: 'post-infinite-cache.ts',
          path: 'kakamu/packages/query/src/features/post/lib/post-infinite-cache.ts',
        },
      ],
    },
    {
      id: 'fe-secure-store',
      title: 'React Native Secure Store 기반 토큰 분리',
      tags: ['보안', '인증', 'DIP'],
      issue:
        'refresh token을 AsyncStorage나 일반 저장소에 두면 루팅·백업 노출 위험이 있습니다. access token까지 persist하면 XSS·메모리 덤프 시 세션이 장기 노출됩니다.\n\niOS·Android·Web마다 저장소 API가 달라, 화면 코드에 플랫폼 분기가 퍼질 위험도 있었습니다.',
      solution:
        'access token은 @kakamu/store 메모리 스토어에만 두고 persist에서 제외했습니다.\n\nrefresh token은 native에서 expo-secure-store, web에서 AsyncStorage로 refresh-token-storage에서 분기합니다. TokenBridge·PersonaBridge로 @kakamu/api 패키지가 앱 컨텍스트를 import하지 않도록 의존을 역전했고, 화면과 훅은 setAuthTokens() 단일 API만 호출합니다.',
      metrics: [
        { label: 'access token', value: '메모리 only' },
        { label: 'refresh token', value: 'SecureStore / AsyncStorage' },
        { label: 'API 패키지', value: '플랫폼 저장소 미의존' },
      ],
      references: [
        {
          label: 'refresh-token-storage.ts',
          path: 'kakamu/apps/client/lib/auth/refresh-token-storage.ts',
        },
        {
          label: 'set-auth-tokens.ts',
          path: 'kakamu/apps/client/lib/auth/set-auth-tokens.ts',
        },
      ],
    },
    {
      id: 'fe-refresh-race',
      title: 'JWT Refresh Single-Flight',
      tags: ['인증', 'ky', '동시성'],
      issue:
        'access token 만료 시 여러 API가 동시에 401을 받으면 refresh가 중복 호출됩니다.\n\n그 결과 토큰이 꼬이거나 의도치 않은 로그아웃이 발생할 수 있었습니다.',
      solution:
        'refreshTokensSingleFlight로 refresh 요청을 직렬화했습니다.\n\n401 + TOKEN_EXPIRED 시 retry limit 1로 실패한 요청을 한 번만 재시도하도록 create-authenticated-client 파이프라인에 통합했고, Vitest 단위 테스트로 동시 401 시나리오를 검증했습니다.',
      metrics: [
        { label: 'retry limit', value: '1' },
        { label: '테스트', value: 'refresh-single-flight.test.ts' },
      ],
      references: [
        {
          label: 'refresh-single-flight.ts',
          path: 'kakamu/packages/api/src/auth/refresh-single-flight.ts',
        },
      ],
    },
    {
      id: 'fe-sse-chat',
      title: 'SSE 스트리밍 채팅 안정화',
      tags: ['SSE', '채팅', 'API'],
      issue:
        '채팅 API가 SSE로 청크 단위 응답을 냅니다.\n\n네트워크 버퍼링, 불완전 JSON, ping 이벤트 처리 없이는 스트림 UI가 깨졌습니다.',
      solution:
        'readSseStream으로 청크 버퍼링·메시지 파싱을 구현하고, comment ping은 무시하도록 필터링했습니다.\n\nChatStreamProvider로 스트림 상태를 공유하고, merge-chat-messages로 히스토리와 스트림 메시지를 병합했습니다.',
      metrics: [
        { label: '커밋', value: 'feat(api): buffer SSE chunks' },
        { label: '테스트', value: 'read-sse-stream Vitest' },
      ],
      references: [
        {
          label: 'read-sse-stream.ts',
          path: 'kakamu/packages/api/src/chat/read-sse-stream.ts',
        },
      ],
    },
  ],
}
