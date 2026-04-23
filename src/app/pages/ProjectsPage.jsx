import { useTheme, themeColors } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import smoothDrone from '../../assets/SmoothDrone.mp4'

export default function ProjectsPage() {
  const { theme } = useTheme()
  const { lang } = useLang()
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, bg, fg, fgMuted, fgSubtle, borderColor } = c

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .mono { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* Hero with video background */}
      <div style={{ position: 'relative', height: '92vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

        {/* Inset video container */}
        <div style={{
          position: 'absolute',
          inset: '24px',
          borderRadius: 6,
          overflow: 'hidden',
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          >
            <source src={smoothDrone} type="video/mp4" />
          </video>

          {/* Dark tint over video */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)',
          }} />

          {/* Subtle border overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 6,
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Text content over video */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 80px', maxWidth: 900 }}>
          <div className="mono" style={{
            fontSize: 11,
            color: accent,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            {lang === 'en' ? 'Projects' : 'Projekte'}
          </div>
          <h1 style={{
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            color: '#ffffff',
            marginBottom: 24,
          }}>
            {lang === 'en' ? 'Our Projects.' : 'Unsere Projekte.'}
          </h1>
          <p className="mono" style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 480,
            lineHeight: 1.8,
            fontWeight: 300,
          }}>
            {lang === 'en'
              ? 'Project case studies coming soon.'
              : 'Projektfallstudien demnächst verfügbar.'}
          </p>
        </div>

        {/* Bottom fade into page background */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: `linear-gradient(to bottom, transparent, ${bg})`,
          zIndex: 5,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Below-fold content */}
      <div style={{ padding: '80px 80px 120px', textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 12, color: fgSubtle, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {lang === 'en' ? 'Coming soon' : 'Demnächst'}
        </div>
      </div>
    </div>
  )
}