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
} as const

type RepoKey = keyof typeof REPO_CONFIG

function getRepoKey(workspacePath: string): RepoKey | null {
  const key = workspacePath.split('/')[0]
  if (key in REPO_CONFIG) return key as RepoKey
  return null
}

/** 워크스페이스 경로 → GitHub blob URL */
export function resolveGithubUrl(workspacePath: string): string | null {
  const repoKey = getRepoKey(workspacePath)
  if (!repoKey) return null

  const { base, branch, stripPrefix } = REPO_CONFIG[repoKey]
  const filePath = workspacePath.startsWith(stripPrefix)
    ? workspacePath.slice(stripPrefix.length)
    : workspacePath

  const lastSegment = filePath.split('/').pop() ?? ''
  const isDirectory = !lastSegment.includes('.')
  const type = isDirectory ? 'tree' : 'blob'

  return `${base}/${type}/${branch}/${filePath}`
}

export const GITHUB_REPOS = {
  frontend: REPO_CONFIG.kakamu.base,
  backend: REPO_CONFIG.kakamu_be.base,
  ml: REPO_CONFIG.kakamu_ml.base,
  helm: REPO_CONFIG.kakamu_helm.base,
  loadTest: REPO_CONFIG.kakamu_load_test.base,
} as const
