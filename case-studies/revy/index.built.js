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
// --- Components.jsx
// Shared primitives for xFusion marketing UI kit
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
      maxWidth: narrow ? 720 : 1200,
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
  style = {}
}) {
  const bgs = {
    paper: '#F7F2EB',
    'paper-2': '#EFE8DD',
    butter: '#F8EBC9',
    forest: '#2C4A3E'
  };
  const pads = {
    sm: '48px 0',
    md: '72px 0',
    lg: '96px 0'
  };
  return /*#__PURE__*/React.createElement("section", {
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
      letterSpacing: '0.12em',
      color,
      marginBottom: 16
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
      padding: '12px 20px',
      fontSize: 15
    },
    lg: {
      padding: '14px 24px',
      fontSize: 16
    }
  };
  let bg, color, border;
  if (variant === 'primary') {
    bg = pressed ? '#863818' : hover ? '#A0451F' : '#B8512C';
    color = '#F7F2EB';
    border = 'none';
  } else if (variant === 'secondary') {
    bg = hover ? '#EFE8DD' : 'transparent';
    color = '#1F1A17';
    border = '1px solid #B7A993';
  } else if (variant === 'ghost') {
    bg = hover ? '#EFE8DD' : 'transparent';
    color = '#1F1A17';
    border = '1px solid transparent';
  } else if (variant === 'on-dark') {
    bg = hover ? '#F0D9A8' : '#F7F2EB';
    color = '#1F1A17';
    border = 'none';
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
      lineHeight: 1,
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)',
      ...sizes[size],
      ...style
    }
  }, children);
}

// Photo placeholder — flat warm swatch with initials, used until real photos arrive
function PhotoPlaceholder({
  name = 'Team',
  tone = 'clay',
  ratio = '4/5',
  label
}) {
  const tones = {
    clay: {
      bg: 'linear-gradient(135deg, #B8512C 0%, #A0451F 100%)',
      fg: '#F0D9A8'
    },
    forest: {
      bg: 'linear-gradient(135deg, #2C4A3E 0%, #243C32 100%)',
      fg: '#F0D9A8'
    },
    butter: {
      bg: 'linear-gradient(135deg, #F0D9A8 0%, #E6C683 100%)',
      fg: '#1F1A17'
    },
    paper: {
      bg: 'linear-gradient(135deg, #EFE8DD 0%, #E6DCCB 100%)',
      fg: '#3A322D'
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
      alignItems: 'flex-end',
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
      color: t.fg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 24,
      right: 24,
      fontFamily: "'Source Serif 4', serif",
      fontSize: 80,
      opacity: 0.35,
      lineHeight: 1
    }
  }, initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      opacity: 0.7,
      marginBottom: 4
    }
  }, label || 'Photo placeholder'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 22,
      lineHeight: 1.2
    }
  }, name)));
}

// Lucide icon helper — pulls from CDN sprite-style: just inline the path data we need
const Icons = {
  message: /*#__PURE__*/React.createElement("path", {
    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  }),
  users: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  })),
  check: /*#__PURE__*/React.createElement("path", {
    d: "M20 7L9 18l-5-5"
  }),
  arrow: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5l7 7-7 7"
  })),
  clock: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  })),
  shield: /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  }),
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
  chevron: /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
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
  quote: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
  }))
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  stroke = 1.75,
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
Object.assign(window, {
  Container,
  Section,
  Eyebrow,
  Button,
  PhotoPlaceholder,
  Icon
});
// --- CaseStudyComponents.jsx
// Case-study-specific components for Revy page

