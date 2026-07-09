import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { loadTestBeforeAfterChartData } from '../../data/loadTestBeforeAfter'
import { CHART_COLORS, chartTooltipStyle } from './chartTheme'

export function LoadTestBeforeAfterChart() {
  return (
    <div className="chart-card">
      <h4 className="chart-title">부하 테스트 Before / After (400 VU → 1,000 VU)</h4>
      <p className="chart-caption">
        개선 전 400 VU 대비 개선 후 1,000 VU에서 평균 응답 47% 개선, RPS 3.4배 상승
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={loadTestBeforeAfterChartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis dataKey="metric" tick={{ fill: CHART_COLORS.muted, fontSize: 12 }} />
          <YAxis tick={{ fill: CHART_COLORS.muted, fontSize: 12 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend />
          <Bar dataKey="before" name="400 VU (Before)" fill={CHART_COLORS.before} radius={[4, 4, 0, 0]} />
          <Bar dataKey="after" name="1,000 VU (After)" fill={CHART_COLORS.after} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
