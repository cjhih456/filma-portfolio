/**
 * kakamu_ml `data/embed-tests` — nDCG@K retrieval 평가 (Qwen3-0.6B)
 * 출처: embed_test/result_data_3/ndcg/ndcg_summary.csv
 */

export const embedNdgcMeta = {
  model: 'Qwen3-Embedding-0.6B',
  queries: 387,
  corpus: 11_384,
  relevance:
    'genre 공유 + theme/mood Jaccard composite 상위 100편 (grade 3/2/1)',
} as const

export type EmbedNdgcRow = {
  k: number
  ndcg: number
  std: number
}

export const embeddingNdgcData: EmbedNdgcRow[] = [
  { k: 5, ndcg: 0.1253, std: 0.1519 },
  { k: 10, ndcg: 0.1125, std: 0.1167 },
  { k: 20, ndcg: 0.1284, std: 0.1161 },
  { k: 50, ndcg: 0.1493, std: 0.1135 },
]

/** 장르별 nDCG@10 상위 8 (ndcg_report.md) */
export const embeddingNdgcByGenreTop = [
  { genre: '옴니버스', ndcg10: 0.3123 },
  { genre: '자연ㆍ환경', ndcg10: 0.2465 },
  { genre: '문예', ndcg10: 0.2261 },
  { genre: '사회', ndcg10: 0.2228 },
  { genre: '뮤직', ndcg10: 0.2216 },
  { genre: '스포츠', ndcg10: 0.2191 },
  { genre: '기업ㆍ기관ㆍ단체', ndcg10: 0.1996 },
  { genre: '시대극/사극', ndcg10: 0.1736 },
] as const
