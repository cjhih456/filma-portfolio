export type LoadTestRampPoint = {
  vu: number
  phase: 'before' | 'after' | 'limit'
  medianMs: number
  avgMs: number
  failureRatePct: number
  source: string
}

export const loadTestRampSeries: LoadTestRampPoint[] = [
  {
    vu: 400,
    phase: 'before',
    medianMs: 90,
    avgMs: 1007,
    failureRatePct: 0.002,
    source: 'reports_before/16-ramp-400vu-preissued-token_stats.csv',
  },
  {
    vu: 500,
    phase: 'after',
    medianMs: 65,
    avgMs: 174,
    failureRatePct: 0,
    source: 'reports/06-ml-500vu_stats.csv',
  },
  {
    vu: 700,
    phase: 'after',
    medianMs: 94,
    avgMs: 194,
    failureRatePct: 0.004,
    source: 'reports/06-ml-700vu_stats.csv',
  },
  {
    vu: 800,
    phase: 'after',
    medianMs: 120,
    avgMs: 295,
    failureRatePct: 0.01,
    source: 'reports/06-ml-800vu_stats.csv',
  },
  {
    vu: 900,
    phase: 'after',
    medianMs: 120,
    avgMs: 496,
    failureRatePct: 0.045,
    source: 'reports/06-ml-900vu_stats.csv',
  },
  {
    vu: 1000,
    phase: 'limit',
    medianMs: 160,
    avgMs: 492,
    failureRatePct: 11.4,
    source: 'reports/06-ml-1000vu_stats.csv',
  },
]
