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
// --- components/Footer.jsx
// Unified site footer for individual case study (site/case-studies/ordered-magic/index.html)
// Forest-green background (--color-forest #2C4A3E), Paper text (#F7F2EB)
function Footer() {
  const cols = [{
    title: 'Product',
    links: [['Pricing', '../../#pricing'], ['Case studies', '../']]
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
// --- components/CaseStudy.jsx
// =====================================================================
// Photo placeholder for Toby Marsden — flat warm portrait swatch.
// Used in hero (medium portrait) and lead testimonial (square/circle).
// =====================================================================
function TobyPortrait({
  size = 'medium',
  shape = 'rect',
  src = '../../images/toby-marsden-ordered-magic.webp'
}) {
  const dims = {
    small: {
      w: 96,
      fontInitials: 36,
      fontName: 13
    },
    medium: {
      w: 240,
      fontInitials: 88,
      fontName: 16
    },
    large: {
      w: 320,
      fontInitials: 110,
      fontName: 18
    }
  }[size];
  const radius = shape === 'circle' ? 999 : 12;
  const ratio = shape === 'circle' ? '1/1' : '4/5';
  const [errored, setErrored] = React.useState(false);
  if (src && !errored) {
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: "Toby Marsden, founder of Ordered Magic",
      loading: size === 'medium' ? undefined : 'lazy',
      onError: () => setErrored(true),
      style: {
        width: dims.w,
        aspectRatio: ratio,
        objectFit: 'cover',
        borderRadius: radius,
        boxShadow: 'inset 0 0 0 1px rgba(31,26,23,0.08)',
        display: 'block'
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: dims.w,
      aspectRatio: ratio,
      borderRadius: radius,
      background: 'linear-gradient(150deg, #C45E36 0%, #9C4220 60%, #7A331A 100%)',
      position: 'relative',
      overflow: 'hidden',
      color: '#F0D9A8',
      boxShadow: 'inset 0 0 0 1px rgba(31,26,23,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 30% 25%, rgba(240,217,168,0.28), transparent 55%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '12%',
      left: 0,
      right: 0,
      textAlign: 'center',
      fontFamily: "'Source Serif 4', serif",
      fontSize: dims.fontInitials,
      fontWeight: 400,
      opacity: 0.45,
      lineHeight: 1,
      letterSpacing: '-0.02em'
    }
  }, "TM"), shape !== 'circle' && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      right: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      opacity: 0.7,
      marginBottom: 2
    }
  }, "Photo placeholder"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: dims.fontName,
      lineHeight: 1.2
    }
  }, "Toby Marsden")));
}

