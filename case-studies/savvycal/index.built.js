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
// --- components/Components.jsx
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
// --- components/DerrickPhoto.jsx
// Derrick Reimer photo placeholder.
// Treatment: warm-toned flat swatch with name + label, 12px radius, no shadow.
// Ready to swap with /images/derrick-reimer-savvycal.webp when photography ships.
function DerrickPhoto({
  size = 'medium',
  circle = false,
  style = {},
  src = '../../images/derrick-reimer-savvycal.webp'
}) {
  const sizes = {
    small: {
      width: 88,
      height: 88,
      ratio: '1/1',
      initialsSize: 36,
      nameSize: 0,
      showLabel: false
    },
    medium: {
      width: 280,
      height: 360,
      ratio: '4/5',
      initialsSize: 140,
      nameSize: 18,
      showLabel: true
    },
    large: {
      width: 360,
      height: 440,
      ratio: '4/5',
      initialsSize: 180,
      nameSize: 20,
      showLabel: true
    }
  };
  const s = sizes[size];
  const [errored, setErrored] = React.useState(false);
  if (src && !errored) {
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: "Derrick Reimer, founder of SavvyCal",
      loading: size === 'medium' ? undefined : 'lazy',
      onError: () => setErrored(true),
      style: {
        width: '100%',
        maxWidth: s.width,
        aspectRatio: s.ratio,
        objectFit: 'cover',
        borderRadius: circle ? 999 : 12,
        border: '1px solid rgba(31,26,23,0.06)',
        display: 'block',
        ...style
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: s.width,
      aspectRatio: s.ratio,
      borderRadius: circle ? 999 : 12,
      background: 'linear-gradient(140deg, #C56B3F 0%, #A0451F 60%, #863818 100%)',
      position: 'relative',
      overflow: 'hidden',
      color: '#F0D9A8',
      display: 'flex',
      alignItems: 'flex-end',
      padding: circle ? 0 : 20,
      border: '1px solid rgba(31, 26, 23, 0.06)',
      ...style
    },
    role: "img",
    "aria-label": "Derrick Reimer, founder of SavvyCal"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 30% 25%, rgba(240, 217, 168, 0.25) 0%, transparent 55%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: circle ? '50%' : '8%',
      right: circle ? '50%' : '6%',
      transform: circle ? 'translate(50%, -50%)' : 'none',
      fontFamily: "'Source Serif 4', serif",
      fontWeight: 400,
      fontSize: s.initialsSize,
      opacity: circle ? 0.95 : 0.42,
      lineHeight: 1,
      letterSpacing: '-0.04em',
      color: circle ? '#F0D9A8' : '#F7F2EB'
    }
  }, "DR"), !circle && s.showLabel && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      opacity: 0.7,
      marginBottom: 6,
      fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    }
  }, "Photo placeholder"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: s.nameSize,
      lineHeight: 1.2,
      fontWeight: 500
    }
  }, "Derrick Reimer"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      opacity: 0.75,
      marginTop: 2,
      fontFamily: "'IBM Plex Sans', sans-serif"
    }
  }, "images/derrick-reimer-savvycal.webp")));
}
window.DerrickPhoto = DerrickPhoto;
// --- components/PageHeader.jsx
// Hero / page header for the SavvyCal case study.
function PageHeader() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 56
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 12,
      color: '#6B5F56',
      marginBottom: 32,
      letterSpacing: '0.04em'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#case-studies",
    style: {
      color: '#6B5F56',
      textDecoration: 'none',
      borderBottom: '1px solid #D9CFBF'
    }
  }, "Case studies"), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 10px',
      opacity: 0.6
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1F1A17'
    }
  }, "SavvyCal")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, "Case Study"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#D9CFBF'
    }
  }, "·"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#6B5F56'
    }
  }, "06")), /*#__PURE__*/React.createElement("h1", {
    className: "cs-title",
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(56px, 9vw, 112px)',
      fontWeight: 400,
      lineHeight: 0.95,
      letterSpacing: '-0.035em',
      margin: '0 0 28px',
      color: '#1F1A17'
    }
  }, "SavvyCal"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(20px, 2.2vw, 26px)',
      lineHeight: 1.4,
      color: '#3A322D',
      margin: '0 0 48px',
      maxWidth: 760,
      textWrap: 'balance',
      fontWeight: 400
    }
  }, "How SavvyCal cut average customer support reply time by 84.79% and gave its founder his mornings back."), /*#__PURE__*/React.createElement("div", {
    className: "hero-photo-row",
    style: {
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: 32,
      alignItems: 'end',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement(DerrickPhoto, {
    size: "medium"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '1px solid #D9CFBF',
      paddingLeft: 24,
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#6B5F56',
      marginBottom: 10
    }
  }, "Featured"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 22,
      lineHeight: 1.25,
      color: '#1F1A17',
      marginBottom: 6,
      fontWeight: 500
    }
  }, "Derrick Reimer"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      color: '#6B5F56'
    }
  }, "Founder, SavvyCal"))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 720px) {
          .hero-photo-row { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `));
}
window.PageHeader = PageHeader;
// --- components/OverviewBox.jsx
// Section 2: Overview Box. Editorial 5-row table with hairline rules.
function OverviewBox() {
  const rows = [{
    label: 'Industry',
    detail: 'SaaS, Scheduling software'
  }, {
    label: 'Country',
    detail: 'United States'
  }, {
    label: 'Challenge',
    detail: "Founder's deep work was being eaten by the support inbox, with volume set to climb as new features shipped."
  }, {
    label: 'Solution',
    detail: 'A senior xFusion customer support agent placed full-time as an extension of the SavvyCal team.'
  }, {
    label: 'Results',
    detail: '84.79% reduction in average reply time, higher customer satisfaction, no abandoned tickets, and the founder back to building the product.'
  }];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "md",
    style: {
      paddingTop: 0,
      paddingBottom: 88
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F8EBC9',
      border: '1px solid #E6C683',
      borderRadius: 12,
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#7a5a10',
      padding: '20px 28px 16px',
      borderBottom: '1px solid rgba(184, 81, 44, 0.18)'
    }
  }, "Overview"), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      padding: 0
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    className: "ov-row",
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: 24,
      padding: '20px 28px',
      borderBottom: i < rows.length - 1 ? '1px solid rgba(184, 81, 44, 0.18)' : 'none',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
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
  }, r.detail))))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 640px) {
          .ov-row { grid-template-columns: 1fr !important; gap: 6px !important; padding: 18px 20px !important; }
        }
      `));
}
window.OverviewBox = OverviewBox;
// --- components/LongForm.jsx
// Long-form prose section. Used for About, The Challenge, The Solution, The Results.
// Pattern: section heading, narrow column body. Optional eyebrow chapter mark.
function LongForm({
  id,
  eyebrow,
  heading,
  children,
  bg = 'paper',
  narrow = true
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
      maxWidth: narrow ? 720 : 880,
      margin: '0 auto'
    },
    id: id
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 24,
      height: 1,
      background: '#B8512C'
    }
  }), eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(34px, 4.4vw, 52px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 36px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    className: "lf-body",
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.65,
      color: '#1F1A17'
    }
  }, children))), /*#__PURE__*/React.createElement("style", null, `
        .lf-body p { margin: 0 0 20px; text-wrap: pretty; }
        .lf-body p:last-child { margin-bottom: 0; }
        .lf-body p.lf-pull {
          font-family: 'Source Serif 4', serif;
          font-size: clamp(22px, 2.4vw, 28px);
          line-height: 1.35;
          color: #1F1A17;
          margin: 28px 0;
          padding-left: 20px;
          border-left: 2px solid #B8512C;
          font-style: italic;
          font-weight: 400;
        }
        .lf-body ul.results-list {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
        }
        .lf-body ul.results-list li {
          padding: 18px 0;
          border-top: 1px solid #D9CFBF;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          align-items: baseline;
        }
        .lf-body ul.results-list li:last-child { border-bottom: 1px solid #D9CFBF; }
        .lf-body ul.results-list li .rl-marker {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          color: #B8512C;
          letter-spacing: 0.04em;
          font-weight: 500;
          padding-top: 4px;
        }
        .lf-body ul.results-list li .rl-text strong {
          font-weight: 600;
          color: #1F1A17;
        }
      `));
}
window.LongForm = LongForm;
// --- components/TestimonialFeature.jsx
// Section 4: Featured testimonial card. Larger photo, italic serif pull quote, supporting body, mono attribution.
function TestimonialFeature() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg",
    style: {
      paddingTop: 96,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    className: "tf-card",
    style: {
      maxWidth: 1040,
      margin: '0 auto',
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 16,
      padding: 0,
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: '320px 1fr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(140deg, #C56B3F 0%, #A0451F 100%)',
      position: 'relative',
      minHeight: 380
    }
  }, /*#__PURE__*/React.createElement(DerrickPhoto, {
    size: "large",
    style: {
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      borderRadius: 0,
      border: 'none',
      aspectRatio: 'auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '48px 48px 40px'
    },
    className: "tf-body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 80,
      lineHeight: 0.6,
      color: '#B8512C',
      marginBottom: 8,
      opacity: 0.5
    }
  }, "“"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 2.6vw, 34px)',
      lineHeight: 1.25,
      fontStyle: 'italic',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      color: '#1F1A17',
      margin: '0 0 24px',
      textWrap: 'balance'
    }
  }, "I was admittedly skeptical at first. They proved my skepticism unwarranted."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 32px',
      textWrap: 'pretty'
    }
  }, "As a founder busy building and marketing my product, I wanted a partner I could trust to train and manage dedicated reps as an extension of my team. This is not your stereotypical outsourced support agency. They've cut our average reply time by 84.79% and freed me up to focus on running the business."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 12,
      letterSpacing: '0.08em',
      color: '#6B5F56',
      textTransform: 'uppercase',
      paddingTop: 20,
      borderTop: '1px solid #D9CFBF'
    }
  }, "Derrick Reimer\xA0\xA0·\xA0\xA0Founder\xA0\xA0·\xA0\xA0SavvyCal")))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 820px) {
          .tf-card { grid-template-columns: 1fr !important; }
          .tf-card > div:first-child { min-height: 280px !important; }
          .tf-body { padding: 32px 28px !important; }
        }
      `));
}
window.TestimonialFeature = TestimonialFeature;
// --- components/MetricCallout.jsx
// Section 5: Oversized stat callout. Forest background, Paper text. The proof moment.
function MetricCallout() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "lg",
    style: {
      paddingTop: 112,
      paddingBottom: 112,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      margin: '0 auto',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.22em',
      color: '#F0D9A8',
      marginBottom: 36,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 28,
      height: 1,
      background: '#F0D9A8',
      opacity: 0.6
    }
  }), "The headline number"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(72px, 14vw, 200px)',
      fontWeight: 400,
      lineHeight: 0.92,
      letterSpacing: '-0.045em',
      color: '#F7F2EB',
      margin: '0 0 24px',
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    }
  }, "84.79", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: '0.5em',
      color: '#F0D9A8',
      marginLeft: '0.06em',
      fontWeight: 400,
      verticalAlign: 'top',
      position: 'relative',
      top: '0.12em'
    }
  }, "%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(28px, 3vw, 40px)',
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
      color: '#F0D9A8',
      margin: '0 0 36px',
      maxWidth: 680
    }
  }, "reduction"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '24px 1fr',
      gap: 20,
      maxWidth: 720,
      paddingTop: 28,
      borderTop: '1px solid rgba(240, 217, 168, 0.25)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 12,
      color: '#F0D9A8',
      opacity: 0.8,
      paddingTop: 4,
      letterSpacing: '0.04em'
    }
  }, "↳"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 'clamp(17px, 1.6vw, 19px)',
      lineHeight: 1.55,
      color: '#F7F2EB',
      opacity: 0.9,
      margin: 0,
      textWrap: 'pretty'
    }
  }, "in average customer support reply time after placing a senior xFusion agent as an extension of the SavvyCal team.")))));
}
window.MetricCallout = MetricCallout;
// --- components/ShoutoutGrid.jsx
// Sections 8 & 9: Shoutout grids. 3-column quote cards with mono attribution.
function ShoutoutGrid({
  eyebrow,
  heading,
  intro,
  quotes,
  bg = 'butter',
  cardStyle = 'paper'
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
      maxWidth: 1040,
      margin: '0 auto 56px'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 24,
      height: 1,
      background: '#B8512C'
    }
  }), eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4vw, 48px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#1F1A17',
      textWrap: 'balance',
      maxWidth: 760
    }
  }, heading), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0,
      maxWidth: 760,
      textWrap: 'pretty'
    }
  }, intro)), /*#__PURE__*/React.createElement("div", {
    className: "sg-grid",
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, quotes.map((q, i) => /*#__PURE__*/React.createElement(ShoutoutCard, {
    key: i,
    quote: q.quote,
    attribution: q.attribution,
    index: i + 1,
    cardStyle: cardStyle
  })))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .sg-grid { grid-template-columns: 1fr !important; }
        }
      `));
}
function ShoutoutCard({
  quote,
  attribution,
  index,
  cardStyle
}) {
  const [hover, setHover] = React.useState(false);
  const styles = cardStyle === 'butter' ? {
    bg: '#F8EBC9',
    border: '#E6C683'
  } : {
    bg: '#F7F2EB',
    border: '#D9CFBF'
  };
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: styles.bg,
      border: `1px solid ${styles.border}`,
      borderRadius: 12,
      padding: '28px 28px 24px',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 240ms cubic-bezier(0.4,0,0.6,1), box-shadow 240ms cubic-bezier(0.4,0,0.6,1)',
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: hover ? '0 2px 8px rgba(31, 26, 23, 0.05), 0 1px 2px rgba(31, 26, 23, 0.04)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 56,
      lineHeight: 0.5,
      color: '#B8512C',
      opacity: 0.5
    }
  }, "“"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10,
      fontWeight: 500,
      color: '#6B5F56',
      letterSpacing: '0.14em'
    }
  }, "0", index)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 21,
      lineHeight: 1.35,
      color: '#1F1A17',
      margin: '0 0 28px',
      flex: 1,
      textWrap: 'pretty',
      fontWeight: 400
    }
  }, quote), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 20,
      borderTop: '1px solid rgba(31, 26, 23, 0.12)',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: '#3A322D',
      fontWeight: 500
    }
  }, attribution));
}

