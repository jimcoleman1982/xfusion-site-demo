function MetricCallout({ headline, support, variant = 'forest' }) {
  const isForest = variant === 'forest';
  return (
    <Section bg={isForest ? 'forest' : 'butter'} padding="xl">
      <Container>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: isForest ? '#F0D9A8' : '#7a5a10',
            marginBottom: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <span style={{
              width: 24, height: 1,
              background: isForest ? '#F0D9A8' : '#7a5a10',
              display: 'inline-block',
            }} />
            The proof
          </div>

          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(48px, 7.5vw, 108px)',
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            color: isForest ? '#F7F2EB' : '#1F1A17',
            margin: '0 0 36px',
            textWrap: 'balance',
          }}>
            {headline}
          </div>

          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(18px, 1.8vw, 22px)',
            fontWeight: 400,
            lineHeight: 1.5,
            color: isForest ? '#D7E0DC' : '#3A322D',
            margin: 0,
            maxWidth: 720,
            textWrap: 'pretty',
          }}>
            {support}
          </div>
        </div>
      </Container>
    </Section>
  );
}

window.MetricCallout = MetricCallout;
