export const CHART_COLORS = {
  before: '#f87171',
  after: '#34d399',
  accent: '#60a5fa',
  muted: '#94a3b8',
  grid: 'rgba(148, 163, 184, 0.15)',
  tooltipBg: '#1e293b',
  tooltipBorder: '#334155',
} as const

export const chartTooltipStyle = {
  backgroundColor: CHART_COLORS.tooltipBg,
  border: `1px solid ${CHART_COLORS.tooltipBorder}`,
  borderRadius: 8,
  color: '#f1f5f9',
  fontSize: 13,
}
