import Research from './Research';
import Teaching from './Teaching';

export default function Home() {
  return(
    <main className="one-page">
      <section className="intro section-shell" id="intro">
        <div className="intro-identity">
          <img src="/logo-transparent" alt="Daryl Larsen bridge logo" className="home-logo" />
          <img src="/headshot.png" alt="Daryl Larsen" className="headshot" />
        </div>

        <div className="intro-copy">
          <h1>Welcome!</h1>
          <p>
            I'm a Ph.D. candidate in Urban Land Economics at the Sauder School of Business at the
            University of British Columbia. My research lies at the intersection of
            {' '}<strong>Urban Economics, Housing</strong>, and <strong>Spatial Economics</strong>.
          </p>
          <p>
            My job market paper develops a simple spatial model showing why citywide restrictions on
            short-term rentals may not improve housing affordability. I then test its predictions using
            a synthetic difference-in-difference approach in the context of New York City's Local Law 18.
          </p>
          <p>
            I have taught <em>Environment, Society and Government</em> (COMM 394) at Sauder, and served
            as a teaching assistant for many other classes.
          </p>
          <p>
            Prior to starting the Ph.D., I worked at the Real Estate Finance section of the Federal
            Reserve Board of Governors.
          </p>
          <p>
            My dissertation committee consists of Sanghoon Lee, Thomas Davidoff, and Robert Helsley.
          </p>
        </div>
      </section>

      <Research />
      <Teaching />
    </main>
  )
}