// Site nav -- shared structure across all pages.
// Individual case study: prefix = '../../', active = 'case-studies'.
function CaseStudyNav({
  active = 'case-studies',
  prefix = '../../'
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
    src: "../../assets/xfusion-logo.png",
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

// Eyebrow with current case-study number
function CaseHeader({
  number,
  client,
  subhead,
  photoSrc,
  photoName
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingBottom: 32
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      letterSpacing: '0.04em',
      color: '#6B5F56',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 14,
    style: {
      transform: 'scaleX(-1)'
    }
  }), "All case studies")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#B8512C',
      marginBottom: 24
    }
  }, "Case study ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#9E9388',
      margin: '0 8px'
    }
  }, "·"), " ", number), /*#__PURE__*/React.createElement("h1", {
    className: "cs-title",
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(56px, 10vw, 120px)',
      fontWeight: 400,
      lineHeight: 0.95,
      letterSpacing: '-0.035em',
      margin: '0 0 32px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, client), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(20px, 2.2vw, 26px)',
      lineHeight: 1.4,
      fontWeight: 300,
      color: '#3A322D',
      margin: '0 0 56px',
      maxWidth: 720,
      textWrap: 'pretty'
    }
  }, subhead), /*#__PURE__*/React.createElement("div", {
    className: "cs-photo-row",
    style: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: 32,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(RevyPhoto, {
    name: photoName,
    src: photoSrc
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#9E9388',
      marginBottom: 8
    }
  }, "Featuring"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 22,
      color: '#1F1A17',
      marginBottom: 4
    }
  }, photoName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      color: '#6B5F56'
    }
  }, "Founder, Revy"))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 720px) {
          .cs-photo-row { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `));
}

// The portrait — tries to load a real image, falls back to flat warm placeholder
function RevyPhoto({
  name,
  src,
  ratio = '4/5',
  large = false
}) {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
      background: 'linear-gradient(140deg, #B8512C 0%, #863818 60%, #5C2810 100%)'
    }
  }, src && !errored && /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: `Portrait of ${name}, founder of Revy`,
    onLoad: () => setLoaded(true),
    onError: () => setErrored(true),
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      opacity: loaded ? 1 : 0,
      transition: 'opacity 400ms cubic-bezier(0.2,0,0,1)'
    }
  }), (!src || errored || !loaded) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 20,
      color: '#F0D9A8'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 20,
      right: 24,
      fontFamily: "'Source Serif 4', serif",
      fontSize: large ? 140 : 96,
      fontWeight: 400,
      opacity: 0.32,
      lineHeight: 1,
      letterSpacing: '-0.04em'
    }
  }, name.split(' ').map(s => s[0]).slice(0, 2).join('')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      opacity: 0.8,
      marginBottom: 6
    }
  }, "Photo placeholder"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: large ? 28 : 20,
      lineHeight: 1.15
    }
  }, name)));
}

// ---------------- Overview Box (5-row editorial table) ----------------
function OverviewBox({
  rows
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "md",
    style: {
      paddingTop: 24,
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F8EBC9',
      borderRadius: 16,
      border: '1px solid #E6C683',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 32px',
      borderBottom: '1px solid #E6C683',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: 'rgba(255,255,255,0.25)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#7a5a10'
    }
  }, "Overview")), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    className: "ov-row",
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: 32,
      padding: '20px 32px',
      borderBottom: i === rows.length - 1 ? 'none' : '1px solid rgba(184, 81, 44, 0.14)'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#7a5a10',
      paddingTop: 4
    }
  }, r.label), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontFamily: r.detail.length > 120 ? "'IBM Plex Sans', sans-serif" : "'Source Serif 4', serif",
      fontSize: r.detail.length > 120 ? 16 : 22,
      fontWeight: r.detail.length > 120 ? 400 : 400,
      lineHeight: r.detail.length > 120 ? 1.55 : 1.3,
      color: '#1F1A17',
      textWrap: 'pretty'
    }
  }, r.detail))))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 720px) {
          .ov-row { grid-template-columns: 1fr !important; gap: 8px !important; padding: 20px !important; }
        }
      `));
}

// ---------------- LongForm narrative section ----------------
function LongForm({
  eyebrow,
  heading,
  paragraphs,
  bg = 'paper',
  dropCap = false
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: bg,
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 20
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(36px, 5vw, 56px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      margin: '0 0 40px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    className: "lf-body"
  }, paragraphs.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.65,
      color: '#1F1A17',
      margin: '0 0 24px',
      textWrap: 'pretty'
    }
  }, dropCap && i === 0 ? /*#__PURE__*/React.createElement(DropCap, {
    text: p
  }) : p))))));
}
function DropCap({
  text
}) {
  const first = text.charAt(0);
  const rest = text.slice(1);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 64,
      lineHeight: 0.85,
      fontWeight: 400,
      float: 'left',
      marginRight: 10,
      marginTop: 6,
      marginBottom: -2,
      color: '#B8512C'
    }
  }, first), rest);
}

