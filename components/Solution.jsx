// Section 3: Solution — three pillars
function Solution() {
  const pillars = [
    {
      icon: 'users',
      tint: '#F2D9CB',
      iconColor: '#B8512C',
      title: 'Senior, AI-Augmented Agents',
      body: "Every placement is a senior CS agent, not an entry-level hire. They're trained to oversee AI agents on the front line, which means they handle volume a junior rep simply can't. The math at $3,900/mo only works because the talent we place is operating at this level.",
    },
    {
      icon: 'filter',
      tint: '#D7E0DC',
      iconColor: '#2C4A3E',
      title: 'The TraitX Framework',
      body: 'Thousands of monthly applications. Fewer than 100 interviews. Top less than 1% placed. Every candidate is vetted with human-led interviews and Zoom recordings you watch before you ever meet them. No ghost candidates. No mystery resumes.',
    },
    {
      icon: 'handshake',
      tint: '#F8EBC9',
      iconColor: '#7a5a10',
      title: 'Fully Managed, Not Just Placed',
      body: "Most agencies recruit and disappear. We stay. A dedicated account manager runs performance management, training, payroll, culture, and engagement on your behalf. You're not adding a remote hire to manage. You're adding output.",
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
            A senior CS agent who runs on AI leverage. Fully managed by us.
          </h2>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 19,
            lineHeight: 1.55,
            color: '#3A322D',
            margin: 0,
            maxWidth: 720,
          }}>
            xFusion places senior customer support agents inside your business and manages them on your behalf. Every agent has real CS experience and is trained in AI-augmented support workflows, so one xFusion seat handles meaningfully more volume than a junior rep elsewhere. You get the output. We carry the management.
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
