// Site nav -- shared structure across all pages.
// Vary only `active` and the `prefix` (relative path to site root).
// On homepage, prefix = '' so links are 'about/', 'case-studies/', 'blog/'.
function Nav({ active = 'home', prefix = '' }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);

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
    { id: 'pricing',      label: 'Pricing',      href: prefix + 'pricing/' },
    { id: 'blog',         label: 'Blog',         href: prefix + 'blog/' },
  ];

  // ICP-facing solution pages: labels say who the visitor is, not what we sell.
  const solutions = [
    { label: 'Shopify app developers',   href: '/shopify-app-support/' },
    { label: 'SaaS founders',            href: '/saas-support/' },
    { label: 'E-commerce & DTC brands',  href: '/ecommerce-support/' },
    { label: 'Hire a support agent',     href: '/hire-support-agents/' },
    { label: 'Support outsourcing',      href: '/customer-support-outsourcing/' },
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
        <div style={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          gap: 32,
        }}>
          <a href={homeHref} aria-label="xFusion home" style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 0,
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            <img src="/assets/xfusion-logo.png" alt="xFusion" style={{ height: 36, width: "auto", display: "block" }} />
          </a>

          <div className="nav-links" style={{ display: 'flex', gap: 28, marginLeft: 16, alignItems: 'center' }}>
            {links.slice(0, 1).map(l => (
              <a key={l.id} href={l.href}
                 aria-current={l.id === active ? 'page' : undefined}
                 style={{
                   ...linkBase,
                   fontWeight: l.id === active ? 500 : 400,
                   borderBottom: l.id === active ? '1.5px solid #B8512C' : '1.5px solid transparent',
                 }}>{l.label}</a>
            ))}

            {/* Solutions dropdown: who we help */}
            <div
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
              style={{ position: 'relative' }}>
              <button
                onClick={() => setSolutionsOpen(o => !o)}
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
                style={{
                  ...linkBase,
                  background: 'transparent',
                  border: 'none',
                  fontWeight: active === 'solutions' ? 500 : 400,
                  borderBottom: active === 'solutions' ? '1.5px solid #B8512C' : '1.5px solid transparent',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: 0,
                  paddingBottom: 4,
                }}>
                Solutions
                <Icon name="chevron" size={13} stroke={2}
                  style={{ transform: solutionsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 160ms' }} />
              </button>
              {solutionsOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  left: -14,
                  background: '#F7F2EB',
                  border: '1px solid #D9CFBF',
                  borderRadius: 12,
                  padding: '14px 8px 10px',
                  minWidth: 240,
                  boxShadow: '0 8px 24px rgba(31,26,23,0.08)',
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: '#6B5F56',
                    padding: '0 14px 8px',
                  }}>Who we help</div>
                  {solutions.map(s => (
                    <a key={s.href} href={s.href} style={{
                      display: 'block',
                      padding: '9px 14px',
                      borderRadius: 8,
                      color: '#1F1A17',
                      textDecoration: 'none',
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: 14,
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#EFE8DD'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >{s.label}</a>
                  ))}
                </div>
              )}
            </div>

            {links.slice(1).map(l => {
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
            <a href="/book/" style={ctaStyle}>Book a Discovery Call</a>
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
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#6B5F56',
              padding: '16px 4px 6px',
            }}>Who we help</div>
            {solutions.map(s => (
              <a key={s.href} href={s.href} onClick={() => setOpen(false)} style={{
                display: 'block',
                padding: '12px 4px 12px 16px',
                color: '#1F1A17',
                textDecoration: 'none',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 15,
                borderBottom: '1px solid #EFE8DD',
              }}>{s.label}</a>
            ))}
            <div style={{ marginTop: 16 }}>
              <a href="/book/" style={{ ...ctaStyle, fontSize: 15, padding: '12px 20px', display: 'block', textAlign: 'center' }}>
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

window.Nav = Nav;
