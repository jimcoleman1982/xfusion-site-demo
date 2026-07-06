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
// --- Nav.jsx
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
// --- Footer.jsx
// Unified site footer for individual case study (site/case-studies/ordered-magic/index.html)
// Forest-green background (--color-forest #2C4A3E), Paper text (#F7F2EB)
function Footer() {
  const cols = [{
    title: 'Product',
    links: [['Pricing', '../../#pricing'], ['Case studies', '../'], ['Shopify app support', '/shopify-app-support/'], ['SaaS support', '/saas-support/']]
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
// --- CaseStudyComponents.jsx
// Page-specific components for the Tolstoy case study

// =============================================================
// PageHeader — eyebrow + client title + subhead + lead photo
// =============================================================
function PageHeader({
  eyebrow,
  title,
  subhead,
  photo
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 56,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      color: '#6B5F56',
      marginBottom: 48,
      letterSpacing: '0.04em'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: '#6B5F56',
      textDecoration: 'none'
    }
  }, "Case studies"), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 10px',
      color: '#B7A993'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1F1A17'
    }
  }, "Tolstoy")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center'
    },
    className: "ph-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#B8512C',
      marginBottom: 28
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(56px, 9vw, 112px)',
      fontWeight: 400,
      lineHeight: 0.95,
      letterSpacing: '-0.035em',
      color: '#1F1A17',
      margin: '0 0 32px'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(19px, 1.6vw, 22px)',
      lineHeight: 1.45,
      color: '#3A322D',
      margin: 0,
      maxWidth: 540,
      fontWeight: 400
    }
  }, subhead)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 12,
      overflow: 'hidden',
      maxWidth: 460,
      marginLeft: 'auto',
      border: '1px solid #D9CFBF'
    },
    className: "ph-photo"
  }, /*#__PURE__*/React.createElement(PhotoFrame, {
    name: photo.name,
    role: photo.role,
    src: photo.src,
    ratio: "4/5",
    tone: "clay"
  }))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .ph-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ph-photo { max-width: 360px !important; margin: 0 !important; }
        }
      `));
}

// Photo frame — renders real <img> when src is provided, otherwise warm placeholder
function PhotoFrame({
  name,
  role,
  src,
  ratio = '4/5',
  tone = 'clay'
}) {
  const [errored, setErrored] = useState(false);
  if (src && !errored) {
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: role ? `${name}, ${role}` : name,
      onError: () => setErrored(true),
      style: {
        width: '100%',
        aspectRatio: ratio,
        objectFit: 'cover',
        display: 'block'
      }
    });
  }
  const tones = {
    clay: {
      bg: '#B8512C',
      accent: '#F0D9A8'
    },
    forest: {
      bg: '#2C4A3E',
      accent: '#F0D9A8'
    },
    butter: {
      bg: '#F0D9A8',
      accent: '#1F1A17'
    }
  };
  const t = tones[tone];
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: t.bg,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 30% 20%, rgba(240,217,168,0.35), transparent 60%), radial-gradient(ellipse at 70% 90%, rgba(31,26,23,0.3), transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(120px, 22vw, 220px)',
      color: t.accent,
      opacity: 0.18,
      lineHeight: 1,
      fontWeight: 400,
      letterSpacing: '-0.04em'
    }
  }, initials), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '20px 24px',
      background: 'linear-gradient(to top, rgba(31,26,23,0.55), transparent)',
      color: '#F7F2EB'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      opacity: 0.85,
      marginBottom: 4
    }
  }, "Photo placeholder"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 22,
      lineHeight: 1.15
    }
  }, name), role && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      opacity: 0.85,
      marginTop: 2
    }
  }, role)));
}

// =============================================================
// OverviewBox — 5-row metadata table (editorial)
// =============================================================
function OverviewBox({
  rows
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "md",
    style: {
      paddingTop: 0,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F8EBC9',
      border: '1px solid #E6C683',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 32px',
      borderBottom: '1px solid rgba(184,81,44,0.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#863818'
    }
  }, "At a glance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: '#6B5F56'
    }
  }, "Working together since August 2022")), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: 32,
      padding: '24px 32px',
      borderBottom: i === rows.length - 1 ? 'none' : '1px solid rgba(184,81,44,0.14)',
      alignItems: 'baseline'
    },
    className: "ovr-row"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: '#3A322D'
    }
  }, r.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.55,
      color: '#1F1A17'
    }
  }, r.value))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 720px) {
          .ovr-row { grid-template-columns: 1fr !important; gap: 8px !important; padding: 20px 24px !important; }
        }
      `));
}

