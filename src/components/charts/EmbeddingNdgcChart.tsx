import {
  Bar,
  BarChart,
  CartesianGrid,
  ErrorBar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { embedNdgcMeta, embeddingNdgcData } from '../../data/embedTestNdgc'
import { CHART_COLORS, chartTooltipStyle } from './chartTheme'

export function EmbeddingNdgcChart() {
  return (
    <div className="chart-card">
      <h4 className="chart-title">Retrieval nDCG@K — Qwen3-0.6B</h4>
      <p className="chart-caption">
        {embedNdgcMeta.queries}개 쿼리 · corpus {embedNdgcMeta.corpus.toLocaleString()}편 ·{' '}
        {embedNdgcMeta.relevance}
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={embeddingNdgcData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="k"
            tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
            tickFormatter={(k) => `@${k}`}
          />
          <YAxis
            domain={[0, 0.2]}
            tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
            tickFormatter={(v) => v.toFixed(2)}
          />
          <Tooltip
            contentStyle={chartTooltipStyle}
            formatter={(v, _name, item) => {
              const std = (item?.payload as { std?: number } | undefined)?.std
              const ndcg = typeof v === 'number' ? v.toFixed(4) : String(v)
              const label = std != null ? `${ndcg} (±${std.toFixed(4)})` : ndcg
              return [label, 'nDCG']
            }}
            labelFormatter={(k) => `nDCG@${k}`}
          />
          <Bar dataKey="ndcg" name="nDCG" fill={CHART_COLORS.accent} radius={[4, 4, 0, 0]}>
            <ErrorBar dataKey="std" width={4} stroke={CHART_COLORS.muted} direction="y" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
