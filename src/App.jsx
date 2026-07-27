import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './lib/useLenis'
import Grain from './components/Grain'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import Home from './components/Home'
import ProjectDetail from './components/ProjectDetail'

gsap.registerPlugin(ScrollTrigger)

/* On route change: recompute triggers, then jump to top (new page) or to the
   target section when the URL carries a hash (e.g. returning to /#projects). */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const go = () => {
      // pinned sections change the document height — refresh before measuring
      ScrollTrigger.refresh()
      const lenis = window.__lenis
      // recompute Lenis' scroll limit so scrollTo isn't clamped to a stale height
      lenis?.resize?.()
      if (hash) {
        const el = document.querySelector(hash)
        if (el) {
          // absolute document offset — reliable even when the target is pinned
          // (passing the element makes Lenis mis-measure via offsetParent)
          const top = el.getBoundingClientRect().top + (window.scrollY || 0)
          lenis
            ? lenis.scrollTo(top, { immediate: true, force: true })
            : window.scrollTo(0, top)
          return
        }
      }
      lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
    }
    // hash target may sit inside a pinned section that needs a beat to lay out
    const delay = hash ? 260 : 0
    const t = setTimeout(go, delay)
    return () => clearTimeout(t)
  }, [pathname, hash])
  return null
}

export default function App() {
  useLenis()

  return (
    <>
      <Grain />
      <Cursor />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projet/:id" element={<ProjectDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
