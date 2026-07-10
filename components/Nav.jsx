// THE site navigation - single source of truth, loaded by every React page
// as /components/Nav.jsx (root-absolute, resolved by build/prerender.js).
// Self-contained on purpose: no dependency on Container/Icon/Button so it can
// be dropped into any page shell regardless of what else that page defines.
//
// Structure: Logo | Solutions v | Case studies | Pricing | About | Blog | CTA
// ("Home" is the logo - top sites don't spend a nav slot on it.)
// Props: active - one of 'solutions' | 'case-studies' | 'pricing' | 'about'
//        | 'blog' | '' ; legacy `current` is accepted as an alias.
const XF_SOLUTIONS = [
    { label: 'Shopify app developers',  href: '/shopify-app-support/',
      desc: 'Merchant tickets, reviews, APIs',
      icon: <g><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></g> },
    { label: 'SaaS founders',           href: '/saas-support/',
      desc: 'Product-deep Tier 1 and 2',
      icon: <g><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/></g> },
    { label: 'E-commerce & DTC brands', href: '/ecommerce-support/',
      desc: 'Returns, refunds, peak season',
      icon: <g><path d="M16.5 9.4l-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></g> },
    { label: 'Hire a support agent',    href: '/hire-support-agents/',
      desc: 'Senior, dedicated, managed',
      icon: <g><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/></g> },
    { label: 'Support outsourcing',     href: '/customer-support-outsourcing/',
      desc: 'The full queue, off your plate',
      icon: <g><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></g> },
];
window.XF_SOLUTIONS = XF_SOLUTIONS;

function Nav(props) {
  const raw = (props.active || props.current || '').toLowerCase().replace(/\s+/g, '-');
  const active = raw === 'home' ? '' : raw;

  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);            // mobile panel
  const [solOpen, setSolOpen] = React.useState(false);      // solutions dropdown
  const closeTimer = React.useRef(null);
  const dropRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the dropdown on outside click or Escape.
  React.useEffect(() => {
    if (!solOpen) return;
    const onDown = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setSolOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setSolOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [solOpen]);

  // Hover intent: open immediately, close with a small grace period so the
  // pointer can travel from the trigger into the panel without flicker.
  const hoverOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSolOpen(true);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setSolOpen(false), 180);
  };

  const solutions = XF_SOLUTIONS;
  const links = [
    { id: 'case-studies', label: 'Case studies', href: '/case-studies/' },
    { id: 'pricing',      label: 'Pricing',      href: '/pricing/' },
    { id: 'about',        label: 'About',        href: '/about/' },
    { id: 'blog',         label: 'Blog',         href: '/blog/' },
  ];

  const chevron = (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: solOpen ? 'rotate(180deg)' : 'none', transition: 'transform 160ms', flexShrink: 0 }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
  const burgerIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {open
        ? <g><path d="M18 6L6 18" /><path d="M6 6l12 12" /></g>
        : <g><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></g>}
    </svg>
  );

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(247, 242, 235, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #D9CFBF' : '1px solid transparent',
      transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 72, display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="/" aria-label="xFusion home" style={{ display: 'flex', alignItems: 'baseline', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/assets/xfusion-logo.png" alt="xFusion" width="129" height="36"
              style={{ height: 36, width: 'auto', display: 'block' }} />
          </a>

          <div className="nav-links" style={{ display: 'flex', gap: 26, marginLeft: 16, alignItems: 'center' }}>
            <div ref={dropRef} onMouseEnter={hoverOpen} onMouseLeave={hoverClose} style={{ position: 'relative' }}>
              <button
                className="nav-link"
                onClick={() => setSolOpen(o => !o)}
                aria-expanded={solOpen}
                aria-haspopup="true"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  paddingBottom: 4,
                  color: solOpen ? '#B8512C' : '#1F1A17',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: active === 'solutions' ? 500 : 400,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  borderBottom: active === 'solutions' ? '1.5px solid #B8512C' : '1.5px solid transparent',
                }}>
                Solutions
                {chevron}
              </button>
              {solOpen && (
                <div role="menu" style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  left: -14,
                  background: '#F7F2EB',
                  border: '1px solid #D9CFBF',
                  borderRadius: 12,
                  padding: '14px 8px 10px',
                  minWidth: 244,
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
                    <a key={s.href} href={s.href} role="menuitem" className="nav-drop-item" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '9px 14px',
                      borderRadius: 8,
                      color: '#1F1A17',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}>
                      <span style={{
                        width: 34, height: 34, borderRadius: 8, background: '#EFE8DD',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#B8512C"
                          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                      </span>
                      <span>
                        <span style={{ display: 'block', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, fontWeight: 500 }}>{s.label}</span>
                        <span style={{ display: 'block', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: '#6B5F56', marginTop: 1 }}>{s.desc}</span>
                      </span>
                    </a>
                  ))}
                  <div style={{ borderTop: '1px solid #EFE8DD', margin: '8px 6px 0', padding: '10px 8px 4px' }}>
                    <a href="/book/" style={{
                      fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: 500,
                      color: '#B8512C', textDecoration: 'none',
                    }}>Not sure where you fit? Book a call →</a>
                  </div>
                </div>
              )}
            </div>

            {links.map(l => (
              <a key={l.id} href={l.href} className="nav-link"
                 aria-current={l.id === active ? 'page' : undefined}
                 style={{
                   color: '#1F1A17',
                   textDecoration: 'none',
                   fontFamily: "'IBM Plex Sans', sans-serif",
                   fontSize: 14,
                   whiteSpace: 'nowrap',
                   paddingBottom: 4,
                   fontWeight: l.id === active ? 500 : 400,
                   borderBottom: l.id === active ? '1.5px solid #B8512C' : '1.5px solid transparent',
                 }}>{l.label}</a>
            ))}
          </div>

          <div className="nav-cta" style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="/book/" className="nav-cta-btn" style={{
              background: '#B8512C',
              color: '#F7F2EB',
              borderRadius: 8,
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 500,
              fontSize: 13,
              padding: '9px 16px',
              textDecoration: 'none',
              display: 'inline-block',
              lineHeight: 1,
              transition: 'background 160ms cubic-bezier(0.4,0,0.6,1)',
            }}>Book a Discovery Call</a>
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
            {burgerIcon}
          </button>
        </div>

        {open && (
          <div className="nav-mobile-panel" style={{
            display: 'none',
            paddingBottom: 16,
            paddingTop: 8,
            borderTop: '1px solid #D9CFBF',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#6B5F56',
              padding: '12px 4px 6px',
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
            <div style={{ height: 10 }} />
            {links.map(l => (
              <a key={l.id} href={l.href} onClick={() => setOpen(false)} style={{
                display: 'block',
                padding: '14px 4px',
                color: '#1F1A17',
                textDecoration: 'none',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 16,
                fontWeight: l.id === active ? 600 : 400,
                borderBottom: '1px solid #EFE8DD',
              }}>{l.label}</a>
            ))}
            <div style={{ marginTop: 16 }}>
              <a href="/book/" onClick={() => setOpen(false)} style={{
                background: '#B8512C',
                color: '#F7F2EB',
                borderRadius: 8,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                padding: '14px 20px',
                textDecoration: 'none',
                display: 'block',
                textAlign: 'center',
                lineHeight: 1,
              }}>Book a Discovery Call</a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .nav-link:hover { color: #B8512C !important; }
        .nav-drop-item:hover { background: #EFE8DD; }
        .nav-cta-btn:hover { background: #A0451F !important; }
        @media (max-width: 880px) {
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
