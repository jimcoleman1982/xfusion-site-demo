// Section 5: Pricing & Offer Stack — the conversion centerpiece
function Pricing() {
  const stack = [
    { label: 'Senior CS agent salary (full-time, dedicated to you)', value: '$3,500/mo' },
    { label: 'Recruiting and vetting through the TraitX Framework', value: '$4,500 one-time, equivalent monthly value $375/mo' },
    { label: 'Placement and onboarding into your business', value: '$1,500 one-time' },
    { label: 'Training in your CS workflows', value: '$750 one-time' },
    { label: 'Training and certification in AI-augmented CS workflows', value: '$1,500 one-time' },
    { label: 'Payroll services (salary disbursement, light HR, PTO)', value: '$300/mo' },
    { label: 'Culture and engagement (team-building, swag, gifting, anniversaries)', value: '$200/mo' },
    { label: 'Dedicated account manager (oversight and leadership)', value: '$1,200/mo' },
    { label: 'Ongoing performance management and coaching', value: '$500/mo' },
  ];

  return (
    <Section bg="paper-2" padding="lg" id="pricing">
      <Container>
        <div style={{ maxWidth: 880, marginBottom: 56 }}>
          <Eyebrow>Pricing & offer stack</Eyebrow>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4.2vw, 52px)',
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            margin: '0 0 28px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            $3,900/mo, all-in. Here's what's actually inside that number.
          </h2>
          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 18,
            lineHeight: 1.6,
            color: '#3A322D',
            maxWidth: 760,
          }}>
            <p style={{ margin: '0 0 20px' }}>
              A senior, AI-trained CS hire in the US runs $80,000 to $100,000+ per year fully loaded once you add benefits, taxes, payroll, equipment, recruiting fees, and management overhead. That's $6,600 to $8,300+ per month before you've trained them or built any culture around them.
            </p>
            <p style={{ margin: 0 }}>
              We deliver the equivalent talent (senior, AI-fluent, dedicated to your business) for $3,900/mo, with everything below included. Roughly half the cost of a comparable local hire, and we carry the management burden.
            </p>
          </div>
        </div>

        {/* Offer stack: desktop table + mobile cards */}
        <div className="offer-stack-table" style={{
          background: '#F7F2EB',
          border: '1px solid #D9CFBF',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 48,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gap: 0,
            padding: '20px 32px',
            background: '#EFE8DD',
            borderBottom: '1px solid #D9CFBF',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#6B5F56',
          }}>
            <div>What's included</div>
            <div style={{ textAlign: 'right' }}>Standalone value</div>
          </div>
          {stack.map((row, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1.6fr 1fr',
              gap: 24,
              padding: '20px 32px',
              borderBottom: '1px solid #D9CFBF',
              alignItems: 'baseline',
            }}>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.45,
                color: '#1F1A17',
                display: 'flex',
                gap: 14,
                alignItems: 'baseline',
              }}>
                <Icon name="check" size={16} color="#3A6B4E" stroke={2} style={{ position: 'relative', top: 2 }} />
                <span>{row.label}</span>
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                color: '#3A322D',
                textAlign: 'right',
                lineHeight: 1.45,
              }}>{row.value}</div>
            </div>
          ))}
          {/* Totals */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gap: 24,
            padding: '24px 32px',
            background: '#EFE8DD',
            borderBottom: '1px solid #D9CFBF',
            alignItems: 'baseline',
          }}>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 17,
              fontWeight: 600,
              color: '#1F1A17',
            }}>Total monthly value</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 500,
              color: '#1F1A17',
              textAlign: 'right',
            }}>$6,075/mo + $8,250 in one-time costs absorbed</div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gap: 24,
            padding: '24px 32px',
            borderBottom: '1px solid #D9CFBF',
            alignItems: 'baseline',
          }}>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 17,
              fontWeight: 600,
              color: '#1F1A17',
            }}>Comparable in-house cost (fully loaded)</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 500,
              color: '#1F1A17',
              textAlign: 'right',
            }}>$6,600 to $8,300+/mo</div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gap: 24,
            padding: '32px',
            background: '#F0D9A8',
            alignItems: 'baseline',
          }}>
            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 24,
              fontWeight: 600,
              color: '#1F1A17',
              letterSpacing: '-0.015em',
            }}>Your price</div>
            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 32,
              fontWeight: 600,
              color: '#B8512C',
              textAlign: 'right',
              letterSpacing: '-0.025em',
              lineHeight: 1,
            }}>$3,900/mo</div>
          </div>
        </div>

        {/* Mobile-only cards version */}
        <div className="offer-stack-cards" style={{ display: 'none', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {stack.map((row, i) => (
            <div key={i} style={{
              background: '#F7F2EB',
              border: '1px solid #D9CFBF',
              borderRadius: 12,
              padding: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                <Icon name="check" size={16} color="#3A6B4E" stroke={2} style={{ position: 'relative', top: 4 }} />
                <div style={{ fontSize: 15, lineHeight: 1.45, color: '#1F1A17', fontWeight: 500 }}>{row.label}</div>
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#6B5F56',
                paddingLeft: 28,
              }}>{row.value}</div>
            </div>
          ))}
          <div style={{
            background: '#EFE8DD',
            border: '1px solid #D9CFBF',
            borderRadius: 12,
            padding: 20,
          }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1F1A17', marginBottom: 6 }}>Total monthly value</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#3A322D' }}>$6,075/mo + $8,250 in one-time costs absorbed</div>
          </div>
          <div style={{
            background: '#EFE8DD',
            border: '1px solid #D9CFBF',
            borderRadius: 12,
            padding: 20,
          }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1F1A17', marginBottom: 6 }}>Comparable in-house cost (fully loaded)</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#3A322D' }}>$6,600 to $8,300+/mo</div>
          </div>
          <div style={{
            background: '#F0D9A8',
            border: '1px solid #B7A993',
            borderRadius: 12,
            padding: 24,
          }}>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 20, fontWeight: 600, color: '#1F1A17', marginBottom: 6 }}>Your price</div>
            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 32,
              fontWeight: 600,
              color: '#B8512C',
              letterSpacing: '-0.025em',
              lineHeight: 1,
            }}>$3,900/mo</div>
          </div>
        </div>

        {/* Pricing block */}
        <div style={{
          background: '#F7F2EB',
          border: '1px solid #D9CFBF',
          borderRadius: 12,
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
        }} className="pricing-block">
          <div>
            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 36,
              fontWeight: 600,
              color: '#1F1A17',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              marginBottom: 24,
            }}>
              $3,900/mo per full-time agent.
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'No deposit',
                'No setup fee',
                'No long-term contract, month-to-month',
                'Roughly half the cost of a senior, AI-trained CS agent hired locally',
                'Pay nothing for the first 30 days (see guarantee)',
              ].map((b, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: '#1F1A17',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}>
                  <Icon name="check" size={18} color="#3A6B4E" stroke={2} style={{ marginTop: 4 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Button variant="primary" size="lg" href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call</Button>
            <CTAMicrocopy />
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 760px) {
          .offer-stack-table { display: none !important; }
          .offer-stack-cards { display: flex !important; }
          .pricing-block { grid-template-columns: 1fr !important; gap: 32px !important; padding: 28px !important; }
        }
      `}</style>
    </Section>
  );
}

window.Pricing = Pricing;
