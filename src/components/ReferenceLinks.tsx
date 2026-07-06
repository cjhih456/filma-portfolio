import { resolveGithubUrl } from '../data/githubLinks'
import type { Reference } from '../types/portfolio'

type ReferenceLinksProps = {
  references: Reference[]
}

export function ReferenceLinks({ references }: ReferenceLinksProps) {
  return (
    <footer className="star-references">
      <span className="ref-label">근거</span>
      {references.map((ref) => {
        const url = ref.url ?? resolveGithubUrl(ref.path)
        if (url) {
          return (
            <a
              key={ref.path}
              href={url}
              className="ref-link"
              target="_blank"
              rel="noopener noreferrer"
              title={ref.path}
            >
              {ref.label}
            </a>
          )
        }
        return (
          <code key={ref.path} className="ref-path" title={ref.path}>
            {ref.label}
          </code>
        )
      })}
    </footer>
  )
}