// Image-based shoutout grid. Used for screenshot-style shoutouts (tweets, Slack
// messages, support replies, app store reviews) sourced from the original case
// studies on xfusion.io.
function ShoutoutImageGrid({
  eyebrow,
  heading,
  intro,
  images,
  bg = 'butter'
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
      maxWidth: 1040,
      margin: '0 auto 56px'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#B8512C',
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 24,
      height: 1,
      background: '#B8512C'
    }
  }), eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4vw, 48px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#1F1A17',
      textWrap: 'balance',
      maxWidth: 760
    }
  }, heading), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: 0,
      maxWidth: 760,
      textWrap: 'pretty'
    }
  }, intro)), /*#__PURE__*/React.createElement("div", {
    className: "sig-grid",
    style: {
      maxWidth: 1100,
      margin: '0 auto',
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
        @media (max-width: 720px) {
          .sig-grid { grid-template-columns: 1fr !important; }
        }
      `));
}
window.ShoutoutGrid = ShoutoutGrid;
window.ShoutoutImageGrid = ShoutoutImageGrid;
// --- components/CTASection.jsx
// Section 11: Forest-green CTA band. Same pattern as homepage / about / case studies index.
function CTASection() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "lg",
    style: {
      paddingTop: 112,
      paddingBottom: 112
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    className: "cta-grid",
    style: {
      maxWidth: 1040,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#F0D9A8',
      marginBottom: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 24,
      height: 1,
      background: '#F0D9A8',
      opacity: 0.7
    }
  }), "Ready when you are"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(34px, 4.4vw, 56px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#F7F2EB',
      textWrap: 'balance'
    }
  }, "Want to see if we can help you too?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      lineHeight: 1.6,
      color: '#F0D9A8',
      opacity: 0.95,
      margin: 0,
      maxWidth: 560,
      textWrap: 'pretty'
    }
  }, "If your customer support is starting to slip, or you are about to lose the one person holding it together, we can help. We will recruit, vet, place, train, and manage a senior, AI-trained support agent for your business. You will work with them for 30 days before paying anything. If you are not happy, you walk away free.")), /*#__PURE__*/React.createElement("div", {
    className: "cta-side",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    style: {
      fontSize: 16,
      padding: '16px 28px',
      boxShadow: '0 2px 0 rgba(0,0,0,0.15)'
    },
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.55,
      color: '#F0D9A8',
      opacity: 0.85,
      margin: 0,
      maxWidth: 320
    }
  }, "30 minutes. No commitment. No credit card. You'll talk directly with our founding team.")))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `));
}
window.CTASection = CTASection;
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
  const leaderImages = ['../../images/shoutouts/savvycal/leadership/image13-1.png', '../../images/shoutouts/savvycal/leadership/image3-667x184.png', '../../images/shoutouts/savvycal/leadership/image5-775x79.png'];
  const customerImages = ['../../images/shoutouts/savvycal/customers/savvycal-xfusion-1.png', '../../images/shoutouts/savvycal/customers/savvycal-xfusion-2.png', '../../images/shoutouts/savvycal/customers/savvycal-xfusion-3.png', '../../images/shoutouts/savvycal/customers/savvycal-xfusion-4.png', '../../images/shoutouts/savvycal/customers/savvycal-xfusion-5.png', '../../images/shoutouts/savvycal/customers/savvycal-xfusion-6.png', '../../images/shoutouts/savvycal/customers/savvycal-xfusion-7.png', '../../images/shoutouts/savvycal/customers/savvycal-xfusion-8.png', '../../images/shoutouts/savvycal/customers/savvycal-xfusion-9.png'];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(PageHeader, null), /*#__PURE__*/React.createElement(OverviewBox, null), /*#__PURE__*/React.createElement(LongForm, {
    id: "about",
    eyebrow: "Background",
    heading: "About SavvyCal",
    bg: "paper"
  }, /*#__PURE__*/React.createElement("p", null, "SavvyCal is a scheduling tool that takes the awkward work out of finding a meeting time. The product layers calendar overlays so guests can pick from times that actually work for everyone, ranks availability by preference, handles time zones cleanly, and supports per-link calendar settings for people who run different kinds of meetings out of different inboxes. It is the scheduler people reach for when the generic options stop pulling their weight."), /*#__PURE__*/React.createElement("p", null, "SavvyCal was founded by Derrick Reimer, a multi-time founder. Derrick previously co-founded Drip, the email marketing platform acquired by Leadpages in 2016. He started SavvyCal because the existing schedulers solved the host's problem and ignored the guest's. The product grew quickly on word of mouth, podcasts, and a loyal base of professionals who care about a polished booking experience."), /*#__PURE__*/React.createElement("p", null, "By 2021, SavvyCal had real customers, real volume, and a real support inbox. And Derrick was running it largely alone.")), /*#__PURE__*/React.createElement(TestimonialFeature, null), /*#__PURE__*/React.createElement(MetricCallout, null), /*#__PURE__*/React.createElement(LongForm, {
    id: "challenge",
    eyebrow: "The challenge",
    heading: "The mornings were the first thing to go.",
    bg: "paper"
  }, /*#__PURE__*/React.createElement("p", null, "Derrick had a routine that mattered to him. Mornings were for deep work. Heads down, no meetings, no Slack, no inbox. That was when the product got built."), /*#__PURE__*/React.createElement("p", {
    className: "lf-pull"
  }, "The support inbox started killing it."), /*#__PURE__*/React.createElement("p", null, "He would sit down to write code or think through a hard product decision, and a pull on the back of his mind kept tugging him toward the support queue. What if a customer was stuck? What if a tier-1 question had been sitting for hours? What if something in the latest release had broken and he was the only one who could see it?"), /*#__PURE__*/React.createElement("p", null, "So he checked. And once he checked, he replied. And once he replied, the morning was gone."), /*#__PURE__*/React.createElement("p", null, "The math was about to get worse. SavvyCal had a roadmap of features in flight, and Derrick knew that every shipped feature meant more questions, more edge cases, more onboarding chats, more billing nuance. The current setup was already cracking under the load it had. Adding more product surface area without a real support function would have meant either slower releases or slower replies. Neither was acceptable."), /*#__PURE__*/React.createElement("p", null, "He had also seen what most outsourced support looks like. Scripted replies. Shallow product knowledge. People who treated his customers like tickets to close instead of people to help. SavvyCal customers care about how they get treated. The support had to match. So Derrick had a problem with two ugly answers. Hire and manage in-house, which meant pulling himself further away from the product to do recruiting, training, and people management he did not want to be doing. Or outsource it the way most founders outsource it, and watch the brand he had carefully built get diluted by a stranger who was treating it like a side gig. He wanted a third option.")), /*#__PURE__*/React.createElement(LongForm, {
    id: "solution",
    eyebrow: "The solution",
    heading: "A senior agent, placed as one of the team.",
    bg: "paper-2"
  }, /*#__PURE__*/React.createElement("p", null, "xFusion placed a full-time, senior customer support agent as a dedicated extension of the SavvyCal team. Not a freelancer. Not a script reader. A person who learned SavvyCal the way an in-house hire would learn it, and who stayed."), /*#__PURE__*/React.createElement("p", null, "The lifecycle was managed end to end. xFusion ran the recruiting through the TraitX Framework, surfaced candidates Derrick could review on Zoom before meeting anyone live, handled the training in SavvyCal's actual workflows, took over payroll and HR, and assigned a dedicated account manager to oversee performance and keep the work tight over time."), /*#__PURE__*/React.createElement("p", null, "What Derrick noticed first was the fit. The placed agent did not sound like an outsourced rep. The replies sounded like SavvyCal. The judgment calls felt like the calls Derrick would have made himself if he had been in the inbox. Customers wrote back grateful, not annoyed. Some of them did not realize they were not talking directly to the founder."), /*#__PURE__*/React.createElement("p", null, "That gave Derrick room to step back. He stopped checking the inbox in the morning. He let the support team run without him. The work was good enough that he trusted it. Over time, the scope grew. The placement took on voice and video support for high-touch customers, case by case. Knowledge base articles got written and improved. Side projects and back-office tasks moved off Derrick's plate too. What started as relief from the morning inbox turned into a real working part of the business.")), /*#__PURE__*/React.createElement(ShoutoutImageGrid, {
    eyebrow: "In their own words",
    heading: "Shoutouts to xFusion's team members from SavvyCal leadership",
    intro: "Derrick has gone out of his way, more than once, to call out the xFusion team in public. He has shouted them out on The Art of Product podcast, in conversations with other founders, and in his own writing about how SavvyCal stays a small team that does big things.",
    images: leaderImages,
    bg: "butter"
  }), /*#__PURE__*/React.createElement(ShoutoutImageGrid, {
    eyebrow: "From the inbox",
    heading: "Shoutouts from SavvyCal customers about xFusion's team members",
    intro: "SavvyCal customers do not know they are writing to xFusion. They think they are writing to SavvyCal. That is the point. The reactions came back the way they come back when support is genuinely good.",
    images: customerImages,
    bg: "paper"
  }), /*#__PURE__*/React.createElement(LongForm, {
    id: "results",
    eyebrow: "The results",
    heading: "The numbers and the lived experience moved together.",
    bg: "paper-2"
  }, /*#__PURE__*/React.createElement("p", null, "The numbers and the lived experience moved together."), /*#__PURE__*/React.createElement("ul", {
    className: "results-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "rl-marker"
  }, "01"), /*#__PURE__*/React.createElement("span", {
    className: "rl-text"
  }, /*#__PURE__*/React.createElement("strong", null, "84.79% reduction in average reply time."), " The headline metric. Customers were getting answers in a fraction of the time they used to wait.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "rl-marker"
  }, "02"), /*#__PURE__*/React.createElement("span", {
    className: "rl-text"
  }, /*#__PURE__*/React.createElement("strong", null, "Higher customer satisfaction."), " Reviews and direct replies reflected it.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "rl-marker"
  }, "03"), /*#__PURE__*/React.createElement("span", {
    className: "rl-text"
  }, /*#__PURE__*/React.createElement("strong", null, "Zero abandoned tickets."), " Nothing slipped through. The queue stayed clean.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "rl-marker"
  }, "04"), /*#__PURE__*/React.createElement("span", {
    className: "rl-text"
  }, /*#__PURE__*/React.createElement("strong", null, "Knowledge base expanded."), " The placed agent built up the documentation as patterns emerged, which deflected repeat questions and helped customers self-serve.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "rl-marker"
  }, "05"), /*#__PURE__*/React.createElement("span", {
    className: "rl-text"
  }, /*#__PURE__*/React.createElement("strong", null, "Scope grew into voice and video support."), " What started as inbox coverage grew into a fuller support offering for high-touch moments.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "rl-marker"
  }, "06"), /*#__PURE__*/React.createElement("span", {
    className: "rl-text"
  }, /*#__PURE__*/React.createElement("strong", null, "Coverage of side projects and back-office work."), " The placement's value kept growing outside of the original scope.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "rl-marker"
  }, "07"), /*#__PURE__*/React.createElement("span", {
    className: "rl-text"
  }, /*#__PURE__*/React.createElement("strong", null, "Derrick reclaimed his mornings."), " The deep work routine came back. The product roadmap kept moving. SavvyCal kept shipping."))), /*#__PURE__*/React.createElement("p", null, "The partnership started in May 2021 and has continued since. Customer satisfaction stayed high, reply times stayed fast, and the work the placement handled kept growing as the SavvyCal team trusted them with more of what used to be on the founder's plate.")), /*#__PURE__*/React.createElement(CTASection, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));