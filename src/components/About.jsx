import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '../lib/useReveal'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Ces chiffres doivent rester alignés sur le CV : un recruteur lit le CV puis
// clique ici, et la moindre divergence coûte la crédibilité des deux documents.
// N'écris ici que ce qui est défendable en entretien.
const stats = [
  { value: '2 ans', label: 'En entreprise' },
  { value: '4', label: 'Projets livrés' },
  { value: '100%', label: 'Sur-mesure' },
]

export default function About() {
  const ref = useReveal()
  const traceRef = useRef(null)

  // Serpentine stroke that draws in behind the text, scrubbed to scroll.
  // Use the real path length (user units) so GSAP's px-based tween matches the
  // dash units — animating a normalized 0–1 offset draws instantly instead.
  useEffect(() => {
    const path = traceRef.current
    if (!path) return
    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    if (prefersReduced()) {
      gsap.set(path, { strokeDashoffset: 0 }) // static, fully drawn
      return
    }
    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: path.closest('.about'),
          start: 'top 85%',
          end: 'bottom 30%',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="section about" id="about" ref={ref}>
      <svg
        className="about-trace"
        viewBox="0 0 1000 1400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={traceRef}
          d="M 540 -60
             C 250 150 220 380 520 500
             C 820 620 880 850 500 980
             C 180 1100 170 1320 560 1480"
        />
      </svg>

      <div className="shell">
        <div className="section-head">
          <span className="pixel">01 — À propos</span>
        </div>

        <div className="about-grid">
          <h2 className="about-statement" data-reveal>
            Je crée des sites qui mêlent{' '}
            <em className="serif accent">recherche esthétique</em> et{' '}
            <em className="serif">exécution technique</em>, du premier pixel
            jusqu'à la mise en production.
          </h2>

          <div className="about-body">
            <p data-reveal>
              Designer et développeur full-stack, je travaille en indépendant avec
              des marques et des fondateurs qui veulent un site à leur image — pas
              un template. Branding, interface, animation, code : je tiens toute la
              chaîne pour garder une cohérence totale.
            </p>
            <p data-reveal>
              Mon obsession : le détail. Le bon contraste, la bonne courbe
              d'animation, le bon temps de chargement. Ce sont eux qui font qu'un
              site reste en tête.
            </p>

            <ul className="about-stats" data-reveal>
              {stats.map((s) => (
                <li key={s.label}>
                  <span className="about-stat-value serif">{s.value}</span>
                  <span className="pixel">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
