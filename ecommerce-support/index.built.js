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
// --- ../components/Components.jsx
// Shared primitives — adapted from xFusion marketing UI kit
const {
  useState,
  useEffect,
  useRef
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
  onClick,
  style = {},
  as = 'button',
  href,
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
  } else if (variant === 'ghost') {
    bg = hover ? 'rgba(31,26,23,0.04)' : 'transparent';
    color = '#1F1A17';
    border = '1px solid transparent';
  } else if (variant === 'on-dark') {
    bg = pressed ? '#E6C683' : hover ? '#F0D9A8' : '#F7F2EB';
    color = '#1F1A17';
    border = '1px solid transparent';
  } else if (variant === 'on-dark-outline') {
    bg = hover ? 'rgba(247,242,235,0.08)' : 'transparent';
    color = '#F7F2EB';
    border = '1px solid #F0D9A8';
  }
  const Tag = href ? 'a' : as || 'button';
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
    onClick: onClick,
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

// Photo placeholder — renders a real <img> when `file` is provided,
// otherwise falls back to a flat warm swatch with a name label.
function PhotoPlaceholder({
  name = 'Team',
  tone = 'clay',
  ratio = '4/5',
  label,
  file,
  alt
}) {
  const [errored, setErrored] = useState(false);
  if (file && !errored) {
    return /*#__PURE__*/React.createElement("img", {
      src: file,
      alt: alt || name,
      loading: "lazy",
      onError: () => setErrored(true),
      style: {
        width: '100%',
        aspectRatio: ratio,
        objectFit: 'cover',
        borderRadius: 12,
        display: 'block',
        border: '1px solid #D9CFBF'
      }
    });
  }
  const tones = {
    clay: {
      bg: '#B8512C',
      fg: '#F2D9CB',
      accent: '#F0D9A8'
    },
    forest: {
      bg: '#2C4A3E',
      fg: '#D7E0DC',
      accent: '#F0D9A8'
    },
    butter: {
      bg: '#F0D9A8',
      fg: '#7a5a10',
      accent: '#1F1A17'
    },
    paper: {
      bg: '#E6DCCB',
      fg: '#6B5F56',
      accent: '#1F1A17'
    }
  };
  const t = tones[tone];
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      borderRadius: 12,
      background: t.bg,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 28,
      position: 'relative',
      overflow: 'hidden',
      color: t.fg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      opacity: 0.75
    }
  }, label || 'Photo placeholder'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(80px, 14vw, 160px)',
      opacity: 0.18,
      lineHeight: 0.85,
      position: 'absolute',
      right: 8,
      top: '20%',
      color: t.accent,
      fontWeight: 600
    }
  }, initials), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 22,
      lineHeight: 1.2,
      color: t.accent,
      fontWeight: 500
    }
  }, name)));
}

// Circular photo placeholder for testimonial cards. Renders a real <img>
// when `file` is provided.
function PhotoCircle({
  name,
  tone = 'clay',
  size = 88,
  file,
  alt
}) {
  const [errored, setErrored] = useState(false);
  if (file && !errored) {
    return /*#__PURE__*/React.createElement("img", {
      src: file,
      alt: alt || name,
      loading: "lazy",
      onError: () => setErrored(true),
      style: {
        width: size,
        height: size,
        borderRadius: 999,
        objectFit: 'cover',
        flexShrink: 0,
        border: '1px solid rgba(31,26,23,0.08)',
        display: 'block'
      }
    });
  }
  const tones = {
    clay: {
      bg: '#B8512C',
      fg: '#F0D9A8'
    },
    forest: {
      bg: '#2C4A3E',
      fg: '#F0D9A8'
    },
    butter: {
      bg: '#F0D9A8',
      fg: '#7a5a10'
    },
    paper: {
      bg: '#E6DCCB',
      fg: '#3A322D'
    }
  };
  const t = tones[tone];
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 999,
      background: t.bg,
      color: t.fg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Source Serif 4', serif",
      fontSize: size * 0.34,
      fontWeight: 500,
      flexShrink: 0,
      border: '1px solid rgba(31,26,23,0.08)'
    }
  }, initials);
}

// Lucide-style icons (1.5px stroke, rounded line caps)
const Icons = {
  // Section icons
  calendar: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 2v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 2v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 10h18"
  })),
  users: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  })),
  check: /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }),
  arrow: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5l7 7-7 7"
  })),
  arrowRight: /*#__PURE__*/React.createElement("path", {
    d: "M7 17L17 7M17 7H8M17 7v9"
  }),
  clock: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  })),
  shield: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 12l2 2 4-4"
  })),
  badge: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 12l2 2 4-4"
  })),
  spark: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M12 3v3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 18v3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12h3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 12h3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.6 5.6l2.1 2.1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.3 16.3l2.1 2.1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.6 18.4l2.1-2.1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.3 7.7l2.1-2.1"
  })),
  filter: /*#__PURE__*/React.createElement("path", {
    d: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
  }),
  handshake: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M11 17l-3-3 3-3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 7l3 3-3 3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12H7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"
  })),
  chevron: /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }),
  plus: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  })),
  minus: /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }),
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
  // Social
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
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "6.5",
    r: "0.5",
    fill: "currentColor"
  })),
  facebook: /*#__PURE__*/React.createElement("path", {
    d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
  }),
  youtube: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M22.5 6.5a2.8 2.8 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2C1 8.3 1 12 1 12s0 3.7.5 5.5a2.8 2.8 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.5a2.8 2.8 0 0 0 2-2c.5-1.8.5-5.5.5-5.5s0-3.7-.5-5.5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 15l5-3-5-3z",
    fill: "currentColor"
  })),
  // Pillars / steps
  brainTrust: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 5l1.5 1.5L19 5"
  })),
  layers: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l9 5-9 5-9-5 9-5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12l9 5 9-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 17l9 5 9-5"
  })),
  helping: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M9 11l3 3 7-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2c2 0 4 .6 5.5 1.6"
  }))
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  stroke = 1.6,
  fill = 'none',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      display: 'inline-block',
      ...style
    }
  }, Icons[name] || null);
}

