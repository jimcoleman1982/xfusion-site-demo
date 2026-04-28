function Origin() {
  const paraStyle = {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 18,
    lineHeight: 1.65,
    color: '#1F1A17',
    margin: '0 0 24px',
    textWrap: 'pretty',
  };

  return (
    <Section bg="paper-2" padding="lg" id="story">
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 2.1fr',
          gap: 64,
          alignItems: 'start',
        }} className="origin-grid">
          <div style={{ position: 'sticky', top: 96 }} className="origin-side">
            <Eyebrow>02 / Origin</Eyebrow>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(30px, 3.2vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 16px',
              color: '#1F1A17',
            }}>
              Why we built xFusion
            </h2>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.55,
              color: '#6B5F56',
              margin: 0,
              maxWidth: 280,
            }}>
              A short history of how the international staffing model broke, and what we built instead.
            </p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <p style={paraStyle}>
              In 2020, Jim and David started looking hard at the international staffing industry, and most of what they saw was broken.
            </p>
            <p style={paraStyle}>
              Workers were getting paid so poorly they had no reason to stay. Three months in, six months in, they'd quit for another seat that paid a few dollars more. Clients would absorb the loss, hire again, retrain again, and watch the cycle repeat. The whole model was built on churn, with the agency taking its cut every time someone got replaced.
            </p>
            <p style={paraStyle}>
              The question Jim and David kept asking each other was simple. What if you actually treated overseas talent like the skilled professionals they are? Pay them well. Give them a real career path. Build a culture they want to stick around for. Manage the relationship the same way a great in-house manager would. Would the math still work for clients?
            </p>
            <p style={{
              ...paraStyle,
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(24px, 2.4vw, 32px)',
              lineHeight: 1.25,
              fontWeight: 400,
              margin: '40px 0',
              color: '#1F1A17',
            }}>
              It did. <span style={{ color: '#B8512C' }}>It worked better.</span>
            </p>
            <p style={paraStyle}>
              We started with a handful of clients, paid our team members a meaningful living wage, invested in culture and team-building, and built a vetting framework (we call it <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, background: '#F8EBC9', padding: '1px 6px', borderRadius: 4 }}>TraitX</span>) that moves thousands of monthly applicants down to fewer than 100 interviews and the top under 1 percent into placement.
            </p>
            <p style={paraStyle}>
              Six years later, we have about 80 team members across the Philippines, Kenya, and the United States. Our clients keep their xFusion team members for years. Our team members build careers, buy homes, and send kids to school. The retention numbers tell the story we set out to write.
            </p>
            <div style={{
              marginTop: 48,
              padding: '32px 36px',
              background: '#F0D9A8',
              borderRadius: 12,
              borderLeft: '4px solid #B8512C',
            }}>
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 'clamp(22px, 2.2vw, 28px)',
                lineHeight: 1.3,
                fontWeight: 400,
                color: '#1F1A17',
                margin: 0,
                textWrap: 'pretty',
              }}>
                We're not the cheapest option, and we don't try to be. We're the option that actually keeps the people you place.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .origin-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .origin-side { position: static !important; }
        }
      `}</style>
    </Section>
  );
}

window.Origin = Origin;
