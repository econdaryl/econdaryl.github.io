export default function Research() {
  return(
    <section className="research section-shell content-section" id="research">
      <h2 className="section-title">Research</h2>
      <div className="paper-heading">
        <p className="eyebrow">Working paper</p>
        <h3>The Value of W</h3>
        <p className="research-subtitle">Pricing Neighbourhood Prestige</p>
        <p>With Sanghoon Lee and Seung Hoon Lee</p>
        <p className="paper-status">Revise and Resubmit, <em>Journal of Urban Economics</em></p>
        <a className="button-link" href='/research/value-of-w.pdf'>Read the paper (PDF)</a>
      </div>

      <article className="research-card">
        <section>
          <h2>The question</h2>
          <p>
            Prestigious neighbourhoods usually also have better schools, amenities, or access to jobs,
            making the value of status hard to separate from the value of the place itself. We ask whether
            buyers pay extra for Vancouver's West Side label even when nearby homes offer very similar
            physical surroundings.
          </p>
        </section>

        <section>
          <h2>A boundary that changes the address, not the street</h2>
          <p>
            Ontario Street is the historic dividing line between Vancouver's West Side and East Side.
            It is a quiet residential street rather than a highway, river, or municipal border. For homes
            on east-west streets, however, crossing Ontario immediately changes the address prefix from
            “East” to “West.”
          </p>
          <p>
            Using residential sales from 2001 to 2024, we compare properties within 150 metres of Ontario
            Street. The analysis controls for property characteristics, census tract, and sale timing.
          </p>
        </section>

        <section>
          <h2>What we find</h2>
          <ul className="findings">
            <li>Comparable single-family homes on the west side sell for <strong>20.5% more</strong>.</li>
            <li>Strata homes show an estimated <strong>11.0% premium</strong>.</li>
            <li>At 2021 prices, the single-family estimate is roughly <strong>$500,000</strong>.</li>
          </ul>
        </section>

        <section>
          <h2>A useful reality check</h2>
          <p>
            We repeat the exercise at other quiet north-south streets that do not coincide with school
            catchment changes. Ontario Street is the filled point below; the open points are placebo
            boundaries. None produces a single-family estimate of similar magnitude.
          </p>
          <figure>
            <img src="/research/placebo.png" alt="Ontario Street price premium compared with placebo street boundaries" />
            <figcaption>
              Estimated single-family price differences at Ontario Street and comparable placebo boundaries.
              Bars show 95% confidence intervals.
            </figcaption>
          </figure>
        </section>

        <section>
          <h2>Why it matters</h2>
          <p>
            Housing values reflect more than buildings and access to amenities. Neighbourhood identity
            itself can be capitalized into prices, reinforcing residential sorting and creating an additional
            barrier to buying into a high-status area.
          </p>
        </section>
      </article>
    </section>
  )
}
