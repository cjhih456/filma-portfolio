import { Link } from 'react-router-dom'
import type { ProjectProfile } from '../types/portfolio'
import { gitRepos } from '../data/gitStats'
import { GITHUB_REPOS } from '../data/githubLinks'
import { NarrativeText } from './NarrativeText'
import { StarStoryCard } from './StarStoryCard'

const REPO_GITHUB_URL: Record<ProjectProfile['repo'], string> = {
  kakamu: GITHUB_REPOS.frontend,
  kakamu_be: GITHUB_REPOS.backend,
  kakamu_ml: GITHUB_REPOS.ml,
}

type ProjectPageProps = {
  project: ProjectProfile
  children?: React.ReactNode
}

export function ProjectPage({ project, children }: ProjectPageProps) {
  const git = gitRepos.find((r) => r.name === project.repo)

  return (
    <div className="project-page">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>{project.name}</span>
      </nav>

      <header className="project-page-hero">
        <p className="project-repo">
          <a
            href={REPO_GITHUB_URL[project.repo]}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-github-link"
          >
            {project.repo} ↗
          </a>
        </p>
        <h1 className="project-page-title">{project.detail.headline}</h1>
        <p className="project-page-name">{project.name}</p>
        <div className="project-summary">
          <NarrativeText text={project.summary} />
        </div>
        <p className="project-role">{project.detail.role}</p>
        <div className="project-meta-row">
          <span className="meta-item">{project.period}</span>
          {git ? (
            <span className="meta-item">
              {git.authorCommits} commits ({git.contributionPct}%)
            </span>
          ) : null}
        </div>
        <div className="tech-stack">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-pill">
              {tech}
            </span>
          ))}
        </div>
      </header>

      <section className="detail-section">
        <h2>아키텍처</h2>
        <NarrativeText text={project.detail.architecture} />
        {project.detail.dataFlow ? (
          <pre className="data-flow">{project.detail.dataFlow}</pre>
        ) : null}
      </section>

      <section className="detail-section">
        <h2>핵심 하이라이트</h2>
        <div className="highlights-grid">
          {project.detail.highlights.map((item) => (
            <article key={item.title} className="highlight-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2>구현 범위</h2>
        <ul className="scope-list">
          {project.detail.scope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {children}

      <section className="detail-section star-section">
        <h2>STAR 엔지니어링 스토리</h2>
        <p className="section-lead">직면한 이슈 → 적용한 해결안 → 성과 지표</p>
        <div className="star-list">
          {project.stories.map((story, index) => (
            <StarStoryCard key={story.id} story={story} index={index} />
          ))}
        </div>
      </section>

      {git ? (
        <section className="detail-section git-mini">
          <h2>Git 기여도</h2>
          <div className="git-mini-grid">
            <div className="git-mini-stat">
              <span className="git-mini-value">{git.authorCommits}</span>
              <span className="git-mini-label">커밋</span>
            </div>
            <div className="git-mini-stat">
              <span className="git-mini-value">{git.contributionPct}%</span>
              <span className="git-mini-label">기여율</span>
            </div>
            <div className="git-mini-stat">
              <span className="git-mini-value">+{git.linesAdded.toLocaleString()}</span>
              <span className="git-mini-label">추가 라인</span>
            </div>
            <div className="git-mini-stat">
              <span className="git-mini-value">−{git.linesDeleted.toLocaleString()}</span>
              <span className="git-mini-label">삭제 라인</span>
            </div>
          </div>
          <p className="git-mini-role">{git.role}</p>
        </section>
      ) : null}
    </div>
  )
}
