import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { projects, getProject, getProjectIndex } from '../data/projects'
import { site } from '../data/site'
import logo from '../img/logo.svg'

/* Cover with graceful fallback to the colored placeholder. */
function Cover({ project }) {
  const [failed, setFailed] = useState(false)
  if (!project.image || failed) {
    return (
      <div className="pd-cover-fallback" style={{ '--cover': project.cover }}>
        <span className="serif">{project.title}</span>
      </div>
    )
  }
  return (
    <img
      src={project.image}
      alt={project.title}
      onError={() => setFailed(true)}
    />
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const project = getProject(id)

  // unknown id → back home
  if (!project) return <Navigate to="/" replace />

  const idx = getProjectIndex(id)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  return (
    <main className="project-detail">
      <header className="pd-topbar">
        <div className="pd-topbar-inner shell">
          <Link to="/#projects" className="pd-back pixel" data-cursor>
            ← Projets
          </Link>
          <Link to="/" className="pd-brand" aria-label="Retour à l'accueil" data-cursor>
            <img src={logo} alt={site.name} />
          </Link>
          <span className="pd-topbar-spacer" aria-hidden="true" />
        </div>
      </header>

      <section className="pd-head shell">
        <span className="pd-index pixel">
          {project.index} — {project.year}
        </span>
        <h1 className="pd-title">{project.title}</h1>
        <ul className="pd-meta">
          {project.meta.map((m, i) => (
            <li key={i} className="pixel">
              {m}
            </li>
          ))}
        </ul>
        {project.link && (
          <a
            className="btn btn--solid pd-live"
            href={project.link}
            target="_blank"
            rel="noreferrer"
            data-cursor
          >
            Voir le site en ligne ↗
          </a>
        )}
      </section>

      <figure className="pd-cover">
        <Cover project={project} />
      </figure>

      <section className="pd-body shell">
        <p className="pd-desc">{project.description}</p>
      </section>

      {project.sections?.length > 0 && (
        <section className="pd-sections shell">
          {project.sections.map((s, i) => (
            <div className="pd-section" key={i}>
              <h2 className="pd-section-title pixel">{s.title}</h2>
              <p className="pd-section-body">{s.body}</p>
            </div>
          ))}
        </section>
      )}

      {project.gallery?.length > 0 && (
        <section className="pd-gallery shell">
          {project.gallery.map((src, i) => (
            <figure key={i} className="pd-shot">
              <img src={src} alt={`${project.title} — ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </section>
      )}

      <nav className="pd-nav shell" aria-label="Autres projets">
        <Link to={`/projet/${prev.id}`} className="pd-navlink" data-cursor>
          <span className="pixel">← Précédent</span>
          <span className="serif">{prev.title}</span>
        </Link>
        <Link
          to={`/projet/${next.id}`}
          className="pd-navlink pd-navlink--next"
          data-cursor
        >
          <span className="pixel">Suivant →</span>
          <span className="serif">{next.title}</span>
        </Link>
      </nav>
    </main>
  )
}
