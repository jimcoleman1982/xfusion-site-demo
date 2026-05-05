// Section 4: How It Works — four numbered steps
function HowItWorks() {
  const steps = [
    {
      icon: 'calendar',
      title: '30-Minute Discovery Call',
      body: "We talk about what your support team looks like today, where it's breaking down, and what a good week would look like once it's fixed. If we're not the right fit, we'll tell you. If we are, we get to work.",
    },
    {
      icon: 'filter',
      title: 'Candidates in 14 days or less',
      body: 'We use our TraitX Framework to find people for your specific role. About two weeks later, you get a short list of senior candidates with blind resumes and Zoom interview videos. You watch the videos and pick who you want to meet.',
    },
    {
      icon: 'spark',
      title: 'Placement and Training',
      body: "We train your new agent on your support process and your AI tools. They learn your tools, your brand voice, and pass our certification before they touch a single customer ticket.",
    },
    {
      icon: 'handshake',
      title: 'They Start. We Manage.',
      body: "Your account manager handles their performance reviews, payroll, and culture. You work with the agent. We handle everything else. You get 30 days to decide if you love them. If you don't, you walk away owing nothing.",
    },
  ];

  return (
    <Section bg="paper" padding="lg" id="how" style={{ borderTop: '1px solid #D9CFBF' }}>
      <Container>
        <div style={{ maxWidth: 820, marginBottom: 64 }}>
          <Eyebrow>How it works</Eyebrow>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4.2vw, 52px)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            margin: '0 0 20px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            From "I need help" to "they just started" in about two weeks or less.
          </h2>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 19,
            lineHeight: 1.55,
            color: '#3A322D',
            margin: 0,
            maxWidth: 660,
          }}>
            Four steps. No deposit, no setup fee, and you don't pay a dollar until day 31.
          </p>
        </div>

        <ol className="step-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          listStyle: 'none',
          margin: '0 0 56px',
          padding: 0,
          counterReset: 'step',
        }}>
          {steps.map((s, i) => (
            <li key={i} style={{
              position: 'relative',
              padding: '32px 24px',
              background: '#F7F2EB',
              border: '1px solid #D9CFBF',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                paddingBottom: 14,
                borderBottom: '1px solid #D9CFBF',
              }}>
                <div style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: 38,
                  fontWeight: 600,
                  color: '#B8512C',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                }}>0{i + 1}</div>
                <Icon name={s.icon} size={22} color="#3A322D" />
              </div>
              <h3 style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 22,
                fontWeight: 600,
                margin: 0,
                color: '#1F1A17',
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
              }}>{s.title}</h3>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                margin: 0,
                color: '#3A322D',
              }}>{s.body}</p>
            </li>
          ))}
        </ol>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Button variant="primary" size="lg" href="https://savvycal.com/xfusion/lets-chat">Start With a Discovery Call</Button>
          <CTAMicrocopy />
        </div>
      </Container>
      <style>{`
        @media (max-width: 1100px) { .step-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .step-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

window.HowItWorks = HowItWorks;
