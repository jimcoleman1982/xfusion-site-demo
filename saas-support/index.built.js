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
  microcopy
}) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const capturedRef = React.useRef(false);
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
        if (!capturedRef.current) {
          capturedRef.current = true;
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
      gap: 12,
      alignItems: 'stretch',
      flexWrap: 'wrap',
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "you@company.com",
    "aria-label": "Work email",
    autoComplete: "email",
    style: {
      flex: '1 1 240px',
      boxSizing: 'border-box',
      padding: '14px 18px',
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
    size: "lg",
    as: "button"
  }, "Get started")), emailError ? /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: '#A8341E',
      marginTop: 10
    }
  }, emailError) : null, /*#__PURE__*/React.createElement(CTAMicrocopy, null, microcopy || /*#__PURE__*/React.createElement(React.Fragment, null, "30 minutes. No pitch deck. We just figure out if we're a good fit for your team.", ' ', /*#__PURE__*/React.createElement("a", {
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
//   quotes: [{ text, name, role, img }],    // 0-2 verified testimonials
//   caseStudies: [{ label, href }],         // related case study links (empty = hidden)
//   clientsNote?,                           // optional plain-text line (e.g. named clients)
//   closingH2, closingText,
// }

// Client roster shown on every LP trust strip (source: homepage marquee in Hero.jsx).
const CLIENT_NAMES = ['Tolstoy', 'SavvyCal', 'Bonify', 'Ordered Magic', 'TheReceptionist', 'SkyFi', 'Revy Apps', 'Crowd Cow', 'Arbio', 'Nextmune', 'Aligned', 'Kioskbuddy'];
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
  }, cfg.sub), /*#__PURE__*/React.createElement(LeadCapture, {
    microcopy: cfg.microcopy ? /*#__PURE__*/React.createElement(React.Fragment, null, cfg.microcopy, ' ', /*#__PURE__*/React.createElement("a", {
      href: "/book/",
      style: {
        color: '#B8512C',
        fontWeight: 500
      }
    }, "Or book a call directly →")) : undefined
  }))), /*#__PURE__*/React.createElement("section", {
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
  }, cfg.clientsNote) : null)), (cfg.quotes || []).map(q => /*#__PURE__*/React.createElement("section", {
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
  }, q.name), q.role))))), cfg.caseStudies && cfg.caseStudies.length > 0 ? /*#__PURE__*/React.createElement("section", {
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
  }, c.label)))) : null, faq.length > 0 ? /*#__PURE__*/React.createElement("section", {
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
  }, it.a))))))) : null, /*#__PURE__*/React.createElement("section", {
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
  }, "30 minutes. No commitment. No credit card. You'll talk directly with our founding team.")))), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 800px) {
          .lp-metrics { grid-template-columns: 1fr !important; }
        }
      `));
}
window.VerticalLanding = VerticalLanding;
// --- (inline)
const XF_LP_FAQ = [{
  q: 'What does outsourced SaaS customer support cost with xFusion?',
  a: "$3,900 per month, all-inclusive. That covers a senior, AI-trained support agent plus recruiting, training, payroll, QA, culture, and an account manager. No setup fees, no deposits, and no long-term contract."
}, {
  q: 'How fast can an agent start?',
  a: 'About 14 days from your discovery call to a candidate list in your inbox. We keep a pool of senior, AI-trained support candidates ready to go, which is why we can move that fast without cutting corners.'
}, {
  q: 'Can the agent handle technical SaaS tickets?',
  a: "Yes. Every agent we place is senior, trained to use AI, and able to handle Tier 1, Tier 2, and some cases that used to need an engineer's help. They learn your product, APIs, and edge cases the way an in-house hire would."
}, {
  q: "What if it doesn't work out?",
  a: "That's what the 30-Day Risk-Free Trial is for. You work with your agent for 30 full days, and if you're not satisfied for any reason, you walk away without paying anything."
}];
window.XF_LP_FAQ = XF_LP_FAQ;
window.XF_LP = {
  eyebrow: 'For SaaS founders',
  h1: 'Stop answering tickets. Get back to building.',
  sub: "Your customer satisfaction built your reputation, and now the inbox is eating the time you need to ship product. We place a senior, AI-trained support agent who learns your product the way an in-house hire would, then we manage them for you: recruiting, payroll, culture, and performance.",
  microcopy: 'Get your mornings back. 30 minutes, no pitch deck.',
  metrics: [{
    num: '98.9%',
    text: 'Customer satisfaction held by our team at TheReceptionist, with 100% scores in most months of the partnership.',
    href: '/case-studies/the-receptionist/'
  }, {
    num: '84.79%',
    text: 'Reduction in average reply time at SavvyCal. Customers got answers in a fraction of the time they used to wait.',
    href: '/case-studies/savvycal/'
  }, {
    num: '6x',
    text: 'Ticket volume growth absorbed at TheReceptionist (63 to 375 conversations a month) without the quality numbers moving.'
  }],
  values: [{
    title: 'A senior agent who learns your product deeply',
    text: 'Your features, your edge cases, your customers’ workflows. Technical, but human. Not a freelancer, not a script reader.'
  }, {
    title: 'AI leverage without the chatbot risk',
    text: 'Your agent uses AI to do the work of several junior reps: drafting replies, triaging, and running the routine cases, with senior judgment stepping in where it counts.'
  }, {
    title: 'Everything else is our job',
    text: 'Recruiting, payroll, training, QA, culture, and backup coverage. One flat rate, month-to-month, starting with a 30-day risk-free trial.'
  }],
  quotes: [{
    text: "This is not your stereotypical outsourced support agency. They've cut our average response time by 84.79% and freed me up to focus on running the business.",
    name: 'Derrick Reimer',
    role: 'Founder, SavvyCal',
    img: '/images/derrick-reimer-savvycal.webp'
  }, {
    text: 'When we first met with Jim and David, we were immediately struck by their values and commitment to their employees, which meshed with ours completely. Attentive. Hire the best people. We see no reason to stop.',
    name: 'Tom Foster',
    role: 'TheReceptionist',
    img: '/images/tom-foster-thereceptionist.webp'
  }],
  caseStudies: [{
    label: 'SavvyCal',
    href: '/case-studies/savvycal/'
  }, {
    label: 'TheReceptionist',
    href: '/case-studies/the-receptionist/'
  }, {
    label: 'SkyFi',
    href: '/case-studies/skyfi/'
  }, {
    label: 'Tolstoy',
    href: '/case-studies/tolstoy/'
  }],
  closingH2: 'Your product deserves your mornings back.',
  closingText: "Come with your messiest support problem. If we're not the right fit, we'll tell you, and you'll leave with a clearer picture either way."
};
function App() {
  return /*#__PURE__*/React.createElement(VerticalLanding, null);
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));