// Case study sections — Hero, Overview, Long-form, Testimonial, Metric

function Breadcrumb() {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#6B5F56',
      marginBottom: 28,
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      flexWrap: 'wrap',
    }}>
      <a href="#" style={{ color: '#6B5F56', textDecoration: 'none' }}>xFusion</a>
      <span style={{ opacity: 0.5 }}>/</span>
      <a href="#" style={{ color: '#6B5F56', textDecoration: 'none' }}>Case studies</a>
      <span style={{ opacity: 0.5 }}>/</span>
      <span style={{ color: '#1F1A17' }}>TheReceptionist</span>
    </div>
  );
}

function PageHeader() {
  return (
    <Section bg="paper" padding="lg" style={{ paddingTop: 48 }}>
      <Container>
        <div style={{ maxWidth: 880 }}>
          <Breadcrumb />

          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#B8512C',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span>Case study</span>
            <span style={{ width: 24, height: 1, background: '#B8512C', display: 'inline-block' }} />
            <span style={{ color: '#6B5F56' }}>08</span>
          </div>

          <h1 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            margin: '0 0 32px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            TheReceptionist
          </h1>

          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(20px, 2.2vw, 26px)',
            fontWeight: 400,
            lineHeight: 1.4,
            color: '#3A322D',
            margin: '0 0 56px',
            maxWidth: 780,
            textWrap: 'pretty',
          }}>
            How TheReceptionist held a 98.9% customer satisfaction score and protected its Radical Support reputation with a fully managed xFusion team.
          </p>
        </div>

        {/* Tom Foster portrait — medium, not full-bleed */}
        <div className="hero-portrait" style={{
          maxWidth: 360,
          marginTop: 8,
        }}>
          <PhotoFrame
            name="Tom Foster"
            role="Director of Sales, TheReceptionist"
            tone="forest"
            ratio="4/5"
            label="images/tom-foster-thereceptionist.png"
          />
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#6B5F56',
            marginTop: 12,
            letterSpacing: '0.04em',
          }}>
            Tom Foster, Director of Sales, TheReceptionist
          </div>
        </div>
      </Container>
    </Section>
  );
}

function OverviewBox() {
  // Editorial table treatment — rows with hairlines, butter-soft tinted card
  const rows = [
    {
      label: 'Industry',
      value: 'Visitor management software',
    },
    {
      label: 'Country',
      value: 'United States',
    },
    {
      label: 'Challenge',
      value: 'Maintain TheReceptionist\u2019s "radical support" reputation and "employee supremacy" culture while moving to an outsourced support and sales model.',
    },
    {
      label: 'Solution',
      value: 'A dedicated xFusion team trained into the Radical Support and Employee Supremacy operating models, integrated through Slack and a phased rollout.',
    },
    {
      label: 'Results',
      value: '98.9% customer satisfaction against an 85% target, 100% in most months since the partnership began, 1 minute and 22 second average first reply time, and a partnership that has grown several times.',
    },
  ];

  return (
    <Section bg="paper" padding="md" style={{ paddingTop: 0, paddingBottom: 96 }}>
      <Container>
        <div style={{
          background: '#F8EBC9',
          border: '1px solid #E6C683',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '18px 32px',
            borderBottom: '1px solid #E6C683',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#7a5a10',
            background: 'rgba(255,255,255,0.25)',
          }}>
            At a glance
          </div>
          <dl style={{ margin: 0 }}>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className="overview-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: 32,
                  padding: '20px 32px',
                  borderBottom: i === rows.length - 1 ? 'none' : '1px solid #E6C683',
                  alignItems: 'baseline',
                }}>
                <dt style={{
                  fontFamily: "'JetBrains Mono', monospace",
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
                }}>{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
      <style>{`
        @media (max-width: 720px) {
          .overview-row {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
            padding: 18px 22px !important;
          }
        }
      `}</style>
    </Section>
  );
}

function LongForm({ eyebrow, heading, paragraphs, bg = 'paper', id }) {
  return (
    <Section bg={bg} padding="lg" id={id}>
      <Container narrow>
        {eyebrow ? (
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#B8512C',
            marginBottom: 16,
          }}>{eyebrow}</div>
        ) : null}
        <h2 style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 'clamp(32px, 4.2vw, 52px)',
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: '0 0 40px',
          color: '#1F1A17',
          textWrap: 'balance',
        }}>{heading}</h2>
        <div className="longform-body">
          {paragraphs.map((p, i) => (
            <p key={i} style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18,
              lineHeight: 1.7,
              color: i === 0 ? '#1F1A17' : '#3A322D',
              margin: '0 0 24px',
              textWrap: 'pretty',
              fontWeight: i === 0 && p.length < 80 ? 500 : 400,
            }}>{p}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TestimonialFeature() {
  return (
    <Section bg="butter" padding="lg">
      <Container>
        <div className="tf-grid" style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: 64,
          alignItems: 'flex-start',
          maxWidth: 1080,
          margin: '0 auto',
        }}>
          <div>
            <PhotoFrame
              name="Tom Foster"
              role="Director of Sales, TheReceptionist"
              tone="forest"
              ratio="4/5"
              label="images/tom-foster-thereceptionist.png"
            />
          </div>

          <div>
            <Icon name="quote" size={36} color="#B8512C" fill="#B8512C" stroke={0} style={{ marginBottom: 20 }} />

            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.015em',
              color: '#1F1A17',
              margin: '0 0 32px',
              textWrap: 'balance',
            }}>
              Attentive. Hire the best people. We see no reason to stop.
            </div>

            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18,
              lineHeight: 1.65,
              color: '#3A322D',
              margin: '0 0 28px',
              textWrap: 'pretty',
            }}>
              When we first met with Jim and David, we were immediately struck by their values and commitment to their employees, which meshed with ours completely. Over years of working together they\u2019ve helped us hit a 98.9% CSAT rating, and we\u2019ve expanded the partnership several times. If you\u2019re looking for an outsourced solution, I highly recommend the team at xFusion.
            </p>

            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#6B5F56',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              alignItems: 'center',
            }}>
              <span style={{ color: '#1F1A17', fontWeight: 600 }}>Tom Foster</span>
              <span style={{ color: '#B7A993' }}>·</span>
              <span>Director of Sales</span>
              <span style={{ color: '#B7A993' }}>·</span>
              <span>TheReceptionist</span>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 760px) {
          .tf-grid { grid-template-columns: 1fr !important; gap: 36px !important; max-width: 480px; }
        }
      `}</style>
    </Section>
  );
}

function MetricCallout() {
  return (
    <Section bg="forest" padding="xl">
      <Container>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'left' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#F0D9A8',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <span style={{ width: 32, height: 1, background: '#F0D9A8', display: 'inline-block', opacity: 0.7 }} />
            <span>The number that mattered</span>
          </div>

          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(72px, 14vw, 200px)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#F7F2EB',
            margin: '0 0 32px',
            textWrap: 'balance',
          }}>
            98.9% <span style={{ color: '#F0D9A8' }}>satisfaction</span>
          </div>

          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            fontWeight: 400,
            lineHeight: 1.4,
            color: '#F0D9A8',
            margin: 0,
            maxWidth: 760,
            textWrap: 'pretty',
            opacity: 0.95,
          }}>
            against an 85% internal target, with 100% satisfaction in most months since the partnership began.
          </div>
        </div>
      </Container>
    </Section>
  );
}

Object.assign(window, { PageHeader, OverviewBox, LongForm, TestimonialFeature, MetricCallout });
