// Section 8: Why Not Just a Chatbot — dark Forest section for visual contrast
function Chatbot() {
  return (
    <Section bg="forest" padding="lg">
      <Container narrow>
        <Eyebrow color="#F0D9A8">AI alone is not enough</Eyebrow>
        <h2 style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 'clamp(32px, 4.2vw, 52px)',
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          margin: '0 0 48px',
          color: '#F7F2EB',
          textWrap: 'balance',
        }}>
          AI alone breaks on the calls that matter most.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 24,
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 19,
          lineHeight: 1.65,
          color: '#F7F2EB',
          maxWidth: 720,
        }}>
          <p style={{ margin: 0, color: '#F7F2EB' }}>
            <span style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 64,
              fontWeight: 600,
              color: '#B8512C',
              float: 'left',
              lineHeight: 0.9,
              marginRight: 16,
              marginTop: 4,
              letterSpacing: '-0.025em',
            }}>60%</span>
            Pure AI handles the easy 60% of customer support reasonably well. Password resets, status checks, simple how-tos. That's real value, and we use AI tools too.
          </p>
          <p style={{ margin: 0, paddingTop: 16, borderTop: '1px solid rgba(247,242,235,0.18)', color: '#F7F2EB' }}>
            <span style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 64,
              fontWeight: 600,
              color: '#B8512C',
              float: 'left',
              lineHeight: 0.9,
              marginRight: 16,
              marginTop: 4,
              letterSpacing: '-0.025em',
            }}>40%</span>
            The hard 40% is where chatbot-only solutions fall apart. The angry customer who needs to feel heard before they'll listen to a fix. The edge case the bot has never seen. The judgment call that requires reading between the lines of a long, frustrated email. The customer who would have churned but didn't because someone took the time to make it right.
          </p>
          <p style={{ margin: 0, paddingTop: 24, borderTop: '1px solid rgba(247,242,235,0.18)', color: '#F7F2EB', fontSize: 21 }}>
            That's where humans matter. And that's where xFusion sits. Our senior agents use AI as leverage, not replacement. The AI handles repetitive volume. The human handles the moments that decide whether a customer becomes a fan or a refund.
          </p>
        </div>
      </Container>
    </Section>
  );
}

window.Chatbot = Chatbot;
