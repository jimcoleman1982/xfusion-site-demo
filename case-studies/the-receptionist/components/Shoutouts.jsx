// Shoutout grids + final CTA

function ShoutoutGrid({ heading, intro, cards, footnote, bg = 'paper', placeholder = false }) {
  return (
    <Section bg={bg} padding="lg">
      <Container>
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4.2vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>{heading}</h2>
          {intro ? (
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
              color: '#3A322D',
              margin: 0,
              textWrap: 'pretty',
            }}>{intro}</p>
          ) : null}
        </div>

        <div className="shoutout-grid" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cards.length}, 1fr)`,
          gap: 24,
        }}>
          {cards.map((c, i) => (
            <div key={i} style={{
              background: bg === 'butter' ? '#F7F2EB' : '#FBF7F0',
              border: placeholder ? '1px dashed #B7A993' : '1px solid #E6DCCB',
              borderRadius: 12,
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 220,
            }}>
              {!placeholder ? (
                <Icon name="quote" size={26} color="#B8512C" fill="#B8512C" stroke={0} style={{ marginBottom: 16 }} />
              ) : null}

              <div style={{
                fontFamily: "'Source Serif 4', serif",
                fontStyle: placeholder ? 'normal' : 'italic',
                fontSize: placeholder ? 18 : 'clamp(22px, 2.2vw, 26px)',
                fontWeight: 400,
                lineHeight: 1.3,
                color: placeholder ? '#9E9388' : '#1F1A17',
                margin: '0 0 24px',
                flex: 1,
                textWrap: 'pretty',
              }}>
                {c.quote}
              </div>

              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: '#6B5F56',
                paddingTop: 16,
                borderTop: '1px solid #E6DCCB',
              }}>{c.attribution}</div>
            </div>
          ))}
        </div>

        {footnote ? (
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            lineHeight: 1.55,
            color: '#6B5F56',
            margin: '32px 0 0',
            maxWidth: 720,
          }}>{footnote}</p>
        ) : null}
      </Container>

      <style>{`
        @media (max-width: 880px) {
          .shoutout-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .shoutout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section bg="forest" padding="xl">
      <Container>
        <div className="finalcta-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 64,
          alignItems: 'center',
          maxWidth: 1080,
          margin: '0 auto',
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#F0D9A8',
              marginBottom: 24,
            }}>Ready when you are</div>

            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(36px, 4.6vw, 60px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 24px',
              color: '#F7F2EB',
              textWrap: 'balance',
            }}>
              Want to see if we can help you too?
            </h2>

            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
              color: '#F0D9A8',
              opacity: 0.95,
              margin: 0,
              textWrap: 'pretty',
            }}>
              If you have built a customer experience that customers actually talk about, and you are nervous about handing any of it to an outside team, that is the exact problem we solve. We will recruit, vet, place, train, and manage a senior, AI-trained support agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free.
            </p>
          </div>

          <div className="finalcta-actions" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            alignItems: 'flex-start',
          }}>
            <Button variant="on-dark" size="lg" style={{
              background: '#B8512C',
              color: '#F7F2EB',
              padding: '18px 32px',
              fontSize: 17,
            }} href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call
            </Button>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.55,
              color: '#F0D9A8',
              opacity: 0.8,
              margin: 0,
              maxWidth: 320,
            }}>
              30 minutes. No commitment. No credit card. You\u2019ll talk directly with our founding team.
            </p>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 880px) {
          .finalcta-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </Section>
  );
}

// Section divider — thin rule between major sections, optional ornament
function SectionRule() {
  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 24px',
    }}>
      <div style={{
        height: 1,
        background: '#D9CFBF',
        margin: '0',
      }} />
    </div>
  );
}

// Image-based shoutout grid (sourced from xfusion.io originals)
function ShoutoutImageGrid({ heading, intro, images, footnote, bg = 'paper' }) {
  return (
    <Section bg={bg} padding="lg">
      <Container>
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4.2vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>{heading}</h2>
          {intro ? (
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18, lineHeight: 1.6,
              color: '#3A322D', margin: 0, textWrap: 'pretty',
            }}>{intro}</p>
          ) : null}
        </div>

        <div className="sig-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {images.map((src, i) => (
            <figure key={i} style={{
              margin: 0, padding: 16,
              background: '#F7F2EB',
              border: '1px solid #D9CFBF',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={src}
                alt={`Shoutout ${i + 1}`}
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
              />
            </figure>
          ))}
        </div>

        {footnote ? (
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14, lineHeight: 1.55,
            color: '#6B5F56', margin: '32px 0 0', maxWidth: 720,
          }}>{footnote}</p>
        ) : null}
      </Container>

      <style>{`
        @media (max-width: 720px) { .sig-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

Object.assign(window, { ShoutoutGrid, ShoutoutImageGrid, FinalCTA, SectionRule });
