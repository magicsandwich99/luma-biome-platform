import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useTheme, themeColors } from '../context/ThemeContext'
import { translations } from '../i18n/translations'

const featurePaths = ['/record', '/refine', '/reports']
const frameworks = ['GRI Standards', 'TNFD', 'CDP', 'EU Taxonomy', 'CSRD', 'TCFD']

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

  const gridColor = isDark ? 'rgba(16,185,129,0.04)' : 'rgba(124,58,237,0.04)'
  const fadeLeft = isDark ? 'linear-gradient(to right, #080c0a, transparent)' : 'linear-gradient(to right, #f0efe8, transparent)'
  const fadeRight = isDark ? 'linear-gradient(to left, #080c0a, transparent)' : 'linear-gradient(to left, #f0efe8, transparent)'
  const statsBg = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'
  const featureColors = [accent, isDark ? '#8b5cf6' : '#7c3aed', isDark ? '#3b82f6' : '#2563eb']

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
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
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
        .feature-card { border-radius: 2px; padding: 40px; transition: background 0.3s, border-color 0.3s, transform 0.3s; cursor: pointer; position: relative; overflow: hidden; }
        .feature-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: var(--accent); opacity: 0; transition: opacity 0.3s; }
        .feature-card:hover { transform: translateY(-4px); }
        .feature-card:hover::before { opacity: 1; }
        .stat-num { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1; letter-spacing: -0.02em; }
        .services-track { display: flex; width: max-content; animation: scroll-cards 40s linear infinite; gap: 24px; }
        .services-track:hover { animation-play-state: paused; }
        .service-card { width: 320px; min-height: 260px; flex-shrink: 0; padding: 36px; transition: border-color 0.3s, background 0.3s, transform 0.3s; cursor: pointer; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; opacity: 0; transition: opacity 0.3s; }
        .service-card:hover { transform: translateY(-6px); }
        .service-card:hover::before { opacity: 1; }
        .orb { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; animation: glow-pulse 4s ease-in-out infinite; }
        .framework-pill { padding: 8px 20px; font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: 0.05em; transition: all 0.2s; cursor: default; }
        .line-accent { width: 40px; height: 1px; margin-bottom: 24px; }
        .section-label { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
        .footer-link { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; background: none; border: none; cursor: pointer; text-decoration: none; transition: color 0.2s; }
      `}</style>

      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 80px 80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className="orb" style={{ width: 600, height: 600, background: isDark ? 'rgba(16,185,129,0.12)' : 'rgba(124,58,237,0.08)', top: -100, right: -100 }} />
        <div className="orb" style={{ width: 400, height: 400, background: isDark ? 'rgba(139,92,246,0.08)' : 'rgba(124,58,237,0.06)', bottom: 0, left: '30%', animationDelay: '2s' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
          <div className="hero-badge" style={{ marginBottom: 32 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: accentMuted, border: `1px solid ${accentBorder}`, color: accent, fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block', animation: 'pulse-ring 2s ease-out infinite' }} />
              {t.badge}
            </span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.02, letterSpacing: '-0.03em', marginBottom: 32, fontWeight: 400, color: fg }}>
            {t.heroTitle1}<br /><em style={{ color: accent }}>{t.heroTitle2}</em>
          </h1>
          <p className="hero-sub mono" style={{ fontSize: 15, lineHeight: 1.8, color: fgMuted, maxWidth: 560, marginBottom: 48, fontWeight: 300 }}>{t.heroSub}</p>
          <div className="hero-cta" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/record')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: accent, color: isDark ? '#080c0a' : '#ffffff', fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = accentHover} onMouseLeave={e => e.currentTarget.style.background = accent}>{t.enterPlatform}</button>
            <button onClick={() => navigate('/reports')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'transparent', color: fg, fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', border: `1px solid ${borderColor}`, cursor: 'pointer' }}>{t.viewReports}</button>
          </div>
        </div>

        <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)', animation: 'float 6s ease-in-out infinite', opacity: 0.85 }}>
          <div style={{ padding: 24, border: `1px solid ${accentBorder}`, background: isDark ? 'rgba(8,12,10,0.8)' : 'rgba(240,239,232,0.9)', backdropFilter: 'blur(20px)', minWidth: 200 }}>
            <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>{t.liveLabel}</div>
            <div style={{ fontSize: 42, letterSpacing: '-0.03em', color: fg, marginBottom: 4 }}>412<span style={{ fontSize: 18, color: fgMuted }}> ppm</span></div>
            <div className="mono" style={{ fontSize: 11, color: fgSubtle }}>{t.liveSubLabel}</div>
          </div>
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
                  <span className="mono" style={{ fontSize: 11, color: isDark ? 'rgba(16,185,129,0.5)' : 'rgba(124,58,237,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.learnMore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '100px 80px' }}>
        <div data-id="stats" className={`reveal${visible.stats ? ' visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: `1px solid ${borderColor}`, borderLeft: `1px solid ${borderColor}` }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ padding: '48px 40px', borderRight: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, transitionDelay: `${i * 0.1}s` }}>
              <div className="stat-num" style={{ color: accent, marginBottom: 12 }}>{s.value}</div>
              <div className="mono" style={{ fontSize: 12, color: fgMuted, letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '0 80px 120px' }}>
        <div data-id="feat-head" className={`reveal${visible['feat-head'] ? ' visible' : ''}`} style={{ marginBottom: 64 }}>
          <div className="section-label" style={{ color: accent }}>{t.modulesLabel}</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.02em', maxWidth: 600, lineHeight: 1.1, color: fg }}>
            {t.modulesTitle1}<br />{t.modulesTitle2}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: borderColor }}>
          {t.features.map((f, i) => (
            <div key={i} data-id={`feat-${i}`} className={`feature-card reveal${visible[`feat-${i}`] ? ' visible' : ''}`} style={{ '--accent': featureColors[i], transitionDelay: `${i * 0.12}s`, background: cardBg, border: `1px solid ${cardBorder}` }} onClick={() => navigate(featurePaths[i])}>
              <div style={{ fontSize: 28, color: featureColors[i], marginBottom: 24, fontFamily: 'monospace' }}>{f.icon}</div>
              <div className="line-accent" style={{ background: featureColors[i] }} />
              <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16, letterSpacing: '-0.01em', color: fg }}>{f.title}</h3>
              <p className="mono" style={{ fontSize: 13, lineHeight: 1.75, color: fgMuted, marginBottom: 32, fontWeight: 300 }}>{f.desc}</p>
              <span className="mono" style={{ fontSize: 12, color: featureColors[i], letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.cta} →</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '100px 80px', background: statsBg, borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}` }}>
        <div data-id="how" className={`reveal${visible.how ? ' visible' : ''}`}>
          <div className="section-label" style={{ color: accent }}>{t.howLabel}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 48, color: fg }}>
                {t.howTitle1}<br />{t.howTitle2}<br /><em style={{ color: accent }}>{t.howTitle3}</em>
              </h2>
              {[
                ['01', t.howStep1Title, t.howStep1Desc],
                ['02', t.howStep2Title, t.howStep2Desc],
                ['03', t.howStep3Title, t.howStep3Desc],
              ].map(([num, title, desc]) => (
                <div key={num} style={{ display: 'flex', gap: 24, marginBottom: 36 }}>
                  <div className="mono" style={{ fontSize: 11, color: accent, paddingTop: 4, minWidth: 28, letterSpacing: '0.05em' }}>{num}</div>
                  <div>
                    <div style={{ fontSize: 16, marginBottom: 6, letterSpacing: '-0.01em', color: fg }}>{title}</div>
                    <div className="mono" style={{ fontSize: 12, lineHeight: 1.7, color: fgMuted, fontWeight: 300 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ border: `1px solid ${cardBorder}`, padding: 40, background: isDark ? 'rgba(8,12,10,0.6)' : 'rgba(240,239,232,0.8)' }}>
                <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>{t.pipelineLabel}</div>
                {[
                  { label: 'Soil Moisture Station', type: 'SENSOR', color: accent, val: '34%' },
                  { label: 'Normalize Filter', type: 'FILTER', color: isDark ? '#8b5cf6' : '#7c3aed', val: '↓' },
                  { label: 'Aggregate Node', type: 'FILTER', color: isDark ? '#8b5cf6' : '#7c3aed', val: '↓' },
                  { label: 'TNFD Report Output', type: 'REPORT', color: isDark ? '#3b82f6' : '#2563eb', val: '✓' },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: `${item.color}0d`, border: `1px solid ${item.color}25` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />
                        <span style={{ fontSize: 14, color: fg }}>{item.label}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="mono" style={{ fontSize: 10, color: item.color, letterSpacing: '0.1em' }}>{item.type}</span>
                        <span className="mono" style={{ fontSize: 12, color: fgMuted }}>{item.val}</span>
                      </div>
                    </div>
                    {i < 3 && <div style={{ width: 1, height: 12, background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', marginLeft: 22 }} />}
                  </div>
                ))}
              </div>
            </div>
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
        <div className="orb" style={{ width: 800, height: 400, background: isDark ? 'rgba(16,185,129,0.08)' : 'rgba(124,58,237,0.06)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div data-id="cta" className={`reveal${visible.cta ? ' visible' : ''}`} style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ width: 1, height: 60, background: `linear-gradient(to bottom, transparent, ${accentBorder})`, margin: '0 auto 48px' }} />
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24, color: fg }}>
            {t.ctaTitle1}<br /><em style={{ color: accent }}>{t.ctaTitle2}</em>
          </h2>
          <p className="mono" style={{ fontSize: 13, color: fgMuted, marginBottom: 48, lineHeight: 1.8 }}>{t.ctaDesc}</p>
          <button onClick={() => navigate('/record')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 48px', background: accent, color: isDark ? '#080c0a' : '#ffffff', fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = accentHover} onMouseLeave={e => e.currentTarget.style.background = accent}>{t.launchPlatform}</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 80px', borderTop: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: isDark ? '#080c0a' : '#ffffff', fontSize: 12 }}>L</div>
          <span className="mono" style={{ fontSize: 12, color: fgMuted, letterSpacing: '0.05em' }}>LUMA Biome Platform</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <button className="footer-link" onClick={() => navigate('/about')} style={{ color: fgMuted }}>{t.aboutUs}</button>
          <button className="footer-link" onClick={() => navigate('/contact')} style={{ color: fgMuted }}>{t.contact}</button>
          <a href="https://luma.earth" target="_blank" rel="noreferrer" className="footer-link" style={{ color: fgMuted }}>luma.earth ↗</a>
        </div>
        <div className="mono" style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.05em' }}>{t.copyright}</div>
      </footer>
    </div>
  )
}