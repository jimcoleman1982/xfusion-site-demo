// Section 2: Overview Box. Editorial 5-row table with hairline rules.
function OverviewBox() {
  const rows = [
    {
      label: 'Industry',
      detail: 'SaaS, Scheduling software',
    },
    {
      label: 'Country',
      detail: 'United States',
    },
    {
      label: 'Challenge',
      detail: "Founder's deep work was being eaten by the support inbox, with volume set to climb as new features shipped.",
    },
    {
      label: 'Solution',
      detail: 'A senior xFusion customer support agent placed full-time as an extension of the SavvyCal team.',
    },
    {
      label: 'Results',
      detail: '84.79% reduction in average reply time, higher customer satisfaction, no abandoned tickets, and the founder back to building the product.',
    },
  ];

  return (
    <Section bg="paper" padding="md" style={{ paddingTop: 0, paddingBottom: 88 }}>
      <Container>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{
            background: '#F8EBC9',
            border: '1px solid #E6C683',
            borderRadius: 12,
            padding: 0,
            overflow: 'hidden',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#7a5a10',
              padding: '20px 28px 16px',
              borderBottom: '1px solid rgba(184, 81, 44, 0.18)',
            }}>
              Overview
            </div>
            <dl style={{ margin: 0, padding: 0 }}>
              {rows.map((r, i) => (
                <div key={r.label} className="ov-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: 24,
                  padding: '20px 28px',
                  borderBottom: i < rows.length - 1 ? '1px solid rgba(184, 81, 44, 0.18)' : 'none',
                  alignItems: 'baseline',
                }}>
                  <dt style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
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
                  }}>{r.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 640px) {
          .ov-row { grid-template-columns: 1fr !important; gap: 6px !important; padding: 18px 20px !important; }
        }
      `}</style>
    </Section>
  );
}

window.OverviewBox = OverviewBox;
