// Section 10: FAQ — accordion with 14 questions
const FAQ_ITEMS = [
  {
    q: 'Will they speak good English?',
    a: "Every candidate goes through human-led interviews where we evaluate English fluency, communication style, and professional presence. Before you ever schedule a meeting, you'll see and hear the candidate on a recorded Zoom video, so you can judge for yourself rather than take our word for it.",
  },
  {
    q: "What if the placement doesn't work out?",
    a: "That's exactly what the 30-Day Risk-Free Trial is for. We recruit, vet, and place a senior, AI-trained customer support agent in your business. You work with them for 30 full days. If you're not satisfied for any reason, you walk away without paying anything. Not a deposit. Not a setup fee. Nothing. We absorb every dollar of recruiting, vetting, training, and placement we invested.",
  },
  {
    q: 'Why is $3,900/mo the right price?',
    a: "Two reasons. First, every agent we place is senior-level, with deeper experience than a typical CS hire and trained to use AI tools to oversee AI agents on the front line. That means one xFusion agent handles a lot more volume than a junior rep at a cheaper agency, so the cost per ticket is actually lower. Second, $3,900 is roughly half what you'd pay for a senior, AI-trained CS agent in the U.S., and it includes recruiting, training, payroll, culture, and a dedicated account manager. No add-ons. No setup fees. No deposits.",
  },
  {
    q: 'How long does the process take?',
    a: 'About 14 days from your discovery call to a candidate panel in your inbox. We maintain a pre-vetted pipeline of senior, AI-trained CS candidates, which is why we can move that fast without cutting corners.',
  },
  {
    q: 'Do you handle payroll and HR?',
    a: "Yes, and it's included in the $3,900/mo. Salary disbursement, light HR, and PTO management are all handled by xFusion. Your placed agent is engaged as an independent contractor and managed by us, so you don't have to figure out international payroll on your own. xFusion is not an Employer of Record, and the agent isn't your employee; we handle the logistics so the relationship stays clean.",
  },
  {
    q: 'What roles can you fill?',
    a: "Customer support, primarily. Every CS placement is a senior, AI-augmented agent who can handle Tier 1, Tier 2, and a chunk of what used to require CS-engineering escalation (because they're trained to oversee AI workflows). We also place inside sales team members who work inbound leads (not cold calling) and AI operators who run AI workflows alongside your team. If you need a different kind of role, ask on the discovery call. We'll be honest about whether we can help.",
  },
  {
    q: 'Where does your talent come from?',
    a: "Primarily the Philippines, with strong representation from Kenya. Since 2020 we've built deep networks in both countries and learned which candidates actually thrive in long-term CS roles. Both markets have strong English-speaking professionals who treat CS as a real career, not a stepping-stone.",
  },
  {
    q: 'Is there a long-term contract?',
    a: "No. The service is month-to-month with no minimum term. There's no deposit, no setup fee, and no fine print. The 30-Day Risk-Free Trial is the strongest expression of that: pay nothing for the first month, walk away free if it's not a fit.",
  },
  {
    q: 'Do you replace American jobs?',
    a: 'No. Our work helps American small businesses keep growing and keep hiring locally where it matters most. Most of our clients use us for support roles that are hard to staff economically with U.S.-based teams. Filling those roles internationally lets owners invest more in core, on-site work where U.S. hiring makes sense.',
  },
  {
    q: 'Why not just hire locally for support work?',
    a: 'Senior CS reps in the U.S. with AI fluency cost $80,000 to $100,000+/year fully loaded, take months to find, and frequently leave within 18 months. Through xFusion, you get a senior, AI-trained agent for roughly half that cost, with culture and engagement built in to keep them long-term. You also skip the search, the training, the payroll setup, and the cultural overhead. We handle all of it.',
  },
  {
    q: 'What about after-hours coverage?',
    a: "Your placed agent works full-time hours, just like any team member. Because they're based in the Philippines or Kenya, you have room to structure coverage however you want. Some clients align the agent to U.S. business hours. Others stagger shifts to cover evenings or weekends. Some build a team that covers around the clock. You pick the schedule; we handle the management.",
  },
  {
    q: 'How do I keep a remote team member engaged long-term?',
    a: "This is one of the most common worries we hear, which is why Culture & Engagement is included in the $3,900/mo. We run virtual and in-person team-building events, contests, branded swag, birthday and anniversary gifts, and structured holiday gifting. Pair that with a role that pays a real living wage in the agent's local economy, and you get someone who builds a career on your team rather than rotating through.",
  },
  {
    q: 'Why not just use a chatbot?',
    a: "Pure AI handles the easy 60% of support volume well. The hard 40% (angry customers, edge cases, judgment calls, brand-sensitive escalations) is where chatbot-only solutions break, often visibly. xFusion's senior agents use AI as a tool rather than a replacement: they oversee AI on the front line and step in for the moments that matter. You get the throughput of AI plus the judgment and warmth of a human, instead of picking one and living with the limits.",
  },
  {
    q: 'What does "AI-augmented" actually mean in practice?',
    a: "It means your placed agent is trained to use AI tools (including Claude Code, Claude Cowork, and others) as part of their daily workflow. They draft replies with AI assistance, route and triage tickets with AI logic, and oversee AI agents that handle high-volume routine cases. Their experience tells them when to trust the AI's output and when to step in. The result is a single human handling far more volume than they could solo, without sacrificing the quality and warmth your customers expect.",
  },
];

