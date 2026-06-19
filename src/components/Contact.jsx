import { useMagnetic } from '../lib/useMagnetic'
import { useReveal } from '../lib/useReveal'
import { site } from '../data/site'

export default function Contact() {
  const ref = useReveal()
  const magnet = useMagnetic(0.4)

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="shell">
        <span className="pixel" data-reveal>
          04 — Contact
        </span>

        <h2 className="contact-title" data-reveal>
          <span className="line-mask">
            <span>Travaillons</span>
          </span>
          <span className="line-mask">
            <span className="serif accent">ensemble.</span>
          </span>
        </h2>

        <div className="contact-cta" data-reveal>
          <a
            href={`mailto:${site.email}`}
            className="contact-email"
            ref={magnet}
            data-cursor
          >
            {site.email}
          </a>
        </div>

        <ul className="contact-socials" data-reveal>
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="link-underline" data-cursor>
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="contact-loc pixel" data-reveal>
          {site.location}
        </p>
      </div>
    </section>
  )
}
