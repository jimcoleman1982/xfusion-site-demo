// Section 7: Case Study Spotlights
function CaseStudies() {
  const cards = [
    {
      client: 'Tolstoy',
      slug: 'case-studies/tolstoy/',
      person: 'Dov Kaufmann',
      tone: 'clay',
      file: 'images/dov-kaufmann-tolstoy.png',
      role: 'COO of Tolstoy',
      headline: 'Rose 90 spots in Shopify rankings. Grew faster and more professionally than they could have alone.',
      body: 'Tolstoy was growing fast and needed support that could keep up. Our team learned their tools, took over tickets and reviews, and freed up their leaders to focus on building the product.',
    },
    {
      client: 'SavvyCal',
      slug: 'case-studies/savvycal/',
      person: 'Derrick Reimer',
      tone: 'forest',
      file: 'images/derrick-reimer-savvycal.png',
      role: 'Founder of SavvyCal',
      headline: 'A doubter changes his mind. "This is not your stereotypical outsourced support agency."',
      body: "Derrick Reimer didn't believe in outsourcing. Our senior agents earned his trust by handling SavvyCal's tricky product support with the same brand voice and judgment as an in-house team.",
    },
    {
      client: 'Bonify',
      slug: 'case-studies/bonify/',
      person: 'John Carbone',
      tone: 'butter',
      file: 'images/john-carbone-bonify.png',
      role: 'Founder of Bonify',
      headline: 'Out of "support hell" and back to working ON the business.',
      body: 'John Carbone was buried in tickets and stuck working in his business instead of on it. Our placement absorbed the day-to-day support load and gave him his time back almost immediately.',
    },
  ];

  return (
    <Section bg="paper" padding="lg" id="case-studies" style={{ borderTop: '1px solid #D9CFBF' }}>
      <Container>
        <div style={{ maxWidth: 820, marginBottom: 56 }}>
          <Eyebrow>Case studies</Eyebrow>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4.2vw, 52px)',
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            margin: '0 0 20px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            What this looks like in practice.
          </h2>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 19,
            lineHeight: 1.55,
            color: '#3A322D',
            margin: 0,
          }}>
            Three quick snapshots. The full case studies have the metrics, the timelines, and the client quotes.
          </p>
        </div>

        <div className="cs-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginBottom: 40,
        }}>
          {cards.map((c, i) => <CaseCard key={i} {...c} />)}
        </div>

        <div>
          <a href="case-studies/" style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            color: '#B8512C',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}>
            See all case studies
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </Container>
      <style>{`
        @media (max-width: 1000px) { .cs-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

function CaseCard({ client, slug, person, tone, file, role, headline, body }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#F7F2EB',
        border: '1px solid #D9CFBF',
        borderRadius: 12,
        overflow: 'hidden',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? '0 2px 8px rgba(31,26,23,0.05)' : 'none',
        transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div style={{ padding: '24px 24px 0' }}>
        <PhotoPlaceholder name={person} label={client} tone={tone} ratio="3/2" file={file} alt={role ? `${person}, ${role}` : person} />
      </div>
      <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#6B5F56',
        }}>{client}</div>
        <h3 style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 22,
          fontWeight: 600,
          margin: 0,
          color: '#1F1A17',
          lineHeight: 1.2,
          letterSpacing: '-0.015em',
          textWrap: 'balance',
        }}>{headline}</h3>
        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 15,
          lineHeight: 1.6,
          margin: 0,
          color: '#3A322D',
        }}>{body}</p>
        <a href={slug} style={{
          marginTop: 'auto',
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: '#B8512C',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}>
          Read the case study
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </article>
  );
}

window.CaseStudies = CaseStudies;
