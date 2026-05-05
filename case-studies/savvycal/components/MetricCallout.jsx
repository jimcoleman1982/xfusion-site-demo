// Section 5: Oversized stat callout. Forest background, Paper text. The proof moment.
function MetricCallout() {
  return (
    <Section bg="forest" padding="lg" style={{ paddingTop: 112, paddingBottom: 112, position: 'relative' }}>
      <Container>
        <div style={{ maxWidth: 1040, margin: '0 auto', textAlign: 'left' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: '#F0D9A8',
            marginBottom: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <span style={{
              display: 'inline-block', width: 28, height: 1, background: '#F0D9A8', opacity: 0.6,
            }}/>
            The headline number
          </div>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(72px, 14vw, 200px)',
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: '-0.045em',
            color: '#F7F2EB',
            margin: '0 0 24px',
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>
            <span style={{ position: 'relative' }}>
              84.79
              <span style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '0.5em',
                color: '#F0D9A8',
                marginLeft: '0.06em',
                fontWeight: 400,
                verticalAlign: 'top',
                position: 'relative',
                top: '0.12em',
              }}>%</span>
            </span>
          </div>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: '#F0D9A8',
            margin: '0 0 36px',
            maxWidth: 680,
          }}>reduction</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '24px 1fr',
            gap: 20,
            maxWidth: 720,
            paddingTop: 28,
            borderTop: '1px solid rgba(240, 217, 168, 0.25)',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 12,
              color: '#F0D9A8',
              opacity: 0.8,
              paddingTop: 4,
              letterSpacing: '0.04em',
            }}>↳</div>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 'clamp(17px, 1.6vw, 19px)',
              lineHeight: 1.55,
              color: '#F7F2EB',
              opacity: 0.9,
              margin: 0,
              textWrap: 'pretty',
            }}>
              in average customer support reply time after placing a senior xFusion agent as an extension of the SavvyCal team.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

window.MetricCallout = MetricCallout;
