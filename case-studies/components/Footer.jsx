// Unified site footer for Case Studies index (site/case-studies/index.html)
// Forest-green background (--color-forest #2C4A3E), Paper text (#F7F2EB)
function Footer() {
  const cols = [
    {
      title: 'Product',
      links: [
        ['Pricing',       '../#pricing'],
        ['Case studies',  './'],
      ],
    },
    {
      title: 'Company',
      links: [
        ['About',    '../about/'],
        ['Careers',  '../careers/'],
        ['Contact', "../contact/"],
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
          paddingTop: 64,
          paddingBottom: 40,
          borderBottom: `1px solid ${DIVIDER}`,
        }}>
          <div>
            <a href="../" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginBottom: 14, textDecoration: 'none',
            }}>
              <img src="../assets/xfusion-logo-on-dark.png" alt="xFusion" style={{ height: 36, width: "auto", display: "block" }} />
              
            </a>
            <p style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 18, lineHeight: 1.5,
              color: BUTTER, margin: 0, maxWidth: 480,
              fontStyle: 'italic', fontWeight: 400,
            }}>
              Senior, AI-trained customer support agents for small businesses. Since 2020.
            </p>
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
