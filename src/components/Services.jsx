import { useReveal } from '../lib/useReveal'
import { services } from '../data/services'

export default function Services() {
  const ref = useReveal({ stagger: 0.05 })

  return (
    <section className="section services" id="services" ref={ref}>
      <div className="shell">
        <div className="section-head">
          <span className="pixel">02 — Services</span>
          <h2 className="section-title">
            Ce que je <em className="serif accent">fais</em>
          </h2>
        </div>

        <ul className="services-accordion">
          {services.map((s) => (
            <li
              className="service-panel reveal"
              key={s.id}
              data-reveal
              data-cursor
              tabIndex={0}
            >
              <span className="pixel service-idx">{s.index}</span>

              <div className="service-panel-body">
                <h3 className="service-title">{s.title}</h3>
                <div className="service-detail">
                  <p className="service-summary">{s.summary}</p>
                  <ul className="service-tags">
                    {s.tags.map((t) => (
                      <li key={t} className="pixel tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
