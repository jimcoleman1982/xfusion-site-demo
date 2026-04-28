// Site nav -- shared structure across all pages.
// Individual case study: prefix = '../../', active = 'case-studies'.
function Nav({ active = 'case-studies', prefix = '../../' }) {
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
            <span style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 28, fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#1F1A17',
              lineHeight: 1,
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
            <a href="#book" style={ctaStyle}>Book a Discovery Call</a>
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
              <a href="#book" style={{ ...ctaStyle, fontSize: 15, padding: '12px 20px', display: 'block', textAlign: 'center' }}>
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
