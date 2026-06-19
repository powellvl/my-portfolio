import { Component, Suspense, lazy, useEffect, useRef } from 'react'
import { site } from '../data/site'

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
    if (this.state.failed) return <div className="hero-fallback" aria-hidden="true" />
    return this.props.children
  }
}

/* Splits "text {{accent}} text" into nodes, wrapping the braces part. */
function renderLine(line) {
  return line.split(/(\{\{.*?\}\})/g).map((part, i) => {
    const m = part.match(/^\{\{(.*?)\}\}$/)
    if (m) {
      return (
        <em key={i} className="serif accent hero-em">
          {m[1]}
        </em>
      )
    }
    return <span key={i}>{part}</span>
  })
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

        <h1 className="hero-title">
          <span className="line-mask" data-reveal>
            <span>{renderLine(site.heroLine)}</span>
          </span>
        </h1>

        <p className="hero-sub" data-reveal>
          {site.tagline}
        </p>

        <div className="hero-actions" data-reveal>
          <a href="#projects" className="btn btn--solid" data-cursor>
            Voir les projets
          </a>
          <a href="#contact" className="btn" data-cursor>
            Me contacter
          </a>
        </div>
      </div>

      <div className="hero-canvas-front" aria-hidden="true">
        <CanvasBoundary>
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
