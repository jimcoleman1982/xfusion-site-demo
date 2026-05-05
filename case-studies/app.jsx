const TILES = [
  {
    industry: 'Video commerce SaaS',
    country: 'Israel',
    headline: 'Shopify app ranking jumped about 90 spots after a wave of 5-star reviews thanks to better customer support.',
    elaboration: "Tolstoy was growing fast and needed support that could keep up. They didn't want to keep rebuilding their support team from scratch. xFusion placed a senior team member who became part of the company. They handled customer questions so well that customers left 5-star reviews, and Tolstoy climbed the Shopify rankings as a result.",
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
    headline: 'Cut average reply time by 84.79% and turned an outsourcing doubter into a believer.',
    elaboration: "Derrick didn't believe in outsourced support before working with xFusion. Once a senior xFusion team member was placed and trained on SavvyCal, Derrick saw replies and customer chats that matched how he would have answered them himself. That's what changed his mind on the whole idea.",
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
    headline: 'Held a 4.9 Shopify customer rating for nearly four years while xFusion handled almost every ticket.',
    elaboration: "Bonify's leaders were buried in tickets, working in the business when they needed to be working on it. xFusion placed a senior support team member who took over the daily ticket load and handled the tougher cases. They quickly earned enough trust that the team relied on xFusion to \u201cmake it right fast\u201d when problems came up.",
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
    headline: 'Grew support coverage from one agent to two full-timers plus a part-time weekend agent, with hundreds of new 5-star app reviews and a higher search ranking.',
    elaboration: "Toby didn't want a generic outsourced support shop. He wanted a team built around how Ordered Magic actually works. xFusion placed senior team members, trained them on Ordered Magic's process, and ran the culture and management side so it felt like an in-house team.",
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
    headline: 'Hit a 98.9% customer satisfaction rating with xFusion, then grew the partnership several times.',
    elaboration: "TheReceptionist chose xFusion because the values matched, not just because the cost did. Over many years of working together, xFusion has kept placing strong support team members, managed them closely, and given Tom's team a partner they trust enough to keep growing with year after year.",
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
    headline: 'The founder stopped worrying about customer support. Period.',
    elaboration: "Marcelo was handling customer support himself and called it a constant weight on his mind. After the xFusion team came in, customer support stopped being something he had to think about. That gave him back the mental space to run the rest of the business.",
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
    headline: 'Held a 91.9% customer satisfaction rating with a 36-minute average reply time across customers around the world, 24/7.',
    elaboration: "SkyFi's customers reach out around the clock, and the team needed support that could handle a global, technical group of users without dropping the ball. xFusion's senior team members took full ownership of customer chats from start to finish. That is the part Claire highlights most.",
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
