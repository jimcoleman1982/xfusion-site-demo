// Case-study-specific components for Revy page

// Site nav -- shared structure across all pages.
// Individual case study: prefix = '../../', active = 'case-studies'.
function CaseStudyNav({ active = 'case-studies', prefix = '../../' }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const homeHref = prefix === '' ? './' : prefix;
  const links = [
    { id: 'home',         label: 'Home',         href: homeHref },
    { id: 'about',        label: 'About',        href: prefix + 'about/' },
    { id: 'case-studies', label: 'Case studies', href: prefix + 'case-studies/' },
    { id: 'blog',         label: 'Blog',         href: prefix + 'blog/' },
  ];

  const linkBase = {
    color: '#1F1A17',
    textDecoration: 'none',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 14,
    whiteSpace: 'nowrap',
    paddingBottom: 4,
  };

  const ctaStyle = {
    background: '#B8512C',
    color: '#F7F2EB',
    border: 'none',
    borderRadius: 8,
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontWeight: 500,
    fontSize: 13,
    padding: '8px 14px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    lineHeight: 1,
    transition: 'background 160ms cubic-bezier(0.4,0,0.6,1)',
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(247, 242, 235, 0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #D9CFBF' : '1px solid transparent',
      transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)',
    }}>
      <Container>
        <div style={{ height: 72, display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href={homeHref} aria-label="xFusion home" style={{
            display: 'flex', alignItems: 'baseline', gap: 0, textDecoration: 'none', flexShrink: 0,
          }}>
            <span style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 28, fontWeight: 600, letterSpacing: '-0.025em', color: '#1F1A17', lineHeight: 1,
            }}>
              <span style={{ color: '#B8512C' }}>x</span>Fusion<span style={{ color: '#B8512C' }}>.</span>
            </span>
          </a>

          <div className="nav-links" style={{ display: 'flex', gap: 28, marginLeft: 16 }}>
            {links.map(l => {
              const isActive = l.id === active;
              return (
                <a key={l.id} href={l.href}
                   aria-current={isActive ? 'page' : undefined}
                   style={{
                     ...linkBase,
                     fontWeight: isActive ? 500 : 400,
                     borderBottom: isActive ? '1.5px solid #B8512C' : '1.5px solid transparent',
                   }}>{l.label}</a>
              );
            })}
          </div>

          <div className="nav-cta" style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="https://savvycal.com/xfusion/lets-chat" style={ctaStyle}>Book a Discovery Call</a>
          </div>

          <button
            className="nav-burger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              display: 'none',
              marginLeft: 'auto',
              background: 'transparent',
              border: '1px solid #B7A993',
              borderRadius: 8,
              padding: 8,
              cursor: 'pointer',
              color: '#1F1A17',
            }}>
            <Icon name={open ? 'x' : 'menu'} size={20} />
          </button>
        </div>

        {open && (
          <div className="nav-mobile-panel" style={{
            display: 'none',
            paddingBottom: 16,
            paddingTop: 8,
            borderTop: '1px solid #D9CFBF',
          }}>
            {links.map(l => {
              const isActive = l.id === active;
              return (
                <a key={l.id} href={l.href} onClick={() => setOpen(false)} style={{
                  display: 'block',
                  padding: '14px 4px',
                  color: '#1F1A17',
                  textDecoration: 'none',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 16,
                  fontWeight: isActive ? 600 : 400,
                  borderBottom: '1px solid #EFE8DD',
                }}>{l.label}</a>
              );
            })}
            <div style={{ marginTop: 16 }}>
              <a href="https://savvycal.com/xfusion/lets-chat" style={{ ...ctaStyle, fontSize: 15, padding: '12px 20px', display: 'block', textAlign: 'center' }}>
                Book a Discovery Call
              </a>
            </div>
          </div>
        )}
      </Container>
      <style>{`
        @media (max-width: 820px) {
          .nav-links { display: none !important; }
          .nav-cta   { display: none !important; }
          .nav-burger { display: inline-flex !important; align-items: center; justify-content: center; }
          .nav-mobile-panel { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// Eyebrow with current case-study number
function CaseHeader({ number, client, subhead, photoSrc, photoName }) {
  return (
    <Section bg="paper" padding="lg" style={{ paddingBottom: 32 }}>
      <Container>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          {/* Breadcrumb back link */}
          <div style={{ marginBottom: 32 }}>
            <a href="#" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: '0.04em',
              color: '#6B5F56',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <Icon name="arrow" size={14} style={{ transform: 'scaleX(-1)' }} />
              All case studies
            </a>
          </div>

          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: '#B8512C',
            marginBottom: 24,
          }}>
            Case study <span style={{ color: '#9E9388', margin: '0 8px' }}>·</span> {number}
          </div>

          <h1 className="cs-title" style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(56px, 10vw, 120px)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            margin: '0 0 32px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            {client}
          </h1>

          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(20px, 2.2vw, 26px)',
            lineHeight: 1.4,
            fontWeight: 300,
            color: '#3A322D',
            margin: '0 0 56px',
            maxWidth: 720,
            textWrap: 'pretty',
          }}>
            {subhead}
          </p>

          {/* Photo */}
          <div className="cs-photo-row" style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: 32,
            alignItems: 'end',
          }}>
            <RevyPhoto name={photoName} src={photoSrc} />
            <div style={{ paddingBottom: 8 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: '#9E9388',
                marginBottom: 8,
              }}>Featuring</div>
              <div style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 22,
                color: '#1F1A17',
                marginBottom: 4,
              }}>{photoName}</div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                color: '#6B5F56',
              }}>Founder, Revy</div>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 720px) {
          .cs-photo-row { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </Section>
  );
}

// The portrait — tries to load a real image, falls back to flat warm placeholder
function RevyPhoto({ name, src, ratio = '4/5', large = false }) {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);

  return (
    <div style={{
      aspectRatio: ratio,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
      background: 'linear-gradient(140deg, #B8512C 0%, #863818 60%, #5C2810 100%)',
    }}>
      {src && !errored && (
        <img
          src={src}
          alt={`Portrait of ${name}, founder of Revy`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 400ms cubic-bezier(0.2,0,0,1)',
          }}
        />
      )}
      {(!src || errored || !loaded) && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: 20,
          color: '#F0D9A8',
        }}>
          <div style={{
            position: 'absolute', top: 20, right: 24,
            fontFamily: "'Source Serif 4', serif",
            fontSize: large ? 140 : 96, fontWeight: 400,
            opacity: 0.32, lineHeight: 1, letterSpacing: '-0.04em',
          }}>
            {name.split(' ').map(s => s[0]).slice(0, 2).join('')}
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10, fontWeight: 500, textTransform: 'uppercase',
            letterSpacing: '0.16em', opacity: 0.8, marginBottom: 6,
          }}>Photo placeholder</div>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: large ? 28 : 20, lineHeight: 1.15,
          }}>{name}</div>
        </div>
      )}
    </div>
  );
}

// ---------------- Overview Box (5-row editorial table) ----------------
function OverviewBox({ rows }) {
  return (
    <Section bg="paper" padding="md" style={{ paddingTop: 24, paddingBottom: 80 }}>
      <Container>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{
            background: '#F8EBC9',
            borderRadius: 16,
            border: '1px solid #E6C683',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '20px 32px',
              borderBottom: '1px solid #E6C683',
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,255,255,0.25)',
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
                letterSpacing: '0.16em', color: '#7a5a10',
              }}>Overview</div>
            </div>
            <dl style={{ margin: 0 }}>
              {rows.map((r, i) => (
                <div key={r.label} className="ov-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: 32,
                  padding: '20px 32px',
                  borderBottom: i === rows.length - 1 ? 'none' : '1px solid rgba(184, 81, 44, 0.14)',
                }}>
                  <dt style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
                    letterSpacing: '0.16em', color: '#7a5a10',
                    paddingTop: 4,
                  }}>{r.label}</dt>
                  <dd style={{
                    margin: 0,
                    fontFamily: r.detail.length > 120
                      ? "'IBM Plex Sans', sans-serif"
                      : "'Source Serif 4', serif",
                    fontSize: r.detail.length > 120 ? 16 : 22,
                    fontWeight: r.detail.length > 120 ? 400 : 400,
                    lineHeight: r.detail.length > 120 ? 1.55 : 1.3,
                    color: '#1F1A17',
                    textWrap: 'pretty',
                  }}>{r.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 720px) {
          .ov-row { grid-template-columns: 1fr !important; gap: 8px !important; padding: 20px !important; }
        }
      `}</style>
    </Section>
  );
}

