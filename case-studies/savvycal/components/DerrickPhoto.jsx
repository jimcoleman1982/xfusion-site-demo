// Derrick Reimer photo placeholder.
// Treatment: warm-toned flat swatch with name + label, 12px radius, no shadow.
// Ready to swap with /images/derrick-reimer-savvycal.png when photography ships.
function DerrickPhoto({ size = 'medium', circle = false, style = {}, src = '../../images/derrick-reimer-savvycal.png' }) {
  const sizes = {
    small:  { width: 88,  height: 88,  ratio: '1/1',  initialsSize: 36, nameSize: 0,  showLabel: false },
    medium: { width: 280, height: 360, ratio: '4/5',  initialsSize: 140, nameSize: 18, showLabel: true },
    large:  { width: 360, height: 440, ratio: '4/5',  initialsSize: 180, nameSize: 20, showLabel: true },
  };
  const s = sizes[size];
  const [errored, setErrored] = React.useState(false);

  if (src && !errored) {
    return (
      <img
        src={src}
        alt="Derrick Reimer, founder of SavvyCal"
        loading={size === 'medium' ? undefined : 'lazy'}
        onError={() => setErrored(true)}
        style={{
          width: '100%',
          maxWidth: s.width,
          aspectRatio: s.ratio,
          objectFit: 'cover',
          borderRadius: circle ? 999 : 12,
          border: '1px solid rgba(31,26,23,0.06)',
          display: 'block',
          ...style,
        }}
      />
    );
  }

  return (
    <div style={{
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
      ...style,
    }} role="img" aria-label="Derrick Reimer, founder of SavvyCal">
      {/* Soft warm vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 25%, rgba(240, 217, 168, 0.25) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />
      {/* Big initials, treated as type */}
      <div style={{
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
        color: circle ? '#F0D9A8' : '#F7F2EB',
      }}>DR</div>
      {!circle && s.showLabel && (
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.14em',
            opacity: 0.7, marginBottom: 6,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          }}>
            Photo placeholder
          </div>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: s.nameSize,
            lineHeight: 1.2,
            fontWeight: 500,
          }}>Derrick Reimer</div>
          <div style={{
            fontSize: 12, opacity: 0.75, marginTop: 2,
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            images/derrick-reimer-savvycal.png
          </div>
        </div>
      )}
    </div>
  );
}

window.DerrickPhoto = DerrickPhoto;
