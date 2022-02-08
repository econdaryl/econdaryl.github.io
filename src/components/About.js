export default function About() {
  return(
    <div className="about">
      <h2>About Me</h2>

      <div className="container">
        <img src= 'ryder.jpg' alt='me and my dog' id='ryder'/>
        <div>
        <p>
        I'm a PhD student studying Urban Land Economics at UBC's Sauder school of business.
        I became interested in Economics as a high school student and had many professors in my neighborhood 
        who were wonderful mentors that encouraged me in my pursuits. As I moved to DC and 
        worked as a Research Assistant in the Real Estate Finance section of the Federal Reserve
        I became more interested in housing and urban econonomics.
        </p>
        <p>
        In my spare time you can find me with my gorgeous dog Ryder either in a nearby park or up
        a mountain. If it's raining I'm probably inside watching tennis.
        </p>
        <p>
        A current non-work related goal of mine is to ride every bus and train line in
        Vancouver. Did I mention I love public transportation?
        </p>
        </div>

        <img src='transit.jpeg' alt='transit map' id='map'/>
      </div>

    </div>
  )
}