// ---------------- Lead Testimonial ----------------
function TestimonialFeature({
  pullQuote,
  fullQuote,
  name,
  role,
  company,
  photoSrc
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 16,
      padding: 'clamp(32px, 5vw, 64px)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -28,
      left: 'clamp(32px, 5vw, 64px)',
      width: 56,
      height: 56,
      borderRadius: 999,
      background: '#B8512C',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#F7F2EB'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "quote",
    size: 26,
    fill: "#F7F2EB",
    stroke: 0
  })), /*#__PURE__*/React.createElement("div", {
    className: "t-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: 'clamp(24px, 4vw, 48px)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RevyPhoto, {
    name: name,
    src: photoSrc,
    ratio: "4/5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: "'Source Serif 4', serif",
      fontStyle: 'italic',
      fontSize: 'clamp(24px, 3vw, 34px)',
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
      fontWeight: 400,
      color: '#1F1A17',
      textWrap: 'balance',
      marginBottom: 32
    }
  }, "“", pullQuote, "”"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      lineHeight: 1.65,
      color: '#3A322D',
      margin: '0 0 32px',
      textWrap: 'pretty'
    }
  }, fullQuote), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 24,
      borderTop: '1px solid #D9CFBF',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      letterSpacing: '0.08em',
      color: '#1F1A17',
      textTransform: 'uppercase'
    }
  }, name, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#9E9388',
      margin: '0 6px'
    }
  }, "·"), ' ', role, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#9E9388',
      margin: '0 6px'
    }
  }, "·"), ' ', company)))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 760px) {
          .t-grid { grid-template-columns: 1fr !important; }
        }
      `));
}

// ---------------- Metric callout ----------------
function MetricCallout({
  headline,
  supporting,
  variant = 'forest'
}) {
  const styles = variant === 'forest' ? {
    bg: '#2C4A3E',
    fg: '#F7F2EB',
    accent: '#F0D9A8',
    sub: 'rgba(247,242,235,0.78)'
  } : {
    bg: '#F8EBC9',
    fg: '#1F1A17',
    accent: '#B8512C',
    sub: '#3A322D'
  };
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "md",
    style: {
      paddingTop: 32,
      paddingBottom: 32
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: styles.bg,
      borderRadius: 24,
      padding: 'clamp(48px, 7vw, 96px) clamp(32px, 6vw, 80px)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: styles.accent,
      marginBottom: 32,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 24,
      height: 1,
      background: styles.accent
    }
  }), "The result"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(48px, 8vw, 104px)',
      fontWeight: 400,
      lineHeight: 0.98,
      letterSpacing: '-0.035em',
      color: styles.fg,
      margin: '0 0 32px',
      textWrap: 'balance',
      maxWidth: 1100
    }
  }, headline), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(18px, 2vw, 22px)',
      lineHeight: 1.5,
      color: styles.sub,
      maxWidth: 720,
      margin: 0,
      textWrap: 'pretty'
    }
  }, supporting), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'clamp(32px, 6vw, 80px)',
      right: 'clamp(32px, 6vw, 80px)',
      display: 'flex',
      gap: 4,
      color: styles.accent
    },
    "aria-hidden": "true"
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("svg", {
    key: i,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z"
  })))))));
}

// ---------------- Shoutout grid (placeholders) ----------------
function ShoutoutGrid({
  eyebrow,
  heading,
  caption,
  count = 3,
  kind = 'leader',
  bg = 'paper-2'
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: bg,
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 16
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4vw, 48px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 16px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, heading), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      fontStyle: 'italic',
      color: '#6B5F56',
      margin: 0
    }
  }, caption)), /*#__PURE__*/React.createElement("div", {
    className: "so-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${count}, 1fr)`,
      gap: 24
    }
  }, Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement(PlaceholderCard, {
    key: i,
    kind: kind,
    index: i
  }))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 980px) { .so-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .so-grid { grid-template-columns: 1fr !important; } }
      `));
}
function PlaceholderCard({
  kind,
  index
}) {
  const label = kind === 'leader' ? '[Leader shoutout coming soon]' : '[Customer shoutout coming soon]';
  const attrLabel = kind === 'leader' ? 'Revy team member' : 'Shopify merchant';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F7F2EB',
      border: '1px dashed #B7A993',
      borderRadius: 12,
      padding: 28,
      minHeight: 240,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#9E9388'
    }
  }, "0", index + 1), /*#__PURE__*/React.createElement(Icon, {
    name: "quote",
    size: 24,
    color: "#D9CFBF",
    fill: "#D9CFBF",
    stroke: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontStyle: 'italic',
      fontSize: 18,
      lineHeight: 1.4,
      color: '#9E9388',
      flex: 1
    }
  }, label), kind === 'customer' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      color: '#D9CFBF'
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("svg", {
    key: i,
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 16,
      borderTop: '1px solid #E6DCCB',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 999,
      background: '#EFE8DD',
      border: '1px dashed #B7A993'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      fontWeight: 500,
      color: '#9E9388'
    }
  }, "[Name]"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 12,
      color: '#9E9388'
    }
  }, attrLabel))));
}

// ---------------- Final CTA band ----------------
function CTABand() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#2C4A3E',
      padding: 'clamp(64px, 10vw, 128px) 0'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: '0 auto',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#F0D9A8',
      marginBottom: 24
    }
  }, "Ready when you are"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(40px, 6vw, 72px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      color: '#F7F2EB',
      margin: '0 0 32px',
      textWrap: 'balance'
    }
  }, "Want to see if we can help you too?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(17px, 1.6vw, 19px)',
      lineHeight: 1.6,
      color: 'rgba(247,242,235,0.86)',
      margin: '0 0 40px',
      maxWidth: 720,
      textWrap: 'pretty'
    }
  }, "If your customer support is starting to slip, or you are a solo founder drowning in the inbox while your product waits, we can help. We will recruit, vet, place, train, and manage a senior, AI-trained support agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    style: {
      padding: '18px 28px',
      fontSize: 17
    },
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      color: 'rgba(247,242,235,0.7)',
      maxWidth: 540,
      lineHeight: 1.5
    }
  }, "30 minutes. No commitment. No credit card. You'll talk directly with our founding team.")))));
}

// ---------------- Footer ----------------
function CaseStudyFooter() {
  const cols = [{
    title: 'Product',
    links: [['Pricing', '../../#pricing'], ['Case studies', '../../case-studies/'], ['Shopify app support', '/shopify-app-support/'], ['SaaS support', '/saas-support/'], ['Hire support agents', '/hire-support-agents/'], ['Support outsourcing', '/customer-support-outsourcing/'], ['E-commerce support', '/ecommerce-support/']]
  }, {
    title: 'Company',
    links: [['About', '../../about/'], ['Careers', '../../careers/'], ['Contact', '../../contact/']]
  }, {
    title: 'Resources',
    links: [['FAQ', '../../#faq'], ['Blog', '../../blog/']]
  }, {
    title: 'Legal',
    links: [['Privacy', '../../privacy/'], ['DPA', '../../dpa/'], ['Security', '../../security/']]
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
    href: "../../",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/xfusion-logo-on-dark.png",
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

// Image-based shoutout grid (sourced from xfusion.io originals)
function ShoutoutImageGrid({
  eyebrow,
  heading,
  intro,
  images,
  bg = 'paper-2'
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: bg,
    padding: "lg",
    style: {
      paddingTop: 96,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      marginBottom: 48
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 20
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(30px, 3.4vw, 44px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 16px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, heading), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0,
      textWrap: 'pretty'
    }
  }, intro)), /*#__PURE__*/React.createElement("div", {
    className: "sig-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 20
    }
  }, images.map((src, i) => /*#__PURE__*/React.createElement("figure", {
    key: i,
    style: {
      margin: 0,
      padding: 16,
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: `Shoutout ${i + 1}`,
    loading: "lazy",
    style: {
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 8
    }
  }))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 720px) { .sig-grid { grid-template-columns: 1fr !important; } }
      `));
}
Object.assign(window, {
  CaseStudyNav,
  CaseHeader,
  OverviewBox,
  LongForm,
  TestimonialFeature,
  MetricCallout,
  ShoutoutGrid,
  ShoutoutImageGrid,
  CTABand,
  CaseStudyFooter,
  RevyPhoto
});
// --- (inline)
function App() {
  const overviewRows = [{
    label: 'Industry',
    detail: 'SaaS / Shopify app development'
  }, {
    label: 'Country',
    detail: 'Brazil'
  }, {
    label: 'Challenge',
    detail: "Marcelo, the solo founder and software engineer behind Revy, was running customer support for 10,000+ Shopify merchants by himself. Tickets were eating the time he needed to ship product, and English as his second language created friction in customer-facing replies."
  }, {
    label: 'Solution',
    detail: "xFusion placed and managed a dedicated, technically capable support agent fluent in HTML, CSS, JavaScript, and Shopify Liquid. The agent took over tier-2 technical support, ran a Shopify-compliant review-request workflow, and routed bugs to Marcelo through Jira."
  }, {
    label: 'Results',
    detail: "Hundreds of new 5-star reviews on the Shopify App Store, a meaningful jump in organic ranking, near-instant response on internal requests, and Marcelo back to building product instead of answering tickets. The partnership has continued since May 2020."
  }];
  const aboutParagraphs = ["Revy is a Shopify app company based in Brazil, founded in 2017 by software engineer Marcelo Olivera. The company builds conversion rate optimization tools for Shopify merchants, with flagship apps including Unlimited Bundles & Discounts and Unlimited Smart UpSell Offers. Both sit at 4.7 and 4.8 stars on the Shopify App Store and serve more than 10,000 merchants.", "Revy's apps are known for being clean, code-free, and reliable. Merchants install them, configure bundles or upsells in a few clicks, and start lifting average order value without touching their theme code. The apps have a tight UI, low error rates, and broad compatibility across Shopify themes.", "Marcelo built Revy as a solo founder. He led product, engineering, and, for years, customer support. Under his leadership, Revy grew into a known name in the Shopify app ecosystem for merchants who care about conversion. The product worked. The merchant base kept growing. By 2020, the support inbox was where the company's growth was beginning to stall.", "That is when Marcelo brought in xFusion."];
  const challengeParagraphs = ["Revy ran into the problem that catches a lot of solo technical founders. Marcelo was the engineer who built the apps, the product manager who decided what shipped next, and the support rep who answered every ticket. For a while that worked. Once the merchant base passed a few thousand stores, it stopped working.", "The math was simple and brutal. Every hour Marcelo spent in the inbox was an hour he was not writing code, fixing a bug a merchant had just reported, or shipping the next feature. Revy's edge was its product. Revy's product depended on Marcelo's time. The inbox kept eating it.", "There was a second layer to the problem. English is Marcelo's second language. He was good enough to answer most tickets, but the small frictions added up. Replies took longer to write. Nuance got lost. Customers felt the gap, even if they could not name it. That gap showed up in the kinds of reviews merchants left, and in the ones they did not bother to leave at all.", "Marcelo had also tried to build a support team before. He had hired and managed people directly. The training, retraining, and management ate even more time than answering tickets had. He was a software engineer being asked to be an HR manager, and he did not want to be one. He told Jim Coleman as much in a candid conversation when the two reconnected. Marcelo needed someone else to own the support function end to end. Not just place a person and walk away. Own it."];
  const solutionParagraphs = ["xFusion built a setup specific to Revy's situation. Generic outsourced support would not have worked, because Revy's tickets were not generic. Merchants installed apps that touched Liquid, theme code, JavaScript, and Shopify's storefront APIs. Tier-2 questions needed someone who could actually read the code and explain why something was behaving the way it was.", "xFusion placed a dedicated full-time team member with technical depth in HTML, CSS, JavaScript, and Shopify Liquid. The placement happened in May 2020. From day one, the agent was responsible for tier-2 technical support, communicating with merchants in clear English, and triaging real bugs into Jira tickets that went straight to Marcelo for engineering work.", "The full lifecycle ran on the xFusion side. Recruiting through the TraitX Framework. Training in Revy's product line and Shopify's ecosystem. Payroll, HR, and PTO. Culture and engagement. Performance management through a dedicated account manager who kept the work tight and adjusted as Revy's needs changed. Marcelo did not have to manage any of it.", "xFusion also added a layer Revy had not had before: a structured, Shopify-compliant review-request workflow. Every satisfied merchant who finished a successful interaction got asked, the right way, to share their experience on the App Store. That single change turned support from a cost center into a marketing engine. The reviews started coming in. The 5-star count climbed into the hundreds. Revy's ranking moved with it.", "The relationship kept evolving. xFusion started capturing and organizing customer feedback into themes Marcelo could use to prioritize the roadmap. What had been a support function became a feedback loop into product. Marcelo got back to engineering, with better data than he had ever had on what merchants wanted next."];
  const resultsParagraphs = ["The partnership delivered on every front Marcelo had hoped for, and a few he had not anticipated.", "Customer support stopped being a bottleneck. The placed agent handled tier-2 technical work the way Marcelo would have handled it, but in clear English and with the time and patience the inbox actually requires. Merchants got faster, better answers. Marcelo got his calendar back.", "The review numbers tell the clearest story. Hundreds of new 5-star reviews landed on the Shopify App Store after xFusion took over support and started running the review-request workflow. Both flagship apps (Unlimited Bundles & Discounts and Unlimited Smart UpSell Offers) climbed in organic ranking, which brought in new merchants without Marcelo touching marketing. The apps' star ratings stabilized at 4.7 and 4.8.", "Internal communication became near-instant. Marcelo's quote captures it: when he has a request, xFusion responds almost instantly, and the response has consistently been satisfactory. That is the operating speed of an in-house team, not an outside vendor. The bug pipeline got cleaner too. The placed agent triages incoming reports, separates real bugs from configuration questions, and drops verified issues into Jira with the context Marcelo needs to fix them. Engineering time goes to engineering, not to triage.", "The biggest result is the role shift. Marcelo went from being the support rep, the engineer, and the product manager to just being the engineer and the product manager. That is the role he is good at and the role Revy needs him in. The apps have kept improving, the merchant base has kept growing, and the partnership with xFusion has kept running, year after year, since May 2020."];
  const leaderImages = ['../../images/shoutouts/revy/leadership/image13.png', '../../images/shoutouts/revy/leadership/image1.png', '../../images/shoutouts/revy/leadership/image6.png'];
  const customerImages = ['../../images/shoutouts/revy/customers/image11.png', '../../images/shoutouts/revy/customers/image12.png', '../../images/shoutouts/revy/customers/image2.png', '../../images/shoutouts/revy/customers/image3.png', '../../images/shoutouts/revy/customers/image8.png', '../../images/shoutouts/revy/customers/image10.png'];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CaseStudyNav, null), /*#__PURE__*/React.createElement(CaseHeader, {
    number: "09",
    client: "Revy",
    subhead: "How a solo Shopify app founder offloaded customer support, added hundreds of 5-star reviews, and got back to building product.",
    photoSrc: "../../images/marcelo-olivera-revy.png",
    photoName: "Marcelo Olivera"
  }), /*#__PURE__*/React.createElement(OverviewBox, {
    rows: overviewRows
  }), /*#__PURE__*/React.createElement("hr", {
    className: "section-rule"
  }), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "The company",
    heading: "About Revy",
    paragraphs: aboutParagraphs,
    bg: "paper",
    dropCap: true
  }), /*#__PURE__*/React.createElement(TestimonialFeature, {
    pullQuote: "Since I hired the xFusion team, I've been very pleased because I don't have to worry anymore about customer support.",
    fullQuote: "Knowing Jim for a long time, I knew I could trust him and his team to deal with the support of my Shopify Apps. This would allow me to focus more on the core of my business to get more things done. It's been a long time since we started working together and I have no regrets. Customer support is one of our app's strengths and it's praised daily by our customers. If I have any requests, xFusion's response is almost instantly and has always been satisfactory. It's been worth every penny to put the support of my apps in their skilled agent's hands. For anyone wanting to focus more on their business and less on support, I strongly recommend them.",
    name: "Marcelo Olivera",
    role: "Founder",
    company: "Revy",
    photoSrc: "../../images/marcelo-olivera-revy.png"
  }), /*#__PURE__*/React.createElement(MetricCallout, {
    headline: "Hundreds of new 5-star reviews",
    supporting: "on the Shopify App Store, leading to a significant jump in Revy's organic ranking and a founder freed to focus on product instead of support.",
    variant: "forest"
  }), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "Section 01",
    heading: "The challenge",
    paragraphs: challengeParagraphs,
    bg: "paper"
  }), /*#__PURE__*/React.createElement("hr", {
    className: "section-rule"
  }), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "Section 02",
    heading: "The solution",
    paragraphs: solutionParagraphs,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(ShoutoutImageGrid, {
    eyebrow: "Section 03",
    heading: "Shoutouts to xFusion's team members from Revy's founder",
    images: leaderImages,
    bg: "paper-2"
  }), /*#__PURE__*/React.createElement(ShoutoutImageGrid, {
    eyebrow: "Section 04",
    heading: "Shoutouts from Revy customers about xFusion's team members",
    images: customerImages,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "Section 05",
    heading: "The results",
    paragraphs: resultsParagraphs,
    bg: "paper-2"
  }), /*#__PURE__*/React.createElement(CTABand, null), /*#__PURE__*/React.createElement(CaseStudyFooter, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));