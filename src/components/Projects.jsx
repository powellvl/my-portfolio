import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

// Sparkle field scattered behind the "MES PROJETS" title (hero callback).
const STARS = [
  { top: "24%", left: "16%", size: 26, delay: 0, v: false },
  { top: "30%", left: "80%", size: 18, delay: 0.6, v: true },
  { top: "66%", left: "26%", size: 15, delay: 1.1, v: false },
  { top: "70%", left: "74%", size: 30, delay: 0.3, v: false },
  { top: "15%", left: "54%", size: 13, delay: 0.9, v: true },
  { top: "80%", left: "50%", size: 12, delay: 1.5, v: false },
  { top: "44%", left: "7%", size: 12, delay: 0.5, v: false },
  { top: "52%", left: "92%", size: 20, delay: 1.0, v: false },
];
const STAR_PATH =
  "M50 2 L55.7 44.3 L98 50 L55.7 55.7 L50 98 L44.3 55.7 L2 50 L44.3 44.3 Z";

/* Project visual: real image when available, colored cover as fallback
   (also covers a missing/broken file so the slide never breaks). */
function ProjectVisual({ project }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(project.image) && !failed;

  return (
    <div className="proj-frame" style={{ "--cover": project.cover }}>
      {showImage ? (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="proj-cover" aria-hidden="true">
          <span className="proj-cover-label">{project.title}</span>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const section = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: pinned horizontal slideshow. matchMedia re-runs on resize and
    // reverts everything when leaving the range, so narrowing the window tears
    // the pin down cleanly instead of leaving a broken desktop layout on mobile.
    mm.add(
      "(min-width: 881px) and (prefers-reduced-motion: no-preference)",
      () => {
        section.current.classList.remove("is-stacked");
      // sparkle field arrival (scales/fades in when the section enters)
      gsap.fromTo(
        ".proj-stars",
        { autoAlpha: 0, scale: 0.82 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          transformOrigin: "50% 50%",
          scrollTrigger: {
            trigger: section.current,
            start: "top 72%",
            once: true,
          },
        },
      );

      const getScroll = () => track.current.scrollWidth - window.innerWidth;

      // horizontal scroll driven by vertical scroll (pinned)
      const tween = gsap.to(track.current, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => "+=" + getScroll(),
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // continuous "slideshow": each project's text enters, holds, then exits
      gsap.utils.toArray(".proj-anim").forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          })
          .fromTo(
            el,
            { autoAlpha: 0, yPercent: 22 },
            { autoAlpha: 1, yPercent: 0, ease: "power2.out", duration: 0.42 },
          )
          .to(el, { autoAlpha: 1, duration: 0.16 })
          .to(el, {
            autoAlpha: 0,
            yPercent: -22,
            ease: "power2.in",
            duration: 0.42,
          });
      });

      // intro / outro live at the track edges: visible on arrival, fade out as
      // they leave (one-way, immediateRender:false → never stuck hidden)
      gsap.utils.toArray(".proj-exit").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 1, yPercent: 0 },
          {
            autoAlpha: 0,
            yPercent: -12,
            ease: "power1.in",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: "center center",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      // parallax on the project visuals for depth
      gsap.utils.toArray(".proj-visual").forEach((vis) => {
        gsap.fromTo(
          vis,
          { xPercent: 10 },
          {
            xPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: vis,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
      },
      section,
    );

    // Mobile / reduced-motion: stacked layout (image on top, text + CTA below).
    mm.add("(max-width: 880px), (prefers-reduced-motion: reduce)", () => {
      section.current.classList.add("is-stacked");
      gsap.set(".proj-stars", { autoAlpha: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="section projects" id="projects" ref={section}>
      <div className="proj-deco" aria-hidden="true">
        <span className="proj-deco-c tl" />
        <span className="proj-deco-c tr" />
        <span className="proj-deco-c bl" />
        <span className="proj-deco-c br" />
        <span className="proj-deco-tag pixel">03 — Projets</span>
        <span className="proj-deco-tag proj-deco-tag--br pixel">Sélection ✦</span>
      </div>

      <div className="projects-track" ref={track}>
        {/* intro — big "MES PROJETS" title */}
        <div className="project-slide proj-intro">
          <div className="proj-stars" aria-hidden="true">
            {STARS.map((s, i) => (
              <svg
                key={i}
                className={`proj-star${s.v ? " proj-star--v" : ""}`}
                viewBox="0 0 100 100"
                style={{
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  "--delay": `${s.delay}s`,
                }}
              >
                <path d={STAR_PATH} />
              </svg>
            ))}
          </div>
          <div className="proj-exit proj-intro-inner">
            <p className="proj-intro-kicker">Exemples de quelques créations…</p>
            <h2 className="proj-intro-title">
              <span className="proj-mes">Mes</span>
              <span className="proj-projets">Projets</span>
            </h2>
          </div>
        </div>

        {projects.map((p) => (
          <article
            className="project-slide project-card-slide"
            key={p.id}
            data-cursor
          >
            <div className="proj-visual">
              <ProjectVisual project={p} />
            </div>

            <div className="proj-info proj-anim">
              <span className="proj-index">
                {p.index} — {p.year}
              </span>
              <h3 className="proj-title">{p.title}</h3>
              <div className="proj-meta">
                {p.meta.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
              <Link className="proj-cta" to={`/projet/${p.id}`} data-cursor>
                Voir
              </Link>
            </div>
          </article>
        ))}

        {/* outro */}
        <div className="project-slide proj-outro">
          <p className="proj-exit serif">
            Un projet en tête&nbsp;?{" "}
            <a href="#contact" className="link-underline">
              Parlons-en.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
