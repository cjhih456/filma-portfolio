import type { Metric } from '../types/portfolio'

type MetricsBarProps = {
  metrics: Metric[]
}

export function MetricsBar({ metrics }: MetricsBarProps) {
  return (
    <div className="metrics-bar">
      {metrics.map((metric) => (
        <div key={metric.label} className="metric-pill">
          <span className="metric-value">{metric.value}</span>
          <span className="metric-label">{metric.label}</span>
          {metric.source ? <span className="metric-source">{metric.source}</span> : null}
        </div>
      ))}
    </div>
  )
}
