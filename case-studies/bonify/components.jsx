// xFusion case-study components — Bonify
const { useState, useEffect } = React;

/* ---------- Primitives ---------- */
function Container({ children, narrow = false, style = {} }) {
  return (
    <div style={{
      maxWidth: narrow ? 720 : 1200,
      margin: '0 auto',
      padding: '0 24px',
      ...style,
    }}>{children}</div>
  );
}

function Section({ children, bg = 'paper', padding = 'lg', style = {}, id }) {
  const bgs = {
    paper: '#F7F2EB',
    'paper-2': '#EFE8DD',
    butter: '#F8EBC9',
    'butter-soft': '#FBF1D9',
    forest: '#2C4A3E',
  };
  const pads = { sm: '48px 0', md: '72px 0', lg: '96px 0', xl: '120px 0' };
  return (
    <section id={id} style={{ background: bgs[bg], padding: pads[padding], ...style }}>
      {children}
    </section>
  );
}

function Eyebrow({ children, color = '#6B5F56', style = {} }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color,
      ...style,
    }}>{children}</div>
  );
}

function Button({ children, variant = 'primary', size = 'md', href, style = {}, target, rel }) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13 },
    md: { padding: '12px 22px', fontSize: 15 },
    lg: { padding: '16px 28px', fontSize: 16 },
  };
  let bg, color, border;
  if (variant === 'primary') {
    bg = pressed ? '#863818' : hover ? '#A0451F' : '#B8512C';
    color = '#F7F2EB';
    border = 'none';
  } else if (variant === 'on-dark') {
    bg = pressed ? '#A0451F' : hover ? '#A0451F' : '#B8512C';
    color = '#F7F2EB';
    border = 'none';
  } else if (variant === 'ghost-dark') {
    bg = hover ? 'rgba(247,242,235,0.08)' : 'transparent';
    color = '#F7F2EB';
    border = '1px solid rgba(247,242,235,0.4)';
  }
  const Tag = href ? 'a' : 'button';
  const isExternal = href && /^https?:\/\//.test(href);
  const computedTarget = target || (isExternal ? '_blank' : undefined);
  const computedRel = rel || (isExternal ? 'noopener noreferrer' : undefined);
  const linkAttrs = href ? { href, target: computedTarget, rel: computedRel } : {};
  return (
    <a href={href || '#'}
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => { setHover(false); setPressed(false); }}
       onMouseDown={() => setPressed(true)}
       onMouseUp={() => setPressed(false)}
       style={{
         background: bg, color, border, borderRadius: 8,
         fontFamily: "'IBM Plex Sans', sans-serif",
         fontWeight: 500, lineHeight: 1, textDecoration: 'none',
         display: 'inline-block',
         transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)',
         transform: pressed ? 'translateY(1px)' : 'translateY(0)',
         ...sizes[size], ...style,
       }}>{children}</a>
  );
}

/* ---------- Photo (renders real <img>, placeholder fallback) ---------- */
function PortraitPlaceholder({ name = 'John Carbone', label = 'images/john-carbone-bonify.png',
                                src = '../../images/john-carbone-bonify.png',
                                alt,
                                width = 220, ratio = '4/5', tone = 'butter' }) {
  const [errored, setErrored] = useState(false);

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={alt || `${name}, Founder of Bonify`}
        onError={() => setErrored(true)}
        style={{
          width,
          aspectRatio: ratio,
          objectFit: 'cover',
          borderRadius: 12,
          flexShrink: 0,
          display: 'block',
          border: '1px solid rgba(31,26,23,0.08)',
        }}
      />
    );
  }

  const tones = {
    clay: { bg: 'linear-gradient(155deg,#B8512C 0%,#863818 100%)', fg: '#F0D9A8' },
    butter: { bg: 'linear-gradient(155deg,#F0D9A8 0%,#D9B97A 100%)', fg: '#3A322D' },
    forest: { bg: 'linear-gradient(155deg,#2C4A3E 0%,#1F352B 100%)', fg: '#F0D9A8' },
    paper: { bg: 'linear-gradient(155deg,#EFE8DD 0%,#D9CFBF 100%)', fg: '#3A322D' },
  };
  const t = tones[tone];
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return (
    <div style={{
      width, aspectRatio: ratio, borderRadius: 12,
      background: t.bg, color: t.fg, position: 'relative',
      display: 'flex', alignItems: 'flex-end', padding: 16, overflow: 'hidden',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 14, right: 18,
        fontFamily: "'Source Serif 4', serif",
        fontSize: Math.round(width * 0.4),
        opacity: 0.32, lineHeight: 1, fontWeight: 400,
      }}>{initials}</div>
      <div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, fontWeight: 500, textTransform: 'uppercase',
          letterSpacing: '0.14em', opacity: 0.75, marginBottom: 4,
        }}>placeholder</div>
        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 11, opacity: 0.85, lineHeight: 1.35,
        }}>{label}</div>
      </div>
    </div>
  );
}

