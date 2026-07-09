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
import { apiLatencyComparison } from '../../data/loadTestBeforeAfter'
import { CHART_COLORS, chartTooltipStyle } from './chartTheme'

export function ApiLatencyCompareChart() {
  return (
    <div className="chart-card">
      <h4 className="chart-title">핵심 API 평균 응답 — Before vs After</h4>
      <p className="chart-caption">피드·검색 API latency 개선 (400 VU Before → 1,000 VU After)</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={apiLatencyComparison} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis dataKey="endpoint" tick={{ fill: CHART_COLORS.muted, fontSize: 11 }} />
          <YAxis tick={{ fill: CHART_COLORS.muted, fontSize: 12 }} unit="ms" />
          <Tooltip contentStyle={chartTooltipStyle} formatter={(v) => [`${v} ms`, '']} />
          <Legend />
          <Bar dataKey="beforeMs" name="400 VU Before" fill={CHART_COLORS.before} radius={[4, 4, 0, 0]} />
          <Bar dataKey="afterMs" name="1,000 VU After" fill={CHART_COLORS.after} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
