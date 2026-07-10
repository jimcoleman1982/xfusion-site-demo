// Homepage audience router: the same five ICP solutions from the nav
// (window.XF_SOLUTIONS, defined once in Nav.jsx), full-size. Routes each
// visitor type to its message-matched landing page.
function WhoWeHelp() {
  const solutions = window.XF_SOLUTIONS || [];

  return (
    <Section bg="paper" padding="lg" id="who-we-help" style={{ borderTop: '1px solid #D9CFBF' }}>
      <Container>
        <div style={{ maxWidth: 640, marginBottom: 44 }}>
          <Eyebrow>Who we help</Eyebrow>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4.2vw, 52px)',
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            Support that speaks your customers' language.
          </h2>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 18,
            lineHeight: 1.55,
            color: '#3A322D',
            margin: 0,
          }}>
            The problems differ by business. The fix is the same: a senior,
            AI-trained agent who learns yours. Pick your world.
          </p>
        </div>

        <div className="wwh-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {solutions.map((s) => (
            <a key={s.href} href={s.href} className="wwh-card" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              background: '#EFE8DD',
              border: '1px solid #D9CFBF',
              borderRadius: 12,
              padding: '24px 22px',
              textDecoration: 'none',
              color: '#1F1A17',
              transition: 'border-color 160ms cubic-bezier(0.4,0,0.6,1), box-shadow 160ms cubic-bezier(0.4,0,0.6,1)',
            }}>
              <span style={{
                width: 40, height: 40, borderRadius: 8, background: '#F7F2EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8512C"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              </span>
              <span>
                <span style={{
                  display: 'block',
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: 20,
                  fontWeight: 600,
                  lineHeight: 1.25,
                  marginBottom: 6,
                }}>{s.label}</span>
                <span style={{
                  display: 'block',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: '#6B5F56',
                }}>{s.desc}</span>
              </span>
              <span style={{
                marginTop: 'auto',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: '#B8512C',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}>
                See how it works
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </span>
            </a>
          ))}

          {/* Escape hatch card for visitors who don't see themselves */}
          <a href="/book/" className="wwh-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 8,
            background: '#2C4A3E',
            border: '1px solid #2C4A3E',
            borderRadius: 12,
            padding: '24px 22px',
            textDecoration: 'none',
          }}>
            <span style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.25,
              color: '#F7F2EB',
            }}>Something else?</span>
            <span style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.5,
              color: '#F0D9A8',
            }}>Tell us what your queue looks like, and we'll be honest about whether we can help.</span>
            <span style={{
              marginTop: 6,
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#F7F2EB',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}>
              Book a Discovery Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </span>
          </a>
        </div>
      </Container>

      <style>{`
        .wwh-card:hover { border-color: #B8512C !important; box-shadow: 0 4px 16px rgba(31,26,23,0.06); }
        @media (max-width: 980px) { .wwh-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .wwh-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

window.WhoWeHelp = WhoWeHelp;
