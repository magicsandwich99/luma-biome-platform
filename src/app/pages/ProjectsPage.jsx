import { useTheme, themeColors } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'

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
      <div style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderBottom: `1px solid ${borderColor}`, padding: '80px 80px 64px' }}>
        <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
          {lang === 'en' ? 'Projects' : 'Projekte'}
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: fg, marginBottom: 20 }}>
          {lang === 'en' ? 'Our Projects.' : 'Unsere Projekte.'}
        </h1>
        <p className="mono" style={{ fontSize: 14, color: fgMuted, maxWidth: 560, lineHeight: 1.8, fontWeight: 300 }}>
          {lang === 'en' ? 'Project case studies coming soon.' : 'Projektfallstudien demnächst verfügbar.'}
        </p>
      </div>
      <div style={{ padding: '120px 80px', textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 12, color: fgSubtle, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {lang === 'en' ? 'Coming soon' : 'Demnächst'}
        </div>
      </div>
    </div>
  )
}