import type { GitRepoStats } from '../types/portfolio'

export const GIT_AUTHOR = '최인환'
export const GIT_GENERATED_AT = '2026-07-06'

export const gitRepos: GitRepoStats[] = [
  {
    name: 'kakamu',
    label: 'Frontend (filma)',
    totalCommits: 541,
    authorCommits: 534,
    contributionPct: 98.7,
    linesAdded: 140475,
    linesDeleted: 61349,
    role: '단독 주도 — Expo 모노레포',
    period: '2026-05-06 ~ 2026-07-03',
  },
  {
    name: 'kakamu_be',
    label: 'Backend (FILMA API)',
    totalCommits: 440,
    authorCommits: 143,
    contributionPct: 32.5,
    linesAdded: 9442,
    linesDeleted: 4240,
    role: '4인 팀 공동 1위 (비머지 117, DreamFriend011020과 동률)',
    period: '2026-06-16 ~ 2026-07-05',
  },
  {
    name: 'kakamu_ml',
    label: 'ML (GraphRAG)',
    totalCommits: 332,
    authorCommits: 331,
    contributionPct: 99.6,
    linesAdded: 33106,
    linesDeleted: 9923,
    role: '단독 주도 — GraphRAG 추천·Chat',
    period: '2026-04 ~ 2026-07',
  },
]

export const gitSummary = {
  totalAuthorCommits: 534 + 143 + 331,
  totalLinesAdded: 140475 + 9442 + 33106,
  totalLinesDeleted: 61349 + 4240 + 9923,
}
