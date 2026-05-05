// Section 04: Leadership team
// Single uniform grid — all cards same size.
// Hover (or tap on mobile) the image to flip to the team member's silly portrait.

function Leadership() {
  // Display order: row 1 = Daniel, Martin, Reggie, Rie (Marie).
  //                row 2 = Felix, Bianca, Velvie.
  const team = [
    {
      name: 'Daniel Juma',
      role: 'Head of Operations',
      imageSrc: '../images/daniel-juma.png',
      sillySrc: '../images/silly/daniel-juma-silly.png',
    },
    {
      name: 'Martin Onami',
      role: 'Account Manager',
      imageSrc: '../images/martin-onami.png',
      sillySrc: '../images/silly/martin-onami-silly.png',
      sillyFit: 'contain',
    },
    {
      name: 'Reggie Rendal',
      role: 'Account Manager',
      imageSrc: '../images/reggie-rendal.png',
      sillySrc: '../images/silly/reggie-rendal-silly.png',
    },
    {
      name: 'Marie Medina',
      role: 'Account Manager',
      imageSrc: '../images/marie-medina.png',
      sillySrc: '../images/silly/marie-medina-silly.png',
    },
    {
      name: 'Felix Maru',
      role: 'Operations Engineer',
      imageSrc: '../images/felix-maru.png',
      sillySrc: '../images/silly/felix-maru-silly.png',
    },
    {
      name: 'Bianca Dadulla',
      role: 'Lead Recruiter',
      imageSrc: '../images/bianca-dadulla.png',
      sillySrc: '../images/silly/bianca-dadulla-silly.png',
    },
    {
      name: 'Velvie Coleman',
      role: 'Advisor',
      imageSrc: '../images/velvie-coleman.jpg',
      sillySrc: '../images/silly/velvie-coleman-silly.png',
    },
  ];

  return (
    <Section bg="paper-2" padding="lg">
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 2.1fr',
          gap: 64,
          alignItems: 'start',
          marginBottom: 56,
        }} className="lead-head">
          <div>
            <Eyebrow>04 / Leadership</Eyebrow>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(30px, 3.2vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#1F1A17',
            }}>
              The leaders who run the work
            </h2>
          </div>
          <div style={{ maxWidth: 680 }}>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18,
              lineHeight: 1.65,
              color: '#1F1A17',
              margin: '0 0 12px',
              textWrap: 'pretty',
            }}>
              The people clients work with day-to-day. Operations, account management, and recruiting. Every account manager knows their team members by name, and every team member knows their account manager has their back.
            </p>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.5,
              color: '#6B5F56',
              margin: 0,
              fontStyle: 'italic',
            }}>
              Hover any photo to meet the person behind the title.
            </p>
          </div>
        </div>

        <div className="lead-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 28,
        }}>
          {team.map(person => (
            <LeaderCard key={person.name} {...person} />
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 1024px) {
          .lead-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 760px) {
          .lead-head { grid-template-columns: 1fr !important; gap: 24px !important; }
          .lead-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
        }
        @media (max-width: 460px) {
          .lead-grid { grid-template-columns: 1fr !important; }
        }

        /* Hover flip: stack two images, fade between them on hover (desktop)
           or on tap toggle (mobile, via the .flipped class). */
        .leader-photo-stack {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #D9CFBF;
          cursor: pointer;
          transition: transform 240ms cubic-bezier(0.4,0,0.6,1);
        }
        @media (hover: hover) {
          .leader-photo-stack:hover {
            transform: translateY(-2px);
          }
        }
        .leader-photo-stack img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 220ms cubic-bezier(0.4,0,0.6,1);
        }
        .leader-photo-default { opacity: 1; }
        .leader-photo-silly   { opacity: 0; }
        /* Per-leader silly image fit override: 'contain' lets the full
           portrait show inside the 4:5 frame (used when the silly image
           is much taller than the frame, e.g. full-body shots). */
        .leader-photo-silly.fit-contain {
          object-fit: contain;
          background: #EFE8DD;
        }
        @media (hover: hover) {
          .leader-photo-stack:hover .leader-photo-default { opacity: 0; }
          .leader-photo-stack:hover .leader-photo-silly   { opacity: 1; }
        }
        .leader-photo-stack.flipped .leader-photo-default { opacity: 0; }
        .leader-photo-stack.flipped .leader-photo-silly   { opacity: 1; }
      `}</style>
    </Section>
  );
}

function LeaderCard({ name, role, imageSrc, sillySrc, sillyFit }) {
  const [errored, setErrored] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);

  const handleToggle = () => setFlipped(f => !f);
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div>
      <div
        className={`leader-photo-stack${flipped ? ' flipped' : ''}`}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`Photo of ${name}, tap to toggle silly portrait`}
        onClick={handleToggle}
        onKeyDown={handleKey}
      >
        {(!imageSrc || errored) ? (
          <LeaderPlaceholder name={name} />
        ) : (
          <>
            <img
              src={imageSrc}
              alt={`${name}, ${role}`}
              loading="lazy"
              className="leader-photo-default"
              onError={() => setErrored(true)}
            />
            {sillySrc && (
              <img
                src={sillySrc}
                alt=""
                loading="lazy"
                className={`leader-photo-silly${sillyFit === 'contain' ? ' fit-contain' : ''}`}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </div>
      <div style={{
        marginTop: 14,
        fontFamily: "'Source Serif 4', serif",
        fontSize: 19,
        fontWeight: 500,
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
        color: '#1F1A17',
      }}>
        {name}
      </div>
      <div style={{
        marginTop: 4,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: '#6B5F56',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        {role}
      </div>
    </div>
  );
}

function LeaderPlaceholder({ name }) {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #F0D9A8 0%, #D9B97A 100%)',
      color: '#3A322D',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: 'clamp(48px, 6vw, 80px)',
        lineHeight: 1,
        opacity: 0.45,
        letterSpacing: '-0.04em',
      }}>{initials}</div>
    </div>
  );
}

window.Leadership = Leadership;
