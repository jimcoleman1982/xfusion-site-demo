// Sections 8 & 9: Shoutout grids. 3-column quote cards with mono attribution.
function ShoutoutGrid({ eyebrow, heading, intro, quotes, bg = 'butter', cardStyle = 'paper' }) {
  return (
    <Section bg={bg} padding="lg" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <Container>
        <div style={{ maxWidth: 1040, margin: '0 auto 56px' }}>
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
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#B8512C' }}/>
              {eyebrow}
            </div>
          )}
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
            color: '#1F1A17',
            textWrap: 'balance',
            maxWidth: 760,
          }}>{heading}</h2>
          {intro && (
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 17,
              lineHeight: 1.6,
              color: '#3A322D',
              margin: 0,
              maxWidth: 760,
              textWrap: 'pretty',
            }}>{intro}</p>
          )}
        </div>

        <div className="sg-grid" style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {quotes.map((q, i) => (
            <ShoutoutCard key={i} quote={q.quote} attribution={q.attribution} index={i + 1} cardStyle={cardStyle} />
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 880px) {
          .sg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}

function ShoutoutCard({ quote, attribution, index, cardStyle }) {
  const [hover, setHover] = React.useState(false);
  const styles = cardStyle === 'butter'
    ? { bg: '#F8EBC9', border: '#E6C683' }
    : { bg: '#F7F2EB', border: '#D9CFBF' };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        borderRadius: 12,
        padding: '28px 28px 24px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 240ms cubic-bezier(0.4,0,0.6,1), box-shadow 240ms cubic-bezier(0.4,0,0.6,1)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? '0 2px 8px rgba(31, 26, 23, 0.05), 0 1px 2px rgba(31, 26, 23, 0.04)' : 'none',
      }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 56,
          lineHeight: 0.5,
          color: '#B8512C',
          opacity: 0.5,
        }}>“</div>
        <div style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10,
          fontWeight: 500,
          color: '#6B5F56',
          letterSpacing: '0.14em',
        }}>
          0{index}
        </div>
      </div>
      <p style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: 21,
        lineHeight: 1.35,
        color: '#1F1A17',
        margin: '0 0 28px',
        flex: 1,
        textWrap: 'pretty',
        fontWeight: 400,
      }}>
        {quote}
      </p>
      <div style={{
        paddingTop: 20,
        borderTop: '1px solid rgba(31, 26, 23, 0.12)',
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 13,
        color: '#3A322D',
        fontWeight: 500,
      }}>
        {attribution}
      </div>
    </div>
  );
}

window.ShoutoutGrid = ShoutoutGrid;
