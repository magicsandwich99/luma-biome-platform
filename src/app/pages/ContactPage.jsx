import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { useTheme, themeColors } from '../context/ThemeContext'
import { translations } from '../i18n/translations'

const copy = {
  en: {
    label: 'Contact Us',
    title: 'Get in touch.',
    intro: 'Tell us about your project or space — we respond within 2 business days.',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email address',
    subjectPlaceholder: 'What is this about?',
    messagePlaceholder: 'Describe your project, location, or question…',
    submit: 'Send message →',
    sending: 'Sending…',
    successTitle: 'Message received.',
    successBody: "We'll be in touch within 2 business days.",
    orContact: 'Or reach us directly',
    address: 'Address',
  },
  de: {
    label: 'Kontakt',
    title: 'Sprechen Sie uns an.',
    intro: 'Erzählen Sie uns von Ihrem Projekt oder Ihrer Fläche — wir antworten innerhalb von 2 Werktagen.',
    namePlaceholder: 'Ihr Name',
    emailPlaceholder: 'Ihre E-Mail-Adresse',
    subjectPlaceholder: 'Worum geht es?',
    messagePlaceholder: 'Beschreiben Sie Ihr Projekt, den Standort oder Ihre Frage…',
    submit: 'Nachricht senden →',
    sending: 'Wird gesendet…',
    successTitle: 'Nachricht eingegangen.',
    successBody: 'Wir melden uns innerhalb von 2 Werktagen.',
    orContact: 'Oder direkt kontaktieren',
    address: 'Adresse',
  },
}

export default function ContactPage() {
  const { lang } = useLang()
  const { theme } = useTheme()
  const t = translations[lang].contact
  const c = copy[lang]
  const isDark = theme === 'dark'
  const { accent, accentHover, accentBorder, bg, fg, fgMuted, fgSubtle, borderColor, cardBg, cardBorder } = themeColors[theme]

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: isDark ? 'rgba(243,224,168,0.04)' : 'rgba(0,18,25,0.04)',
    border: `1px solid ${borderColor}`,
    color: fg,
    fontFamily: "'Space Mono', monospace",
    fontSize: 13,
    outline: 'none',
    transition: 'border-color 0.2s',
    borderRadius: 0,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xjkvobbk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        // Fallback: open mailto
        window.location.href = `mailto:info@luma.earth?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
        setStatus('success')
      }
    } catch {
      window.location.href = `mailto:info@luma.earth?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
      setStatus('success')
    }
  }

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        .mono { font-family: 'Space Mono', monospace; }
        .contact-input:focus { border-color: ${accent} !important; }
        .contact-input::placeholder { color: ${fgSubtle}; opacity: 0.7; }
      `}</style>

      {/* Hero */}
      <div style={{ padding: '80px 80px 64px', borderBottom: `1px solid ${borderColor}` }}>
        <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>{c.label}</div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 16 }}>
          {c.title}
        </h1>
        <p className="mono" style={{ fontSize: 14, color: fgMuted, maxWidth: 480, lineHeight: 1.8 }}>{c.intro}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 0, minHeight: 'calc(100vh - 300px)' }}>

        {/* Form */}
        <div style={{ padding: '64px 80px', borderRight: `1px solid ${borderColor}` }}>
          {status === 'success' ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 480 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${accent}20`, border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, fontSize: 20 }}>✓</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, color: fg }}>{c.successTitle}</h2>
              <p className="mono" style={{ fontSize: 13, color: fgMuted, lineHeight: 1.8 }}>{c.successBody}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 560 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input
                  className="contact-input"
                  style={inputStyle}
                  type="text"
                  placeholder={c.namePlaceholder}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <input
                  className="contact-input"
                  style={inputStyle}
                  type="email"
                  placeholder={c.emailPlaceholder}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <input
                className="contact-input"
                style={inputStyle}
                type="text"
                placeholder={c.subjectPlaceholder}
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                required
              />
              <textarea
                className="contact-input"
                style={{ ...inputStyle, minHeight: 200, resize: 'vertical' }}
                placeholder={c.messagePlaceholder}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  alignSelf: 'flex-start',
                  padding: '16px 40px',
                  background: status === 'sending' ? `${accent}80` : accent,
                  color: '#fff',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = accentHover }}
                onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = accent }}
              >
                {status === 'sending' ? c.sending : c.submit}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>{c.orContact}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:info@luma.earth" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: fg, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = fg}>
                info@luma.earth
              </a>
              <a href="tel:+4915226220865" className="mono" style={{ fontSize: 13, color: fgMuted, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = fgMuted}>
                +49 152 2622 0865
              </a>
            </div>
          </div>

          <div style={{ width: '100%', height: 1, background: borderColor }} />

          <div>
            <div className="mono" style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>{c.address}</div>
            <div className="mono" style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: fgMuted, lineHeight: 1.8 }}>
              <span style={{ color: fg, fontWeight: 700 }}>LUMA GbR</span>
              <span>Malte Larsen & Lukas Steingässer</span>
              <span>Schillerstraße 15</span>
              <span>16225 Eberswalde</span>
              <span>Deutschland</span>
            </div>
          </div>

          <div style={{ width: '100%', height: 1, background: borderColor }} />

          <div style={{ padding: '24px', border: `1px solid ${accentBorder}`, background: isDark ? `${accent}06` : `${accent}04` }}>
            <div className="mono" style={{ fontSize: 10, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
              {lang === 'en' ? 'Response time' : 'Antwortzeit'}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: fg, marginBottom: 4 }}>
              {lang === 'en' ? '≤ 2 business days' : '≤ 2 Werktage'}
            </div>
            <div className="mono" style={{ fontSize: 11, color: fgMuted }}>
              {lang === 'en' ? 'Mon–Fri, Berlin time' : 'Mo–Fr, Berliner Zeit'}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
