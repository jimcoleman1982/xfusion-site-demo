const TILES = [
  {
    industry: 'Video commerce SaaS',
    country: 'Israel',
    headline: 'Shopify app ranking jumped roughly 90 spots after a wave of 5-star reviews tied to better customer support.',
    elaboration: "Tolstoy needed CS that could keep up with their growth without forcing the founders to keep building a support function from scratch. xFusion placed a senior team member who became part of the company, handled customer interactions at a level that earned 5-star reviews, and helped Tolstoy climb the Shopify rankings as a result.",
    quote: 'xFusion has been an absolute game-changer for Tolstoy. Working with them has enabled us to grow faster and more professionally than we ever could have alone.',
    attribution: 'Dov Kaufmann, Tolstoy',
    href: 'tolstoy/',
    photoName: 'Dov Kaufmann',
    photoPath: '../images/dov-kaufmann-tolstoy.png',
    photoTone: 'clay',
    linkLabel: 'Read the Tolstoy case study',
  },
  {
    industry: 'Scheduling SaaS',
    country: 'USA',
    headline: 'Cut average response time by 84.79% and turned an outsourcing skeptic into an advocate.',
    elaboration: "Derrick was openly skeptical of outsourced support before working with xFusion. Once a senior xFusion team member was placed and trained on the SavvyCal product, Derrick saw response quality and customer interactions that lined up with how he would have answered tickets himself, which is what changed his mind on the entire model.",
    quote: 'I was admittedly skeptical of the outsourcing model at first, but xFusion has proven that skepticism unwarranted. This is not your stereotypical outsourced support agency.',
    attribution: 'Derrick Reimer, SavvyCal',
    href: 'savvycal/',
    photoName: 'Derrick Reimer',
    photoPath: '../images/derrick-reimer-savvycal.png',
    photoTone: 'forest',
    linkLabel: 'Read the SavvyCal case study',
  },
  {
    industry: 'Credit and personal finance',
    country: 'USA',
    headline: 'Maintained a 4.9 Shopify CSAT score for nearly four years while xFusion handled the vast majority of tickets.',
    elaboration: "Bonify's leadership was buried in tickets, working in the business when they needed to be working on it. xFusion placed a senior CS team member who took over the daily ticket load, handled escalations, and quickly earned enough trust that the team relied on xFusion to \u201cmake it right fast\u201d when issues came up.",
    quote: 'We were sort of in support hell, just kind of working in the business instead of on the business.',
    attribution: 'John Carbone, Bonify',
    href: 'bonify/',
    photoName: 'John Carbone',
    photoPath: '../images/john-carbone-bonify.png',
    photoTone: 'butter',
    linkLabel: 'Read the Bonify case study',
  },
  {
    industry: 'Shopify apps and e-commerce operations',
    country: 'France / USA',
    headline: 'Grew CS coverage from one agent to two full-time plus a part-time weekend agent, with hundreds of new 5-star app reviews and a higher organic ranking.',
    elaboration: "Toby didn't want a generic outsourced CS shop. He wanted a team built around how Ordered Magic actually operates. xFusion placed senior team members, trained them on Ordered Magic's workflows, and ran the culture and management layer so it operated like an internal team.",
    quote: "I didn't really see it as outsourced support. I really saw it as building a remote team around our working practices and our values.",
    attribution: 'Toby Marsden, Ordered Magic',
    href: 'ordered-magic/',
    photoName: 'Toby Marsden',
    photoPath: '../images/toby-marsden-ordered-magic.png',
    photoTone: 'rust',
    linkLabel: 'Read the Ordered Magic case study',
  },
  {
    industry: 'B2B SaaS (visitor management)',
    country: 'USA',
    headline: 'Hit a 98.9% CSAT rating with xFusion, then expanded the partnership multiple times.',
    elaboration: "TheReceptionist chose xFusion because the values lined up, not just because the math did. Over a long-term engagement, xFusion has continued to place strong CS team members, manage them attentively, and give Tom's team a partner they trust enough to keep growing with year after year.",
    quote: 'xFusion is attentive, hire the best people, and work very hard to consider our needs. We all look forward to many more years of growth with the xFusion team.',
    attribution: 'Tom Foster, TheReceptionist',
    href: 'the-receptionist/',
    photoName: 'Tom Foster',
    photoPath: '../images/tom-foster-thereceptionist.png',
    photoTone: 'olive',
    linkLabel: 'Read the TheReceptionist case study',
  },
  {
    industry: 'Video and creator SaaS',
    country: 'Brazil',
    headline: 'The founder stopped worrying about customer support, full stop.',
    elaboration: "Marcelo was running point on customer support himself and described it as a constant weight on his attention. After the xFusion team came in, customer support stopped being something he had to actively think about, which gave him back the head space to run the rest of the business.",
    quote: "Since I hired the xFusion team, I've been very pleased because I don't have to worry anymore about customer support.",
    attribution: 'Marcelo Olivera, Revy',
    href: 'revy/',
    photoName: 'Marcelo Olivera',
    photoPath: '../images/marcelo-olivera-revy.png',
    photoTone: 'rose',
    linkLabel: 'Read the Revy case study',
  },
  {
    industry: 'Satellite imagery and geospatial data',
    country: 'USA',
    headline: 'Held a 91.9% CSAT with a 36-minute average response time across a global, 24/7 customer base.',
    elaboration: "SkyFi's customers reach out around the clock, and the team needed CS coverage that could handle a global, technical user base without dropping the ball. xFusion's senior team members took ownership of customer interactions end-to-end, which is the part Claire highlights most.",
    quote: "xFusion's emphasis on customer satisfaction has been such an asset to SkyFi. They never leave a customer interaction unresolved.",
    attribution: 'Claire Fundingsland, SkyFi',
    href: 'skyfi/',
    photoName: 'Claire Fundingsland',
    photoPath: '../images/claire-fundingsland-skyfi.png',
    photoTone: 'sand',
    linkLabel: 'Read the SkyFi case study',
  },
];

function CaseStudiesIndex() {
  return (
    <div data-screen-label="Case Studies Index" style={{ background: '#F7F2EB', minHeight: '100vh' }}>
      <Nav active="case-studies"/>
      <PageHero/>
      <IntroParagraph/>

      <Section bg="paper" padding="md" style={{ paddingTop: 0, paddingBottom: 64 }}>
        <Container>
          <div style={{
            borderTop: '1px solid #D9CFBF',
          }}>
            {TILES.map((t, i) => (
              <CaseStudyTile
                key={i}
                index={i + 1}
                total={TILES.length}
                flip={i % 2 === 1}
                industry={t.industry}
                country={t.country}
                headline={t.headline}
                elaboration={t.elaboration}
                quote={t.quote}
                attribution={t.attribution}
                href={t.href}
                photoName={t.photoName}
                photoPath={t.photoPath}
                photoTone={t.photoTone}
                linkLabel={t.linkLabel}
              />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection/>
      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CaseStudiesIndex/>);
