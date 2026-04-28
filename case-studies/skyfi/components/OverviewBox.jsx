function OverviewBox({ rows = [] }) {
  return (
    <Section bg="paper" padding="sm" style={{ padding: '24px 0 64px' }}>
      <Container>
        <div style={{
          background: '#FBF1D9',
          border: '1px solid #E6C683',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '20px 32px',
            borderBottom: '1px solid #E6C683',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#7a5a10',
            }}>Overview</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#7a5a10',
              opacity: 0.7,
            }}>FY-26 / xFusion × SkyFi</div>
          </div>
          <dl className="ov-table" style={{ margin: 0 }}>
            {rows.map((r, i) => (
              <div key={r.label} style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: 32,
                padding: '20px 32px',
                borderBottom: i < rows.length - 1 ? '1px solid #E6C683' : 'none',
                alignItems: 'baseline',
              }} className="ov-row">
                <dt style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#7a5a10',
                  margin: 0,
                }}>{r.label}</dt>
                <dd style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: '#1F1A17',
                  margin: 0,
                  textWrap: 'pretty',
                }}>{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
      <style>{`
        @media (max-width: 720px) {
          .ov-row { grid-template-columns: 1fr !important; gap: 6px !important; padding: 18px 22px !important; }
        }
      `}</style>
    </Section>
  );
}

window.OverviewBox = OverviewBox;
