import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useTheme, themeColors } from '../context/ThemeContext'
import { translations } from '../i18n/translations'

export default function ContactPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const { theme } = useTheme()
  const t = translations[lang].contact
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, bg, fg, fgMuted, fgSubtle, cardBg, cardBorder, borderColor } = c

  const emails = ['hello@luma.earth', 'support@luma.earth', 'partners@luma.earth']

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .mono { font-family: 'DM Mono', monospace; }
        .contact-card { padding: 40px; transition: border-color 0.3s, transform 0.3s, background 0.3s; }
        .contact-card:hover { transform: translateY(-4px); }
        .contact-link { text-decoration: none; font-family: 'DM Mono', monospace; font-size: 13px; letter-spacing: 0.03em; transition: opacity 0.2s; }
        .contact-link:hover { opacity: 0.7; }
      `}</style>

      {/* Hero band */}
      <div style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderBottom: `1px solid ${borderColor}`, padding: '80px 80px 64px' }}>
        <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>{t.label}</div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: fg, marginBottom: 32 }}>
          {t.title1}<br />{t.title2} <em style={{ color: accent }}>LUMA.</em>
        </h1>

        {/* Prominent email + phone */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a href="mailto:info@luma.earth" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 700, color: fg, textDecoration: 'none', fontFamily: "'DM Mono', monospace", transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = fg}>
            info@luma.earth
          </a>
          <a href="tel:+4915226220865" style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 400, color: fgMuted, textDecoration: 'none', fontFamily: "'DM Mono', monospace", transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = fgMuted}>
            +49 15226220865
          </a>
        </div>

        <div style={{ marginTop: 24 }}>
          <p className="mono" style={{ fontSize: 13, color: fgSubtle }}>{t.company}</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 80px 120px' }}>

        {/* Contact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: cardBorder, marginBottom: 80 }}>
          {t.contacts.map((contact, i) => (
            <div key={i} className="contact-card" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
              <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>{contact.role}</div>
              <h3 style={{ fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 16, color: fg }}>{contact.name}</h3>
              <p className="mono" style={{ fontSize: 12, color: fgMuted, lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>{contact.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={`mailto:${emails[i]}`} className="contact-link" style={{ color: accent }}>↗ {emails[i]}</a>
                <a href="https://luma.earth" target="_blank" rel="noreferrer" className="contact-link" style={{ color: accent }}>↗ luma.earth</a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', height: 1, background: borderColor, marginBottom: 80 }} />

        {/* Address + Contact info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 80 }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 24, color: fg }}>{t.addressTitle}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="mono" style={{ fontSize: 13, color: fg, fontWeight: 500 }}>{t.company}</span>
              <span className="mono" style={{ fontSize: 13, color: fgMuted }}>{t.street}</span>
              <span className="mono" style={{ fontSize: 13, color: fgMuted }}>{t.city}</span>
              <span className="mono" style={{ fontSize: 13, color: fgMuted }}>{t.country}</span>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 24, color: fg }}>{t.contactTitle}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:info@luma.earth" className="mono" style={{ fontSize: 13, color: fgMuted, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = fgMuted}>{t.emailLabel}</a>
              <a href="tel:+4915226220865" className="mono" style={{ fontSize: 13, color: fgMuted, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = fgMuted}>{t.phone}</a>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: 1, background: borderColor, marginBottom: 48 }} />

        <button onClick={() => navigate('/privacy')} style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 400, color: fg, textDecoration: 'underline', fontFamily: "'DM Serif Display', Georgia, serif", transition: 'opacity 0.2s', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onMouseEnter={e => e.currentTarget.style.opacity = '0.6'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>{t.legal}</button>
      </div>
    </div>
  )
}