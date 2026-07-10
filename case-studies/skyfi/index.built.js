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
// --- components/Primitives.jsx
// Shared primitives — Container, Section, Eyebrow, Button, Icon

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
  style = {},
  id
}) {
  const bgs = {
    paper: '#F7F2EB',
    'paper-2': '#EFE8DD',
    butter: '#F8EBC9',
    'butter-soft': '#FBF1D9',
    forest: '#2C4A3E'
  };
  const pads = {
    sm: '48px 0',
    md: '72px 0',
    lg: '96px 0',
    xl: '128px 0'
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
  color = '#6B5F56',
  mono = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono ? "'JetBrains Mono', ui-monospace, monospace" : "'IBM Plex Sans', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color,
      marginBottom: 16,
      ...style
    }
  }, children);
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  style = {},
  as = 'a',
  href = '#',
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
      padding: '16px 26px',
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
    bg = hover ? 'rgba(247,242,235,0.08)' : 'transparent';
    color = '#F7F2EB';
    border = '1px solid rgba(247,242,235,0.4)';
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
    href: as === 'a' ? href : undefined,
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
      transform: pressed ? 'translateY(1px)' : 'translateY(0)',
      transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)',
      ...sizes[size],
      ...style
    }
  }, children);
}
const IconPaths = {
  arrow: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5l7 7-7 7"
  })),
  arrowLeft: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 19l-7-7 7-7"
  })),
  quote: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
  })),
  hourglass: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M5 22h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 2h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"
  })),
  check: /*#__PURE__*/React.createElement("path", {
    d: "M20 7L9 18l-5-5"
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
  }, IconPaths[name] || null);
}

