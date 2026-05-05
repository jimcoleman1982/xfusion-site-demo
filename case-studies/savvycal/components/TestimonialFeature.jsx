// Section 4: Featured testimonial card. Larger photo, italic serif pull quote, supporting body, mono attribution.
function TestimonialFeature() {
  return (
    <Section bg="paper-2" padding="lg" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <Container>
        <div className="tf-card" style={{
          maxWidth: 1040,
          margin: '0 auto',
          background: '#F7F2EB',
          border: '1px solid #D9CFBF',
          borderRadius: 16,
          padding: 0,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
        }}>
          <div style={{
            background: 'linear-gradient(140deg, #C56B3F 0%, #A0451F 100%)',
            position: 'relative',
            minHeight: 380,
          }}>
            <DerrickPhoto size="large" style={{
              maxWidth: '100%', width: '100%', height: '100%',
              borderRadius: 0, border: 'none',
              aspectRatio: 'auto',
            }} />
          </div>
          <div style={{ padding: '48px 48px 40px' }} className="tf-body">
            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 80,
              lineHeight: 0.6,
              color: '#B8512C',
              marginBottom: 8,
              opacity: 0.5,
            }}>“</div>
            <p style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(26px, 2.6vw, 34px)',
              lineHeight: 1.25,
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: '#1F1A17',
              margin: '0 0 24px',
              textWrap: 'balance',
            }}>
              I was admittedly skeptical at first. They proved my skepticism unwarranted.
            </p>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 17,
              lineHeight: 1.6,
              color: '#3A322D',
              margin: '0 0 32px',
              textWrap: 'pretty',
            }}>
              As a founder busy building and marketing my product, I wanted a partner I could trust to train and manage dedicated reps as an extension of my team. This is not your stereotypical outsourced support agency. They've cut our average reply time by 84.79% and freed me up to focus on running the business.
            </p>
            <div style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 12,
              letterSpacing: '0.08em',
              color: '#6B5F56',
              textTransform: 'uppercase',
              paddingTop: 20,
              borderTop: '1px solid #D9CFBF',
            }}>
              Derrick Reimer&nbsp;&nbsp;·&nbsp;&nbsp;Founder&nbsp;&nbsp;·&nbsp;&nbsp;SavvyCal
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 820px) {
          .tf-card { grid-template-columns: 1fr !important; }
          .tf-card > div:first-child { min-height: 280px !important; }
          .tf-body { padding: 32px 28px !important; }
        }
      `}</style>
    </Section>
  );
}

window.TestimonialFeature = TestimonialFeature;
