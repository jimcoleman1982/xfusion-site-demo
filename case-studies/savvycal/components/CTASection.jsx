// Section 11: Forest-green CTA band. Same pattern as homepage / about / case studies index.
function CTASection() {
  return (
    <Section bg="forest" padding="lg" style={{ paddingTop: 112, paddingBottom: 112 }}>
      <Container>
        <div className="cta-grid" style={{
          maxWidth: 1040,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: 56,
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#F0D9A8',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#F0D9A8', opacity: 0.7 }}/>
              Ready when you are
            </div>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(34px, 4.4vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 24px',
              color: '#F7F2EB',
              textWrap: 'balance',
            }}>
              Want to see if we can help you too?
            </h2>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 17,
              lineHeight: 1.6,
              color: '#F0D9A8',
              opacity: 0.95,
              margin: 0,
              maxWidth: 560,
              textWrap: 'pretty',
            }}>
              If your customer support is starting to slip, or you are about to lose the one person holding it together, we can help. We will recruit, vet, place, train, and manage a senior, AI-augmented CS agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free.
            </p>
          </div>
          <div className="cta-side" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 20,
          }}>
            <Button variant="primary" size="lg" style={{
              fontSize: 16, padding: '16px 28px',
              boxShadow: '0 2px 0 rgba(0,0,0,0.15)',
            }} href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call
            </Button>
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
        @media (max-width: 880px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </Section>
  );
}

window.CTASection = CTASection;
