import type { ProjectProfile } from '../../types/portfolio'

export const mlProject: ProjectProfile = {
  id: 'ml',
  name: 'GraphRAG Movie Recommend',
  repo: 'kakamu_ml',
  period: '2026-04 ~ 2026-07',
  summary:
    '비정형 영화·피드·댓글 텍스트를 온톨로지로 구조화해 Neo4j 지식그래프에 적재합니다.\n\nsemantic×keyword×graph 하이브리드 추천과 LangGraph Chat Agent를 제공하는 ML API 서버입니다.',
  techStack: [
    'Neo4j 5.x',
    'LangGraph',
    'vLLM (Qwen3)',
    'FastAPI',
    'PostgreSQL Outbox',
    'Thompson Bandit',
  ],
  detail: {
    headline: 'GraphRAG 기반 영화·피드 추천 + LLM Chat',
    role: 'GraphRAG ML 서버 단독 주도 — 331 commits (99.6%), 온톨로지·추천·Chat·임베딩 평가 전 영역',
    architecture:
      '비정형 텍스트(영화 줄거리, 피드, 댓글)를 LLM 온톨로지로 구조화해 Neo4j 지식그래프에 적재합니다.\n\nFastAPI 게이트웨이, vLLM(Qwen3 gen+embed), LangGraph Chat Agent, PostgreSQL(outbox·bandit·checkpoint)로 구성됩니다.',
    dataFlow:
      'Ingest API → Outbox → Worker (extract+embed+load) → Neo4j\nRecommend API → hybrid score (vector+keyword+graph+bandit) → Neo4j\nChat API → LangGraph → tool-calling Cypher (read-only) → Neo4j',
    highlights: [
      {
        title: '임베딩 모델 선정',
        description:
          '4라운드 평가(PaCMAP→kNN→nDCG)로 Qwen3-0.6B 채택. genre F1 0.603 vs bge-m3 0.430.',
      },
      {
        title: 'Outbox 비동기 ETL',
        description:
          'LLM 추출 10s+ 작업을 API에서 분리. FOR UPDATE SKIP LOCKED worker, DLQ, 의존성 resolver.',
      },
      {
        title: '하이브리드 추천',
        description:
          '(semantic × keyword × theme × mood × persona graph) + Thompson Bandit 6-arm 온라인 가중치 학습.',
      },
      {
        title: 'Chat 보안',
        description:
          'CyVer Cypher 검증, write 차단, SSE prod 필터링. 221 tests / 41 files 커버리지.',
      },
    ],
    scope: [
      '온톨로지 ETL (movie, feed, comment)',
      'Neo4j 지식그래프 (14 node types)',
      '하이브리드 추천 API',
      'LangGraph Chat (SSE)',
      '버전드 임베딩 파이프라인',
      '임베딩 평가 (embed_test)',
    ],
  },
  stories: [
    {
      id: 'ml-embedding-selection',
      title: '임베딩 모델 4라운드 평가와 Production 채택',
      tags: ['ML 평가', 'Qwen3', 'multi-label'],
      issue:
        '한국어 영화 온톨로지(genre+theme+mood 173 labels)에 적합한 임베딩 모델 기준이 없었습니다. primary Silhouette은 전 모델 음수로, multi-label 구조와 불일치했습니다.\n\nT4 16GB에서 gen+embed 동시 서빙 제약도 함께 고려해야 했습니다.',
      solution:
        'PaCMAP/Silhouette 한계를 발견한 뒤, multi-label kNN(6K→11K)과 macro mAP·separation margin, nDCG@K retrieval까지 4라운드 평가 파이프라인을 구축했습니다.\n\nbge-m3 vs Qwen3 계열을 비교해 운영 VRAM·속도와 품질을 통합 판단했습니다.',
      metrics: [
        { label: '채택 모델', value: 'Qwen3-Embedding-0.6B' },
        { label: 'genre F1', value: '0.603 vs bge 0.430' },
        { label: 'mood F1', value: '0.637' },
        { label: 'VRAM', value: '1.5 GB (bge 2.5 GB)' },
        { label: '평가 표본', value: '11,384편 · 173 labels' },
      ],
      references: [
        {
          label: 'portfolio_foundation.md',
          path: 'kakamu_ml/docs/portfolio_foundation.md',
        },
        {
          label: 'embed_test/result_data_3',
          path: 'kakamu_ml/embed_test/result_data_3',
        },
      ],
    },
    {
      id: 'ml-outbox-ingest',
      title: 'Outbox 패턴 비동기 인제스트',
      tags: ['ETL', 'PostgreSQL', 'LLM'],
      issue:
        '영화·피드 ingest 시 LLM 온톨로지 추출이 API 응답 경로에 묶이면 latency가 수 초 이상 발생했습니다.\n\nprompt_version 불일치 시 재처리와 의존성(feed→comment) 보장도 필요했습니다.',
      solution:
        'Ingest API는 ingest_outbox에만 적재하고, FOR UPDATE SKIP LOCKED worker가 extract·embed·load를 비동기 수행합니다.\n\n3회 실패 시 DLQ, 2^n sec backoff, 15+ aggregate type 의존성 resolver를 구현했습니다.',
      metrics: [
        { label: 'aggregate type', value: '15+' },
        { label: '상태 머신', value: 'pending → done / dlq' },
        { label: 'HTTP endpoints', value: '22' },
      ],
      references: [
        {
          label: 'outbox_ingest.md',
          path: 'kakamu_ml/docs/outbox_ingest.md',
        },
      ],
    },
    {
      id: 'ml-cypher-security',
      title: 'LangGraph Chat Cypher 보안',
      tags: ['보안', 'CyVer', 'Neo4j'],
      issue:
        'LLM이 생성하는 Cypher가 Neo4j write나 User/Persona 민감 노드에 접근할 위험이 있었습니다.\n\nprod SSE에 내부 state가 노출될 수도 있었습니다.',
      solution:
        'CyVer 3-layer 검증, write 키워드·procedure 화이트리스트, User/Persona 직접 접근 차단을 적용했습니다.\n\nstg/prod SSE filtered mode로 Cypher·내부 state를 제거하고 reply·count만 노출합니다.',
      metrics: [
        { label: '테스트', value: '221 collected / 41 files' },
        { label: '보안 suite', value: 'cypher_security · sse_filter' },
      ],
      references: [
        {
          label: 'chat/cypher/security.py',
          path: 'kakamu_ml/src/chat/cypher/security.py',
        },
      ],
    },
    {
      id: 'ml-hybrid-recommend',
      title: '하이브리드 추천과 Thompson Bandit',
      tags: ['추천', 'Neo4j', 'Bandit'],
      issue:
        '벡터만으로는 장르·테마 필터를, 키워드만으로는 분위기 유사도를 충족하기 어렵습니다.\n\nPersona별 맥락 선호도를 반영할 단일 신호도 없었습니다.',
      solution:
        'vector·keyword·theme·mood·persona graph 신호를 Bandit 6-arm 가중합으로 결합했습니다.\n\nRecommend API Cypher는 Template Registry 화이트리스트로만 실행해 injection을 방지합니다.',
      metrics: [
        { label: 'Neo4j 노드', value: '14 types' },
        { label: 'Bandit arms', value: '6' },
        { label: 'Cypher templates', value: 'hybrid · feed · title_search' },
      ],
      references: [
        {
          label: 'bandit_weights.md',
          path: 'kakamu_ml/docs/bandit_weights.md',
        },
      ],
    },
  ],
}
