import { ProjectPage } from '../components/ProjectPage'
import {
  EmbeddingMultilabelCompareChart,
  EmbeddingNdgcChart,
} from '../components/charts'
import { mlProject } from '../data/projects/ml'

export function MlPage() {
  return (
    <ProjectPage project={mlProject}>
      <section className="detail-section charts-section">
        <h2>임베딩 평가 지표</h2>
        <p className="section-lead">
          kakamu_ml <code className="ref-path">data/embed-tests</code> 브랜치 — multi-label kNN
          (11,384편) 및 retrieval nDCG@K (387 쿼리)
        </p>
        <div className="charts-grid">
          <EmbeddingMultilabelCompareChart />
          <EmbeddingNdgcChart />
        </div>
      </section>
    </ProjectPage>
  )
}
