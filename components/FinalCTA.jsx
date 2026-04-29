// Section 11: Final CTA — forest band
function FinalCTA() {
  return (
    <Section bg="forest" padding="lg">
      <Container narrow>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <Eyebrow color="#F0D9A8">One last thing</Eyebrow>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            margin: '0 0 32px',
            color: '#F7F2EB',
            textWrap: 'balance',
          }}>
            You've read this far for a reason.
          </h2>
          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 19,
            lineHeight: 1.65,
            color: '#F7F2EB',
            margin: '0 auto 40px',
            textWrap: 'pretty',
            textAlign: 'left',
          }}>
            <p style={{ margin: '0 0 20px', color: '#F7F2EB' }}>
              Something about your customer support situation is not okay right now. Maybe it's the late-night tickets, or the CSAT score you don't want to look at, or the team member you can feel slipping toward burnout. Or maybe it's just the quiet awareness that you're spending your best hours on the wrong work.
            </p>
            <p style={{ margin: '0 0 20px', color: '#F7F2EB' }}>
              A 30-minute Discovery Call is the lowest-stakes next step you can take. No pitch deck. No pressure. We talk about what's actually broken, whether we're a fit, and what a senior, AI-augmented agent could look like in your business. If we're not the right answer, we'll tell you and point you somewhere better.
            </p>
            <p style={{ margin: 0, color: '#F7F2EB' }}>
              If we are the right answer, you've got a 30-Day Risk-Free Trial waiting on the other side of it. You don't pay until you're sure.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button variant="on-dark" size="lg" href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call</Button>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 13,
              lineHeight: 1.5,
              color: '#F7F2EB',
              opacity: 0.85,
              marginTop: 14,
            }}>
              30 minutes. No commitment. No credit card. Just a conversation.
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

window.FinalCTA = FinalCTA;
