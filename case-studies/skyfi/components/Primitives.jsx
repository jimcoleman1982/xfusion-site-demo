// Shared primitives — Container, Section, Eyebrow, Button, Icon

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

function Section({ children, bg = 'paper', padding = 'lg', style = {}, id }) {
  const bgs = {
    paper: '#F7F2EB',
    'paper-2': '#EFE8DD',
    butter: '#F8EBC9',
    'butter-soft': '#FBF1D9',
    forest: '#2C4A3E',
  };
  const pads = { sm: '48px 0', md: '72px 0', lg: '96px 0', xl: '128px 0' };
  return (
    <section id={id} style={{ background: bgs[bg], padding: pads[padding], ...style }}>
      {children}
    </section>
  );
}

function Eyebrow({ children, color = '#6B5F56', mono = false, style = {} }) {
  return (
    <div style={{
      fontFamily: mono
        ? "'JetBrains Mono', ui-monospace, monospace"
        : "'IBM Plex Sans', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color,
      marginBottom: 16,
      ...style,
    }}>{children}</div>
  );
}

function Button({ children, variant = 'primary', size = 'md', onClick, style = {}, as = 'a', href = '#' }) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13 },
    md: { padding: '12px 20px', fontSize: 15 },
    lg: { padding: '16px 26px', fontSize: 16 },
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
    bg = hover ? 'rgba(247,242,235,0.08)' : 'transparent';
    color = '#F7F2EB';
    border = '1px solid rgba(247,242,235,0.4)';
  } else if (variant === 'on-dark') {
    bg = hover ? '#F0D9A8' : '#F7F2EB';
    color = '#1F1A17';
    border = 'none';
  }

  const Tag = as;
  return (
    <Tag
      href={as === 'a' ? href : undefined}
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
        transform: pressed ? 'translateY(1px)' : 'translateY(0)',
        transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)',
        ...sizes[size],
        ...style,
      }}
    >{children}</Tag>
  );
}

const IconPaths = {
  arrow:    <g><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></g>,
  arrowLeft: <g><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></g>,
  quote:    <g><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></g>,
  hourglass: <g><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></g>,
  check:    <path d="M20 7L9 18l-5-5"/>,
  menu:     <g><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></g>,
  x:        <g><path d="M18 6L6 18"/><path d="M6 6l12 12"/></g>,
};

function Icon({ name, size = 20, color = 'currentColor', stroke = 1.75, fill = 'none', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
         stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0, display: 'inline-block', ...style }}>
      {IconPaths[name] || null}
    </svg>
  );
}

// Portrait — renders real <img> when src is provided, otherwise warm placeholder.
function PortraitPlaceholder({ name = 'Claire Fundingsland', src = '../../images/claire-fundingsland-skyfi.png', label, ratio = '4/5', tone = 'butter', size = 'md', alt }) {
  const [errored, setErrored] = useState(false);

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={alt || name}
        loading={size === 'lg' ? undefined : 'lazy'}
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
    clay:   { bg: 'linear-gradient(150deg, #B8512C 0%, #8E3D1E 100%)', fg: '#F0D9A8', sub: '#F0D9A8' },
    forest: { bg: 'linear-gradient(150deg, #2C4A3E 0%, #1c3127 100%)', fg: '#F0D9A8', sub: '#D7E0DC' },
    butter: { bg: 'linear-gradient(150deg, #F0D9A8 0%, #E0C083 100%)', fg: '#1F1A17', sub: '#3A322D' },
    paper:  { bg: 'linear-gradient(150deg, #EFE8DD 0%, #D9CFBF 100%)', fg: '#1F1A17', sub: '#6B5F56' },
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
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
      color: t.fg,
      width: '100%',
    }}>
      <div style={{
        position: 'absolute',
        top: 18, right: 22,
        fontFamily: "'Source Serif 4', serif",
        fontSize: size === 'lg' ? 96 : 64,
        fontWeight: 400,
        opacity: 0.32,
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>{initials}</div>
      <div style={{ position: 'relative' }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          opacity: 0.75,
          marginBottom: 4,
          color: t.sub,
        }}>
          {label || (src ? src : 'Photo placeholder')}
        </div>
        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 18,
          lineHeight: 1.2,
          fontWeight: 500,
        }}>
          {name}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Container, Section, Eyebrow, Button, Icon, PortraitPlaceholder });
