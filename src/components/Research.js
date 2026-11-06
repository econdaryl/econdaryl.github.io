export default function Research() {
  return(
    <section className="research section-shell content-section" id="research">
      <h2 className="section-title">Research</h2>
      <div className="paper-heading">
        <p className="eyebrow">Job Market Paper</p>
        <h3>The Metro Is the Market</h3>
        <p className="research-subtitle">Why Local Airbnb Regulations May Not Lower Rents</p>
        <a className="button-link" href='/research/jmp_v1.pdf'>View draft (PDF)</a>
      </div>

      <article className="research-card">
        <section>
          <h2>Abstract</h2>
          <p>
            Restricting short-term rentals can return housing to residents within a municipality without substantially increasing residential housing availability across its metropolitan market. Visitors displaced from regulated locations may stay elsewhere in the same metro, inducing landlords there to move housing into short-term use. I develop a spatial equilibrium model that makes this offset explicit. With minimal assumptions, local regulation reallocates short-term rentals without changing residential rents. Short-term rental prices rise and visitor utility falls. Evidence presented for New York City's Local Law 18 shows higher short-term rental prices, an outward shift in short-term rental activity, and no sustained decline in residential rents in the reported comparisons, consistent with the model predictions.
          </p>
          <figure>
            <a href="/research/airbnb-prepost-shares.pdf" aria-label="View change in NYC Airbnb shares figure as a PDF">
              <img src="/research/airbnb-prepost-shares.png" alt="Map of changes in NYC Airbnb shares, showing declines concentrated in Manhattan and increases in many outer neighbourhoods. Purple indicates increases and red indicates decreases in log share." />
            </a>
            <figcaption>
              Change in NYC Airbnb shares. Source: Inside Airbnb.{' '}
              <a href="/research/airbnb-prepost-shares.pdf">View figure (PDF)</a>.
            </figcaption>
          </figure>
        </section>
        <section>
          <h2>The question</h2>
          <p>
            Can local restrictions on short-term rentals improve housing affordability when visitors
            can stay elsewhere in the same metropolitan area? Housing returned to residents inside
            a regulated city may be offset by housing converted to tourist use outside its borders.
          </p>
        </section>

        <section>
          <h2>The mechanism</h2>
          <p>
            I develop a spatial equilibrium model in which visitors and residents compete for housing.
            When metropolitan visitor demand stays fixed and eligible locations can absorb displaced
            visitors, local restrictions reallocate short-term rentals without lowering residential
            rents. Visitors instead face higher accommodation prices and stay farther from the centre.
          </p>
        </section>

        <section>
          <h2>Evidence from New York City</h2>
          <p>
            Evidence from New York City's Local Law 18 shows higher short-term rental prices,
            an outward shift in short-term rental activity, and no sustained decline in residential
            rents in the reported comparisons. These patterns are consistent with metropolitan
            substitution, although they do not establish complete displacement or an exactly zero
            effect on rents.
          </p>
        </section>

        <section>
          <h2>Why it matters</h2>
          <p>
            Municipal boundaries need not define the housing market. The affordability gains from
            local short-term rental regulation depend on how much tourist housing demand falls
            across the metro, and how much simply moves elsewhere within it.
          </p>
        </section>
      </article>

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
