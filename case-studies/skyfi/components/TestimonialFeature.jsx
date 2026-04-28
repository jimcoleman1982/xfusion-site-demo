function TestimonialFeature({
  pullQuote,
  fullQuote,
  name,
  role,
  company,
  portraitLabel,
  portraitSrc,
}) {
  return (
    <Section bg="butter" padding="lg">
      <Container>
        <div className="tf-grid" style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 64,
          alignItems: 'flex-start',
          maxWidth: 1080,
          margin: '0 auto',
        }}>
          <div className="tf-portrait" style={{ position: 'sticky', top: 80 }}>
            <PortraitPlaceholder
              name={name}
              src={portraitSrc}
              label={portraitLabel}
              alt={`${name}, ${role} at ${company}`}
              ratio="4/5"
              tone="clay"
            />
          </div>

          <div>
            <Icon name="quote" size={36} color="#B8512C" fill="#B8512C" stroke={0} style={{ marginBottom: 20 }} />

            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(30px, 3.6vw, 44px)',
              lineHeight: 1.2,
              fontWeight: 400,
              letterSpacing: '-0.015em',
              color: '#1F1A17',
              margin: '0 0 32px',
              textWrap: 'balance',
            }}>
              &ldquo;{pullQuote}&rdquo;
            </div>

            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 17,
              lineHeight: 1.65,
              color: '#3A322D',
              margin: '0 0 32px',
              textWrap: 'pretty',
            }}>
              {fullQuote}
            </p>

            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#7a5a10',
              borderTop: '1px solid #E6C683',
              paddingTop: 20,
            }}>
              <span style={{ color: '#1F1A17' }}>{name}</span>
              <span style={{ margin: '0 10px', opacity: 0.5 }}>·</span>
              {role}
              <span style={{ margin: '0 10px', opacity: 0.5 }}>·</span>
              {company}
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .tf-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .tf-portrait { position: static !important; max-width: 240px; }
        }
      `}</style>
    </Section>
  );
}

window.TestimonialFeature = TestimonialFeature;
