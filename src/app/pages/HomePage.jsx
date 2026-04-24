import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useTheme, themeColors } from '../context/ThemeContext'
import { translations } from '../i18n/translations'
import smoothDrone from '../../assets/SmootherDrone.mp4'

const featurePaths = ['/record', '/refine', '/reports']
const frameworks = ['GRI Standards', 'TNFD', 'CDP', 'EU Taxonomy', 'CSRD', 'TCFD']

const reviews = [
  {
    name: 'Markus Lehmann',
    role: 'Head of Sustainability, Berliner Stadtgrün',
    text: 'LUMA transformed how we manage urban green infrastructure. The combination of field expertise and digital monitoring is unlike anything else on the market.',
    avatar: null,
  },
  {
    name: 'Sophie Renard',
    role: 'Project Lead, Green Cities Initiative',
    text: 'The soil microbiome work they did on our site was exceptional. We saw measurable improvement in tree vitality within the first season.',
    avatar: null,
  },
  {
    name: 'Jonas Weber',
    role: 'Director, Urban Ecology Dept.',
    text: 'Their drone survey and BIOME platform integration gave us data-driven insights we previously could only dream about. Reporting has never been easier.',
    avatar: null,
  },
  {
    name: 'Katrin Hoffmann',
    role: 'Landscape Architect, Studio K',
    text: 'From the initial consultation to the final planting, the LUMA team brought precision and deep ecological knowledge to every decision.',
    avatar: null,
  },
  {
    name: 'Thomas Bauer',
    role: 'CEO, NaturePositive GmbH',
    text: 'We partnered with LUMA for our corporate biodiversity programme and the results exceeded all targets. Their long-term stewardship model is the future.',
    avatar: null,
  },
  {
    name: 'Ingrid Müller',
    role: 'Parks Commissioner, City of Hamburg',
    text: 'Professional, thorough and genuinely passionate about ecological outcomes. LUMA is now our go-to partner for all climate resilience projects.',
    avatar: null,
  },
]

