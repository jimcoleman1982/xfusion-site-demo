// Page-specific components for the Tolstoy case study

// =============================================================
// PageHeader — eyebrow + client title + subhead + lead photo
// =============================================================
function PageHeader({ eyebrow, title, subhead, photo }) {
  return (
    <Section bg="paper" padding="lg" style={{ paddingTop: 56, paddingBottom: 64 }}>
      <Container>
        {/* Breadcrumb */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: '#6B5F56',
          marginBottom: 48,
          letterSpacing: '0.04em',
        }}>
          <a href="#" style={{ color: '#6B5F56', textDecoration: 'none' }}>Case studies</a>
          <span style={{ margin: '0 10px', color: '#B7A993' }}>/</span>
          <span style={{ color: '#1F1A17' }}>Tolstoy</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }} className="ph-grid">
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: '#B8512C',
              marginBottom: 28,
            }}>
              {eyebrow}
            </div>

            <h1 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(56px, 9vw, 112px)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.035em',
              color: '#1F1A17',
              margin: '0 0 32px',
            }}>{title}</h1>

            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 'clamp(19px, 1.6vw, 22px)',
              lineHeight: 1.45,
              color: '#3A322D',
              margin: 0,
              maxWidth: 540,
              fontWeight: 400,
            }}>{subhead}</p>
          </div>

          <div>
            <div style={{
              borderRadius: 12,
              overflow: 'hidden',
              maxWidth: 460,
              marginLeft: 'auto',
              border: '1px solid #D9CFBF',
            }} className="ph-photo">
              <PhotoFrame
                name={photo.name}
                role={photo.role}
                src={photo.src}
                ratio="4/5"
                tone="clay"
              />
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .ph-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ph-photo { max-width: 360px !important; margin: 0 !important; }
        }
      `}</style>
    </Section>
  );
}

// Photo frame — renders real <img> when src is provided, otherwise warm placeholder
function PhotoFrame({ name, role, src, ratio = '4/5', tone = 'clay' }) {
  const [errored, setErrored] = useState(false);

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={role ? `${name}, ${role}` : name}
        onError={() => setErrored(true)}
        style={{
          width: '100%',
          aspectRatio: ratio,
          objectFit: 'cover',
          display: 'block',
        }}
      />
    );
  }

  const tones = {
    clay:   { bg: '#B8512C', accent: '#F0D9A8' },
    forest: { bg: '#2C4A3E', accent: '#F0D9A8' },
    butter: { bg: '#F0D9A8', accent: '#1F1A17' },
  };
  const t = tones[tone];
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');

  return (
    <div style={{
      aspectRatio: ratio,
      background: t.bg,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      {/* warm wash to give a photo-like depth */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 20%, rgba(240,217,168,0.35), transparent 60%), radial-gradient(ellipse at 70% 90%, rgba(31,26,23,0.3), transparent 70%)',
      }}/>
      {/* big initials watermark */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Source Serif 4', serif",
        fontSize: 'clamp(120px, 22vw, 220px)',
        color: t.accent,
        opacity: 0.18,
        lineHeight: 1,
        fontWeight: 400,
        letterSpacing: '-0.04em',
      }}>{initials}</div>
      {/* caption strip */}
      <div style={{
        position: 'relative',
        padding: '20px 24px',
        background: 'linear-gradient(to top, rgba(31,26,23,0.55), transparent)',
        color: '#F7F2EB',
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          opacity: 0.85,
          marginBottom: 4,
        }}>Photo placeholder</div>
        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 22,
          lineHeight: 1.15,
        }}>{name}</div>
        {role && <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 13,
          opacity: 0.85,
          marginTop: 2,
        }}>{role}</div>}
      </div>
    </div>
  );
}

// =============================================================
// OverviewBox — 5-row metadata table (editorial)
// =============================================================
function OverviewBox({ rows }) {
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
            padding: '20px 32px',
            borderBottom: '1px solid rgba(184,81,44,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#863818',
            }}>At a glance</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#6B5F56',
            }}>Engagement since August 2022</div>
          </div>

          {rows.map((r, i) => (
            <div key={r.label} style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr',
              gap: 32,
              padding: '24px 32px',
              borderBottom: i === rows.length - 1 ? 'none' : '1px solid rgba(184,81,44,0.14)',
              alignItems: 'baseline',
            }} className="ovr-row">
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#3A322D',
              }}>{r.label}</div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.55,
                color: '#1F1A17',
              }}>{r.value}</div>
            </div>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 720px) {
          .ovr-row { grid-template-columns: 1fr !important; gap: 8px !important; padding: 20px 24px !important; }
        }
      `}</style>
    </Section>
  );
}

