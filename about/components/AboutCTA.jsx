function AboutCTA() {
  return (
    <Section bg="forest" padding="lg">
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: 64,
          alignItems: 'center',
        }} className="about-cta-grid">
          <div>
            <Eyebrow color="#F0D9A8">07 / Talk to us</Eyebrow>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(34px, 4.2vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 24px',
              color: '#F7F2EB',
              textWrap: 'balance',
            }}>
              Come talk to us.
            </h2>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 19,
              lineHeight: 1.55,
              color: '#F0D9A8',
              opacity: 0.92,
              margin: 0,
              maxWidth: 560,
              textWrap: 'pretty',
            }}>
              If any of this resonates, get on a call with our founding team. We'll listen to where customer support is breaking in your business, tell you honestly whether we can help, and walk you through what working together would actually look like.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }} className="about-cta-actions">
            <Button variant="on-dark" size="lg">Book a discovery call</Button>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.55,
              color: '#F0D9A8',
              opacity: 0.85,
              margin: 0,
              maxWidth: 320,
            }}>
              30 minutes. No commitment. No credit card. You'll talk directly with our founding team.
            </p>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .about-cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </Section>
  );
}

window.AboutCTA = AboutCTA;
