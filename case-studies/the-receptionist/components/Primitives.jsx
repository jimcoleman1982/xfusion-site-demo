// Shared primitives — Container, Section, Eyebrow, Button, PhotoFrame, Icon

const { useState, useEffect } = React;

function Container({ children, narrow = false, style = {} }) {
  return (
    <div style={{
      maxWidth: narrow ? 720 : 1200,
      margin: '0 auto',
      padding: '0 24px',
      ...style,
    }}>{children}</div>
  );
}

function Section({ children, bg = 'paper', padding = 'lg', style = {} }) {
  const bgs = {
    paper: '#F7F2EB',
    'paper-2': '#EFE8DD',
    butter: '#F8EBC9',
    'butter-warm': '#F0D9A8',
    forest: '#2C4A3E',
    ink: '#1F1A17',
  };
  const pads = { sm: '40px 0', md: '64px 0', lg: '96px 0', xl: '128px 0' };
  return (
    <section style={{ background: bgs[bg], padding: pads[padding], ...style }}>
      {children}
    </section>
  );
}

function Eyebrow({ children, color = '#6B5F56', mono = false }) {
  return (
    <div style={{
      fontFamily: mono ? "'JetBrains Mono', monospace" : "'IBM Plex Sans', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: mono ? '0.16em' : '0.14em',
      color,
      marginBottom: 16,
    }}>{children}</div>
  );
}

function Button({ children, variant = 'primary', size = 'md', onClick, style = {}, as = 'button', href, target, rel }) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13 },
    md: { padding: '12px 20px', fontSize: 15 },
    lg: { padding: '16px 28px', fontSize: 16 },
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
        lineHeight: 1,
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)',
        transform: pressed ? 'translateY(1px)' : 'translateY(0)',
        ...sizes[size],
        ...style,
      }}
    >{children}</Tag>
  );
}

// PhotoFrame — renders real <img> when src is provided, otherwise placeholder
function PhotoFrame({ name = 'Tom Foster', role, tone = 'forest', ratio = '4/5', label = 'Photo placeholder', src = '../../images/tom-foster-thereceptionist.png', alt }) {
  const [errored, setErrored] = useState(false);

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={alt || (role ? `${name}, ${role}` : name)}
        loading="lazy"
        onError={() => setErrored(true)}
        style={{
          width: '100%',
          aspectRatio: ratio,
          objectFit: 'cover',
          borderRadius: 12,
          display: 'block',
          border: '1px solid rgba(31,26,23,0.06)',
        }}
      />
    );
  }

  const tones = {
    clay:   { bg: 'linear-gradient(140deg, #C9613B 0%, #8E3F1D 100%)', fg: '#F0D9A8', accent: 'rgba(247,242,235,0.18)' },
    forest: { bg: 'linear-gradient(140deg, #355A4B 0%, #1E342B 100%)', fg: '#F0D9A8', accent: 'rgba(247,242,235,0.16)' },
    butter: { bg: 'linear-gradient(140deg, #F0D9A8 0%, #D9BC79 100%)', fg: '#1F1A17', accent: 'rgba(31,26,23,0.10)' },
    paper:  { bg: 'linear-gradient(140deg, #EFE8DD 0%, #D9CFBF 100%)', fg: '#3A322D', accent: 'rgba(31,26,23,0.08)' },
  };
  const t = tones[tone];
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return (
    <div style={{
      aspectRatio: ratio,
      borderRadius: 12,
      background: t.bg,
      display: 'flex',
      alignItems: 'flex-end',
      padding: 22,
      position: 'relative',
      overflow: 'hidden',
      color: t.fg,
      width: '100%',
    }}>
      {/* Soft circles for visual texture */}
      <div style={{
        position: 'absolute', top: '-30%', right: '-10%',
        width: '80%', aspectRatio: '1',
        borderRadius: '50%',
        background: t.accent,
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', left: '-15%',
        width: '60%', aspectRatio: '1',
        borderRadius: '50%',
        background: t.accent,
        opacity: 0.6,
      }} />
      <div style={{
        position: 'absolute',
        top: 22, right: 22,
        fontFamily: "'Source Serif 4', serif",
        fontSize: 'clamp(56px, 14%, 96px)',
        opacity: 0.4,
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>{initials}</div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          opacity: 0.75,
          marginBottom: 6,
          fontFamily: "'JetBrains Mono', monospace",
        }}>{label}</div>
        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 22,
          lineHeight: 1.2,
          marginBottom: role ? 2 : 0,
        }}>{name}</div>
        {role ? (
          <div style={{
            fontSize: 12,
            opacity: 0.85,
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>{role}</div>
        ) : null}
      </div>
    </div>
  );
}

// Lucide icon helper
const Icons = {
  arrowRight: <g><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></g>,
  arrowLeft: <g><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></g>,
  check: <path d="M20 7L9 18l-5-5"/>,
  quote: <g><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></g>,
  menu: <g><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></g>,
  x: <g><path d="M18 6L6 18"/><path d="M6 6l12 12"/></g>,
  chevronRight: <path d="M9 18l6-6-6-6"/>,
};

function Icon({ name, size = 20, color = 'currentColor', stroke = 1.75, fill = 'none', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
         stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0, display: 'inline-block', ...style }}>
      {Icons[name] || null}
    </svg>
  );
}

Object.assign(window, { Container, Section, Eyebrow, Button, PhotoFrame, Icon });