// =============================================================
// LongForm — narrow editorial column with section heading
// =============================================================
function LongForm({ eyebrow, heading, paragraphs, bg = 'paper', dropCap = false }) {
  return (
    <Section bg={bg} padding="lg">
      <Container narrow>
        {eyebrow && (
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: '#B8512C',
            marginBottom: 20,
          }}>{eyebrow}</div>
        )}
        <h2 style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 'clamp(36px, 4.5vw, 56px)',
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: '#1F1A17',
          margin: '0 0 40px',
          textWrap: 'balance',
        }}>{heading}</h2>

        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 18,
          lineHeight: 1.65,
          color: '#1F1A17',
        }}>
          {paragraphs.map((p, i) => (
            <p key={i} style={{
              margin: i === paragraphs.length - 1 ? 0 : '0 0 24px',
              textWrap: 'pretty',
            }}>
              {dropCap && i === 0 ? <DropCap>{p}</DropCap> : p}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function DropCap({ children }) {
  if (typeof children !== 'string') return children;
  const first = children.charAt(0);
  const rest = children.slice(1);
  return (
    <>
      <span style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: '4.4em',
        float: 'left',
        lineHeight: 0.85,
        marginTop: '0.08em',
        marginRight: '0.08em',
        color: '#B8512C',
        fontWeight: 400,
      }}>{first}</span>
      {rest}
    </>
  );
}

// =============================================================
// TestimonialFeature — featured testimonial card
// =============================================================
function TestimonialFeature({ photo, pullQuote, fullQuote, name, role, company }) {
  return (
    <Section bg="paper" padding="lg" style={{ paddingTop: 0 }}>
      <Container>
        <div style={{
          background: '#F8EBC9',
          borderRadius: 24,
          padding: 'clamp(40px, 6vw, 72px)',
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'flex-start',
        }} className="tf-card">
          <div>
            <div style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(31,26,23,0.08)',
            }}>
              <PhotoFrame name={photo.name} role={photo.role} src={photo.src} ratio="4/5" tone="clay" />
            </div>
          </div>

          <div>
            {/* Open quote glyph */}
            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 96,
              lineHeight: 0.6,
              color: '#B8512C',
              opacity: 0.55,
              marginBottom: 12,
              userSelect: 'none',
            }} aria-hidden="true">“</div>

            <blockquote style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 3.4vw, 42px)',
              lineHeight: 1.2,
              fontWeight: 400,
              color: '#1F1A17',
              margin: '0 0 32px',
              letterSpacing: '-0.015em',
              textWrap: 'balance',
            }}>{pullQuote}</blockquote>

            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 17,
              lineHeight: 1.6,
              color: '#3A322D',
              margin: '0 0 32px',
              textWrap: 'pretty',
            }}>{fullQuote}</p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#3A322D',
            }}>
              <span style={{ width: 24, height: 1, background: '#B7A993' }} />
              <span>{name}, {role}, {company}</span>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 800px) {
          .tf-card { grid-template-columns: 1fr !important; }
          .tf-card > div:first-child { max-width: 220px; }
        }
      `}</style>
    </Section>
  );
}

// =============================================================
// MetricCallout — oversized stat (Forest band)
// =============================================================
function MetricCallout({ stat, support, side }) {
  return (
    <section style={{
      background: '#2C4A3E',
      color: '#F7F2EB',
      padding: 'clamp(80px, 12vw, 140px) 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* subtle vertical rule decorations */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: '50%',
        borderLeft: '1px solid rgba(247,242,235,0.06)',
        pointerEvents: 'none',
      }}/>

      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 24,
          textAlign: 'center',
          maxWidth: 1100,
          margin: '0 auto',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#F0D9A8',
            marginBottom: 8,
          }}>The proof</div>

          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(72px, 14vw, 200px)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#F7F2EB',
            margin: 0,
            textWrap: 'balance',
          }}>{stat}</div>

          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            lineHeight: 1.5,
            color: '#D7E0DC',
            maxWidth: 720,
            margin: '8px auto 0',
            textWrap: 'pretty',
          }}>{support}</p>

          {side && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 48,
              marginTop: 56,
              paddingTop: 40,
              borderTop: '1px solid rgba(247,242,235,0.12)',
            }}>
              {side.map(s => (
                <div key={s.label} style={{ minWidth: 160 }}>
                  <div style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: 'clamp(32px, 3vw, 44px)',
                    color: '#F0D9A8',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: 13,
                    color: '#D7E0DC',
                    lineHeight: 1.4,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

// =============================================================
// ShoutoutGrid — placeholder grid for leader/customer quotes
// =============================================================
function ShoutoutGrid({ eyebrow, heading, intro, type = 'leader', count = 3, bg = 'paper' }) {
  const placeholderText = type === 'leader'
    ? '[Leader shoutout coming soon]'
    : '[Customer shoutout coming soon]';
  const attrLabels = type === 'leader'
    ? ['Tolstoy leader, role TBD', 'Tolstoy leader, role TBD', 'Tolstoy leader, role TBD']
    : ['Shopify app review, name TBD', 'Shopify app review, name TBD', 'Shopify app review, name TBD'];

  return (
    <Section bg={bg} padding="lg">
      <Container>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
          marginBottom: 48,
        }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: '#B8512C',
              marginBottom: 16,
            }}>{eyebrow}</div>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(32px, 3.6vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#1F1A17',
              margin: '0 0 16px',
              textWrap: 'balance',
            }}>{heading}</h2>
            {intro && <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 16,
              lineHeight: 1.55,
              color: '#3A322D',
              margin: 0,
              maxWidth: 600,
            }}>{intro}</p>}
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            background: 'rgba(184,133,31,0.12)',
            color: '#7a5912',
            borderRadius: 999,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 3,
              background: '#B8851F',
            }}/>
            Quotes coming soon
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${count}, 1fr)`,
          gap: 24,
        }} className={`sg-grid sg-${count}`}>
          {Array.from({ length: count }).map((_, i) => (
            <PlaceholderCard
              key={i}
              text={placeholderText}
              attribution={attrLabels[i % attrLabels.length]}
              type={type}
              index={i}
            />
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .sg-3 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .sg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}

function PlaceholderCard({ text, attribution, type, index }) {
  return (
    <div style={{
      background: '#F7F2EB',
      border: '1px dashed #B7A993',
      borderRadius: 12,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      minHeight: 280,
      position: 'relative',
    }}>
      {/* faint quote glyph */}
      <div style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: 64,
        lineHeight: 0.5,
        color: '#D9CFBF',
        userSelect: 'none',
      }} aria-hidden="true">“</div>

      <div style={{
        flex: 1,
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 16,
        lineHeight: 1.55,
        color: '#9E9388',
        fontStyle: 'italic',
      }}>{text}</div>

      <div style={{
        paddingTop: 20,
        borderTop: '1px solid #E6DCCB',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        {/* avatar placeholder */}
        <div style={{
          width: 36, height: 36, borderRadius: 18,
          background: type === 'leader' ? '#EFE8DD' : '#F8EBC9',
          border: '1px solid #D9CFBF',
          flexShrink: 0,
        }}/>
        <div>
          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: '#6B5F56',
          }}>Name TBD</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#9E9388',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginTop: 2,
          }}>{attribution}</div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// CTASection — Forest-green CTA band
