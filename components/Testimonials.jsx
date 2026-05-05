// Section 6: Social Proof — testimonials grid
const TESTIMONIALS = [
  {
    name: 'John Carbone',
    role: 'Founder',
    company: 'Bonify',
    file: 'images/john-carbone-bonify.png',
    tone: 'clay',
    pull: "I forget they're technically not in-house. They truly are part of the Bonify team.",
    full: "Working with xFusion led to a monumental improvement in our customer experience. They found us the perfect reps with complete alignment to our mission, and they've handled the vast majority of our tickets while maintaining a 4.9 customer satisfaction score on Shopify since May 2020.",
  },
  {
    name: 'Derrick Reimer',
    role: 'Founder',
    company: 'SavvyCal',
    file: 'images/derrick-reimer-savvycal.png',
    tone: 'forest',
    pull: 'I was admittedly skeptical at first. They proved my skepticism unwarranted.',
    full: "As a founder busy building and marketing my product, I wanted a partner I could trust to train and manage dedicated reps as an extension of my team. This is not your stereotypical outsourced support agency. They've cut our average response time by 84.79% and freed me up to focus on running the business.",
  },
  {
    name: 'Toby Marsden',
    role: 'Founder',
    company: 'Ordered Magic',
    file: 'images/toby-marsden-ordered-magic.png',
    tone: 'butter',
    pull: 'I thought my life was going to become a living hell. It was extraordinary instead.',
    full: 'I was sure outsourcing would mean dropped tickets, the wrong tone, and an exploding workload. None of that happened. The xFusion team grew from one dedicated agent to two full-time and a part-time weekend agent, and the entire way I think about the future of my business has changed.',
  },
  {
    name: 'Dov Kaufmann',
    role: 'COO',
    company: 'Tolstoy',
    file: 'images/dov-kaufmann-tolstoy.png',
    tone: 'clay',
    pull: 'An absolute game-changer. We grow faster and more professionally than we ever could alone.',
    full: "Working with the xFusion team enabled us to scale customer support from a single agent to a six-person team handling Tier 1 and Tier 2 work. The partnership has been so valuable that our Shopify app ranking jumped 90 points after a wave of 5-star reviews tied to better support. I can't praise the team enough.",
  },
  {
    name: 'Claire Fundingsland',
    role: 'Head of Customer Experience',
    company: 'SkyFi',
    file: 'images/claire-fundingsland-skyfi.png',
    tone: 'forest',
    pull: 'They never leave a customer interaction unresolved.',
    full: "xFusion's emphasis on customer satisfaction has been such an asset. Their team is thorough and adapts and learns quickly, helping us maintain a 91.9% customer satisfaction score with an average response time of 36 minutes across a global, 24/7 customer base.",
  },
  {
    name: 'Tom Foster',
    role: 'Director of Sales',
    company: 'TheReceptionist',
    file: 'images/tom-foster-thereceptionist.png',
    tone: 'paper',
    pull: 'Attentive. Hire the best people. We see no reason to stop.',
    full: "When we first met with Jim and David, we were immediately struck by their values and commitment to their employees, which meshed with ours completely. Over years of working together they've helped us hit a 98.9% CSAT rating, and we've expanded the partnership several times. If you're looking for an outsourced solution, I highly recommend the team at xFusion.",
  },
];

function Testimonials() {
  return (
    <Section bg="butter" padding="lg">
      <Container>
        <div style={{ maxWidth: 880, marginBottom: 56 }}>
          <Eyebrow color="#7a5a10">Social proof</Eyebrow>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4.2vw, 52px)',
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            Six years. 100+ support placements. Clients who treat our agents like family.
          </h2>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 19,
            lineHeight: 1.55,
            color: '#3A322D',
            margin: 0,
            maxWidth: 720,
          }}>
            We've been doing this since 2020 for software companies, online stores, B2B brands, consumer brands, and local service businesses. The same thing comes up in every relationship: clients tell us they forget our agents aren't in-house. That's the bar.
          </p>
        </div>

        <div className="t-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginBottom: 56,
        }}>
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} style={{
              background: '#F7F2EB',
              border: '1px solid #D9CFBF',
              borderRadius: 12,
              padding: 32,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}>
              <PhotoCircle name={t.name} tone={t.tone} size={72} file={t.file} alt={`${t.name}, ${t.role} at ${t.company}`} />
              <blockquote style={{
                margin: 0,
                fontFamily: "'Source Serif 4', serif",
                fontStyle: 'italic',
                fontSize: 20,
                lineHeight: 1.3,
                color: '#1F1A17',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                textWrap: 'pretty',
              }}>
                "{t.pull}"
              </blockquote>
              <p style={{
                margin: 0,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                color: '#3A322D',
              }}>
                {t.full}
              </p>
              <figcaption style={{
                marginTop: 'auto',
                paddingTop: 18,
                borderTop: '1px solid #D9CFBF',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#6B5F56',
              }}>
                {t.name} · {t.role} · {t.company}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Logo bar */}
        <div style={{
          paddingTop: 32,
          borderTop: '1px solid rgba(31,26,23,0.12)',
          marginBottom: 48,
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 32px',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {['Tolstoy', 'SavvyCal', 'Bonify', 'Ordered Magic', 'TheReceptionist', 'SkyFi', 'Revy'].map(name => (
              <span key={name} style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 20,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: '#3A322D',
                opacity: 0.7,
              }}>{name}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button variant="primary" size="lg" href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call</Button>
          <CTAMicrocopy />
        </div>
      </Container>
      <style>{`
        @media (max-width: 1100px) { .t-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 700px) { .t-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

window.Testimonials = Testimonials;
