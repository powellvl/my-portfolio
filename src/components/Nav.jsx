import { useEffect, useState } from "react";
import { site } from "../data/site";
import logo from "../img/logo.svg";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner shell">
        <a href="#top" className="nav-brand" aria-label={site.name}>
          <img className="nav-brand-mark" src={logo} alt={site.name} />
        </a>

        <nav className="nav-links" aria-label="Navigation principale">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              <span className="pixel nav-link-idx">{item.index}</span>
              <span className="link-underline">{item.label}</span>
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn nav-cta">
          Me contacter
        </a>
      </div>
    </header>
  );
}
