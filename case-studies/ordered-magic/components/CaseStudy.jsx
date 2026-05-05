// =====================================================================
// Photo placeholder for Toby Marsden — flat warm portrait swatch.
// Used in hero (medium portrait) and lead testimonial (square/circle).
// =====================================================================
function TobyPortrait({ size = 'medium', shape = 'rect', src = '../../images/toby-marsden-ordered-magic.png' }) {
  const dims = {
    small:  { w: 96,  fontInitials: 36, fontName: 13 },
    medium: { w: 240, fontInitials: 88, fontName: 16 },
    large:  { w: 320, fontInitials: 110, fontName: 18 },
  }[size];

  const radius = shape === 'circle' ? 999 : 12;
  const ratio = shape === 'circle' ? '1/1' : '4/5';
  const [errored, setErrored] = React.useState(false);

  if (src && !errored) {
    return (
      <img
        src={src}
        alt="Toby Marsden, founder of Ordered Magic"
        loading={size === 'medium' ? undefined : 'lazy'}
        onError={() => setErrored(true)}
        style={{
          width: dims.w,
          aspectRatio: ratio,
          objectFit: 'cover',
          borderRadius: radius,
          boxShadow: 'inset 0 0 0 1px rgba(31,26,23,0.08)',
          display: 'block',
        }}
      />
    );
  }

  return (
    <div style={{
      width: dims.w,
      aspectRatio: ratio,
      borderRadius: radius,
      background: 'linear-gradient(150deg, #C45E36 0%, #9C4220 60%, #7A331A 100%)',
      position: 'relative',
      overflow: 'hidden',
      color: '#F0D9A8',
      boxShadow: 'inset 0 0 0 1px rgba(31,26,23,0.08)',
    }}>
      {/* Soft warm light wash, like film grading */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 25%, rgba(240,217,168,0.28), transparent 55%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '12%', left: 0, right: 0,
        textAlign: 'center',
        fontFamily: "'Source Serif 4', serif",
        fontSize: dims.fontInitials,
        fontWeight: 400,
        opacity: 0.45,
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>TM</div>
      {shape !== 'circle' && (
        <div style={{
          position: 'absolute',
          bottom: 16, left: 16, right: 16,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.14em',
            opacity: 0.7, marginBottom: 2,
          }}>Photo placeholder</div>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: dims.fontName, lineHeight: 1.2,
          }}>Toby Marsden</div>
        </div>
      )}
    </div>
  );
}

