import { ChartsSection } from '../components/ChartsSection'
import { ProjectPage } from '../components/ProjectPage'
import { backendProject } from '../data/projects/backend'

export function BackendPage() {
  return (
    <ProjectPage project={backendProject}>
      <section className="detail-section charts-inline">
        <h2>부하 테스트 성과</h2>
        <p className="section-lead">400 VU(개선 전) → 900 VU(개선 후) Before/After 비교</p>
        <ChartsSection variant="load-test" embedded />
      </section>
    </ProjectPage>
  )
}
