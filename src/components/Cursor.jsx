import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/* Minimal custom cursor: a dot + a lagging ring that grows over [data-cursor]. */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })

    const onMove = (e) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        ring.current.classList.add('is-active')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        ring.current.classList.remove('is-active')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.body.classList.add('has-custom-cursor')

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
