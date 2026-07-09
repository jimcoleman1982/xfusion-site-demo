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
// About page: prefix = '../', active = 'about'.
function Nav({
  active = 'about',
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
// --- components/AboutHero.jsx
function AboutHero() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 96,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left',
      maxWidth: 880,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "About xFusion"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(40px, 5.6vw, 76px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      margin: '0 0 28px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "We started xFusion because we hated what staffing agencies do to people."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(20px, 2.1vw, 26px)',
      lineHeight: 1.45,
      color: '#3A322D',
      fontWeight: 400,
      margin: '0 0 36px',
      maxWidth: 760,
      textWrap: 'pretty'
    }
  }, "Six years later, we're about 70 people on three continents who've built real support careers, with clients who actually invest in them."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book a discovery call"), /*#__PURE__*/React.createElement("a", {
    href: "#story",
    onClick: e => {
      e.preventDefault();
      const el = document.getElementById('story');
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        history.replaceState(null, '', '#story');
      }
    },
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      color: '#3A322D',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '14px 12px',
      cursor: 'pointer'
    }
  }, "Read the story ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 14
  }))))));
}
window.AboutHero = AboutHero;
// --- components/Mission.jsx
function Mission() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 64,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 2.1fr',
      gap: 64,
      alignItems: 'start',
      paddingTop: 48,
      borderTop: '1px solid #D9CFBF'
    },
    className: "mission-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "01 / Mission"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(30px, 3.2vw, 42px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: 0,
      color: '#1F1A17'
    }
  }, "Our mission")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(22px, 2vw, 28px)',
      lineHeight: 1.4,
      color: '#1F1A17',
      fontWeight: 400,
      margin: 0,
      textWrap: 'pretty'
    }
  }, "xFusion exists to find great customer support people, place them with businesses that will treat them like real team members, and help those relationships last for years instead of months. We pay a living wage, invest in culture, and manage both sides of the relationship so the work feels like a career, not a gig. ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'linear-gradient(180deg, transparent 60%, #F0D9A8 60%)',
      padding: '0 2px'
    }
  }, "That's the whole game."))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .mission-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `));
}
window.Mission = Mission;
// --- components/Origin.jsx
function Origin() {
  const paraStyle = {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 18,
    lineHeight: 1.65,
    color: '#1F1A17',
    margin: '0 0 24px',
    textWrap: 'pretty'
  };
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg",
    id: "story"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 2.1fr',
      gap: 64,
      alignItems: 'start'
    },
    className: "origin-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 96
    },
    className: "origin-side"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "02 / Origin"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(30px, 3.2vw, 42px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 16px',
      color: '#1F1A17'
    }
  }, "Why we built xFusion"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.55,
      color: '#6B5F56',
      margin: 0,
      maxWidth: 280
    }
  }, "A short history of how the international staffing model broke, and what we built instead.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: paraStyle
  }, "In 2020, Jim and David started looking hard at the international staffing industry, and most of what they saw was broken."), /*#__PURE__*/React.createElement("p", {
    style: paraStyle
  }, "Workers got paid so badly they had no reason to stay. Three or six months in, they'd quit for another job that paid a few dollars more. Clients would lose them, hire again, retrain again, and watch the cycle repeat. The whole setup was built on turnover. The agency took a fee every time someone got replaced."), /*#__PURE__*/React.createElement("p", {
    style: paraStyle
  }, "The question Jim and David kept asking each other was simple. What if you actually treated overseas talent like the skilled professionals they are? Pay them well. Give them a real career path. Build a culture they want to stick around for. Manage the relationship the same way a great in-house manager would. Would the math still work for clients?"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...paraStyle,
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(24px, 2.4vw, 32px)',
      lineHeight: 1.25,
      fontWeight: 400,
      margin: '40px 0',
      color: '#1F1A17'
    }
  }, "It did. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#B8512C'
    }
  }, "It worked better.")), /*#__PURE__*/React.createElement("p", {
    style: paraStyle
  }, "We started with a few clients, paid our team a real living wage, invested in culture and team-building, and built a screening system backed by our own software (we call it ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 16,
      background: '#F8EBC9',
      padding: '1px 6px',
      borderRadius: 4
    }
  }, "TraitX"), "). It takes thousands of monthly applicants down to fewer than 100 interviews, and the top 1% into placements."), /*#__PURE__*/React.createElement("p", {
    style: paraStyle
  }, "Six years later, we have about 70 team members across the Philippines, Kenya, and the United States. Our clients keep their xFusion team members for years. Our team members build careers, buy homes, and send their kids to school. The numbers tell the story we set out to write."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      padding: '32px 36px',
      background: '#F0D9A8',
      borderRadius: 12,
      borderLeft: '4px solid #B8512C'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(22px, 2.2vw, 28px)',
      lineHeight: 1.3,
      fontWeight: 400,
      color: '#1F1A17',
      margin: 0,
      textWrap: 'pretty'
    }
  }, "We're not the cheapest option, and we don't try to be. We're the option that actually keeps the people you place."))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .origin-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .origin-side { position: static !important; }
        }
      `));
}
window.Origin = Origin;
// --- components/Team.jsx
function Team() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 2.1fr',
      gap: 64,
      alignItems: 'start',
      marginBottom: 56
    },
    className: "team-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "03 / Team"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(30px, 3.2vw, 42px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: 0,
      color: '#1F1A17'
    }
  }, "The team behind every placement")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.65,
      color: '#1F1A17',
      margin: '0 0 20px',
      textWrap: 'pretty'
    }
  }, "About 70 people make xFusion run, with offices in the Philippines and Kenya and a smaller team in the United States. We invest in culture the way other companies invest in software: living-wage pay, holiday gifts, branded swag, regular team-building events, birthday and work anniversary celebrations, and account managers who know every team member by name."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.65,
      color: '#1F1A17',
      margin: 0,
      textWrap: 'pretty'
    }
  }, "The reason is practical. People who feel cared for stay. People who stay get great at the work. People who get great at the work make our clients look brilliant. The whole thing compounds."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      marginTop: 16
    },
    className: "team-photos"
  }, /*#__PURE__*/React.createElement(TeamPhoto, {
    location: "Philippines",
    count: "35 team members",
    label: "Photo: Philippines team-building",
    imageSrc: "../images/xfusion-philippines-team.jpeg",
    sillySrc: "../images/silly/philippines-team-silly.png",
    tone: "clay"
  }), /*#__PURE__*/React.createElement(TeamPhoto, {
    location: "Kenya",
    count: "35 team members",
    label: "Photo: Kenya team-building",
    imageSrc: "../images/xfusion-kenya-team.jpeg",
    sillySrc: "../images/silly/kenya-team-silly.png",
    tone: "forest"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      paddingTop: 32,
      borderTop: '1px solid #D9CFBF',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 32
    },
    className: "team-stats"
  }, [{
    stat: '70+',
    label: 'Team members'
  }, {
    stat: '3',
    label: 'Continents'
  }, {
    stat: '6 yrs',
    label: 'In business since 2020'
  }, {
    stat: '<1%',
    label: 'Of applicants placed'
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 3.2vw, 44px)',
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: '#B8512C',
      marginBottom: 8
    }
  }, s.stat), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      color: '#3A322D',
      lineHeight: 1.4
    }
  }, s.label))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .team-head { grid-template-columns: 1fr !important; gap: 24px !important; }
          .team-photos { grid-template-columns: 1fr !important; }
          .team-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }

        /* Hover flip: stack two images, fade between them on hover (desktop)
           or on tap toggle (mobile, via the .flipped class). */
        .team-photo-stack {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #D9CFBF;
          cursor: pointer;
        }
        .team-photo-stack img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 220ms cubic-bezier(0.4,0,0.6,1);
        }
        .team-photo-default { opacity: 1; }
        .team-photo-silly   { opacity: 0; }
        @media (hover: hover) {
          .team-photo-stack:hover .team-photo-default { opacity: 0; }
          .team-photo-stack:hover .team-photo-silly   { opacity: 1; }
        }
        .team-photo-stack.flipped .team-photo-default { opacity: 0; }
        .team-photo-stack.flipped .team-photo-silly   { opacity: 1; }
      `));
}
function TeamPhoto({
  location,
  count,
  label,
  imageSrc,
  sillySrc,
  tone
}) {
  const [errored, setErrored] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);
  const showImage = imageSrc && !errored;
  const handleToggle = () => setFlipped(f => !f);
  const handleKey = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0
    }
  }, showImage ? /*#__PURE__*/React.createElement("div", {
    className: `team-photo-stack${flipped ? ' flipped' : ''}`,
    role: "button",
    tabIndex: 0,
    "aria-pressed": flipped,
    "aria-label": `xFusion ${location} team photo, tap to toggle silly portrait`,
    onClick: handleToggle,
    onKeyDown: handleKey
  }, /*#__PURE__*/React.createElement("img", {
    src: imageSrc,
    alt: `xFusion ${location} team building, ${count}`,
    loading: "lazy",
    onError: () => setErrored(true),
    className: "team-photo-default"
  }), sillySrc && /*#__PURE__*/React.createElement("img", {
    src: sillySrc,
    alt: "",
    loading: "lazy",
    className: "team-photo-silly",
    "aria-hidden": "true"
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4 / 3',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    name: location,
    label: label,
    tone: tone,
    ratio: "4/3"
  })), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 22,
      fontWeight: 500,
      color: '#1F1A17',
      letterSpacing: '-0.01em'
    }
  }, location), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      color: '#6B5F56',
      letterSpacing: '0.02em'
    }
  }, count)));
}
window.Team = Team;
// --- components/Leadership.jsx
// Section 04: Leadership team
// Single uniform grid — all cards same size.
// Hover (or tap on mobile) the image to flip to the team member's silly portrait.

function Leadership() {
  // Display order: row 1 = Daniel, Martin, Reggie, Rie (Marie).
  //                row 2 = Felix, Bianca, Velvie.
  const team = [{
    name: 'Daniel Juma',
    role: 'Head of Operations',
    imageSrc: '../images/daniel-juma.png',
    sillySrc: '../images/silly/daniel-juma-silly.png'
  }, {
    name: 'Martin Onami',
    role: 'Account Manager',
    imageSrc: '../images/martin-onami.png',
    sillySrc: '../images/silly/martin-onami-silly.png',
    sillyFit: 'contain'
  }, {
    name: 'Reggie Rendal',
    role: 'Account Manager',
    imageSrc: '../images/reggie-rendal.png',
    sillySrc: '../images/silly/reggie-rendal-silly.png'
  }, {
    name: 'Marie Medina',
    role: 'Account Manager',
    imageSrc: '../images/marie-medina.png',
    sillySrc: '../images/silly/marie-medina-silly.png'
  }, {
    name: 'Felix Maru',
    role: 'Operations Engineer',
    imageSrc: '../images/felix-maru.png',
    sillySrc: '../images/silly/felix-maru-silly.png'
  }, {
    name: 'Bianca Dadulla',
    role: 'Recruitment Manager',
    imageSrc: '../images/bianca-dadulla.png',
    sillySrc: '../images/silly/bianca-dadulla-silly.png'
  }, {
    name: 'Velvie Coleman',
    role: 'CEO',
    imageSrc: '../images/velvie-coleman.jpg',
    sillySrc: '../images/silly/velvie-coleman-silly.png'
  }];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 2.1fr',
      gap: 64,
      alignItems: 'start',
      marginBottom: 56
    },
    className: "lead-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "04 / Leadership"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(30px, 3.2vw, 42px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: 0,
      color: '#1F1A17'
    }
  }, "The leaders who run the work")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.65,
      color: '#1F1A17',
      margin: '0 0 12px',
      textWrap: 'pretty'
    }
  }, "The people clients work with day-to-day. Operations, account management, and recruiting. Every account manager knows their team members by name, and every team member knows their account manager has their back."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.5,
      color: '#6B5F56',
      margin: 0,
      fontStyle: 'italic'
    }
  }, "Hover any photo to meet the person behind the title."))), /*#__PURE__*/React.createElement("div", {
    className: "lead-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 28
    }
  }, team.map(person => /*#__PURE__*/React.createElement(LeaderCard, {
    key: person.name,
    ...person
  })))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 1024px) {
          .lead-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 760px) {
          .lead-head { grid-template-columns: 1fr !important; gap: 24px !important; }
          .lead-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
        }
        @media (max-width: 460px) {
          .lead-grid { grid-template-columns: 1fr !important; }
        }

        /* Hover flip: stack two images, fade between them on hover (desktop)
           or on tap toggle (mobile, via the .flipped class). */
        .leader-photo-stack {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #D9CFBF;
          cursor: pointer;
          transition: transform 240ms cubic-bezier(0.4,0,0.6,1);
        }
        @media (hover: hover) {
          .leader-photo-stack:hover {
            transform: translateY(-2px);
          }
        }
        .leader-photo-stack img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 220ms cubic-bezier(0.4,0,0.6,1);
        }
        .leader-photo-default { opacity: 1; }
        .leader-photo-silly   { opacity: 0; }
        /* Per-leader silly image fit override: 'contain' lets the full
           portrait show inside the 4:5 frame (used when the silly image
           is much taller than the frame, e.g. full-body shots). */
        .leader-photo-silly.fit-contain {
          object-fit: contain;
          background: #EFE8DD;
        }
        @media (hover: hover) {
          .leader-photo-stack:hover .leader-photo-default { opacity: 0; }
          .leader-photo-stack:hover .leader-photo-silly   { opacity: 1; }
        }
        .leader-photo-stack.flipped .leader-photo-default { opacity: 0; }
        .leader-photo-stack.flipped .leader-photo-silly   { opacity: 1; }
      `));
}
function LeaderCard({
  name,
  role,
  imageSrc,
  sillySrc,
  sillyFit
}) {
  const [errored, setErrored] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);
  const handleToggle = () => setFlipped(f => !f);
  const handleKey = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: `leader-photo-stack${flipped ? ' flipped' : ''}`,
    role: "button",
    tabIndex: 0,
    "aria-pressed": flipped,
    "aria-label": `Photo of ${name}, tap to toggle silly portrait`,
    onClick: handleToggle,
    onKeyDown: handleKey
  }, !imageSrc || errored ? /*#__PURE__*/React.createElement(LeaderPlaceholder, {
    name: name
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: imageSrc,
    alt: `${name}, ${role}`,
    loading: "lazy",
    className: "leader-photo-default",
    onError: () => setErrored(true)
  }), sillySrc && /*#__PURE__*/React.createElement("img", {
    src: sillySrc,
    alt: "",
    loading: "lazy",
    className: `leader-photo-silly${sillyFit === 'contain' ? ' fit-contain' : ''}`,
    "aria-hidden": "true"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: "'Source Serif 4', serif",
      fontSize: 19,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
      color: '#1F1A17'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: '#6B5F56',
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, role));
}
function LeaderPlaceholder({
  name
}) {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #F0D9A8 0%, #D9B97A 100%)',
      color: '#3A322D',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(48px, 6vw, 80px)',
      lineHeight: 1,
      opacity: 0.45,
      letterSpacing: '-0.04em'
    }
  }, initials));
}
window.Leadership = Leadership;
// --- components/FounderCard.jsx
// Founder card: photo + role + multi-paragraph bio.
// `imageSide` controls left/right alternation.
// Hover the photo to flip to the founder's silly portrait.
function FounderCard({
  name,
  role,
  paragraphs,
  imageSrc,
  sillySrc,
  imageLabel,
  imageSide = 'right',
  tone = 'clay',
  linkedIn
}) {
  const isLeft = imageSide === 'left';
  return /*#__PURE__*/React.createElement("div", {
    className: "founder-card",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "founder-photo",
    style: {
      order: isLeft ? 0 : 1
    }
  }, /*#__PURE__*/React.createElement(FounderPhoto, {
    name: name,
    imageSrc: imageSrc,
    sillySrc: sillySrc,
    imageLabel: imageLabel,
    tone: tone
  })), /*#__PURE__*/React.createElement("div", {
    className: "founder-body",
    style: {
      order: isLeft ? 1 : 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(30px, 3.2vw, 42px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 8px',
      color: '#1F1A17'
    }
  }, linkedIn ? /*#__PURE__*/React.createElement("a", {
    href: linkedIn,
    className: "founder-name-link",
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": `${name}, ${role}, open LinkedIn profile`
  }, name) : name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      color: '#6B5F56',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: 24
    }
  }, role), /*#__PURE__*/React.createElement("div", null, paragraphs.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      lineHeight: 1.65,
      color: '#1F1A17',
      margin: i === paragraphs.length - 1 ? 0 : '0 0 20px',
      textWrap: 'pretty'
    }
  }, p)))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .founder-card { grid-template-columns: 1fr !important; gap: 32px !important; }
          .founder-card .founder-photo { order: 0 !important; }
          .founder-card .founder-body  { order: 1 !important; }
        }

        /* Hover flip on founder photos: same pattern as the leadership grid.
           Hover toggles on desktop; tap toggles on mobile via .flipped. */
        .founder-photo-stack {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #D9CFBF;
          cursor: pointer;
        }
        .founder-photo-stack img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 220ms cubic-bezier(0.4,0,0.6,1);
        }
        .founder-photo-default { opacity: 1; }
        .founder-photo-silly   { opacity: 0; }
        @media (hover: hover) {
          .founder-photo-stack:hover .founder-photo-default { opacity: 0; }
          .founder-photo-stack:hover .founder-photo-silly   { opacity: 1; }
        }
        .founder-photo-stack.flipped .founder-photo-default { opacity: 0; }
        .founder-photo-stack.flipped .founder-photo-silly   { opacity: 1; }

        .founder-name-link {
          color: inherit;
          text-decoration: none;
          transition: color 160ms ease;
        }
        .founder-name-link:hover { color: #B8512C; }
      `));
}

// Photo block: real <img> if a real file resolves, otherwise a labeled
// placeholder showing the expected file path so the dev knows what's missing.
// When sillySrc is provided, hover swaps to the silly portrait.
function FounderPhoto({
  name,
  imageSrc,
  sillySrc,
  imageLabel,
  tone
}) {
  const [errored, setErrored] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);
  const handleToggle = () => setFlipped(f => !f);
  const handleKey = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };
  if (!imageSrc || errored) {
    const tones = {
      clay: {
        bg: 'linear-gradient(135deg, #B8512C 0%, #A0451F 100%)',
        fg: '#F0D9A8'
      },
      forest: {
        bg: 'linear-gradient(135deg, #2C4A3E 0%, #243C32 100%)',
        fg: '#F0D9A8'
      }
    };
    const t = tones[tone] || tones.clay;
    const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: '4 / 5',
        borderRadius: 12,
        background: t.bg,
        color: t.fg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Source Serif 4', serif",
        fontSize: 'clamp(96px, 14vw, 180px)',
        lineHeight: 1,
        opacity: 0.32,
        letterSpacing: '-0.04em'
      }
    }, initials), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 20,
        left: 20,
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        opacity: 0.75
      }
    }, imageLabel)));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: `founder-photo-stack${flipped ? ' flipped' : ''}`,
    role: "button",
    tabIndex: 0,
    "aria-pressed": flipped,
    "aria-label": `Photo of ${name}, tap to toggle silly portrait`,
    onClick: handleToggle,
    onKeyDown: handleKey
  }, /*#__PURE__*/React.createElement("img", {
    src: imageSrc,
    alt: `${name}, co-founder of xFusion`,
    loading: "lazy",
    className: "founder-photo-default",
    onError: () => setErrored(true)
  }), sillySrc && /*#__PURE__*/React.createElement("img", {
    src: sillySrc,
    alt: "",
    loading: "lazy",
    className: "founder-photo-silly",
    "aria-hidden": "true"
  }));
}
window.FounderCard = FounderCard;
// --- components/Founders.jsx
function Founders() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 2.1fr',
      gap: 64,
      alignItems: 'start',
      marginBottom: 96
    },
    className: "founders-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "05 / Co-founders"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(30px, 3.2vw, 42px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: 0,
      color: '#1F1A17'
    }
  }, "The co-founders")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.65,
      color: '#1F1A17',
      margin: 0,
      textWrap: 'pretty'
    }
  }, "David Tran and Jim Coleman started xFusion in 2020 with one rule: hire people you would be proud to have your customers talk to, treat them like the senior professionals they are, and the rest takes care of itself. Six years later that's still the bar."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 112
    },
    className: "founders-stack"
  }, /*#__PURE__*/React.createElement(FounderCard, {
    name: "David Tran",
    role: "Co-founder",
    imageSrc: "../images/david-tran-profile.jpeg",
    sillySrc: "../images/silly/david-tran-silly.png",
    imageLabel: "Co-founder portrait",
    imageSide: "right",
    tone: "forest",
    linkedIn: "https://www.linkedin.com/in/davidtran2015/",
    paragraphs: ["David studied Computer Science at UC Berkeley, then spent years as a software engineer at Uber and Salesforce. At Uber he worked on internal tools, growth, mobile, dispatch systems, and fraud-prevention systems. At Salesforce he kept building the systems other engineers used every day.", "That engineering mindset shows up in how xFusion screens people. Hiring at scale is a systems problem before it's a people problem. David's instinct is to look at the process, find where good candidates are getting lost, and fix the part that's broken.", "A first-generation Vietnamese American, David is a newlywed and an avid traveler. He believes great companies are built by people who genuinely care, and that you can tell within about ten minutes of meeting someone whether they actually do."]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Jim Coleman",
    role: "Co-founder",
    imageSrc: "../images/jim-coleman-hero.png",
    sillySrc: "../images/silly/jim-coleman-silly.png",
    imageLabel: "Co-founder portrait",
    imageSide: "left",
    tone: "clay",
    linkedIn: "https://www.linkedin.com/in/jim-coleman/",
    paragraphs: ["Before xFusion, Jim worked as a detective, then built and sold a few businesses of his own, then ran operations for a private equity fund. The detective work taught him to read people. The businesses taught him how operations either make or break a company. The PE work taught him what happens when you put the right person in the right seat at scale.", "The same thing showed up every time: the right people change everything. Screening them carefully, treating them well, and keeping them for the long haul matters more than almost any other choice a business makes.", "Jim and his family live in the Denver area, where they raised five children. They were a foster family for many years and are also an adoptive family. Jim's wife and kids are the reason most of the work gets done."]
  }))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .founders-head { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 64px !important; }
          .founders-stack { gap: 80px !important; }
        }
      `));
}
window.Founders = Founders;
// --- components/Values.jsx
function Values() {
  const values = [{
    name: 'Integrity',
    text: 'Our word is our bond. We tell clients the truth, even when it costs us a deal.'
  }, {
    name: 'Dignity of work',
    text: 'Good work changes families. We treat every role we fill as a real career, not a gig.'
  }, {
    name: 'Ownership',
    text: "We build it. We fix it. We don't pass the buck to a vendor or a process."
  }, {
    name: 'Long-term thinking',
    text: "We don't measure success in months. We measure it in years on the same client and years in the same role."
  }, {
    name: 'Service',
    text: 'We put others first. Clients, team members, each other.'
  }, {
    name: 'Passion for people',
    text: 'We go the extra mile because people matter more than the metric.'
  }, {
    name: 'Tenacity',
    text: 'We go after hard problems. The ones nobody else wants to solve are usually the ones worth solving.'
  }, {
    name: 'Empathy',
    text: 'We listen before we act. Most problems get smaller once someone feels actually heard.'
  }];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 2.1fr',
      gap: 64,
      alignItems: 'start',
      marginBottom: 56
    },
    className: "values-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "06 / Values"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(30px, 3.2vw, 42px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: 0,
      color: '#1F1A17'
    }
  }, "What we stand for")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(20px, 1.9vw, 24px)',
      lineHeight: 1.45,
      color: '#3A322D',
      margin: 0,
      maxWidth: 560
    }
  }, "A short list. We try to live by it."))), /*#__PURE__*/React.createElement("div", {
    className: "values-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 0,
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      background: '#F7F2EB',
      overflow: 'hidden'
    }
  }, values.map((v, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    return /*#__PURE__*/React.createElement("div", {
      key: v.name,
      style: {
        padding: '32px 28px',
        borderRight: col < 3 ? '1px solid #D9CFBF' : 'none',
        borderBottom: row < 1 ? '1px solid #D9CFBF' : 'none',
        background: '#F7F2EB',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 200
      },
      className: "value-card"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        color: '#B8512C',
        letterSpacing: '0.04em'
      }
    }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "'Source Serif 4', serif",
        fontSize: 22,
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        color: '#1F1A17',
        margin: 0
      }
    }, v.name), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 15,
        lineHeight: 1.55,
        color: '#3A322D',
        margin: 0,
        textWrap: 'pretty'
      }
    }, v.text));
  }))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 1024px) {
          .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .values-grid .value-card { border-right: none !important; border-bottom: 1px solid #D9CFBF !important; }
          .values-grid .value-card:nth-child(2n) { border-right: none !important; }
          .values-grid .value-card:nth-child(odd) { border-right: 1px solid #D9CFBF !important; }
          .values-grid .value-card:nth-last-child(-n+2) { border-bottom: none !important; }
        }
        @media (max-width: 640px) {
          .values-head { grid-template-columns: 1fr !important; gap: 16px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .values-grid .value-card { border-right: none !important; border-bottom: 1px solid #D9CFBF !important; }
          .values-grid .value-card:last-child { border-bottom: none !important; }
        }
      `));
}
window.Values = Values;
// --- components/AboutCTA.jsx
function AboutCTA() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: 64,
      alignItems: 'center'
    },
    className: "about-cta-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "#F0D9A8"
  }, "07 / Talk to us"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(34px, 4.2vw, 56px)',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#F7F2EB',
      textWrap: 'balance'
    }
  }, "Come talk to us."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.55,
      color: '#F0D9A8',
      opacity: 0.92,
      margin: 0,
      maxWidth: 560,
      textWrap: 'pretty'
    }
  }, "If any of this sounds like you, get on a call with our founding team. We'll listen to where support is breaking in your business, tell you honestly whether we can help, and walk you through what working together would actually look like.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      alignItems: 'flex-start'
    },
    className: "about-cta-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
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
        @media (max-width: 900px) {
          .about-cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `));
}
window.AboutCTA = AboutCTA;
// --- components/Footer.jsx
// Unified site footer for About page (site/about/index.html)
// Forest-green background (--color-forest #2C4A3E), Paper text (#F7F2EB)
function Footer() {
  const cols = [{
    title: 'Product',
    links: [['Pricing', '../#pricing'], ['Case studies', '../case-studies/'], ['Shopify app support', '/shopify-app-support/'], ['SaaS support', '/saas-support/']]
  }, {
    title: 'Company',
    links: [['About', '../about/'], ['Careers', '../careers/'], ['Contact', "../contact/"]]
  }, {
    title: 'Resources',
    links: [['FAQ', '/faq/'], ['Blog', '../blog/']]
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
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 32,
      alignItems: 'center',
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
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "About"
  }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(AboutHero, null), /*#__PURE__*/React.createElement(Mission, null), /*#__PURE__*/React.createElement(Origin, null), /*#__PURE__*/React.createElement(Team, null), /*#__PURE__*/React.createElement(Leadership, null), /*#__PURE__*/React.createElement(Founders, null), /*#__PURE__*/React.createElement(Values, null), /*#__PURE__*/React.createElement(AboutCTA, null)), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));