// CTA microcopy line, used under almost every primary CTA
function CTAMicrocopy({
  children,
  color = '#6B5F56',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      lineHeight: 1.5,
      color,
      marginTop: 14,
      maxWidth: 480,
      ...style
    }
  }, children || "30 minutes. No commitment. No credit card. You'll talk directly with our founding team.");
}
Object.assign(window, {
  Container,
  Section,
  Eyebrow,
  Button,
  PhotoPlaceholder,
  PhotoCircle,
  Icon,
  CTAMicrocopy
});
// --- ../components/Nav.jsx
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
// --- ../components/Footer.jsx
// Unified site footer
// Forest-green background (--color-forest #2C4A3E), Paper text (#F7F2EB)
// 4 columns of links, top brand block, bottom legal row.
// This file lives at site/components/Footer.jsx (homepage).
function Footer() {
  const cols = [{
    title: 'Product',
    links: [['Pricing', '/pricing/'], ['Case studies', '/case-studies/'], ['Shopify app support', '/shopify-app-support/'], ['SaaS support', '/saas-support/'], ['Hire support agents', '/hire-support-agents/'], ['Support outsourcing', '/customer-support-outsourcing/'], ['E-commerce support', '/ecommerce-support/']]
  }, {
    title: 'Company',
    links: [['About', '/about/'], ['Careers', '/careers/'], ['Contact', '/contact/']]
  }, {
    title: 'Resources',
    links: [['FAQ', '/faq/'], ['Blog', '/blog/']]
  }, {
    title: 'Legal',
    links: [['Privacy', '/privacy/'], ['DPA', '/dpa/'], ['Security', '/security/']]
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
    href: "#",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/xfusion-logo-on-dark.png",
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
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `));
}
window.Footer = Footer;
// --- ../components/LeadModal.jsx
// Stage 2 of the booking funnel: qualification modal.
// Opens after the hero email capture. Left panel: proof points + team photo.
// Right panel: short qualification form. On submit the lead is stored locally,
// POSTed to Netlify Forms, and the CTA becomes "Pick a time →" (goes to /book/).
//
// Anti-spam: honeypot field ("bot-field") — hidden from humans; if filled,
// we show the success state but skip the dataLayer event and the POST so
// bots never pollute conversion data.

// Proof points are defined ONCE here and shared with the homepage proof
// strip (Task 8) so the claims can never drift out of sync.
window.XF_PROOF_POINTS = ['Senior, AI-trained agents', '$3,900/mo all-in', '30-day risk-free trial', 'Month-to-month', 'Since 2020'];
const XF_BUSINESS_TYPES = ['SaaS', 'E-commerce', 'Marketplace', 'Agency', 'Other'];
function LeadModal({
  open,
  email,
  onClose
}) {
  const [name, setName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [need, setNeed] = React.useState('');
  const [bizType, setBizType] = React.useState('');
  const [botField, setBotField] = React.useState('');
  const [error, setError] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const firstFieldRef = React.useRef(null);
  const firedRef = React.useRef(false);
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstFieldRef.current && firstFieldRef.current.focus(), 60);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  const handleSubmit = e => {
    e.preventDefault();
    if (submitting || submitted) return;
    if (!name.trim()) {
      setError('Please tell us your name.');
      return;
    }
    setError('');

    // Honeypot: a filled bot-field means this is not a human. Show the
    // success state (so the bot moves on) but record and report nothing.
    if (botField) {
      setSubmitted(true);
      return;
    }
    setSubmitting(true);
    const attribution = window.xfAttribution && window.xfAttribution.get() || {};
    const lead = {
      email: email || '',
      name: name.trim(),
      company: company.trim(),
      website: website.trim(),
      need: need.trim(),
      business_type: bizType
    };
    if (window.xfAttribution) {
      window.xfAttribution.saveLead(lead);
      // Deliver to GoHighLevel + Google Sheet (endpoints configured in
      // attribution.js; unconfigured ones are skipped).
      window.xfAttribution.sendLead('lead_form', lead);
    }
    if (!firedRef.current) {
      firedRef.current = true;
      const consentOk = !window.xfConsent || window.xfConsent.adUserDataGranted();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_form_submit',
        business_type: bizType || undefined,
        user_email: consentOk && email || undefined
      });
    }
    const fields = Object.assign({
      'form-name': 'lead',
      'bot-field': ''
    }, lead, {
      gclid: attribution.gclid || '',
      gbraid: attribution.gbraid || '',
      wbraid: attribution.wbraid || '',
      utm_source: attribution.utm_source || '',
      utm_medium: attribution.utm_medium || '',
      utm_campaign: attribution.utm_campaign || '',
      page: window.location.pathname
    });
    const body = Object.keys(fields).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(fields[k])).join('&');

    // Netlify Forms endpoint is the site itself. On localhost this 501s —
    // the lead is still preserved in localStorage and the funnel continues.
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    }).catch(() => {}).finally(() => {
      setSubmitting(false);
      setSubmitted(true);
    });
  };
  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 15,
    color: '#1F1A17',
    background: '#FFFFFF',
    border: '1px solid #B7A993',
    borderRadius: 8,
    outline: 'none'
  };
  const labelStyle = {
    display: 'block',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: '#3A322D',
    margin: '0 0 6px'
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(31,26,23,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Tell us about your team",
    className: "lead-modal",
    style: {
      background: '#F7F2EB',
      borderRadius: 16,
      border: '1px solid #D9CFBF',
      width: 'min(880px, 100%)',
      maxHeight: 'min(680px, calc(100vh - 40px))',
      overflow: 'auto',
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      boxShadow: '0 24px 64px rgba(31,26,23,0.28)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      position: 'absolute',
      top: 14,
      right: 14,
      zIndex: 2,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#F7F2EB',
      mixBlendMode: 'difference',
      padding: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22,
    color: "currentColor"
  })), /*#__PURE__*/React.createElement("div", {
    className: "lead-modal-left",
    style: {
      background: '#2C4A3E',
      padding: '36px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "#F0D9A8"
  }, "Why teams pick xFusion"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, window.XF_PROOF_POINTS.map(point => /*#__PURE__*/React.createElement("li", {
    key: point,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      color: '#F7F2EB',
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "#F0D9A8"
  }), point)))), /*#__PURE__*/React.createElement("img", {
    src: "/images/xfusion-team-montage.webp",
    alt: "The xFusion team",
    loading: "lazy",
    style: {
      width: '100%',
      aspectRatio: '4 / 3',
      objectFit: 'cover',
      borderRadius: 12,
      border: '1px solid rgba(247,242,235,0.18)',
      marginTop: 'auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '36px 32px'
    }
  }, !submitted ? /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    noValidate: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 28,
      fontWeight: 600,
      color: '#1F1A17',
      margin: '0 0 6px',
      letterSpacing: '-0.02em'
    }
  }, "Tell us about your team"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      color: '#6B5F56',
      margin: '0 0 22px',
      lineHeight: 1.5
    }
  }, "We'll use this to make the discovery call useful, not generic.", email ? /*#__PURE__*/React.createElement("span", null, " Booking as ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#3A322D'
    }
  }, email), ".") : null), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '-9999px',
      top: 0,
      height: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("label", null, "Leave this field empty", /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "bot-field",
    tabIndex: "-1",
    autoComplete: "off",
    value: botField,
    onChange: e => setBotField(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelStyle,
    htmlFor: "lead-name"
  }, "Your name *"), /*#__PURE__*/React.createElement("input", {
    id: "lead-name",
    ref: firstFieldRef,
    style: inputStyle,
    type: "text",
    value: name,
    onChange: e => setName(e.target.value),
    autoComplete: "name"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelStyle,
    htmlFor: "lead-company"
  }, "Company"), /*#__PURE__*/React.createElement("input", {
    id: "lead-company",
    style: inputStyle,
    type: "text",
    value: company,
    onChange: e => setCompany(e.target.value),
    autoComplete: "organization"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelStyle,
    htmlFor: "lead-website"
  }, "Website"), /*#__PURE__*/React.createElement("input", {
    id: "lead-website",
    style: inputStyle,
    type: "text",
    placeholder: "yourcompany.com",
    value: website,
    onChange: e => setWebsite(e.target.value),
    autoComplete: "url"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelStyle,
    htmlFor: "lead-need"
  }, "What do you need help with?"), /*#__PURE__*/React.createElement("textarea", {
    id: "lead-need",
    rows: "3",
    style: {
      ...inputStyle,
      resize: 'vertical'
    },
    value: need,
    onChange: e => setNeed(e.target.value)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: labelStyle
  }, "What kind of business?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, XF_BUSINESS_TYPES.map(t => {
    const active = bizType === t;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: t,
      onClick: () => setBizType(active ? '' : t),
      "aria-pressed": active,
      style: {
        padding: '8px 14px',
        borderRadius: 999,
        cursor: 'pointer',
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        background: active ? '#B8512C' : 'transparent',
        color: active ? '#F7F2EB' : '#3A322D',
        border: active ? '1px solid transparent' : '1px solid #B7A993',
        transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)'
      }
    }, t);
  }))), error ? /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: '#A8341E'
    }
  }, error) : null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    as: "button",
    onClick: handleSubmit,
    style: {
      width: '100%',
      justifyContent: 'center'
    }
  }, submitting ? 'Saving…' : 'Continue'), /*#__PURE__*/React.createElement(CTAMicrocopy, null, "Next you'll pick a time that suits you. 30 minutes, no pitch deck.")))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: 360
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "One last step"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 30,
      fontWeight: 600,
      color: '#1F1A17',
      margin: '0 0 12px',
      letterSpacing: '-0.02em'
    }
  }, "Thanks", name ? `, ${name.trim().split(' ')[0]}` : '', ". Pick a time that works."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      color: '#3A322D',
      margin: '0 0 28px',
      lineHeight: 1.55
    }
  }, "Grab any slot on the calendar. You'll talk directly with our founding team."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Pick a time ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 18
  })))), /*#__PURE__*/React.createElement("style", null, `
          @media (max-width: 760px) {
            .lead-modal { grid-template-columns: 1fr !important; }
            .lead-modal-left { display: none !important; }
          }
        `)));
}
window.LeadModal = LeadModal;
// --- ../components/LeadCapture.jsx
// Shared Stage-1 email capture: validated email input + "Get started" button
// that opens the qualification modal (LeadModal). Extracted from Hero.jsx so
// the homepage and every vertical landing page run the SAME funnel: one
// email_capture event (fired once, with hashed email), immediate delivery of
// the email via sendLead, then Stage 2 in the modal.
//
// Props:
//   microcopy  - optional node rendered under the form (defaults to the
//                standard line + "book a call directly" escape hatch)
function LeadCapture({
  microcopy,
  compact
}) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleEmailSubmit = e => {
    e.preventDefault();
    const value = email.trim();
    // Strict enough to reject "xyz @ abc . com": no spaces anywhere,
    // one @, and a dot-separated TLD of 2+ letters.
    const valid = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value);
    if (!valid) {
      setEmailError('Please enter a valid work email, like you@company.com.');
      return;
    }
    setEmailError('');
    const normalized = value.toLowerCase();
    if (window.xfAttribution) {
      window.xfAttribution.hashEmail(normalized).then(hash => {
        window.xfAttribution.saveLead({
          email: normalized,
          email_hash: hash || ''
        });
        // Page-global guard: the hero form and the sticky bar are two
        // instances of this component; email_capture must fire once.
        if (!window.__xfEmailCaptureFired) {
          window.__xfEmailCaptureFired = true;
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'email_capture',
            email_hash: hash || undefined
          });
          // Deliver the email immediately (GHL + Sheet) so a visitor who
          // abandons at the modal is still a recoverable lead.
          window.xfAttribution.sendLead('email_capture', {
            email: normalized
          });
        }
        setModalOpen(true);
      });
    } else {
      setModalOpen(true);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleEmailSubmit,
    noValidate: true,
    className: "hero-capture",
    style: {
      display: 'flex',
      gap: compact ? 8 : 12,
      alignItems: 'stretch',
      flexWrap: compact ? 'nowrap' : 'wrap',
      maxWidth: compact ? 440 : 520
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "you@company.com",
    "aria-label": "Work email",
    autoComplete: "email",
    style: {
      flex: compact ? '1 1 180px' : '1 1 240px',
      boxSizing: 'border-box',
      padding: compact ? '11px 14px' : '14px 18px',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      color: '#1F1A17',
      background: '#FFFFFF',
      border: emailError ? '1px solid #A8341E' : '1px solid #B7A993',
      borderRadius: 8,
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: compact ? "md" : "lg",
    as: "button"
  }, "Get started")), emailError ? /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: '#A8341E',
      marginTop: compact ? 6 : 10
    }
  }, emailError) : null, compact ? null : /*#__PURE__*/React.createElement(CTAMicrocopy, null, microcopy || /*#__PURE__*/React.createElement(React.Fragment, null, "30 minutes. No pitch deck. We just figure out if we're a good fit for your team.", ' ', /*#__PURE__*/React.createElement("a", {
    href: "/book/",
    style: {
      color: '#B8512C',
      fontWeight: 500
    }
  }, "Or book a call directly →"))), /*#__PURE__*/React.createElement(LeadModal, {
    open: modalOpen,
    email: (window.xfAttribution ? window.xfAttribution.getLead().email : '') || email.trim().toLowerCase(),
    onClose: () => setModalOpen(false)
  }));
}
window.LeadCapture = LeadCapture;

// Sticky bottom capture bar (landing pages + pricing). Appears once the
// hero capture (#lp-hero-capture) has scrolled out of view, so the form is
// always reachable at the moment the page convinces someone.
function StickyCapture() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    // Dev preview: /page/#sticky-preview forces the bar visible.
    if (window.location.hash === '#sticky-preview') {
      setShow(true);
      return;
    }
    const hero = document.getElementById('lp-hero-capture');
    if (!hero || !('IntersectionObserver' in window)) {
      const onScroll = () => setShow(window.scrollY > 700);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
    const obs = new IntersectionObserver(entries => setShow(!entries[0].isIntersecting && entries[0].boundingClientRect.top < 0), {
      threshold: 0
    });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 800,
      background: 'rgba(247, 242, 235, 0.96)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid #D9CFBF',
      boxShadow: '0 -6px 24px rgba(31,26,23,0.06)',
      padding: '10px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sticky-note",
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      color: '#3A322D',
      whiteSpace: 'nowrap'
    }
  }, "$3,900/mo all-in. 30-day risk-free trial."), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(LeadCapture, {
    compact: true
  }))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 700px) { .sticky-note { display: none; } }
      `));
}
window.StickyCapture = StickyCapture;
// --- ../components/VerticalLanding.jsx
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

