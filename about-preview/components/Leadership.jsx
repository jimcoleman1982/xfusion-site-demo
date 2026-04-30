// Section 04: Leadership team
// Tiered grid — "Heads of" row (Daniel, Velvie) at slightly larger size,
// then a row of account managers + ops engineer below.
// Each card is clickable to the team member's LinkedIn.

function Leadership() {
  // LinkedIn URLs are placeholders. Replace with real URLs as you have them.
  const headsOf = [
    {
      name: 'Daniel Juma',
      role: 'Head of Operations',
      imageSrc: '../images/daniel-juma.png',
      linkedIn: '#',
    },
    {
      name: 'Velvie Coleman',
      role: 'Head of Culture',
      imageSrc: '../images/velvie-coleman.png',
      linkedIn: '#',
    },
  ];

  const operations = [
    {
      name: 'Martin Onami',
      role: 'Account Manager',
      imageSrc: '../images/martin-onami.png',
      linkedIn: '#',
    },
    {
      name: 'Reggie Rendal',
      role: 'Account Manager',
      imageSrc: '../images/reggie-rendal.png',
      linkedIn: '#',
    },
    {
      name: 'Marie Medina',
      role: 'Account Manager',
      imageSrc: '../images/marie-medina.png',
      linkedIn: '#',
    },
    {
      name: 'Bianca Dadulla',
      role: 'Lead Recruiter',
      imageSrc: '../images/bianca-dadulla.png',
      linkedIn: '#',
    },
    {
      name: 'Felix Maru',
      role: 'Operations Engineer',
      imageSrc: '../images/felix-maru.png',
      linkedIn: '#',
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
              margin: 0,
              textWrap: 'pretty',
            }}>
              The people clients work with day-to-day. Operations, account management, and recruiting. Every account manager knows their team members by name, and every team member knows their account manager has their back.
            </p>
          </div>
        </div>

        {/* Heads of: 2-up larger cards */}
        <div className="lead-heads-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 32,
          marginBottom: 32,
        }}>
          {headsOf.map(person => (
            <LeaderCard key={person.name} {...person} size="md" />
          ))}
        </div>

        {/* Operations: smaller card grid */}
        <div className="lead-ops-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 24,
        }}>
          {operations.map(person => (
            <LeaderCard key={person.name} {...person} size="sm" />
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 1024px) {
          .lead-ops-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 760px) {
          .lead-head { grid-template-columns: 1fr !important; gap: 24px !important; }
          .lead-heads-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .lead-ops-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
        }
        @media (max-width: 460px) {
          .lead-ops-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}

function LeaderCard({ name, role, imageSrc, linkedIn, size = 'sm' }) {
  const [errored, setErrored] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  // 'md' for Heads of (slightly larger photos), 'sm' for ops team
  const photoSize = size === 'md' ? '4 / 5' : '4 / 5';

  return (
    <a
      href={linkedIn}
      target={linkedIn === '#' ? undefined : '_blank'}
      rel={linkedIn === '#' ? undefined : 'noopener noreferrer'}
      aria-label={`${name}, ${role} — open LinkedIn profile`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        transition: 'transform 240ms cubic-bezier(0.4,0,0.6,1)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {(!imageSrc || errored) ? (
        <LeaderPlaceholder name={name} />
      ) : (
        <img
          src={imageSrc}
          alt={`${name}, ${role}`}
          loading="lazy"
          onError={() => setErrored(true)}
          style={{
            width: '100%',
            aspectRatio: photoSize,
            objectFit: 'cover',
            borderRadius: 12,
            border: '1px solid #D9CFBF',
            display: 'block',
            filter: hover ? 'brightness(1.04)' : 'none',
            transition: 'filter 200ms ease',
          }}
        />
      )}
      <div style={{
        marginTop: 14,
        fontFamily: "'Source Serif 4', serif",
        fontSize: size === 'md' ? 22 : 18,
        fontWeight: 500,
        color: '#1F1A17',
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
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
    </a>
  );
}

function LeaderPlaceholder({ name }) {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return (
    <div style={{
      aspectRatio: '4 / 5',
      borderRadius: 12,
      background: 'linear-gradient(135deg, #F0D9A8 0%, #D9B97A 100%)',
      color: '#3A322D',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #D9CFBF',
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
