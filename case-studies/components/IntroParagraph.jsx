function IntroParagraph() {
  return (
    <Section bg="paper" padding="md" style={{ paddingTop: 24, paddingBottom: 80 }}>
      <Container narrow>
        <div style={{
          borderTop: '1px solid #D9CFBF',
          paddingTop: 40,
        }}>
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(20px, 2.1vw, 24px)',
            lineHeight: 1.5,
            color: '#1F1A17',
            margin: '0 0 24px',
            fontWeight: 400,
            textWrap: 'pretty',
          }}>
            These are stories from founders we work with across SaaS, e-commerce, B2B, and consumer brands. Different products, different customers, same outcome: a senior support team member becomes part of the team, response times drop, CSAT climbs, and the founder stops being the back-up CS rep.
          </p>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 16,
            lineHeight: 1.65,
            color: '#3A322D',
            margin: 0,
            textWrap: 'pretty',
          }}>
            The work shown in these case studies came from xFusion's original managed customer support model, which is exactly what we do today: recruit, vet, place, train, and manage senior, AI-augmented CS agents on behalf of our clients.
          </p>
        </div>
      </Container>
    </Section>
  );
}

window.IntroParagraph = IntroParagraph;
