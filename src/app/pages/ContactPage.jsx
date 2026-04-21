import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'

export default function ContactPage() {
  const { lang } = useLang()
  const t = translations[lang].contact

  const emails = ['hello@luma.earth', 'support@luma.earth', 'partners@luma.earth']

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: '#080c0a', color: '#e8ede9', minHeight: '100vh', padding: '80px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .mono { font-family: 'DM Mono', monospace; }
        .contact-card { border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02); padding: 40px; transition: border-color 0.3s, transform 0.3s, background 0.3s; }
        .contact-card:hover { border-color: rgba(16,185,129,0.25); background: rgba(16,185,129,0.03); transform: translateY(-4px); }
        .contact-link { color: #10b981; text-decoration: none; font-family: 'DM Mono', monospace; font-size: 13px; letter-spacing: 0.03em; transition: opacity 0.2s; }
        .contact-link:hover { opacity: 0.7; }
        .divider { width: 100%; height: 1px; background: rgba(255,255,255,0.06); margin: 60px 0; }
      `}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, color: '#10b981', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>{t.label}</div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.05 }}>
          {t.title1}<br />{t.title2} <em style={{ color: '#10b981' }}>LUMA.</em>
        </h1>
        <p className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', maxWidth: 500, lineHeight: 1.8, marginBottom: 80, fontWeight: 300 }}>{t.desc}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
          {t.contacts.map((c, i) => (
            <div key={i} className="contact-card">
              <div className="mono" style={{ fontSize: 11, color: '#10b981', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>{c.role}</div>
              <h3 style={{ fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 16 }}>{c.name}</h3>
              <p className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>{c.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={`mailto:${emails[i]}`} className="contact-link">↗ {emails[i]}</a>
                <a href="https://luma.earth" target="_blank" rel="noreferrer" className="contact-link">↗ luma.earth</a>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>{t.findUs}</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 24 }}>{t.hq}</h2>
            <div className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 2, fontWeight: 300 }}>
              <a href="https://luma.earth" target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'none' }}>luma.earth ↗</a>
            </div>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{t.visit}</div>
              <a href="https://luma.earth" target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 13, color: '#10b981', textDecoration: 'none' }}>luma.earth ↗</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}