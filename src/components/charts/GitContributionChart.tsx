import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { gitRepos } from '../../data/gitStats'
import { CHART_COLORS, chartTooltipStyle } from './chartTheme'

const chartData = gitRepos.map((repo) => ({
  name: repo.label,
  commits: repo.authorCommits,
  contribution: repo.contributionPct,
}))

export function GitContributionChart() {
  return (
    <div className="chart-card">
      <h4 className="chart-title">Git 기여도 — 최인환</h4>
      <p className="chart-caption">3개 저장소 합산 1,008 커밋 (Frontend 98.7% · Backend 32.5% · ML 99.6%)</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} horizontal={false} />
          <XAxis type="number" tick={{ fill: CHART_COLORS.muted, fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={140}
            tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
          />
          <Tooltip
            contentStyle={chartTooltipStyle}
            formatter={(value, name) => {
              if (name === 'commits') return [`${value} commits`, '커밋']
              return [value, name]
            }}
          />
          <Bar dataKey="commits" name="commits" fill={CHART_COLORS.accent} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
