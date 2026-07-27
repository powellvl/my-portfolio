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
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
              site.email,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="mail-cta"
            ref={magnet}
            data-cursor
            aria-label={`Écrire à ${site.email}`}
            title={site.email}
          >
            <svg
              className="mail-icon"
              viewBox="0 0 100 72"
              fill="none"
              aria-hidden="true"
            >
              {/* letter — hidden behind the front, slides out on hover */}
              <rect className="mail-letter" x="24" y="40" width="52" height="22" rx="2" />
              {/* front pocket — opaque, hides the letter when closed */}
              <rect className="mail-front" x="5" y="38" width="90" height="28" />
              <path className="mail-vlines" d="M5 66 L50 42 L95 66" />
              {/* flap — flips open on hover */}
              <path className="mail-flap" d="M5 16 L50 46 L95 16 Z" />
              {/* envelope outline, drawn last so it stays crisp */}
              <rect className="mail-body" x="5" y="15" width="90" height="51" rx="3" />
            </svg>
          </a>
        </div>

        <ul className="contact-socials" data-reveal>
          {site.socials.map((s) => {
            // open external links (or any flagged target:_blank) in a new tab
            const newTab = s.target === '_blank' || /^https?:/i.test(s.href)
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="link-underline"
                  data-cursor
                  target={newTab ? '_blank' : undefined}
                  rel={newTab ? 'noreferrer' : undefined}
                >
                  {s.label}
                </a>
              </li>
            )
          })}
        </ul>

        <p className="contact-loc pixel" data-reveal>
          {site.location}
        </p>
      </div>
    </section>
  )
}
