// Section 1: Hero
// Stage 1 of the booking funnel: email capture → qualification modal (LeadModal)
// → /book. A "book a call directly" escape hatch skips straight to /book.
function Hero() {
  const [flipped, setFlipped] = React.useState(false);
  // The hover/tap "silly" variant is off the critical path: load it only
  // after the page has finished loading so it never competes with the LCP.
  const [sillySrc, setSillySrc] = React.useState(null);
  React.useEffect(() => {
    const load = () => setSillySrc('images/silly/xfusion-team-montage-silly.webp');
    if (document.readyState === 'complete') { load(); return; }
    window.addEventListener('load', load, { once: true });
    return () => window.removeEventListener('load', load);
  }, []);
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const capturedRef = React.useRef(false);
  const handleToggle = () => setFlipped(f => !f);
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    // Strict enough to reject "xyz @ abc . com": no spaces anywhere,
    // one @, and a dot-separated TLD of 2+ letters.
    const valid = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value);
    if (!valid) {
      setEmailError('Please enter a valid work email, like you@company.com.');
      return;
    }
    setEmailError('');
    const normalized = value.toLowerCase();
    if (window.xfAttribution) {
      window.xfAttribution.hashEmail(normalized).then((hash) => {
        window.xfAttribution.saveLead({ email: normalized, email_hash: hash || '' });
        if (!capturedRef.current) {
          capturedRef.current = true;
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'email_capture', email_hash: hash || undefined });
        }
        setModalOpen(true);
      });
    } else {
      setModalOpen(true);
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
            <form onSubmit={handleEmailSubmit} noValidate className="hero-capture"
              style={{ display: 'flex', gap: 12, alignItems: 'stretch', flexWrap: 'wrap', maxWidth: 520 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Work email"
                autoComplete="email"
                style={{
                  flex: '1 1 240px',
                  boxSizing: 'border-box',
                  padding: '14px 18px',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 16,
                  color: '#1F1A17',
                  background: '#FFFFFF',
                  border: emailError ? '1px solid #A8341E' : '1px solid #B7A993',
                  borderRadius: 8,
                  outline: 'none',
                }}
              />
              <Button variant="primary" size="lg" as="button">Get started</Button>
            </form>
            {emailError ? (
              <div role="alert" style={{
                fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13,
                color: '#A8341E', marginTop: 10,
              }}>{emailError}</div>
            ) : null}
            <CTAMicrocopy>
              30 minutes. No pitch deck. We just figure out if we're a good fit for your team.{' '}
              <a href="/book/" style={{ color: '#B8512C', fontWeight: 500 }}>Or book a call directly →</a>
            </CTAMicrocopy>
            <LeadModal open={modalOpen} email={(window.xfAttribution ? window.xfAttribution.getLead().email : '') || email.trim().toLowerCase()} onClose={() => setModalOpen(false)} />
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
              <picture>
                <source type="image/webp" srcSet="images/xfusion-team-montage.webp" />
                <img
                  src="images/xfusion-team-montage.jpg"
                  alt="xFusion team across the Philippines and Kenya"
                  width="1144"
                  height="1144"
                  className="hero-photo-default"
                />
              </picture>
              {sillySrc ? (
                <img
                  src={sillySrc}
                  alt=""
                  width="1144"
                  height="1144"
                  className="hero-photo-silly"
                  aria-hidden="true"
                />
              ) : null}
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
          <div className="logo-marquee" aria-label="Client names">
            <div className="logo-marquee-track">
              {[0, 1].map((copy) => (
                <div className="logo-marquee-group" key={copy} aria-hidden={copy === 1}>
                  {['Tolstoy', 'SavvyCal', 'Bonify', 'Ordered Magic', 'TheReceptionist', 'SkyFi',
                    'Revy Apps', 'Crowd Cow', 'Arbio', 'Nextmune', 'Aheadworks', 'Joli Apps',
                    'Sign In Solutions', 'Kioskbuddy', 'Common Services', 'Finger Ink',
                    'Lovely Apps', 'Aligned', 'Autism Products'].map((name) => (
                    <span key={name} style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontSize: 26,
                      fontWeight: 500,
                      letterSpacing: '-0.01em',
                      color: '#3A322D',
                      opacity: 0.7,
                      whiteSpace: 'nowrap',
                    }}>{name}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .hero-stat { left: 0 !important; bottom: -20px !important; }
        }

        /* Trust bar marquee: two identical groups slide left; when the first
           has fully passed, the loop restarts invisibly. Edges fade out. */
        .logo-marquee {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .logo-marquee-track {
          display: flex;
          width: max-content;
          animation: logo-marquee-scroll 64s linear infinite;
        }
        .logo-marquee:hover .logo-marquee-track { animation-play-state: paused; }
        .logo-marquee-group {
          display: flex;
          align-items: center;
          gap: 56px;
          padding-right: 56px;
        }
        @keyframes logo-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; }
          .logo-marquee-group { flex-wrap: wrap; justify-content: center; gap: 14px 24px; padding-right: 0; }
          .logo-marquee-group[aria-hidden="true"] { display: none; }
          .logo-marquee { -webkit-mask-image: none; mask-image: none; }
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
