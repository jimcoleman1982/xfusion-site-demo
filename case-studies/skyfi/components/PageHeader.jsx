function PageHeader({
  eyebrow = 'CASE STUDY · 10',
  title = 'SkyFi',
  subhead,
  portraitName = 'Claire Fundingsland',
  portraitSrc = '../../images/claire-fundingsland-skyfi.png',
  portraitLabel = 'CLAIRE FUNDINGSLAND',
}) {
  return (
    <Section bg="paper" padding="lg" style={{ paddingTop: 64, paddingBottom: 56 }}>
      <Container>
        <div style={{ marginBottom: 32 }}>
          <a href="#" style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13,
            color: '#6B5F56',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <Icon name="arrowLeft" size={14} stroke={1.75} /> All case studies
          </a>
        </div>

        <div className="ph-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#B8512C',
              marginBottom: 24,
            }}>{eyebrow}</div>

            <h1 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(64px, 9vw, 128px)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              margin: '0 0 28px',
              color: '#1F1A17',
            }}>{title}</h1>

            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 'clamp(20px, 2.1vw, 26px)',
              lineHeight: 1.4,
              fontWeight: 400,
              color: '#3A322D',
              maxWidth: 620,
              margin: 0,
              textWrap: 'pretty',
            }}>{subhead}</p>
          </div>

          <div className="ph-portrait" style={{ maxWidth: 360, justifySelf: 'end', width: '100%' }}>
            <PortraitPlaceholder
              name={portraitName}
              src={portraitSrc}
              label={portraitLabel}
              alt={`${portraitName}, Head of Customer Experience at SkyFi`}
              ratio="4/5"
              tone="butter"
              size="lg"
            />
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .ph-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ph-portrait { justify-self: start !important; max-width: 280px !important; }
        }
      `}</style>
    </Section>
  );
}

window.PageHeader = PageHeader;
