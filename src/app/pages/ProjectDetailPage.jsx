import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTheme, themeColors } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { projects } from '../data/projectsData'

function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex)
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <button
        onClick={e => { e.stopPropagation(); onClose() }}
        style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 1 }}
      >
        <X size={18} />
      </button>

      <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
        {idx + 1} / {images.length}
      </div>

      {images.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); prev() }} style={{ position: 'absolute', left: 20, width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          ><ChevronLeft size={24} /></button>
          <button onClick={e => { e.stopPropagation(); next() }} style={{ position: 'absolute', right: 20, width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          ><ChevronRight size={24} /></button>
        </>
      )}

      <img
        src={images[idx]}
        alt=""
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', userSelect: 'none' }}
      />
    </div>
  )
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { lang } = useLang()
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, bg, fg, fgMuted, fgSubtle, borderColor, cardBg } = c

  const [lightboxIndex, setLightboxIndex] = useState(null)

  const idx = projects.findIndex(p => p.slug === slug)
  const project = projects[idx]
  const prevProject = idx > 0 ? projects[idx - 1] : null
  const nextProject = idx < projects.length - 1 ? projects[idx + 1] : null

  if (!project) {
    return (
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: bg, color: fg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: fgSubtle, marginBottom: 24 }}>{lang === 'en' ? 'Project not found.' : 'Projekt nicht gefunden.'}</p>
          <Link to="/projects" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: accent, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
            {lang === 'en' ? '← All Projects' : '← Alle Projekte'}
          </Link>
        </div>
      </div>
    )
  }

  const name = lang === 'en' ? project.name : project.nameDE
  const category = lang === 'en' ? project.category : project.categoryDE
  const description = lang === 'en' ? project.description : project.descriptionDE
  const challenge = project.challenge ? (lang === 'en' ? project.challenge.en : project.challenge.de) : null
  const approach = project.approach ? (lang === 'en' ? project.approach.en : project.approach.de) : null
  const result = project.result ? (lang === 'en' ? project.result.en : project.result.de) : null

  const metaItems = [
    { label: lang === 'en' ? 'Year' : 'Jahr', value: project.year },
    project.client && { label: lang === 'en' ? 'Client' : 'Auftraggeber', value: project.client },
    { label: lang === 'en' ? 'Location' : 'Standort', value: project.location },
    project.size && { label: lang === 'en' ? 'Size' : 'Fläche', value: project.size },
  ].filter(Boolean)

  const hasImages = project.images && project.images.length > 0
  const heroImg = hasImages ? project.images[0] : null
  const galleryImages = hasImages ? project.images.slice(1) : []

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        .mono { font-family: 'Space Mono', monospace; }
        .gallery-img { cursor: zoom-in; overflow: hidden; }
        .gallery-img img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); display: block; width: 100%; height: 100%; object-fit: cover; }
        .gallery-img:hover img { transform: scale(1.04); }
        .proj-nav-card { transition: background 0.2s, border-color 0.2s; }
        .proj-nav-card:hover { border-color: ${accent} !important; }
      `}</style>

      {/* Hero */}
      <div style={{ position: 'relative', height: 'clamp(360px, 55vh, 600px)', overflow: 'hidden', borderBottom: `1px solid ${borderColor}` }}>
        {heroImg ? (
          <>
            <img src={heroImg} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)' }} />
          </>
        ) : (
          <div style={{ width: '100%', height: '100%', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)' }} />
        )}

        {/* Back link */}
        <Link
          to="/projects"
          style={{ position: 'absolute', top: 32, left: 40, display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
        >
          <ArrowLeft size={14} />
          {lang === 'en' ? 'All Projects' : 'Alle Projekte'}
        </Link>

        {/* Hero text */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 40px 40px' }}>
          <span style={{ display: 'inline-block', fontFamily: "'Space Mono', monospace", fontSize: 10, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', border: `1px solid ${accent}50`, padding: '4px 10px', marginBottom: 16 }}>
            {category}
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#ffffff', margin: 0 }}>
            {name}
          </h1>
        </div>

        {/* Image counter */}
        {hasImages && project.images.length > 1 && (
          <div style={{ position: 'absolute', top: 32, right: 40, fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', background: 'rgba(0,0,0,0.35)', padding: '4px 12px', borderRadius: 20 }}>
            {project.images.length} {lang === 'en' ? 'photos' : 'Fotos'}
          </div>
        )}
      </div>

      {/* Meta strip */}
      <div style={{ borderBottom: `1px solid ${borderColor}`, background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.015)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', display: 'flex', flexWrap: 'wrap', gap: 0 }}>
          {metaItems.map((item, i) => (
            <div key={i} style={{ padding: '20px 40px 20px 0', marginRight: 40, borderRight: i < metaItems.length - 1 ? `1px solid ${borderColor}` : 'none' }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: fgSubtle, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: fg, fontWeight: 500 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px 80px' }}>

        {/* Description */}
        <div style={{ maxWidth: 760, marginBottom: challenge ? 72 : (galleryImages.length > 0 ? 72 : 0) }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: fgMuted, lineHeight: 2, fontWeight: 300, margin: 0 }}>
            {description}
          </p>
        </div>

        {/* Pitch-deck blocks */}
        {challenge && (
          <div style={{ marginBottom: galleryImages.length > 0 ? 72 : 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, marginBottom: 2 }}>
              {/* Challenge */}
              <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', border: `1px solid ${borderColor}`, padding: '36px 36px 40px' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
                  {lang === 'en' ? '01 — Challenge' : '01 — Aufgabe'}
                </div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: fg, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                  {challenge}
                </p>
              </div>

              {/* Result */}
              {result && (
                <div style={{ background: isDark ? `${accent}12` : `${accent}0d`, border: `1px solid ${accent}30`, padding: '36px 36px 40px' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
                    {lang === 'en' ? '03 — Result' : '03 — Ergebnis'}
                  </div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: fg, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                    {result}
                  </p>
                </div>
              )}
            </div>

            {/* Approach */}
            {approach && approach.length > 0 && (
              <div style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', border: `1px solid ${borderColor}`, padding: '36px 36px 40px' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 28 }}>
                  {lang === 'en' ? '02 — Approach' : '02 — Vorgehen'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px 40px' }}>
                  {approach.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: accent, letterSpacing: '0.1em', marginTop: 3, flexShrink: 0 }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: fgMuted, lineHeight: 1.65, fontWeight: 300 }}>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: fgSubtle, letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                {lang === 'en' ? 'Gallery' : 'Galerie'}
              </div>
              <div style={{ height: 1, flex: 1, background: borderColor }} />
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: fgSubtle, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                {galleryImages.length + 1} {lang === 'en' ? 'images' : 'Bilder'}
              </div>
            </div>

            {/* Hero image as first gallery item */}
            <div style={{ marginBottom: 4 }}>
              <div
                className="gallery-img"
                style={{ height: 'clamp(260px, 40vw, 500px)', borderRadius: 2 }}
                onClick={() => setLightboxIndex(0)}
              >
                <img src={project.images[0]} alt={`${name} 1`} />
              </div>
            </div>

            {/* Grid for remaining images */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="gallery-img"
                  style={{ height: 'clamp(160px, 20vw, 280px)', borderRadius: 2 }}
                  onClick={() => setLightboxIndex(i + 1)}
                >
                  <img src={img} alt={`${name} ${i + 2}`} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Single image project — show it clickable */}
        {hasImages && galleryImages.length === 0 && (
          <div style={{ marginTop: 48 }}>
            <div
              className="gallery-img"
              style={{ height: 'clamp(260px, 40vw, 500px)', borderRadius: 2 }}
              onClick={() => setLightboxIndex(0)}
            >
              <img src={project.images[0]} alt={name} />
            </div>
          </div>
        )}
      </div>

      {/* Prev / Next navigation */}
      <div style={{ borderTop: `1px solid ${borderColor}`, background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.015)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="proj-nav-card"
              style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '32px 32px 32px 0', borderRight: `1px solid ${borderColor}`, textDecoration: 'none', borderBottom: 'none', borderTop: 'none', borderLeft: 'none', background: 'transparent' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: fgSubtle, flexShrink: 0 }}>
                <ArrowLeft size={16} />
              </div>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: fgSubtle, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{lang === 'en' ? 'Previous' : 'Vorheriges'}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: fg, fontWeight: 400 }}>{lang === 'en' ? prevProject.name : prevProject.nameDE}</div>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="proj-nav-card"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 20, padding: '32px 0 32px 32px', textDecoration: 'none', border: 'none', background: 'transparent' }}
            >
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: fgSubtle, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{lang === 'en' ? 'Next' : 'Nächstes'}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: fg, fontWeight: 400 }}>{lang === 'en' ? nextProject.name : nextProject.nameDE}</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: fgSubtle, flexShrink: 0 }}>
                <ArrowRight size={16} />
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={project.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
