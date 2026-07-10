(function () {
  var orig = window.ReactDOM;
  window.ReactDOM = Object.assign({}, orig, {
    createRoot: function (container) {
      return {
        render: function (element) {
          if (container && container.firstElementChild) {
            orig.hydrateRoot(container, element);
          } else {
            orig.createRoot(container).render(element);
          }
        },
        unmount: function () {},
      };
    },
  });
})();
// --- /components/Nav.jsx
// THE site navigation - single source of truth, loaded by every React page
// as /components/Nav.jsx (root-absolute, resolved by build/prerender.js).
// Self-contained on purpose: no dependency on Container/Icon/Button so it can
// be dropped into any page shell regardless of what else that page defines.
//
// Structure: Logo | Solutions v | Case studies | Pricing | About | Blog | CTA
// ("Home" is the logo - top sites don't spend a nav slot on it.)
// Props: active - one of 'solutions' | 'case-studies' | 'pricing' | 'about'
//        | 'blog' | '' ; legacy `current` is accepted as an alias.
function Nav(props) {
  const raw = (props.active || props.current || '').toLowerCase().replace(/\s+/g, '-');
  const active = raw === 'home' ? '' : raw;
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false); // mobile panel
  const [solOpen, setSolOpen] = React.useState(false); // solutions dropdown
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
    const onDown = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setSolOpen(false);
    };
    const onKey = e => {
      if (e.key === 'Escape') setSolOpen(false);
    };
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
  const solutions = [{
    label: 'Shopify app developers',
    href: '/shopify-app-support/'
  }, {
    label: 'SaaS founders',
    href: '/saas-support/'
  }, {
    label: 'E-commerce & DTC brands',
    href: '/ecommerce-support/'
  }, {
    label: 'Hire a support agent',
    href: '/hire-support-agents/'
  }, {
    label: 'Support outsourcing',
    href: '/customer-support-outsourcing/'
  }];
  const links = [{
    id: 'case-studies',
    label: 'Case studies',
    href: '/case-studies/'
  }, {
    id: 'pricing',
    label: 'Pricing',
    href: '/pricing/'
  }, {
    id: 'about',
    label: 'About',
    href: '/about/'
  }, {
    id: 'blog',
    label: 'Blog',
    href: '/blog/'
  }];
  const chevron = /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      transform: solOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform 160ms',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }));
  const burgerIcon = /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, open ? /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12"
  })) : /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 18h18"
  })));
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(247, 242, 235, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #D9CFBF' : '1px solid transparent',
      transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 72,
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    "aria-label": "xFusion home",
    style: {
      display: 'flex',
      alignItems: 'baseline',
      textDecoration: 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/xfusion-logo.png",
    alt: "xFusion",
    width: "129",
    height: "36",
    style: {
      height: 36,
      width: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-links",
    style: {
      display: 'flex',
      gap: 26,
      marginLeft: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: dropRef,
    onMouseEnter: hoverOpen,
    onMouseLeave: hoverClose,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "nav-link",
    onClick: () => setSolOpen(o => !o),
    "aria-expanded": solOpen,
    "aria-haspopup": "true",
    style: {
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
      borderBottom: active === 'solutions' ? '1.5px solid #B8512C' : '1.5px solid transparent'
    }
  }, "Solutions", chevron), solOpen && /*#__PURE__*/React.createElement("div", {
    role: "menu",
    style: {
      position: 'absolute',
      top: 'calc(100% + 10px)',
      left: -14,
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: '14px 8px 10px',
      minWidth: 244,
      boxShadow: '0 8px 24px rgba(31,26,23,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10.5,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#6B5F56',
      padding: '0 14px 8px'
    }
  }, "Who we help"), solutions.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.href,
    href: s.href,
    role: "menuitem",
    className: "nav-drop-item",
    style: {
      display: 'block',
      padding: '9px 14px',
      borderRadius: 8,
      color: '#1F1A17',
      textDecoration: 'none',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      whiteSpace: 'nowrap'
    }
  }, s.label)))), links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: l.href,
    className: "nav-link",
    "aria-current": l.id === active ? 'page' : undefined,
    style: {
      color: '#1F1A17',
      textDecoration: 'none',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      whiteSpace: 'nowrap',
      paddingBottom: 4,
      fontWeight: l.id === active ? 500 : 400,
      borderBottom: l.id === active ? '1.5px solid #B8512C' : '1.5px solid transparent'
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "nav-cta",
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/book/",
    className: "nav-cta-btn",
    style: {
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
      transition: 'background 160ms cubic-bezier(0.4,0,0.6,1)'
    }
  }, "Book a Discovery Call")), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    onClick: () => setOpen(o => !o),
    "aria-label": open ? 'Close menu' : 'Open menu',
    "aria-expanded": open,
    style: {
      display: 'none',
      marginLeft: 'auto',
      background: 'transparent',
      border: '1px solid #B7A993',
      borderRadius: 8,
      padding: 8,
      cursor: 'pointer',
      color: '#1F1A17'
    }
  }, burgerIcon)), open && /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile-panel",
    style: {
      display: 'none',
      paddingBottom: 16,
      paddingTop: 8,
      borderTop: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#6B5F56',
      padding: '12px 4px 6px'
    }
  }, "Who we help"), solutions.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.href,
    href: s.href,
    onClick: () => setOpen(false),
    style: {
      display: 'block',
      padding: '12px 4px 12px 16px',
      color: '#1F1A17',
      textDecoration: 'none',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      borderBottom: '1px solid #EFE8DD'
    }
  }, s.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10
    }
  }), links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: l.href,
    onClick: () => setOpen(false),
    style: {
      display: 'block',
      padding: '14px 4px',
      color: '#1F1A17',
      textDecoration: 'none',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      fontWeight: l.id === active ? 600 : 400,
      borderBottom: '1px solid #EFE8DD'
    }
  }, l.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/book/",
    onClick: () => setOpen(false),
    style: {
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
      lineHeight: 1
    }
  }, "Book a Discovery Call")))), /*#__PURE__*/React.createElement("style", null, `
        .nav-link:hover { color: #B8512C !important; }
        .nav-drop-item:hover { background: #EFE8DD; }
        .nav-cta-btn:hover { background: #A0451F !important; }
        @media (max-width: 880px) {
          .nav-links { display: none !important; }
          .nav-cta   { display: none !important; }
          .nav-burger { display: inline-flex !important; align-items: center; justify-content: center; }
          .nav-mobile-panel { display: block !important; }
        }
      `));
}
window.Nav = Nav;
// --- (inline)
const {
  useState,
  useEffect
} = React;
function Container({
  children,
  narrow = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: narrow ? 760 : 1200,
      margin: '0 auto',
      padding: '0 24px',
      ...style
    }
  }, children);
}
function Section({
  children,
  bg = 'paper',
  padding = 'lg',
  id,
  style = {}
}) {
  const bgs = {
    paper: '#F7F2EB',
    'paper-2': '#EFE8DD',
    butter: '#F8EBC9',
    'butter-strong': '#F0D9A8',
    forest: '#2C4A3E'
  };
  const pads = {
    sm: '56px 0',
    md: '80px 0',
    lg: '112px 0'
  };
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: bgs[bg],
      padding: pads[padding],
      ...style
    }
  }, children);
}
function Eyebrow({
  children,
  color = '#6B5F56'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color,
      marginBottom: 18
    }
  }, children);
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  style = {},
  target,
  rel
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const sizes = {
    sm: {
      padding: '8px 14px',
      fontSize: 13
    },
    md: {
      padding: '12px 22px',
      fontSize: 15
    },
    lg: {
      padding: '16px 28px',
      fontSize: 16
    }
  };
  let bg, color, border;
  if (variant === 'primary') {
    bg = pressed ? '#863818' : hover ? '#A0451F' : '#B8512C';
    color = '#F7F2EB';
    border = '1px solid transparent';
  } else {
    bg = hover ? '#EFE8DD' : 'transparent';
    color = '#1F1A17';
    border = '1px solid #B7A993';
  }
  const Tag = href ? 'a' : 'button';
  const isExternal = href && /^https?:\/\//.test(href);
  const computedTarget = target || (isExternal ? '_blank' : undefined);
  const computedRel = rel || (isExternal ? 'noopener noreferrer' : undefined);
  const linkAttrs = href ? {
    href,
    target: computedTarget,
    rel: computedRel
  } : {};
  return /*#__PURE__*/React.createElement(Tag, {
    ...linkAttrs,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    style: {
      background: bg,
      color,
      border,
      borderRadius: 8,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 500,
      cursor: 'pointer',
      lineHeight: 1.1,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)',
      whiteSpace: 'nowrap',
      ...sizes[size],
      ...style
    }
  }, children);
}
const Icons = {
  menu: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 18h18"
  })),
  x: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12"
  })),
  check: /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }),
  linkedin: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "9",
    width: "4",
    height: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "4",
    cy: "4",
    r: "2"
  })),
  twitter: /*#__PURE__*/React.createElement("path", {
    d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2-3 0-6-2.5-6-5.5 1 .5 2 .5 3 0-3-1-5-4-5-7 1 .5 2 1 3 1-3-2-3-7 0-9 4 5 10 7.5 16 7-.7-3 1.2-6 4-6 1.5 0 3 .8 4 2 1-.2 2-.5 3-1z"
  }),
  instagram: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "20",
    rx: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  })),
  facebook: /*#__PURE__*/React.createElement("path", {
    d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
  }),
  youtube: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M22.5 6.5a2.8 2.8 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2C1 8.3 1 12 1 12s0 3.7.5 5.5a2.8 2.8 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.5a2.8 2.8 0 0 0 2-2c.5-1.8.5-5.5.5-5.5s0-3.7-.5-5.5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 15l5-3-5-3z",
    fill: "currentColor"
  }))
};
function Icon({
  name,
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      display: 'inline-block'
    }
  }, Icons[name]);
}
function _LegacyNavUnused({
  current
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const linkStyle = active => ({
    color: active ? '#B8512C' : '#1F1A17',
    textDecoration: 'none',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontWeight: active ? 500 : 400,
    fontSize: 14,
    whiteSpace: 'nowrap'
  });
  const links = [{
    label: 'Home',
    href: '../',
    key: 'home'
  }, {
    label: 'About',
    href: '../about/',
    key: 'about'
  }, {
    label: 'Case studies',
    href: '../case-studies/',
    key: 'case-studies'
  }, {
    label: 'Careers',
    href: '../careers/',
    key: 'careers'
  }, {
    label: 'Blog',
    href: 'https://blog.xfusion.io',
    key: 'blog'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(247, 242, 235, 0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #D9CFBF' : '1px solid transparent',
      transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 72,
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "../",
    style: {
      display: 'flex',
      alignItems: 'baseline',
      textDecoration: 'none'
    },
    "aria-label": "xFusion home"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/xfusion-logo.png",
    alt: "xFusion",
    style: {
      height: 36,
      width: "auto",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-links",
    style: {
      display: 'flex',
      gap: 28,
      marginLeft: 24
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: l.href,
    style: linkStyle(current === l.key)
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement("button", {
    className: "nav-mobile-toggle",
    onClick: () => setOpen(!open),
    style: {
      display: 'none',
      background: 'transparent',
      border: '1px solid #B7A993',
      borderRadius: 8,
      padding: 8,
      cursor: 'pointer',
      color: '#1F1A17'
    },
    "aria-label": "Toggle menu"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'x' : 'menu',
    size: 20
  })))), open && /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile-menu",
    style: {
      display: 'none',
      flexDirection: 'column',
      gap: 16,
      padding: '8px 0 24px',
      borderTop: '1px solid #D9CFBF'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: l.href,
    style: linkStyle(current === l.key),
    onClick: () => setOpen(false)
  }, l.label)))), /*#__PURE__*/React.createElement("style", null, `@media (max-width: 800px) { .nav-links { display: none !important; } .nav-mobile-toggle { display: inline-flex !important; } .nav-mobile-menu { display: flex !important; } }`));
}
function Footer() {
  const cols = [{
    title: 'Product',
    links: [['Pricing', '/pricing/'], ['Case studies', '../case-studies/'], ['Shopify app support', '/shopify-app-support/'], ['SaaS support', '/saas-support/'], ['Hire support agents', '/hire-support-agents/'], ['Support outsourcing', '/customer-support-outsourcing/'], ['E-commerce support', '/ecommerce-support/']]
  }, {
    title: 'Company',
    links: [['About', '../about/'], ['Careers', '../careers/'], ['Contact', '../contact/']]
  }, {
    title: 'Resources',
    links: [['FAQ', '../#faq'], ['Blog', '../blog/']]
  }, {
    title: 'Legal',
    links: [['Privacy', '../privacy/'], ['DPA', '../dpa/'], ['Security', '../security/']]
  }];
  const FOREST = '#2C4A3E';
  const PAPER = '#F7F2EB';
  const BUTTER = '#F0D9A8';
  const DIVIDER = 'rgba(247, 242, 235, 0.14)';
  const MUTED = 'rgba(247, 242, 235, 0.65)';
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: FOREST,
      color: PAPER
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    className: "footer-top",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 32,
      alignItems: 'center',
      paddingTop: 64,
      paddingBottom: 40,
      borderBottom: `1px solid ${DIVIDER}`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "../",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/xfusion-logo-on-dark.png",
    alt: "xFusion",
    style: {
      height: 36,
      width: "auto",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 18,
      lineHeight: 1.5,
      color: BUTTER,
      margin: 0,
      maxWidth: 480,
      fontStyle: 'italic',
      fontWeight: 400
    }
  }, "Senior, AI-trained customer support agents for small businesses. Since 2020."))), /*#__PURE__*/React.createElement("div", {
    className: "footer-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 40,
      paddingTop: 48,
      paddingBottom: 40
    }
  }, cols.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: MUTED,
      marginBottom: 18
    }
  }, col.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, col.links.map(([label, href]) => /*#__PURE__*/React.createElement("li", {
    key: label
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "footer-link",
    style: {
      color: PAPER,
      textDecoration: 'none',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      lineHeight: 1.4
    }
  }, label))))))), /*#__PURE__*/React.createElement("div", {
    className: "footer-legal",
    style: {
      paddingTop: 24,
      paddingBottom: 32,
      borderTop: `1px solid ${DIVIDER}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: MUTED,
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, "© 2026 xFusion. All rights reserved."), /*#__PURE__*/React.createElement("div", null, "Made with care across the Philippines, Kenya, and the United States."))), /*#__PURE__*/React.createElement("style", null, `
            .footer-link:hover { color: ${BUTTER}; }
            @media (max-width: 900px) {
              .footer-top { grid-template-columns: 1fr !important; gap: 20px !important; }
              .footer-cta { justify-content: flex-start !important; }
              .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
              .footer-legal { flex-direction: column; align-items: flex-start !important; }
            }
            @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }
          `));
}
function App() {
  const sectionH2 = {
    fontFamily: "'Source Serif 4', serif",
    fontSize: 'clamp(28px, 3.2vw, 42px)',
    fontWeight: 400,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    margin: '0 0 24px',
    color: '#1F1A17'
  };
  const subH3 = {
    fontFamily: "'Source Serif 4', serif",
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 1.3,
    color: '#1F1A17',
    margin: '24px 0 10px'
  };
  const body = {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 17,
    lineHeight: 1.65,
    color: '#3A322D',
    margin: '0 0 16px'
  };
  const bullet = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 14,
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 16,
    lineHeight: 1.55,
    color: '#1F1A17'
  };
  const checkBadge = {
    width: 22,
    height: 22,
    borderRadius: 999,
    background: '#B8512C',
    color: '#F7F2EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 3
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Security"
  }, /*#__PURE__*/React.createElement(Nav, {
    current: "security"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 96,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Trust and security"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(40px, 5.6vw, 76px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      margin: '0 0 28px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "Security at xFusion."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(20px, 2.1vw, 26px)',
      lineHeight: 1.45,
      color: '#3A322D',
      fontWeight: 400,
      margin: '0 0 24px',
      maxWidth: 760,
      textWrap: 'pretty'
    }
  }, "When you bring xFusion into your business, you are giving us access to customer conversations, helpdesk data, and internal tools. We treat that access like the responsibility it is. Here is how."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#6B5F56'
    }
  }, "Last updated: April 29, 2026"))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The shape of the problem"), /*#__PURE__*/React.createElement("h2", {
    style: sectionH2
  }, "What our security model actually has to protect."), /*#__PURE__*/React.createElement("p", {
    style: body
  }, "We are a managed customer support service. Most of the data we touch lives in tools our clients already own (Help Scout, Intercom, Zendesk, Gorgias, Front, HubSpot, Shopify, etc.). We work inside those tools as authorized users with role-based permissions. That structure is intentional, because it means data stays where the client already has security and audit controls in place."), /*#__PURE__*/React.createElement("p", {
    style: body
  }, "The places where xFusion holds data directly are narrower: payroll for our placed team, internal documentation about each client's workflows, our recruiting pipeline, and the operational tooling we use to run the business. Each layer below describes how we protect those."))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "People"), /*#__PURE__*/React.createElement("h2", {
    style: sectionH2
  }, "Who has access, and how we keep it that way."), /*#__PURE__*/React.createElement("h3", {
    style: subH3
  }, "Hiring and vetting"), /*#__PURE__*/React.createElement("p", {
    style: body
  }, "Every team member goes through the TraitX framework before placement. That includes background screening appropriate to the role and jurisdiction, identity verification, reference checks, and a structured assessment of judgment and discretion under pressure. Less than one percent of applicants make it through."), /*#__PURE__*/React.createElement("h3", {
    style: subH3
  }, "Confidentiality and training"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Every team member signs a confidentiality and IP agreement before they receive any client access.', 'Onboarding includes security training: phishing recognition, credential hygiene, customer data handling, and reporting suspicious activity.', 'Refresher training runs at least annually and after any incident or material policy change.', 'Account managers reinforce security expectations during weekly one-on-ones with placed team members.'].map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: bullet
  }, /*#__PURE__*/React.createElement("span", {
    style: checkBadge
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  })), b))), /*#__PURE__*/React.createElement("h3", {
    style: subH3
  }, "Access lifecycle"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Access is provisioned per client, per tool, with the minimum permissions needed for the role.', 'Multi-factor authentication is required on every system that holds client or company data.', 'When a team member rolls off an account or leaves xFusion, access is revoked the same business day, with documented confirmation.', 'Account managers review access lists on a recurring cadence and remove anything stale.'].map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: bullet
  }, /*#__PURE__*/React.createElement("span", {
    style: checkBadge
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  })), b))))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Systems and infrastructure"), /*#__PURE__*/React.createElement("h2", {
    style: sectionH2
  }, "How the technical layer is set up."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['TLS 1.2 or higher in transit; data at rest is encrypted on the cloud platforms we rely on.', 'Company-managed devices for the operations and account management teams, with disk encryption and endpoint protection enforced by policy.', 'Password manager with strong, unique credentials per system; shared accounts avoided as a rule.', 'Centralized logging and audit trails wherever the underlying tool supports them.', 'Vulnerability management: dependencies and platforms are patched promptly; critical issues are prioritized.', 'Network controls: production tooling sits behind authentication; sensitive admin functions are restricted to a small group.', 'Backups for company-owned systems run on a schedule appropriate to the data, with periodic restore checks.'].map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: bullet
  }, /*#__PURE__*/React.createElement("span", {
    style: checkBadge
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  })), b))))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Data handling"), /*#__PURE__*/React.createElement("h2", {
    style: sectionH2
  }, "What we do, and do not, do with client data."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['We process client data only to deliver the services in the agreement: respond to support tickets, run the helpdesk, manage the team, report on KPIs.', 'We do not sell client data and do not use it to train external AI models.', 'AI tools used in client workflows are scoped to the client\'s own environment and configured according to the client\'s instructions.', 'Client data is returned or deleted at the end of the engagement, on request.', 'For data we are the controller of (billing contacts, candidate information), retention follows our Privacy Policy.'].map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: bullet
  }, /*#__PURE__*/React.createElement("span", {
    style: checkBadge
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  })), b))))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Vendors and Sub-processors"), /*#__PURE__*/React.createElement("h2", {
    style: sectionH2
  }, "The third parties we rely on."), /*#__PURE__*/React.createElement("p", {
    style: body
  }, "We use established platforms for hosting, communication, payroll, helpdesk operations, and analytics. We choose vendors with mature security practices and review them periodically. A current list of named Sub-processors is available on request and is also referenced in our ", /*#__PURE__*/React.createElement("a", {
    href: "../dpa/",
    style: {
      color: '#B8512C'
    }
  }, "Data Processing Addendum"), "."))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Incident response"), /*#__PURE__*/React.createElement("h2", {
    style: sectionH2
  }, "If something goes wrong."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Documented incident response process owned by xFusion leadership.', 'Suspected incidents are triaged immediately; impact and scope are confirmed before broader action.', 'Affected clients are notified without undue delay, with the facts we know and the steps we are taking.', 'Post-incident review captures root cause, remediation, and the durable change so it does not happen again.'].map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: bullet
  }, /*#__PURE__*/React.createElement("span", {
    style: checkBadge
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  })), b))))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Compliance and documentation"), /*#__PURE__*/React.createElement("h2", {
    style: sectionH2
  }, "What we will provide on request."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Data Processing Addendum for clients with GDPR, UK GDPR, or CCPA / CPRA obligations.', 'Standard Contractual Clauses where required for international transfers.', 'Sub-processor list and notification of material changes.', 'Security questionnaire responses for client procurement teams.', 'NDA before any sensitive technical or operational details are shared.'].map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: bullet
  }, /*#__PURE__*/React.createElement("span", {
    style: checkBadge
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  })), b))), /*#__PURE__*/React.createElement("p", {
    style: body
  }, "xFusion does not currently hold a SOC 2 attestation. We are happy to walk through our controls in detail and to share documentation against any framework you are aligning to internally."))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Reporting a concern"), /*#__PURE__*/React.createElement("h2", {
    style: sectionH2
  }, "Talk to us."), /*#__PURE__*/React.createElement("p", {
    style: body
  }, "If you believe you have found a vulnerability, observed suspicious activity involving xFusion, or have a security question, contact ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:security@xfusion.io",
    style: {
      color: '#B8512C'
    }
  }, "security@xfusion.io"), ". We typically respond within one business day. Please do not include sensitive personal data in your initial message; we will set up a secure channel as needed."), /*#__PURE__*/React.createElement("p", {
    style: body
  }, "For broader privacy questions, see our ", /*#__PURE__*/React.createElement("a", {
    href: "../privacy/",
    style: {
      color: '#B8512C'
    }
  }, "Privacy Policy"), " or email ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@xfusion.io",
    style: {
      color: '#B8512C'
    }
  }, "info@xfusion.io"), ".")))), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));