// Client roster shown on every LP trust strip (source: homepage marquee in Hero.jsx).
const CLIENT_NAMES = ['Tolstoy', 'SavvyCal', 'Bonify', 'Ordered Magic', 'TheReceptionist', 'SkyFi', 'Revy Apps', 'Crowd Cow', 'Arbio', 'Nextmune', 'Aligned', 'Kioskbuddy'];

// Shared "How it works" steps. Every claim here also lives on /pricing/ and /faq/.
const XF_LP_STEPS = [{
  title: 'Book a 30-minute discovery call',
  text: "Bring your messiest support problem. If we're not the right fit, we'll tell you on the call."
}, {
  title: 'Meet your candidates in about 14 days',
  text: 'A candidate list lands in your inbox, each with a Zoom recording so you can judge English and presence yourself before you meet anyone.'
}, {
  title: 'Start the 30-day risk-free trial',
  text: "Your agent works your real queue for 30 full days. Not satisfied, for any reason? You walk away without paying anything."
}, {
  title: 'We manage from there',
  text: 'QA on real tickets, coaching, culture and engagement, backup coverage, and an account manager. Month-to-month, no long-term contract.'
}];

// Shared three-way comparison. Cost figures come from /pricing/.
const XF_LP_COMPARISON = [{
  name: 'Hire in-house',
  rows: ['$6,600 to $8,300+ per month for a senior U.S. rep', 'Months of sourcing and interviews', 'You run training, payroll, QA, and coverage', 'Good ones often quit within 18 months']
}, {
  name: 'Typical BPO',
  rows: ['Looks cheap per seat, junior reps reading scripts', 'Shared or rotating agents who never learn your product', 'You chase quality instead of doing your job', 'Quarterly or annual contracts']
}, {
  name: 'xFusion',
  featured: true,
  rows: ['$3,900/mo all-in, one flat rate', 'A dedicated senior, AI-trained agent', 'We run recruiting, training, payroll, QA, and backup', 'Month-to-month, 30-day risk-free trial']
}];

