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
// Shared primitives — Container, Section, Eyebrow, Button, PhotoFrame, Icon

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
    'butter-warm': '#F0D9A8',
    forest: '#2C4A3E',
    ink: '#1F1A17'
  };
  const pads = {
    sm: '40px 0',
    md: '64px 0',
    lg: '96px 0',
    xl: '128px 0'
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
  color = '#6B5F56',
  mono = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono ? "'JetBrains Mono', monospace" : "'IBM Plex Sans', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: mono ? '0.16em' : '0.14em',
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
      padding: '16px 28px',
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
      transform: pressed ? 'translateY(1px)' : 'translateY(0)',
      ...sizes[size],
      ...style
    }
  }, children);
}

// PhotoFrame — renders real <img> when src is provided, otherwise placeholder
function PhotoFrame({
  name = 'Tom Foster',
  role,
  tone = 'forest',
  ratio = '4/5',
  label = 'Photo placeholder',
  src = '../../images/tom-foster-thereceptionist.webp',
  alt
}) {
  const [errored, setErrored] = useState(false);
  if (src && !errored) {
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: alt || (role ? `${name}, ${role}` : name),
      loading: "lazy",
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
      bg: 'linear-gradient(140deg, #C9613B 0%, #8E3F1D 100%)',
      fg: '#F0D9A8',
      accent: 'rgba(247,242,235,0.18)'
    },
    forest: {
      bg: 'linear-gradient(140deg, #355A4B 0%, #1E342B 100%)',
      fg: '#F0D9A8',
      accent: 'rgba(247,242,235,0.16)'
    },
    butter: {
      bg: 'linear-gradient(140deg, #F0D9A8 0%, #D9BC79 100%)',
      fg: '#1F1A17',
      accent: 'rgba(31,26,23,0.10)'
    },
    paper: {
      bg: 'linear-gradient(140deg, #EFE8DD 0%, #D9CFBF 100%)',
      fg: '#3A322D',
      accent: 'rgba(31,26,23,0.08)'
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
      padding: 22,
      position: 'relative',
      overflow: 'hidden',
      color: t.fg,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-30%',
      right: '-10%',
      width: '80%',
      aspectRatio: '1',
      borderRadius: '50%',
      background: t.accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-20%',
      left: '-15%',
      width: '60%',
      aspectRatio: '1',
      borderRadius: '50%',
      background: t.accent,
      opacity: 0.6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 22,
      right: 22,
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(56px, 14%, 96px)',
      opacity: 0.4,
      lineHeight: 1,
      letterSpacing: '-0.04em'
    }
  }, initials), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      opacity: 0.75,
      marginBottom: 6,
      fontFamily: "'JetBrains Mono', monospace"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 22,
      lineHeight: 1.2,
      marginBottom: role ? 2 : 0
    }
  }, name), role ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      opacity: 0.85,
      fontFamily: "'IBM Plex Sans', sans-serif"
    }
  }, role) : null));
}

// Lucide icon helper
const Icons = {
  arrowRight: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5l7 7-7 7"
  })),
  arrowLeft: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 19l-7-7 7-7"
  })),
  check: /*#__PURE__*/React.createElement("path", {
    d: "M20 7L9 18l-5-5"
  }),
  quote: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
  })),
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
  chevronRight: /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  })
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
  PhotoFrame,
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
    links: [['Pricing', '/pricing/'], ['Case studies', '../'], ['Shopify app support', '/shopify-app-support/'], ['SaaS support', '/saas-support/'], ['Hire support agents', '/hire-support-agents/'], ['Support outsourcing', '/customer-support-outsourcing/'], ['E-commerce support', '/ecommerce-support/']]
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
// --- components/CaseStudySections.jsx
// Case study sections — Hero, Overview, Long-form, Testimonial, Metric

