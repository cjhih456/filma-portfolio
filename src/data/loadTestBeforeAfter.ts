export type LoadTestSnapshot = {
  label: string
  source: string
  date?: string
  vu: number
  phase: 'before' | 'after'
  totalRequests: number
  failures: number
  failureRatePct: number
  medianMs: number
  avgMs: number
  p99Ms: number
  rps: number
  postsAvgMs: number
  searchLiveAvgMs: number
}

export const loadTestComparison = {
  before: {
    label: '400 VU (개선 전)',
    source: 'reports_before/16-ramp-400vu-preissued-token_stats.csv',
    date: '2026-06-30',
    vu: 400,
    phase: 'before' as const,
    totalRequests: 59787,
    failures: 1,
    failureRatePct: 0.002,
    medianMs: 90,
    avgMs: 1007,
    p99Ms: 54000,
    rps: 100,
    postsAvgMs: 1169,
    searchLiveAvgMs: 957,
  },
  after: {
    label: '900 VU (개선 후)',
    source: 'reports/06-ml-900vu_stats.csv',
    vu: 900,
    phase: 'after' as const,
    totalRequests: 357436,
    failures: 160,
    failureRatePct: 0.045,
    medianMs: 120,
    avgMs: 496,
    p99Ms: 5900,
    rps: 298,
    postsAvgMs: 688,
    searchLiveAvgMs: 687,
  },
}

export const apiLatencyComparison = [
  {
    endpoint: 'GET /posts',
    beforeMs: 1169,
    afterMs: 688,
  },
  {
    endpoint: 'GET /search/live',
    beforeMs: 957,
    afterMs: 687,
  },
  {
    endpoint: 'GET /posts/[id]',
    beforeMs: 1142,
    afterMs: 411,
  },
  {
    endpoint: 'GET /posts/[id]/comments',
    beforeMs: 926,
    afterMs: 433,
  },
]

export const loadTestBeforeAfterChartData = [
  {
    metric: 'Median (ms)',
    before: loadTestComparison.before.medianMs,
    after: loadTestComparison.after.medianMs,
  },
  {
    metric: 'Average (ms)',
    before: loadTestComparison.before.avgMs,
    after: loadTestComparison.after.avgMs,
  },
  {
    metric: 'p99 (ms)',
    before: loadTestComparison.before.p99Ms,
    after: loadTestComparison.after.p99Ms,
  },
  {
    metric: 'RPS',
    before: loadTestComparison.before.rps,
    after: loadTestComparison.after.rps,
  },
]
