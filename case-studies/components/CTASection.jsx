function CTASection() {
  return (
    <Section bg="forest" padding="lg">
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 56,
          alignItems: 'center',
        }} className="cta-grid">
          <div>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(30px, 4vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 24px',
              color: '#F7F2EB',
              textWrap: 'balance',
            }}>
              Want to see if we can help you the same way?
            </h2>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 17,
              lineHeight: 1.6,
              color: '#F0D9A8',
              margin: 0,
              maxWidth: 580,
              textWrap: 'pretty',
            }}>
              If any of these stories sound like the situation you're in right now (drowning in tickets, watching CSAT slip, tired of in-house hiring or freelancer roulette), there's a simple next step. Talk to our founding team for 30 minutes. We'll figure out what you actually need, tell you honestly whether we're the right fit, and walk you through what working with xFusion looks like.
            </p>
          </div>
          <div className="cta-actions" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 14,
          }}>
            <Button variant="primary" size="lg" href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call</Button>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 13,
              color: '#F0D9A8',
              opacity: 0.85,
              maxWidth: 280,
              textAlign: 'right',
              lineHeight: 1.5,
            }}>
              30 minutes. No commitment. No credit card. You'll talk directly with our founding team.
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cta-actions { align-items: flex-start !important; }
          .cta-actions > div { text-align: left !important; }
        }
      `}</style>
    </Section>
  );
}

window.CTASection = CTASection;
