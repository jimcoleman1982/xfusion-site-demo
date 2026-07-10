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
// xFusion shared primitives — Container, Section, Eyebrow, Button, Icon, PhotoPlaceholder
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
  style = {}
}) {
  const bgs = {
    paper: '#F7F2EB',
    'paper-2': '#EFE8DD',
    butter: '#F8EBC9',
    forest: '#2C4A3E',
    ink: '#1F1A17'
  };
  const pads = {
    sm: '40px 0',
    md: '64px 0',
    lg: '96px 0',
    xl: '120px 0'
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
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
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
    bg = hover ? '#EFE8DD' : 'transparent';
    color = '#1F1A17';
    border = '1px solid transparent';
  } else if (variant === 'on-dark') {
    bg = pressed ? '#A0451F' : hover ? '#A0451F' : '#B8512C';
    color = '#F7F2EB';
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
  const tagProps = href ? {
    href
  } : {};
  return /*#__PURE__*/React.createElement(Tag, {
    ...linkAttrs,
    ...tagProps,
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
      transform: pressed ? 'translateY(1px)' : 'translateY(0)',
      transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)',
      ...sizes[size],
      ...style
    }
  }, children);
}
const LucideIcons = {
  'arrow-right': /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5l7 7-7 7"
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
  twitter: /*#__PURE__*/React.createElement("path", {
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
  }),
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
  youtube: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02",
    fill: "currentColor",
    stroke: "none"
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
      verticalAlign: '-0.15em',
      ...style
    }
  }, LucideIcons[name] || null);
}