/* ---------- Nav ---------- */
// Site nav -- shared structure across all pages.
// Individual case study: prefix = '../../', active = 'case-studies'.
function Nav({ active = 'case-studies', prefix = '../../' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
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
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(247,242,235,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #D9CFBF' : '1px solid transparent',
      transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)',
    }}>
      <Container>
        <div style={{ height: 72, display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href={homeHref} aria-label="xFusion home" style={{ display: 'flex', alignItems: 'baseline', gap: 0, textDecoration: 'none', flexShrink: 0 }}>
            <img src="../../assets/xfusion-logo.png" alt="xFusion" style={{ height: 36, width: "auto", display: "block" }} />
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
            <a href="https://savvycal.com/xfusion/lets-chat" style={ctaStyle} target="_blank" rel="noopener noreferrer">Book a Discovery Call</a>
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
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
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
              <a href="https://savvycal.com/xfusion/lets-chat" style={{ ...ctaStyle, fontSize: 15, padding: '12px 20px', display: 'block', textAlign: 'center' }} target="_blank" rel="noopener noreferrer">
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

/* ---------- Page header / hero ---------- */
function PageHeader() {
  return (
    <Section bg="paper" padding="lg" style={{ paddingTop: 64, paddingBottom: 56 }}>
      <Container>
        {/* Breadcrumb */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12, color: '#6B5F56', marginBottom: 56,
          letterSpacing: '0.04em',
        }}>
          <a href="#" style={{ color: '#6B5F56', textDecoration: 'none' }}>Case studies</a>
          <span style={{ margin: '0 10px', opacity: 0.5 }}>/</span>
          <span style={{ color: '#1F1A17' }}>Bonify</span>
        </div>

        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: 64, alignItems: 'end',
        }}>
          <div>
            <Eyebrow color="#B8512C" style={{ marginBottom: 24 }}>
              Case study · 05
            </Eyebrow>
            <h1 className="display" style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(56px, 9vw, 120px)',
              fontWeight: 400, lineHeight: 0.96,
              letterSpacing: '-0.025em',
              margin: '0 0 32px',
              color: '#1F1A17',
            }}>Bonify</h1>
            <p style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              lineHeight: 1.3, fontWeight: 400,
              color: '#3A322D', maxWidth: 720,
              margin: 0, textWrap: 'balance',
              fontStyle: 'normal',
            }}>
              How Bonify took 95% of support tickets off the founders while holding a 4.9 customer rating on Shopify.
            </p>
          </div>
          <div className="hero-photo" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PortraitPlaceholder name="John Carbone" tone="butter"
                                 width={260} ratio="4/5"
                                 label="images/john-carbone-bonify.png" />
          </div>
        </div>

        {/* Caption */}
        <div style={{
          marginTop: 16, fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, color: '#6B5F56', letterSpacing: '0.06em',
          textAlign: 'right',
        }} className="hero-caption">
          John Carbone, Founder, Bonify
        </div>
      </Container>
      <style>{`
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; align-items: start !important; }
          .hero-photo { justify-content: flex-start !important; }
          .hero-caption { text-align: left !important; }
        }
      `}</style>
    </Section>
  );
}

