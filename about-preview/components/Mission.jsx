function Mission() {
  return (
    <Section bg="paper" padding="lg" style={{ paddingTop: 64, paddingBottom: 96 }}>
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 2.1fr',
          gap: 64,
          alignItems: 'start',
          paddingTop: 48,
          borderTop: '1px solid #D9CFBF',
        }} className="mission-grid">
          <div>
            <Eyebrow>01 / Mission</Eyebrow>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(30px, 3.2vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#1F1A17',
            }}>
              Our mission
            </h2>
          </div>
          <div>
            <p style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(22px, 2vw, 28px)',
              lineHeight: 1.4,
              color: '#1F1A17',
              fontWeight: 400,
              margin: 0,
              textWrap: 'pretty',
            }}>
              xFusion exists to find exceptional customer support talent, place them with businesses that will treat them like real team members, and help those relationships last for years instead of months. We pay a living wage, invest in culture, and manage the relationship on both sides so the work feels like a career, not a gig. <span style={{
                background: 'linear-gradient(180deg, transparent 60%, #F0D9A8 60%)',
                padding: '0 2px',
              }}>That's the whole game.</span>
            </p>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .mission-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </Section>
  );
}

window.Mission = Mission;
