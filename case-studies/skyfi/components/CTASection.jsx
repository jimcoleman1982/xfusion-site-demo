function CTASection({ title, body, ctaLabel = 'Book a Discovery Call', microcopy }) {
  return (
    <Section bg="forest" padding="xl" id="cta">
      <Container>
        <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'left' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#F0D9A8',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <span style={{ width: 24, height: 1, background: '#F0D9A8', display: 'inline-block' }} />
            Ready when you are
          </div>

          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 28px',
            color: '#F7F2EB',
            textWrap: 'balance',
          }}>{title}</h2>

          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(17px, 1.6vw, 19px)',
            lineHeight: 1.6,
            color: '#F7F2EB',
            opacity: 0.92,
            margin: '0 0 40px',
            maxWidth: 720,
            textWrap: 'pretty',
          }}>{body}</p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
          }}>
            <Button variant="on-dark" size="lg">
              {ctaLabel}
              <Icon name="arrow" size={18} stroke={1.75} />
            </Button>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.55,
              color: '#D7E0DC',
              margin: 0,
              maxWidth: 420,
            }}>{microcopy}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

window.CTASection = CTASection;
