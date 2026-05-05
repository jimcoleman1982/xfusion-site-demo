// Hero / page header for the SavvyCal case study.
function PageHeader() {
  return (
    <Section bg="paper" padding="lg" style={{ paddingTop: 64, paddingBottom: 56 }}>
      <Container>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          {/* Crumbtrail */}
          <div style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 12,
            color: '#6B5F56',
            marginBottom: 32,
            letterSpacing: '0.04em',
          }}>
            <a href="#case-studies" style={{
              color: '#6B5F56', textDecoration: 'none',
              borderBottom: '1px solid #D9CFBF',
            }}>Case studies</a>
            <span style={{ margin: '0 10px', opacity: 0.6 }}>/</span>
            <span style={{ color: '#1F1A17' }}>SavvyCal</span>
          </div>

          {/* Eyebrow */}
          <div style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#B8512C',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <span>Case Study</span>
            <span style={{ color: '#D9CFBF' }}>·</span>
            <span style={{ color: '#6B5F56' }}>06</span>
          </div>

          {/* Client name */}
          <h1 className="cs-title" style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(56px, 9vw, 112px)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            margin: '0 0 28px',
            color: '#1F1A17',
          }}>SavvyCal</h1>

          {/* Subhead */}
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(20px, 2.2vw, 26px)',
            lineHeight: 1.4,
            color: '#3A322D',
            margin: '0 0 48px',
            maxWidth: 760,
            textWrap: 'balance',
            fontWeight: 400,
          }}>
            How SavvyCal cut average customer support reply time by 84.79% and gave its founder his mornings back.
          </p>

          {/* Lead photo + tag line */}
          <div className="hero-photo-row" style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: 32,
            alignItems: 'end',
            paddingTop: 16,
          }}>
            <DerrickPhoto size="medium" />
            <div style={{
              borderLeft: '1px solid #D9CFBF',
              paddingLeft: 24,
              paddingBottom: 8,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#6B5F56',
                marginBottom: 10,
              }}>Featured</div>
              <div style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 22,
                lineHeight: 1.25,
                color: '#1F1A17',
                marginBottom: 6,
                fontWeight: 500,
              }}>Derrick Reimer</div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                color: '#6B5F56',
              }}>Founder, SavvyCal</div>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 720px) {
          .hero-photo-row { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </Section>
  );
}

window.PageHeader = PageHeader;
