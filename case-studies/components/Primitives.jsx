// xFusion shared primitives — Container, Section, Eyebrow, Button, Icon, PhotoPlaceholder
const { useState, useEffect } = React;

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

function Section({ children, bg = 'paper', padding = 'lg', style = {} }) {
  const bgs = {
    paper: '#F7F2EB',
    'paper-2': '#EFE8DD',
    butter: '#F8EBC9',
    forest: '#2C4A3E',
    ink: '#1F1A17',
  };
  const pads = { sm: '40px 0', md: '64px 0', lg: '96px 0', xl: '120px 0' };
  return (
    <section style={{ background: bgs[bg], padding: pads[padding], ...style }}>
      {children}
    </section>
  );
}

function Eyebrow({ children, color = '#6B5F56', style = {} }) {
  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', sans-serif",
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

function Button({ children, variant = 'primary', size = 'md', onClick, style = {}, as = 'button', href, target, rel }) {
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
    bg = hover ? '#EFE8DD' : 'transparent';
    color = '#1F1A17';
    border = '1px solid transparent';
  } else if (variant === 'on-dark') {
    bg = pressed ? '#A0451F' : hover ? '#A0451F' : '#B8512C';
    color = '#F7F2EB';
    border = 'none';
  }

  const Tag = href ? 'a' : (as || 'button');
  const isExternal = href && /^https?:\/\//.test(href);
  const computedTarget = target || (isExternal ? '_blank' : undefined);
  const computedRel = rel || (isExternal ? 'noopener noreferrer' : undefined);
  const linkAttrs = href ? { href, target: computedTarget, rel: computedRel } : {};
  const tagProps = href ? { href } : {};

  return (
    <Tag {...linkAttrs}
      {...tagProps}
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
        transform: pressed ? 'translateY(1px)' : 'translateY(0)',
        transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)',
        ...sizes[size],
        ...style,
      }}
    >{children}</Tag>
  );
}

const LucideIcons = {
  'arrow-right': <g><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></g>,
  check: <path d="M20 7L9 18l-5-5"/>,
  quote: <g><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></g>,
  menu: <g><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></g>,
  x: <g><path d="M18 6L6 18"/><path d="M6 6l12 12"/></g>,
  twitter: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>,
  linkedin: <g><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></g>,
  youtube: <g><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></g>,
};

function Icon({ name, size = 20, color = 'currentColor', stroke = 1.75, fill = 'none', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
         stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0, display: 'inline-block', verticalAlign: '-0.15em', ...style }}>
      {LucideIcons[name] || null}
    </svg>
  );
}

// Warm-tone photo placeholder. Renders a real <img> when filePath resolves;
// otherwise falls back to a flat warm swatch with subject name and file path.
function PhotoPlaceholder({ name, filePath, tone = 'clay', ratio = '1/1', alt }) {
  const [errored, setErrored] = useState(false);

  if (filePath && !errored) {
    return (
      <img
        src={filePath}
        alt={alt || name}
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
    clay:   { bg: '#B8512C', accent: '#F0D9A8', soft: 'rgba(247,242,235,0.18)' },
    forest: { bg: '#2C4A3E', accent: '#F0D9A8', soft: 'rgba(247,242,235,0.18)' },
    butter: { bg: '#E6C683', accent: '#1F1A17', soft: 'rgba(31,26,23,0.10)' },
    rose:   { bg: '#C77A5A', accent: '#F8EBC9', soft: 'rgba(247,242,235,0.16)' },
    sand:   { bg: '#B7A993', accent: '#1F1A17', soft: 'rgba(31,26,23,0.08)' },
    olive:  { bg: '#5C6B4A', accent: '#F0D9A8', soft: 'rgba(247,242,235,0.16)' },
    rust:   { bg: '#923D1F', accent: '#F0D9A8', soft: 'rgba(247,242,235,0.16)' },
  };
  const t = tones[tone] || tones.clay;
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  const dark = ['butter', 'sand'].includes(tone);
  return (
    <div style={{
      aspectRatio: ratio,
      borderRadius: 12,
      background: t.bg,
      position: 'relative',
      overflow: 'hidden',
      color: t.accent,
      border: '1px solid rgba(31,26,23,0.06)',
    }}>
      {/* warm vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: dark
          ? 'radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.18), transparent 60%)'
          : 'radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.10), transparent 60%)',
      }}/>
      {/* large initials */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -55%)',
        fontFamily: "'Source Serif 4', serif",
        fontWeight: 400,
        fontSize: 'clamp(72px, 14vw, 132px)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        opacity: 0.32,
        color: t.accent,
      }}>{initials}</div>
      {/* corner mark */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        width: 8, height: 8, borderRadius: '50%',
        background: t.accent, opacity: 0.5,
      }}/>
      {/* bottom label */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 16px',
        background: t.soft,
        backdropFilter: 'blur(2px)',
        borderTop: `1px solid ${dark ? 'rgba(31,26,23,0.10)' : 'rgba(247,242,235,0.18)'}`,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.04em',
        color: t.accent,
        lineHeight: 1.5,
      }}>
        <div style={{ fontWeight: 500, marginBottom: 2 }}>PHOTO: {name.toUpperCase()}</div>
        <div style={{ opacity: 0.75, fontSize: 10, wordBreak: 'break-all' }}>{filePath}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Container, Section, Eyebrow, Button, Icon, PhotoPlaceholder });
