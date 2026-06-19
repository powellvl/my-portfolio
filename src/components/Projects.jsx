import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const section = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const narrow = window.matchMedia('(max-width: 880px)').matches
    if (reduced || narrow) {
      section.current?.classList.add('is-stacked')
      return
    }

    const ctx = gsap.context(() => {
      const getScroll = () => track.current.scrollWidth - window.innerWidth

      const tween = gsap.to(track.current, {
        x: () => -getScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => '+=' + getScroll(),
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // subtle parallax on each card's inner content
      gsap.utils.toArray('.project-card').forEach((card) => {
        const inner = card.querySelector('.project-meta')
        gsap.fromTo(
          inner,
          { x: 40 },
          {
            x: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section projects" id="projects" ref={section}>
      <div className="projects-head shell">
        <span className="pixel">03 — Projets sélectionnés</span>
        <h2 className="section-title">
          Travaux <em className="serif accent">récents</em>
        </h2>
      </div>

      <div className="projects-track" ref={track}>
        <div className="projects-track-pad" aria-hidden="true" />
        {projects.map((p) => (
          <article
            className="project-card"
            key={p.id}
            data-cursor
            style={{ '--card-bg': p.accent }}
          >
            <div className="project-top">
              <span className="pixel">{p.index}</span>
              <span className="pixel">{p.year}</span>
            </div>

            <div className="project-visual" aria-hidden="true">
              <span className="project-visual-label serif">{p.title}</span>
            </div>

            <div className="project-meta">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-role pixel">{p.role}</p>
              <p className="project-summary">{p.summary}</p>
              <ul className="project-tags">
                {p.tags.map((t) => (
                  <li key={t} className="pixel tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <div className="projects-track-end shell">
          <p className="serif">
            Un projet en tête&nbsp;? <a href="#contact" className="accent link-underline">Parlons-en.</a>
          </p>
        </div>
      </div>
    </section>
  )
}
