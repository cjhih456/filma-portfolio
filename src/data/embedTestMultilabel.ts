/**
 * kakamu_ml `data/embed-tests` — result_data_3 (11,384편, kNN k=107)
 * 출처: embed_test/result_data_3/multilabel_metrics_report.md
 */

export const embedTestMeta = {
  branch: 'data/embed-tests',
  samples: 11_384,
  knnK: 107,
  labelTypes: {
    genre: { labels: 59, avgPerMovie: 2.1 },
    theme: { labels: 67, avgPerMovie: 9.0 },
    mood: { labels: 47, avgPerMovie: 7.2 },
  },
  models: ['bge-m3', 'qwen3-0.6B'] as const,
} as const

export type EmbedLabelType = 'genre' | 'theme' | 'mood'

export type EmbedModelKey = 'bgeM3' | 'qwen3'

export type EmbedMultilabelRow = {
  labelType: EmbedLabelType
  label: string
  bgeM3: number
  qwen3: number
}

/** samples F1 — 모델 선정 1차 지표 */
export const embeddingSamplesF1Data: EmbedMultilabelRow[] = [
  { labelType: 'genre', label: 'Genre', bgeM3: 0.43, qwen3: 0.603 },
  { labelType: 'theme', label: 'Theme', bgeM3: 0.359, qwen3: 0.488 },
  { labelType: 'mood', label: 'Mood', bgeM3: 0.568, qwen3: 0.637 },
]

/** macro mAP — 랭킹 품질 */
export const embeddingMacroMapData: EmbedMultilabelRow[] = [
  { labelType: 'genre', label: 'Genre', bgeM3: 0.409, qwen3: 0.514 },
  { labelType: 'theme', label: 'Theme', bgeM3: 0.409, qwen3: 0.441 },
  { labelType: 'mood', label: 'Mood', bgeM3: 0.395, qwen3: 0.429 },
]

/** separation margin — 임베딩 공간 라벨 분리도 */
export const embeddingSeparationMarginData: EmbedMultilabelRow[] = [
  { labelType: 'genre', label: 'Genre', bgeM3: 0.055, qwen3: 0.095 },
  { labelType: 'theme', label: 'Theme', bgeM3: 0.015, qwen3: 0.031 },
  { labelType: 'mood', label: 'Mood', bgeM3: 0.02, qwen3: 0.039 },
]

/** label-wise silhouette (support 가중 macro) */
export const embeddingSilhouetteData: EmbedMultilabelRow[] = [
  { labelType: 'genre', label: 'Genre', bgeM3: 0.01, qwen3: 0.021 },
  { labelType: 'theme', label: 'Theme', bgeM3: 0.009, qwen3: 0.012 },
  { labelType: 'mood', label: 'Mood', bgeM3: 0.011, qwen3: 0.02 },
]
