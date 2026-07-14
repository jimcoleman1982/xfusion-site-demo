// Data-driven vertical landing page template (Task 10).
// Layout is defined ONCE here; per-page content comes from window.XF_LP,
// set inline in each page shell. FAQ entries come from the page's
// XF_LP_FAQ array (also used by build/inject-meta.js to generate the
// page's FAQPage JSON-LD, so visible FAQ and schema can never drift).
// Proof strip renders from window.XF_PROOF_POINTS (defined once in
// LeadModal.jsx) so the claims can never fork per page.
//
// XF_LP shape:
// {
//   eyebrow, h1, sub,                       // hero
//   microcopy?,                             // optional LeadCapture microcopy override (string)
//   metrics: [{ num, text, href? }],        // 0-3 verified stats (empty = section hidden)
//   values: [{ title, text }],              // 3 message-matched value blocks
//   tickets?: [string],                     // "what your agent takes off your plate" chips (empty/absent = hidden)
//   ticketsTitle?,                          // optional heading override for the tickets grid
//   steps?: [{ title, text }],              // "how it works" override (default: XF_LP_STEPS)
//   stepsLead?,                             // per-vertical one-liner under the "How it works" H2
//   learnTitle?, learnIntro?,               // per-vertical framing for the shared learn-phases section
//   hideSteps?, hideComparison?, hideTeam?, hideLearn?, // opt out of shared sections per page
//   quotes: [{ text, name, role, img }],    // 0-2 verified testimonials
//   caseStudies: [{ label, href, stat?, statText? }], // related case studies (stat -> card layout)
//   resources?: [{ title, href }],          // "keep reading" blog links (empty/absent = hidden)
//   clientsNote?,                           // optional plain-text line (e.g. named clients)
//   closingH2, closingText,
// }

// Client roster shown on every LP trust strip (same list as the homepage marquee in Hero.jsx).
const CLIENT_NAMES = ['Tolstoy', 'SavvyCal', 'Bonify', 'Ordered Magic', 'TheReceptionist', 'SkyFi',
  'Revy Apps', 'Crowd Cow', 'Arbio', 'Nextmune', 'Aheadworks', 'Joli',
  'Sign In Solutions', 'Kioskbuddy', 'Common Services', 'Finger Ink',
  'Langify', 'Aligned', 'Autism Products'];

// Shared "How it works" steps. Every claim here also lives on /pricing/ and /faq/.
const XF_LP_STEPS = [
  { title: 'Book a 30-minute discovery call', text: "Bring your messiest support problem. If we're not the right fit, we'll tell you on the call." },
  { title: 'Meet your candidates in about 14 days', text: 'A candidate list lands in your inbox, each with a Zoom recording so you can judge English and presence yourself before you meet anyone.' },
  { title: 'Start the 30-day risk-free trial', text: "Your agent works your real queue for 30 full days. Not satisfied, for any reason? You walk away without paying anything." },
  { title: 'We manage from there', text: 'QA on real tickets, coaching, culture and engagement, backup coverage, and an account manager. Month-to-month, no long-term contract.' },
];

// Shared three-way comparison. Cost figures come from /pricing/.
const XF_LP_COMPARISON = [
  {
    name: 'Hire in-house',
    rows: ['$6,600 to $8,300+ per month for a senior U.S. rep', 'Months of sourcing and interviews', 'You run training, payroll, QA, and coverage', 'Good ones often quit within 18 months'],
  },
  {
    name: 'Typical BPO',
    rows: ['Looks cheap per seat, junior reps reading scripts', 'Shared or rotating agents who never learn your product', 'You chase quality instead of doing your job', 'Quarterly or annual contracts'],
  },
  {
    name: 'xFusion',
    featured: true,
    rows: ['$3,900/mo all-in, one flat rate', 'A dedicated senior, AI-trained agent', 'We run recruiting, training, payroll, QA, and backup', 'Month-to-month, 30-day risk-free trial'],
  },
];

