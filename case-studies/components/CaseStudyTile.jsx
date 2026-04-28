function CaseStudyTile({
  index, total, flip = false,
  industry, country, headline, elaboration,
  quote, attribution, attributionRole,
  href, photoName, photoPath, photoTone,
  linkLabel,
}) {
  const [linkHover, setLinkHover] = React.useState(false);

  const meta = (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      letterSpacing: '0.06em',
      color: '#6B5F56',
      textTransform: 'uppercase',
      marginBottom: 20,
      lineHeight: 1.4,
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 22, height: 22, borderRadius: '50%',
        border: '1px solid #B7A993',
        marginRight: 12,
        fontSize: 10, color: '#1F1A17',
        verticalAlign: '-0.25em',
        fontWeight: 500,
      }}>{String(index).padStart(2, '0')}</span>
      {industry} · {country}
    </div>
  );

  const headlineEl = (
    <h2 style={{
      fontFamily: "'Source Serif 4', serif",
      fontSize: 'clamp(26px, 3.2vw, 38px)',
      fontWeight: 600,
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
      margin: '0 0 20px',
      color: '#1F1A17',
      textWrap: 'balance',
    }}>{headline}</h2>
  );

  const elabEl = (
    <p style={{
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 16,
      lineHeight: 1.65,
      color: '#3A322D',
      margin: '0 0 28px',
      textWrap: 'pretty',
    }}>{elaboration}</p>
  );

  const quoteBlock = (
    <blockquote style={{
      margin: '0 0 24px',
      padding: '4px 0 4px 20px',
      borderLeft: '2px solid #B8512C',
    }}>
      <p style={{
        fontFamily: "'Source Serif 4', serif",
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 'clamp(17px, 1.7vw, 19px)',
        lineHeight: 1.5,
        color: '#1F1A17',
        margin: '0 0 12px',
        textWrap: 'pretty',
      }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.06em',
        color: '#6B5F56',
        textTransform: 'uppercase',
      }}>
        {attribution}
      </div>
    </blockquote>
  );

  const linkEl = (
    <a
      href={href}
      onMouseEnter={() => setLinkHover(true)}
      onMouseLeave={() => setLinkHover(false)}
      style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 15,
        fontWeight: 500,
        color: linkHover ? '#A0451F' : '#B8512C',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        borderBottom: linkHover ? '1px solid #A0451F' : '1px solid #B8512C',
        paddingBottom: 2,
        transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)',
      }}
    >
      {linkLabel}
      <Icon name="arrow-right" size={16} style={{ transform: linkHover ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 160ms' }}/>
    </a>
  );

  const photo = (
    <PhotoPlaceholder
      name={photoName}
      filePath={photoPath}
      tone={photoTone}
      ratio="1/1"
      alt={`${photoName}, ${attribution.split(',').slice(1).join(',').trim()}`}
    />
  );

  return (
    <article
      data-screen-label={`Tile ${String(index).padStart(2, '0')} ${attribution.split(',')[1]?.trim() || ''}`}
      style={{
        padding: '64px 0',
        borderBottom: index < total ? '1px solid #D9CFBF' : 'none',
      }}
      className="case-tile"
    >
      <div className={`case-tile-grid ${flip ? 'flip' : ''}`} style={{
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.15fr',
        gap: 56,
        alignItems: 'center',
        direction: flip ? 'rtl' : 'ltr',
      }}>
        <div style={{ direction: 'ltr' }}>{photo}</div>
        <div style={{ direction: 'ltr' }}>
          {meta}
          {headlineEl}
          {elabEl}
          {quoteBlock}
          {linkEl}
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .case-tile-grid {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
            gap: 28px !important;
          }
          .case-tile-grid > div:first-child > div {
            max-width: 360px;
          }
        }
      `}</style>
    </article>
  );
}

window.CaseStudyTile = CaseStudyTile;
