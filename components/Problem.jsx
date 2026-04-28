// Section 2: Problem — long-form text on Paper, ends with pullquote
function Problem() {
  return (
    <Section bg="paper" padding="lg" style={{ borderTop: '1px solid #D9CFBF' }}>
      <Container narrow>
        <Eyebrow>The problem</Eyebrow>
        <h2 style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 'clamp(34px, 4.4vw, 56px)',
          fontWeight: 600,
          lineHeight: 1.06,
          letterSpacing: '-0.02em',
          margin: '0 0 56px',
          color: '#1F1A17',
          textWrap: 'balance',
        }}>
          You didn't start a business to answer tickets at 9pm.
        </h2>

        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 19,
          lineHeight: 1.65,
          color: '#3A322D',
          maxWidth: 680,
        }}>
          <p style={{ margin: '0 0 24px', fontFamily: "'Source Serif 4', serif", fontSize: 24, lineHeight: 1.4, color: '#1F1A17' }}>
            But here you are.
          </p>
          <p style={{ margin: '0 0 24px' }}>
            Your CSAT is slipping. Response times are creeping past the point where customers stay quiet. Reviews mention "slow support" more than they used to. The one CS person you have is underwater and you can feel them about to break. So you keep stepping in. A ticket here, a refund request there, an angry email at midnight that could not wait.
          </p>
          <p style={{ margin: '0 0 24px' }}>
            You know what's coming if nothing changes. More tickets. More late nights. A team member quits without notice. A customer churns and tells three other customers why. The thing that used to make your business great (the way you took care of people) becomes the thing that's quietly killing it.
          </p>
          <p style={{ margin: '0 0 24px' }}>
            You've already tried the obvious fixes. Upwork was a parade of ghosts and scams. The last "agency" you used recruited someone, took their fee, and disappeared. The chatbot you piloted handled the easy stuff fine and then completely fell apart on the calls that actually mattered. Hiring a senior CS person in-house costs more than the role can justify, and you don't have time to manage one anyway.
          </p>
          <p style={{ margin: 0 }}>
            So the work keeps coming back to you. And you keep working in your business instead of on it.
          </p>
        </div>

        {/* Pullquote */}
        <figure style={{
          margin: '88px 0 0',
          padding: '40px 0 0',
          borderTop: '1px solid #D9CFBF',
          maxWidth: 760,
        }}>
          <blockquote style={{
            margin: 0,
            fontFamily: "'Source Serif 4', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(26px, 3.2vw, 38px)',
            fontWeight: 400,
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            "We were sort of in support hell, just kind of working in the business instead of on the business."
          </blockquote>
          <figcaption style={{
            marginTop: 24,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#6B5F56',
          }}>
            John Carbone, Bonify
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}

window.Problem = Problem;
