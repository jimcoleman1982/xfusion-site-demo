// Stage 2 of the booking funnel: qualification modal.
// Opens after the hero email capture. Left panel: proof points + team photo.
// Right panel: short qualification form. On submit the lead is stored locally,
// POSTed to Netlify Forms, and the CTA becomes "Pick a time →" (goes to /book/).
//
// Anti-spam: honeypot field ("bot-field") — hidden from humans; if filled,
// we show the success state but skip the dataLayer event and the POST so
// bots never pollute conversion data.

// Proof points are defined ONCE here and shared with the homepage proof
// strip (Task 8) so the claims can never drift out of sync.
window.XF_PROOF_POINTS = [
  'Experienced specialists, AI-trained',
  '$2,900/mo all-in',
  '30-day risk-free trial',
  'Month-to-month',
  'Since 2020',
];

const XF_BUSINESS_TYPES = ['SaaS', 'E-commerce', 'Marketplace', 'Agency', 'Other'];

function LeadModal({ open, email, onClose }) {
  const [name, setName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [need, setNeed] = React.useState('');
  const [bizType, setBizType] = React.useState('');
  const [botField, setBotField] = React.useState('');
  const [error, setError] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const firstFieldRef = React.useRef(null);
  const firedRef = React.useRef(false);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstFieldRef.current && firstFieldRef.current.focus(), 60);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting || submitted) return;

    if (!name.trim()) {
      setError('Please tell us your name.');
      return;
    }
    setError('');

    // Honeypot: a filled bot-field means this is not a human. Show the
    // success state (so the bot moves on) but record and report nothing.
    if (botField) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    const attribution = (window.xfAttribution && window.xfAttribution.get()) || {};
    const lead = {
      email: email || '',
      name: name.trim(),
      company: company.trim(),
      website: website.trim(),
      need: need.trim(),
      business_type: bizType,
    };

    if (window.xfAttribution) {
      window.xfAttribution.saveLead(lead);
      // Deliver to GoHighLevel + Google Sheet (endpoints configured in
      // attribution.js; unconfigured ones are skipped).
      window.xfAttribution.sendLead('lead_form', lead);
    }

    if (!firedRef.current) {
      firedRef.current = true;
      const consentOk = !window.xfConsent || window.xfConsent.adUserDataGranted();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_form_submit',
        business_type: bizType || undefined,
        user_email: (consentOk && email) || undefined,
      });
    }

    const fields = Object.assign({ 'form-name': 'lead', 'bot-field': '' }, lead, {
      gclid: attribution.gclid || '',
      gbraid: attribution.gbraid || '',
      wbraid: attribution.wbraid || '',
      utm_source: attribution.utm_source || '',
      utm_medium: attribution.utm_medium || '',
      utm_campaign: attribution.utm_campaign || '',
      page: window.location.pathname,
    });
    const body = Object.keys(fields)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(fields[k]))
      .join('&');

    // Netlify Forms endpoint is the site itself. On localhost this 501s —
    // the lead is still preserved in localStorage and the funnel continues.
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    }).catch(() => {}).finally(() => {
      setSubmitting(false);
      setSubmitted(true);
    });
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 15,
    color: '#1F1A17',
    background: '#FFFFFF',
    border: '1px solid #B7A993',
    borderRadius: 8,
    outline: 'none',
  };
  const labelStyle = {
    display: 'block',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: '#3A322D',
    margin: '0 0 6px',
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(31,26,23,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Tell us about your team"
        className="lead-modal"
        style={{
          background: '#F7F2EB',
          borderRadius: 16,
          border: '1px solid #D9CFBF',
          width: 'min(880px, 100%)',
          maxHeight: 'min(680px, calc(100vh - 40px))',
          overflow: 'auto',
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          boxShadow: '0 24px 64px rgba(31,26,23,0.28)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 2,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#F7F2EB', mixBlendMode: 'difference', padding: 6,
          }}
        >
          <Icon name="x" size={22} color="currentColor" />
        </button>

        {/* Left panel — proof */}
        <div className="lead-modal-left" style={{ background: '#2C4A3E', padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <Eyebrow color="#F0D9A8">Why teams pick xFusion</Eyebrow>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {window.XF_PROOF_POINTS.map((point) => (
                <li key={point} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15,
                  color: '#F7F2EB', lineHeight: 1.4,
                }}>
                  <Icon name="check" size={16} color="#F0D9A8" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <img
            src="/images/xfusion-team-montage.webp"
            alt="The xFusion team"
            loading="lazy"
            style={{
              width: '100%', aspectRatio: '4 / 3', objectFit: 'cover',
              borderRadius: 12, border: '1px solid rgba(247,242,235,0.18)',
              marginTop: 'auto',
            }}
          />
        </div>

        {/* Right panel — form */}
        <div style={{ padding: '36px 32px' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <h2 style={{
                fontFamily: "'Source Serif 4', serif", fontSize: 28, fontWeight: 600,
                color: '#1F1A17', margin: '0 0 6px', letterSpacing: '-0.02em',
              }}>
                Tell us about your team
              </h2>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14,
                color: '#6B5F56', margin: '0 0 22px', lineHeight: 1.5,
              }}>
                We'll use this to make the discovery call useful, not generic.
                {email ? <span> Booking as <strong style={{ color: '#3A322D' }}>{email}</strong>.</span> : null}
              </p>

              {/* Honeypot — hidden from humans, present for bots */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 0, height: 0, overflow: 'hidden' }}>
                <label>Leave this field empty
                  <input type="text" name="bot-field" tabIndex="-1" autoComplete="off"
                    value={botField} onChange={(e) => setBotField(e.target.value)} />
                </label>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle} htmlFor="lead-name">Your name *</label>
                  <input id="lead-name" ref={firstFieldRef} style={inputStyle} type="text"
                    value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle} htmlFor="lead-company">Company</label>
                    <input id="lead-company" style={inputStyle} type="text"
                      value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="lead-website">Website</label>
                    <input id="lead-website" style={inputStyle} type="text" placeholder="yourcompany.com"
                      value={website} onChange={(e) => setWebsite(e.target.value)} autoComplete="url" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle} htmlFor="lead-need">What do you need help with?</label>
                  <textarea id="lead-need" rows="3" style={{ ...inputStyle, resize: 'vertical' }}
                    value={need} onChange={(e) => setNeed(e.target.value)} />
                </div>
                <div>
                  <div style={labelStyle}>What kind of business?</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {XF_BUSINESS_TYPES.map((t) => {
                      const active = bizType === t;
                      return (
                        <button type="button" key={t}
                          onClick={() => setBizType(active ? '' : t)}
                          aria-pressed={active}
                          style={{
                            padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
                            fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: 500,
                            background: active ? '#B8512C' : 'transparent',
                            color: active ? '#F7F2EB' : '#3A322D',
                            border: active ? '1px solid transparent' : '1px solid #B7A993',
                            transition: 'all 160ms cubic-bezier(0.4,0,0.6,1)',
                          }}>
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {error ? (
                  <div role="alert" style={{
                    fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13,
                    color: '#A8341E',
                  }}>{error}</div>
                ) : null}

                <div>
                  <Button variant="primary" size="lg" as="button" onClick={handleSubmit} style={{ width: '100%', justifyContent: 'center' }}>
                    {submitting ? 'Saving…' : 'Continue'}
                  </Button>
                  <CTAMicrocopy>Next you'll pick a time that suits you. 30 minutes, no pitch deck.</CTAMicrocopy>
                </div>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 360 }}>
              <Eyebrow>One last step</Eyebrow>
              <h2 style={{
                fontFamily: "'Source Serif 4', serif", fontSize: 30, fontWeight: 600,
                color: '#1F1A17', margin: '0 0 12px', letterSpacing: '-0.02em',
              }}>
                Thanks{name ? `, ${name.trim().split(' ')[0]}` : ''}. Pick a time that works.
              </h2>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15,
                color: '#3A322D', margin: '0 0 28px', lineHeight: 1.55,
              }}>
                Grab any slot on the calendar. You'll talk directly with our founding team.
              </p>
              <Button variant="primary" size="lg" href="/book/">
                Pick a time <Icon name="arrow" size={18} />
              </Button>
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 760px) {
            .lead-modal { grid-template-columns: 1fr !important; }
            .lead-modal-left { display: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

window.LeadModal = LeadModal;
