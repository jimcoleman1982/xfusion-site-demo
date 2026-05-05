// Section 10: FAQ — accordion with 14 questions
const FAQ_ITEMS = [
  {
    q: 'Will they speak good English?',
    a: "Every candidate sits through interviews with a real person where we check English skills, how they talk, and how they come across. Before you meet with anyone, you'll watch a Zoom recording of them, so you can judge for yourself instead of taking our word for it.",
  },
  {
    q: "What if the placement doesn't work out?",
    a: "That's exactly what the 30-Day Risk-Free Trial is for. We recruit, vet, and place a senior, AI-trained customer support agent in your business. You work with them for 30 full days. If you're not satisfied for any reason, you walk away without paying anything. Not a deposit. Not a setup fee. Nothing. We absorb every dollar of recruiting, vetting, training, and placement we invested.",
  },
  {
    q: 'Why is $3,900/mo the right price?',
    a: "Two reasons. First, every agent we place is senior, with more experience than a typical support hire, and trained to use AI tools to handle the easy stuff. So one xFusion agent does a lot more work than a junior rep at a cheaper agency. The cost per ticket is actually lower. Second, $3,900 is about half what you'd pay for the same kind of person in the U.S., and it includes hiring, training, payroll, culture, and an account manager. No add-ons. No setup fees. No deposits.",
  },
  {
    q: 'How long does the process take?',
    a: 'About 14 days from your discovery call to a candidate list in your inbox. We keep a pool of senior, AI-trained support candidates ready to go, which is why we can move that fast without cutting corners.',
  },
  {
    q: 'Do you handle payroll and HR?',
    a: "Yes, and it's part of the $3,900/mo. xFusion handles paying salaries, light HR, and time off. Your agent is hired as an independent contractor and managed by us, so you don't have to deal with international payroll. xFusion is not an Employer of Record, and the agent isn't your employee. We handle the paperwork so the setup stays simple.",
  },
  {
    q: 'What roles can you fill?',
    a: "Customer support, mostly. Every support agent we place is senior, trained to use AI, and able to handle Tier 1, Tier 2, and some cases that used to need an engineer's help. We also place inside sales people who work inbound leads (not cold calling) and AI operators who run AI tools alongside your team. If you need a different kind of role, ask on the discovery call. We'll be honest about whether we can help.",
  },
  {
    q: 'Where does your talent come from?',
    a: "Mostly the Philippines, with a strong group from Kenya. Since 2020 we've built deep networks in both countries and learned which candidates actually thrive in long-term support roles. Both markets have strong English-speaking professionals who treat support as a real career, not a stepping-stone.",
  },
  {
    q: 'Is there a long-term contract?',
    a: "No. The service is month-to-month with no minimum term. There's no deposit, no setup fee, and no fine print. The 30-Day Risk-Free Trial is the strongest expression of that: pay nothing for the first month, walk away free if it's not a fit.",
  },
  {
    q: 'Do you replace American jobs?',
    a: 'No. Our work helps American small businesses keep growing and keep hiring at home where it matters most. Most of our clients use us for support jobs that are hard to fill at U.S. wages. Filling those jobs overseas lets owners spend more on the core jobs where U.S. hiring makes sense.',
  },
  {
    q: 'Why not just hire locally for support work?',
    a: 'Senior support reps in the U.S. who know AI cost $80,000 to $100,000+ per year, take months to find, and often quit within 18 months. With xFusion, you get a senior, AI-trained agent for about half that cost, with the culture work built in to keep them around long-term. You also skip the search, the training, the payroll setup, and the culture work. We handle all of it.',
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
    a: "AI on its own handles the easy 60% of support work well. The hard 40% (angry customers, weird cases, judgment calls, sensitive issues) is where chatbot-only setups break, often in public. xFusion's senior agents use AI as a tool, not a replacement. They let AI handle the easy stuff and step in for the moments that matter. You get the speed of AI plus the judgment and warmth of a person, instead of picking one and living with the limits.",
  },
  {
    q: 'What does "AI-trained" actually mean in practice?',
    a: "It means your agent is trained to use AI tools (like Claude Code, Claude Cowork, and others) every day. They write replies with AI's help, sort and route tickets with AI, and oversee AI tools that handle the routine, high-volume cases. Their experience tells them when to trust what AI gives them and when to step in. The result: one person handling far more work than they could alone, without giving up the quality and warmth your customers expect.",
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
