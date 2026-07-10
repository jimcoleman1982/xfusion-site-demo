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
// --- components/LeadModal.jsx
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
// --- components/LeadCapture.jsx
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
  microcopy,
  compact
}) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
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
        // Page-global guard: the hero form and the sticky bar are two
        // instances of this component; email_capture must fire once.
        if (!window.__xfEmailCaptureFired) {
          window.__xfEmailCaptureFired = true;
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
      gap: compact ? 8 : 12,
      alignItems: 'stretch',
      flexWrap: compact ? 'nowrap' : 'wrap',
      maxWidth: compact ? 440 : 520
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "you@company.com",
    "aria-label": "Work email",
    autoComplete: "email",
    style: {
      flex: compact ? '1 1 180px' : '1 1 240px',
      boxSizing: 'border-box',
      padding: compact ? '11px 14px' : '14px 18px',
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
    size: compact ? "md" : "lg",
    as: "button"
  }, "Get started")), emailError ? /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      color: '#A8341E',
      marginTop: compact ? 6 : 10
    }
  }, emailError) : null, compact ? null : /*#__PURE__*/React.createElement(CTAMicrocopy, null, microcopy || /*#__PURE__*/React.createElement(React.Fragment, null, "30 minutes. No pitch deck. We just figure out if we're a good fit for your team.", ' ', /*#__PURE__*/React.createElement("a", {
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

// Sticky bottom capture bar (landing pages + pricing). Appears once the
// hero capture (#lp-hero-capture) has scrolled out of view, so the form is
// always reachable at the moment the page convinces someone.
function StickyCapture() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    // Dev preview: /page/#sticky-preview forces the bar visible.
    if (window.location.hash === '#sticky-preview') {
      setShow(true);
      return;
    }
    const hero = document.getElementById('lp-hero-capture');
    if (!hero || !('IntersectionObserver' in window)) {
      const onScroll = () => setShow(window.scrollY > 700);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
    const obs = new IntersectionObserver(entries => setShow(!entries[0].isIntersecting && entries[0].boundingClientRect.top < 0), {
      threshold: 0
    });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 800,
      background: 'rgba(247, 242, 235, 0.96)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid #D9CFBF',
      boxShadow: '0 -6px 24px rgba(31,26,23,0.06)',
      padding: '10px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sticky-note",
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      color: '#3A322D',
      whiteSpace: 'nowrap'
    }
  }, "$3,900/mo all-in. 30-day risk-free trial."), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(LeadCapture, {
    compact: true
  }))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 700px) { .sticky-note { display: none; } }
      `));
}
window.StickyCapture = StickyCapture;
// --- components/Nav.jsx
// THE site navigation - single source of truth, loaded by every React page
// as /components/Nav.jsx (root-absolute, resolved by build/prerender.js).
// Self-contained on purpose: no dependency on Container/Icon/Button so it can
// be dropped into any page shell regardless of what else that page defines.
//
// Structure: Logo | Solutions v | Case studies | Pricing | About | Blog | CTA
// ("Home" is the logo - top sites don't spend a nav slot on it.)
// Props: active - one of 'solutions' | 'case-studies' | 'pricing' | 'about'
//        | 'blog' | '' ; legacy `current` is accepted as an alias.
const XF_SOLUTIONS = [{
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
window.XF_SOLUTIONS = XF_SOLUTIONS;
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
  const solutions = XF_SOLUTIONS;
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
// --- components/Hero.jsx
// Section 1: Hero
// Stage 1 of the booking funnel: email capture → qualification modal (LeadModal)
// → /book. A "book a call directly" escape hatch skips straight to /book.
function Hero() {
  const [flipped, setFlipped] = React.useState(false);
  // The hover/tap "silly" variant is off the critical path: load it only
  // after the page has finished loading so it never competes with the LCP.
  const [sillySrc, setSillySrc] = React.useState(null);
  React.useEffect(() => {
    const load = () => setSillySrc('images/silly/xfusion-team-montage-silly.webp');
    if (document.readyState === 'complete') {
      load();
      return;
    }
    window.addEventListener('load', load, {
      once: true
    });
    return () => window.removeEventListener('load', load);
  }, []);
  const handleToggle = () => setFlipped(f => !f);
  const handleKey = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  // Stage-1 capture now lives in the shared LeadCapture component
  // (components/LeadCapture.jsx), reused by every vertical landing page.
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#F7F2EB',
      padding: '64px 0 80px'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr 0.85fr',
      gap: 72,
      alignItems: 'center'
    },
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Fully managed customer support. Senior agents, powered by AI."), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(40px, 5.4vw, 72px)',
      fontWeight: 600,
      lineHeight: 1.02,
      letterSpacing: '-0.025em',
      margin: '0 0 28px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "Stop being your own customer support team."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.55,
      color: '#3A322D',
      margin: '0 0 36px',
      maxWidth: 580,
      textWrap: 'pretty'
    }
  }, "We find, train, and place senior support agents inside your business. They use AI to handle the work of several junior reps. We take care of the rest: recruiting, payroll, culture, and performance. So you don't have to."), /*#__PURE__*/React.createElement(LeadCapture, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `hero-photo-stack${flipped ? ' flipped' : ''}`,
    role: "button",
    tabIndex: 0,
    "aria-pressed": flipped,
    "aria-label": "xFusion team across the Philippines and Kenya, tap to toggle silly portrait",
    onClick: handleToggle,
    onKeyDown: handleKey
  }, /*#__PURE__*/React.createElement("picture", null, /*#__PURE__*/React.createElement("source", {
    type: "image/webp",
    srcSet: "images/xfusion-team-montage.webp"
  }), /*#__PURE__*/React.createElement("img", {
    src: "images/xfusion-team-montage.jpg",
    alt: "xFusion team across the Philippines and Kenya",
    width: "1144",
    height: "1144",
    className: "hero-photo-default"
  })), sillySrc ? /*#__PURE__*/React.createElement("img", {
    src: sillySrc,
    alt: "",
    width: "1144",
    height: "1144",
    className: "hero-photo-silly",
    "aria-hidden": "true"
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -28,
      left: -28,
      maxWidth: 240,
      padding: '18px 20px',
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      boxShadow: '0 8px 24px rgba(31,26,23,0.08)'
    },
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 32,
      color: '#B8512C',
      lineHeight: 1,
      marginBottom: 8,
      fontWeight: 600
    }
  }, "100+"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      lineHeight: 1.45,
      color: '#3A322D'
    }
  }, "support placements since 2020. Clients who treat our agents like family."))))), /*#__PURE__*/React.createElement(Container, {
    style: {
      marginTop: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 32,
      borderTop: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: '#6B5F56',
      marginBottom: 18,
      textAlign: 'center'
    }
  }, "Trusted by support-driven teams at"), /*#__PURE__*/React.createElement("div", {
    className: "logo-marquee",
    "aria-label": "Client names"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-marquee-track"
  }, [0, 1].map(copy => /*#__PURE__*/React.createElement("div", {
    className: "logo-marquee-group",
    key: copy,
    "aria-hidden": copy === 1
  }, ['Tolstoy', 'SavvyCal', 'Bonify', 'Ordered Magic', 'TheReceptionist', 'SkyFi', 'Revy Apps', 'Crowd Cow', 'Arbio', 'Nextmune', 'Aheadworks', 'Joli Apps', 'Sign In Solutions', 'Kioskbuddy', 'Common Services', 'Finger Ink', 'Lovely Apps', 'Aligned', 'Autism Products'].map(name => /*#__PURE__*/React.createElement("span", {
    key: name,
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 26,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: '#3A322D',
      opacity: 0.7,
      whiteSpace: 'nowrap'
    }
  }, name)))))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .hero-stat { left: 0 !important; bottom: -20px !important; }
        }

        /* Trust bar marquee: two identical groups slide left; when the first
           has fully passed, the loop restarts invisibly. Edges fade out. */
        .logo-marquee {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .logo-marquee-track {
          display: flex;
          width: max-content;
          animation: logo-marquee-scroll 64s linear infinite;
        }
        .logo-marquee:hover .logo-marquee-track { animation-play-state: paused; }
        .logo-marquee-group {
          display: flex;
          align-items: center;
          gap: 56px;
          padding-right: 56px;
        }
        @keyframes logo-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; }
          .logo-marquee-group { flex-wrap: wrap; justify-content: center; gap: 14px 24px; padding-right: 0; }
          .logo-marquee-group[aria-hidden="true"] { display: none; }
          .logo-marquee { -webkit-mask-image: none; mask-image: none; }
        }

        /* Hero hover flip: stack two images, fade between them on hover (desktop)
           or on tap toggle (mobile, via the .flipped class). */
        .hero-photo-stack {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #D9CFBF;
          cursor: pointer;
          display: block;
        }
        .hero-photo-stack img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 220ms cubic-bezier(0.4,0,0.6,1);
        }
        .hero-photo-default { opacity: 1; }
        .hero-photo-silly   { opacity: 0; }
        @media (hover: hover) {
          .hero-photo-stack:hover .hero-photo-default { opacity: 0; }
          .hero-photo-stack:hover .hero-photo-silly   { opacity: 1; }
        }
        .hero-photo-stack.flipped .hero-photo-default { opacity: 0; }
        .hero-photo-stack.flipped .hero-photo-silly   { opacity: 1; }
      `));
}
window.Hero = Hero;
// --- components/Problem.jsx
// Section 2: Problem — long-form text on Paper, ends with pullquote
function Problem() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    style: {
      borderTop: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The problem"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(34px, 4.4vw, 56px)',
      fontWeight: 600,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      margin: '0 0 56px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "You didn't start a business to answer tickets at 9pm"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.65,
      color: '#3A322D',
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 24px',
      fontFamily: "'Source Serif 4', serif",
      fontSize: 24,
      lineHeight: 1.4,
      color: '#1F1A17'
    }
  }, "But here you are."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 24px'
    }
  }, "Your customer satisfaction scores are slipping. Reply times are getting slow enough that customers are starting to complain. Reviews mention \"slow support\" more than they used to. The one support person you have is buried, and you can tell they're close to breaking. So you keep stepping in. A ticket here, a refund there, an angry email at midnight that could not wait."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 24px'
    }
  }, "You know what's coming if nothing changes. More tickets. More late nights. Someone quits without warning. A customer leaves and tells three other customers why. The thing that used to make your business great (how you took care of people) is now the thing slowly killing it."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 24px'
    }
  }, "You've already tried the obvious fixes. Upwork was full of ghosts and scams. The last \"agency\" you used hired someone, took their fee, and vanished. The chatbot you tried handled the easy stuff fine, then fell apart on the calls that really mattered. Hiring a senior support person in-house costs more than the job is worth. And you don't have time to manage one anyway."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "So the work keeps coming back to you. And you keep working in your business instead of on it.")), /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: '88px 0 0',
      padding: '40px 0 0',
      borderTop: '1px solid #D9CFBF',
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: "'Source Serif 4', serif",
      fontStyle: 'italic',
      fontSize: 'clamp(26px, 3.2vw, 38px)',
      fontWeight: 400,
      lineHeight: 1.25,
      letterSpacing: '-0.015em',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "\"We were sort of in support hell, just kind of working in the business instead of on the business.\""), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 24,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#6B5F56'
    }
  }, "John Carbone, Bonify. A current xFusion client."))));
}
window.Problem = Problem;
// --- components/Solution.jsx
// Section 3: Solution — three pillars
function Solution() {
  const pillars = [{
    icon: 'users',
    tint: '#F2D9CB',
    iconColor: '#B8512C',
    title: 'Senior, AI-Augmented Agents',
    body: "Every agent we place is senior, not entry-level. They use AI tools to handle the easy stuff, which means they can do the work of several junior reps. That's the only reason $3,900/mo works. The people we place are that good."
  }, {
    icon: 'filter',
    tint: '#D7E0DC',
    iconColor: '#2C4A3E',
    title: 'The TraitX Framework',
    body: 'Thousands of people apply each month. Fewer than 100 get an interview. Less than 1% get placed. Every finalist is screened by a real person, with a Zoom recording you watch before you ever meet them. No ghost candidates. No mystery resumes.'
  }, {
    icon: 'handshake',
    tint: '#F8EBC9',
    iconColor: '#7a5a10',
    title: 'Fully Managed, Not Just Placed',
    body: "Most agencies hire and disappear. We stay. Your account manager handles performance, training, payroll, and culture for you. You're not adding a remote worker to manage. You're adding work that gets done."
  }];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg",
    id: "solution"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      marginBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The solution"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 600,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "Senior support agents who use AI to do more. Fully managed by us."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.55,
      color: '#3A322D',
      margin: 0,
      maxWidth: 720
    }
  }, "xFusion places senior support agents inside your business and manages them for you. Every agent has real support experience and is trained to use AI tools. So one xFusion agent can handle a lot more work than a junior rep at another agency. You get the work done. We handle the people side.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      marginBottom: 56
    },
    className: "pillar-grid"
  }, pillars.map((p, i) => /*#__PURE__*/React.createElement(PillarCard, {
    key: i,
    index: i + 1,
    ...p
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement(CTAMicrocopy, null))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) { .pillar-grid { grid-template-columns: 1fr !important; } }
      `));
}
function PillarCard({
  icon,
  tint,
  iconColor,
  title,
  body,
  index
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: 32,
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: hover ? '0 2px 8px rgba(31,26,23,0.05), 0 1px 2px rgba(31,26,23,0.04)' : 'none',
      transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 12,
      background: tint,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 24,
    color: iconColor
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: '#6B5F56',
      marginBottom: 8,
      letterSpacing: '0.08em'
    }
  }, "0", index), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 24,
      fontWeight: 600,
      margin: '0 0 14px',
      color: '#1F1A17',
      lineHeight: 1.2,
      letterSpacing: '-0.015em'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      lineHeight: 1.6,
      margin: 0,
      color: '#3A322D'
    }
  }, body));
}
window.Solution = Solution;
// --- components/WhoWeHelp.jsx
// Homepage audience router: the same five ICP solutions from the nav
// (window.XF_SOLUTIONS, defined once in Nav.jsx), full-size. Routes each
// visitor type to its message-matched landing page.
function WhoWeHelp() {
  const solutions = window.XF_SOLUTIONS || [];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    id: "who-we-help",
    style: {
      borderTop: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Who we help"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 600,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      margin: '0 0 16px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "Support that speaks your customers' language."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.55,
      color: '#3A322D',
      margin: 0
    }
  }, "The problems differ by business. The fix is the same: a senior, AI-trained agent who learns yours. Pick your world.")), /*#__PURE__*/React.createElement("div", {
    className: "wwh-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, solutions.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.href,
    href: s.href,
    className: "wwh-card",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      background: '#EFE8DD',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: '24px 22px',
      textDecoration: 'none',
      color: '#1F1A17',
      transition: 'border-color 160ms cubic-bezier(0.4,0,0.6,1), box-shadow 160ms cubic-bezier(0.4,0,0.6,1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 8,
      background: '#F7F2EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#B8512C",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, s.icon)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: "'Source Serif 4', serif",
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.25,
      marginBottom: 6
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.5,
      color: '#6B5F56'
    }
  }, s.desc)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 'auto',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      fontWeight: 500,
      color: '#B8512C',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, "See how it works", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5l7 7-7 7"
  }))))), /*#__PURE__*/React.createElement("a", {
    href: "/book/",
    className: "wwh-card",
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 8,
      background: '#2C4A3E',
      border: '1px solid #2C4A3E',
      borderRadius: 12,
      padding: '24px 22px',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.25,
      color: '#F7F2EB'
    }
  }, "Something else?"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.5,
      color: '#F0D9A8'
    }
  }, "Tell us what your queue looks like, and we'll be honest about whether we can help."), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 6,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      fontWeight: 500,
      color: '#F7F2EB',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, "Book a Discovery Call", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5l7 7-7 7"
  })))))), /*#__PURE__*/React.createElement("style", null, `
        .wwh-card:hover { border-color: #B8512C !important; box-shadow: 0 4px 16px rgba(31,26,23,0.06); }
        @media (max-width: 980px) { .wwh-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .wwh-grid { grid-template-columns: 1fr !important; } }
      `));
}
window.WhoWeHelp = WhoWeHelp;
// --- components/HowItWorks.jsx
// Section 4: How It Works — four numbered steps
function HowItWorks() {
  const steps = [{
    icon: 'calendar',
    title: '30-Minute Discovery Call',
    body: "We talk about what your support team looks like today, where it's breaking down, and what a good week would look like once it's fixed. If we're not the right fit, we'll tell you. If we are, we get to work."
  }, {
    icon: 'filter',
    title: 'Candidates in 14 days or less',
    body: 'We use our TraitX Framework to find people for your specific role. About two weeks later, you get a short list of senior candidates with blind resumes and Zoom interview videos. You watch the videos and pick who you want to meet.'
  }, {
    icon: 'spark',
    title: 'Placement and Training',
    body: "We train your new agent on your support process and your AI tools. They learn your tools, your brand voice, and pass our certification before they touch a single customer ticket."
  }, {
    icon: 'handshake',
    title: 'They Start. We Manage.',
    body: "Your account manager handles their performance reviews, payroll, and culture. You work with the agent. We handle everything else. You get 30 days to decide if you love them. If you don't, you walk away owing nothing."
  }];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    id: "how",
    style: {
      borderTop: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      marginBottom: 64
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "How it works"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 600,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      margin: '0 0 20px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "From \"I need help\" to \"they just started\" in about two weeks or less."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.55,
      color: '#3A322D',
      margin: 0,
      maxWidth: 660
    }
  }, "Four steps. No deposit, no setup fee, and you don't pay a dollar until day 31.")), /*#__PURE__*/React.createElement("ol", {
    className: "step-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24,
      listStyle: 'none',
      margin: '0 0 56px',
      padding: 0,
      counterReset: 'step'
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      position: 'relative',
      padding: '32px 24px',
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      paddingBottom: 14,
      borderBottom: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 38,
      fontWeight: 600,
      color: '#B8512C',
      lineHeight: 1,
      letterSpacing: '-0.025em'
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 22,
    color: "#3A322D"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 22,
      fontWeight: 600,
      margin: 0,
      color: '#1F1A17',
      lineHeight: 1.2,
      letterSpacing: '-0.015em'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.6,
      margin: 0,
      color: '#3A322D'
    }
  }, s.body)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Start With a Discovery Call"), /*#__PURE__*/React.createElement(CTAMicrocopy, null))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 1100px) { .step-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .step-grid { grid-template-columns: 1fr !important; } }
      `));
}
window.HowItWorks = HowItWorks;
// --- components/Pricing.jsx
// Section 5: Pricing & Offer Stack — the conversion centerpiece
function Pricing() {
  const stack = [{
    label: 'Senior support agent salary (full-time, dedicated to you)',
    value: '$3,500/mo'
  }, {
    label: 'Hiring and screening through the TraitX Framework',
    value: '$4,500 one-time, monthly value $375/mo'
  }, {
    label: 'Placement and onboarding into your business',
    value: '$1,500 one-time'
  }, {
    label: 'Training in your support process',
    value: '$750 one-time'
  }, {
    label: 'Training and certification in AI-powered support tools',
    value: '$1,500 one-time'
  }, {
    label: 'Payroll services (paying salaries, light HR, time off)',
    value: '$300/mo'
  }, {
    label: 'Culture and engagement (team-building, swag, gifts, anniversaries)',
    value: '$200/mo'
  }, {
    label: 'Dedicated account manager (leads and supports your agent)',
    value: '$1,200/mo'
  }, {
    label: 'Ongoing performance management and coaching',
    value: '$500/mo'
  }];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper-2",
    padding: "lg",
    id: "pricing"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Pricing & offer stack"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 600,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      margin: '0 0 28px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "$3,900/mo, all-in. Here's what's actually inside that number."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18,
      lineHeight: 1.6,
      color: '#3A322D',
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 20px'
    }
  }, "A senior support hire in the US costs $80,000 to $100,000+ per year once you add benefits, taxes, payroll, equipment, hiring fees, and management costs. That's $6,600 to $8,300+ per month, before you've trained them or built any team culture around them."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "We give you the same level of talent (senior, AI-trained, dedicated to your business) for $3,900/mo, with everything below included. About half the cost of a local hire. And we handle managing them."))), /*#__PURE__*/React.createElement("div", {
    className: "offer-stack-table",
    style: {
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 0,
      padding: '20px 32px',
      background: '#EFE8DD',
      borderBottom: '1px solid #D9CFBF',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#6B5F56'
    }
  }, /*#__PURE__*/React.createElement("div", null, "What's included"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Standalone value")), stack.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 24,
      padding: '20px 32px',
      borderBottom: '1px solid #D9CFBF',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.45,
      color: '#1F1A17',
      display: 'flex',
      gap: 14,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "#3A6B4E",
    stroke: 2,
    style: {
      position: 'relative',
      top: 2
    }
  }), /*#__PURE__*/React.createElement("span", null, row.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 14,
      color: '#3A322D',
      textAlign: 'right',
      lineHeight: 1.45
    }
  }, row.value))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 24,
      padding: '24px 32px',
      background: '#EFE8DD',
      borderBottom: '1px solid #D9CFBF',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      fontWeight: 600,
      color: '#1F1A17'
    }
  }, "Total monthly value"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 15,
      fontWeight: 500,
      color: '#1F1A17',
      textAlign: 'right'
    }
  }, "$6,075/mo + $8,250 in one-time costs absorbed")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 24,
      padding: '24px 32px',
      borderBottom: '1px solid #D9CFBF',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 17,
      fontWeight: 600,
      color: '#1F1A17'
    }
  }, "What a similar in-house hire would cost (all in)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 15,
      fontWeight: 500,
      color: '#1F1A17',
      textAlign: 'right'
    }
  }, "$6,600 to $8,300+/mo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 24,
      padding: '32px',
      background: '#F0D9A8',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 24,
      fontWeight: 600,
      color: '#1F1A17',
      letterSpacing: '-0.015em'
    }
  }, "Your price"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 32,
      fontWeight: 600,
      color: '#B8512C',
      textAlign: 'right',
      letterSpacing: '-0.025em',
      lineHeight: 1
    }
  }, "$3,900/mo"))), /*#__PURE__*/React.createElement("div", {
    className: "offer-stack-cards",
    style: {
      display: 'none',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 48
    }
  }, stack.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "#3A6B4E",
    stroke: 2,
    style: {
      position: 'relative',
      top: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.45,
      color: '#1F1A17',
      fontWeight: 500
    }
  }, row.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 13,
      color: '#6B5F56',
      paddingLeft: 28
    }
  }, row.value))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#EFE8DD',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: '#1F1A17',
      marginBottom: 6
    }
  }, "Total monthly value"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 13,
      color: '#3A322D'
    }
  }, "$6,075/mo + $8,250 in one-time costs absorbed")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#EFE8DD',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: '#1F1A17',
      marginBottom: 6
    }
  }, "What a similar in-house hire would cost (all in)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 13,
      color: '#3A322D'
    }
  }, "$6,600 to $8,300+/mo")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F0D9A8',
      border: '1px solid #B7A993',
      borderRadius: 12,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 20,
      fontWeight: 600,
      color: '#1F1A17',
      marginBottom: 6
    }
  }, "Your price"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 32,
      fontWeight: 600,
      color: '#B8512C',
      letterSpacing: '-0.025em',
      lineHeight: 1
    }
  }, "$3,900/mo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: '40px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      alignItems: 'center'
    },
    className: "pricing-block"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 36,
      fontWeight: 600,
      color: '#1F1A17',
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
      marginBottom: 24
    }
  }, "$3,900/mo per full-time agent."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['No deposit', 'No setup fee', 'No long-term contract, month-to-month', 'About half the cost of a senior, AI-trained support agent hired locally', 'Pay nothing for the first 30 days (see guarantee)'].map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      fontSize: 16,
      lineHeight: 1.5,
      color: '#1F1A17',
      fontFamily: "'IBM Plex Sans', sans-serif"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "#3A6B4E",
    stroke: 2,
    style: {
      marginTop: 4
    }
  }), /*#__PURE__*/React.createElement("span", null, b))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement(CTAMicrocopy, null)))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 760px) {
          .offer-stack-table { display: none !important; }
          .offer-stack-cards { display: flex !important; }
          .pricing-block { grid-template-columns: 1fr !important; gap: 32px !important; padding: 28px !important; }
        }
      `));
}
window.Pricing = Pricing;
// --- components/Testimonials.jsx
// Section 6: Social Proof — testimonials grid
const TESTIMONIALS = [{
  name: 'John Carbone',
  role: 'Founder',
  company: 'Bonify',
  file: 'images/john-carbone-bonify.webp',
  tone: 'clay',
  pull: "I forget they're technically not in-house. They truly are part of the Bonify team.",
  full: "Working with xFusion led to a monumental improvement in our customer experience. They found us the perfect reps with complete alignment to our mission, and they've handled the vast majority of our tickets while maintaining a 4.9 customer satisfaction score on Shopify since May 2020."
}, {
  name: 'Derrick Reimer',
  role: 'Founder',
  company: 'SavvyCal',
  file: 'images/derrick-reimer-savvycal.webp',
  tone: 'forest',
  pull: 'I was admittedly skeptical at first. They proved my skepticism unwarranted.',
  full: "As a founder busy building and marketing my product, I wanted a partner I could trust to train and manage dedicated reps as an extension of my team. This is not your stereotypical outsourced support agency. They've cut our average response time by 84.79% and freed me up to focus on running the business."
}, {
  name: 'Toby Marsden',
  role: 'Founder',
  company: 'Ordered Magic',
  file: 'images/toby-marsden-ordered-magic.webp',
  tone: 'butter',
  pull: 'I thought my life was going to become a living hell. It was extraordinary instead.',
  full: 'I was sure outsourcing would mean dropped tickets, the wrong tone, and an exploding workload. None of that happened. The xFusion team grew from one dedicated agent to two full-time and a part-time weekend agent, and the entire way I think about the future of my business has changed.'
}, {
  name: 'Dov Kaufmann',
  role: 'COO',
  company: 'Tolstoy',
  file: 'images/dov-kaufmann-tolstoy.webp',
  tone: 'clay',
  pull: 'An absolute game-changer. We grow faster and more professionally than we ever could alone.',
  full: "Working with the xFusion team enabled us to scale customer support from a single agent to a six-person team handling Tier 1 and Tier 2 work. The partnership has been so valuable that our Shopify app ranking jumped 90 points after a wave of 5-star reviews tied to better support. I can't praise the team enough."
}, {
  name: 'Claire Fundingsland',
  role: 'Head of Customer Experience',
  company: 'SkyFi',
  file: 'images/claire-fundingsland-skyfi.webp',
  tone: 'forest',
  pull: 'They never leave a customer interaction unresolved.',
  full: "xFusion's emphasis on customer satisfaction has been such an asset. Their team is thorough and adapts and learns quickly, helping us maintain a 91.9% customer satisfaction score with an average response time of 36 minutes across a global, 24/7 customer base."
}, {
  name: 'Tom Foster',
  role: 'Director of Sales',
  company: 'TheReceptionist',
  file: 'images/tom-foster-thereceptionist.webp',
  tone: 'paper',
  pull: 'Attentive. Hire the best people. We see no reason to stop.',
  full: "When we first met with Jim and David, we were immediately struck by their values and commitment to their employees, which meshed with ours completely. Over years of working together they've helped us hit a 98.9% CSAT rating, and we've expanded the partnership several times. If you're looking for an outsourced solution, I highly recommend the team at xFusion."
}];
function Testimonials() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "butter",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "#7a5a10"
  }, "Social proof"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 600,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      margin: '0 0 24px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "Six years. 100+ support placements. Clients who treat our agents like family."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.55,
      color: '#3A322D',
      margin: 0,
      maxWidth: 720
    }
  }, "We've been doing this since 2020 for software companies, online stores, B2B brands, consumer brands, and local service businesses. The same thing comes up in every relationship: clients tell us they forget our agents aren't in-house. That's the bar.")), /*#__PURE__*/React.createElement("div", {
    className: "t-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      marginBottom: 56
    }
  }, TESTIMONIALS.map((t, i) => /*#__PURE__*/React.createElement("figure", {
    key: i,
    style: {
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      padding: 32,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(PhotoCircle, {
    name: t.name,
    tone: t.tone,
    size: 72,
    file: t.file,
    alt: `${t.name}, ${t.role} at ${t.company}`
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: "'Source Serif 4', serif",
      fontStyle: 'italic',
      fontSize: 20,
      lineHeight: 1.3,
      color: '#1F1A17',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      textWrap: 'pretty'
    }
  }, "\"", t.pull, "\""), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      lineHeight: 1.6,
      color: '#3A322D'
    }
  }, t.full), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 'auto',
      paddingTop: 18,
      borderTop: '1px solid #D9CFBF',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#6B5F56'
    }
  }, t.name, " · ", t.role, " · ", t.company)))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 32,
      borderTop: '1px solid rgba(31,26,23,0.12)',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px 32px',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, ['Tolstoy', 'SavvyCal', 'Bonify', 'Ordered Magic', 'TheReceptionist', 'SkyFi', 'Revy'].map(name => /*#__PURE__*/React.createElement("span", {
    key: name,
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: '#3A322D',
      opacity: 0.7
    }
  }, name)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement(CTAMicrocopy, null))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 1100px) { .t-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 700px) { .t-grid { grid-template-columns: 1fr !important; } }
      `));
}
window.Testimonials = Testimonials;
// --- components/CaseStudies.jsx
// Section 7: Case Study Spotlights
function CaseStudies() {
  const cards = [{
    client: 'Tolstoy',
    slug: 'case-studies/tolstoy/',
    person: 'Dov Kaufmann',
    tone: 'clay',
    file: 'images/dov-kaufmann-tolstoy.webp',
    role: 'COO of Tolstoy',
    headline: 'Rose 90 spots in Shopify rankings. Grew faster and more professionally than they could have alone.',
    body: 'Tolstoy was growing fast and needed support that could keep up. Our team learned their tools, took over tickets and reviews, and freed up their leaders to focus on building the product.'
  }, {
    client: 'SavvyCal',
    slug: 'case-studies/savvycal/',
    person: 'Derrick Reimer',
    tone: 'forest',
    file: 'images/derrick-reimer-savvycal.webp',
    role: 'Founder of SavvyCal',
    headline: 'A doubter changes his mind. "This is not your stereotypical outsourced support agency."',
    body: "Derrick Reimer didn't believe in outsourcing. Our senior agents earned his trust by handling SavvyCal's tricky product support with the same brand voice and judgment as an in-house team."
  }, {
    client: 'Bonify',
    slug: 'case-studies/bonify/',
    person: 'John Carbone',
    tone: 'butter',
    file: 'images/john-carbone-bonify.webp',
    role: 'Founder of Bonify',
    headline: 'Out of "support hell" and back to working ON the business.',
    body: 'John Carbone was buried in tickets and stuck working in his business instead of on it. Our placement absorbed the day-to-day support load and gave him his time back almost immediately.'
  }];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    id: "case-studies",
    style: {
      borderTop: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Case studies"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 600,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      margin: '0 0 20px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "What this looks like in practice."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.55,
      color: '#3A322D',
      margin: 0
    }
  }, "Three quick snapshots. The full case studies have the metrics, the timelines, and the client quotes.")), /*#__PURE__*/React.createElement("div", {
    className: "cs-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      marginBottom: 40
    }
  }, cards.map((c, i) => /*#__PURE__*/React.createElement(CaseCard, {
    key: i,
    ...c
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "case-studies/",
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      fontWeight: 500,
      color: '#B8512C',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, "See all case studies", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 18
  })))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 1000px) { .cs-grid { grid-template-columns: 1fr !important; } }
      `));
}
function CaseCard({
  client,
  slug,
  person,
  tone,
  file,
  role,
  headline,
  body
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: '#F7F2EB',
      border: '1px solid #D9CFBF',
      borderRadius: 12,
      overflow: 'hidden',
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: hover ? '0 2px 8px rgba(31,26,23,0.05)' : 'none',
      transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 24px 0'
    }
  }, /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    name: person,
    label: client,
    tone: tone,
    ratio: "3/2",
    file: file,
    alt: role ? `${person}, ${role}` : person
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#6B5F56'
    }
  }, client), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 22,
      fontWeight: 600,
      margin: 0,
      color: '#1F1A17',
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
      textWrap: 'balance'
    }
  }, headline), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 15,
      lineHeight: 1.6,
      margin: 0,
      color: '#3A322D'
    }
  }, body), /*#__PURE__*/React.createElement("a", {
    href: slug,
    style: {
      marginTop: 'auto',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      color: '#B8512C',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, "Read the case study", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 16
  }))));
}
window.CaseStudies = CaseStudies;
// --- components/Chatbot.jsx
// Section 8: Why Not Just a Chatbot — dark Forest section for visual contrast
function Chatbot() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "#F0D9A8"
  }, "AI alone is not enough"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 600,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      margin: '0 0 48px',
      color: '#F7F2EB',
      textWrap: 'balance'
    }
  }, "AI alone breaks on the calls that matter most."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 24,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.65,
      color: '#F7F2EB',
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: '#F7F2EB'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 64,
      fontWeight: 600,
      color: '#B8512C',
      float: 'left',
      lineHeight: 0.9,
      marginRight: 16,
      marginTop: 4,
      letterSpacing: '-0.025em'
    }
  }, "60%"), "AI on its own handles the easy 60% of support pretty well. Password resets, status checks, basic how-tos. That's real value, and we use AI tools too."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      paddingTop: 16,
      borderTop: '1px solid rgba(247,242,235,0.18)',
      color: '#F7F2EB'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 64,
      fontWeight: 600,
      color: '#B8512C',
      float: 'left',
      lineHeight: 0.9,
      marginRight: 16,
      marginTop: 4,
      letterSpacing: '-0.025em'
    }
  }, "40%"), "The hard 40% is where chatbot-only setups fall apart. The angry customer who needs to feel heard before they'll listen. The weird case the bot has never seen. The judgment call that takes reading between the lines of a long, frustrated email. The customer who almost left, but didn't, because someone took the time to make it right."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      paddingTop: 24,
      borderTop: '1px solid rgba(247,242,235,0.18)',
      color: '#F7F2EB',
      fontSize: 21
    }
  }, "That's where humans matter. And that's where xFusion fits. Our senior agents use AI as a tool, not a replacement. AI handles the repeat work. People handle the moments that decide if a customer becomes a fan or asks for a refund."))));
}
window.Chatbot = Chatbot;
// --- components/Guarantee.jsx
// Section 9: Guarantee
function Guarantee() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "butter-strong",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 40,
      alignItems: 'flex-start'
    },
    className: "guarantee-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      height: 120,
      borderRadius: 999,
      background: '#F7F2EB',
      border: '1px solid #B7A993',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    className: "guarantee-badge"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "badge",
    size: 56,
    color: "#B8512C",
    stroke: 1.5
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "#7a5a10"
  }, "The guarantee"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(34px, 4.4vw, 56px)',
      fontWeight: 600,
      lineHeight: 1.06,
      letterSpacing: '-0.025em',
      margin: '0 0 28px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "30-Day Risk-Free Trial"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.65,
      color: '#1F1A17',
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 20px'
    }
  }, "We find, screen, and place a senior support agent in your business. You work with them for 30 full days. If you're not happy for any reason, you walk away and pay nothing. No deposit. No setup fee. Nothing. We eat every dollar we spent on hiring, screening, and training. That's how sure we are."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "'Source Serif 4', serif",
      fontSize: 22,
      fontStyle: 'italic',
      lineHeight: 1.45,
      color: '#1F1A17',
      paddingLeft: 20,
      borderLeft: '2px solid #B8512C'
    }
  }, "You decide if you're happy. No rules, no fine print.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book My Free Discovery Call"), /*#__PURE__*/React.createElement(CTAMicrocopy, {
    color: "#3A322D"
  }))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 700px) {
          .guarantee-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .guarantee-badge { width: 88px !important; height: 88px !important; }
        }
      `));
}
window.Guarantee = Guarantee;
// --- components/FAQ.jsx
// Section 10: FAQ — accordion with 14 questions
const FAQ_ITEMS = [{
  q: 'Will they speak good English?',
  a: "Every candidate sits through interviews with a real person where we check English skills, how they talk, and how they come across. Before you meet with anyone, you'll watch a Zoom recording of them, so you can judge for yourself instead of taking our word for it."
}, {
  q: "What if the placement doesn't work out?",
  a: "That's exactly what the 30-Day Risk-Free Trial is for. We recruit, vet, and place a senior, AI-trained customer support agent in your business. You work with them for 30 full days. If you're not satisfied for any reason, you walk away without paying anything. Not a deposit. Not a setup fee. Nothing. We absorb every dollar of recruiting, vetting, training, and placement we invested."
}, {
  q: 'Why is $3,900/mo the right price?',
  a: "Two reasons. First, every agent we place is senior, with more experience than a typical support hire, and trained to use AI tools to handle the easy stuff. So one xFusion agent does a lot more work than a junior rep at a cheaper agency. The cost per ticket is actually lower. Second, $3,900 is about half what you'd pay for the same kind of person in the U.S., and it includes hiring, training, payroll, culture, and an account manager. No add-ons. No setup fees. No deposits."
}, {
  q: 'How long does the process take?',
  a: 'About 14 days from your discovery call to a candidate list in your inbox. We keep a pool of senior, AI-trained support candidates ready to go, which is why we can move that fast without cutting corners.'
}, {
  q: 'Do you handle payroll and HR?',
  a: "Yes, and it's part of the $3,900/mo. xFusion handles paying salaries, light HR, and time off. Your agent is hired as an independent contractor and managed by us, so you don't have to deal with international payroll. xFusion is not an Employer of Record, and the agent isn't your employee. We handle the paperwork so the setup stays simple."
}, {
  q: 'What roles can you fill?',
  a: "Customer support, mostly. Every support agent we place is senior, trained to use AI, and able to handle Tier 1, Tier 2, and some cases that used to need an engineer's help. We also place inside sales people who work inbound leads (not cold calling) and AI operators who run AI tools alongside your team. If you need a different kind of role, ask on the discovery call. We'll be honest about whether we can help."
}, {
  q: 'Where does your talent come from?',
  a: "Mostly the Philippines, with a strong group from Kenya. Since 2020 we've built deep networks in both countries and learned which candidates actually thrive in long-term support roles. Both markets have strong English-speaking professionals who treat support as a real career, not a stepping-stone."
}, {
  q: 'Is there a long-term contract?',
  a: "No. The service is month-to-month with no minimum term. There's no deposit, no setup fee, and no fine print. The 30-Day Risk-Free Trial is the strongest expression of that: pay nothing for the first month, walk away free if it's not a fit."
}, {
  q: 'Do you replace American jobs?',
  a: 'No. Our work helps American small businesses keep growing and keep hiring at home where it matters most. Most of our clients use us for support jobs that are hard to fill at U.S. wages. Filling those jobs overseas lets owners spend more on the core jobs where U.S. hiring makes sense.'
}, {
  q: 'Why not just hire locally for support work?',
  a: 'Senior support reps in the U.S. who know AI cost $80,000 to $100,000+ per year, take months to find, and often quit within 18 months. With xFusion, you get a senior, AI-trained agent for about half that cost, with the culture work built in to keep them around long-term. You also skip the search, the training, the payroll setup, and the culture work. We handle all of it.'
}, {
  q: 'What about after-hours coverage?',
  a: "Your placed agent works full-time hours, just like any team member. Because they're based in the Philippines or Kenya, you have room to structure coverage however you want. Some clients align the agent to U.S. business hours. Others stagger shifts to cover evenings or weekends. Some build a team that covers around the clock. You pick the schedule; we handle the management."
}, {
  q: 'How do I keep a remote team member engaged long-term?',
  a: "This is one of the most common worries we hear, which is why Culture & Engagement is included in the $3,900/mo. We run virtual and in-person team-building events, contests, branded swag, birthday and anniversary gifts, and structured holiday gifting. Pair that with a role that pays a real living wage in the agent's local economy, and you get someone who builds a career on your team rather than rotating through."
}, {
  q: 'Why not just use a chatbot?',
  a: "AI on its own handles the easy 60% of support work well. The hard 40% (angry customers, weird cases, judgment calls, sensitive issues) is where chatbot-only setups break, often in public. xFusion's senior agents use AI as a tool, not a replacement. They let AI handle the easy stuff and step in for the moments that matter. You get the speed of AI plus the judgment and warmth of a person, instead of picking one and living with the limits."
}, {
  q: 'What does "AI-trained" actually mean in practice?',
  a: "It means your agent is trained to use AI tools (like Claude Code, Claude Cowork, and others) every day. They write replies with AI's help, sort and route tickets with AI, and oversee AI tools that handle the routine, high-volume cases. Their experience tells them when to trust what AI gives them and when to step in. The result: one person handling far more work than they could alone, without giving up the quality and warmth your customers expect."
}];
function FAQ() {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement(Section, {
    bg: "paper",
    padding: "lg",
    id: "faq",
    style: {
      borderTop: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Frequently asked"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(32px, 4.2vw, 52px)',
      fontWeight: 600,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      margin: '0 0 20px',
      color: '#1F1A17',
      textWrap: 'balance'
    }
  }, "Questions we get on every Discovery Call."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.55,
      color: '#3A322D',
      margin: 0
    }
  }, "The fourteen most common questions about how this works, the talent, the AI part, the pricing, and what happens if it doesn't work out.")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #D9CFBF'
    }
  }, FAQ_ITEMS.map((it, i) => /*#__PURE__*/React.createElement(FAQRow, {
    key: i,
    ...it,
    isOpen: open === i,
    onToggle: () => setOpen(open === i ? -1 : i)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement(CTAMicrocopy, null))));
}
function FAQRow({
  q,
  a,
  isOpen,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid #D9CFBF'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-expanded": isOpen,
    style: {
      width: '100%',
      background: 'transparent',
      border: 'none',
      padding: '24px 4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24,
      textAlign: 'left',
      cursor: 'pointer',
      fontFamily: "'Source Serif 4', serif",
      fontSize: 21,
      fontWeight: 600,
      color: '#1F1A17',
      letterSpacing: '-0.01em',
      lineHeight: 1.3
    }
  }, /*#__PURE__*/React.createElement("span", null, q), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 999,
      border: '1px solid #B7A993',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1F1A17',
      flexShrink: 0,
      transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)',
      background: isOpen ? '#1F1A17' : 'transparent',
      borderColor: isOpen ? '#1F1A17' : '#B7A993'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: isOpen ? 'minus' : 'plus',
    size: 14,
    color: isOpen ? '#F7F2EB' : '#1F1A17',
    stroke: 2
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: isOpen ? 600 : 0,
      overflow: 'hidden',
      transition: 'max-height 400ms cubic-bezier(0.4,0,0.6,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 4px 28px',
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.65,
      color: '#3A322D',
      maxWidth: 680
    }
  }, a)));
}
window.FAQ = FAQ;
// --- components/FinalCTA.jsx
// Section 11: Final CTA — forest band
function FinalCTA() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "forest",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 720,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "#F0D9A8"
  }, "One last thing"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(36px, 5vw, 64px)',
      fontWeight: 600,
      lineHeight: 1.04,
      letterSpacing: '-0.025em',
      margin: '0 0 32px',
      color: '#F7F2EB',
      textWrap: 'balance'
    }
  }, "You've read this far for a reason."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 19,
      lineHeight: 1.65,
      color: '#F7F2EB',
      margin: '0 auto 40px',
      textWrap: 'pretty',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 20px',
      color: '#F7F2EB'
    }
  }, "Something about your support setup isn't okay right now. Maybe it's the late-night tickets. Or the customer satisfaction score you don't want to look at. Or the team member you can tell is heading for burnout. Or maybe it's just the quiet feeling that you're spending your best hours on the wrong work."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 20px',
      color: '#F7F2EB'
    }
  }, "A 30-minute Discovery Call is the easiest next step you can take. No pitch deck. No pressure. We talk about what's actually broken, whether we're a fit, and what a senior, AI-trained agent could look like on your team. If we're not the right answer, we'll tell you and point you somewhere better."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: '#F7F2EB'
    }
  }, "If we are the right answer, you've got a 30-Day Risk-Free Trial waiting on the other side of it. You don't pay until you're sure.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "on-dark",
    size: "lg",
    href: "/book/"
  }, "Book a Discovery Call"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      lineHeight: 1.5,
      color: '#F7F2EB',
      opacity: 0.85,
      marginTop: 14
    }
  }, "30 minutes. No commitment. No credit card. Just a conversation.")))));
}
window.FinalCTA = FinalCTA;
// --- components/Footer.jsx
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
// --- (inline)
function App() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Problem, null), /*#__PURE__*/React.createElement(Solution, null), /*#__PURE__*/React.createElement(WhoWeHelp, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(CaseStudies, null), /*#__PURE__*/React.createElement(Chatbot, null), /*#__PURE__*/React.createElement(Guarantee, null), /*#__PURE__*/React.createElement(FAQ, null), /*#__PURE__*/React.createElement(FinalCTA, null)), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));