// =====================================================================
// PageHeader — Section 1
// =====================================================================
function PageHeader() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "md",
    style: {
      paddingTop: 72,
      paddingBottom: 56
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#case-studies",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      color: '#6B5F56',
      textDecoration: 'none',
      letterSpacing: '0.04em'
    }
  }, "← Case studies")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 280px',
      gap: 56,
      alignItems: 'start'
    },
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 28
    }
  }, "Case study · 07"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(48px, 7vw, 88px)',
      fontWeight: 400,
      lineHeight: 1.02,
      letterSpacing: '-0.025em',
      margin: '0 0 28px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "Ordered Magic"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(20px, 1.9vw, 24px)',
      lineHeight: 1.45,
      color: '#3A322D',
      margin: 0,
      maxWidth: 620,
      fontWeight: 400,
      textWrap: 'pretty'
    }
  }, "How Ordered Magic grew from a one-person inbox to a multi-agent support team without hiring.")), /*#__PURE__*/React.createElement("div", {
    className: "hero-photo",
    style: {
      justifySelf: 'end'
    }
  }, /*#__PURE__*/React.createElement(TobyPortrait, {
    size: "medium",
    shape: "rect"
  })))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .hero-photo { justify-self: start !important; }
        }
      `));
}

// =====================================================================
// OverviewBox — Section 2 (5-row editorial table)
// =====================================================================
function OverviewBox() {
  const rows = [['Industry', 'SaaS / Shopify app development'], ['Country', 'France'], ['Challenge', "Toby was personally handling seven-day-a-week support across a growing app catalog while expanding into the U.S., with no path to hire and manage a team without losing his ability to build."], ['Solution', "xFusion placed and managed a dedicated, technically fluent support team trained in Toby's apps, then grew the team as volume grew, while xFusion handled recruiting, training, payroll, culture, and ongoing oversight."], ['Results', 'Team grew from one dedicated agent to two full-time plus a part-time weekend agent. Hundreds of new five-star reviews on Shopify, higher organic ranking in the app store, and Toby reclaimed the time to focus on product.']];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "sm",
    style: {
      paddingTop: 16,
      paddingBottom: 88
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F8EBC9',
      borderRadius: 16,
      border: '1px solid #E6C683',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 32px',
      borderBottom: '1px solid rgba(31,26,23,0.10)',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#7a5a10'
    }
  }, "Overview"), /*#__PURE__*/React.createElement("table", {
    className: "overview-table",
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: "'IBM Plex Sans', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("tbody", null, rows.map(([label, value], i) => /*#__PURE__*/React.createElement("tr", {
    key: label,
    style: {
      borderBottom: i < rows.length - 1 ? '1px solid rgba(31,26,23,0.08)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("th", {
    scope: "row",
    style: {
      width: 180,
      textAlign: 'left',
      verticalAlign: 'top',
      padding: '20px 24px 20px 32px',
      fontFamily: "'Source Serif 4', serif",
      fontWeight: 400,
      fontSize: 18,
      color: '#1F1A17',
      fontStyle: 'italic'
    }
  }, label), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '20px 32px 20px 0',
      fontSize: 16,
      lineHeight: 1.55,
      color: '#1F1A17',
      textWrap: 'pretty'
    }
  }, value))))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 700px) {
          .overview-table th { width: auto !important; display: block; padding: 16px 20px 4px !important; }
          .overview-table td { display: block; padding: 0 20px 16px !important; }
        }
      `));
}

// =====================================================================
// LongForm — Sections 3, 6, 7, 10
// =====================================================================
function LongForm({
  eyebrow,
  heading,
  paragraphs,
  bg = 'paper',
  id
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: bg,
    padding: "lg",
    style: {
      paddingTop: 96,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
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
    id: id,
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(34px, 4vw, 52px)',
      fontWeight: 400,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      margin: '0 0 40px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 2,
      background: '#B8512C',
      marginBottom: 36
    }
  }), paragraphs.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.7,
      color: '#1F1A17',
      margin: i === 0 ? '0 0 24px' : '0 0 24px',
      textWrap: 'pretty'
    }
  }, p))));
}

// =====================================================================
// TestimonialFeature — Section 4
// =====================================================================
function TestimonialFeature() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg",
    style: {
      paddingTop: 88,
      paddingBottom: 88
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F8EBC9',
      border: '1px solid #E6C683',
      borderRadius: 16,
      padding: 'clamp(32px, 5vw, 64px)',
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: 48,
      alignItems: 'start'
    },
    className: "testimonial-card"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TobyPortrait, {
    size: "medium",
    shape: "rect"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("svg", {
    width: "40",
    height: "32",
    viewBox: "0 0 40 32",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 32V18C0 8 6 2 16 0L18 4C12 6 8 10 8 16H16V32H0ZM22 32V18C22 8 28 2 38 0L40 4C34 6 30 10 30 16H38V32H22Z",
    fill: "#B8512C"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontStyle: 'italic',
      fontSize: 'clamp(28px, 3.4vw, 40px)',
      lineHeight: 1.18,
      fontWeight: 400,
      color: '#1F1A17',
      letterSpacing: '-0.015em',
      margin: '0 0 28px',
      textWrap: 'balance'
    }
  }, "\"I thought my life was going to become a living hell. It was extraordinary instead.\""), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 28px',
      textWrap: 'pretty'
    }
  }, "I was sure outsourcing would mean dropped tickets, the wrong tone, and an exploding workload. None of that happened. The xFusion team grew from one dedicated agent to two full-time and a part-time weekend agent, and the entire way I think about the future of my business has changed."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      letterSpacing: '0.06em',
      color: '#6B5F56',
      textTransform: 'uppercase'
    }
  }, "Toby Marsden \xA0·\xA0 Founder \xA0·\xA0 Ordered Magic")))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 760px) {
          .testimonial-card {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `));
}

// =====================================================================
// MetricCallout — Section 5 (Forest background, big punch)
// =====================================================================
function MetricCallout() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "lg",
    style: {
      paddingTop: 112,
      paddingBottom: 112
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 56,
      alignItems: 'center'
    },
    className: "metric-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      color: '#F0D9A8',
      marginBottom: 28
    }
  }, "The proof"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(120px, 18vw, 240px)',
      fontWeight: 400,
      lineHeight: 0.9,
      letterSpacing: '-0.04em',
      color: '#F7F2EB',
      margin: 0
    }
  }, "1", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#F0D9A8',
      margin: '0 0.08em'
    }
  }, "to"), "3", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#B8512C'
    }
  }, "+"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.6,
      color: '#F0D9A8',
      margin: 0,
      textWrap: 'pretty'
    }
  }, "The team grew from one dedicated agent to two full-time agents plus a part-time weekend agent, with hundreds of new five-star reviews and a meaningful jump in organic ranking on the Shopify app store. What started as a single placement to take the support inbox off Toby's plate became a real, multi-person team carrying the entire support function across three apps and seven-day coverage.")))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .metric-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `));
}

