import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Adds `.is-in` to the element (and opt-in children with [data-reveal])
 * when it scrolls into view. Pairs with the .reveal / .line-mask CSS.
 */
export function useReveal({ start = 'top 82%', stagger = 0.08 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.hasAttribute('data-reveal')
      ? [el]
      : el.querySelectorAll('[data-reveal]')
    const list = targets.length ? Array.from(targets) : [el]

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        list.forEach((node, i) => {
          gsap.delayedCall(i * stagger, () => node.classList.add('is-in'))
        })
      },
    })

    return () => st.kill()
  }, [start, stagger])

  return ref
}
