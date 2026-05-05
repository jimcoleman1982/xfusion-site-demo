// Section 1: Hero
function Hero() {
  const [flipped, setFlipped] = React.useState(false);
  const handleToggle = () => setFlipped(f => !f);
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };
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
            <Eyebrow>Fully managed customer support. Senior agents, powered by AI.</Eyebrow>
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
              We find, train, and place senior support agents inside your business. They use AI to handle the work of several junior reps. We take care of the rest: recruiting, payroll, culture, and performance. So you don't have to.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call</Button>
            </div>
            <CTAMicrocopy>
              30 minutes. No pitch deck. We just figure out if we're a good fit for your team.
            </CTAMicrocopy>
          </div>
          <div style={{ position: 'relative' }}>
            <div
              className={`hero-photo-stack${flipped ? ' flipped' : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={flipped}
              aria-label="xFusion team across the Philippines and Kenya, tap to toggle silly portrait"
              onClick={handleToggle}
              onKeyDown={handleKey}
            >
              <img
                src="images/xfusion-team-montage.png"
                alt="xFusion team across the Philippines and Kenya"
                className="hero-photo-default"
              />
              <img
                src="images/silly/xfusion-team-montage-silly.png"
                alt=""
                className="hero-photo-silly"
                aria-hidden="true"
              />
            </div>
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
                support placements since 2020. Clients who treat our agents like family.
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
            textAlign: 'center',
          }}>
            Trusted by support-driven teams at
          </div>
          <div className="logo-bar" style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '16px 22px',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {['Tolstoy', 'SavvyCal', 'Bonify', 'Ordered Magic', 'TheReceptionist', 'SkyFi', 'Revy', 'CrowdCow', 'Arbio', 'NextMune'].map((name) => (
              <span key={name} style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: '#3A322D',
                opacity: 0.7,
                whiteSpace: 'nowrap',
              }}>{name}</span>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .hero-stat { left: 0 !important; bottom: -20px !important; }
          .logo-bar { flex-wrap: wrap !important; gap: 14px 24px !important; }
        }

        /* Hero hover flip: stack two images, fade between them on hover (desktop)
           or on tap toggle (mobile, via the .flipped class). */
        .hero-photo-stack {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #D9CFBF;
          cursor: pointer;
          display: block;
        }
        .hero-photo-stack img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 220ms cubic-bezier(0.4,0,0.6,1);
        }
        .hero-photo-default { opacity: 1; }
        .hero-photo-silly   { opacity: 0; }
        @media (hover: hover) {
          .hero-photo-stack:hover .hero-photo-default { opacity: 0; }
          .hero-photo-stack:hover .hero-photo-silly   { opacity: 1; }
        }
        .hero-photo-stack.flipped .hero-photo-default { opacity: 0; }
        .hero-photo-stack.flipped .hero-photo-silly   { opacity: 1; }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