// =============================================================
// LongForm — narrow editorial column with section heading
// =============================================================
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
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#B8512C',
      marginBottom: 20
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(36px, 4.5vw, 56px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: '#1F1A17',
      margin: '0 0 40px',
      textWrap: 'balance'
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.65,
      color: '#1F1A17'
    }
  }, paragraphs.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: i === paragraphs.length - 1 ? 0 : '0 0 24px',
      textWrap: 'pretty'
    }
  }, dropCap && i === 0 ? /*#__PURE__*/React.createElement(DropCap, null, p) : p)))));
}
function DropCap({
  children
}) {
  if (typeof children !== 'string') return children;
  const first = children.charAt(0);
  const rest = children.slice(1);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: '4.4em',
      float: 'left',
      lineHeight: 0.85,
      marginTop: '0.08em',
      marginRight: '0.08em',
      color: '#B8512C',
      fontWeight: 400
    }
  }, first), rest);
}

// =============================================================
// TestimonialFeature — featured testimonial card
// =============================================================
function TestimonialFeature({
  photo,
  pullQuote,
  fullQuote,
  name,
  role,
  company
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F8EBC9',
      borderRadius: 24,
      padding: 'clamp(40px, 6vw, 72px)',
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: 'clamp(32px, 5vw, 64px)',
      alignItems: 'flex-start'
    },
    className: "tf-card"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid rgba(31,26,23,0.08)'
    }
  }, /*#__PURE__*/React.createElement(PhotoFrame, {
    name: photo.name,
    role: photo.role,
    src: photo.src,
    ratio: "4/5",
    tone: "clay"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 96,
      lineHeight: 0.6,
      color: '#B8512C',
      opacity: 0.55,
      marginBottom: 12,
      userSelect: 'none'
    },
    "aria-hidden": "true"
  }, "“"), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontStyle: 'italic',
      fontSize: 'clamp(28px, 3.4vw, 42px)',
      lineHeight: 1.2,
      fontWeight: 400,
      color: '#1F1A17',
      margin: '0 0 32px',
      letterSpacing: '-0.015em',
      textWrap: 'balance'
    }
  }, pullQuote), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 32px',
      textWrap: 'pretty'
    }
  }, fullQuote), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#3A322D'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1,
      background: '#B7A993'
    }
  }), /*#__PURE__*/React.createElement("span", null, name, ", ", role, ", ", company))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 800px) {
          .tf-card { grid-template-columns: 1fr !important; }
          .tf-card > div:first-child { max-width: 220px; }
        }
      `));
}

// =============================================================
// MetricCallout — oversized stat (Forest band)
// =============================================================
function MetricCallout({
  stat,
  support,
  side
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#2C4A3E',
      color: '#F7F2EB',
      padding: 'clamp(80px, 12vw, 140px) 0',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '50%',
      borderLeft: '1px solid rgba(247,242,235,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 24,
      textAlign: 'center',
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
      color: '#F0D9A8',
      marginBottom: 8
    }
  }, "The proof"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(72px, 14vw, 200px)',
      fontWeight: 400,
      lineHeight: 0.95,
      letterSpacing: '-0.04em',
      color: '#F7F2EB',
      margin: 0,
      textWrap: 'balance'
    }
  }, stat), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(18px, 1.6vw, 22px)',
      lineHeight: 1.5,
      color: '#D7E0DC',
      maxWidth: 720,
      margin: '8px auto 0',
      textWrap: 'pretty'
    }
  }, support), side && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 48,
      marginTop: 56,
      paddingTop: 40,
      borderTop: '1px solid rgba(247,242,235,0.12)'
    }
  }, side.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      minWidth: 160
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 3vw, 44px)',
      color: '#F0D9A8',
      lineHeight: 1,
      marginBottom: 8
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: '#D7E0DC',
      lineHeight: 1.4
    }
  }, s.label)))))));
}

// =============================================================
// ShoutoutGrid — placeholder grid for leader/customer quotes
// =============================================================
function ShoutoutGrid({
  eyebrow,
  heading,
  intro,
  type = 'leader',
  count = 3,
  bg = 'paper'
}) {
  const placeholderText = type === 'leader' ? '[Leader shoutout coming soon]' : '[Customer shoutout coming soon]';
  const attrLabels = type === 'leader' ? ['Tolstoy leader, role TBD', 'Tolstoy leader, role TBD', 'Tolstoy leader, role TBD'] : ['Shopify app review, name TBD', 'Shopify app review, name TBD', 'Shopify app review, name TBD'];
  return /*#__PURE__*/React.createElement(Section, {
    bg: bg,
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 24,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#B8512C',
      marginBottom: 16
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 3.6vw, 44px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#1F1A17',
      margin: '0 0 16px',
      textWrap: 'balance'
    }
  }, heading), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.55,
      color: '#3A322D',
      margin: 0,
      maxWidth: 600
    }
  }, intro)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px',
      background: 'rgba(184,133,31,0.12)',
      color: '#7a5912',
      borderRadius: 999,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.12em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: '#B8851F'
    }
  }), "Quotes coming soon")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${count}, 1fr)`,
      gap: 24
    },
    className: `sg-grid sg-${count}`
  }, Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement(PlaceholderCard, {
    key: i,
    text: placeholderText,
    attribution: attrLabels[i % attrLabels.length],
    type: type,
    index: i
  })))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .sg-3 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .sg-grid { grid-template-columns: 1fr !important; }
        }
      `));
}
function PlaceholderCard({
  text,
  attribution,
  type,
  index
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F7F2EB',
      border: '1px dashed #B7A993',
      borderRadius: 12,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      minHeight: 280,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 64,
      lineHeight: 0.5,
      color: '#D9CFBF',
      userSelect: 'none'
    },
    "aria-hidden": "true"
  }, "“"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.55,
      color: '#9E9388',
      fontStyle: 'italic'
    }
  }, text), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 20,
      borderTop: '1px solid #E6DCCB',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 18,
      background: type === 'leader' ? '#EFE8DD' : '#F8EBC9',
      border: '1px solid #D9CFBF',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      fontWeight: 500,
      color: '#6B5F56'
    }
  }, "Name TBD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: '#9E9388',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginTop: 2
    }
  }, attribution))));
}

// =============================================================
// CTASection — Forest-green CTA band
// =============================================================
function CTASection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#2C4A3E',
      color: '#F7F2EB',
      padding: 'clamp(72px, 10vw, 120px) 0'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(40px, 5.4vw, 68px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      color: '#F7F2EB',
      margin: '0 0 24px',
      textWrap: 'balance'
    }
  }, "Want to see if we can help you too?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(16px, 1.4vw, 18px)',
      lineHeight: 1.6,
      color: '#D7E0DC',
      margin: '0 auto 40px',
      maxWidth: 680,
      textWrap: 'pretty'
    }
  }, "If your customer support is starting to slip, or you are about to lose the one person holding it together, we can help. We will recruit, vet, place, train, and manage a senior, AI-trained support agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free."), /*#__PURE__*/React.createElement(Button, {
    variant: "on-dark",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      color: '#D7E0DC',
      margin: '20px 0 0',
      opacity: 0.85,
      letterSpacing: '0.02em'
    }
  }, "30 minutes. No commitment. No credit card. You'll talk directly with our founding team."))));
}

// =============================================================
// SectionDivider — subtle hairline used between editorial sections
// =============================================================
function SectionDivider({
  label,
  bg = 'paper'
}) {
  const bgs = {
    paper: '#F7F2EB',
    butter: '#F8EBC9'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bgs[bg],
      padding: '0 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#D9CFBF',
      position: 'relative'
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: bgs[bg],
      padding: '0 16px',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#9E9388'
    }
  }, label))));
}

// Image-based shoutout grid (sourced from xfusion.io originals)
function ShoutoutImageGrid({
  eyebrow,
  heading,
  intro,
  images,
  bg = 'paper'
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
  PageHeader,
  OverviewBox,
  LongForm,
  TestimonialFeature,
  MetricCallout,
  ShoutoutGrid,
  ShoutoutImageGrid,
  CTASection,
  SectionDivider,
  PhotoFrame,
  DropCap,
  PlaceholderCard
});
// --- (inline)
const overviewRows = [{
  label: 'Industry',
  value: 'Video commerce SaaS (Shopify and non-Shopify)'
}, {
  label: 'Country',
  value: 'Israel'
}, {
  label: 'Challenge',
  value: 'One internal support person was about to leave. Support volume was rising. The team needed help with email, live chat, onboarding, docs, helpdesk fixes, and client calls. They had no time to hire and train a team.'
}, {
  label: 'Solution',
  value: 'A dedicated xFusion team grew from one front-line agent into a six-person team. They covered front-line support, onboarding, helpdesk fixes, and a "Solutions Engineer" group for big clients and custom-code work.'
}, {
  label: 'Results',
  value: "Tolstoy's Shopify app ranking jumped 90 points after a wave of 5-star reviews praising the support. Reopened tickets dropped from about one in three to a much smaller share. The team handled 584 tickets on their own in March 2023. The core Tolstoy team got time back to focus on the product."
}];
const aboutParagraphs = ["Tolstoy is a video commerce platform used by more than 5,000 brands, including Culture Kings and LSKD. The company is based in Israel. They built their name on shoppable video that drops into the customer journey without slowing the site down.", "The product is built around short-form video. Brands use Tolstoy to create shoppable video flows that connect shoppers to products. The numbers back it up. Tolstoy delivers four times more time spent on a site, and doubles the chance of repeat purchases. The platform also gives brands data on what shoppers do, which helps them target better and convert more buyers.", "By the summer of 2022, Tolstoy was growing fast. The leadership team needed a support partner who could keep up without becoming one more thing to manage."];
const challengeParagraphs = ["When Tolstoy's leadership team first sat down with xFusion co-founder Jim in the summer of 2022, the company was buried. Support volume was rising fast. The one person handling the inbox was leaving, and there was no plan B.", "The gap was bigger than one role. Tolstoy needed help with email, live chat, onboarding for new brands, customer-facing docs, helpdesk fixes, and client calls. Every piece of that work touched the customer experience. Every piece had been getting half the attention it needed while the team focused on shipping product.", "The leadership team did not want to start a hiring push, train a new team, and add more management work on top of everything else. They wanted a partner who could take over the whole support function. They wanted that partner to run it the way Tolstoy would run it, without making the founders the back-up reps.", "The bar was high. Tolstoy's brand is built on real, human connection between brands and shoppers. Whoever handled support had to carry that voice in every reply."];
const solutionParagraphs = ["xFusion started with the most urgent piece. We put a coverage plan in place before the internal team member's last day. From there, the partnership grew fast.", "The first xFusion agent learned onboarding by walking new brands through the product over video calls. Once the rhythm settled in, xFusion rebuilt the helpdesk under the day-to-day work. Saved replies. Cleaner workflows. Internal docs for the team. Help articles for customers. None of that was in place in any organized form before the partnership started.", "As Tolstoy landed bigger clients, xFusion built a second-level team called \"Solutions Engineers.\" This group handled the harder tickets: escalations, bug triage, tough troubleshooting, and custom-code requests from larger clients. They also followed up on new client activations to make sure every tag, escalation, and request matched the client's setup. The xFusion Solutions Engineer lead worked directly with Tolstoy's Head of Growth to keep the activations process running smoothly.", "The setup Tolstoy and xFusion landed on was simple. One team. One group covering front-line support, harder tickets, onboarding, docs, and reports. All managed by xFusion through a dedicated account manager. All in Tolstoy's voice."];
const resultsParagraphs = ["The partnership started on August 18, 2022. Within the first few months, the xFusion team and Dov had a working KPI plan in place. Weekly reports were running. The help article library was getting built from scratch. Customers noticed.", "The clearest signal came from the Shopify app store. As support got better, Tolstoy started getting 5-star reviews that praised the support, and the app's ranking jumped 90 points. For a video commerce platform fighting for visibility on Shopify, that kind of jump changes how many new brands find and trust the product.", "The numbers under the hood got better too. Before xFusion, about one in three tickets had to be reopened, the usual sign that the first reply did not solve the problem. After xFusion stabilized the workflow and the team got comfortable with the product, that reopen rate dropped sharply. In a single month, March 2023, the xFusion team handled 584 tickets on their own. No founder approvals. No escalations to internal Tolstoy staff. Just a trained team running the function.", "The business impact added up. Tolstoy's leadership stopped thinking about support as a problem to solve. The development team got back the time they had been spending on customer issues. The leadership team got room to focus on the next phase of growth. The customer experience kept getting stronger as the xFusion team added better docs, faster routing, and a tighter match with Tolstoy's voice."];
const leaderImages = ['../../images/shoutouts/tolstoy/leadership/image1-1.png', '../../images/shoutouts/tolstoy/leadership/image22-1.png', '../../images/shoutouts/tolstoy/leadership/image30-1.png', '../../images/shoutouts/tolstoy/leadership/image11-1.png', '../../images/shoutouts/tolstoy/leadership/image27-1.png', '../../images/shoutouts/tolstoy/leadership/image3-1.png', '../../images/shoutouts/tolstoy/leadership/image12-1.png', '../../images/shoutouts/tolstoy/leadership/image45.png', '../../images/shoutouts/tolstoy/leadership/image31-1.png', '../../images/shoutouts/tolstoy/leadership/image36-1.png'];
const customerImages = ['../../images/shoutouts/tolstoy/customers/image2-1.png', '../../images/shoutouts/tolstoy/customers/image4-1.png', '../../images/shoutouts/tolstoy/customers/image5-1.png', '../../images/shoutouts/tolstoy/customers/image6-1.png', '../../images/shoutouts/tolstoy/customers/image8-1.png', '../../images/shoutouts/tolstoy/customers/image10-1.png', '../../images/shoutouts/tolstoy/customers/image16-1.png', '../../images/shoutouts/tolstoy/customers/image17-1.png', '../../images/shoutouts/tolstoy/customers/image18-1.png', '../../images/shoutouts/tolstoy/customers/image19-1.png', '../../images/shoutouts/tolstoy/customers/image21-1.png', '../../images/shoutouts/tolstoy/customers/image26-1.png', '../../images/shoutouts/tolstoy/customers/image28-1.png', '../../images/shoutouts/tolstoy/customers/image29-1.png', '../../images/shoutouts/tolstoy/customers/image35-1.png', '../../images/shoutouts/tolstoy/customers/image37-1.png', '../../images/shoutouts/tolstoy/customers/image39.png', '../../images/shoutouts/tolstoy/customers/image44.png', '../../images/shoutouts/tolstoy/customers/image46.png'];
function Page() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Case study · 04",
    title: "Tolstoy",
    subhead: "How Tolstoy grew customer support from one agent to a six-person team with xFusion.",
    photo: {
      name: 'Dov Kaufmann',
      role: 'COO, Tolstoy',
      src: '../../images/dov-kaufmann-tolstoy.webp'
    }
  }), /*#__PURE__*/React.createElement(OverviewBox, {
    rows: overviewRows
  }), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "01 · The company",
    heading: "About Tolstoy",
    paragraphs: aboutParagraphs,
    dropCap: true
  }), /*#__PURE__*/React.createElement(TestimonialFeature, {
    photo: {
      name: 'Dov Kaufmann',
      role: 'COO, Tolstoy',
      src: '../../images/dov-kaufmann-tolstoy.webp'
    },
    pullQuote: "An absolute game-changer. We grow faster and more professionally than we ever could alone.",
    fullQuote: "Working with the xFusion team enabled us to scale customer support from a single agent to a six-person team handling Tier 1 and Tier 2 work. The partnership has been so valuable that our Shopify app ranking jumped 90 points after a wave of 5-star reviews tied to better support. I can't praise the team enough.",
    name: "Dov Kaufmann",
    role: "COO",
    company: "Tolstoy"
  }), /*#__PURE__*/React.createElement(MetricCallout, {
    stat: "90-point jump",
    support: "in Tolstoy's Shopify app ranking after a wave of 5-star reviews tied to better customer support.",
    side: [{
      value: '584',
      label: 'Tickets handled on their own in March 2023'
    }, {
      value: '6',
      label: 'Person team, up from one'
    }, {
      value: '⅓ → ↓',
      label: 'Reopened tickets dropped sharply'
    }]
  }), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "02 · The challenge",
    heading: "The challenge",
    paragraphs: challengeParagraphs,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "03 · The solution",
    heading: "The solution",
    paragraphs: solutionParagraphs,
    bg: "paper-2"
  }), /*#__PURE__*/React.createElement(ShoutoutImageGrid, {
    eyebrow: "04 · From the inside",
    heading: "Shoutouts to xFusion's team members from Tolstoy leadership",
    intro: "What Tolstoy's leadership team has to say about working with the xFusion team day-to-day.",
    images: leaderImages,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(ShoutoutImageGrid, {
    eyebrow: "05 · From the outside",
    heading: "Shoutouts from Tolstoy customers about xFusion's team members",
    intro: "5-star Shopify app reviews where customers called out xFusion team members by name.",
    images: customerImages,
    bg: "paper-2"
  }), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "06 · The results",
    heading: "The results",
    paragraphs: resultsParagraphs,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(CTASection, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('app')).render(/*#__PURE__*/React.createElement(Page, null));