// =============================================================
function CTASection() {
  return (
    <section style={{
      background: '#2C4A3E',
      color: '#F7F2EB',
      padding: 'clamp(72px, 10vw, 120px) 0',
    }}>
      <Container>
        <div style={{
          maxWidth: 820,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(40px, 5.4vw, 68px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#F7F2EB',
            margin: '0 0 24px',
            textWrap: 'balance',
          }}>Want to see if we can help you too?</h2>

          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(16px, 1.4vw, 18px)',
            lineHeight: 1.6,
            color: '#D7E0DC',
            margin: '0 auto 40px',
            maxWidth: 680,
            textWrap: 'pretty',
          }}>If your customer support is starting to slip, or you are about to lose the one person holding it together, we can help. We will recruit, vet, place, train, and manage a senior, AI-augmented CS agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free.</p>

          <Button variant="on-dark" size="lg" href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call</Button>

          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: '#D7E0DC',
            margin: '20px 0 0',
            opacity: 0.85,
            letterSpacing: '0.02em',
          }}>30 minutes. No commitment. No credit card. You'll talk directly with our founding team.</p>
        </div>
      </Container>
    </section>
  );
}

// =============================================================
// SectionDivider — subtle hairline used between editorial sections
// =============================================================
function SectionDivider({ label, bg = 'paper' }) {
  const bgs = { paper: '#F7F2EB', butter: '#F8EBC9' };
  return (
    <div style={{ background: bgs[bg], padding: '0 0' }}>
      <Container narrow>
        <div style={{
          height: 1,
          background: '#D9CFBF',
          position: 'relative',
        }}>
          {label && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: bgs[bg],
              padding: '0 16px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: '#9E9388',
            }}>{label}</div>
          )}
        </div>
      </Container>
    </div>
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
      </Container>
      <style>{`
        @media (max-width: 720px) { .sig-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

Object.assign(window, {
  PageHeader, OverviewBox, LongForm, TestimonialFeature,
  MetricCallout, ShoutoutGrid, ShoutoutImageGrid, CTASection, SectionDivider,
  PhotoFrame, DropCap, PlaceholderCard,
});
