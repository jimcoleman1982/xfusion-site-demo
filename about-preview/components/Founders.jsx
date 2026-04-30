function Founders() {
  return (
    <Section bg="paper" padding="lg">
      <Container>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 112 }} className="founders-stack">
          <FounderCard
            index={5}
            name="Jim Coleman"
            role="Co-founder"
            imageSrc="../images/jim-coleman-hero.png"
            imageLabel="Co-founder portrait"
            imageSide="right"
            tone="clay"
            paragraphs={[
              "Before xFusion, Jim worked as a detective, then built and sold a few businesses of his own, then ran operations for a private equity fund. The detective work taught him to read people. The businesses taught him how operations either make or break a company. The PE work taught him what happens when you put the right person in the right seat at scale.",
              "The thread that ran through all of it: the right people change everything. Vetting them carefully, treating them well, and keeping them for the long haul matters more than almost any other operational decision a business makes.",
              "Jim and his family live in the Denver area, where they raised five children. They were a foster family for many years and are also an adoptive family. Jim's wife and kids are the reason most of the work gets done.",
            ]}
          />
          <FounderCard
            index={5}
            name="David Tran"
            role="Co-founder"
            imageSrc="../images/david-tran-profile.jpeg"
            imageLabel="Co-founder portrait"
            imageSide="left"
            tone="forest"
            paragraphs={[
              "David studied Computer Science at UC Berkeley, then spent years as a software engineer at Uber and Salesforce. At Uber he worked on internal tools, growth, mobile, dispatch optimization, and anti-fraud backend systems. At Salesforce he kept building infrastructure other engineers depended on.",
              "That engineering discipline shows up in how xFusion vets people. Recruiting at scale is a systems problem before it's a human one, and David's instinct is to look at the funnel, find where the right candidates are getting lost, and rebuild the part of the process that's failing.",
              "A first-generation Vietnamese American, David is a newlywed and an avid traveler. He believes great companies are built by people who genuinely care, and that you can tell within about ten minutes of meeting someone whether they actually do.",
            ]}
          />
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .founders-stack { gap: 80px !important; }
        }
      `}</style>
    </Section>
  );
}

window.Founders = Founders;
