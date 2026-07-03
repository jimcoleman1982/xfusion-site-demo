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
// --- (inline)
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
  href,
  style = {},
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
  } else {
    bg = hover ? 'rgba(31,26,23,0.04)' : 'transparent';
    color = '#1F1A17';
    border = '1px solid transparent';
  }
  const Tag = href ? 'a' : 'button';
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
const Icons = {
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
  mail: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "4",
    width: "20",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 7l-10 6L2 7"
  }))
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  stroke = 1.6
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      display: 'inline-block'
    }
  }, Icons[name]);
}
function Nav({
  current
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const linkStyle = active => ({
    color: active ? '#B8512C' : '#1F1A17',
    textDecoration: 'none',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontWeight: active ? 500 : 400,
    fontSize: 14,
    whiteSpace: 'nowrap'
  });
  const links = [{
    label: 'Home',
    href: '../',
    key: 'home'
  }, {
    label: 'About',
    href: '../about/',
    key: 'about'
  }, {
    label: 'Case studies',
    href: '../case-studies/',
    key: 'case-studies'
  }, {
    label: 'Careers',
    href: '../careers/',
    key: 'careers'
  }, {
    label: 'Blog',
    href: 'https://blog.xfusion.io',
    key: 'blog'
  }];
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
    href: "../",
    style: {
      display: 'flex',
      alignItems: 'baseline',
      textDecoration: 'none'
    },
    "aria-label": "xFusion home"
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
      marginLeft: 24
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: l.href,
    style: linkStyle(current === l.key)
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement("button", {
    className: "nav-mobile-toggle",
    onClick: () => setOpen(!open),
    style: {
      display: 'none',
      background: 'transparent',
      border: '1px solid #B7A993',
      borderRadius: 8,
      padding: 8,
      cursor: 'pointer',
      color: '#1F1A17'
    },
    "aria-label": "Toggle menu"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'x' : 'menu',
    size: 20
  })))), open && /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile-menu",
    style: {
      display: 'none',
      flexDirection: 'column',
      gap: 16,
      padding: '8px 0 24px',
      borderTop: '1px solid #D9CFBF'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: l.href,
    style: linkStyle(current === l.key),
    onClick: () => setOpen(false)
  }, l.label)))), /*#__PURE__*/React.createElement("style", null, `@media (max-width: 800px) { .nav-links { display: none !important; } .nav-mobile-toggle { display: inline-flex !important; } .nav-mobile-menu { display: flex !important; } }`));
}
function Footer() {
  const cols = [{
    title: 'Product',
    links: [['Pricing', '../#pricing'], ['Case studies', '../case-studies/']]
  }, {
    title: 'Company',
    links: [['About', '../about/'], ['Careers', '../careers/'], ['Contact', '../contact/']]
  }, {
    title: 'Resources',
    links: [['FAQ', '../#faq'], ['Blog', '../blog/']]
  }, {
    title: 'Legal',
    links: [['Privacy', '../privacy/'], ['DPA', '../dpa/'], ['Security', '../security/']]
  }];
  const FOREST = '#2C4A3E',
    PAPER = '#F7F2EB',
    BUTTER = '#F0D9A8',
    DIVIDER = 'rgba(247, 242, 235, 0.14)',
    MUTED = 'rgba(247, 242, 235, 0.65)';
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
  }, /*#__PURE__*/React.createElement("div", null, "© 2026 xFusion. All rights reserved."), /*#__PURE__*/React.createElement("div", null, "Made with care across the Philippines, Kenya, and the United States."))), /*#__PURE__*/React.createElement("style", null, `.footer-link:hover { color: ${BUTTER}; } @media (max-width: 900px) { .footer-top { grid-template-columns: 1fr !important; gap: 20px !important; } .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } .footer-legal { flex-direction: column; align-items: flex-start !important; } } @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }`));
}
function ContactBody() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      paddingTop: 96,
      paddingBottom: 112
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Contact us"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(40px, 5.6vw, 76px)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      margin: '0 0 32px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "Get in touch."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(22px, 2.4vw, 30px)',
      lineHeight: 1.4,
      color: '#1F1A17',
      fontWeight: 400,
      margin: '0 0 24px',
      textWrap: 'pretty'
    }
  }, "Email us at ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@xfusion.io",
    style: {
      color: '#B8512C',
      textDecoration: 'none',
      borderBottom: '2px solid #B8512C'
    }
  }, "info@xfusion.io"), " and we will reply shortly."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 40px'
    }
  }, "We read every message. A real person on our team will get back to you within one business day."), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 32,
      borderTop: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.6,
      color: '#3A322D',
      margin: '0 0 20px'
    }
  }, "Want to talk to us live? Book a 30-minute Discovery Call instead."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call")))));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Contact"
  }, /*#__PURE__*/React.createElement(Nav, {
    current: "contact"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(ContactBody, null)), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));