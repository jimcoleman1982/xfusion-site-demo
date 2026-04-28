// Section 1: Hero
function Hero() {
  return (
    <section style={{ background: '#F7F2EB', padding: '64px 0 80px' }}>
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 72,
          alignItems: 'center',
        }} className="hero-grid">
          <div>
            <Eyebrow>Fully managed customer support staffing. Senior agents, AI-augmented.</Eyebrow>
            <h1 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              margin: '0 0 28px',
              color: '#1F1A17',
              textWrap: 'balance',
            }}>
              Stop being your own customer support team.
            </h1>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 19,
              lineHeight: 1.55,
              color: '#3A322D',
              margin: '0 0 36px',
              maxWidth: 580,
              textWrap: 'pretty',
            }}>
              We recruit, vet, train, place, and manage a senior customer support agent inside your business. They use AI to handle the volume of two junior reps, and we handle everything else (recruiting, payroll, culture, performance) so you don't have to.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg">Book a Discovery Call</Button>
            </div>
            <CTAMicrocopy>
              30 minutes. No pitch deck. We just figure out if your CS situation is a fit.
            </CTAMicrocopy>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src="images/xfusion-philippines-team.jpeg"
              alt="xFusion team building, Philippines office"
              style={{
                width: '100%',
                aspectRatio: '4/5',
                objectFit: 'cover',
                borderRadius: 12,
                border: '1px solid #D9CFBF',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: -28,
              left: -28,
              maxWidth: 240,
              padding: '18px 20px',
              background: '#F7F2EB',
              border: '1px solid #D9CFBF',
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(31,26,23,0.08)',
            }} className="hero-stat">
              <div style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 32,
                color: '#B8512C',
                lineHeight: 1,
                marginBottom: 8,
                fontWeight: 600,
              }}>
                100+
              </div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 13,
                lineHeight: 1.45,
                color: '#3A322D',
              }}>
                CS placements since 2020. Clients who treat our agents like family.
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Trust bar */}
      <Container style={{ marginTop: 96 }}>
        <div style={{
          paddingTop: 32,
          borderTop: '1px solid #D9CFBF',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#6B5F56',
            marginBottom: 18,
          }}>
            Trusted by support-driven teams at
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px 40px',
            alignItems: 'center',
          }}>
            {['Tolstoy', 'SavvyCal', 'Bonify', 'Ordered Magic', 'TheReceptionist', 'SkyFi', 'Revy'].map((name, i) => (
              <span key={name} style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: '#3A322D',
                opacity: 0.7,
              }}>{name}</span>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .hero-stat { left: 0 !important; bottom: -20px !important; }
        }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
