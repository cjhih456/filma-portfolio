import { Link } from 'react-router-dom'
import { projects } from '../data'
import { gitSummary, GIT_AUTHOR, GIT_GENERATED_AT } from '../data/gitStats'
import { overview } from '../data/overview'
import { GitContributionChart } from '../components/charts/GitContributionChart'
import { NarrativeText } from '../components/NarrativeText'

export function IndexPage() {
  return (
    <div className="index-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">{overview.period}</p>
          <h1 className="hero-title">{overview.title}</h1>
          <p className="hero-subtitle">{overview.subtitle}</p>
          <div className="hero-description">
            <NarrativeText text={overview.description} />
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">{gitSummary.totalAuthorCommits.toLocaleString()}</span>
              <span className="hero-stat-label">총 커밋</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">3</span>
              <span className="hero-stat-label">저장소</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">{GIT_AUTHOR}</span>
              <span className="hero-stat-label">주요 기여자</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section index-projects">
        <div className="section-heading">
          <h2>프로젝트</h2>
          <p>Frontend · Backend · ML — 각 영역 상세 페이지</p>
        </div>
        <div className="project-cards">
          {projects.map((project) => (
            <Link key={project.id} to={`/${project.id}`} className="project-card">
              <span className="project-card-repo">{project.repo}</span>
              <h3>{project.detail.headline}</h3>
              <p className="project-card-summary">{project.summary.split('\n\n')[0]}</p>
              <div className="project-card-stack">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className="tech-pill small">
                    {tech}
                  </span>
                ))}
              </div>
              <span className="project-card-cta">상세 보기 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section index-git">
        <div className="section-heading">
          <h2>Git 기여도</h2>
          <p>
            {GIT_AUTHOR} · {GIT_GENERATED_AT}
          </p>
        </div>
        <GitContributionChart />
      </section>
    </div>
  )
}
