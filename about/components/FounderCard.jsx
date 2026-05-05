// Founder card: photo + role + multi-paragraph bio.
// `imageSide` controls left/right alternation.
// Hover the photo to flip to the founder's silly portrait.
function FounderCard({
  name,
  role,
  paragraphs,
  imageSrc,
  sillySrc,
  imageLabel,
  imageSide = 'right',
  tone = 'clay',
  linkedIn,
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
          sillySrc={sillySrc}
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
          {linkedIn ? (
            <a
              href={linkedIn}
              className="founder-name-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name}, ${role}, open LinkedIn profile`}
            >
              {name}
            </a>
          ) : (
            name
          )}
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

        /* Hover flip on founder photos: same pattern as the leadership grid.
           Hover toggles on desktop; tap toggles on mobile via .flipped. */
        .founder-photo-stack {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #D9CFBF;
          cursor: pointer;
        }
        .founder-photo-stack img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 220ms cubic-bezier(0.4,0,0.6,1);
        }
        .founder-photo-default { opacity: 1; }
        .founder-photo-silly   { opacity: 0; }
        @media (hover: hover) {
          .founder-photo-stack:hover .founder-photo-default { opacity: 0; }
          .founder-photo-stack:hover .founder-photo-silly   { opacity: 1; }
        }
        .founder-photo-stack.flipped .founder-photo-default { opacity: 0; }
        .founder-photo-stack.flipped .founder-photo-silly   { opacity: 1; }

        .founder-name-link {
          color: inherit;
          text-decoration: none;
          transition: color 160ms ease;
        }
        .founder-name-link:hover { color: #B8512C; }
      `}</style>
    </div>
  );
}

// Photo block: real <img> if a real file resolves, otherwise a labeled
// placeholder showing the expected file path so the dev knows what's missing.
// When sillySrc is provided, hover swaps to the silly portrait.
function FounderPhoto({ name, imageSrc, sillySrc, imageLabel, tone }) {
  const [errored, setErrored] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);

  const handleToggle = () => setFlipped(f => !f);
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

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
      </div>
    );
  }

  return (
    <div
      className={`founder-photo-stack${flipped ? ' flipped' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`Photo of ${name}, tap to toggle silly portrait`}
      onClick={handleToggle}
      onKeyDown={handleKey}
    >
      <img
        src={imageSrc}
        alt={`${name}, co-founder of xFusion`}
        loading="lazy"
        className="founder-photo-default"
        onError={() => setErrored(true)}
      />
      {sillySrc && (
        <img
          src={sillySrc}
          alt=""
          loading="lazy"
          className="founder-photo-silly"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

window.FounderCard = FounderCard;
