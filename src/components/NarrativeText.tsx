type NarrativeTextProps = {
  text: string
}

/** `\n\n`은 문단, `\n`은 문단 내 줄바꿈으로 렌더링 */
export function NarrativeText({ text }: NarrativeTextProps) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean)

  return (
    <div className="narrative-text">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          {paragraph.split('\n').map((line, lineIndex, lines) => (
            <span key={lineIndex}>
              {line}
              {lineIndex < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}