// Shared "how your agent learns" phases. Source: Partnership Onboarding Guide
// (client-led initial training, review sessions, draft mode, approved go-live).
const XF_LP_LEARN = [
  { label: 'Phase 1', title: 'You teach the first agent', text: 'One round of training led by your team: product, brand and tone, your helpdesk, escalation paths. Every agent after that, we train.' },
  { label: 'Phase 2', title: 'They study before they speak', text: 'Review sessions to absorb what they learned and prepare questions, while we turn it into documented processes your whole future team inherits.' },
  { label: 'Phase 3', title: 'Draft mode', text: 'For the first days, every reply is a draft: reviewed by their xFusion team leader, then approved by you, before a customer ever sees it.' },
  { label: 'Phase 4', title: 'Live, with guardrails', text: 'Replies go live only with your sign-off. SLAs set together, KPIs tracked, QA continuous, and escalations routed to the right team.' },
];

// Shared "people behind your queue" block. Same account managers as /about/.
const XF_LP_TEAM = [
  { name: 'Martin Onami', role: 'Account Manager', img: '/images/martin-onami-lp.webp' },
  { name: 'Reggie Rendal', role: 'Account Manager', img: '/images/reggie-rendal-lp.webp' },
  { name: 'Marie Medina', role: 'Account Manager', img: '/images/marie-medina-lp.webp' },
];

