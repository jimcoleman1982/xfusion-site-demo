// Photo placeholder for Derrick Reimer.
// Real path: images/derrick-reimer-savvycal.png. Until provided, this renders
// a flat warm-toned swatch with subject name, per design system rules.
function PortraitPhoto({
  name = 'Derrick Reimer',
  caption = 'Founder, SavvyCal',
  width = 220,
  height = 280,
  tone = 'clay',
  hairline = false,
  src,
  alt,
}) {
  const tones = {
    clay:   { bg: 'linear-gradient(140deg, #B8512C 0%, #8E3D1E 100%)', fg: '#F0D9A8', mark: '#F7F2EB' },
    forest: { bg: 'linear-gradient(140deg, #2C4A3E 0%, #1B3128 100%)', fg: '#F0D9A8', mark: '#F7F2EB' },
    butter: { bg: 'linear-gradient(140deg, #F0D9A8 0%, #D9BB7A 100%)', fg: '#1F1A17', mark: '#1F1A17' },
  };
  const t = tones[tone];
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');

  const baseStyle = {
    width,
    height,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    border: hairline ? '1px solid #D9CFBF' : 'none',
    background: t.bg,
    color: t.fg,
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        style={{
          ...baseStyle,
          objectFit: 'cover',
        }}
      />
    );
  }

  return (
    <div role="img" aria-label={alt || `${name} portrait placeholder`} style={baseStyle}>
      {/* Soft inner highlight */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(120% 80% at 30% 20%, rgba(247,242,235,0.18), transparent 60%)',
      }} />
      {/* Big serif initials, faint */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -55%)',
        fontFamily: "'Source Serif 4', serif",
        fontWeight: 400,
        fontSize: Math.round(Math.min(width, height) * 0.5),
        opacity: 0.22,
        lineHeight: 1,
        color: t.mark,
        letterSpacing: '-0.04em',
      }}>{initials}</div>

      {/* Bottom caption block */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 16px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0))',
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: t.fg,
          opacity: 0.85,
          marginBottom: 2,
        }}>Photo</div>
        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 16,
          lineHeight: 1.2,
          color: t.fg,
        }}>{name}</div>
        {caption && (
          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 11,
            color: t.fg,
            opacity: 0.75,
            marginTop: 2,
          }}>{caption}</div>
        )}
      </div>
    </div>
  );
}

window.PortraitPhoto = PortraitPhoto;
