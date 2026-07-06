import type { StarStory } from '../types/portfolio'
import { ChartRenderer } from './charts'
import { MetricsBar } from './MetricsBar'
import { NarrativeText } from './NarrativeText'
import { ReferenceLinks } from './ReferenceLinks'

type StarStoryCardProps = {
  story: StarStory
  index: number
}

export function StarStoryCard({ story, index }: StarStoryCardProps) {
  return (
    <article className="star-card">
      <header className="star-card-header">
        <span className="star-index">STAR {index + 1}</span>
        <h3 className="star-title">{story.title}</h3>
        <div className="tag-row">
          {story.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="star-blocks">
        <section className="star-block star-block-issue">
          <h4>직면한 이슈</h4>
          <NarrativeText text={story.issue} />
        </section>
        <section className="star-block star-block-solution">
          <h4>적용한 해결안</h4>
          <NarrativeText text={story.solution} />
        </section>
        <section className="star-block star-block-result">
          <h4>성과 지표</h4>
          <MetricsBar metrics={story.metrics} />
        </section>
      </div>

      {story.chartId ? (
        <div className="star-chart">
          <ChartRenderer chartId={story.chartId} />
        </div>
      ) : null}

      {story.references && story.references.length > 0 ? (
        <ReferenceLinks references={story.references} />
      ) : null}
    </article>
  )
}
