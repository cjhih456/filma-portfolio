/** kakamu_ml 기능별 브랜치 */
export const GITHUB_ML_BRANCHES = {
  embedTest: 'data/embed-tests',
  ingest: 'dev/ingest',
  api: 'dev/api',
  bootstrap: 'dev/bootstrap',
} as const

const KAKAMU_ML_BRANCH_RULES: { prefix: string; branch: string }[] = [
  // embed test 데이터
  { prefix: 'embed_test/', branch: GITHUB_ML_BRANCHES.embedTest },
  // ingest
  { prefix: 'src/ingest/', branch: GITHUB_ML_BRANCHES.ingest },
  { prefix: 'src/extractor/', branch: GITHUB_ML_BRANCHES.ingest },
  { prefix: 'docs/outbox_ingest.md', branch: GITHUB_ML_BRANCHES.ingest },
  { prefix: 'docs/versioned_embedding.md', branch: GITHUB_ML_BRANCHES.ingest },
  // api
  { prefix: 'src/api/', branch: GITHUB_ML_BRANCHES.api },
  { prefix: 'src/chat/', branch: GITHUB_ML_BRANCHES.api },
  { prefix: 'src/recommend/', branch: GITHUB_ML_BRANCHES.api },
  { prefix: 'docs/api.md', branch: GITHUB_ML_BRANCHES.api },
  { prefix: 'docs/bandit_weights.md', branch: GITHUB_ML_BRANCHES.api },
  { prefix: 'docs/cypher_templates.md', branch: GITHUB_ML_BRANCHES.api },
  { prefix: 'docs/persona_recommendation.md', branch: GITHUB_ML_BRANCHES.api },
  // 초기화 (bootstrap)
  { prefix: 'src/graph/', branch: GITHUB_ML_BRANCHES.bootstrap },
  { prefix: 'src/config/', branch: GITHUB_ML_BRANCHES.bootstrap },
  { prefix: 'src/ontology/', branch: GITHUB_ML_BRANCHES.bootstrap },
  { prefix: 'src/embedding/', branch: GITHUB_ML_BRANCHES.bootstrap },
  { prefix: 'src/persistence/', branch: GITHUB_ML_BRANCHES.bootstrap },
  { prefix: 'docs/architecture.md', branch: GITHUB_ML_BRANCHES.bootstrap },
  { prefix: 'docs/tech_structure.md', branch: GITHUB_ML_BRANCHES.bootstrap },
  { prefix: 'docs/neo4j_schema.md', branch: GITHUB_ML_BRANCHES.bootstrap },
  { prefix: 'docs/ontology.md', branch: GITHUB_ML_BRANCHES.bootstrap },
]

type BranchRule = { prefix: string; branch: string }

type RepoConfig = {
  base: string
  branch: string
  stripPrefix: string
  branchRules?: BranchRule[]
}

const REPO_CONFIG = {
  kakamu: {
    base: 'https://github.com/kakao4-KAKAMU/KAKAMU-FE',
    branch: 'dev',
    stripPrefix: 'kakamu/',
  },
  kakamu_be: {
    base: 'https://github.com/kakao4-KAKAMU/KAKAMU_BE',
    branch: 'dev',
    stripPrefix: 'kakamu_be/',
  },
  kakamu_ml: {
    base: 'https://github.com/kakao4-KAKAMU/KAKAMU_DE',
    branch: 'main',
    stripPrefix: 'kakamu_ml/',
    branchRules: KAKAMU_ML_BRANCH_RULES,
  },
  kakamu_helm: {
    base: 'https://github.com/kakao4-KAKAMU/kakamu_helm',
    branch: 'main',
    stripPrefix: 'kakamu_helm/',
  },
  kakamu_load_test: {
    base: 'https://github.com/kakao4-KAKAMU/load_test',
    branch: 'main',
    stripPrefix: 'kakamu_load_test/',
  },
} as const satisfies Record<string, RepoConfig>

type RepoKey = keyof typeof REPO_CONFIG

function getRepoKey(workspacePath: string): RepoKey | null {
  const key = workspacePath.split('/')[0]
  if (key in REPO_CONFIG) return key as RepoKey
  return null
}

function resolveBranch(filePath: string, config: RepoConfig): string {
  if (!config.branchRules) return config.branch
  for (const { prefix, branch } of config.branchRules) {
    if (filePath === prefix || filePath.startsWith(prefix)) return branch
  }
  return config.branch
}

/** 워크스페이스 경로 → GitHub blob URL */
export function resolveGithubUrl(workspacePath: string): string | null {
  const repoKey = getRepoKey(workspacePath)
  if (!repoKey) return null

  const config = REPO_CONFIG[repoKey]
  const filePath = workspacePath.startsWith(config.stripPrefix)
    ? workspacePath.slice(config.stripPrefix.length)
    : workspacePath

  const branch = resolveBranch(filePath, config)
  const lastSegment = filePath.split('/').pop() ?? ''
  const isDirectory = !lastSegment.includes('.')
  const type = isDirectory ? 'tree' : 'blob'

  return `${config.base}/${type}/${branch}/${filePath}`
}

export const GITHUB_REPOS = {
  frontend: REPO_CONFIG.kakamu.base,
  backend: REPO_CONFIG.kakamu_be.base,
  ml: REPO_CONFIG.kakamu_ml.base,
  helm: REPO_CONFIG.kakamu_helm.base,
  loadTest: REPO_CONFIG.kakamu_load_test.base,
} as const
