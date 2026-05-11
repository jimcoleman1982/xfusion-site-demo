// Shared primitives — adapted from xFusion marketing UI kit
const { useState, useEffect, useRef } = React;

function Container({ children, narrow = false, style = {} }) {
  return (
    <div style={{
      maxWidth: narrow ? 760 : 1200,
      margin: '0 auto',
      padding: '0 24px',
      ...style,
    }}>{children}</div>
  );
}

function Section({ children, bg = 'paper', padding = 'lg', id, style = {} }) {
  const bgs = {
    paper: '#F7F2EB',
    'paper-2': '#EFE8DD',
    butter: '#F8EBC9',
    'butter-strong': '#F0D9A8',
    forest: '#2C4A3E',
  };
  const pads = { sm: '56px 0', md: '80px 0', lg: '112px 0' };
  return (
    <section id={id} style={{ background: bgs[bg], padding: pads[padding], ...style }}>
      {children}
    </section>
  );
}

function Eyebrow({ children, color = '#6B5F56' }) {
  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color,
      marginBottom: 18,
    }}>{children}</div>
  );
}

function Button({ children, variant = 'primary', size = 'md', onClick, style = {}, as = 'button', href, target, rel }) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13 },
    md: { padding: '12px 22px', fontSize: 15 },
    lg: { padding: '16px 28px', fontSize: 16 },
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

  const Tag = href ? 'a' : (as || 'button');
  const isExternal = href && /^https?:\/\//.test(href);
  const computedTarget = target || (isExternal ? '_blank' : undefined);
  const computedRel = rel || (isExternal ? 'noopener noreferrer' : undefined);
  const linkAttrs = href ? { href, target: computedTarget, rel: computedRel } : {};
  return (
    <Tag {...linkAttrs}
     
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
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
        ...style,
      }}
    >{children}</Tag>
  );
}

// Photo placeholder — renders a real <img> when `file` is provided,
// otherwise falls back to a flat warm swatch with a name label.
function PhotoPlaceholder({ name = 'Team', tone = 'clay', ratio = '4/5', label, file, alt }) {
  const [errored, setErrored] = useState(false);

  if (file && !errored) {
    return (
      <img
        src={file}
        alt={alt || name}
        loading="lazy"
        onError={() => setErrored(true)}
        style={{
          width: '100%',
          aspectRatio: ratio,
          objectFit: 'cover',
          borderRadius: 12,
          display: 'block',
          border: '1px solid #D9CFBF',
        }}
      />
    );
  }

  const tones = {
    clay:   { bg: '#B8512C', fg: '#F2D9CB', accent: '#F0D9A8' },
    forest: { bg: '#2C4A3E', fg: '#D7E0DC', accent: '#F0D9A8' },
    butter: { bg: '#F0D9A8', fg: '#7a5a10', accent: '#1F1A17' },
    paper:  { bg: '#E6DCCB', fg: '#6B5F56', accent: '#1F1A17' },
  };
  const t = tones[tone];
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return (
    <div style={{
      aspectRatio: ratio,
      borderRadius: 12,
      background: t.bg,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 28,
      position: 'relative',
      overflow: 'hidden',
      color: t.fg,
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        opacity: 0.75,
      }}>
        {label || 'Photo placeholder'}
      </div>
      <div style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: 'clamp(80px, 14vw, 160px)',
        opacity: 0.18,
        lineHeight: 0.85,
        position: 'absolute',
        right: 8,
        top: '20%',
        color: t.accent,
        fontWeight: 600,
      }}>{initials}</div>
      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 22, lineHeight: 1.2, color: t.accent, fontWeight: 500 }}>
          {name}
        </div>
      </div>
    </div>
  );
}