// Warm-tone photo placeholder. Renders a real <img> when filePath resolves;
// otherwise falls back to a flat warm swatch with subject name and file path.
function PhotoPlaceholder({
  name,
  filePath,
  tone = 'clay',
  ratio = '1/1',
  alt
}) {
  const [errored, setErrored] = useState(false);
  if (filePath && !errored) {
    return /*#__PURE__*/React.createElement("img", {
      src: filePath,
      alt: alt || name,
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
      bg: '#B8512C',
      accent: '#F0D9A8',
      soft: 'rgba(247,242,235,0.18)'
    },
    forest: {
      bg: '#2C4A3E',
      accent: '#F0D9A8',
      soft: 'rgba(247,242,235,0.18)'
    },
    butter: {
      bg: '#E6C683',
      accent: '#1F1A17',
      soft: 'rgba(31,26,23,0.10)'
    },
    rose: {
      bg: '#C77A5A',
      accent: '#F8EBC9',
      soft: 'rgba(247,242,235,0.16)'
    },
    sand: {
      bg: '#B7A993',
      accent: '#1F1A17',
      soft: 'rgba(31,26,23,0.08)'
    },
    olive: {
      bg: '#5C6B4A',
      accent: '#F0D9A8',
      soft: 'rgba(247,242,235,0.16)'
    },
    rust: {
      bg: '#923D1F',
      accent: '#F0D9A8',
      soft: 'rgba(247,242,235,0.16)'
    }
  };
  const t = tones[tone] || tones.clay;
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  const dark = ['butter', 'sand'].includes(tone);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      borderRadius: 12,
      background: t.bg,
      position: 'relative',
      overflow: 'hidden',
      color: t.accent,
      border: '1px solid rgba(31,26,23,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: dark ? 'radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.18), transparent 60%)' : 'radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.10), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -55%)',
      fontFamily: "'Source Serif 4', serif",
      fontWeight: 400,
      fontSize: 'clamp(72px, 14vw, 132px)',
      lineHeight: 1,
      letterSpacing: '-0.04em',
      opacity: 0.32,
      color: t.accent
    }
  }, initials), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      left: 14,
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: t.accent,
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '14px 16px',
      background: t.soft,
      backdropFilter: 'blur(2px)',
      borderTop: `1px solid ${dark ? 'rgba(31,26,23,0.10)' : 'rgba(247,242,235,0.18)'}`,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      letterSpacing: '0.04em',
      color: t.accent,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500,
      marginBottom: 2
    }
  }, "PHOTO: ", name.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: 0.75,
      fontSize: 10,
      wordBreak: 'break-all'
    }
  }, filePath)));
}
Object.assign(window, {
  Container,
  Section,
  Eyebrow,
  Button,
  Icon,
  PhotoPlaceholder
});
// --- components/Nav.jsx
// Site nav -- shared structure across all pages.
// Case studies index: prefix = '../', active = 'case-studies'.
function Nav({
  active = 'case-studies',
  prefix = '../'
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
// --- components/PageHero.jsx
function PageHero() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 56,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Case studies"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(36px, 5.2vw, 60px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "Real teams. Real founders. Real results."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(17px, 1.8vw, 21px)',
      lineHeight: 1.55,
      color: '#3A322D',
      margin: '0 0 32px',
      maxWidth: 660,
      textWrap: 'pretty'
    }
  }, "Below are a few clients from over 100 placements since 2020. Different founders, different businesses, one common thread: they stopped drowning in customer support and got their time back. The numbers (and the words from the people who lived it) are below."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: '#6B5F56',
      lineHeight: 1.5
    }
  }, "30 minutes. No commitment. No credit card.")))));
}
window.PageHero = PageHero;
// --- components/IntroParagraph.jsx
function IntroParagraph() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "md",
    style: {
      paddingTop: 24,
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #D9CFBF',
      paddingTop: 40
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(20px, 2.1vw, 24px)',
      lineHeight: 1.5,
      color: '#1F1A17',
      margin: 0,
      fontWeight: 400,
      textWrap: 'pretty'
    }
  }, "These are stories from founders we work with. Different products, different customers, same result: a senior support team member becomes part of the team, reply times drop, customer satisfaction goes up, and the founder stops being the back-up support rep."))));
}
window.IntroParagraph = IntroParagraph;
// --- components/CaseStudyTile.jsx
function CaseStudyTile({
  index,
  total,
  flip = false,
  industry,
  country,
  headline,
  elaboration,
  quote,
  attribution,
  attributionRole,
  href,
  photoName,
  photoPath,
  photoTone,
  linkLabel
}) {
  const [linkHover, setLinkHover] = React.useState(false);
  const meta = /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      letterSpacing: '0.06em',
      color: '#6B5F56',
      textTransform: 'uppercase',
      marginBottom: 20,
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      borderRadius: '50%',
      border: '1px solid #B7A993',
      marginRight: 12,
      fontSize: 10,
      color: '#1F1A17',
      verticalAlign: '-0.25em',
      fontWeight: 500
    }
  }, String(index).padStart(2, '0')), industry, " · ", country);
  const headlineEl = /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.2vw, 38px)',
      fontWeight: 600,
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
      margin: '0 0 20px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, headline);
  const elabEl = /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.65,
      color: '#3A322D',
      margin: '0 0 28px',
      textWrap: 'pretty'
    }
  }, elaboration);
  const quoteBlock = /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: '0 0 24px',
      padding: '4px 0 4px 20px',
      borderLeft: '2px solid #B8512C'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 'clamp(17px, 1.7vw, 19px)',
      lineHeight: 1.5,
      color: '#1F1A17',
      margin: '0 0 12px',
      textWrap: 'pretty'
    }
  }, "“", quote, "”"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      letterSpacing: '0.06em',
      color: '#6B5F56',
      textTransform: 'uppercase'
    }
  }, attribution));
  const linkEl = /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setLinkHover(true),
    onMouseLeave: () => setLinkHover(false),
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      fontWeight: 500,
      color: linkHover ? '#A0451F' : '#B8512C',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      borderBottom: linkHover ? '1px solid #A0451F' : '1px solid #B8512C',
      paddingBottom: 2,
      transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)'
    }
  }, linkLabel, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 16,
    style: {
      transform: linkHover ? 'translateX(3px)' : 'translateX(0)',
      transition: 'transform 160ms'
    }
  }));
  const photo = /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    name: photoName,
    filePath: photoPath,
    tone: photoTone,
    ratio: "1/1",
    alt: `${photoName}, ${attribution.split(',').slice(1).join(',').trim()}`
  });
  return /*#__PURE__*/React.createElement("article", {
    "data-screen-label": `Tile ${String(index).padStart(2, '0')} ${attribution.split(',')[1]?.trim() || ''}`,
    style: {
      padding: '64px 0',
      borderBottom: index < total ? '1px solid #D9CFBF' : 'none'
    },
    className: "case-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: `case-tile-grid ${flip ? 'flip' : ''}`,
    style: {
      display: 'grid',
      gridTemplateColumns: '0.85fr 1.15fr',
      gap: 56,
      alignItems: 'center',
      direction: flip ? 'rtl' : 'ltr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      direction: 'ltr'
    }
  }, photo), /*#__PURE__*/React.createElement("div", {
    style: {
      direction: 'ltr'
    }
  }, meta, headlineEl, elabEl, quoteBlock, linkEl)), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 860px) {
          .case-tile-grid {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
            gap: 28px !important;
          }
          .case-tile-grid > div:first-child > div {
            max-width: 360px;
          }
        }
      `));
}
window.CaseStudyTile = CaseStudyTile;
// --- components/CTASection.jsx
function CTASection() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr 0.85fr',
      gap: 56,
      alignItems: 'center'
    },
    className: "cta-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(30px, 4vw, 48px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#F7F2EB',
      textWrap: 'balance'
    }
  }, "Want to see if we can help you the same way?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      lineHeight: 1.6,
      color: '#F0D9A8',
      margin: 0,
      maxWidth: 580,
      textWrap: 'pretty'
    }
  }, "If any of these stories sound like where you are right now (drowning in tickets, watching customer satisfaction slip, tired of hiring in-house or rolling the dice on freelancers), there's a simple next step. Talk to our founding team for 30 minutes. We'll figure out what you actually need, tell you honestly whether we're the right fit, and walk you through what working with xFusion looks like.")), /*#__PURE__*/React.createElement("div", {
    className: "cta-actions",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: '#F0D9A8',
      opacity: 0.85,
      maxWidth: 280,
      textAlign: 'right',
      lineHeight: 1.5
    }
  }, "30 minutes. No commitment. No credit card. You'll talk directly with our founding team.")))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 860px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cta-actions { align-items: flex-start !important; }
          .cta-actions > div { text-align: left !important; }
        }
      `));
}
window.CTASection = CTASection;
// --- components/Footer.jsx
// Unified site footer for Case Studies index (site/case-studies/index.html)
// Forest-green background (--color-forest #2C4A3E), Paper text (#F7F2EB)
function Footer() {
  const cols = [{
    title: 'Product',
    links: [['Pricing', '/pricing/'], ['Case studies', './'], ['Shopify app support', '/shopify-app-support/'], ['SaaS support', '/saas-support/'], ['Hire support agents', '/hire-support-agents/'], ['Support outsourcing', '/customer-support-outsourcing/'], ['E-commerce support', '/ecommerce-support/']]
  }, {
    title: 'Company',
    links: [['About', '../about/'], ['Careers', '../careers/'], ['Contact', "../contact/"]]
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
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-legal { flex-direction: column; align-items: flex-start !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `));
}
window.Footer = Footer;
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
// --- app.jsx
const TILES = [{
  industry: 'Video commerce SaaS',
  country: 'Israel',
  headline: 'Shopify app ranking jumped about 90 spots after a wave of 5-star reviews thanks to better customer support.',
  elaboration: "Tolstoy was growing fast and needed support that could keep up. They didn't want to keep rebuilding their support team from scratch. xFusion placed a senior team member who became part of the company. They handled customer questions so well that customers left 5-star reviews, and Tolstoy climbed the Shopify rankings as a result.",
  quote: 'xFusion has been an absolute game-changer for Tolstoy. Working with them has enabled us to grow faster and more professionally than we ever could have alone.',
  attribution: 'Dov Kaufmann, Tolstoy',
  href: 'tolstoy/',
  photoName: 'Dov Kaufmann',
  photoPath: '../images/dov-kaufmann-tolstoy.webp',
  photoTone: 'clay',
  linkLabel: 'Read the Tolstoy case study'
}, {
  industry: 'Scheduling SaaS',
  country: 'USA',
  headline: 'Cut average reply time by 84.79% and turned an outsourcing doubter into a believer.',
  elaboration: "Derrick didn't believe in outsourced support before working with xFusion. Once a senior xFusion team member was placed and trained on SavvyCal, Derrick saw replies and customer chats that matched how he would have answered them himself. That's what changed his mind on the whole idea.",
  quote: 'I was admittedly skeptical of the outsourcing model at first, but xFusion has proven that skepticism unwarranted. This is not your stereotypical outsourced support agency.',
  attribution: 'Derrick Reimer, SavvyCal',
  href: 'savvycal/',
  photoName: 'Derrick Reimer',
  photoPath: '../images/derrick-reimer-savvycal.webp',
  photoTone: 'forest',
  linkLabel: 'Read the SavvyCal case study'
}, {
  industry: 'Credit and personal finance',
  country: 'USA',
  headline: 'Held a 4.9 Shopify customer rating for nearly four years while xFusion handled almost every ticket.',
  elaboration: "Bonify's leaders were buried in tickets, working in the business when they needed to be working on it. xFusion placed a senior support team member who took over the daily ticket load and handled the tougher cases. They quickly earned enough trust that the team relied on xFusion to \u201cmake it right fast\u201d when problems came up.",
  quote: 'We were sort of in support hell, just kind of working in the business instead of on the business.',
  attribution: 'John Carbone, Bonify',
  href: 'bonify/',
  photoName: 'John Carbone',
  photoPath: '../images/john-carbone-bonify.webp',
  photoTone: 'butter',
  linkLabel: 'Read the Bonify case study'
}, {
  industry: 'Shopify apps and e-commerce operations',
  country: 'France / USA',
  headline: 'Grew support coverage from one agent to two full-timers plus a part-time weekend agent, with hundreds of new 5-star app reviews and a higher search ranking.',
  elaboration: "Toby didn't want a generic outsourced support shop. He wanted a team built around how Ordered Magic actually works. xFusion placed senior team members, trained them on Ordered Magic's process, and ran the culture and management side so it felt like an in-house team.",
  quote: "I didn't really see it as outsourced support. I really saw it as building a remote team around our working practices and our values.",
  attribution: 'Toby Marsden, Ordered Magic',
  href: 'ordered-magic/',
  photoName: 'Toby Marsden',
  photoPath: '../images/toby-marsden-ordered-magic.webp',
  photoTone: 'rust',
  linkLabel: 'Read the Ordered Magic case study'
}, {
  industry: 'B2B SaaS (visitor management)',
  country: 'USA',
  headline: 'Hit a 98.9% customer satisfaction rating with xFusion, then grew the partnership several times.',
  elaboration: "TheReceptionist chose xFusion because the values matched, not just because the cost did. Over many years of working together, xFusion has kept placing strong support team members, managed them closely, and given Tom's team a partner they trust enough to keep growing with year after year.",
  quote: 'xFusion is attentive, hire the best people, and work very hard to consider our needs. We all look forward to many more years of growth with the xFusion team.',
  attribution: 'Tom Foster, TheReceptionist',
  href: 'the-receptionist/',
  photoName: 'Tom Foster',
  photoPath: '../images/tom-foster-thereceptionist.webp',
  photoTone: 'olive',
  linkLabel: 'Read the TheReceptionist case study'
}, {
  industry: 'Video and creator SaaS',
  country: 'Brazil',
  headline: 'The founder stopped worrying about customer support. Period.',
  elaboration: "Marcelo was handling customer support himself and called it a constant weight on his mind. After the xFusion team came in, customer support stopped being something he had to think about. That gave him back the mental space to run the rest of the business.",
  quote: "Since I hired the xFusion team, I've been very pleased because I don't have to worry anymore about customer support.",
  attribution: 'Marcelo Olivera, Revy',
  href: 'revy/',
  photoName: 'Marcelo Olivera',
  photoPath: '../images/marcelo-olivera-revy.png',
  photoTone: 'rose',
  linkLabel: 'Read the Revy case study'
}, {
  industry: 'Satellite imagery and geospatial data',
  country: 'USA',
  headline: 'Held a 91.9% customer satisfaction rating with a 36-minute average reply time across customers around the world, 24/7.',
  elaboration: "SkyFi's customers reach out around the clock, and the team needed support that could handle a global, technical group of users without dropping the ball. xFusion's senior team members took full ownership of customer chats from start to finish. That is the part Claire highlights most.",
  quote: "xFusion's emphasis on customer satisfaction has been such an asset to SkyFi. They never leave a customer interaction unresolved.",
  attribution: 'Claire Fundingsland, SkyFi',
  href: 'skyfi/',
  photoName: 'Claire Fundingsland',
  photoPath: '../images/claire-fundingsland-skyfi.webp',
  photoTone: 'sand',
  linkLabel: 'Read the SkyFi case study'
}];
function CaseStudiesIndex() {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Case Studies Index",
    style: {
      background: '#F7F2EB',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    active: "case-studies"
  }), /*#__PURE__*/React.createElement(PageHero, null), /*#__PURE__*/React.createElement(IntroParagraph, null), /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "md",
    style: {
      paddingTop: 0,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #D9CFBF'
    }
  }, TILES.map((t, i) => /*#__PURE__*/React.createElement(CaseStudyTile, {
    key: i,
    index: i + 1,
    total: TILES.length,
    flip: i % 2 === 1,
    industry: t.industry,
    country: t.country,
    headline: t.headline,
    elaboration: t.elaboration,
    quote: t.quote,
    attribution: t.attribution,
    href: t.href,
    photoName: t.photoName,
    photoPath: t.photoPath,
    photoTone: t.photoTone,
    linkLabel: t.linkLabel
  }))))), /*#__PURE__*/React.createElement(CTASection, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(CaseStudiesIndex, null));