function AQIWidget({ isDark, accent, fg, fgMuted, fgSubtle, accentBorder }) {
  const [aqi, setAqi] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&current=european_aqi,pm10,pm2_5,nitrogen_dioxide')
      .then(r => r.json())
      .then(data => {
        setAqi({
          aqi: data.current?.european_aqi ?? 42,
          pm25: data.current?.pm2_5?.toFixed(1) ?? '8.2',
          pm10: data.current?.pm10?.toFixed(1) ?? '12.4',
          no2: data.current?.nitrogen_dioxide?.toFixed(1) ?? '18.1',
        })
        setLoading(false)
      })
      .catch(() => {
        setAqi({ aqi: 42, pm25: '8.2', pm10: '12.4', no2: '18.1' })
        setLoading(false)
      })
  }, [])

  const getAqiLabel = (val) => {
    if (val <= 20) return { label: 'Good', color: '#10b981' }
    if (val <= 40) return { label: 'Fair', color: '#10b981' }
    if (val <= 60) return { label: 'Moderate', color: '#f59e0b' }
    if (val <= 80) return { label: 'Poor', color: '#f97316' }
    if (val <= 100) return { label: 'Very Poor', color: '#ef4444' }
    return { label: 'Extremely Poor', color: '#7c3aed' }
  }

  const info = aqi ? getAqiLabel(aqi.aqi) : { label: '...', color: accent }

  return (
    <div style={{ padding: 24, border: `1px solid ${accentBorder}`, background: isDark ? 'rgba(8,12,10,0.8)' : 'rgba(240,239,232,0.9)', backdropFilter: 'blur(20px)', minWidth: 220 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Live — Air Quality</div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: info.color, boxShadow: `0 0 8px ${info.color}` }} />
      </div>
      <div style={{ fontSize: 48, letterSpacing: '-0.03em', color: info.color, lineHeight: 1, marginBottom: 4, fontFamily: "'DM Serif Display', Georgia, serif" }}>
        {loading ? '—' : aqi.aqi}
        <span style={{ fontSize: 16, color: fgMuted, marginLeft: 4, fontFamily: "'DM Mono', monospace" }}>AQI</span>
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: info.color, fontWeight: 500, marginBottom: 12 }}>{info.label}</div>
      {!loading && aqi && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Mono', monospace", fontSize: 10, color: fgSubtle }}>
            <span>PM2.5</span><span>{aqi.pm25} µg/m³</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Mono', monospace", fontSize: 10, color: fgSubtle }}>
            <span>PM10</span><span>{aqi.pm10} µg/m³</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Mono', monospace", fontSize: 10, color: fgSubtle }}>
            <span>NO₂</span><span>{aqi.no2} µg/m³</span>
          </div>
        </div>
      )}
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: fgSubtle, marginTop: 8 }}>Berlin, DE</div>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const [visible, setVisible] = useState({})
  const { lang } = useLang()
  const { theme } = useTheme()
  const t = translations[lang].home
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, accentHover, accentMuted, accentBorder, bg, fg, fgMuted, fgSubtle, borderColor, cardBg, cardBorder } = c

  const gridColor = isDark ? 'rgba(16,185,129,0.04)' : 'rgba(10,118,82,0.04)'
  const fadeLeft = isDark ? 'linear-gradient(to right, #080c0a, transparent)' : 'linear-gradient(to right, #f0efe8, transparent)'
  const fadeRight = isDark ? 'linear-gradient(to left, #080c0a, transparent)' : 'linear-gradient(to left, #f0efe8, transparent)'
  const statsBg = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true }))
      }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: bg, color: fg, overflowX: 'hidden', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .mono { font-family: 'DM Mono', monospace; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes scroll-cards { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes glow-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.9; } }
        .hero-title { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .hero-sub { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .hero-cta { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .hero-badge { animation: fadeIn 1s ease 0.1s both; }
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .services-track { display: flex; width: max-content; animation: scroll-cards 40s linear infinite; gap: 24px; }
        .services-track:hover { animation-play-state: paused; }
        .service-card { width: 320px; min-height: 260px; flex-shrink: 0; padding: 36px; transition: border-color 0.3s, background 0.3s, transform 0.3s; cursor: pointer; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; opacity: 0; transition: opacity 0.3s; }
        .service-card:hover { transform: translateY(-6px); }
        .service-card:hover::before { opacity: 1; }
        .reviews-track { display: flex; width: max-content; animation: scroll-cards 50s linear infinite; gap: 24px; }
        .reviews-track:hover { animation-play-state: paused; }
        .orb { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; animation: glow-pulse 4s ease-in-out infinite; }
        .framework-pill { padding: 8px 20px; font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: 0.05em; transition: all 0.2s; cursor: default; }
        .section-label { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
        .footer-link { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; background: none; border: none; cursor: pointer; text-decoration: none; transition: opacity 0.2s; }
        .footer-link:hover { opacity: 0.7; }
        .footer-legal { font-family: 'DM Serif Display', Georgia, serif; font-size: clamp(1.2rem, 2vw, 1.8rem); font-weight: 400; text-decoration: underline; cursor: pointer; background: none; border: none; transition: opacity 0.2s; padding: 0; text-align: left; }
        .footer-legal:hover { opacity: 0.7; }
      `}</style>

      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 80px 80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
            <source src={smoothDrone} type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,12,10,0.72) 0%, rgba(8,12,10,0.5) 40%, rgba(8,12,10,0.82) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, zIndex: 2, background: `linear-gradient(to bottom, transparent, ${bg})`, pointerEvents: 'none' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none', opacity: 0.4 }} />
        <div className="orb" style={{ width: 600, height: 600, background: isDark ? 'rgba(16,185,129,0.1)' : 'rgba(10,118,82,0.07)', top: -100, right: -100, zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
          <div className="hero-badge" style={{ marginBottom: 32 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: accentMuted, border: `1px solid ${accentBorder}`, color: accent, fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block', animation: 'pulse-ring 2s ease-out infinite' }} />
              {t.badge}
            </span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.02, letterSpacing: '-0.03em', marginBottom: 32, fontWeight: 400, color: '#ffffff' }}>
            {t.heroTitle1}<br /><em style={{ color: accent }}>{t.heroTitle2}</em>
          </h1>
          <p className="hero-sub mono" style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', maxWidth: 560, marginBottom: 48, fontWeight: 300 }}>{t.heroSub}</p>
          <div className="hero-cta" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/record')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: accent, color: '#ffffff', fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = accentHover} onMouseLeave={e => e.currentTarget.style.background = accent}>{t.enterPlatform}</button>
            <button onClick={() => navigate('/reports')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'transparent', color: '#ffffff', fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer' }}>{t.viewReports}</button>
          </div>
        </div>

        <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)', animation: 'float 6s ease-in-out infinite', opacity: 0.9, zIndex: 2 }}>
          <AQIWidget isDark={isDark} accent={accent} fg={fg} fgMuted={fgMuted} fgSubtle={fgSubtle} accentBorder={accentBorder} />
        </div>
      </section>

      {/* Our Services */}
      <section style={{ padding: '100px 0', borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, overflow: 'hidden', background: statsBg }}>
        <div style={{ padding: '0 80px', marginBottom: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="section-label" style={{ color: accent }}>{t.servicesLabel}</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: fg }}>{t.servicesTitle}</h2>
          </div>
          <p className="mono" style={{ fontSize: 13, color: fgMuted, maxWidth: 320, lineHeight: 1.7, fontWeight: 300, textAlign: 'right' }}>{t.servicesDesc}</p>
        </div>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: fadeLeft, zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: fadeRight, zIndex: 10, pointerEvents: 'none' }} />
          <div className="services-track">
            {[...t.services, ...t.services].map((service, i) => (
              <div key={i} className="service-card" style={{ border: `1px solid ${cardBorder}`, background: cardBg, '--accent': accent }}>
                <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.15em', marginBottom: 24 }}>{service.number}</div>
                <div style={{ width: 32, height: 1, background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', marginBottom: 24 }} />
                <h3 style={{ fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 16, color: fg }}>{service.title}</h3>
                <p className="mono" style={{ fontSize: 12, color: fgSubtle, lineHeight: 1.75, fontWeight: 300 }}>{t.comingSoon}</p>
                <div style={{ position: 'absolute', bottom: 36, right: 36 }}>
                  <span className="mono" style={{ fontSize: 11, color: isDark ? 'rgba(16,185,129,0.5)' : 'rgba(10,118,82,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.learnMore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: '120px 80px', borderBottom: `1px solid ${borderColor}` }}>
        <div data-id="vision" className={`reveal${visible.vision ? ' visible' : ''}`}>
          <div className="section-label" style={{ color: accent }}>
            {lang === 'en' ? 'Purpose & Direction' : 'Zweck & Ausrichtung'}
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: fg, marginBottom: 80, maxWidth: 700 }}>
            {lang === 'en' ? 'What is Our Goal?' : 'Was ist unser Ziel?'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
            {/* Vision */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ width: 40, height: 1, background: accent }} />
                <span className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {lang === 'en' ? 'Our Vision' : 'Unsere Vision'}
                </span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.15, color: fg, marginBottom: 24 }}>
                {lang === 'en' ? 'For every living being.' : 'Für jedes Lebewesen.'}
              </h3>
              <p className="mono" style={{ fontSize: 13, color: fgMuted, lineHeight: 1.9, fontWeight: 300 }}>
                {lang === 'en'
                  ? 'Our great goal is to improve and maintain the livelihoods and well-being of as many living beings as possible in order to promote harmonious coexistence and climate resilience in urban spaces. From bees to humans.'
                  : 'Unser großes Ziel ist es, die Lebensgrundlagen und das Wohlbefinden möglichst vieler Lebewesen zu verbessern und zu erhalten, um ein harmonisches Miteinander und Klimaresilienz in urbanen Räumen zu fördern. Von Bienen bis Menschen.'}
              </p>
            </div>

            {/* Mission */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ width: 40, height: 1, background: accent }} />
                <span className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {lang === 'en' ? 'Our Mission' : 'Unsere Mission'}
                </span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.15, color: fg, marginBottom: 24 }}>
                {lang === 'en' ? 'Craftsmanship meets ecology.' : 'Handwerk trifft Ökologie.'}
              </h3>
              <p className="mono" style={{ fontSize: 13, color: fgMuted, lineHeight: 1.9, fontWeight: 300 }}>
                {lang === 'en'
                  ? 'We are passionate about quality craftsmanship, modular, and intelligent solutions. We transform urban spaces into climate-resilient, species-rich oases that invite you to linger.'
                  : 'Wir sind leidenschaftlich begeistert von Qualitätshandwerk, modularen und intelligenten Lösungen. Wir verwandeln urbane Räume in klimaresiliente, artenreiche Oasen, die zum Verweilen einladen.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section style={{ padding: '100px 0', borderBottom: `1px solid ${borderColor}`, overflow: 'hidden', background: statsBg }}>
        <div style={{ padding: '0 80px', marginBottom: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="section-label" style={{ color: accent }}>
              {lang === 'en' ? 'Client Feedback' : 'Kundenstimmen'}
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: fg }}>
              {lang === 'en' ? 'Trusted by those\nwho care for cities.' : 'Vertrauen derer,\ndie Städte gestalten.'}
            </h2>
          </div>
          <p className="mono" style={{ fontSize: 13, color: fgMuted, maxWidth: 320, lineHeight: 1.7, fontWeight: 300, textAlign: 'right' }}>
            {lang === 'en'
              ? 'From city parks departments to corporate sustainability teams — here is what our partners say.'
              : 'Von Grünflächenämtern bis hin zu Corporate-Sustainability-Teams — das sagen unsere Partner.'}
          </p>
        </div>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: fadeLeft, zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: fadeRight, zIndex: 10, pointerEvents: 'none' }} />
          <div className="reviews-track">
            {[...reviews, ...reviews].map((review, i) => (
              <div key={i} style={{
                width: 360,
                flexShrink: 0,
                padding: 36,
                border: `1px solid ${cardBorder}`,
                background: cardBg,
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                position: 'relative',
              }}>
                <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 64, lineHeight: 0.8, color: accent, opacity: 0.3, marginBottom: 8 }}>"</div>
                <p className="mono" style={{ fontSize: 12, color: fgMuted, lineHeight: 1.85, fontWeight: 300, flexGrow: 1 }}>
                  {review.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 20, borderTop: `1px solid ${borderColor}` }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: `1px solid ${accent}40`,
                    background: `${accent}10`,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    {review.avatar
                      ? <img src={review.avatar} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 16, color: accent }}>{review.name.charAt(0)}</span>
                    }
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 400, color: fg, letterSpacing: '-0.01em', marginBottom: 3 }}>{review.name}</div>
                    <div className="mono" style={{ fontSize: 10, color: fgSubtle, letterSpacing: '0.05em' }}>{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section style={{ padding: '100px 80px' }}>
        <div data-id="frameworks" className={`reveal${visible.frameworks ? ' visible' : ''}`} style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: accent, textAlign: 'center' }}>{t.frameworksLabel}</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 16, color: fg }}>{t.frameworksTitle}</h2>
          <p className="mono" style={{ fontSize: 13, color: fgMuted, marginBottom: 56, maxWidth: 480, margin: '0 auto 56px' }}>{t.frameworksDesc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {frameworks.map((f, i) => (
              <div key={i} className="framework-pill" style={{ border: `1px solid ${cardBorder}`, color: fgMuted }}>{f}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 800, height: 400, background: isDark ? 'rgba(16,185,129,0.08)' : 'rgba(10,118,82,0.06)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div data-id="cta" className={`reveal${visible.cta ? ' visible' : ''}`} style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ width: 1, height: 60, background: `linear-gradient(to bottom, transparent, ${accentBorder})`, margin: '0 auto 48px' }} />
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24, color: fg }}>
            {t.ctaTitle1}<br /><em style={{ color: accent }}>{t.ctaTitle2}</em>
          </h2>
          <p className="mono" style={{ fontSize: 13, color: fgMuted, marginBottom: 48, lineHeight: 1.8 }}>{t.ctaDesc}</p>
          <button onClick={() => navigate('/record')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 48px', background: accent, color: '#ffffff', fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = accentHover} onMouseLeave={e => e.currentTarget.style.background = accent}>{t.launchPlatform}</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${borderColor}` }}>
        <div style={{ padding: '80px 80px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 700, marginBottom: 24, color: fg }}>{t.footerAddress}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="mono" style={{ fontSize: 13, color: fg, fontWeight: 500 }}>{t.footerCompany}</span>
              <span className="mono" style={{ fontSize: 13, color: fgMuted }}>{t.footerStreet}</span>
              <span className="mono" style={{ fontSize: 13, color: fgMuted }}>{t.footerCity}</span>
              <span className="mono" style={{ fontSize: 13, color: fgMuted }}>{t.footerCountry}</span>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 700, marginBottom: 24, color: fg }}>{t.footerContactTitle}</h3>
            <a href="mailto:info@luma.earth" style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: fgMuted, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = fgMuted}>{t.footerEmail}</a>
          </div>
        </div>

        <div style={{ padding: '40px 80px', borderTop: `1px solid ${borderColor}` }}>
          <button onClick={() => navigate('/privacy')} className="footer-legal" style={{ color: fg }}>
            {t.footerLegal}
          </button>
        </div>

        <div style={{ padding: '24px 80px 32px', borderTop: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, height: 28, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#ffffff', fontSize: 12 }}>L</div>
            <span className="mono" style={{ fontSize: 12, color: fgMuted, letterSpacing: '0.05em' }}>LUMA Biome Platform</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <button className="footer-link" onClick={() => navigate('/about')} style={{ color: fgMuted }}>{t.aboutUs}</button>
            <button className="footer-link" onClick={() => navigate('/contact')} style={{ color: fgMuted }}>{t.contact}</button>
            <a href="https://luma.earth" target="_blank" rel="noreferrer" className="footer-link" style={{ color: fgMuted }}>luma.earth ↗</a>
          </div>
          <div className="mono" style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.05em' }}>{t.copyright}</div>
        </div>
      </footer>
    </div>
  )
}