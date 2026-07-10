// Shared Stage-1 email capture: validated email input + "Get started" button
// that opens the qualification modal (LeadModal). Extracted from Hero.jsx so
// the homepage and every vertical landing page run the SAME funnel: one
// email_capture event (fired once, with hashed email), immediate delivery of
// the email via sendLead, then Stage 2 in the modal.
//
// Props:
//   microcopy  - optional node rendered under the form (defaults to the
//                standard line + "book a call directly" escape hatch)
function LeadCapture({ microcopy }) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const capturedRef = React.useRef(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    // Strict enough to reject "xyz @ abc . com": no spaces anywhere,
    // one @, and a dot-separated TLD of 2+ letters.
    const valid = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value);
    if (!valid) {
      setEmailError('Please enter a valid work email, like you@company.com.');
      return;
    }
    setEmailError('');
    const normalized = value.toLowerCase();
    if (window.xfAttribution) {
      window.xfAttribution.hashEmail(normalized).then((hash) => {
        window.xfAttribution.saveLead({ email: normalized, email_hash: hash || '' });
        if (!capturedRef.current) {
          capturedRef.current = true;
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'email_capture', email_hash: hash || undefined });
          // Deliver the email immediately (GHL + Sheet) so a visitor who
          // abandons at the modal is still a recoverable lead.
          window.xfAttribution.sendLead('email_capture', { email: normalized });
        }
        setModalOpen(true);
      });
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <form onSubmit={handleEmailSubmit} noValidate className="hero-capture"
        style={{ display: 'flex', gap: 12, alignItems: 'stretch', flexWrap: 'wrap', maxWidth: 520 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Work email"
          autoComplete="email"
          style={{
            flex: '1 1 240px',
            boxSizing: 'border-box',
            padding: '14px 18px',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 16,
            color: '#1F1A17',
            background: '#FFFFFF',
            border: emailError ? '1px solid #A8341E' : '1px solid #B7A993',
            borderRadius: 8,
            outline: 'none',
          }}
        />
        <Button variant="primary" size="lg" as="button">Get started</Button>
      </form>
      {emailError ? (
        <div role="alert" style={{
          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13,
          color: '#A8341E', marginTop: 10,
        }}>{emailError}</div>
      ) : null}
      <CTAMicrocopy>
        {microcopy || (
          <>
            30 minutes. No pitch deck. We just figure out if we're a good fit for your team.{' '}
            <a href="/book/" style={{ color: '#B8512C', fontWeight: 500 }}>Or book a call directly →</a>
          </>
        )}
      </CTAMicrocopy>
      <LeadModal
        open={modalOpen}
        email={(window.xfAttribution ? window.xfAttribution.getLead().email : '') || email.trim().toLowerCase()}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

window.LeadCapture = LeadCapture;
