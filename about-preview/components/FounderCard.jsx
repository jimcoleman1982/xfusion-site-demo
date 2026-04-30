// Founder card: photo + role + multi-paragraph bio.
// `imageSide` controls left/right alternation.
function FounderCard({
  name,
  role,
  paragraphs,
  imageSrc,
  imageLabel,
  imageSide = 'right',
  tone = 'clay',
}) {
  const isLeft = imageSide === 'left';

  return (
    <div
      className="founder-card"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: 64,
        alignItems: 'center',
      }}
    >
      <div
        className="founder-photo"
        style={{ order: isLeft ? 0 : 1 }}
      >
        <FounderPhoto
          name={name}
          imageSrc={imageSrc}
          imageLabel={imageLabel}
          tone={tone}
        />
      </div>
      <div className="founder-body" style={{ order: isLeft ? 1 : 0 }}>
        <h3 style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 'clamp(30px, 3.2vw, 42px)',
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: '0 0 8px',
          color: '#1F1A17',
        }}>
          {name}
        </h3>
        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 14,
          color: '#6B5F56',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 24,
        }}>
          {role}
        </div>
        <div>
          {paragraphs.map((p, i) => (
            <p key={i} style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 17,
              lineHeight: 1.65,
              color: '#1F1A17',
              margin: i === paragraphs.length - 1 ? 0 : '0 0 20px',
              textWrap: 'pretty',
            }}>
              {p}
            </p>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .founder-card { grid-template-columns: 1fr !important; gap: 32px !important; }
          .founder-card .founder-photo { order: 0 !important; }
          .founder-card .founder-body  { order: 1 !important; }
        }
      `}</style>
    </div>
  );
}

// Photo block: real <img> if a real file resolves, otherwise a labeled
// PhotoPlaceholder showing the expected file path so the dev knows what's missing.
function FounderPhoto({ name, imageSrc, imageLabel, tone }) {
  const [errored, setErrored] = React.useState(false);

  if (!imageSrc || errored) {
    const tones = {
      clay:   { bg: 'linear-gradient(135deg, #B8512C 0%, #A0451F 100%)', fg: '#F0D9A8' },
      forest: { bg: 'linear-gradient(135deg, #2C4A3E 0%, #243C32 100%)', fg: '#F0D9A8' },
    };
    const t = tones[tone] || tones.clay;
    const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
    return (
      <div style={{ position: 'relative' }}>
        <div style={{
          aspectRatio: '4 / 5',
          borderRadius: 12,
          background: t.bg,
          color: t.fg,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(96px, 14vw, 180px)',
            lineHeight: 1,
            opacity: 0.32,
            letterSpacing: '-0.04em',
          }}>{initials}</div>
          <div style={{
            position: 'absolute',
            top: 20, left: 20,
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            opacity: 0.75,
          }}>
            {imageLabel}
          </div>
        </div>
        <div style={{
          marginTop: 12,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: '#6B5F56',
          letterSpacing: '0.02em',
        }}>
          {imageSrc /* shown as the expected file path */}
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={`${name}, co-founder of xFusion`}
      loading="lazy"
      onError={() => setErrored(true)}
      style={{
        width: '100%',
        aspectRatio: '4 / 5',
        objectFit: 'cover',
        borderRadius: 12,
        border: '1px solid #D9CFBF',
        display: 'block',
      }}
    />
  );
}

window.FounderCard = FounderCard;
