// Shared primitives for xFusion marketing UI kit
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
    forest: '#2C4A3E',
  };
  const pads = { sm: '48px 0', md: '72px 0', lg: '96px 0' };
  return (
    <section style={{ background: bgs[bg], padding: pads[padding], ...style }}>
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
      letterSpacing: '0.12em',
      color,
      marginBottom: 16,
    }}>{children}</div>
  );
}

function Button({ children, variant = 'primary', size = 'md', onClick, style = {}, as = 'button' }) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13 },
    md: { padding: '12px 20px', fontSize: 15 },
    lg: { padding: '14px 24px', fontSize: 16 },
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

  const Tag = as;
  return (
    <Tag
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
        ...sizes[size],
        ...style,
      }}
    >{children}</Tag>
  );
}

// Photo placeholder — flat warm swatch with initials, used until real photos arrive
function PhotoPlaceholder({ name = 'Team', tone = 'clay', ratio = '4/5', label }) {
  const tones = {
    clay:   { bg: 'linear-gradient(135deg, #B8512C 0%, #A0451F 100%)', fg: '#F0D9A8' },
    forest: { bg: 'linear-gradient(135deg, #2C4A3E 0%, #243C32 100%)', fg: '#F0D9A8' },
    butter: { bg: 'linear-gradient(135deg, #F0D9A8 0%, #E6C683 100%)', fg: '#1F1A17' },
    paper:  { bg: 'linear-gradient(135deg, #EFE8DD 0%, #E6DCCB 100%)', fg: '#3A322D' },
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
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
      color: t.fg,
    }}>
      <div style={{
        position: 'absolute',
        top: 24, right: 24,
        fontFamily: "'Source Serif 4', serif",
        fontSize: 80,
        opacity: 0.35,
        lineHeight: 1,
      }}>{initials}</div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.7, marginBottom: 4 }}>
          {label || 'Photo placeholder'}
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 22, lineHeight: 1.2 }}>
          {name}
        </div>
      </div>
    </div>
  );
}

// Lucide icon helper — pulls from CDN sprite-style: just inline the path data we need
const Icons = {
  message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  users:   <g><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g>,
  check:   <path d="M20 7L9 18l-5-5"/>,
  arrow:   <g><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></g>,
  clock:   <g><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></g>,
  shield:  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  spark:   <g><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="M5.6 5.6l2.1 2.1"/><path d="M16.3 16.3l2.1 2.1"/><path d="M5.6 18.4l2.1-2.1"/><path d="M16.3 7.7l2.1-2.1"/></g>,
  chevron: <path d="M6 9l6 6 6-6"/>,
  menu:    <g><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></g>,
  x:       <g><path d="M18 6L6 18"/><path d="M6 6l12 12"/></g>,
  quote:   <g><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></g>,
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

Object.assign(window, { Container, Section, Eyebrow, Button, PhotoPlaceholder, Icon });
