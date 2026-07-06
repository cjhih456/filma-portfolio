import type { ChartId } from '../../types/portfolio'
import { ApiLatencyCompareChart } from './ApiLatencyCompareChart'
import { EmbeddingMultilabelCompareChart } from './EmbeddingMultilabelCompareChart'
import { EmbeddingNdgcChart } from './EmbeddingNdgcChart'
import { GitContributionChart } from './GitContributionChart'
import { LoadTestBeforeAfterChart } from './LoadTestBeforeAfterChart'
import { LoadTestRampChart } from './LoadTestRampChart'

type ChartRendererProps = {
  chartId: ChartId
}

export function ChartRenderer({ chartId }: ChartRendererProps) {
  switch (chartId) {
    case 'load-test-before-after':
      return <LoadTestBeforeAfterChart />
    case 'load-test-ramp':
      return <LoadTestRampChart />
    case 'api-latency':
      return <ApiLatencyCompareChart />
    case 'git-contribution':
      return <GitContributionChart />
    case 'embedding-multilabel-compare':
      return <EmbeddingMultilabelCompareChart />
    case 'embedding-ndcg':
      return <EmbeddingNdgcChart />
    default:
      return null
  }
}
