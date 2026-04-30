function Team() {
  return (
    <Section bg="paper" padding="lg">
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 2.1fr',
          gap: 64,
          alignItems: 'start',
          marginBottom: 56,
        }} className="team-head">
          <div>
            <Eyebrow>03 / Team</Eyebrow>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 'clamp(30px, 3.2vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#1F1A17',
            }}>
              The team behind every placement
            </h2>
          </div>
          <div style={{ maxWidth: 680 }}>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18,
              lineHeight: 1.65,
              color: '#1F1A17',
              margin: '0 0 20px',
              textWrap: 'pretty',
            }}>
              About 70 people make xFusion run, with offices in the Philippines and Kenya and a smaller team in the United States. We invest in culture the way other companies invest in software: living-wage compensation, structured holiday gifting, branded swag, regular team-building events, birthday and anniversary recognition, and account managers who know every team member by name.
            </p>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18,
              lineHeight: 1.65,
              color: '#1F1A17',
              margin: 0,
              textWrap: 'pretty',
            }}>
              The reason is practical. People who feel cared for stay. People who stay get great at the work. People who get great at the work make our clients look brilliant. The whole thing compounds.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginTop: 16,
        }} className="team-photos">
          <TeamPhoto
            location="Philippines"
            count="35 team members"
            label="Photo: Philippines team-building"
            imageSrc="../images/xfusion-philippines-team.jpeg"
            tone="clay"
          />
          <TeamPhoto
            location="Kenya"
            count="35 team members"
            label="Photo: Kenya team-building"
            imageSrc="../images/xfusion-kenya-team.jpeg"
            tone="forest"
          />
        </div>

        <div style={{
          marginTop: 48,
          paddingTop: 32,
          borderTop: '1px solid #D9CFBF',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32,
        }} className="team-stats">
          {[
            { stat: '70', label: 'Team members' },
            { stat: '3', label: 'Continents' },
            { stat: '6 yrs', label: 'In business since 2020' },
            { stat: '<1%', label: 'Of applicants placed' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 'clamp(32px, 3.2vw, 44px)',
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: '#B8512C',
                marginBottom: 8,
              }}>
                {s.stat}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                color: '#3A322D',
                lineHeight: 1.4,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .team-head { grid-template-columns: 1fr !important; gap: 24px !important; }
          .team-photos { grid-template-columns: 1fr !important; }
          .team-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
      `}</style>
    </Section>
  );
}

function TeamPhoto({ location, count, label, imageSrc, tone }) {
  const [errored, setErrored] = React.useState(false);
  const showImage = imageSrc && !errored;

  return (
    <figure style={{ margin: 0 }}>
      {showImage ? (
        <img
          src={imageSrc}
          alt={`xFusion ${location} team building, ${count}`}
          loading="lazy"
          onError={() => setErrored(true)}
          style={{
            width: '100%',
            aspectRatio: '4 / 3',
            objectFit: 'cover',
            borderRadius: 12,
            border: '1px solid #D9CFBF',
            display: 'block',
          }}
        />
      ) : (
        <div style={{ aspectRatio: '4 / 3', position: 'relative' }}>
          <PhotoPlaceholder
            name={location}
            label={label}
            tone={tone}
            ratio="4/3"
          />
        </div>
      )}
      <figcaption style={{
        marginTop: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 22,
          fontWeight: 500,
          color: '#1F1A17',
          letterSpacing: '-0.01em',
        }}>
          {location}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: '#6B5F56',
          letterSpacing: '0.02em',
        }}>
          {count}
        </div>
      </figcaption>
    </figure>
  );
}

window.Team = Team;
