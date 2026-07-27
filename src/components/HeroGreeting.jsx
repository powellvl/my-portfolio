import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { site } from '../data/site'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* macOS-style multilingual greeting: each word rolls up and out while the next
   rolls in from below with a slight top→bottom flip (rotateX). */
export default function HeroGreeting() {
  const wordRef = useRef(null)

  useEffect(() => {
    const el = wordRef.current
    if (!el) return
    const greetings = site.greetings

    if (prefersReduced()) {
      el.textContent = greetings[0]
      gsap.set(el, { yPercent: 0, rotateX: 0, opacity: 1 })
      return
    }

    const tl = gsap.timeline({ repeat: -1 })
    greetings.forEach((g) => {
      tl.call(() => {
        el.textContent = g
      })
        .fromTo(
          el,
          { yPercent: 120, rotateX: -75, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.62,
            ease: 'power3.out',
          }
        )
        .to(
          el,
          {
            yPercent: -120,
            rotateX: 75,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          },
          '+=1.25' // hold on each greeting
        )
    })

    return () => tl.kill()
  }, [])

  return (
    <span className="hero-greeting" aria-label={site.greetings[0]}>
      <span className="hero-greeting-word" ref={wordRef} aria-hidden="true">
        {site.greetings[0]}
      </span>
    </span>
  )
}
