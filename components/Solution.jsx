// Section 3: Solution — three pillars
function Solution() {
  const pillars = [
    {
      icon: 'users',
      tint: '#F2D9CB',
      iconColor: '#B8512C',
      title: 'Senior, AI-Augmented Agents',
      body: "Every agent we place is senior, not entry-level. They use AI tools to handle the easy stuff, which means they can do the work of several junior reps. That's the only reason $3,900/mo works. The people we place are that good.",
    },
    {
      icon: 'filter',
      tint: '#D7E0DC',
      iconColor: '#2C4A3E',
      title: 'The TraitX Framework',
      body: 'Thousands of people apply each month. Fewer than 100 get an interview. Less than 1% get placed. Every finalist is screened by a real person, with a Zoom recording you watch before you ever meet them. No ghost candidates. No mystery resumes.',
    },
    {
      icon: 'handshake',
      tint: '#F8EBC9',
      iconColor: '#7a5a10',
      title: 'Fully Managed, Not Just Placed',
      body: "Most agencies hire and disappear. We stay. Your account manager handles performance, training, payroll, and culture for you. You're not adding a remote worker to manage. You're adding work that gets done.",
    },
  ];

  return (
    <Section bg="paper-2" padding="lg" id="solution">
      <Container>
        <div style={{ maxWidth: 820, marginBottom: 64 }}>
          <Eyebrow>The solution</Eyebrow>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4.2vw, 52px)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            Senior support agents who use AI to do more. Fully managed by us.
          </h2>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 19,
            lineHeight: 1.55,
            color: '#3A322D',
            margin: 0,
            maxWidth: 720,
          }}>
            xFusion places senior support agents inside your business and manages them for you. Every agent has real support experience and is trained to use AI tools. So one xFusion agent can handle a lot more work than a junior rep at another agency. You get the work done. We handle the people side.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginBottom: 56,
        }} className="pillar-grid">
          {pillars.map((p, i) => <PillarCard key={i} index={i + 1} {...p} />)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Button variant="primary" size="lg" href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call</Button>
          <CTAMicrocopy />
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) { .pillar-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

function PillarCard({ icon, tint, iconColor, title, body, index }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#F7F2EB',
        border: '1px solid #D9CFBF',
        borderRadius: 12,
        padding: 32,
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? '0 2px 8px rgba(31,26,23,0.05), 0 1px 2px rgba(31,26,23,0.04)' : 'none',
        transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div style={{
        width: 52, height: 52,
        borderRadius: 12,
        background: tint,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
      }}>
        <Icon name={icon} size={24} color={iconColor} />
      </div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: '#6B5F56',
        marginBottom: 8,
        letterSpacing: '0.08em',
      }}>0{index}</div>
      <h3 style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: 24,
        fontWeight: 600,
        margin: '0 0 14px',
        color: '#1F1A17',
        lineHeight: 1.2,
        letterSpacing: '-0.015em',
      }}>{title}</h3>
      <p style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 15,
        lineHeight: 1.6,
        margin: 0,
        color: '#3A322D',
      }}>{body}</p>
    </article>
  );
}

window.Solution = Solution;
