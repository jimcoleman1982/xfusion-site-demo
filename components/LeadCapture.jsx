// Shared Stage-1 email capture: validated email input + "Get started" button
// that opens the qualification modal (LeadModal). Extracted from Hero.jsx so
// the homepage and every vertical landing page run the SAME funnel: one
// email_capture event (fired once, with hashed email), immediate delivery of
// the email via sendLead, then Stage 2 in the modal.
//
// Props:
//   microcopy  - optional node rendered under the form (defaults to the
//                standard line + "book a call directly" escape hatch)
function LeadCapture({ microcopy, compact }) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);

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
        // Page-global guard: the hero form and the sticky bar are two
        // instances of this component; email_capture must fire once.
        if (!window.__xfEmailCaptureFired) {
          window.__xfEmailCaptureFired = true;
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
        style={{ display: 'flex', gap: compact ? 8 : 12, alignItems: 'stretch', flexWrap: compact ? 'nowrap' : 'wrap', maxWidth: compact ? 440 : 520 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Work email"
          autoComplete="email"
          style={{
            flex: compact ? '1 1 180px' : '1 1 240px',
            boxSizing: 'border-box',
            padding: compact ? '11px 14px' : '14px 18px',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 16,
            color: '#1F1A17',
            background: '#FFFFFF',
            border: emailError ? '1px solid #A8341E' : '1px solid #B7A993',
            borderRadius: 8,
            outline: 'none',
          }}
        />
        <Button variant="primary" size={compact ? "md" : "lg"} as="button">Get started</Button>
      </form>
      {emailError ? (
        <div role="alert" style={{
          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13,
          color: '#A8341E', marginTop: compact ? 6 : 10,
        }}>{emailError}</div>
      ) : null}
      {compact ? null : <CTAMicrocopy>
        {microcopy || (
          <>
            30 minutes. No pitch deck. We just figure out if we're a good fit for your team.{' '}
            <a href="/book/" style={{ color: '#B8512C', fontWeight: 500 }}>Or book a call directly →</a>
          </>
        )}
      </CTAMicrocopy>}
      <LeadModal
        open={modalOpen}
        email={(window.xfAttribution ? window.xfAttribution.getLead().email : '') || email.trim().toLowerCase()}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

window.LeadCapture = LeadCapture;

// Sticky bottom capture bar (landing pages + pricing). Appears once the
// hero capture (#lp-hero-capture) has scrolled out of view, so the form is
// always reachable at the moment the page convinces someone.
function StickyCapture() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    // Dev preview: /page/#sticky-preview forces the bar visible.
    if (window.location.hash === '#sticky-preview') { setShow(true); return; }
    const hero = document.getElementById('lp-hero-capture');
    if (!hero || !('IntersectionObserver' in window)) {
      const onScroll = () => setShow(window.scrollY > 700);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
    const obs = new IntersectionObserver(
      (entries) => setShow(!entries[0].isIntersecting && entries[0].boundingClientRect.top < 0),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  if (!show) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 800,
      background: 'rgba(247, 242, 235, 0.96)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid #D9CFBF',
      boxShadow: '0 -6px 24px rgba(31,26,23,0.06)',
      padding: '10px 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <span className="sticky-note" style={{
          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14,
          fontWeight: 500, color: '#3A322D', whiteSpace: 'nowrap',
        }}>$2,900/mo all-in. 30-day risk-free trial.</span>
        <div style={{ flexShrink: 1, minWidth: 0 }}>
          <LeadCapture compact />
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) { .sticky-note { display: none; } }
      `}</style>
    </div>
  );
}

window.StickyCapture = StickyCapture;
