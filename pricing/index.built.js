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
// Site nav -- shared structure across all pages.
// Vary only `active` and the `prefix` (relative path to site root).
// On homepage, prefix = '' so links are 'about/', 'case-studies/', 'blog/'.
function Nav({
  active = 'home',
  prefix = ''
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const homeHref = prefix === '' ? './' : prefix;
  const links = [{
    id: 'home',
    label: 'Home',
    href: homeHref
  }, {
    id: 'about',
    label: 'About',
    href: prefix + 'about/'
  }, {
    id: 'case-studies',
    label: 'Case studies',
    href: prefix + 'case-studies/'
  }, {
    id: 'pricing',
    label: 'Pricing',
    href: prefix + 'pricing/'
  }, {
    id: 'blog',
    label: 'Blog',
    href: prefix + 'blog/'
  }];
  const linkBase = {
    color: '#1F1A17',
    textDecoration: 'none',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 14,
    whiteSpace: 'nowrap',
    paddingBottom: 4
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
    transition: 'background 160ms cubic-bezier(0.4,0,0.6,1)'
  };
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
    href: homeHref,
    "aria-label": "xFusion home",
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 0,
      textDecoration: 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/xfusion-logo.png",
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
      marginLeft: 16
    }
  }, links.map(l => {
    const isActive = l.id === active;
    return /*#__PURE__*/React.createElement("a", {
      key: l.id,
      href: l.href,
      "aria-current": isActive ? 'page' : undefined,
      style: {
        ...linkBase,
        fontWeight: isActive ? 500 : 400,
        borderBottom: isActive ? '1.5px solid #B8512C' : '1.5px solid transparent'
      }
    }, l.label);
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-cta",
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/book/",
    style: ctaStyle
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
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'x' : 'menu',
    size: 20
  }))), open && /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile-panel",
    style: {
      display: 'none',
      paddingBottom: 16,
      paddingTop: 8,
      borderTop: '1px solid #D9CFBF'
    }
  }, links.map(l => {
    const isActive = l.id === active;
    return /*#__PURE__*/React.createElement("a", {
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
        fontWeight: isActive ? 600 : 400,
        borderBottom: '1px solid #EFE8DD'
      }
    }, l.label);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/book/",
    style: {
      ...ctaStyle,
      fontSize: 15,
      padding: '12px 20px',
      display: 'block',
      textAlign: 'center'
    }
  }, "Book a Discovery Call")))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 820px) {
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
// --- (inline)
const XF_LP_FAQ = [{
  q: "How much does xFusion cost?",
  a: "$3,900 per month per senior, AI-trained support agent, all-inclusive. That covers the agent's salary, recruiting and vetting, onboarding, training, payroll, culture and engagement, QA, a dedicated account manager, and ongoing coaching. There are no setup fees, no deposits, and no add-ons."
}, {
  q: "Are there setup fees, deposits, or long-term contracts?",
  a: "No. The service is month-to-month with no minimum term, no deposit, no setup fee, and no fine print. The 30-Day Risk-Free Trial means you pay nothing for the first month and walk away free if it's not a fit."
}, {
  q: "Why is $3,900/mo the right price?",
  a: "Two reasons. First, every agent we place is senior, with more experience than a typical support hire, and trained to use AI tools to handle the easy stuff. So one xFusion agent does a lot more work than a junior rep at a cheaper agency. The cost per ticket is actually lower. Second, $3,900 is about half what you'd pay for the same kind of person in the U.S., and it includes hiring, training, payroll, culture, and an account manager."
}, {
  q: "How does xFusion pricing compare to hiring in the U.S.?",
  a: "Senior support reps in the U.S. who know AI cost $80,000 to $100,000+ per year, which is $6,600 to $8,300+ per month once you add benefits, taxes, payroll, equipment, hiring fees, and management costs. xFusion is $3,900 per month all-in, and you skip the months-long search."
}, {
  q: "How is xFusion different from cheaper outsourcing companies?",
  a: "Cheaper agencies staff junior agents reading scripts, and the low hourly rate usually excludes training, QA, and management layers. Every xFusion agent is senior and AI-trained, so one agent does the work of several junior reps, and the flat price includes everything. The 30-Day Risk-Free Trial means we absorb the risk, not you."
}, {
  q: "How does xFusion compare to Influx?",
  a: "Influx is a larger provider that prices most engagements through a sales conversation, and management layers are typically part of higher tiers. xFusion publishes one number: $3,900 per month all-in, including training, QA, management, and backup coverage, starting with a 30-day risk-free trial. If you need dozens of seats overnight, a volume provider may fit better. If you want a senior agent who learns your product and stays for years, that's what we do."
}];
window.XF_LP_FAQ = XF_LP_FAQ;
const INCLUDED = [['Senior support agent salary (full-time, dedicated to you)', '$3,500/mo'], ['Hiring and screening through the TraitX Framework', '$375/mo value'], ['Placement and onboarding into your business', '$1,500 one-time'], ['Training in your support process', '$750 one-time'], ['Training and certification in AI-powered support tools', '$1,500 one-time'], ['Payroll services (paying salaries, light HR, time off)', '$300/mo'], ['Culture and engagement (team-building, swag, gifts, anniversaries)', '$200/mo'], ['Dedicated account manager (leads and supports your agent)', '$1,200/mo'], ['Ongoing performance management and coaching', '$500/mo']];
function PricingPage() {
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
    active: "pricing"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#F7F2EB',
      padding: '72px 0 56px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Pricing"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(36px, 5vw, 58px)',
      fontWeight: 600,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "One plan. One price. Everything included."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(56px, 8vw, 96px)',
      fontWeight: 600,
      color: '#B8512C',
      lineHeight: 1,
      letterSpacing: '-0.03em'
    }
  }, "$3,900", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.35em',
      color: '#3A322D',
      fontWeight: 400
    }
  }, "/month")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      color: '#3A322D',
      margin: '18px auto 30px',
      maxWidth: 520,
      lineHeight: 1.6
    }
  }, "Per senior, AI-trained support agent, fully managed. Month-to-month. No setup fees, no deposits, no add-ons. Unlike most providers, the price is public because it doesn't change in a sales call."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(LeadCapture, null))))), /*#__PURE__*/React.createElement("section", {
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
      margin: '0 0 8px',
      textAlign: 'center'
    }
  }, "What $3,900 includes"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      color: '#6B5F56',
      textAlign: 'center',
      margin: '0 0 28px'
    }
  }, "Every line below is part of the flat rate. Standalone values shown for comparison."), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #D9CFBF'
    }
  }, INCLUDED.map(([label, value]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 20,
      padding: '14px 4px',
      borderBottom: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15.5,
      color: '#1F1A17',
      display: 'inline-flex',
      gap: 10,
      alignItems: 'baseline'
    }
  }, check, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 13,
      color: '#6B5F56',
      whiteSpace: 'nowrap'
    }
  }, value)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#EFE8DD',
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.4vw, 36px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '0 0 28px',
      textAlign: 'center'
    }
  }, "The math against a U.S. senior hire"), /*#__PURE__*/React.createElement("div", {
    className: "pricing-compare",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: '26px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#6B5F56',
      marginBottom: 10
    }
  }, "U.S. senior support hire"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 34,
      fontWeight: 600,
      color: '#1F1A17',
      marginBottom: 10
    }
  }, "$6,600 to $8,300+", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 400
    }
  }, "/mo")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0
    }
  }, "$80,000 to $100,000+ per year once you add benefits, taxes, payroll, equipment, hiring fees, and management costs. Months to find. You manage them.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#2C4A3E',
      borderRadius: 12,
      padding: '26px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#F0D9A8',
      marginBottom: 10
    }
  }, "xFusion senior agent"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 34,
      fontWeight: 600,
      color: '#F7F2EB',
      marginBottom: 10
    }
  }, "$3,900", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 400
    }
  }, "/mo all-in")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.6,
      color: '#F7F2EB',
      margin: 0
    }
  }, "Senior, AI-trained, and managed for you. Candidates in about 14 days. First month risk-free. Month-to-month after that."))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '64px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F8EBC9',
      border: '1px solid #E6C683',
      borderRadius: 12,
      padding: '26px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 20,
      fontWeight: 600,
      marginBottom: 8
    }
  }, "The 30-Day Risk-Free Trial"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0
    }
  }, "We recruit, vet, and place your agent. You work with them for 30 full days. If you're not satisfied for any reason, you walk away without paying anything. Not a deposit. Not a setup fee. Nothing. We absorb every dollar of recruiting, vetting, training, and placement we invested.")))), /*#__PURE__*/React.createElement("section", {
    style: {
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
      margin: '0 0 22px'
    }
  }, "Pricing questions, answered plainly"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #D9CFBF'
    }
  }, XF_LP_FAQ.map((it, i) => /*#__PURE__*/React.createElement("div", {
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
  }, it.a))))))), /*#__PURE__*/React.createElement("section", {
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
  }, "The price is the price."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      color: '#3A322D',
      margin: '0 auto 28px',
      maxWidth: 520,
      lineHeight: 1.6
    }
  }, "No quote calls, no tiers, no surprises. The discovery call is about your support queue, not about negotiating a rate."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call")))), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement("style", null, `
            @media (max-width: 760px) {
              .pricing-compare { grid-template-columns: 1fr !important; }
            }
          `));
}
function App() {
  return /*#__PURE__*/React.createElement(PricingPage, null);
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));