// Portrait — renders real <img> when src is provided, otherwise warm placeholder.
function PortraitPlaceholder({
  name = 'Claire Fundingsland',
  src = '../../images/claire-fundingsland-skyfi.webp',
  label,
  ratio = '4/5',
  tone = 'butter',
  size = 'md',
  alt
}) {
  const [errored, setErrored] = useState(false);
  if (src && !errored) {
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: alt || name,
      loading: size === 'lg' ? undefined : 'lazy',
      onError: () => setErrored(true),
      style: {
        width: '100%',
        aspectRatio: ratio,
        objectFit: 'cover',
        borderRadius: 12,
        display: 'block',
        border: '1px solid rgba(31,26,23,0.06)'
      }
    });
  }
  const tones = {
    clay: {
      bg: 'linear-gradient(150deg, #B8512C 0%, #8E3D1E 100%)',
      fg: '#F0D9A8',
      sub: '#F0D9A8'
    },
    forest: {
      bg: 'linear-gradient(150deg, #2C4A3E 0%, #1c3127 100%)',
      fg: '#F0D9A8',
      sub: '#D7E0DC'
    },
    butter: {
      bg: 'linear-gradient(150deg, #F0D9A8 0%, #E0C083 100%)',
      fg: '#1F1A17',
      sub: '#3A322D'
    },
    paper: {
      bg: 'linear-gradient(150deg, #EFE8DD 0%, #D9CFBF 100%)',
      fg: '#1F1A17',
      sub: '#6B5F56'
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
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
      color: t.fg,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 18,
      right: 22,
      fontFamily: "'Source Serif 4', serif",
      fontSize: size === 'lg' ? 96 : 64,
      fontWeight: 400,
      opacity: 0.32,
      lineHeight: 1,
      letterSpacing: '-0.04em'
    }
  }, initials), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      opacity: 0.75,
      marginBottom: 4,
      color: t.sub
    }
  }, label || (src ? src : 'Photo placeholder')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 18,
      lineHeight: 1.2,
      fontWeight: 500
    }
  }, name)));
}
Object.assign(window, {
  Container,
  Section,
  Eyebrow,
  Button,
  Icon,
  PortraitPlaceholder
});
// --- components/Nav.jsx
// Site nav -- shared structure across all pages.
// Individual case study: prefix = '../../', active = 'case-studies'.
function Nav({
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
window.Nav = Nav;
// --- components/PageHeader.jsx
function PageHeader({
  eyebrow = 'CASE STUDY · 10',
  title = 'SkyFi',
  subhead,
  portraitName = 'Claire Fundingsland',
  portraitSrc = '../../images/claire-fundingsland-skyfi.webp',
  portraitLabel = 'CLAIRE FUNDINGSLAND'
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 56
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: '#6B5F56',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowLeft",
    size: 14,
    stroke: 1.75
  }), " All case studies")), /*#__PURE__*/React.createElement("div", {
    className: "ph-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 24
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(64px, 9vw, 128px)',
      fontWeight: 400,
      lineHeight: 0.95,
      letterSpacing: '-0.03em',
      margin: '0 0 28px',
      color: '#1F1A17'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(20px, 2.1vw, 26px)',
      lineHeight: 1.4,
      fontWeight: 400,
      color: '#3A322D',
      maxWidth: 620,
      margin: 0,
      textWrap: 'pretty'
    }
  }, subhead)), /*#__PURE__*/React.createElement("div", {
    className: "ph-portrait",
    style: {
      maxWidth: 360,
      justifySelf: 'end',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(PortraitPlaceholder, {
    name: portraitName,
    src: portraitSrc,
    label: portraitLabel,
    alt: `${portraitName}, Head of Customer Experience at SkyFi`,
    ratio: "4/5",
    tone: "butter",
    size: "lg"
  })))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .ph-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ph-portrait { justify-self: start !important; max-width: 280px !important; }
        }
      `));
}
window.PageHeader = PageHeader;
// --- components/OverviewBox.jsx
function OverviewBox({
  rows = []
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "sm",
    style: {
      padding: '24px 0 64px'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#FBF1D9',
      border: '1px solid #E6C683',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 32px',
      borderBottom: '1px solid #E6C683',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#7a5a10'
    }
  }, "Overview"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: '#7a5a10',
      opacity: 0.7
    }
  }, "FY-26 / xFusion × SkyFi")), /*#__PURE__*/React.createElement("dl", {
    className: "ov-table",
    style: {
      margin: 0
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    style: {
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: 32,
      padding: '20px 32px',
      borderBottom: i < rows.length - 1 ? '1px solid #E6C683' : 'none',
      alignItems: 'baseline'
    },
    className: "ov-row"
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#7a5a10',
      margin: 0
    }
  }, r.label), /*#__PURE__*/React.createElement("dd", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.55,
      color: '#1F1A17',
      margin: 0,
      textWrap: 'pretty'
    }
  }, r.value)))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 720px) {
          .ov-row { grid-template-columns: 1fr !important; gap: 6px !important; padding: 18px 22px !important; }
        }
      `));
}
window.OverviewBox = OverviewBox;
// --- components/LongForm.jsx
// LongForm — section heading + narrow column body. Used for About, Challenge, Solution, Results.
// Accepts a `section` label (eyebrow), `title`, and an array of `paragraphs`.
// Renders an optional drop cap on the first paragraph for the editorial feel.

