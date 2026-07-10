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
//   quotes: [{ text, name, role, img }],    // 0-2 verified testimonials
//   caseStudies: [{ label, href }],         // related case study links (empty = hidden)
//   clientsNote?,                           // optional plain-text line (e.g. named clients)
//   closingH2, closingText,
// }

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
            <LeadCapture microcopy={cfg.microcopy} />
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

        {/* Testimonials */}
        {(cfg.quotes || []).map((q) => (
          <section key={q.name} style={{ padding: '0 0 64px' }}>
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

        {/* Related case studies */}
        {cfg.caseStudies && cfg.caseStudies.length > 0 ? (
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
        ) : null}

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

        {/* Closing CTA */}
        <section style={{ padding: '0 0 96px', textAlign: 'center' }}>
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
            <CTAMicrocopy color="#6B5F56" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              30 minutes. No commitment. No credit card. You'll talk directly with our founding team.
            </CTAMicrocopy>
          </Container>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 800px) {
          .lp-metrics { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

window.VerticalLanding = VerticalLanding;