// Circular photo placeholder for testimonial cards. Renders a real <img>
// when `file` is provided.
function PhotoCircle({ name, tone = 'clay', size = 88, file, alt }) {
  const [errored, setErrored] = useState(false);

  if (file && !errored) {
    return (
      <img
        src={file}
        alt={alt || name}
        loading="lazy"
        onError={() => setErrored(true)}
        style={{
          width: size,
          height: size,
          borderRadius: 999,
          objectFit: 'cover',
          flexShrink: 0,
          border: '1px solid rgba(31,26,23,0.08)',
          display: 'block',
        }}
      />
    );
  }

  const tones = {
    clay:   { bg: '#B8512C', fg: '#F0D9A8' },
    forest: { bg: '#2C4A3E', fg: '#F0D9A8' },
    butter: { bg: '#F0D9A8', fg: '#7a5a10' },
    paper:  { bg: '#E6DCCB', fg: '#3A322D' },
  };
  const t = tones[tone];
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return (
    <div style={{
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
      border: '1px solid rgba(31,26,23,0.08)',
    }}>{initials}</div>
  );
}

// Lucide-style icons (1.5px stroke, rounded line caps)
const Icons = {
  // Section icons
  calendar:  <g><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></g>,
  users:     <g><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g>,
  check:     <path d="M20 6L9 17l-5-5"/>,
  arrow:     <g><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></g>,
  arrowRight:<path d="M7 17L17 7M17 7H8M17 7v9"/>,
  clock:     <g><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></g>,
  shield:    <g><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></g>,
  badge:     <g><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"/><path d="M9 12l2 2 4-4"/></g>,
  spark:     <g><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="M5.6 5.6l2.1 2.1"/><path d="M16.3 16.3l2.1 2.1"/><path d="M5.6 18.4l2.1-2.1"/><path d="M16.3 7.7l2.1-2.1"/></g>,
  filter:    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>,
  handshake: <g><path d="M11 17l-3-3 3-3"/><path d="M13 7l3 3-3 3"/><path d="M21 12H7"/><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"/></g>,
  chevron:   <path d="M6 9l6 6 6-6"/>,
  plus:      <g><path d="M12 5v14"/><path d="M5 12h14"/></g>,
  minus:     <path d="M5 12h14"/>,
  menu:      <g><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></g>,
  x:         <g><path d="M18 6L6 18"/><path d="M6 6l12 12"/></g>,
  // Social
  linkedin:  <g><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></g>,
  twitter:   <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2-3 0-6-2.5-6-5.5 1 .5 2 .5 3 0-3-1-5-4-5-7 1 .5 2 1 3 1-3-2-3-7 0-9 4 5 10 7.5 16 7-.7-3 1.2-6 4-6 1.5 0 3 .8 4 2 1-.2 2-.5 3-1z"/>,
  instagram: <g><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></g>,
  facebook:  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
  youtube:   <g><path d="M22.5 6.5a2.8 2.8 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2C1 8.3 1 12 1 12s0 3.7.5 5.5a2.8 2.8 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.5a2.8 2.8 0 0 0 2-2c.5-1.8.5-5.5.5-5.5s0-3.7-.5-5.5z"/><path d="M10 15l5-3-5-3z" fill="currentColor"/></g>,
  // Pillars / steps
  brainTrust:<g><circle cx="12" cy="8" r="4"/><path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M16 5l1.5 1.5L19 5" /></g>,
  layers:    <g><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/></g>,
  helping:   <g><path d="M9 11l3 3 7-7"/><path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2c2 0 4 .6 5.5 1.6"/></g>,
};

function Icon({ name, size = 20, color = 'currentColor', stroke = 1.6, fill = 'none', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
         stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0, display: 'inline-block', ...style }}>
      {Icons[name] || null}
    </svg>
  );
}

// CTA microcopy line, used under almost every primary CTA
function CTAMicrocopy({ children, color = '#6B5F56' }) {
  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 13,
      lineHeight: 1.5,
      color,
      marginTop: 14,
      maxWidth: 480,
    }}>{children || "30 minutes. No commitment. No credit card. You'll talk directly with our founding team."}</div>
  );
}

Object.assign(window, { Container, Section, Eyebrow, Button, PhotoPlaceholder, PhotoCircle, Icon, CTAMicrocopy });