// ---------------- LongForm narrative section ----------------
function LongForm({ eyebrow, heading, paragraphs, bg = 'paper', dropCap = false }) {
  return (
    <Section bg={bg} padding="lg">
      <Container>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {eyebrow && (
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
              letterSpacing: '0.18em', color: '#B8512C',
              marginBottom: 20,
            }}>{eyebrow}</div>
          )}
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            margin: '0 0 40px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>{heading}</h2>
          <div className="lf-body">
            {paragraphs.map((p, i) => (
              <p key={i} style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 18,
                lineHeight: 1.65,
                color: '#1F1A17',
                margin: '0 0 24px',
                textWrap: 'pretty',
              }}>
                {dropCap && i === 0 ? <DropCap text={p} /> : p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function DropCap({ text }) {
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <>
      <span style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: 64,
        lineHeight: 0.85,
        fontWeight: 400,
        float: 'left',
        marginRight: 10,
        marginTop: 6,
        marginBottom: -2,
        color: '#B8512C',
      }}>{first}</span>{rest}
    </>
  );
}

// ---------------- Lead Testimonial ----------------
function TestimonialFeature({ pullQuote, fullQuote, name, role, company, photoSrc }) {
  return (
    <Section bg="paper-2" padding="lg">
      <Container>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{
            background: '#F7F2EB',
            border: '1px solid #D9CFBF',
            borderRadius: 16,
            padding: 'clamp(32px, 5vw, 64px)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: -28, left: 'clamp(32px, 5vw, 64px)',
              width: 56, height: 56, borderRadius: 999,
              background: '#B8512C',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#F7F2EB',
            }}>
              <Icon name="quote" size={26} fill="#F7F2EB" stroke={0} />
            </div>

            <div className="t-grid" style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 'clamp(24px, 4vw, 48px)',
              alignItems: 'start',
            }}>
              <div>
                <RevyPhoto name={name} src={photoSrc} ratio="4/5" />
              </div>
              <div>
                <blockquote style={{
                  margin: 0,
                  fontFamily: "'Source Serif 4', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(24px, 3vw, 34px)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.01em',
                  fontWeight: 400,
                  color: '#1F1A17',
                  textWrap: 'balance',
                  marginBottom: 32,
                }}>
                  &ldquo;{pullQuote}&rdquo;
                </blockquote>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: '#3A322D',
                  margin: '0 0 32px',
                  textWrap: 'pretty',
                }}>
                  {fullQuote}
                </p>
                <div style={{
                  paddingTop: 24,
                  borderTop: '1px solid #D9CFBF',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  color: '#1F1A17',
                  textTransform: 'uppercase',
                }}>
                  {name} <span style={{ color: '#9E9388', margin: '0 6px' }}>·</span>{' '}
                  {role} <span style={{ color: '#9E9388', margin: '0 6px' }}>·</span>{' '}
                  {company}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 760px) {
          .t-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}

