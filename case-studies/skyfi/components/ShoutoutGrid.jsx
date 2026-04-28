// ShoutoutGrid — placeholder cards for sections 8 & 9 (leader & customer shoutouts).
// Designed so the same component slots in real quotes later: pass `items` with
// quote, name, role, etc.; cards without a `quote` render as the "coming soon" empty state.

function ShoutoutGrid({
  section,
  title,
  caption,
  emptyLabel = 'Quote coming soon',
  items = [],
  bg = 'paper',
  cols = 3,
}) {
  const placeholderItems = items.length ? items : Array.from({ length: cols }, (_, i) => ({ key: i }));
  const isPaper = bg === 'paper';

  return (
    <Section bg={bg} padding="lg">
      <Container>
        <div style={{
          maxWidth: 720,
          margin: '0 auto 48px',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#6B5F56',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <span style={{ width: 24, height: 1, background: '#B7A993', display: 'inline-block' }} />
            {section}
          </div>

          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>{title}</h2>

          {caption && (
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 16,
              lineHeight: 1.55,
              color: '#6B5F56',
              fontStyle: 'italic',
              margin: 0,
              maxWidth: 540,
            }}>{caption}</p>
          )}
        </div>

        <div className={`sg-grid sg-cols-${cols}`} style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 24,
        }}>
          {placeholderItems.map((it, i) => {
            const empty = !it.quote;
            return (
              <article key={i} style={{
                background: isPaper ? '#FBF6EE' : '#F7F2EB',
                border: '1px dashed ' + (empty ? '#B7A993' : '#D9CFBF'),
                borderRadius: 12,
                padding: 28,
                minHeight: 240,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}>
                {empty ? (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: 18, right: 18,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: '#9E9388',
                      padding: '4px 8px',
                      border: '1px solid #D9CFBF',
                      borderRadius: 999,
                      background: '#F7F2EB',
                    }}>TBD</div>

                    <Icon name="quote" size={28} color="#D9CFBF" fill="#D9CFBF" stroke={0} />

                    <div style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontSize: 22,
                      lineHeight: 1.35,
                      color: '#9E9388',
                      fontStyle: 'italic',
                      margin: '20px 0 24px',
                      flex: 1,
                    }}>
                      [{it.label || (i === 0 ? 'Leader' : 'Shoutout')} shoutout coming soon]
                    </div>

                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#9E9388',
                      borderTop: '1px solid #E6DCCB',
                      paddingTop: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                      <span style={{
                        width: 32, height: 32, borderRadius: 999,
                        background: '#EFE8DD',
                        border: '1px dashed #B7A993',
                      }} />
                      <span>Name · Title · {it.org || 'SkyFi'}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Icon name="quote" size={28} color="#B8512C" fill="#B8512C" stroke={0} />
                    <div style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontSize: 20,
                      lineHeight: 1.4,
                      color: '#1F1A17',
                      margin: '16px 0 20px',
                    }}>{it.quote}</div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#6B5F56',
                      borderTop: '1px solid #E6DCCB',
                      paddingTop: 14,
                    }}>
                      <span style={{ color: '#1F1A17' }}>{it.name}</span>, {it.role}, {it.org}
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>

        <div style={{
          marginTop: 24,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: '#9E9388',
          letterSpacing: '0.06em',
          textAlign: 'right',
        }}>{emptyLabel}</div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .sg-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .sg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}

window.ShoutoutGrid = ShoutoutGrid;
