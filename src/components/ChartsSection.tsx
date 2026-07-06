import {
  ApiLatencyCompareChart,
  GitContributionChart,
  LoadTestBeforeAfterChart,
  LoadTestRampChart,
} from './charts'

type ChartsSectionProps = {
  variant?: 'full' | 'load-test'
  embedded?: boolean
}

export function ChartsSection({ variant = 'full', embedded = false }: ChartsSectionProps) {
  const charts =
    variant === 'load-test' ? (
      <>
        <LoadTestBeforeAfterChart />
        <LoadTestRampChart />
        <ApiLatencyCompareChart />
      </>
    ) : (
      <>
        <LoadTestBeforeAfterChart />
        <LoadTestRampChart />
        <ApiLatencyCompareChart />
        <GitContributionChart />
      </>
    )

  if (embedded) {
    return <div className="charts-grid">{charts}</div>
  }

  return (
    <section id="charts" className="section charts-section">
      <div className="section-heading">
        <h2>성과 차트</h2>
        <p>부하 테스트 Before/After와 git 기여도 — Locust 리포트·git log 기반</p>
      </div>
      <div className="charts-grid">{charts}</div>
    </section>
  )
}
