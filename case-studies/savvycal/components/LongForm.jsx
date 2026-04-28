// Long-form prose section. Used for About, The Challenge, The Solution, The Results.
// Pattern: section heading, narrow column body. Optional eyebrow chapter mark.
function LongForm({ id, eyebrow, heading, children, bg = 'paper', narrow = true }) {
  return (
    <Section bg={bg} padding="lg" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <Container>
        <div style={{ maxWidth: narrow ? 720 : 880, margin: '0 auto' }} id={id}>
          {eyebrow && (
            <div style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#B8512C',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{
                display: 'inline-block', width: 24, height: 1, background: '#B8512C',
              }}/>
              {eyebrow}
            </div>
          )}
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(34px, 4.4vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 36px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>{heading}</h2>
          <div className="lf-body" style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 18,
            lineHeight: 1.65,
            color: '#1F1A17',
          }}>
            {children}
          </div>
        </div>
      </Container>
      <style>{`
        .lf-body p { margin: 0 0 20px; text-wrap: pretty; }
        .lf-body p:last-child { margin-bottom: 0; }
        .lf-body p.lf-pull {
          font-family: 'Source Serif 4', serif;
          font-size: clamp(22px, 2.4vw, 28px);
          line-height: 1.35;
          color: #1F1A17;
          margin: 28px 0;
          padding-left: 20px;
          border-left: 2px solid #B8512C;
          font-style: italic;
          font-weight: 400;
        }
        .lf-body ul.results-list {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
        }
        .lf-body ul.results-list li {
          padding: 18px 0;
          border-top: 1px solid #D9CFBF;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          align-items: baseline;
        }
        .lf-body ul.results-list li:last-child { border-bottom: 1px solid #D9CFBF; }
        .lf-body ul.results-list li .rl-marker {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          color: #B8512C;
          letter-spacing: 0.04em;
          font-weight: 500;
          padding-top: 4px;
        }
        .lf-body ul.results-list li .rl-text strong {
          font-weight: 600;
          color: #1F1A17;
        }
      `}</style>
    </Section>
  );
}

window.LongForm = LongForm;
