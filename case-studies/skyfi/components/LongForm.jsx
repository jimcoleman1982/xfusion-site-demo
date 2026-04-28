// LongForm — section heading + narrow column body. Used for About, Challenge, Solution, Results.
// Accepts a `section` label (eyebrow), `title`, and an array of `paragraphs`.
// Renders an optional drop cap on the first paragraph for the editorial feel.

function LongForm({
  section,
  number,
  title,
  paragraphs = [],
  bg = 'paper',
  dropCap = false,
  rule = true,
}) {
  return (
    <Section bg={bg} padding="lg">
      <Container>
        {rule && (
          <div style={{
            maxWidth: 720,
            margin: '0 auto',
            paddingBottom: 32,
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
          }}>
            {number && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 500,
                color: '#B8512C',
                letterSpacing: '0.14em',
              }}>{number}</span>
            )}
            {section && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#6B5F56',
              }}>{section}</span>
            )}
            <span style={{ flex: 1, height: 1, background: '#D9CFBF', marginLeft: 8 }} />
          </div>
        )}

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 40px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>{title}</h2>

          {paragraphs.map((p, i) => (
            <p key={i} style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18,
              lineHeight: 1.65,
              color: '#1F1A17',
              margin: '0 0 24px',
              textWrap: 'pretty',
            }} className={dropCap && i === 0 ? 'lf-dropcap' : undefined}>{p}</p>
          ))}
        </div>
      </Container>
      <style>{`
        .lf-dropcap::first-letter {
          font-family: 'Source Serif 4', serif;
          font-size: 4.4em;
          font-weight: 400;
          float: left;
          line-height: 0.9;
          padding: 6px 12px 0 0;
          color: #B8512C;
        }
      `}</style>
    </Section>
  );
}

window.LongForm = LongForm;