function FAQ() {
  const [open, setOpen] = React.useState(0);

  return (
    <Section bg="paper" padding="lg" id="faq" style={{ borderTop: '1px solid #D9CFBF' }}>
      <Container narrow>
        <div style={{ marginBottom: 56 }}>
          <Eyebrow>Frequently asked</Eyebrow>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 'clamp(32px, 4.2vw, 52px)',
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            margin: '0 0 20px',
            color: '#1F1A17',
            textWrap: 'balance',
          }}>
            Questions we get on every Discovery Call.
          </h2>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 19,
            lineHeight: 1.55,
            color: '#3A322D',
            margin: 0,
          }}>
            The fourteen most common questions about how this works, the talent, the AI part, the pricing, and what happens if it doesn't work out.
          </p>
        </div>

        <div style={{ borderTop: '1px solid #D9CFBF' }}>
          {FAQ_ITEMS.map((it, i) => (
            <FAQRow
              key={i}
              {...it}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>

        <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Button variant="primary" size="lg" href="https://savvycal.com/xfusion/lets-chat">Book a Discovery Call</Button>
          <CTAMicrocopy />
        </div>
      </Container>
    </Section>
  );
}

function FAQRow({ q, a, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid #D9CFBF' }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '24px 4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
          textAlign: 'left',
          cursor: 'pointer',
          fontFamily: "'Source Serif 4', serif",
          fontSize: 21,
          fontWeight: 600,
          color: '#1F1A17',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}>
        <span>{q}</span>
        <span style={{
          width: 28, height: 28,
          borderRadius: 999,
          border: '1px solid #B7A993',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1F1A17',
          flexShrink: 0,
          transition: 'all 240ms cubic-bezier(0.4,0,0.6,1)',
          background: isOpen ? '#1F1A17' : 'transparent',
          borderColor: isOpen ? '#1F1A17' : '#B7A993',
        }}>
          <Icon name={isOpen ? 'minus' : 'plus'} size={14} color={isOpen ? '#F7F2EB' : '#1F1A17'} stroke={2} />
        </span>
      </button>
      <div style={{
        maxHeight: isOpen ? 600 : 0,
        overflow: 'hidden',
        transition: 'max-height 400ms cubic-bezier(0.4,0,0.6,1)',
      }}>
        <div style={{
          padding: '0 4px 28px',
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 16,
          lineHeight: 1.65,
          color: '#3A322D',
          maxWidth: 680,
        }}>
          {a}
        </div>
      </div>
    </div>
  );
}

window.FAQ = FAQ;
