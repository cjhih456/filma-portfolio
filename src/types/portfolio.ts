export type ChartId =
  | 'load-test-before-after'
  | 'load-test-ramp'
  | 'api-latency'
  | 'git-contribution'
  | 'embedding-multilabel-compare'
  | 'embedding-ndcg'

export type Metric = {
  label: string
  value: string
  source?: string
}

export type Reference = {
  label: string
  path: string
  /** 명시적 URL. 없으면 path에서 GitHub blob URL 자동 생성 */
  url?: string
}

export type StarStory = {
  id: string
  title: string
  tags: string[]
  issue: string
  solution: string
  metrics: Metric[]
  references?: Reference[]
  chartId?: ChartId
  chartIds?: ChartId[]
}

export type ProjectHighlight = {
  title: string
  description: string
}

export type ProjectDetail = {
  headline: string
  role: string
  architecture: string
  dataFlow?: string
  highlights: ProjectHighlight[]
  scope: string[]
}

export type ProjectProfile = {
  id: 'frontend' | 'backend' | 'ml'
  name: string
  repo: string
  period: string
  summary: string
  techStack: string[]
  detail: ProjectDetail
  stories: StarStory[]
}

export type GitRepoStats = {
  name: string
  label: string
  totalCommits: number
  authorCommits: number
  contributionPct: number
  linesAdded: number
  linesDeleted: number
  role: string
  period: string
}
