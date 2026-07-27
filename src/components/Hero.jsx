import { Component, Suspense, lazy, useEffect, useRef } from 'react'
import { site } from '../data/site'
import HeroGreeting from './HeroGreeting'

const Scene3D = lazy(() => import('./Scene3D'))
const HeroFront = lazy(() => import('./HeroFront'))

/* If WebGL throws (or context lost), fall back to a CSS gradient glow. */
class CanvasBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) {
      // the front (decorative) layer must fall back to nothing, not an opaque
      // poster — otherwise it would cover the hero content when WebGL fails
      return this.props.front ? null : (
        <div className="hero-fallback" aria-hidden="true" />
      )
    }
    return this.props.children
  }
}

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = Array.from(root.querySelectorAll('[data-reveal]'))
    const timers = els.map((el, i) =>
      window.setTimeout(() => el.classList.add('is-in'), 150 + i * 120)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-canvas" aria-hidden="true">
        <CanvasBoundary>
          <Suspense fallback={<div className="hero-fallback" />}>
            <Scene3D />
          </Suspense>
        </CanvasBoundary>
        <div className="hero-veil" />
      </div>

      <div className="hero-content shell">
        <p className="pixel hero-kicker" data-reveal>
          {site.roles.join('  /  ')}
        </p>

        <h1
          className="hero-title hero-title--greeting"
          aria-label={`Bonjour — ${site.name}, ${site.roles.join(', ')}`}
        >
          <HeroGreeting />
        </h1>

        <p className="hero-sub" data-reveal>
          {site.tagline}
        </p>
      </div>

      <div className="hero-canvas-front" aria-hidden="true">
        <CanvasBoundary front>
          <Suspense fallback={null}>
            <HeroFront />
          </Suspense>
        </CanvasBoundary>
      </div>

      <a href="#about" className="hero-scroll pixel" aria-label="Défiler">
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </a>
    </section>
  )
}
