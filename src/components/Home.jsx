import Nav from './Nav'
import Hero from './Hero'
import About from './About'
import Services from './Services'
import Projects from './Projects'
import Contact from './Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
