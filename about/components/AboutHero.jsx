function AboutHero() {
  return (
    <Section bg="paper" padding="lg" style={{ paddingTop: 96, paddingBottom: 64 }}>
      <Container narrow>
        <div style={{ textAlign: 'left', maxWidth: 880, margin: '0 auto' }}>
          <Eyebrow>About xFusion</Eyebrow>
          <h1 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(40px, 5.6vw, 76px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            margin: '0 0 28px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            We started xFusion because we hated what staffing agencies do to people.
          </h1>
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(20px, 2.1vw, 26px)',
            lineHeight: 1.45,
            color: '#3A322D',
            fontWeight: 400,
            margin: '0 0 36px',
            maxWidth: 760,
            textWrap: 'pretty',
          }}>
            Six years later, we're about 70 people on three continents who've built real support careers, with clients who actually invest in them.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" href="https://savvycal.com/xfusion/lets-chat">Book a discovery call</Button>
            <a href="#story" onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('story');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', '#story');
              }
            }} style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 15,
              color: '#3A322D',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '14px 12px',
              cursor: 'pointer',
            }}>
              Read the story <Icon name="arrow" size={14} />
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

window.AboutHero = AboutHero;
