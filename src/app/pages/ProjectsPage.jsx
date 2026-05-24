import { useNavigate } from 'react-router-dom'
import { useTheme, themeColors } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import serviceBG2 from '../../assets/ProjectsBG1.jpg'
import { projects } from '../data/projectsData'

export default function ProjectsPage() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { lang } = useLang()
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, bg, fg, fgMuted, fgSubtle, borderColor } = c

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        .mono { font-family: 'Space Mono', monospace; }
        .project-tile { cursor: pointer; position: relative; overflow: hidden; }
        .project-tile .overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.35s ease;
          display: flex; align-items: flex-end; padding: 28px;
        }
        .project-tile:hover .overlay { background: rgba(0,0,0,0.6); }
        .project-tile .overlay-text {
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .project-tile:hover .overlay-text { opacity: 1; transform: translateY(0); }
        .project-tile img, .project-tile .placeholder {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .project-tile:hover img, .project-tile:hover .placeholder { transform: scale(1.04); }
        .view-arrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Space Mono', monospace; font-size: 10px;
          color: ${accent}; letter-spacing: 0.15em; text-transform: uppercase;
          margin-top: 10px; opacity: 0; transform: translateX(-4px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
        }
        .project-tile:hover .view-arrow { opacity: 1; transform: translateX(0); }
      `}</style>

      {/* Header with background image */}
      <div className="page-hero" style={{ position: 'relative', borderBottom: `1px solid ${borderColor}`, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${serviceBG2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: isDark
            ? 'linear-gradient(to right, rgba(0,18,25,0.82) 0%, rgba(0,18,25,0.55) 60%, rgba(0,18,25,0.2) 100%)'
            : 'linear-gradient(to right, rgba(0,18,25,0.72) 0%, rgba(0,18,25,0.45) 60%, rgba(0,18,25,0.1) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
            {lang === 'en' ? 'Projects' : 'Projekte'}
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#ffffff', marginBottom: 20 }}>
            {lang === 'en' ? 'Our Projects.' : 'Unsere Projekte.'}
          </h1>
          <p className="mono" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 560, lineHeight: 1.8, fontWeight: 300 }}>
            {lang === 'en'
              ? 'A selection of our work across urban greening, tree care, habitat structures and ecological consulting. Click any project to learn more.'
              : 'Eine Auswahl unserer Arbeiten in den Bereichen Stadtbegrünung, Baumpflege, Habitatstrukturen und ökologische Beratung. Klicken Sie auf ein Projekt für mehr Informationen.'}
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="page-section-lg">
        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-tile"
              style={{ height: 380 }}
              onClick={() => navigate(`/projects/${project.slug}`)}
            >
              {project.images && project.images.length > 0 ? (
                <img
                  src={project.images[0]}
                  alt={project.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div
                  className="placeholder"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: isDark
                      ? `hsl(${140 + (i * 17) % 40}, 12%, ${8 + (i * 3) % 10}%)`
                      : `hsl(${100 + (i * 17) % 60}, 18%, ${82 + (i * 2) % 12}%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                      {String(project.id).padStart(2, '0')}
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {lang === 'en' ? 'Photo coming soon' : 'Foto folgt'}
                    </div>
                  </div>
                </div>
              )}
              <div className="overlay">
                <div className="overlay-text">
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {lang === 'en' ? project.category : project.categoryDE}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 400, color: '#ffffff', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 4 }}>
                    {lang === 'en' ? project.name : project.nameDE}
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em' }}>
                    {project.location} · {project.year}
                  </div>
                  <div className="view-arrow">
                    {lang === 'en' ? 'View Project →' : 'Projekt ansehen →'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
