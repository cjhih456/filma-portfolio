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
import {
  embedTestMeta,
  embeddingMacroMapData,
  embeddingSamplesF1Data,
  embeddingSeparationMarginData,
  embeddingSilhouetteData,
} from '../../data/embedTestMultilabel'
import { CHART_COLORS, chartTooltipStyle } from './chartTheme'

const MODEL_LABELS = {
  bgeM3: 'BGE-M3',
  qwen3: 'Qwen3-0.6B',
} as const

type MetricPanelProps = {
  title: string
  data: typeof embeddingSamplesF1Data
  domain?: [number, number]
}

function MetricPanel({ title, data, domain }: MetricPanelProps) {
  return (
    <div className="embed-metric-panel">
      <h5 className="embed-metric-panel-title">{title}</h5>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis dataKey="label" tick={{ fill: CHART_COLORS.muted, fontSize: 11 }} />
          <YAxis
            domain={domain ?? [0, 'auto']}
            tick={{ fill: CHART_COLORS.muted, fontSize: 11 }}
            tickFormatter={(v) => v.toFixed(2)}
          />
          <Tooltip
            contentStyle={chartTooltipStyle}
            formatter={(v) => [typeof v === 'number' ? v.toFixed(3) : String(v), '']}
          />
          <Legend />
          <Bar
            dataKey="bgeM3"
            name={MODEL_LABELS.bgeM3}
            fill={CHART_COLORS.before}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="qwen3"
            name={MODEL_LABELS.qwen3}
            fill={CHART_COLORS.after}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function EmbeddingMultilabelCompareChart() {
  return (
    <div className="chart-card">
      <h4 className="chart-title">Multi-label 임베딩 평가 — BGE-M3 vs Qwen3-0.6B</h4>
      <p className="chart-caption">
        {embedTestMeta.samples.toLocaleString()}편 · kNN k={embedTestMeta.knnK} · genre/theme/mood
        3축 — Qwen3-0.6B가 전 축 1위 (data/embed-tests)
      </p>
      <div className="embed-metrics-grid">
        <MetricPanel title="Samples F1 (모델 선정 1차)" data={embeddingSamplesF1Data} />
        <MetricPanel title="Macro mAP (랭킹 품질)" data={embeddingMacroMapData} />
        <MetricPanel title="Separation Margin (라벨 분리도)" data={embeddingSeparationMarginData} />
        <MetricPanel
          title="Label-wise Silhouette (support 가중)"
          data={embeddingSilhouetteData}
          domain={[0, 0.025]}
        />
      </div>
    </div>
  )
}