/* ---------- Overview box (table) ---------- */
function OverviewBox() {
  const rows = [
    ['Industry', 'SaaS / Shopify app development'],
    ['Country', 'United States'],
    ['Challenge', "Founders pulled into day-to-day support tickets and live chat as Bonify's app catalog and customer base grew, blocking strategic work and product development."],
    ['Solution', 'xFusion placed and managed senior, dedicated support agents (Kenny and Patrick) trained deeply in Bonify\u2019s apps, taking over ticket handling and live chat.'],
    ['Results', "4.9 customer satisfaction score on Shopify since May 2020, reply times cut to roughly half what the founders were achieving, and John\u2019s share of ticket replies dropped to under 5%."],
  ];
  return (
    <Section bg="paper" padding="md" style={{ paddingTop: 0, paddingBottom: 88 }}>
      <Container>
        <div style={{
          background: '#F8EBC9',
          borderRadius: 12,
          border: '1px solid #E8D9A8',
          overflow: 'hidden',
        }}>
          <table style={{
            width: '100%', borderCollapse: 'collapse',
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            <tbody>
              {rows.map(([label, value], i) => (
                <tr key={label} style={{
                  borderBottom: i < rows.length - 1 ? '1px solid #E8D9A8' : 'none',
                }}>
                  <td className="ov-label" style={{
                    width: 180, padding: '20px 24px',
                    verticalAlign: 'top',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12, fontWeight: 500,
                    textTransform: 'uppercase', letterSpacing: '0.14em',
                    color: '#6B5F56',
                  }}>{label}</td>
                  <td className="ov-value" style={{
                    padding: '20px 24px 20px 0',
                    fontSize: 16, lineHeight: 1.55,
                    color: '#1F1A17',
                  }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
      <style>{`
        @media (max-width: 700px) {
          .ov-label { display: block; width: auto !important; padding: 16px 20px 4px !important; }
          .ov-value { display: block; padding: 0 20px 16px !important; }
        }
      `}</style>
    </Section>
  );
}

/* ---------- Long-form section ---------- */
function LongForm({ heading, paragraphs, bg = 'paper', children, eyebrow }) {
  return (
    <Section bg={bg} padding="lg">
      <Container narrow>
        {eyebrow && <Eyebrow color="#6B5F56" style={{ marginBottom: 16 }}>{eyebrow}</Eyebrow>}
        {heading && (
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 400, lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 40px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>{heading}</h2>
        )}
        {paragraphs.map((p, i) => {
          if (typeof p === 'string') {
            return (
              <p key={i} style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 18, lineHeight: 1.65,
                color: '#1F1A17', margin: '0 0 20px',
                textWrap: 'pretty',
              }}>{p}</p>
            );
          }
          return <React.Fragment key={i}>{p}</React.Fragment>;
        })}
        {children}
      </Container>
    </Section>
  );
}

/* ---------- Inline pull quote (for Solution section) ---------- */
function InlinePullquote({ quote, attribution }) {
  return (
    <figure style={{
      margin: '40px 0',
      padding: '0 0 0 28px',
      borderLeft: '3px solid #B8512C',
    }}>
      <blockquote style={{
        margin: 0,
        fontFamily: "'Source Serif 4', serif",
        fontSize: 'clamp(22px, 2.4vw, 28px)',
        fontStyle: 'italic',
        lineHeight: 1.35,
        color: '#1F1A17',
        fontWeight: 400,
        textWrap: 'pretty',
      }}>
        “{quote}”
      </blockquote>
      <figcaption style={{
        marginTop: 16,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12, letterSpacing: '0.08em',
        color: '#6B5F56',
      }}>
        {attribution}
      </figcaption>
    </figure>
  );
}

/* ---------- Lead testimonial (Section 4) ---------- */
function TestimonialFeature() {
  return (
    <Section bg="butter" padding="lg">
      <Container>
        <div className="tf-grid" style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 56, alignItems: 'center',
          maxWidth: 1080, margin: '0 auto',
        }}>
          <div>
            <PortraitPlaceholder name="John Carbone" tone="clay"
                                 width={300} ratio="4/5"
                                 label="images/john-carbone-bonify.png" />
          </div>
          <div>
            <svg width="44" height="36" viewBox="0 0 24 24" fill="#B8512C" stroke="none"
                 style={{ marginBottom: 20 }}>
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
            <blockquote style={{
              margin: '0 0 24px',
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(28px, 3.4vw, 40px)',
              fontStyle: 'italic',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#1F1A17',
              fontWeight: 400,
              textWrap: 'balance',
            }}>
              “I forget they're technically not in-house. They truly are part of the Bonify team.”
            </blockquote>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 17, lineHeight: 1.6,
              color: '#3A322D', margin: '0 0 24px',
              maxWidth: 620, textWrap: 'pretty',
            }}>
              Working with xFusion led to a monumental improvement in our customer experience. They found us the perfect reps with complete alignment to our mission, and they've handled the vast majority of our tickets while maintaining a 4.9 customer satisfaction score on Shopify since May 2020.
            </p>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, letterSpacing: '0.1em',
              color: '#6B5F56',
              textTransform: 'none',
            }}>
              John Carbone · Founder · Bonify
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 820px) {
          .tf-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </Section>
  );
}