function Breadcrumb() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#6B5F56',
      marginBottom: 28,
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: '#6B5F56',
      textDecoration: 'none'
    }
  }, "xFusion"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "/"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: '#6B5F56',
      textDecoration: 'none'
    }
  }, "Case studies"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1F1A17'
    }
  }, "TheReceptionist"));
}
function PageHeader() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 48
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, "Case study"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1,
      background: '#B8512C',
      display: 'inline-block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#6B5F56'
    }
  }, "08")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(48px, 7vw, 96px)',
      fontWeight: 400,
      lineHeight: 1.0,
      letterSpacing: '-0.025em',
      margin: '0 0 32px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "TheReceptionist"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(20px, 2.2vw, 26px)',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#3A322D',
      margin: '0 0 56px',
      maxWidth: 780,
      textWrap: 'pretty'
    }
  }, "How TheReceptionist held a 98.9% customer satisfaction score and protected its Radical Support reputation with a fully managed xFusion team.")), /*#__PURE__*/React.createElement("div", {
    className: "hero-portrait",
    style: {
      maxWidth: 360,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(PhotoFrame, {
    name: "Tom Foster",
    role: "Director of Sales, TheReceptionist",
    tone: "forest",
    ratio: "4/5",
    label: "images/tom-foster-thereceptionist.webp"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: '#6B5F56',
      marginTop: 12,
      letterSpacing: '0.04em'
    }
  }, "Tom Foster, Director of Sales, TheReceptionist"))));
}
function OverviewBox() {
  // Editorial table treatment — rows with hairlines, butter-soft tinted card
  const rows = [{
    label: 'Industry',
    value: 'Visitor management software'
  }, {
    label: 'Country',
    value: 'United States'
  }, {
    label: 'Challenge',
    value: 'Maintain TheReceptionist\u2019s "radical support" reputation and "employee supremacy" culture while moving to an outsourced support and sales model.'
  }, {
    label: 'Solution',
    value: 'A dedicated xFusion team trained into the Radical Support and Employee Supremacy operating models, integrated through Slack and a phased rollout.'
  }, {
    label: 'Results',
    value: '98.9% customer satisfaction against an 85% target, 100% in most months since the partnership began, 1 minute and 22 second average first reply time, and a partnership that has grown several times.'
  }];
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
      padding: '18px 32px',
      borderBottom: '1px solid #E6C683',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#7a5a10',
      background: 'rgba(255,255,255,0.25)'
    }
  }, "At a glance"), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    className: "overview-row",
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: 32,
      padding: '20px 32px',
      borderBottom: i === rows.length - 1 ? 'none' : '1px solid #E6C683',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
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
          .overview-row {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
            padding: 18px 22px !important;
          }
        }
      `));
}
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
    id: id
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 16
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 40px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    className: "longform-body"
  }, paragraphs.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.7,
      color: i === 0 ? '#1F1A17' : '#3A322D',
      margin: '0 0 24px',
      textWrap: 'pretty',
      fontWeight: i === 0 && p.length < 80 ? 500 : 400
    }
  }, p)))));
}
function TestimonialFeature() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "butter",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    className: "tf-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: 64,
      alignItems: 'flex-start',
      maxWidth: 1080,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PhotoFrame, {
    name: "Tom Foster",
    role: "Director of Sales, TheReceptionist",
    tone: "forest",
    ratio: "4/5",
    label: "images/tom-foster-thereceptionist.webp"
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
      fontSize: 'clamp(28px, 3.4vw, 44px)',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
      color: '#1F1A17',
      margin: '0 0 32px',
      textWrap: 'balance'
    }
  }, "Attentive. Hire the best people. We see no reason to stop."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.65,
      color: '#3A322D',
      margin: '0 0 28px',
      textWrap: 'pretty'
    }
  }, "When we first met with Jim and David, we were immediately struck by their values and commitment to their employees, which meshed with ours completely. Over years of working together they\\u2019ve helped us hit a 98.9% CSAT rating, and we\\u2019ve expanded the partnership several times. If you\\u2019re looking for an outsourced solution, I highly recommend the team at xFusion."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#6B5F56',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1F1A17',
      fontWeight: 600
    }
  }, "Tom Foster"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#B7A993'
    }
  }, "·"), /*#__PURE__*/React.createElement("span", null, "Director of Sales"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#B7A993'
    }
  }, "·"), /*#__PURE__*/React.createElement("span", null, "TheReceptionist"))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 760px) {
          .tf-grid { grid-template-columns: 1fr !important; gap: 36px !important; max-width: 480px; }
        }
      `));
}
function MetricCallout() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "xl"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
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
      marginBottom: 32,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 1,
      background: '#F0D9A8',
      display: 'inline-block',
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("span", null, "The number that mattered")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(72px, 14vw, 200px)',
      fontWeight: 400,
      lineHeight: 0.95,
      letterSpacing: '-0.04em',
      color: '#F7F2EB',
      margin: '0 0 32px',
      textWrap: 'balance'
    }
  }, "98.9% ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#F0D9A8'
    }
  }, "satisfaction")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(22px, 2.4vw, 30px)',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#F0D9A8',
      margin: 0,
      maxWidth: 760,
      textWrap: 'pretty',
      opacity: 0.95
    }
  }, "against an 85% internal target, with 100% satisfaction in most months since the partnership began."))));
}
Object.assign(window, {
  PageHeader,
  OverviewBox,
  LongForm,
  TestimonialFeature,
  MetricCallout
});
// --- components/Shoutouts.jsx
// Shoutout grids + final CTA

