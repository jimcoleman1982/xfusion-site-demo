// Unified site footer for About page (site/about/index.html)
// Forest-green background (--color-forest #2C4A3E), Paper text (#F7F2EB)
function Footer() {
  const cols = [
    {
      title: 'Product',
      links: [
        ['How it works',  '../#how-it-works'],
        ['Who we serve',  '../#who-we-serve'],
        ['Pricing',       '../#pricing'],
        ['Case studies',  '../case-studies/'],
      ],
    },
    {
      title: 'Company',
      links: [
        ['About',    '../about/'],
        ['Careers',  '../careers/'],
        ['Contact',  "https://savvycal.com/xfusion/lets-chat"],
      ],
    },
    {
      title: 'Resources',
      links: [
        ['FAQ',           '../#faq'],
        ['Blog',          '../blog/'],
      ],
    },
    {
      title: 'Legal',
      links: [
        ['Privacy',   '../privacy/'],
        ['DPA',       '../dpa/'],
        ['Security',  '../security/'],
      ],
    },
  ];

  const FOREST   = '#2C4A3E';
  const PAPER    = '#F7F2EB';
  const BUTTER   = '#F0D9A8';
  const DIVIDER  = 'rgba(247, 242, 235, 0.14)';
  const MUTED    = 'rgba(247, 242, 235, 0.65)';

  return (
    <footer style={{ background: FOREST, color: PAPER }}>
      <Container>
        <div className="footer-top" style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 32,
          alignItems: 'center',
          paddingTop: 64,
          paddingBottom: 40,
          borderBottom: `1px solid ${DIVIDER}`,
        }}>
          <div>
            <a href="../" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginBottom: 14, textDecoration: 'none',
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 9,
                background: '#B8512C', color: PAPER,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Source Serif 4', serif",
                fontWeight: 500, fontSize: 22, letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>xF</span>
              <span style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 28, fontWeight: 500, letterSpacing: '-0.025em',
                color: PAPER,
              }}>xFusion</span>
            </a>
            <p style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 18, lineHeight: 1.5,
              color: BUTTER, margin: 0, maxWidth: 480,
              fontStyle: 'italic', fontWeight: 400,
            }}>
              Senior, AI-augmented customer support agents for small businesses. Since 2020.
            </p>
          </div>
          <div className="footer-cta" style={{
            display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
          }}>
            <a href="https://savvycal.com/xfusion/lets-chat" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 22px', borderRadius: 999,
              background: '#B8512C', color: PAPER, textDecoration: 'none',
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 15, fontWeight: 500, letterSpacing: '-0.005em',
              border: '1px solid transparent',
            }}>Book a Discovery Call</a>
          </div>
        </div>

        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 40,
          paddingTop: 48,
          paddingBottom: 40,
        }}>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.14em',
                color: MUTED, marginBottom: 18,
              }}>{col.title}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0,
                display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="footer-link"
                      style={{
                        color: PAPER, textDecoration: 'none',
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: 15, lineHeight: 1.4,
                      }}
                    >{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-legal" style={{
          paddingTop: 24, paddingBottom: 32,
          borderTop: `1px solid ${DIVIDER}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 13, color: MUTED, flexWrap: 'wrap', gap: 12,
        }}>
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
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </footer>
  );
}

window.Footer = Footer;
