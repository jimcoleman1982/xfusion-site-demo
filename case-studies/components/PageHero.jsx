function PageHero() {
  return (
    <Section bg="paper" padding="lg" style={{ paddingTop: 56, paddingBottom: 64 }}>
      <Container narrow>
        <div style={{ textAlign: 'left' }}>
          <Eyebrow>Case studies</Eyebrow>
          <h1 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(36px, 5.2vw, 60px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            Real teams. Real founders. Real results.
          </h1>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(17px, 1.8vw, 21px)',
            lineHeight: 1.55,
            color: '#3A322D',
            margin: '0 0 32px',
            maxWidth: 660,
            textWrap: 'pretty',
          }}>
            Seven founders, seven different businesses, one common thread: they stopped drowning in customer support and got their time back. The numbers (and the words from the people who lived it) are below.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <Button variant="primary" size="lg" href="#book">Book a Discovery Call</Button>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 13,
              color: '#6B5F56',
              lineHeight: 1.5,
            }}>
              30 minutes. No commitment. No credit card.
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

window.PageHero = PageHero;