function ShoutoutGrid({
  heading,
  intro,
  cards,
  footnote,
  bg = 'paper',
  placeholder = false
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: bg,
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, heading), intro ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0,
      textWrap: 'pretty'
    }
  }, intro) : null), /*#__PURE__*/React.createElement("div", {
    className: "shoutout-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cards.length}, 1fr)`,
      gap: 24
    }
  }, cards.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: bg === 'butter' ? '#F7F2EB' : '#FBF7F0',
      border: placeholder ? '1px dashed #B7A993' : '1px solid #E6DCCB',
      borderRadius: 12,
      padding: '36px 32px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 220
    }
  }, !placeholder ? /*#__PURE__*/React.createElement(Icon, {
    name: "quote",
    size: 26,
    color: "#B8512C",
    fill: "#B8512C",
    stroke: 0,
    style: {
      marginBottom: 16
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontStyle: placeholder ? 'normal' : 'italic',
      fontSize: placeholder ? 18 : 'clamp(22px, 2.2vw, 26px)',
      fontWeight: 400,
      lineHeight: 1.3,
      color: placeholder ? '#9E9388' : '#1F1A17',
      margin: '0 0 24px',
      flex: 1,
      textWrap: 'pretty'
    }
  }, c.quote), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: '#6B5F56',
      paddingTop: 16,
      borderTop: '1px solid #E6DCCB'
    }
  }, c.attribution)))), footnote ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.55,
      color: '#6B5F56',
      margin: '32px 0 0',
      maxWidth: 720
    }
  }, footnote) : null), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .shoutout-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .shoutout-grid { grid-template-columns: 1fr !important; }
        }
      `));
}
function FinalCTA() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "xl"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    className: "finalcta-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 64,
      alignItems: 'center',
      maxWidth: 1080,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#F0D9A8',
      marginBottom: 24
    }
  }, "Ready when you are"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(36px, 4.6vw, 60px)',
      fontWeight: 400,
      lineHeight: 1.1,
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
      opacity: 0.95,
      margin: 0,
      textWrap: 'pretty'
    }
  }, "If you have built a customer experience that customers actually talk about, and you are nervous about handing any of it to an outside team, that is the exact problem we solve. We will recruit, vet, place, train, and manage a senior, AI-trained support agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free.")), /*#__PURE__*/React.createElement("div", {
    className: "finalcta-actions",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "on-dark",
    size: "lg",
    style: {
      background: '#B8512C',
      color: '#F7F2EB',
      padding: '18px 32px',
      fontSize: 17
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
      maxWidth: 320
    }
  }, "30 minutes. No commitment. No credit card. You\\u2019ll talk directly with our founding team.")))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .finalcta-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `));
}

// Section divider — thin rule between major sections, optional ornament
function SectionRule() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#D9CFBF',
      margin: '0'
    }
  }));
}