/* ---------- Metric callout (Section 5) ---------- */
function MetricCallout() {
  return (
    <Section bg="forest" padding="xl">
      <Container>
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
          <Eyebrow color="#F0D9A8" style={{ marginBottom: 32 }}>The proof</Eyebrow>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(96px, 18vw, 240px)',
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            color: '#F0D9A8',
            margin: '0 0 24px',
          }}>
            4.9
            <span style={{
              fontSize: '0.32em',
              letterSpacing: '0.04em',
              fontFamily: "'JetBrains Mono', monospace",
              fontStyle: 'normal',
              verticalAlign: 'baseline',
              marginLeft: '0.3em',
              color: '#F7F2EB',
            }}>rating</span>
          </div>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(17px, 1.6vw, 20px)',
            lineHeight: 1.55,
            color: '#F7F2EB',
            opacity: 0.92,
            margin: 0,
            maxWidth: 720, marginLeft: 'auto', marginRight: 'auto',
            textWrap: 'pretty',
          }}>
            Customer satisfaction score on Shopify, sustained from May 2020 to present, while the xFusion team handled <strong style={{ color: '#F0D9A8', fontWeight: 600 }}>26,436 tickets</strong> across the first three years of the partnership.
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- Shoutout grid (Sections 8 + 9) ---------- */
function ShoutoutGrid({ heading, eyebrow, cards, bg = 'paper', kind = 'leader' }) {
  return (
    <Section bg={bg} padding="lg">
      <Container>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          {eyebrow && <Eyebrow color="#6B5F56" style={{ marginBottom: 16 }}>{eyebrow}</Eyebrow>}
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400, lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0, color: '#1F1A17',
            textWrap: 'balance',
          }}>{heading}</h2>
        </div>
        <div className="sg-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {cards.map((c, i) => (
            <ShoutoutCard key={i} {...c} kind={kind} />
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 1024px) { .sg-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .sg-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

function ShoutoutCard({ quote, name, role, source, store, country, date, kind = 'leader' }) {
  // Shopify reviews use store + country + date; Slack quotes use name + role
  return (
    <div style={{
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      transition: 'box-shadow 200ms cubic-bezier(0.4,0,0.6,1), transform 200ms cubic-bezier(0.4,0,0.6,1)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(31, 26, 23, 0.06), 0 1px 2px rgba(31, 26, 23, 0.04)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'translateY(0)';
    }}>
      {/* Source tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, fontWeight: 500, letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: kind === 'leader' ? '#2C4A3E' : '#B8512C',
          background: kind === 'leader' ? '#D7E0DC' : '#F2D9CB',
          padding: '4px 10px',
          borderRadius: 999,
        }}>
          {kind === 'leader' ? 'Slack' : 'Five-star review'}
        </div>
        {date && (
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, color: '#6B5F56', letterSpacing: '0.04em',
          }}>{date}</div>
        )}
      </div>
      {/* Quote */}
      <p style={{
        margin: 0,
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 15, lineHeight: 1.6,
        color: '#1F1A17',
        flex: 1, textWrap: 'pretty',
      }}>
        {quote}
      </p>
      {/* Attribution */}
      <div style={{ paddingTop: 16, borderTop: '1px solid #E6DCCB' }}>
        {kind === 'leader' ? (
          <div>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14, fontWeight: 600, color: '#1F1A17',
            }}>{name}</div>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 13, color: '#6B5F56',
            }}>{role}</div>
          </div>
        ) : (
          <div>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14, fontWeight: 600, color: '#1F1A17',
            }}>{store}</div>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 13, color: '#6B5F56',
            }}>{country}</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- CTA Section (Forest band) ---------- */