// Shared "how your agent learns" phases. Source: Partnership Onboarding Guide
// (client-led initial training, review sessions, draft mode, approved go-live).
const XF_LP_LEARN = [{
  label: 'Phase 1',
  title: 'You teach the first agent',
  text: 'One round of training led by your team: product, brand and tone, your helpdesk, escalation paths. Every agent after that, we train.'
}, {
  label: 'Phase 2',
  title: 'They study before they speak',
  text: 'Review sessions to absorb what they learned and prepare questions, while we turn it into documented processes your whole future team inherits.'
}, {
  label: 'Phase 3',
  title: 'Draft mode',
  text: 'For the first days, every reply is a draft: reviewed by their xFusion team leader, then approved by you, before a customer ever sees it.'
}, {
  label: 'Phase 4',
  title: 'Live, with guardrails',
  text: 'Replies go live only with your sign-off. SLAs set together, KPIs tracked, QA continuous, and escalations routed to the right team.'
}];

// Shared "people behind your queue" block. Same account managers as /about/.
const XF_LP_TEAM = [{
  name: 'Martin Onami',
  role: 'Account Manager',
  img: '/images/martin-onami-lp.webp'
}, {
  name: 'Reggie Rendal',
  role: 'Account Manager',
  img: '/images/reggie-rendal-lp.webp'
}, {
  name: 'Marie Medina',
  role: 'Account Manager',
  img: '/images/marie-medina-lp.webp'
}];
function VerticalLanding() {
  const cfg = window.XF_LP;
  const faq = window.XF_LP_FAQ || [];
  const [openFaq, setOpenFaq] = React.useState(-1);
  const proof = window.XF_PROOF_POINTS || [];
  const check = /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#B8512C",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }));
  const butterCheck = /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#F0D9A8",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, {
    prefix: "/",
    active: "solutions"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#F7F2EB',
      padding: '72px 0 56px'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, cfg.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(36px, 5vw, 58px)',
      fontWeight: 600,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 20px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, cfg.h1), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 30px',
      maxWidth: 620
    }
  }, cfg.sub), /*#__PURE__*/React.createElement("div", {
    id: "lp-hero-capture"
  }, /*#__PURE__*/React.createElement(LeadCapture, {
    microcopy: cfg.microcopy ? /*#__PURE__*/React.createElement(React.Fragment, null, cfg.microcopy, ' ', /*#__PURE__*/React.createElement("a", {
      href: "/book/",
      style: {
        color: '#B8512C',
        fontWeight: 500
      }
    }, "Or book a call directly →")) : undefined
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid #D9CFBF',
      borderBottom: '1px solid #D9CFBF',
      padding: '26px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px 34px',
      justifyContent: 'center'
    }
  }, proof.map(p => /*#__PURE__*/React.createElement("span", {
    key: p,
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14.5,
      fontWeight: 500,
      color: '#3A322D',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9
    }
  }, check, p))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '40px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#6B5F56',
      textAlign: 'center',
      marginBottom: 16
    }
  }, "Trusted by support-driven teams at"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px 26px',
      justifyContent: 'center'
    }
  }, CLIENT_NAMES.map(name => /*#__PURE__*/React.createElement("span", {
    key: name,
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: '#3A322D',
      opacity: 0.7,
      whiteSpace: 'nowrap'
    }
  }, name))))), cfg.metrics && cfg.metrics.length > 0 ? /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '64px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    className: "lp-metrics",
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cfg.metrics.length}, 1fr)`,
      gap: 28
    }
  }, cfg.metrics.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.num,
    style: {
      background: '#EFE8DD',
      borderRadius: 12,
      padding: '28px 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 40,
      fontWeight: 600,
      color: '#B8512C',
      lineHeight: 1,
      marginBottom: 10
    }
  }, m.num), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.55,
      color: '#3A322D',
      margin: 0
    }
  }, m.text, m.href ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("a", {
    href: m.href,
    style: {
      color: '#B8512C'
    }
  }, "Read the case study")) : null)))))) : null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, cfg.values.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: v.title,
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 34,
      height: 34,
      borderRadius: 999,
      background: '#2C4A3E',
      color: '#F0D9A8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 14
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 20,
      fontWeight: 600,
      color: '#1F1A17',
      marginBottom: 6
    }
  }, v.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0,
      maxWidth: 640
    }
  }, v.text))))), cfg.clientsNote ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      color: '#6B5F56',
      margin: '28px 0 0',
      lineHeight: 1.5
    }
  }, cfg.clientsNote) : null)), cfg.tickets && cfg.tickets.length > 0 ? /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 0 72px'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.4vw, 36px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '0 0 22px'
    }
  }, cfg.ticketsTitle || 'What your agent takes off your plate'), /*#__PURE__*/React.createElement("div", {
    className: "lp-tickets",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, cfg.tickets.map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      background: '#EFE8DD',
      borderRadius: 12,
      padding: '16px 18px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      lineHeight: 1.5,
      color: '#3A322D',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 2
    }
  }, check), t))))) : null, cfg.hideLearn ? null : /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 0 72px'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.4vw, 36px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '0 0 12px'
    }
  }, cfg.learnTitle || 'How your agent learns your product'), cfg.learnIntro ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 26px',
      maxWidth: 620
    }
  }, cfg.learnIntro) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "lp-learn",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }
  }, XF_LP_LEARN.map(ph => /*#__PURE__*/React.createElement("div", {
    key: ph.title,
    style: {
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: '22px 22px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#B8512C',
      marginBottom: 10
    }
  }, ph.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 19,
      fontWeight: 600,
      color: '#1F1A17',
      marginBottom: 8
    }
  }, ph.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0
    }
  }, ph.text)))))), cfg.hideSteps ? null : /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#EFE8DD',
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.4vw, 36px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: cfg.stepsLead ? '0 0 12px' : '0 0 30px'
    }
  }, "How it works"), cfg.stepsLead ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 26px',
      maxWidth: 620
    }
  }, cfg.stepsLead) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, (cfg.steps || XF_LP_STEPS).map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.title,
    style: {
      display: 'flex',
      gap: 22,
      alignItems: 'flex-start',
      padding: '22px 0',
      borderTop: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 13,
      color: '#B8512C',
      paddingTop: 4,
      flexShrink: 0
    }
  }, `0${i + 1}`), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 20,
      fontWeight: 600,
      color: '#1F1A17',
      marginBottom: 6
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15.5,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0,
      maxWidth: 600
    }
  }, s.text))))))), cfg.hideComparison ? null : /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.4vw, 36px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '0 0 26px',
      textAlign: 'center'
    }
  }, "Your three options"), /*#__PURE__*/React.createElement("div", {
    className: "lp-compare",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 22,
      alignItems: 'stretch'
    }
  }, XF_LP_COMPARISON.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.name,
    style: {
      background: col.featured ? '#2C4A3E' : '#EFE8DD',
      borderRadius: 12,
      padding: '26px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 21,
      fontWeight: 600,
      color: col.featured ? '#F0D9A8' : '#1F1A17',
      marginBottom: 14
    }
  }, col.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, col.rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14.5,
      lineHeight: 1.55,
      color: col.featured ? '#F7F2EB' : '#3A322D',
      display: 'flex',
      gap: 9,
      alignItems: 'flex-start'
    }
  }, col.featured ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 2
    }
  }, butterCheck) : null, /*#__PURE__*/React.createElement("span", null, r))))))))), (cfg.quotes || []).map(q => /*#__PURE__*/React.createElement("section", {
    key: q.name,
    style: {
      padding: '0 0 64px'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(21px, 2.8vw, 28px)',
      fontWeight: 500,
      fontStyle: 'italic',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      color: '#1F1A17',
      margin: '0 0 22px'
    }
  }, "“", q.text, "”"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: q.img,
    alt: q.name,
    loading: "lazy",
    width: "52",
    height: "52",
    style: {
      width: 52,
      height: 52,
      borderRadius: 999,
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      color: '#3A322D',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: 'block',
      fontWeight: 600
    }
  }, q.name), q.role))))), cfg.caseStudies && cfg.caseStudies.length > 0 ? cfg.caseStudies.some(c => c.stat) ? /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 0 72px'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#6B5F56',
      marginBottom: 18,
      textAlign: 'center'
    }
  }, "Case studies"), /*#__PURE__*/React.createElement("div", {
    className: "lp-cs-cards",
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.min(cfg.caseStudies.length, 4)}, 1fr)`,
      gap: 18
    }
  }, cfg.caseStudies.map(c => /*#__PURE__*/React.createElement("a", {
    key: c.href,
    href: c.href,
    style: {
      display: 'block',
      textDecoration: 'none',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: '22px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 18,
      fontWeight: 600,
      color: '#1F1A17',
      marginBottom: c.stat || c.statText ? 10 : 0
    }
  }, c.label), c.stat ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 30,
      fontWeight: 600,
      color: '#B8512C',
      lineHeight: 1,
      marginBottom: 6
    }
  }, c.stat) : null, c.statText ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13.5,
      lineHeight: 1.5,
      color: '#3A322D',
      marginBottom: 10
    }
  }, c.statText) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13.5,
      fontWeight: 500,
      color: '#B8512C'
    }
  }, "Read the case study →")))))) : /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 0 72px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#6B5F56',
      marginBottom: 16
    }
  }, "Case studies"), cfg.caseStudies.map(c => /*#__PURE__*/React.createElement("a", {
    key: c.href,
    href: c.href,
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 18,
      fontWeight: 500,
      color: '#3A322D',
      textDecoration: 'none',
      borderBottom: '1px solid #B7A993',
      margin: '0 14px'
    }
  }, c.label)))) : null, cfg.hideTeam ? null : /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid #D9CFBF',
      padding: '64px 0 72px'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.4vw, 36px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '0 0 12px'
    }
  }, "The people behind your queue"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 28px',
      maxWidth: 620
    }
  }, "An account manager is included in the flat rate. They run QA on real tickets, coach your agent, and arrange backup coverage, so support quality is somebody's actual job, not a thing you check on at midnight."), /*#__PURE__*/React.createElement("div", {
    className: "lp-team",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 20
    }
  }, XF_LP_TEAM.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.name
  }, /*#__PURE__*/React.createElement("img", {
    src: t.img,
    alt: t.name,
    loading: "lazy",
    style: {
      width: '100%',
      aspectRatio: '4 / 5',
      objectFit: 'cover',
      borderRadius: 12,
      display: 'block',
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 17,
      fontWeight: 600,
      color: '#1F1A17'
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13.5,
      color: '#6B5F56'
    }
  }, t.role)))))), faq.length > 0 ? /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 0 72px'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.4vw, 36px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '0 0 22px'
    }
  }, "Common questions"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #D9CFBF'
    }
  }, faq.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderBottom: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenFaq(openFaq === i ? -1 : i),
    "aria-expanded": openFaq === i,
    style: {
      width: '100%',
      background: 'transparent',
      border: 'none',
      padding: '20px 4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 20,
      textAlign: 'left',
      cursor: 'pointer',
      fontFamily: "'Source Serif 4', serif",
      fontSize: 19,
      fontWeight: 600,
      color: '#1F1A17',
      lineHeight: 1.3
    }
  }, /*#__PURE__*/React.createElement("span", null, it.q), /*#__PURE__*/React.createElement(Icon, {
    name: openFaq === i ? 'minus' : 'plus',
    size: 14,
    color: "#1F1A17",
    stroke: 2
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: openFaq === i ? 600 : 0,
      overflow: 'hidden',
      transition: 'max-height 320ms cubic-bezier(0.4,0,0.6,1)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.65,
      color: '#3A322D',
      margin: 0,
      padding: '0 4px 24px',
      maxWidth: 680
    }
  }, it.a))))))) : null, cfg.resources && cfg.resources.length > 0 ? /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 0 72px'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#6B5F56',
      marginBottom: 16
    }
  }, "Keep reading"), /*#__PURE__*/React.createElement("div", {
    className: "lp-resources",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 16
    }
  }, cfg.resources.map(r => /*#__PURE__*/React.createElement("a", {
    key: r.href,
    href: r.href,
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 14,
      textDecoration: 'none',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: '20px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 17,
      fontWeight: 600,
      lineHeight: 1.35,
      color: '#1F1A17'
    }
  }, r.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13.5,
      fontWeight: 500,
      color: '#B8512C'
    }
  }, "Read the post →")))))) : null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 0 96px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(28px, 3.6vw, 40px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '0 0 14px'
    }
  }, cfg.closingH2), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      color: '#3A322D',
      margin: '0 auto 28px',
      maxWidth: 520,
      lineHeight: 1.6
    }
  }, cfg.closingText), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement(CTAMicrocopy, {
    color: "#6B5F56",
    style: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }, "30 minutes. No commitment. No credit card. You'll talk directly with our founding team.")))), /*#__PURE__*/React.createElement(StickyCapture, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement("style", null, `
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
      `));
}
window.VerticalLanding = VerticalLanding;
// --- (inline)
const XF_LP_FAQ = [{
  "q": "What does e-commerce customer support cost with xFusion?",
  "a": "$3,900 per month, all-inclusive. That covers a senior, AI-trained support agent plus recruiting, training, payroll, QA, culture, and an account manager. No setup fees, no deposits, and no long-term contract."
}, {
  "q": "Can you cover evenings, weekends, and peak season?",
  "a": "Your agent works full-time hours, and because they're based in the Philippines or Kenya you have room to structure coverage however you want. Some clients align to U.S. business hours, others stagger shifts to cover evenings or weekends. You pick the schedule; we handle the management."
}, {
  "q": "Will the agent sound like our brand?",
  "a": "Yes. Your agent learns your products, policies, and tone the way an in-house hire would. Across our client base, customers regularly don't realize they aren't talking to the in-house team."
}, {
  "q": "What if it doesn't work out?",
  "a": "That's what the 30-Day Risk-Free Trial is for. You work with your agent for 30 full days, and if you're not satisfied for any reason, you walk away without paying anything."
}, {
  "q": "Will they speak good English?",
  "a": "Every candidate sits through interviews with a real person where we check English skills, how they talk, and how they come across. Before you meet with anyone, you'll watch a Zoom recording of them, so you can judge for yourself instead of taking our word for it."
}, {
  "q": "How do you keep my agent engaged long-term?",
  "a": "Culture and engagement are included in the $3,900/mo. We run team-building events, contests, branded swag, and birthday, anniversary, and holiday gifting. Pair that with a role that pays a real living wage in the agent's local economy, and you get someone who builds a career on your team rather than rotating through."
}, {
  "q": "Why not just use a chatbot?",
  "a": "AI on its own handles the easy 60% of support work well. The hard 40% (angry customers, weird cases, judgment calls, sensitive issues) is where chatbot-only setups break, often in public. Our senior agents use AI as a tool, not a replacement: AI handles the easy stuff, and they step in for the moments that matter."
}, {
  "q": "What about security and data access?",
  "a": "Your agent works inside your helpdesk and your tools, not ours, so you control exactly what they can access and can revoke it any time. Every agent is vetted before placement, works under confidentiality agreements, and is offboarded with a defined access checklist. The full picture is in the security overview at xfusion.io/security."
}, {
  "q": "How do you protect our brand voice while the agent ramps up?",
  "a": "Draft mode. For the first days, every reply your agent writes is a draft: their xFusion team leader reviews it, then you approve it, before it reaches a customer. Replies switch to live only once you sign off. By then the agent has been trained on your product, your tone, and your helpdesk, and what they learned is documented for every agent who comes after."
}];
window.XF_LP_FAQ = XF_LP_FAQ;
window.XF_LP = {
  "eyebrow": "For e-commerce and DTC brands",
  "h1": "Peak season support, without the seasonal chaos.",
  "sub": "Order status, returns, refunds, and review pressure don't wait, and hiring seasonal support means retraining strangers every year. We place a senior, AI-trained agent who learns your products and your brand voice, then we manage them for you, year-round.",
  "microcopy": "Tell us what peak season does to your queue. 30 minutes, no pitch deck.",
  "metrics": [],
  "values": [{
    "title": "Peak season? Same team.",
    "text": "Your agent is with you year-round, so Black Friday is handled by someone who already knows your catalog, your policies, and your customers. Coverage can be structured for evenings and weekends."
  }, {
    "title": "Returns, refunds, and reviews with judgment",
    "text": "AI handles the routine order-status volume; your senior agent steps in on the refund calls, the angry one-star review, and the edge cases that decide whether a customer comes back."
  }, {
    "title": "Scale support, not payroll",
    "text": "One flat rate: $3,900/mo all-in for the agent plus recruiting, training, payroll, QA, and management. Month-to-month, starting with a 30-day risk-free trial."
  }],
  "clientsNote": "E-commerce and DTC teams we support include Crowd Cow and Autism Products.",
  "quotes": [{
    "text": "I was sure outsourcing would mean dropped tickets, the wrong tone, and an exploding workload. None of that happened. I thought my life was going to become a living hell. It was extraordinary instead.",
    "name": "Toby Marsden",
    "role": "Founder, Ordered Magic",
    "img": "/images/toby-marsden-ordered-magic.webp"
  }],
  "caseStudies": [],
  "tickets": ["Order status and tracking (the WISMO flood)", "Returns, exchanges, and refunds", "Chargebacks and payment disputes", "Review and marketplace responses", "Policy and product questions", "Peak-season overflow"],
  "resources": [{
    "title": "Unpacking the back-office: why outsourcing is the go-to for Shopify retailers",
    "href": "/customer-experience/unpacking-the-back-office-why-outsourcing-is-the-go-to-for-shopify-retailers/"
  }, {
    "title": "Outsourcing in SaaS, eCommerce, and Shopify apps",
    "href": "/customer-experience/outsourcing-in-saas-ecommerce-and-shopify-apps-a-crucial-pivot-in-todays-business-landscape/"
  }, {
    "title": "Benefits of outsourcing customer support for your business",
    "href": "/xfusion/benefits-of-outsourcing-customer-support-for-your-business/"
  }],
  "learnTitle": "How your agent learns your store",
  "learnIntro": "Your catalog, your policies, your shipping promises, and the tone your customers expect.",
  "stepsLead": "Set it up once, and peak season stops being a staffing scramble.",
  "closingH2": "Scale support, not payroll.",
  "closingText": "Tell us what your queue looks like at peak, and we'll tell you honestly whether we can staff it. If not, you'll leave with a clearer picture either way."
};
function App() {
  return /*#__PURE__*/React.createElement(VerticalLanding, null);
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));