// =====================================================================
// PageHeader — Section 1
// =====================================================================
function PageHeader() {
  return (
    <Section bg="paper" padding="md" style={{ paddingTop: 72, paddingBottom: 56 }}>
      <Container>
        <div style={{ marginBottom: 24 }}>
          <a href="#case-studies" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: '#6B5F56',
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}>
            ← Case studies
          </a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: 56,
          alignItems: 'start',
        }} className="hero-grid">
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#B8512C',
              marginBottom: 28,
            }}>
              Case study · 07
            </div>
            <h1 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(48px, 7vw, 88px)',
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              margin: '0 0 28px',
              color: '#1F1A17',
              textWrap: 'balance',
            }}>
              Ordered Magic
            </h1>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 'clamp(20px, 1.9vw, 24px)',
              lineHeight: 1.45,
              color: '#3A322D',
              margin: 0,
              maxWidth: 620,
              fontWeight: 400,
              textWrap: 'pretty',
            }}>
              How Ordered Magic grew from a one-person inbox to a multi-agent support team without hiring.
            </p>
          </div>

          <div className="hero-photo" style={{ justifySelf: 'end' }}>
            <TobyPortrait size="medium" shape="rect" />
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .hero-photo { justify-self: start !important; }
        }
      `}</style>
    </Section>
  );
}

// =====================================================================
// OverviewBox — Section 2 (5-row editorial table)
// =====================================================================
function OverviewBox() {
  const rows = [
    ['Industry', 'SaaS / Shopify app development'],
    ['Country', 'France'],
    ['Challenge', "Toby was personally handling seven-day-a-week support across a growing app catalog while expanding into the U.S., with no path to hire and manage a team without losing his ability to build."],
    ['Solution', "xFusion placed and managed a dedicated, technically fluent support team trained in Toby's apps, then grew the team as volume grew, while xFusion handled recruiting, training, payroll, culture, and ongoing oversight."],
    ['Results', 'Team grew from one dedicated agent to two full-time plus a part-time weekend agent. Hundreds of new five-star reviews on Shopify, higher organic ranking in the app store, and Toby reclaimed the time to focus on product.'],
  ];
  return (
    <Section bg="paper" padding="sm" style={{ paddingTop: 16, paddingBottom: 88 }}>
      <Container>
        <div style={{
          background: '#F8EBC9',
          borderRadius: 16,
          border: '1px solid #E6C683',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '20px 32px',
            borderBottom: '1px solid rgba(31,26,23,0.10)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: '#7a5a10',
          }}>
            Overview
          </div>
          <table className="overview-table" style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            <tbody>
              {rows.map(([label, value], i) => (
                <tr key={label} style={{
                  borderBottom: i < rows.length - 1 ? '1px solid rgba(31,26,23,0.08)' : 'none',
                }}>
                  <th scope="row" style={{
                    width: 180,
                    textAlign: 'left',
                    verticalAlign: 'top',
                    padding: '20px 24px 20px 32px',
                    fontFamily: "'Source Serif 4', serif",
                    fontWeight: 400,
                    fontSize: 18,
                    color: '#1F1A17',
                    fontStyle: 'italic',
                  }}>{label}</th>
                  <td style={{
                    padding: '20px 32px 20px 0',
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: '#1F1A17',
                    textWrap: 'pretty',
                  }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
      <style>{`
        @media (max-width: 700px) {
          .overview-table th { width: auto !important; display: block; padding: 16px 20px 4px !important; }
          .overview-table td { display: block; padding: 0 20px 16px !important; }
        }
      `}</style>
    </Section>
  );
}

// =====================================================================
// LongForm — Sections 3, 6, 7, 10
// =====================================================================
function LongForm({ eyebrow, heading, paragraphs, bg = 'paper', id }) {
  return (
    <Section bg={bg} padding="lg" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <Container narrow>
        {eyebrow && (
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#B8512C',
            marginBottom: 20,
          }}>{eyebrow}</div>
        )}
        <h2 id={id} style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 'clamp(34px, 4vw, 52px)',
          fontWeight: 400,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          margin: '0 0 40px',
          color: '#1F1A17',
          textWrap: 'balance',
        }}>{heading}</h2>
        <div style={{
          width: 48,
          height: 2,
          background: '#B8512C',
          marginBottom: 36,
        }} />
        {paragraphs.map((p, i) => (
          <p key={i} style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 18,
            lineHeight: 1.7,
            color: '#1F1A17',
            margin: i === 0 ? '0 0 24px' : '0 0 24px',
            textWrap: 'pretty',
          }}>{p}</p>
        ))}
      </Container>
    </Section>
  );
}

// =====================================================================
// TestimonialFeature — Section 4
// =====================================================================
function TestimonialFeature() {
  return (
    <Section bg="paper-2" padding="lg" style={{ paddingTop: 88, paddingBottom: 88 }}>
      <Container>
        <div style={{
          background: '#F8EBC9',
          border: '1px solid #E6C683',
          borderRadius: 16,
          padding: 'clamp(32px, 5vw, 64px)',
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          gap: 48,
          alignItems: 'start',
        }} className="testimonial-card">
          <div>
            <TobyPortrait size="medium" shape="rect" />
          </div>
          <div>
            <svg width="40" height="32" viewBox="0 0 40 32" style={{ marginBottom: 20 }}>
              <path d="M0 32V18C0 8 6 2 16 0L18 4C12 6 8 10 8 16H16V32H0ZM22 32V18C22 8 28 2 38 0L40 4C34 6 30 10 30 16H38V32H22Z" fill="#B8512C"/>
            </svg>
            <p style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 3.4vw, 40px)',
              lineHeight: 1.18,
              fontWeight: 400,
              color: '#1F1A17',
              letterSpacing: '-0.015em',
              margin: '0 0 28px',
              textWrap: 'balance',
            }}>
              "I thought my life was going to become a living hell. It was extraordinary instead."
            </p>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
              color: '#3A322D',
              margin: '0 0 28px',
              textWrap: 'pretty',
            }}>
              I was sure outsourcing would mean dropped tickets, the wrong tone, and an exploding workload. None of that happened. The xFusion team grew from one dedicated agent to two full-time and a part-time weekend agent, and the entire way I think about the future of my business has changed.
            </p>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: '0.06em',
              color: '#6B5F56',
              textTransform: 'uppercase',
            }}>
              Toby Marsden &nbsp;·&nbsp; Founder &nbsp;·&nbsp; Ordered Magic
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 760px) {
          .testimonial-card {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </Section>
  );
}

// =====================================================================
// MetricCallout — Section 5 (Forest background, big punch)
// =====================================================================
function MetricCallout() {
  return (
    <Section bg="forest" padding="lg" style={{ paddingTop: 112, paddingBottom: 112 }}>
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 56,
          alignItems: 'center',
        }} className="metric-grid">
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#F0D9A8',
              marginBottom: 28,
            }}>
              The proof
            </div>
            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(120px, 18vw, 240px)',
              fontWeight: 400,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#F7F2EB',
              margin: 0,
            }}>
              1<span style={{ color: '#F0D9A8', margin: '0 0.08em' }}>to</span>3<span style={{ color: '#B8512C' }}>+</span>
            </div>
          </div>
          <div>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 19,
              lineHeight: 1.6,
              color: '#F0D9A8',
              margin: 0,
              textWrap: 'pretty',
            }}>
              The team grew from one dedicated agent to two full-time agents plus a part-time weekend agent, with hundreds of new five-star reviews and a meaningful jump in organic ranking on the Shopify app store. What started as a single placement to take the support inbox off Toby's plate became a real, multi-person team carrying the entire support function across three apps and seven-day coverage.
            </p>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 880px) {
          .metric-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </Section>
  );
}

// =====================================================================
// ShoutoutGrid — Sections 8, 9 (placeholder cards)
// =====================================================================
function ShoutoutGrid({ eyebrow, heading, kind = 'leader', columns = 3, bg = 'paper' }) {
  const cards = Array.from({ length: columns }, (_, i) => i);
  const placeholderText = kind === 'leader'
    ? '[Leader shoutout coming soon]'
    : '[Customer shoutout coming soon]';
  const slotLabel = kind === 'leader'
    ? 'Ordered Magic team member'
    : 'Verified Shopify app review';

  return (
    <Section bg={bg} padding="lg" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <Container>
        <div style={{ maxWidth: 720, marginBottom: 12 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#B8512C',
            marginBottom: 20,
          }}>{eyebrow}</div>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(30px, 3.4vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 12px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>{heading}</h2>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            color: '#6B5F56',
            margin: 0,
            fontStyle: 'italic',
          }}>
            Quotes coming soon.
          </p>
        </div>

        <div className="shoutout-grid" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 20,
          marginTop: 40,
        }}>
          {cards.map(i => (
            <div key={i} style={{
              background: bg === 'butter' ? '#F7F2EB' : '#FBF7F0',
              border: '1px dashed #B7A993',
              borderRadius: 12,
              padding: 28,
              minHeight: 220,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 24,
            }}>
              <div>
                <svg width="24" height="20" viewBox="0 0 40 32" style={{ marginBottom: 16, opacity: 0.45 }}>
                  <path d="M0 32V18C0 8 6 2 16 0L18 4C12 6 8 10 8 16H16V32H0ZM22 32V18C22 8 28 2 38 0L40 4C34 6 30 10 30 16H38V32H22Z" fill="#B8512C"/>
                </svg>
                <p style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: 18,
                  lineHeight: 1.45,
                  fontStyle: 'italic',
                  color: '#9E9388',
                  margin: 0,
                  textWrap: 'pretty',
                }}>
                  {placeholderText}
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                paddingTop: 16,
                borderTop: '1px solid #E6DCCB',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 999,
                  background: '#EFE8DD',
                  border: '1px dashed #B7A993',
                }} />
                <div>
                  <div style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: 13, fontWeight: 600,
                    color: '#9E9388',
                  }}>Name pending</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: '#9E9388',
                    letterSpacing: '0.04em',
                    marginTop: 2,
                  }}>{slotLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 880px) {
          .shoutout-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .shoutout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}

// =====================================================================
// CTASection — Section 11 (Forest band)
// =====================================================================
function CTASection() {
  return (
    <Section bg="forest" padding="lg" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 56,
          alignItems: 'center',
        }} className="cta-grid">
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#F0D9A8',
              marginBottom: 24,
            }}>
              Ready when you are
            </div>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(36px, 4.6vw, 60px)',
              fontWeight: 400,
              lineHeight: 1.08,
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
              opacity: 0.92,
              margin: 0,
              maxWidth: 560,
              textWrap: 'pretty',
            }}>
              If your customer support is starting to slip, or you are about to lose the one person holding it together, we can help. We will recruit, vet, place, train, and manage a senior, AI-trained support agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 16,
          }}>
            <Button variant="primary" size="lg" style={{
              fontSize: 17,
              padding: '18px 28px',
            }} href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call
            </Button>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.55,
              color: '#F0D9A8',
              opacity: 0.8,
              margin: 0,
              maxWidth: 360,
            }}>
              30 minutes. No commitment. No credit card. You'll talk directly with our founding team.
            </p>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 880px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </Section>
  );
}

// Image-based shoutout grid (sourced from xfusion.io originals)
function ShoutoutImageGrid({ eyebrow, heading, intro, images, bg = 'paper' }) {
  return (
    <Section bg={bg} padding="lg" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <Container>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          {eyebrow && (
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#B8512C',
              marginBottom: 20,
            }}>{eyebrow}</div>
          )}
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(30px, 3.4vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>{heading}</h2>
          {intro && (
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 16, lineHeight: 1.6,
              color: '#3A322D', margin: 0, textWrap: 'pretty',
            }}>{intro}</p>
          )}
        </div>
        <div className="sig-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {images.map((src, i) => (
            <figure key={i} style={{
              margin: 0,
              padding: 16,
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
      </Container>
      <style>{`
        @media (max-width: 720px) { .sig-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

Object.assign(window, {
  PageHeader, OverviewBox, LongForm,
  TestimonialFeature, MetricCallout,
  ShoutoutGrid, ShoutoutImageGrid, CTASection, TobyPortrait,
});
