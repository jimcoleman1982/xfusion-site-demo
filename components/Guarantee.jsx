// Section 9: Guarantee
function Guarantee() {
  return (
    <Section bg="butter-strong" padding="lg">
      <Container narrow>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 40,
          alignItems: 'flex-start',
        }} className="guarantee-grid">
          <div style={{
            width: 120,
            height: 120,
            borderRadius: 999,
            background: '#F7F2EB',
            border: '1px solid #B7A993',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }} className="guarantee-badge">
            <Icon name="badge" size={56} color="#B8512C" stroke={1.5} />
          </div>
          <div>
            <Eyebrow color="#7a5a10">The guarantee</Eyebrow>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(34px, 4.4vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              margin: '0 0 28px',
              color: '#1F1A17',
              textWrap: 'balance',
            }}>
              30-Day Risk-Free Trial
            </h2>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 19,
              lineHeight: 1.65,
              color: '#1F1A17',
              maxWidth: 680,
            }}>
              <p style={{ margin: '0 0 20px' }}>
                We recruit, vet, and place a senior, AI-trained customer support agent in your business. You work with them for 30 full days. If you're not satisfied for any reason, you walk away without paying anything. Not a deposit. Not a setup fee. Nothing. We absorb every dollar of recruiting, vetting, training, and placement we invested. That's how confident we are.
              </p>
              <p style={{
                margin: 0,
                fontFamily: "'Source Serif 4', serif",
                fontSize: 22,
                fontStyle: 'italic',
                lineHeight: 1.45,
                color: '#1F1A17',
                paddingLeft: 20,
                borderLeft: '2px solid #B8512C',
              }}>
                You are the sole judge of satisfaction. There are no conditions and no fine print.
              </p>
            </div>
            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Button variant="primary" size="lg" href="https://savvycal.com/xfusion/lets-chat">Book My Free Discovery Call</Button>
              <CTAMicrocopy color="#3A322D" />
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 700px) {
          .guarantee-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .guarantee-badge { width: 88px !important; height: 88px !important; }
        }
      `}</style>
    </Section>
  );
}

window.Guarantee = Guarantee;
