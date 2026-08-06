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

// Fire a secondary-conversion signal on every Book-a-Call CTA click. GTM
// (GTM-KX8T76BC) listens for `book_button_click` and maps it to a secondary
// Google Ads conversion. The primary SavvyCal booking conversion is untouched.
// Synchronous push so it records before the same-tab navigation to /book/.
function xfBookClick(position) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'book_button_click',
      cta_position: position || 'unknown',
      page_path: window.location && window.location.pathname || '',
      device: window.matchMedia && window.matchMedia('(max-width: 700px)').matches ? 'mobile' : 'desktop'
    });
  } catch (e) {/* never let tracking break a click */}
}
Object.assign(window, {
  Container,
  Section,
  Eyebrow,
  Button,
  PhotoPlaceholder,
  PhotoCircle,
  Icon,
  CTAMicrocopy,
  xfBookClick
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
  desc: 'Experienced, dedicated, managed',
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
    title: 'Industries',
    links: [['Shopify apps', '/shopify-app-support/'], ['SaaS', '/saas-support/'], ['E-commerce & DTC', '/ecommerce-support/']],
    note: ['Also supporting hospitality, healthcare, and marketplace teams.', '/book/']
  }, {
    title: 'Solutions',
    links: [['Hire a specialist', '/hire-support-agents/'], ['Support outsourcing', '/customer-support-outsourcing/'], ['Pricing', '/pricing/'], ['Case studies', '/case-studies/']]
  }, {
    title: 'Company',
    links: [['About', '/about/'], ['Careers', '/careers/'], ['Contact', '/contact/']]
  }, {
    title: 'Resources',
    links: [['Reviews', '/reviews/'], ['FAQ', '/faq/'], ['Blog', '/blog/']]
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
    href: "/",
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
  }, "Experienced customer support specialists, AI-trained. For small businesses since 2020."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: 'rgba(247,242,235,0.6)',
      margin: '12px 0 0',
      maxWidth: 480
    }
  }, "xFusion Ops LLC · 11001 W 120th Ave, Broomfield, CO 80021"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
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
  }, label)))), col.note ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      lineHeight: 1.55,
      color: MUTED,
      margin: '16px 0 0',
      maxWidth: 220
    }
  }, col.note[0], ' ', /*#__PURE__*/React.createElement("a", {
    href: col.note[1],
    className: "footer-link",
    style: {
      color: BUTTER,
      textDecoration: 'none',
      fontWeight: 500
    }
  }, "Book a call →")) : null))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("div", null, "© 2026 xFusion. All rights reserved. · ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/company/xfusion-customer-support",
    className: "footer-link",
    target: "_blank",
    rel: "noopener",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "LinkedIn")), /*#__PURE__*/React.createElement("div", null, "Made with care across the Philippines, Kenya, and the United States."))), /*#__PURE__*/React.createElement("style", null, `
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
// --- (inline)
const GLASSDOOR = 'https://www.glassdoor.com/Overview/Working-at-xFusion-EI_IE4100993.11,18.htm';
function ReviewQuote({
  text,
  name,
  role
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '3px solid #E4DAC9',
      padding: '4px 0 4px 22px',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(19px, 2.4vw, 24px)',
      fontStyle: 'italic',
      lineHeight: 1.4,
      color: '#1F1A17',
      margin: '0 0 12px'
    }
  }, "“", text, "”"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14.5,
      color: '#3A322D'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 600
    }
  }, name), role ? `, ${role}` : ''));
}
function ReviewsPage() {
  const results = [{
    stat: '98.9%',
    text: 'CSAT held at TheReceptionist while ticket volume grew 6x.',
    href: '/case-studies/the-receptionist/'
  }, {
    stat: '84.79%',
    text: 'reduction in average reply time at SavvyCal.',
    href: '/case-studies/savvycal/'
  }, {
    stat: '1 → 11',
    text: 'from one specialist to an 11-person team at Tolstoy.',
    href: '/case-studies/tolstoy/'
  }, {
    stat: '$60M',
    text: 'Series B raised in 2026 by Aligned, whose customer support runs with xFusion.',
    href: null
  }, {
    stat: '91.9%',
    text: 'CSAT across 185 countries at SkyFi, which raised an oversubscribed $12.7M Series A in 2026.',
    href: '/case-studies/skyfi/'
  }];
  const glass = [{
    num: '4.6 / 5',
    label: 'employee rating (16 reviews), 20% above the staffing-industry average'
  }, {
    num: '100%',
    label: 'would recommend working here to a friend'
  }, {
    num: '100%',
    label: 'CEO approval'
  }, {
    num: '93%',
    label: 'positive business outlook'
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Reviews"
  }, /*#__PURE__*/React.createElement(Nav, {
    current: "reviews"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "md"
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Reviews"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(34px, 5vw, 54px)',
      fontWeight: 600,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      margin: '0 0 20px',
      color: '#1F1A17'
    }
  }, "What people say about working with us, and working here."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0,
      maxWidth: 640
    }
  }, "We’re a small company with a short list of clients and a long list of receipts. Results below link to the case study, and employee ratings link to Glassdoor. If you’re doing diligence on xFusion, this page is the shortcut."))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "md"
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.4vw, 36px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '0 0 30px'
    }
  }, "What clients say"), /*#__PURE__*/React.createElement(ReviewQuote, {
    text: "I work with xFusion, and they are truly incredible. I'm glad I found them. They handle the support for our Shopify app and are doing a fantastic job.",
    name: "Jean-Noël Mathonnet",
    role: "Shopify app founder"
  }), /*#__PURE__*/React.createElement(ReviewQuote, {
    text: "The xFusion team has been an absolute game-changer for Tolstoy. Working with them has enabled us to grow faster and more professionally than we ever could have alone. I can't praise and thank the team enough. This partnership is so valuable to our company.",
    name: "Dov Kaufmann",
    role: "Tolstoy"
  }), /*#__PURE__*/React.createElement(ReviewQuote, {
    text: "I was sure outsourcing would mean dropped tickets and an exploding workload. None of that happened. It was extraordinary instead.",
    name: "Tom Foster",
    role: "TheReceptionist"
  }), /*#__PURE__*/React.createElement(ReviewQuote, {
    text: "A timely, friendly response from a human that had all the info I needed to get unstuck. Repeated that process two more times.",
    name: "Roy Tomeij",
    role: "Founder, AppSignal, on the support behind SavvyCal"
  }), /*#__PURE__*/React.createElement("div", {
    className: "rv-results",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 18,
      marginTop: 20
    }
  }, results.map((r, i) => {
    const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Source Serif 4', serif",
        fontSize: 26,
        fontWeight: 600,
        color: '#B8512C',
        lineHeight: 1,
        marginBottom: 8
      }
    }, r.stat), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 13.5,
        lineHeight: 1.5,
        color: '#3A322D'
      }
    }, r.text), r.href ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        color: '#B8512C',
        marginTop: 8
      }
    }, "Read the case study →") : null);
    return r.href ? /*#__PURE__*/React.createElement("a", {
      key: i,
      href: r.href,
      style: {
        display: 'block',
        textDecoration: 'none',
        border: '1px solid #D9CFBF',
        borderRadius: 12,
        padding: '20px 18px'
      }
    }, inner) : /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        border: '1px solid #D9CFBF',
        borderRadius: 12,
        padding: '20px 18px'
      }
    }, inner);
  })))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "md"
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.4vw, 36px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '0 0 18px'
    }
  }, "What our team says"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 28px',
      maxWidth: 640
    }
  }, "Support quality is a retention problem in disguise. Specialists who are paid well, managed well, and respected stay for years, and a specialist who stays is one who knows your product cold. So we hold ourselves to public account on both sides of the relationship."), /*#__PURE__*/React.createElement("div", {
    className: "rv-glass",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 18,
      marginBottom: 30
    }
  }, glass.map((g, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: GLASSDOOR,
    target: "_blank",
    rel: "noopener",
    style: {
      display: 'block',
      textDecoration: 'none',
      background: '#F8EBC9',
      border: '1px solid #E6C683',
      borderRadius: 12,
      padding: '20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 26,
      fontWeight: 600,
      color: '#1F1A17',
      lineHeight: 1,
      marginBottom: 8
    }
  }, g.num), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13.5,
      lineHeight: 1.5,
      color: '#3A322D'
    }
  }, g.label)))), /*#__PURE__*/React.createElement(ReviewQuote, {
    text: "As I'm about to complete my second year here, I'm working hard to do well in my current job to show my appreciation.",
    name: "xFusion support specialist",
    role: "anonymous employee survey"
  }), /*#__PURE__*/React.createElement(ReviewQuote, {
    text: "Joining this team opened my eyes to capabilities I never knew I had.",
    name: "xFusion support specialist",
    role: "anonymous employee survey"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      color: '#3A322D',
      margin: 0
    }
  }, "Curious what it’s like on the inside?", ' ', /*#__PURE__*/React.createElement("a", {
    href: "/careers/",
    style: {
      color: '#B8512C',
      fontWeight: 500
    }
  }, "See Life at xFusion →")))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "md"
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(24px, 3vw, 32px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '0 0 16px'
    }
  }, "Don’t take our word for it."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 22px',
      maxWidth: 640
    }
  }, "We don’t chase reviews as a growth tactic. Our proof is named clients with real numbers, and a 30-day risk-free trial where we absorb every dollar of recruiting and training if we don’t earn our place. It’s all public, and easy to check:"), /*#__PURE__*/React.createElement("ul", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.9,
      color: '#3A322D',
      margin: 0,
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, "Google Reviews, 5.0 stars"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: GLASSDOOR,
    target: "_blank",
    rel: "noopener",
    style: {
      color: '#B8512C',
      fontWeight: 500
    }
  }, "Glassdoor, 4.6 stars")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/case-studies/",
    style: {
      color: '#B8512C',
      fontWeight: 500
    }
  }, "Case studies"), ", 7 published with named clients and real numbers"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/company/xfusion-customer-support",
    target: "_blank",
    rel: "noopener",
    style: {
      color: '#B8512C',
      fontWeight: 500
    }
  }, "LinkedIn"))))), /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "md",
    style: {
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
  }, "The fastest way to evaluate us is a conversation."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      color: '#3A322D',
      margin: '0 auto 28px',
      maxWidth: 520,
      lineHeight: 1.6
    }
  }, "Come with your messiest support problem. 30 minutes, no pitch deck. If we’re not the right fit, we’ll tell you."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/",
    onClick: () => window.xfBookClick ? window.xfBookClick('reviews') : null
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement(CTAMicrocopy, {
    color: "#6B5F56",
    style: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 580
    }
  }, "30 minutes. No commitment. No credit card. You’ll talk directly with our founding team.")))), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ReviewsPage, null));