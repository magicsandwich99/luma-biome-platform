import malte from '../../assets/Malte.jpg'
import evan from '../../assets/Evan.jpeg'
import inessa from '../../assets/Inessa.jpeg'
import stuvat from '../../assets/Stuvat.jpeg'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'

export default function AboutPage() {
  const { lang } = useLang()
  const t = translations[lang].about

  const students = [
    { name: 'Stuvat', role: t.studentRole, photo: stuvat },
    { name: 'Inessa', role: t.studentRole, photo: inessa },
    { name: 'Zoey', role: t.studentRole, photo: null },
    { name: 'Evan', role: t.studentRole, photo: evan },
  ]

  const sponsor = { name: 'Malte', role: t.sponsorRole }

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: '#080c0a', color: '#e8ede9', minHeight: '100vh', padding: '80px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .mono { font-family: 'DM Mono', monospace; }
        .photo-card { border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); transition: border-color 0.3s, transform 0.3s; }
        .photo-card:hover { border-color: rgba(16,185,129,0.3); transform: translateY(-4px); }
        .sponsor-card { border: 1px solid rgba(16,185,129,0.2); background: rgba(16,185,129,0.03); transition: border-color 0.3s, transform 0.3s; }
        .sponsor-card:hover { border-color: rgba(16,185,129,0.5); transform: translateY(-4px); }
      `}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, color: '#10b981', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>{t.label}</div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.05 }}>
          {t.title1}<br /><em style={{ color: '#10b981' }}>{t.title2}</em>
        </h1>
        <p className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', maxWidth: 540, lineHeight: 1.8, marginBottom: 80, fontWeight: 300 }}>{t.desc}</p>

        <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>{t.studentTeam}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 80 }}>
          {students.map((member, i) => (
            <div key={i} className="photo-card" style={{ borderRadius: 2 }}>
              {member.photo ? (
                <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                  <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div style={{ aspectRatio: '3/4', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.15)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 20, opacity: 0.2 }}>+</span>
                    </div>
                    <span className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.photo}</span>
                  </div>
                </div>
              )}
              <div style={{ padding: '20px 20px 24px' }}>
                <div style={{ fontSize: 15, marginBottom: 6, letterSpacing: '-0.01em' }}>{member.name}</div>
                <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>{member.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>{t.projectSponsor}</div>
        <div style={{ maxWidth: 320 }}>
          <div className="sponsor-card" style={{ borderRadius: 2 }}>
            <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
              <img src={malte} alt="Malte" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '20px 20px 24px' }}>
              <div style={{ fontSize: 15, marginBottom: 6, letterSpacing: '-0.01em' }}>{sponsor.name}</div>
              <div className="mono" style={{ fontSize: 11, color: 'rgba(16,185,129,0.4)', letterSpacing: '0.05em' }}>{sponsor.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}