function VerticalLanding() {
  const cfg = window.XF_LP;
  const faq = window.XF_LP_FAQ || [];
  const [openFaq, setOpenFaq] = React.useState(-1);
  const proof = window.XF_PROOF_POINTS || [];

  const check = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8512C"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
  const butterCheck = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F0D9A8"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <div>
      <Nav prefix="/" active="solutions" />
      <main>
        {/* Hero + Stage-1 capture */}
        <section style={{ background: '#F7F2EB', padding: '72px 0 56px' }}>
          <Container narrow>
            <Eyebrow>{cfg.eyebrow}</Eyebrow>
            <h1 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(36px, 5vw, 58px)',
              fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em',
              margin: '0 0 20px', color: '#1F1A17', textWrap: 'balance',
            }}>{cfg.h1}</h1>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 18,
              lineHeight: 1.6, color: '#3A322D', margin: '0 0 30px', maxWidth: 620,
            }}>{cfg.sub}</p>
            <div id="lp-hero-capture">
            <LeadCapture microcopy={cfg.microcopy ? (
              <>
                {cfg.microcopy}{' '}
                <a href="/book/" style={{ color: '#B8512C', fontWeight: 500 }}>Or book a call directly →</a>
              </>
            ) : undefined} />
            </div>
          </Container>
        </section>

        {/* Proof strip (shared claims) */}
        <section style={{ borderTop: '1px solid #D9CFBF', borderBottom: '1px solid #D9CFBF', padding: '26px 0' }}>
          <Container>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 34px', justifyContent: 'center' }}>
              {proof.map((p) => (
                <span key={p} style={{
                  fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14.5,
                  fontWeight: 500, color: '#3A322D',
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                }}>{check}{p}</span>
              ))}
            </div>
          </Container>
        </section>

        {/* Client marquee (same roster and motion as the homepage trust bar) */}
        <section style={{ padding: '40px 0 0' }}>
          <Container>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              textTransform: 'uppercase', letterSpacing: '0.14em',
              color: '#6B5F56', textAlign: 'center', marginBottom: 18,
            }}>Trusted by support-driven teams at</div>
          </Container>
          <div className="logo-marquee" aria-label="Client names">
            <div className="logo-marquee-track">
              {[0, 1].map((copy) => (
                <div className="logo-marquee-group" key={copy} aria-hidden={copy === 1}>
                  {CLIENT_NAMES.map((name) => (
                    <span key={name} style={{
                      fontFamily: "'Source Serif 4', serif", fontSize: 22,
                      fontWeight: 500, letterSpacing: '-0.01em',
                      color: '#3A322D', opacity: 0.7, whiteSpace: 'nowrap',
                    }}>{name}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verified metrics */}
        {cfg.metrics && cfg.metrics.length > 0 ? (
          <section style={{ padding: '64px 0 0' }}>
            <Container>
              <div className="lp-metrics" style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cfg.metrics.length}, 1fr)`,
                gap: 28,
              }}>
                {cfg.metrics.map((m) => (
                  <div key={m.num} style={{ background: '#EFE8DD', borderRadius: 12, padding: '28px 26px' }}>
                    <div style={{
                      fontFamily: "'Source Serif 4', serif", fontSize: 40,
                      fontWeight: 600, color: '#B8512C', lineHeight: 1, marginBottom: 10,
                    }}>{m.num}</div>
                    <p style={{
                      fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14,
                      lineHeight: 1.55, color: '#3A322D', margin: 0,
                    }}>
                      {m.text}{m.href ? <> <a href={m.href} style={{ color: '#B8512C' }}>Read the case study</a></> : null}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        {/* Client story callout (verified public client wins) */}
        {cfg.story ? (
          <section style={{ padding: '64px 0 0' }}>
            <Container narrow>
              <div style={{
                background: '#F8EBC9', border: '1px solid #E6C683',
                borderRadius: 12, padding: '32px 34px 30px',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  textTransform: 'uppercase', letterSpacing: '0.16em',
                  color: '#6B5F56', marginBottom: 12,
                }}>{cfg.story.eyebrow}</div>
                <div style={{
                  fontFamily: "'Source Serif 4', serif", fontSize: 'clamp(22px, 2.8vw, 28px)',
                  fontWeight: 600, letterSpacing: '-0.02em', color: '#1F1A17', marginBottom: 12,
                }}>{cfg.story.title}</div>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16,
                  lineHeight: 1.65, color: '#3A322D', margin: '0 0 14px',
                }}>{cfg.story.text}</p>
                {cfg.story.kicker ? (
                  <p style={{
                    fontFamily: "'Source Serif 4', serif", fontSize: 17,
                    fontStyle: 'italic', fontWeight: 500, color: '#B8512C',
                    margin: 0, lineHeight: 1.5,
                  }}>{cfg.story.kicker}</p>
                ) : null}
              </div>
            </Container>
          </section>
        ) : null}

        {/* Value blocks (message-matched to the ad group) */}
        <section style={{ padding: '72px 0' }}>
          <Container narrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {cfg.values.map((v, i) => (
                <div key={v.title} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{
                    flexShrink: 0, width: 34, height: 34, borderRadius: 999,
                    background: '#2C4A3E', color: '#F0D9A8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
                  }}>{i + 1}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Source Serif 4', serif", fontSize: 20, fontWeight: 600,
                      color: '#1F1A17', marginBottom: 6,
                    }}>{v.title}</div>
                    <p style={{
                      fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16,
                      lineHeight: 1.6, color: '#3A322D', margin: 0, maxWidth: 640,
                    }}>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
            {cfg.clientsNote ? (
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14,
                color: '#6B5F56', margin: '28px 0 0', lineHeight: 1.5,
              }}>{cfg.clientsNote}</p>
            ) : null}
          </Container>
        </section>

        {/* What your agent takes off your plate */}
        {cfg.tickets && cfg.tickets.length > 0 ? (
          <section style={{ padding: '0 0 72px' }}>
            <Container narrow>
              <h2 style={{
                fontFamily: "'Source Serif 4', serif", fontSize: 'clamp(26px, 3.4vw, 36px)',
                fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 22px',
              }}>{cfg.ticketsTitle || 'What your agent takes off your plate'}</h2>
              <div className="lp-tickets" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {cfg.tickets.map((t) => (
                  <div key={t} style={{
                    background: '#EFE8DD', borderRadius: 12, padding: '16px 18px',
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15,
                    lineHeight: 1.5, color: '#3A322D', fontWeight: 500,
                  }}>
                    <span style={{ marginTop: 2 }}>{check}</span>{t}
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        {/* How your agent learns your product (verified onboarding process) */}
        {cfg.hideLearn ? null : (
          <section style={{ padding: '0 0 72px' }}>
            <Container narrow>
              <h2 style={{
                fontFamily: "'Source Serif 4', serif", fontSize: 'clamp(26px, 3.4vw, 36px)',
                fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 12px',
              }}>{cfg.learnTitle || 'How your agent learns your product'}</h2>
              {cfg.learnIntro ? (
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16,
                  lineHeight: 1.6, color: '#3A322D', margin: '0 0 26px', maxWidth: 620,
                }}>{cfg.learnIntro}</p>
              ) : <div style={{ height: 14 }} />}
              <div className="lp-learn" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                {XF_LP_LEARN.map((ph) => (
                  <div key={ph.title} style={{ border: '1px solid #D9CFBF', borderRadius: 12, padding: '22px 22px 20px' }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                      textTransform: 'uppercase', letterSpacing: '0.14em',
                      color: '#B8512C', marginBottom: 10,
                    }}>{ph.label}</div>
                    <div style={{
                      fontFamily: "'Source Serif 4', serif", fontSize: 19, fontWeight: 600,
                      color: '#1F1A17', marginBottom: 8,
                    }}>{ph.title}</div>
                    <p style={{
                      fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15,
                      lineHeight: 1.6, color: '#3A322D', margin: 0,
                    }}>{ph.text}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* How it works */}
        {cfg.hideSteps ? null : (
          <section style={{ background: '#EFE8DD', padding: '72px 0' }}>
            <Container narrow>
              <h2 style={{
                fontFamily: "'Source Serif 4', serif", fontSize: 'clamp(26px, 3.4vw, 36px)',
                fontWeight: 600, letterSpacing: '-0.02em',
                margin: cfg.stepsLead ? '0 0 12px' : '0 0 30px',
              }}>How it works</h2>
              {cfg.stepsLead ? (
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16,
                  lineHeight: 1.6, color: '#3A322D', margin: '0 0 26px', maxWidth: 620,
                }}>{cfg.stepsLead}</p>
              ) : null}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {(cfg.steps || XF_LP_STEPS).map((s, i) => (
                  <div key={s.title} style={{
                    display: 'flex', gap: 22, alignItems: 'flex-start',
                    padding: '22px 0', borderTop: '1px solid #D9CFBF',
                  }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                      color: '#B8512C', paddingTop: 4, flexShrink: 0,
                    }}>{`0${i + 1}`}</div>
                    <div>
                      <div style={{
                        fontFamily: "'Source Serif 4', serif", fontSize: 20, fontWeight: 600,
                        color: '#1F1A17', marginBottom: 6,
                      }}>{s.title}</div>
                      <p style={{
                        fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15.5,
                        lineHeight: 1.6, color: '#3A322D', margin: 0, maxWidth: 600,
                      }}>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Your three options */}
        {cfg.hideComparison ? null : (
          <section style={{ padding: '72px 0' }}>
            <Container>
              <h2 style={{
                fontFamily: "'Source Serif 4', serif", fontSize: 'clamp(26px, 3.4vw, 36px)',
                fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 26px', textAlign: 'center',
              }}>Your three options</h2>
              <div className="lp-compare" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22, alignItems: 'stretch' }}>
                {XF_LP_COMPARISON.map((col) => (
                  <div key={col.name} style={{
                    background: col.featured ? '#2C4A3E' : '#EFE8DD',
                    borderRadius: 12, padding: '26px 24px',
                  }}>
                    <div style={{
                      fontFamily: "'Source Serif 4', serif", fontSize: 21, fontWeight: 600,
                      color: col.featured ? '#F0D9A8' : '#1F1A17', marginBottom: 14,
                    }}>{col.name}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {col.rows.map((r) => (
                        <div key={r} style={{
                          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14.5,
                          lineHeight: 1.55, color: col.featured ? '#F7F2EB' : '#3A322D',
                          display: 'flex', gap: 9, alignItems: 'flex-start',
                        }}>
                          {col.featured ? <span style={{ marginTop: 2 }}>{butterCheck}</span> : null}
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Testimonials */}
        {(cfg.quotes || []).length > 0 ? (
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            textTransform: 'uppercase', letterSpacing: '0.16em',
            color: '#6B5F56', textAlign: 'center', margin: '0 0 40px',
          }}>What clients say</div>
        ) : null}
        {(cfg.quotes || []).map((q) => (
          <section key={q.name} style={{ padding: '0 0 72px' }}>
            <Container narrow style={{ textAlign: 'center' }}>
              <blockquote style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 'clamp(21px, 2.8vw, 28px)', fontWeight: 500,
                fontStyle: 'italic', lineHeight: 1.4, letterSpacing: '-0.01em',
                color: '#1F1A17', margin: '0 0 22px',
              }}>&ldquo;{q.text}&rdquo;</blockquote>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                <img src={q.img} alt={q.name} loading="lazy" width="52" height="52"
                  style={{ width: 52, height: 52, borderRadius: 999, objectFit: 'cover' }} />
                <div style={{
                  fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14,
                  color: '#3A322D', textAlign: 'left',
                }}>
                  <strong style={{ display: 'block', fontWeight: 600 }}>{q.name}</strong>{q.role}
                </div>
              </div>
            </Container>
          </section>
        ))}

        {/* Related case studies (cards when stats provided, link chips otherwise) */}
        {cfg.caseStudies && cfg.caseStudies.length > 0 ? (
          cfg.caseStudies.some((c) => c.stat) ? (
            <section style={{ padding: '0 0 72px' }}>
              <Container>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  textTransform: 'uppercase', letterSpacing: '0.16em',
                  color: '#6B5F56', marginBottom: 18, textAlign: 'center',
                }}>Case studies</div>
                <div className="lp-cs-cards" style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(cfg.caseStudies.length, 4)}, 1fr)`,
                  gap: 18,
                }}>
                  {cfg.caseStudies.map((c) => (
                    <a key={c.href} href={c.href} style={{
                      display: 'block', textDecoration: 'none',
                      border: '1px solid #D9CFBF', borderRadius: 12, padding: '22px 20px',
                    }}>
                      <div style={{
                        fontFamily: "'Source Serif 4', serif", fontSize: 18, fontWeight: 600,
                        color: '#1F1A17', marginBottom: (c.stat || c.statText) ? 10 : 0,
                      }}>{c.label}</div>
                      {c.stat ? (
                        <div style={{
                          fontFamily: "'Source Serif 4', serif", fontSize: 30, fontWeight: 600,
                          color: '#B8512C', lineHeight: 1, marginBottom: 6,
                        }}>{c.stat}</div>
                      ) : null}
                      {c.statText ? (
                        <div style={{
                          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13.5,
                          lineHeight: 1.5, color: '#3A322D', marginBottom: 10,
                        }}>{c.statText}</div>
                      ) : null}
                      <span style={{
                        fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13.5,
                        fontWeight: 500, color: '#B8512C',
                      }}>Read the case study →</span>
                    </a>
                  ))}
                </div>
              </Container>
            </section>
          ) : (
            <section style={{ padding: '0 0 72px', textAlign: 'center' }}>
              <Container>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  textTransform: 'uppercase', letterSpacing: '0.16em',
                  color: '#6B5F56', marginBottom: 16,
                }}>Case studies</div>
                {cfg.caseStudies.map((c) => (
                  <a key={c.href} href={c.href} style={{
                    fontFamily: "'Source Serif 4', serif", fontSize: 18, fontWeight: 500,
                    color: '#3A322D', textDecoration: 'none',
                    borderBottom: '1px solid #B7A993', margin: '0 14px',
                  }}>{c.label}</a>
                ))}
              </Container>
            </section>
          )
        ) : null}

        {/* The people behind your queue */}
        {cfg.hideTeam ? null : (
          <section style={{ borderTop: '1px solid #D9CFBF', padding: '64px 0 72px' }}>
            <Container narrow>
              <h2 style={{
                fontFamily: "'Source Serif 4', serif", fontSize: 'clamp(26px, 3.4vw, 36px)',
                fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 12px',
              }}>The people behind your queue</h2>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16,
                lineHeight: 1.6, color: '#3A322D', margin: '0 0 28px', maxWidth: 620,
              }}>
                An account manager is included in the flat rate. They run QA on real tickets,
                coach your agent, and arrange backup coverage, so support quality is somebody's
                actual job, not a thing you check on at midnight.
              </p>
              <div className="lp-team" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
                {XF_LP_TEAM.map((t) => (
                  <div key={t.name}>
                    <img src={t.img} alt={t.name} loading="lazy"
                      style={{
                        width: '100%', aspectRatio: '4 / 5', objectFit: 'cover',
                        borderRadius: 12, display: 'block', marginBottom: 10,
                      }} />
                    <div style={{
                      fontFamily: "'Source Serif 4', serif", fontSize: 17, fontWeight: 600,
                      color: '#1F1A17',
                    }}>{t.name}</div>
                    <div style={{
                      fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13.5,
                      color: '#6B5F56',
                    }}>{t.role}</div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* FAQ (visible entries mirror the page's FAQPage JSON-LD) */}
        {faq.length > 0 ? (
          <section style={{ padding: '0 0 72px' }}>
            <Container narrow>
              <h2 style={{
                fontFamily: "'Source Serif 4', serif", fontSize: 'clamp(26px, 3.4vw, 36px)',
                fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 22px',
              }}>Common questions</h2>
              <div style={{ borderTop: '1px solid #D9CFBF' }}>
                {faq.map((it, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #D9CFBF' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      aria-expanded={openFaq === i}
                      style={{
                        width: '100%', background: 'transparent', border: 'none',
                        padding: '20px 4px', display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', gap: 20, textAlign: 'left', cursor: 'pointer',
                        fontFamily: "'Source Serif 4', serif", fontSize: 19, fontWeight: 600,
                        color: '#1F1A17', lineHeight: 1.3,
                      }}>
                      <span>{it.q}</span>
                      <Icon name={openFaq === i ? 'minus' : 'plus'} size={14} color="#1F1A17" stroke={2} />
                    </button>
                    <div style={{
                      maxHeight: openFaq === i ? 600 : 0, overflow: 'hidden',
                      transition: 'max-height 320ms cubic-bezier(0.4,0,0.6,1)',
                    }}>
                      <p style={{
                        fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16,
                        lineHeight: 1.65, color: '#3A322D', margin: 0,
                        padding: '0 4px 24px', maxWidth: 680,
                      }}>{it.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        {/* Keep reading (existing blog posts, hand-picked per vertical) */}
        {cfg.resources && cfg.resources.length > 0 ? (
          <section style={{ padding: '0 0 72px' }}>
            <Container narrow>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.16em',
                color: '#6B5F56', marginBottom: 16,
              }}>Keep reading</div>
              <div className="lp-resources" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {cfg.resources.map((r) => (
                  <a key={r.href} href={r.href} style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    gap: 14, textDecoration: 'none',
                    border: '1px solid #D9CFBF', borderRadius: 12, padding: '20px 20px 18px',
                  }}>
                    <span style={{
                      fontFamily: "'Source Serif 4', serif", fontSize: 17, fontWeight: 600,
                      lineHeight: 1.35, color: '#1F1A17',
                    }}>{r.title}</span>
                    <span style={{
                      fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13.5,
                      fontWeight: 500, color: '#B8512C',
                    }}>Read the post →</span>
                  </a>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        {/* Closing CTA */}
        <section style={{ borderTop: '1px solid #D9CFBF', padding: '72px 0 96px', textAlign: 'center' }}>
          <Container narrow>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif", fontSize: 'clamp(28px, 3.6vw, 40px)',
              fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 14px',
            }}>{cfg.closingH2}</h2>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16,
              color: '#3A322D', margin: '0 auto 28px', maxWidth: 520, lineHeight: 1.6,
            }}>{cfg.closingText}</p>
            <Button variant="primary" size="lg" href="/book/">Book a Discovery Call</Button>
            <CTAMicrocopy color="#6B5F56" style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 580 }}>
              30 minutes. No commitment. No credit card. You'll talk directly with our founding team.
            </CTAMicrocopy>
          </Container>
        </section>
      </main>
      <StickyCapture />
      <Footer />

      <style>{`
        /* Trust bar marquee: two identical groups slide left; when the first
           has fully passed, the loop restarts invisibly. Edges fade out. */
        .logo-marquee {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .logo-marquee-track {
          display: flex;
          width: max-content;
          animation: logo-marquee-scroll 64s linear infinite;
        }
        .logo-marquee:hover .logo-marquee-track { animation-play-state: paused; }
        .logo-marquee-group {
          display: flex;
          align-items: center;
          gap: 52px;
          padding-right: 52px;
        }
        @keyframes logo-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; }
          .logo-marquee-group { flex-wrap: wrap; justify-content: center; gap: 14px 24px; padding-right: 0; }
          .logo-marquee-group[aria-hidden="true"] { display: none; }
          .logo-marquee { -webkit-mask-image: none; mask-image: none; }
        }

        @media (max-width: 800px) {
          .lp-metrics { grid-template-columns: 1fr !important; }
          .lp-compare { grid-template-columns: 1fr !important; }
          .lp-cs-cards { grid-template-columns: 1fr 1fr !important; }
          .lp-resources { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .lp-tickets { grid-template-columns: 1fr !important; }
          .lp-learn { grid-template-columns: 1fr !important; }
          .lp-cs-cards { grid-template-columns: 1fr !important; }
          .lp-team { grid-template-columns: 1fr 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

window.VerticalLanding = VerticalLanding;
