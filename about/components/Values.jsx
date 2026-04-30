function Values() {
  const values = [
    { name: 'Integrity',         text: 'Our word is our bond. We tell clients the truth, even when it costs us a deal.' },
    { name: 'Dignity of work',   text: 'Good work changes families. We treat every role we fill as a real career, not a gig.' },
    { name: 'Ownership',         text: "We build it. We fix it. We don't pass the buck to a vendor or a process." },
    { name: 'Long-term thinking',text: "We don't measure success in months. We measure it in years on the same client and years in the same role." },
    { name: 'Service',           text: 'We put others first. Clients, team members, each other.' },
    { name: 'Passion for people',text: 'We go the extra mile because people matter more than the metric.' },
    { name: 'Tenacity',          text: 'We go after hard problems. The ones nobody else wants to solve are usually the ones worth solving.' },
    { name: 'Empathy',           text: 'We listen before we act. Most problems get smaller once someone feels actually heard.' },
  ];

  return (
    <Section bg="paper-2" padding="lg">
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 2.1fr',
          gap: 64,
          alignItems: 'start',
          marginBottom: 56,
        }} className="values-head">
          <div>
            <Eyebrow>06 / Values</Eyebrow>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(30px, 3.2vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#1F1A17',
            }}>
              What we stand for
            </h2>
          </div>
          <div>
            <p style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(20px, 1.9vw, 24px)',
              lineHeight: 1.45,
              color: '#3A322D',
              margin: 0,
              maxWidth: 560,
            }}>
              A short list. We try to live by it.
            </p>
          </div>
        </div>

        <div className="values-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          border: '1px solid #D9CFBF',
          borderRadius: 12,
          background: '#F7F2EB',
          overflow: 'hidden',
        }}>
          {values.map((v, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            return (
              <div key={v.name} style={{
                padding: '32px 28px',
                borderRight: col < 3 ? '1px solid #D9CFBF' : 'none',
                borderBottom: row < 1 ? '1px solid #D9CFBF' : 'none',
                background: '#F7F2EB',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                minHeight: 200,
              }} className="value-card">
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: '#B8512C',
                  letterSpacing: '0.04em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: 22,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  color: '#1F1A17',
                  margin: 0,
                }}>
                  {v.name}
                </h3>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: '#3A322D',
                  margin: 0,
                  textWrap: 'pretty',
                }}>
                  {v.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
      <style>{`
        @media (max-width: 1024px) {
          .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .values-grid .value-card { border-right: none !important; border-bottom: 1px solid #D9CFBF !important; }
          .values-grid .value-card:nth-child(2n) { border-right: none !important; }
          .values-grid .value-card:nth-child(odd) { border-right: 1px solid #D9CFBF !important; }
          .values-grid .value-card:nth-last-child(-n+2) { border-bottom: none !important; }
        }
        @media (max-width: 640px) {
          .values-head { grid-template-columns: 1fr !important; gap: 16px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .values-grid .value-card { border-right: none !important; border-bottom: 1px solid #D9CFBF !important; }
          .values-grid .value-card:last-child { border-bottom: none !important; }
        }
      `}</style>
    </Section>
  );
}

window.Values = Values;
