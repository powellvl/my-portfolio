import { site } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span className="pixel">© {year} {site.name}</span>
        <span className="pixel footer-credit">
          Fait main · React + Three.js
        </span>
        <a href="#top" className="pixel link-underline" data-cursor>
          Haut de page ↑
        </a>
      </div>
    </footer>
  )
}