// =====================================================================
// ShoutoutGrid — Sections 8, 9 (placeholder cards)
// =====================================================================
function ShoutoutGrid({
  eyebrow,
  heading,
  kind = 'leader',
  columns = 3,
  bg = 'paper'
}) {
  const cards = Array.from({
    length: columns
  }, (_, i) => i);
  const placeholderText = kind === 'leader' ? '[Leader shoutout coming soon]' : '[Customer shoutout coming soon]';
  const slotLabel = kind === 'leader' ? 'Ordered Magic team member' : 'Verified Shopify app review';
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
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
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
      margin: '0 0 12px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, heading), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      color: '#6B5F56',
      margin: 0,
      fontStyle: 'italic'
    }
  }, "Quotes coming soon.")), /*#__PURE__*/React.createElement("div", {
    className: "shoutout-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 20,
      marginTop: 40
    }
  }, cards.map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: bg === 'butter' ? '#F7F2EB' : '#FBF7F0',
      border: '1px dashed #B7A993',
      borderRadius: 12,
      padding: 28,
      minHeight: 220,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "20",
    viewBox: "0 0 40 32",
    style: {
      marginBottom: 16,
      opacity: 0.45
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 32V18C0 8 6 2 16 0L18 4C12 6 8 10 8 16H16V32H0ZM22 32V18C22 8 28 2 38 0L40 4C34 6 30 10 30 16H38V32H22Z",
    fill: "#B8512C"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 18,
      lineHeight: 1.45,
      fontStyle: 'italic',
      color: '#9E9388',
      margin: 0,
      textWrap: 'pretty'
    }
  }, placeholderText)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      paddingTop: 16,
      borderTop: '1px solid #E6DCCB'
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
      fontWeight: 600,
      color: '#9E9388'
    }
  }, "Name pending"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: '#9E9388',
      letterSpacing: '0.04em',
      marginTop: 2
    }
  }, slotLabel))))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .shoutout-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .shoutout-grid { grid-template-columns: 1fr !important; }
        }
      `));
}

// =====================================================================
// CTASection — Section 11 (Forest band)
// =====================================================================
function CTASection() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "lg",
    style: {
      paddingTop: 96,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 56,
      alignItems: 'center'
    },
    className: "cta-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      color: '#F0D9A8',
      marginBottom: 24
    }
  }, "Ready when you are"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(36px, 4.6vw, 60px)',
      fontWeight: 400,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#F7F2EB',
      textWrap: 'balance'
    }
  }, "Want to see if we can help you too?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.6,
      color: '#F0D9A8',
      opacity: 0.92,
      margin: 0,
      maxWidth: 560,
      textWrap: 'pretty'
    }
  }, "If your customer support is starting to slip, or you are about to lose the one person holding it together, we can help. We will recruit, vet, place, train, and manage a senior, AI-trained support agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    style: {
      fontSize: 17,
      padding: '18px 28px'
    },
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.55,
      color: '#F0D9A8',
      opacity: 0.8,
      margin: 0,
      maxWidth: 360
    }
  }, "30 minutes. No commitment. No credit card. You'll talk directly with our founding team.")))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `));
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
  TobyPortrait
});
// --- (inline)
const aboutParagraphs = ["Ordered Magic is a Shopify app company based in France, founded and led by Toby Marsden. The company builds and maintains a portfolio of apps that help merchants do real work inside their stores. Uploadkit gives merchants a file uploading layer for personalized and made-to-order products. Instabuy creates instant purchasing flows that reduce friction at the moment a shopper is ready to commit. Hypervisual lets merchants build rich product pages without wrestling with code.", "Each app sits inside the Shopify ecosystem, which means the support inbox is technical by default. A typical question involves Liquid, theme code, app blocks, custom CSS, or a merchant trying to bend a feature to fit a workflow Shopify itself does not natively support. That is not a place where scripted answers survive. The merchant on the other end usually needs someone who can read the code, understand the platform, and write back with an actual solution.", "By 2020, Ordered Magic was expanding into the U.S. market. The apps were getting heavier traffic, the inbox was getting heavier with it, and Toby was the only person on the support side. He needed a way to scale the support function without becoming a manager of a small support team on top of being the founder, the developer, and the strategist. That is when he started working with xFusion."];
const challengeParagraphs = ["Ordered Magic's portfolio was working. Uploadkit, Instabuy, and Hypervisual were getting traction, the U.S. expansion was live, and merchants were finding the apps. The catch was that every merchant question landed in Toby's inbox. He was the founder, the developer, and the support team, all at once.", "Three apps with three different feature sets meant three different kinds of tickets. File upload edge cases. Quick-buy flow questions. Visual editor and theme integration issues. Each one needed real technical attention. None of them could be deflected with a templated reply. Toby was reading code, writing answers, and shipping fixes between tickets, and the high-traffic apps demanded coverage seven days a week.", "He had thought about hiring. The math did not work. Bringing on a full-time employee meant taking on the recruiting, the onboarding, the payroll, the culture, and the ongoing management, all while personally training the new hire on apps only he fully understood. The cost was not just financial. It was the management overhead that would land on the person already running everything else.", "The other obvious option was outsourcing. Toby was openly skeptical of that path. He expected what most founders fear when they outsource support for the first time: dropped tickets, the wrong tone, frustrated customers, and a workload that grew rather than shrank because now there was a remote team to babysit. He was bracing for the worst version of it.", "But the status quo was unsustainable. The growth he wanted was on the other side of getting the inbox off his desk, and continuing to handle it himself was already costing him product time he could not get back."];
const solutionParagraphs = ["Toby and xFusion's co-founder Jim Coleman had a candid early conversation about the support side of Ordered Magic. The framing was simple. Toby did not need a placement and a handoff. He needed a partner who would take over the function, including the management of it, so he could stop thinking about support and start thinking about product again.", "xFusion placed a dedicated agent with real technical depth: someone fluent in HTML, CSS, JavaScript, and Shopify Liquid, who could actually solve the kind of tickets the apps generated. The agent was vetted through the TraitX Framework and supported by a dedicated account manager on the xFusion side. The first weeks were spent in product immersion across all three apps, learning Uploadkit, Instabuy, and Hypervisual the way Toby knew them, plus the Shopify environment they sit inside.", "The team handled tier-one and tier-two technical support, with clear escalation when something genuinely needed Toby's attention. Bugs got reported up to him in a structured way so he could fix and ship rather than triage. Routine merchant questions stayed inside the support team. Toby's role narrowed back down to the work only he could do.", "As volume grew, the team grew. One dedicated agent became two full-time agents, then a part-time weekend agent was added to cover the seven-day demands of the high-traffic apps. xFusion handled the staffing on every layer of that growth: recruiting the next person, onboarding them into the apps, integrating them with the existing team, and taking the management load off Toby. He never had to interview a candidate or write a payroll check.", "Beyond the inbox, the team took on the work that surrounds support. They organized and surfaced customer feedback so it could feed product decisions. They set up review generation workflows that stayed inside Shopify's terms of service, nudging happy merchants to leave the public reviews that move app store ranking. They tightened up onboarding for new merchants and improved helpdesk efficiency so the same team could carry more volume without losing quality.", "What made the partnership work was the same pattern that shows up across xFusion's longest engagements: technical depth on the agent side, end-to-end management on the operations side, and a relationship that kept absorbing more responsibility as Toby found new things he wanted off his plate."];
const resultsParagraphs = ["The first result was the one Toby felt immediately. The tickets he had been handling personally stopped landing on him. The agent picked them up, handled them with the right tone, and resolved them at a rate that kept merchants happy. The dropped tickets and exploding workload he had braced for never materialized.", "The team scaled in step with the apps. Starting from a single dedicated agent in April 2020, it grew to two full-time agents handling primary support coverage, plus a part-time agent covering the weekend shift. That structure held the seven-day coverage Uploadkit, Instabuy, and Hypervisual needed without putting Toby back on rotation.", "The Shopify app store reflected the change. Hundreds of new five-star reviews came in across the three apps, with merchants specifically calling out the support experience. That volume of public five-star feedback moved the apps higher in organic ranking inside the Shopify app store, which fed a healthier acquisition loop on the front end of the business.", "The KPIs the team was tracking on response, resolution, and customer satisfaction got hit and then surpassed. The work the team did to organize merchant feedback fed back into Toby's product decisions, so the apps themselves got better at the same time the support around them got better.", "The biggest result, in Toby's own framing, was not a number. It was that the way he thought about the future of the business changed. He went into the partnership expecting outsourcing to compromise the brand and the customer experience. He came out of it with a multi-person support team that protected both, ran the function without him, and freed him to spend his hours on the part of the business only he could move forward."];
const leaderImages = ['../../images/shoutouts/ordered-magic/leadership/xfusion-4.jpg', '../../images/shoutouts/ordered-magic/leadership/xfusion-1.jpg', '../../images/shoutouts/ordered-magic/leadership/xfusion-2.jpg', '../../images/shoutouts/ordered-magic/leadership/xfusion-3.jpg', '../../images/shoutouts/ordered-magic/leadership/xfusion-1.png'];
const customerImages = ['../../images/shoutouts/ordered-magic/customers/xfusion-2.png', '../../images/shoutouts/ordered-magic/customers/xfusion-10.png', '../../images/shoutouts/ordered-magic/customers/xfusion-5.png', '../../images/shoutouts/ordered-magic/customers/xfusion-9.png', '../../images/shoutouts/ordered-magic/customers/xfusion-11.png', '../../images/shoutouts/ordered-magic/customers/xfusion-7.png', '../../images/shoutouts/ordered-magic/customers/xfusion-8.png'];
function App() {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Ordered Magic case study"
  }, /*#__PURE__*/React.createElement(Nav, {
    current: "case-studies"
  }), /*#__PURE__*/React.createElement(PageHeader, null), /*#__PURE__*/React.createElement(OverviewBox, null), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "The client",
    heading: "About Ordered Magic",
    paragraphs: aboutParagraphs,
    bg: "paper",
    id: "about"
  }), /*#__PURE__*/React.createElement(TestimonialFeature, null), /*#__PURE__*/React.createElement(MetricCallout, null), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "Section 01",
    heading: "The challenge",
    paragraphs: challengeParagraphs,
    bg: "paper",
    id: "challenge"
  }), /*#__PURE__*/React.createElement("hr", {
    className: "editorial-rule"
  }), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "Section 02",
    heading: "The solution",
    paragraphs: solutionParagraphs,
    bg: "paper",
    id: "solution"
  }), /*#__PURE__*/React.createElement(ShoutoutImageGrid, {
    eyebrow: "In their words",
    heading: "Shoutouts to xFusion's team members from Ordered Magic leadership",
    images: leaderImages,
    bg: "paper-2"
  }), /*#__PURE__*/React.createElement(ShoutoutImageGrid, {
    eyebrow: "From the merchants",
    heading: "Shoutouts from Ordered Magic customers about xFusion's team members",
    images: customerImages,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "Section 03",
    heading: "The results",
    paragraphs: resultsParagraphs,
    bg: "paper-2",
    id: "results"
  }), /*#__PURE__*/React.createElement(CTASection, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));