// Image-based shoutout grid (sourced from xfusion.io originals)
function ShoutoutImageGrid({
  heading,
  intro,
  images,
  footnote,
  bg = 'paper'
}) {
  return /*#__PURE__*/React.createElement(Section, {
    bg: bg,
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, heading), intro ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0,
      textWrap: 'pretty'
    }
  }, intro) : null), /*#__PURE__*/React.createElement("div", {
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
  })))), footnote ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.55,
      color: '#6B5F56',
      margin: '32px 0 0',
      maxWidth: 720
    }
  }, footnote) : null), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 720px) { .sig-grid { grid-template-columns: 1fr !important; } }
      `));
}
Object.assign(window, {
  ShoutoutGrid,
  ShoutoutImageGrid,
  FinalCTA,
  SectionRule
});
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
function App() {
  const aboutCopy = ["TheReceptionist for iPad has been one of the most widely used visitor management systems in the world since 2013. The product runs in over 5,500 offices across more than 35 countries. It handles visitor logging, two-way communication over SMS and email, badge printing, and custom check-in workflows for everyone from a single-location office to a multinational with thousands of employees.", "In 2020 and 2021, TheReceptionist shipped contactless check-in so its customers could keep welcoming guests without putting anyone at risk. That instinct, ship the thing the customer needs the moment they need it, is the same instinct that built the rest of the company.", "Two ideas hold the place together. The first is Radical Support, the company\u2019s name for the kind of customer service that goes a step further than anyone expects. The second is Employee Supremacy, an internal operating model built on the belief that taking great care of employees is what produces great care for customers. Those are not slogans. They are how the company hires, how it trains, and how it talks about itself."];
  const challengeCopy = ["TheReceptionist had built a reputation that most software companies envy. Customers loved the product, but they loved the support even more. Radical Support was not a marketing line. It was the lived experience customers got when they reached out, and it was a real piece of why the company kept growing.", "That reputation also meant the company had something to lose.", "When TheReceptionist decided to outsource part of its customer support and sales work, the leadership team was clear-eyed about the risk. Outsourcing carries baggage. It carries stories about scripted replies, about reps who do not understand the product, about agents treating customers like tickets to close instead of people to help. The wrong partner would not just miss the bar. The wrong partner would erode something the company had spent years building.", "There was a second piece, harder to write into a contract. TheReceptionist runs on Employee Supremacy. The premise is that you cannot fake great customer care. It comes out of how the company treats the people doing the work. Most outsourced shops run the opposite model. They treat their agents as interchangeable, pay them poorly, churn through them, and pass the consequences back to the client.", "So the search was not really for a vendor. It was for a partner whose internal operating model resembled TheReceptionist\u2019s own. A partner that took care of its people the way TheReceptionist takes care of its people, because the math only works if both sides do. If that partner did not exist, the company was prepared to keep the work in-house indefinitely."];
  const solutionCopy = ["The first conversation was the test, and Tom remembers it. Jim and David showed up talking about how they treat their team and why. The values matched on the first call.", "From there xFusion did the work that earned the partnership.", "The team studied TheReceptionist before placing anyone. xFusion went deep on the company\u2019s culture, on how Radical Support actually showed up in real customer conversations, on what Employee Supremacy looked like from the inside, and on what TheReceptionist\u2019s customers had come to expect. The training was not generic onboarding. It was built around teaching xFusion\u2019s team members how to be part of TheReceptionist.", "To keep the partnership tight day to day, xFusion opened a two-way Slack channel. That channel was not a status board. It was a working space, where TheReceptionist could give feedback in the moment and xFusion could surface what it was seeing in the queue. Adjustments happened in hours, not weeks.", "The rollout itself was phased. TheReceptionist was not asked to hand over the keys on day one. The integration moved a step at a time so the team could watch the quality of every customer interaction and confirm the standard was being held before scope expanded.", "The KPIs reflected the same thinking. Customer satisfaction and reply time were tracked. So were employee satisfaction and cultural fit on the xFusion side, because both companies believed the second set of numbers was upstream of the first. The whole approach was built to disprove a stigma. Outsourced did not have to mean diluted. With the right partner, it could mean better."];
  const resultsCopy = ["The numbers landed where the values pointed.", "xFusion cleared TheReceptionist\u2019s stated 85% customer satisfaction bar by nearly 14 points, holding at 98.9%, and posted a perfect 100% customer satisfaction score in the majority of months since the partnership began. Average first reply time settled at 1 minute and 22 seconds, consistent with the benchmark TheReceptionist had set internally before xFusion came in, and held across higher volume. Initial ticket volume sat around 63 conversations. By March and April of 2023 the team was handling a peak of 375 tickets a month without the quality numbers moving. Reopened tickets stayed minimal, because customers got a clear answer the first time, with relevant articles attached and the right context, so the queue did not double back on itself.", "The clearest qualitative signal was that customers kept thanking individual xFusion team members by name. When a customer writes in to compliment a specific person, they are not thinking about an outsourced vendor. They are thinking about the company they trust. That was the bar TheReceptionist had set for itself, and the xFusion team kept clearing it.", "The partnership has run for years and continues today. TheReceptionist has expanded the relationship several times, bringing on additional contract positions across support and sales as the work has grown. With the front line in trusted hands, TheReceptionist\u2019s internal team has been able to shift attention back to the product work and internal projects that needed it."];
  const leaderImages = ['../../images/shoutouts/the-receptionist/leadership/image27.png', '../../images/shoutouts/the-receptionist/leadership/image7.png', '../../images/shoutouts/the-receptionist/leadership/image10.png', '../../images/shoutouts/the-receptionist/leadership/image18.png', '../../images/shoutouts/the-receptionist/leadership/image21.png', '../../images/shoutouts/the-receptionist/leadership/image4.png', '../../images/shoutouts/the-receptionist/leadership/image32.png', '../../images/shoutouts/the-receptionist/leadership/image8.png'];
  const customerImages = ['../../images/shoutouts/the-receptionist/customers/image5.png', '../../images/shoutouts/the-receptionist/customers/image35.png', '../../images/shoutouts/the-receptionist/customers/image17.png', '../../images/shoutouts/the-receptionist/customers/image37.png', '../../images/shoutouts/the-receptionist/customers/image30.png', '../../images/shoutouts/the-receptionist/customers/image1.png', '../../images/shoutouts/the-receptionist/customers/image29.png', '../../images/shoutouts/the-receptionist/customers/image16.png', '../../images/shoutouts/the-receptionist/customers/image20.png', '../../images/shoutouts/the-receptionist/customers/image36.png', '../../images/shoutouts/the-receptionist/customers/image23.png', '../../images/shoutouts/the-receptionist/customers/image31.png', '../../images/shoutouts/the-receptionist/customers/image33.png', '../../images/shoutouts/the-receptionist/customers/image34.png'];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, {
    current: "Case studies"
  }), /*#__PURE__*/React.createElement(PageHeader, null), /*#__PURE__*/React.createElement(OverviewBox, null), /*#__PURE__*/React.createElement(SectionRule, null), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "The company",
    heading: "About TheReceptionist",
    paragraphs: aboutCopy,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(TestimonialFeature, null), /*#__PURE__*/React.createElement(MetricCallout, null), /*#__PURE__*/React.createElement(SectionRule, null), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "Section 06",
    heading: "The challenge",
    paragraphs: challengeCopy,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(SectionRule, null), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "Section 07",
    heading: "The solution",
    paragraphs: solutionCopy,
    bg: "paper-2"
  }), /*#__PURE__*/React.createElement(ShoutoutImageGrid, {
    heading: "Shoutouts to xFusion's team members from TheReceptionist leadership",
    images: leaderImages,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(ShoutoutImageGrid, {
    heading: "Shoutouts from TheReceptionist customers about xFusion's team members",
    intro: "TheReceptionist\u2019s customers do not know they are writing to xFusion. They think they are writing to TheReceptionist. That is the point. And the names of xFusion team members keep showing up in customer feedback by name.",
    images: customerImages,
    bg: "butter"
  }), /*#__PURE__*/React.createElement(SectionRule, null), /*#__PURE__*/React.createElement(LongForm, {
    eyebrow: "Section 10",
    heading: "The results",
    paragraphs: resultsCopy,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(FinalCTA, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));