// ---------------- Metric callout ----------------
function MetricCallout({ headline, supporting, variant = 'forest' }) {
  const styles = variant === 'forest'
    ? { bg: '#2C4A3E', fg: '#F7F2EB', accent: '#F0D9A8', sub: 'rgba(247,242,235,0.78)' }
    : { bg: '#F8EBC9', fg: '#1F1A17', accent: '#B8512C', sub: '#3A322D' };

  return (
    <Section bg="paper" padding="md" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <Container>
        <div style={{
          background: styles.bg,
          borderRadius: 24,
          padding: 'clamp(48px, 7vw, 96px) clamp(32px, 6vw, 80px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
            letterSpacing: '0.18em', color: styles.accent,
            marginBottom: 32,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{
              display: 'inline-block', width: 24, height: 1, background: styles.accent,
            }} />
            The result
          </div>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(48px, 8vw, 104px)',
            fontWeight: 400,
            lineHeight: 0.98,
            letterSpacing: '-0.035em',
            color: styles.fg,
            margin: '0 0 32px',
            textWrap: 'balance',
            maxWidth: 1100,
          }}>
            {headline}
          </div>
          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(18px, 2vw, 22px)',
            lineHeight: 1.5,
            color: styles.sub,
            maxWidth: 720,
            margin: 0,
            textWrap: 'pretty',
          }}>
            {supporting}
          </div>

          {/* decorative star marker */}
          <div style={{
            position: 'absolute',
            top: 'clamp(32px, 6vw, 80px)',
            right: 'clamp(32px, 6vw, 80px)',
            display: 'flex', gap: 4,
            color: styles.accent,
          }} aria-hidden="true">
            {[0,1,2,3,4].map(i => (
              <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ---------------- Shoutout grid (placeholders) ----------------
function ShoutoutGrid({ eyebrow, heading, caption, count = 3, kind = 'leader', bg = 'paper-2' }) {
  return (
    <Section bg={bg} padding="lg">
      <Container>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
              letterSpacing: '0.18em', color: '#B8512C',
              marginBottom: 16,
            }}>{eyebrow}</div>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 16px',
              color: '#1F1A17',
              textWrap: 'balance',
            }}>{heading}</h2>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 16,
              fontStyle: 'italic',
              color: '#6B5F56',
              margin: 0,
            }}>{caption}</p>
          </div>

          <div className="so-grid" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${count}, 1fr)`,
            gap: 24,
          }}>
            {Array.from({ length: count }).map((_, i) => (
              <PlaceholderCard key={i} kind={kind} index={i} />
            ))}
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 980px) { .so-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .so-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

function PlaceholderCard({ kind, index }) {
  const label = kind === 'leader' ? '[Leader shoutout coming soon]' : '[Customer shoutout coming soon]';
  const attrLabel = kind === 'leader' ? 'Revy team member' : 'Shopify merchant';
  return (
    <div style={{
      background: '#F7F2EB',
      border: '1px dashed #B7A993',
      borderRadius: 12,
      padding: 28,
      minHeight: 240,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 16, right: 16,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: '#9E9388',
      }}>0{index + 1}</div>

      <Icon name="quote" size={24} color="#D9CFBF" fill="#D9CFBF" stroke={0} />

      <div style={{
        fontFamily: "'Source Serif 4', serif",
        fontStyle: 'italic',
        fontSize: 18,
        lineHeight: 1.4,
        color: '#9E9388',
        flex: 1,
      }}>
        {label}
      </div>

      {kind === 'customer' && (
        <div style={{
          display: 'flex', gap: 2,
          color: '#D9CFBF',
        }}>
          {[0,1,2,3,4].map(i => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z"/>
            </svg>
          ))}
        </div>
      )}

      <div style={{
        paddingTop: 16,
        borderTop: '1px solid #E6DCCB',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: '#EFE8DD',
          border: '1px dashed #B7A993',
        }} />
        <div>
          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            color: '#9E9388',
          }}>[Name]</div>
          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 12, color: '#9E9388',
          }}>{attrLabel}</div>
        </div>
      </div>
    </div>
  );
}

// ---------------- Final CTA band ----------------
function CTABand() {
  return (
    <section style={{ background: '#2C4A3E', padding: 'clamp(64px, 10vw, 128px) 0' }}>
      <Container>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'left' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
            letterSpacing: '0.18em', color: '#F0D9A8',
            marginBottom: 24,
          }}>Ready when you are</div>

          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#F7F2EB',
            margin: '0 0 32px',
            textWrap: 'balance',
          }}>
            Want to see if we can help you too?
          </h2>

          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(17px, 1.6vw, 19px)',
            lineHeight: 1.6,
            color: 'rgba(247,242,235,0.86)',
            margin: '0 0 40px',
            maxWidth: 720,
            textWrap: 'pretty',
          }}>
            If your customer support is starting to slip, or you are a solo founder drowning in the inbox while your product waits, we can help. We will recruit, vet, place, train, and manage a senior, AI-augmented CS agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <Button variant="primary" size="lg" style={{
              padding: '18px 28px',
              fontSize: 17,
            }} href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call
            </Button>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14,
              color: 'rgba(247,242,235,0.7)',
              maxWidth: 540,
              lineHeight: 1.5,
            }}>
              30 minutes. No commitment. No credit card. You'll talk directly with our founding team.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ---------------- Footer ----------------
function CaseStudyFooter() {
  const cols = [
    { title: 'Product', links: [
      { label: 'How it works', href: '../../#how-it-works' },
      { label: 'Who we serve', href: '../../#who-we-serve' },
      { label: 'Pricing', href: '../../#pricing' },
      { label: 'Case studies', href: '../' },
    ]},
    { title: 'Company', links: [
      { label: 'About', href: '../../about/' },
      { label: 'Careers', href: '../../careers/' },
      { label: 'Press', href: '../../press/' },
      { label: 'Contact', href: "https://savvycal.com/xfusion/lets-chat" },
    ]},
    { title: 'Resources', links: [
      { label: 'Blog', href: '../../blog/' },
      { label: 'Hiring guide', href: '../../hiring-guide/' },
      { label: 'CS handbook', href: '../../cs-handbook/' },
      { label: 'Status', href: '#status' },
    ]},
    { title: 'Legal', links: [
      { label: 'Privacy', href: '../../privacy/' },
      { label: 'Terms', href: '../../terms/' },
      { label: 'DPA', href: '../../dpa/' },
      { label: 'Security', href: '../../security/' },
    ]},
  ];
  return (
    <footer style={{ background: '#1F1A17', color: '#F7F2EB', padding: '64px 0 32px' }}>
      <Container>
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 48,
        }}>
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 16,
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 9,
                background: '#B8512C', color: '#F7F2EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Source Serif 4', serif",
                fontWeight: 500, fontSize: 22, letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>xF</span>
              <span style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 26, fontWeight: 500,
                letterSpacing: '-0.025em',
                color: '#F7F2EB',
              }}>xFusion</span>
            </div>
            <p style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: '#9E9388',
              maxWidth: 280,
              margin: 0,
            }}>
              Senior, AI-augmented customer support agents for small businesses. Since 2020.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{
                fontSize: 12, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: '#9E9388', marginBottom: 16,
              }}>{col.title}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {col.links.map(l => (
                  <li key={l.label} style={{ marginBottom: 10 }}>
                    <a href={l.href} style={{
                      color: '#F7F2EB', textDecoration: 'none', fontSize: 14,
                    }}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          paddingTop: 24,
          borderTop: '1px solid #3A322D',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 13, color: '#9E9388',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div>© 2026 xFusion, Inc.</div>
          <div>Made by humans. Used with care.</div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}

// Image-based shoutout grid (sourced from xfusion.io originals)
function ShoutoutImageGrid({ eyebrow, heading, intro, images, bg = 'paper-2' }) {
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
  CaseStudyNav, CaseHeader, OverviewBox, LongForm,
  TestimonialFeature, MetricCallout, ShoutoutGrid, ShoutoutImageGrid,
  CTABand, CaseStudyFooter, RevyPhoto,
});