function CTASection() {
  return (
    <Section bg="forest" padding="lg" id="cta">
      <Container>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow color="#F0D9A8" style={{ marginBottom: 24 }}>Ready when you are</Eyebrow>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 24px', color: '#F7F2EB',
            textWrap: 'balance',
          }}>
            Want to see if we can help you too?
          </h2>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 18, lineHeight: 1.6,
            color: '#F0D9A8', opacity: 0.95,
            margin: '0 auto 36px', maxWidth: 640,
            textWrap: 'pretty',
          }}>
            If your customer support is starting to slip, or you are about to lose the one person holding it together, we can help. We will recruit, vet, place, train, and manage a senior, AI-trained support agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free.
          </p>
          <Button variant="on-dark" size="lg" href="#">Book a Discovery Call</Button>
          <p style={{
            marginTop: 20, marginBottom: 0,
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14, color: '#F0D9A8', opacity: 0.78,
          }}>
            30 minutes. No commitment. No credit card. You'll talk directly with our founding team.
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const cols = [
    { title: 'Product',  links: [
      ['Pricing',       '../../#pricing'],
      ['Case studies',  '../../case-studies/'],
    ]},
    { title: 'Company',  links: [
      ['About',    '../../about/'],
      ['Careers',  '../../careers/'],
      ['Contact', '../../contact/'],
    ]},
    { title: 'Resources', links: [
      ['FAQ',           '../../#faq'],
      ['Blog',          '../../blog/'],
    ]},
    { title: 'Legal',    links: [
      ['Privacy',   '../../privacy/'],
      ['DPA',       '../../dpa/'],
      ['Security',  '../../security/'],
    ]},
  ];
  const FOREST  = '#2C4A3E';
  const PAPER   = '#F7F2EB';
  const BUTTER  = '#F0D9A8';
  const DIVIDER = 'rgba(247, 242, 235, 0.14)';
  const MUTED   = 'rgba(247, 242, 235, 0.65)';
  return (
    <footer style={{ background: FOREST, color: PAPER }}>
      <Container>
        <div className="footer-top" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'center', paddingTop: 64, paddingBottom: 40, borderBottom: `1px solid ${DIVIDER}` }}>
          <div>
            <a href="../../" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14, textDecoration: 'none' }}>
              <img src="../../assets/xfusion-logo-on-dark.png" alt="xFusion" style={{ height: 36, width: "auto", display: "block" }} />
              
            </a>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: 18, lineHeight: 1.5, color: BUTTER, margin: 0, maxWidth: 480, fontStyle: 'italic', fontWeight: 400 }}>
              Senior, AI-trained customer support agents for small businesses. Since 2020.
            </p>
          </div>
          
        </div>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, paddingTop: 48, paddingBottom: 40 }}>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.14em', color: MUTED, marginBottom: 18 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="footer-link" style={{ color: PAPER, textDecoration: 'none', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15, lineHeight: 1.4 }}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-legal" style={{ paddingTop: 24, paddingBottom: 32, borderTop: `1px solid ${DIVIDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: MUTED, flexWrap: 'wrap', gap: 12 }}>
          <div>© 2026 xFusion. All rights reserved.</div>
          <div>Made with care across the Philippines, Kenya, and the United States.</div>
        </div>
      </Container>
      <style>{`
        .footer-link:hover { color: ${BUTTER}; }
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr !important; gap: 20px !important; }
          .footer-cta { justify-content: flex-start !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-legal { flex-direction: column; align-items: flex-start !important; }
        }
        @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }
      `}</style>
    </footer>
  );
}

/* ---------- Image-based shoutout grid (sourced from xfusion.io originals) ---------- */
function ShoutoutImageGrid({ heading, eyebrow, intro, images, bg = 'paper' }) {
  return (
    <Section bg={bg} padding="lg">
      <Container>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          {eyebrow && <Eyebrow color="#6B5F56" style={{ marginBottom: 16 }}>{eyebrow}</Eyebrow>}
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400, lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 16px', color: '#1F1A17',
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
  Container, Section, Eyebrow, Button, PortraitPlaceholder,
  Nav, PageHeader, OverviewBox, LongForm, InlinePullquote,
  TestimonialFeature, MetricCallout, ShoutoutGrid, ShoutoutImageGrid, CTASection, Footer,
});