function LongForm({
  section,
  number,
  title,
  paragraphs = [],
  bg = 'paper',
  dropCap = false,
  rule = true
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: bg,
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, rule && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto',
      paddingBottom: 32,
      display: 'flex',
      alignItems: 'baseline',
      gap: 16
    }
  }, number && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      color: '#B8512C',
      letterSpacing: '0.14em'
    }
  }, number), section && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#6B5F56'
    }
  }, section), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: '#D9CFBF',
      marginLeft: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(36px, 4.5vw, 56px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 40px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, title), paragraphs.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.65,
      color: '#1F1A17',
      margin: '0 0 24px',
      textWrap: 'pretty'
    },
    className: dropCap && i === 0 ? 'lf-dropcap' : undefined
  }, p)))), /*#__PURE__*/React.createElement("style", null, `
        .lf-dropcap::first-letter {
          font-family: 'Source Serif 4', serif;
          font-size: 4.4em;
          font-weight: 400;
          float: left;
          line-height: 0.9;
          padding: 6px 12px 0 0;
          color: #B8512C;
        }
      `));
}
window.LongForm = LongForm;
// --- components/TestimonialFeature.jsx
function TestimonialFeature({
  pullQuote,
  fullQuote,
  name,
  role,
  company,
  portraitLabel,
  portraitSrc
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "butter",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    className: "tf-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: 64,
      alignItems: 'flex-start',
      maxWidth: 1080,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tf-portrait",
    style: {
      position: 'sticky',
      top: 80
    }
  }, /*#__PURE__*/React.createElement(PortraitPlaceholder, {
    name: name,
    src: portraitSrc,
    label: portraitLabel,
    alt: `${name}, ${role} at ${company}`,
    ratio: "4/5",
    tone: "clay"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Icon, {
    name: "quote",
    size: 36,
    color: "#B8512C",
    fill: "#B8512C",
    stroke: 0,
    style: {
      marginBottom: 20
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontStyle: 'italic',
      fontSize: 'clamp(30px, 3.6vw, 44px)',
      lineHeight: 1.2,
      fontWeight: 400,
      letterSpacing: '-0.015em',
      color: '#1F1A17',
      margin: '0 0 32px',
      textWrap: 'balance'
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
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#7a5a10',
      borderTop: '1px solid #E6C683',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1F1A17'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 10px',
      opacity: 0.5
    }
  }, "·"), role, /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 10px',
      opacity: 0.5
    }
  }, "·"), company)))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .tf-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .tf-portrait { position: static !important; max-width: 240px; }
        }
      `));
}
window.TestimonialFeature = TestimonialFeature;
// --- components/MetricCallout.jsx
function MetricCallout({
  headline,
  support,
  variant = 'forest'
}) {
  const isForest = variant === 'forest';
  return /*#__PURE__*/React.createElement(Section, {
    bg: isForest ? 'forest' : 'butter',
    padding: "xl"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: isForest ? '#F0D9A8' : '#7a5a10',
      marginBottom: 36,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1,
      background: isForest ? '#F0D9A8' : '#7a5a10',
      display: 'inline-block'
    }
  }), "The proof"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(48px, 7.5vw, 108px)',
      fontWeight: 400,
      lineHeight: 1.0,
      letterSpacing: '-0.035em',
      color: isForest ? '#F7F2EB' : '#1F1A17',
      margin: '0 0 36px',
      textWrap: 'balance'
    }
  }, headline), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(18px, 1.8vw, 22px)',
      fontWeight: 400,
      lineHeight: 1.5,
      color: isForest ? '#D7E0DC' : '#3A322D',
      margin: 0,
      maxWidth: 720,
      textWrap: 'pretty'
    }
  }, support))));
}
window.MetricCallout = MetricCallout;
// --- components/ShoutoutGrid.jsx
// ShoutoutGrid — placeholder cards for sections 8 & 9 (leader & customer shoutouts).
// Designed so the same component slots in real quotes later: pass `items` with
// quote, name, role, etc.; cards without a `quote` render as the "coming soon" empty state.

function ShoutoutGrid({
  section,
  title,
  caption,
  emptyLabel = 'Quote coming soon',
  items = [],
  bg = 'paper',
  cols = 3
}) {
  const placeholderItems = items.length ? items : Array.from({
    length: cols
  }, (_, i) => ({
    key: i
  }));
  const isPaper = bg === 'paper';
  return /*#__PURE__*/React.createElement(Section, {
    bg: bg,
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#6B5F56',
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1,
      background: '#B7A993',
      display: 'inline-block'
    }
  }), section), /*#__PURE__*/React.createElement("h2", {
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
  }, title), caption && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.55,
      color: '#6B5F56',
      fontStyle: 'italic',
      margin: 0,
      maxWidth: 540
    }
  }, caption)), /*#__PURE__*/React.createElement("div", {
    className: `sg-grid sg-cols-${cols}`,
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 24
    }
  }, placeholderItems.map((it, i) => {
    const empty = !it.quote;
    return /*#__PURE__*/React.createElement("article", {
      key: i,
      style: {
        background: isPaper ? '#FBF6EE' : '#F7F2EB',
        border: '1px dashed ' + (empty ? '#B7A993' : '#D9CFBF'),
        borderRadius: 12,
        padding: 28,
        minHeight: 240,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }
    }, empty ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 18,
        right: 18,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: '#9E9388',
        padding: '4px 8px',
        border: '1px solid #D9CFBF',
        borderRadius: 999,
        background: '#F7F2EB'
      }
    }, "TBD"), /*#__PURE__*/React.createElement(Icon, {
      name: "quote",
      size: 28,
      color: "#D9CFBF",
      fill: "#D9CFBF",
      stroke: 0
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Source Serif 4', serif",
        fontSize: 22,
        lineHeight: 1.35,
        color: '#9E9388',
        fontStyle: 'italic',
        margin: '20px 0 24px',
        flex: 1
      }
    }, "[", it.label || (i === 0 ? 'Leader' : 'Shoutout'), " shoutout coming soon]"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: '#9E9388',
        borderTop: '1px solid #E6DCCB',
        paddingTop: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 999,
        background: '#EFE8DD',
        border: '1px dashed #B7A993'
      }
    }), /*#__PURE__*/React.createElement("span", null, "Name · Title · ", it.org || 'SkyFi'))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "quote",
      size: 28,
      color: "#B8512C",
      fill: "#B8512C",
      stroke: 0
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Source Serif 4', serif",
        fontSize: 20,
        lineHeight: 1.4,
        color: '#1F1A17',
        margin: '16px 0 20px'
      }
    }, it.quote), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: '#6B5F56',
        borderTop: '1px solid #E6DCCB',
        paddingTop: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#1F1A17'
      }
    }, it.name), ", ", it.role, ", ", it.org)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: '#9E9388',
      letterSpacing: '0.06em',
      textAlign: 'right'
    }
  }, emptyLabel)), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .sg-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .sg-grid { grid-template-columns: 1fr !important; }
        }
      `));
}
window.ShoutoutGrid = ShoutoutGrid;
// --- components/CTASection.jsx
function CTASection({
  title,
  body,
  ctaLabel = 'Book a Discovery Call',
  microcopy
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "xl",
    id: "cta"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 920,
      margin: '0 auto',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#F0D9A8',
      marginBottom: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1,
      background: '#F0D9A8',
      display: 'inline-block'
    }
  }), "Ready when you are"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(40px, 5.4vw, 72px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 28px',
      color: '#F7F2EB',
      textWrap: 'balance'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(17px, 1.6vw, 19px)',
      lineHeight: 1.6,
      color: '#F7F2EB',
      opacity: 0.92,
      margin: '0 0 40px',
      maxWidth: 720,
      textWrap: 'pretty'
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "on-dark",
    size: "lg"
  }, ctaLabel, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 18,
    stroke: 1.75
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.55,
      color: '#D7E0DC',
      margin: 0,
      maxWidth: 420
    }
  }, microcopy)))));
}
window.CTASection = CTASection;
// --- components/Footer.jsx
// Unified site footer for individual case study (site/case-studies/ordered-magic/index.html)
// Forest-green background (--color-forest #2C4A3E), Paper text (#F7F2EB)
function Footer() {
  const cols = [{
    title: 'Product',
    links: [['Pricing', '../../#pricing'], ['Case studies', '../'], ['Shopify app support', '/shopify-app-support/'], ['SaaS support', '/saas-support/'], ['Hire support agents', '/hire-support-agents/'], ['Support outsourcing', '/customer-support-outsourcing/'], ['E-commerce support', '/ecommerce-support/']]
  }, {
    title: 'Company',
    links: [['About', '../../about/'], ['Careers', '../../careers/'], ['Contact', "../../contact/"]]
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
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `));
}
window.Footer = Footer;
// --- (inline)
function App() {
  const overviewRows = [{
    label: 'Industry',
    value: 'Satellite imagery and geospatial intelligence (SaaS)'
  }, {
    label: 'Country',
    value: 'United States'
  }, {
    label: 'Challenge',
    value: 'Scale customer support across a global, 24/7 customer base spanning 185 countries while keeping customer satisfaction high and reply times fast on a technical product that spans optical, SAR, and multispectral imaging.'
  }, {
    label: 'Solution',
    value: "A dedicated xFusion team trained in SkyFi's Earth observation product, integrated into SkyFi's internal systems, providing round-the-clock coverage and Tier 2 technical depth."
  }, {
    label: 'Results',
    value: "91.9% customer satisfaction score. 36-minute average reply time. Round-the-clock global coverage that freed SkyFi's leadership to focus on the core product."
  }];
  const aboutParagraphs = ['SkyFi makes on-demand, high-resolution Earth observation data and analytics available to anyone with a smartphone, tablet, or computer. The company runs a network of more than 100 satellites and is on a mission, in their words, to "easify access to geospatial data so that businesses can solve their toughest problems and individuals can explore their boundless curiosity."', 'The company started with a simple idea: open up access to Earth observation data. Satellite imagery had historically been locked behind enterprise contracts, complex tooling, and a steep technical learning curve. SkyFi built a platform that closes the gap between raw satellite data and the people who actually want to use it. Their apps and enterprise-grade API serve customers across agriculture, real estate, mining, urban development, environmental monitoring, and more.', 'The numbers tell the rest of the story. Over 20,000 registered accounts. Customers in 185 countries. Data sensors including optical, SAR, and multispectral imaging. SkyFi has grown into a major player in the Earth observation industry, and they did it by simplifying something that used to be very hard.', 'That growth created a customer support problem. A simple-to-use product attracts a wide audience. A wide audience asks a lot of questions. And those questions arrive at every hour of the day from every corner of the globe.'];
  const challengeParagraphs = ["SkyFi's growth around the world created a tough problem: how do you grow customer support without losing the quality that made you grow in the first place?", 'The customer base was international. The product was technical. The volume was rising. And every time SkyFi closed another funding round or shipped another expansion, the pressure to deliver excellent customer service grew with it.', 'Three things made this harder than a typical support scaling problem.', 'First, the time zones. Customers in 185 countries are awake at different hours, and they expect answers when they ask, not when an office in Texas opens up the next morning. Coverage had to be genuinely 24/7, not "we\u2019ll get to you Monday."', "Second, the technical depth. SkyFi's product spans optical imaging, SAR (synthetic aperture radar), and multispectral data sensors. A customer asking which dataset is right for monitoring crop health is not the same as a customer asking how to reset their password. The support team needed real product fluency to be useful.", "Third, the high stakes. As SkyFi's leaders, Claire and Mike, kept saying in their early talks with xFusion, customer support at SkyFi is not a cost to cut. It is part of how the company keeps customers at the center of everything they do. A weak support team would not just frustrate users. It would break the brand promise. The challenge was not just to handle the growing volume. It was to give support that was technical, available worldwide, and matched SkyFi's approach to the Earth observation industry."];
  const solutionParagraphs = ["xFusion built a dedicated team for SkyFi and trained them on SkyFi's product, processes, and tone.", "The team learned the technical layer first. Optical, SAR, multispectral. The differences between datasets. The use cases customers cared about across agriculture, real estate, and mining. xFusion's account managers worked alongside SkyFi to build out internal documentation and training materials so the team could handle complex queries instead of escalating every nuanced question back to the SkyFi staff.", "The team integrated into SkyFi's internal systems. That sounds small, but it matters. When a support agent has to ping someone on the SkyFi team for every account lookup, the response loop breaks. Direct system access meant real-time issue resolution, not handoffs.", 'The team operated around the clock. Coverage extended across time zones to match the global customer base. Customers in Asia, Europe, the Americas, and beyond got fast responses regardless of when they reached out.', "The team did more than answer tickets. xFusion's agents were trained to spot opportunities, not just resolve issues. When a customer's question hinted at a deeper need, or signaled a potential expansion, the team flagged it back to SkyFi so the right person could follow up. Customer support became a quiet feeder to growth instead of a one-way ticket sink. xFusion's account managers stayed in the loop the entire time. Performance reviews, ongoing training, alignment on new product launches, escalation paths. SkyFi did not have to manage the team. xFusion did."];
  const resultsParagraphs = ['The partnership delivered three measurable outcomes and one cultural one.', '91.9% customer satisfaction. Sustained across a global, technical customer base. Not a launch-week number. An ongoing average.', '36-minute average reply time. Across all time zones, in a 24/7 environment. Customers who reached out in the middle of the night got real answers in well under an hour.', "Round-the-clock global coverage. SkyFi's customers in 185 countries got the same support quality regardless of where the sun was. The coverage gap that constrains most growing SaaS support teams stopped constraining SkyFi.", "Time and focus returned to the core team. SkyFi's internal staff stopped being the back-up support team. Engineering and product leaders went back to building. Claire and Mike went back to leading. The cultural outcome was that SkyFi could keep customers at the center of everything they do without burning out the people running the company.", 'In Claire\u2019s words, the xFusion team "never leave a customer interaction unresolved." For a product company moving fast in a competitive industry, that is the support function you want.'];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, {
    current: "case-studies"
  }), /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "CASE STUDY · 10",
    title: "SkyFi",
    subhead: "How SkyFi delivers technically deep, 24/7 customer support across 185 countries with xFusion.",
    portraitName: "Claire Fundingsland",
    portraitLabel: "CLAIRE FUNDINGSLAND",
    portraitSrc: "../../images/claire-fundingsland-skyfi.webp"
  }), /*#__PURE__*/React.createElement(OverviewBox, {
    rows: overviewRows
  }), /*#__PURE__*/React.createElement(LongForm, {
    number: "01",
    section: "About the company",
    title: "About SkyFi",
    paragraphs: aboutParagraphs,
    dropCap: true,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(TestimonialFeature, {
    pullQuote: "They never leave a customer interaction unresolved.",
    fullQuote: "xFusion's emphasis on customer satisfaction has been such an asset to SkyFi. I am so impressed with our xFusion team's thoroughness and their ability to adapt and learn quickly. Their internal processes and collaboration foster alignment and ongoing training, and they're always eager to learn and do more. They never leave a customer interaction unresolved and are always quick to alert us for potential opportunities with customers, which has helped our team grow at scale and keep customers at the center of everything we do.",
    name: "Claire Fundingsland",
    role: "Head of Customer Experience",
    company: "SkyFi",
    portraitLabel: "CLAIRE FUNDINGSLAND",
    portraitSrc: "../../images/claire-fundingsland-skyfi.webp"
  }), /*#__PURE__*/React.createElement(MetricCallout, {
    headline: /*#__PURE__*/React.createElement("span", null, "91.9% customer satisfaction.", /*#__PURE__*/React.createElement("br", null), "36-minute average reply time."),
    support: "Across a global, 24/7 customer base spanning 185 countries.",
    variant: "forest"
  }), /*#__PURE__*/React.createElement(LongForm, {
    number: "02",
    section: "The challenge",
    title: "The challenge",
    paragraphs: challengeParagraphs,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(LongForm, {
    number: "03",
    section: "The solution",
    title: "The solution",
    paragraphs: solutionParagraphs,
    bg: "paper-2"
  }), /*#__PURE__*/React.createElement(LongForm, {
    number: "04",
    section: "The results",
    title: "The results",
    paragraphs: resultsParagraphs,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(CTASection, {
    title: "Want to see if we can help you too?",
    body: "If your customer support is buckling under global volume, technical depth, or 24/7 coverage demands, we can help. We will recruit, vet, place, train, and manage a senior, AI-trained support agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free.",
    ctaLabel: "Book a Discovery Call",
    microcopy: "30 minutes. No commitment. No credit card. You'll talk directly with our founding team."
  }), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));