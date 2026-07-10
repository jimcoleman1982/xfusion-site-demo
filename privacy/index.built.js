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
const XF_SOLUTIONS = [{
  label: 'Shopify app developers',
  href: '/shopify-app-support/',
  desc: 'Merchant tickets, reviews, APIs',
  icon: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 10a4 4 0 0 1-8 0"
  }))
}, {
  label: 'SaaS founders',
  href: '/saas-support/',
  desc: 'Product-deep Tier 1 and 2',
  icon: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l9 5-9 5-9-5 9-5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12l9 5 9-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 17l9 5 9-5"
  }))
}, {
  label: 'E-commerce & DTC brands',
  href: '/ecommerce-support/',
  desc: 'Returns, refunds, peak season',
  icon: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M16.5 9.4l-9-5.19"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.27 6.96L12 12.01l8.73-5.05"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 22.08V12"
  }))
}, {
  label: 'Hire a support agent',
  href: '/hire-support-agents/',
  desc: 'Senior, dedicated, managed',
  icon: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 8v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 11h-6"
  }))
}, {
  label: 'Support outsourcing',
  href: '/customer-support-outsourcing/',
  desc: 'The full queue, off your plate',
  icon: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M3 18v-6a9 9 0 0 1 18 0v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
  }))
}];
window.XF_SOLUTIONS = XF_SOLUTIONS;
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
  const solutions = XF_SOLUTIONS;
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
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '9px 14px',
      borderRadius: 8,
      color: '#1F1A17',
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 8,
      background: '#EFE8DD',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#B8512C",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, s.icon)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      fontWeight: 500
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 12,
      color: '#6B5F56',
      marginTop: 1
    }
  }, s.desc)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #EFE8DD',
      margin: '8px 6px 0',
      padding: '10px 8px 4px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/book/",
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      fontWeight: 500,
      color: '#B8512C',
      textDecoration: 'none'
    }
  }, "Not sure where you fit? Book a call →")))), links.map(l => /*#__PURE__*/React.createElement("a", {
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
  } else if (variant === 'secondary') {
    bg = hover ? '#EFE8DD' : 'transparent';
    color = '#1F1A17';
    border = '1px solid #B7A993';
  } else {
    bg = hover ? 'rgba(31,26,23,0.04)' : 'transparent';
    color = '#1F1A17';
    border = '1px solid transparent';
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
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Privacy"
  }, /*#__PURE__*/React.createElement(Nav, {
    current: "privacy"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 96,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Legal"), /*#__PURE__*/React.createElement("h1", {
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
  }, "Privacy policy."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#6B5F56',
      marginBottom: 40
    }
  }, "Last updated: April 29, 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      lineHeight: 1.7,
      color: '#3A322D'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 24px'
    }
  }, "This Privacy Policy explains how xFusion, Inc. (\"xFusion,\" \"we,\" \"our,\" or \"us\") collects, uses, shares, and protects personal information when you visit xfusion.io, request a Discovery Call, become a client, apply for a role, work with us as a contractor, or otherwise interact with our services. We take privacy seriously and only collect what we need to run the business and serve our clients well."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 24px'
    }
  }, "If you have questions about this policy or your information, contact us at ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@xfusion.io",
    style: {
      color: '#B8512C'
    }
  }, "info@xfusion.io"), "."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "1. Who we are"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px'
    }
  }, "xFusion, Inc. is a U.S. company that provides fully managed customer support services. We recruit, vet, place, train, and manage senior customer support team members on behalf of our clients. Team members are engaged as independent contractors. xFusion is the controller of personal information collected through our website and recruiting funnel, and a processor of personal information that flows through our services on behalf of our clients."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "2. Information we collect"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#1F1A17',
      margin: '28px 0 12px'
    }
  }, "2.1 Information you give us"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '0 0 16px',
      paddingLeft: 22
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Contact details (name, email, company, role, phone) when you book a Discovery Call, fill out a form, or email us."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Application materials (resume, work history, references, portfolio links, video recordings, assessment results) when you apply for a role with us or our clients."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Payment and billing information when you become a client, processed by our payment providers."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Anything else you choose to send us by email, on a call, or through a connected tool.")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#1F1A17',
      margin: '28px 0 12px'
    }
  }, "2.2 Information collected automatically"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '0 0 16px',
      paddingLeft: 22
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Device and usage data (IP address, browser type, pages viewed, referrer, approximate location) when you visit xfusion.io."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Cookies and similar technologies for analytics, performance, and to remember your preferences. You can control cookies through your browser settings."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Analytics cookies and identifiers set through Google Tag Manager on our behalf: Google Analytics 4 (site usage), Microsoft Clarity (session insights), and B2B visitor-identification services (RB2B, LiveIntent). These help us understand what content works and who our site serves."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Advertising cookies from Google Ads and Microsoft Advertising, used to measure which ads lead to booked calls and to show our ads to people who visited xfusion.io (remarketing). If you submit your email in a form, we may share a one-way hashed (unreadable) version of it with Google to improve conversion measurement."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "If you visit from the EEA, UK, or Switzerland, analytics and advertising cookies stay off until you accept them in the cookie banner, and you can decline them entirely. Your choice is remembered for 12 months. Elsewhere, you can opt out any time via your browser settings, the ", /*#__PURE__*/React.createElement("a", {
    href: "https://tools.google.com/dlpage/gaoptout",
    style: {
      color: '#B8512C'
    }
  }, "Google Analytics opt-out"), ", or ", /*#__PURE__*/React.createElement("a", {
    href: "https://adssettings.google.com",
    style: {
      color: '#B8512C'
    }
  }, "Google ad settings"), ".")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#1F1A17',
      margin: '28px 0 12px'
    }
  }, "2.3 Information from third parties"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '0 0 16px',
      paddingLeft: 22
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Background check vendors, reference checks, public professional profiles (LinkedIn), and assessment platforms used in our hiring pipeline."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Client-provided information about end customers, surfaced through helpdesk tools and CRMs we are given access to in order to perform the support work.")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "3. How we use information"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '0 0 16px',
      paddingLeft: 22
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "To deliver our services: place team members, train them, manage payroll, run account management."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "To recruit and vet candidates through the TraitX framework."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "To respond to inquiries, schedule and run Discovery Calls, and follow up on proposals."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "To bill clients and process contractor payments."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "To improve our website, marketing, and operations."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "To send service messages and, with your consent where required, marketing emails. You can unsubscribe at any time."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "To comply with legal obligations, enforce our agreements, and protect xFusion, our clients, our team, and the public.")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "4. Legal bases for processing (EEA / UK)"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px'
    }
  }, "If you are in the European Economic Area or the United Kingdom, we process your personal information under one or more of the following legal bases: performance of a contract, our legitimate interests in running our business, your consent (where required), and compliance with legal obligations."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "5. How we share information"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px'
    }
  }, "We do not sell personal information. We share it only with:"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '0 0 16px',
      paddingLeft: 22
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Service providers who help us run the business under contracts that require confidentiality and appropriate safeguards. This includes payroll processors, payment platforms, hosting and analytics tools, helpdesk and CRM platforms, communication tools, and background check vendors."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Our clients, when you apply for a role with us and we present you as a candidate (with your knowledge), or when you reach out to us through a referral from a client."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "Government authorities, regulators, and other parties when required by law or to protect our legal rights."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, "An acquirer, successor, or assignee in connection with a merger, financing, acquisition, or sale of assets, with appropriate notice where required.")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "6. International transfers"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px'
    }
  }, "xFusion operates across the United States, the Philippines, and Kenya, and uses service providers in additional countries. Personal information may be transferred to and processed in countries with different data protection laws than your own. Where required by law, we put appropriate safeguards in place, including standard contractual clauses."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "7. Data retention"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px'
    }
  }, "We keep personal information for as long as we need it for the purposes described in this policy, plus a reasonable period afterward to meet legal, accounting, or reporting requirements. When we no longer need it, we delete or anonymize it."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "8. Your rights"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px'
    }
  }, "Depending on where you live, you may have rights to access, correct, delete, restrict, or object to our processing of your personal information, to withdraw consent, to data portability, and to lodge a complaint with a supervisory authority. To exercise any of these rights, email ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@xfusion.io",
    style: {
      color: '#B8512C'
    }
  }, "info@xfusion.io"), ". We will respond within the timeframes required by applicable law."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px'
    }
  }, "California residents have additional rights under the CCPA / CPRA, including the right to know what categories of personal information we collect, the right to delete, the right to correct, the right to opt out of any sale or sharing of personal information (we do not sell), and the right to non-discrimination for exercising these rights."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "9. Security"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px'
    }
  }, "We use administrative, technical, and physical safeguards designed to protect personal information from unauthorized access, disclosure, alteration, or destruction. No method of transmission or storage is 100% secure, but we work to keep information protected and to limit access to those who need it. See our ", /*#__PURE__*/React.createElement("a", {
    href: "../security/",
    style: {
      color: '#B8512C'
    }
  }, "Security page"), " for more detail."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "10. Children's privacy"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px'
    }
  }, "Our services are not directed to children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact us and we will delete it."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "11. Changes to this policy"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px'
    }
  }, "We may update this policy from time to time. When we do, we will revise the \"Last updated\" date at the top. Material changes will be communicated through our website or by email where appropriate."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1F1A17',
      margin: '40px 0 16px'
    }
  }, "12. Contact us"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#EFE8DD',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: 24,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 8px'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "xFusion, Inc.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Email: ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@xfusion.io",
    style: {
      color: '#B8512C'
    }
  }, "info@xfusion.io"))))))), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));