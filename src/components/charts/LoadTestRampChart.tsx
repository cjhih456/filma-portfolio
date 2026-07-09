import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { loadTestRampSeries } from '../../data/loadTestRampSeries'
import { CHART_COLORS, chartTooltipStyle } from './chartTheme'

export function LoadTestRampChart() {
  return (
    <div className="chart-card">
      <h4 className="chart-title">VU Ramp — Median & 실패율 추이</h4>
      <p className="chart-caption">
        400 VU(개선 전) 이후 500→1,000 VU 단계적 ramp 검증. 실패율 0.05% 수준 유지
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={loadTestRampSeries} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="vu"
            tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
            label={{ value: 'Virtual Users', position: 'insideBottom', offset: -4, fill: CHART_COLORS.muted }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
            label={{ value: 'Median (ms)', angle: -90, position: 'insideLeft', fill: CHART_COLORS.muted }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
            label={{ value: '실패율 (%)', angle: 90, position: 'insideRight', fill: CHART_COLORS.muted }}
          />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="medianMs"
            name="Median (ms)"
            stroke={CHART_COLORS.accent}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="failureRatePct"
            name="실패율 (%)"
            stroke={CHART_COLORS.before}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
