import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const stats = [
  { value: '2.4M', label: 'Data points collected' },
  { value: '180+', label: 'Active monitoring stations' },
  { value: '34', label: 'Partner companies' },
  { value: '12', label: 'Reporting frameworks supported' },
]

const features = [
  {
    icon: '⬡',
    title: 'Live Sensor Network',
    desc: 'Connect biodiversity sensors across air, water, soil and climate. Real-time data streams from every monitoring station, visualised on a live map.',
    color: '#10b981',
    path: '/record',
    cta: 'Open Record',
  },
  {
    icon: '⟁',
    title: 'Intelligent Data Refinery',
    desc: 'Build visual data pipelines. Connect sensors to filters, aggregators and normalisation nodes. Clean your data before it reaches any report.',
    color: '#8b5cf6',
    path: '/refine',
    cta: 'Open Refine',
  },
  {
    icon: '◈',
    title: 'Compliance Reports',
    desc: 'Generate audit-ready sustainability reports aligned to GRI, TNFD, CDP and more. Export with one click and submit directly to reporting bodies.',
    color: '#3b82f6',
    path: '/reports',
    cta: 'Open Reports',
  },
]

const frameworks = ['GRI Standards', 'TNFD', 'CDP', 'EU Taxonomy', 'CSRD', 'TCFD']

const services = [
  { number: '01', title: 'Service One', desc: 'Coming soon' },
  { number: '02', title: 'Service Two', desc: 'Coming soon' },
  { number: '03', title: 'Service Three', desc: 'Coming soon' },
  { number: '04', title: 'Service Four', desc: 'Coming soon' },
  { number: '05', title: 'Service Five', desc: 'Coming soon' },
  { number: '06', title: 'Service Six', desc: 'Coming soon' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [visible, setVisible] = useState({})

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: '#080c0a', color: '#e8ede9', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        .mono { font-family: 'DM Mono', monospace; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes scroll-cards {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }

        .hero-title { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .hero-sub { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .hero-cta { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .hero-badge { animation: fadeIn 1s ease 0.1s both; }

        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 2px;
          padding: 40px;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--accent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.15); transform: translateY(-4px); }
        .feature-card:hover::before { opacity: 1; }

        .stat-num { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1; letter-spacing: -0.02em; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; background: #10b981; color: #080c0a;
          font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase; border: none;
          cursor: pointer; transition: background 0.2s, transform 0.2s;
        }
        .btn-primary:hover { background: #34d399; transform: translateY(-2px); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; background: transparent; color: #e8ede9;
          font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 400;
          letter-spacing: 0.08em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.2); cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.5); transform: translateY(-2px); }

        .tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.3); color: #10b981;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        .grid-bg {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px);
          background-size: 60px 60px; pointer-events: none;
        }

        .services-track {
          display: flex;
          width: max-content;
          animation: scroll-cards 40s linear infinite;
          gap: 24px;
        }
        .services-track:hover {
          animation-play-state: paused;
        }

        .service-card {
          width: 320px;
          min-height: 260px;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          padding: 36px;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: #10b981;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .service-card:hover {
          border-color: rgba(16,185,129,0.25);
          background: rgba(16,185,129,0.03);
          transform: translateY(-6px);
        }
        .service-card:hover::before { opacity: 1; }

        .orb {
          position: absolute; border-radius: 50%; filter: blur(120px);
          pointer-events: none; animation: glow-pulse 4s ease-in-out infinite;
        }

        .framework-pill {
          padding: 8px 20px; border: 1px solid rgba(255,255,255,0.1);
          font-family: 'DM Mono', monospace; font-size: 12px;
          color: rgba(255,255,255,0.5); letter-spacing: 0.05em; transition: all 0.2s;
        }
        .framework-pill:hover { border-color: rgba(16,185,129,0.4); color: #10b981; background: rgba(16,185,129,0.05); }

        .line-accent { width: 40px; height: 1px; background: #10b981; margin-bottom: 24px; }

        .section-label {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.2em; text-transform: uppercase; color: #10b981; margin-bottom: 16px;
        }

        .footer-link {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: rgba(255,255,255,0.35); letter-spacing: 0.1em;
          text-transform: uppercase; background: none; border: none;
          cursor: pointer; text-decoration: none; transition: color 0.2s;
        }
        .footer-link:hover { color: #10b981; }
      `}</style>

      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 80px 80px', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="orb" style={{ width: 600, height: 600, background: 'rgba(16,185,129,0.12)', top: -100, right: -100, animationDelay: '0s' }} />
        <div className="orb" style={{ width: 400, height: 400, background: 'rgba(139,92,246,0.08)', bottom: 0, left: '30%', animationDelay: '2s' }} />

        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', opacity: 0.03 }}>
          <div style={{ position: 'absolute', width: '100%', height: 2, background: '#10b981', animation: 'scanline 8s linear infinite' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
          <div className="hero-badge" style={{ marginBottom: 32 }}>
            <span className="tag">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-ring 2s ease-out infinite' }} />
              Biome Intelligence Platform
            </span>
          </div>

          <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.02, letterSpacing: '-0.03em', marginBottom: 32, fontWeight: 400 }}>
            Nature's data,<br />
            <em style={{ color: '#10b981' }}>made legible.</em>
          </h1>

          <p className="hero-sub mono" style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: 560, marginBottom: 48, fontWeight: 300 }}>
            LUMA Biome Platform is the centralised intelligence layer for companies committed to nature-positive operations — capturing, refining, and reporting real biodiversity data to the bodies that matter.
          </p>

          <div className="hero-cta" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('/record')}>Enter Platform →</button>
            <button className="btn-ghost" onClick={() => navigate('/reports')}>View Reports</button>
          </div>
        </div>

        <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)', animation: 'float 6s ease-in-out infinite', opacity: 0.7 }}>
          <div style={{ padding: 24, border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(8,12,10,0.8)', backdropFilter: 'blur(20px)', minWidth: 200 }}>
            <div className="mono" style={{ fontSize: 11, color: '#10b981', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Live — Forest CO₂</div>
            <div style={{ fontSize: 42, letterSpacing: '-0.03em', color: '#e8ede9', marginBottom: 4 }}>412<span style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}> ppm</span></div>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>↑ 0.3% from last hour</div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ padding: '0 80px', marginBottom: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="section-label">Our Services</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              What LUMA offers.
            </h2>
          </div>
          <p className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', maxWidth: 320, lineHeight: 1.7, fontWeight: 300, textAlign: 'right' }}>
            Hover to pause. Each service is designed to help companies track, understand and report on their environmental impact.
          </p>
        </div>

        <div style={{ overflow: 'hidden', position: 'relative' }}>
          {/* Fade edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, #080c0a, transparent)', zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, #080c0a, transparent)', zIndex: 10, pointerEvents: 'none' }} />

          <div className="services-track">
            {[...services, ...services].map((service, i) => (
              <div key={i} className="service-card">
                <div className="mono" style={{ fontSize: 11, color: '#10b981', letterSpacing: '0.15em', marginBottom: 24 }}>{service.number}</div>
                <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 24 }} />
                <h3 style={{ fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 16 }}>{service.title}</h3>
                <p className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.75, fontWeight: 300 }}>{service.desc}</p>
                <div style={{ position: 'absolute', bottom: 36, right: 36 }}>
                  <span className="mono" style={{ fontSize: 11, color: 'rgba(16,185,129,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Learn more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '100px 80px' }}>
        <div data-id="stats" className={`reveal${visible.stats ? ' visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '48px 40px', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', transitionDelay: `${i * 0.1}s` }}>
              <div className="stat-num" style={{ color: '#10b981', marginBottom: 12 }}>{s.value}</div>
              <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '0 80px 120px' }}>
        <div data-id="feat-head" className={`reveal${visible['feat-head'] ? ' visible' : ''}`} style={{ marginBottom: 64 }}>
          <div className="section-label">Platform Modules</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.02em', maxWidth: 600, lineHeight: 1.1 }}>
            Three tools.<br />One source of truth.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
          {features.map((f, i) => (
            <div key={i} data-id={`feat-${i}`} className={`feature-card reveal${visible[`feat-${i}`] ? ' visible' : ''}`} style={{ '--accent': f.color, transitionDelay: `${i * 0.12}s` }} onClick={() => navigate(f.path)}>
              <div style={{ fontSize: 28, color: f.color, marginBottom: 24, fontFamily: 'monospace' }}>{f.icon}</div>
              <div className="line-accent" style={{ background: f.color }} />
              <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16, letterSpacing: '-0.01em' }}>{f.title}</h3>
              <p className="mono" style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', marginBottom: 32, fontWeight: 300 }}>{f.desc}</p>
              <span className="mono" style={{ fontSize: 12, color: f.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.cta} →</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '100px 80px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div data-id="how" className={`reveal${visible.how ? ' visible' : ''}`}>
          <div className="section-label">How it works</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 48 }}>
                From field sensor<br />to regulatory filing —<br /><em style={{ color: '#10b981' }}>automatically.</em>
              </h2>
              {[
                ['01', 'Deploy sensors', 'Place biodiversity monitoring stations across your sites. Air, water, soil and wildlife sensors feed live data into the platform.'],
                ['02', 'Refine the signal', 'Build data pipelines using our visual flow editor. Remove outliers, aggregate readings, align timestamps and normalise values.'],
                ['03', 'Generate & submit', 'Select a reporting framework — TNFD, GRI, CDP — and generate a compliant report. Export as PDF or submit directly.'],
              ].map(([num, title, desc]) => (
                <div key={num} style={{ display: 'flex', gap: 24, marginBottom: 36 }}>
                  <div className="mono" style={{ fontSize: 11, color: '#10b981', paddingTop: 4, minWidth: 28, letterSpacing: '0.05em' }}>{num}</div>
                  <div>
                    <div style={{ fontSize: 16, marginBottom: 6, letterSpacing: '-0.01em' }}>{title}</div>
                    <div className="mono" style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: 40, background: 'rgba(8,12,10,0.6)' }}>
                <div className="mono" style={{ fontSize: 11, color: '#10b981', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>Live data pipeline</div>
                {[
                  { label: 'Soil Moisture Station', type: 'SENSOR', color: '#10b981', val: '34%' },
                  { label: 'Normalize Filter', type: 'FILTER', color: '#8b5cf6', val: '↓' },
                  { label: 'Aggregate Node', type: 'FILTER', color: '#8b5cf6', val: '↓' },
                  { label: 'TNFD Report Output', type: 'REPORT', color: '#3b82f6', val: '✓' },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: `${item.color}0d`, border: `1px solid ${item.color}25` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />
                        <span style={{ fontSize: 14 }}>{item.label}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="mono" style={{ fontSize: 10, color: item.color, letterSpacing: '0.1em' }}>{item.type}</span>
                        <span className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{item.val}</span>
                      </div>
                    </div>
                    {i < 3 && <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)', marginLeft: 22 }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting frameworks */}
      <section style={{ padding: '100px 80px' }}>
        <div data-id="frameworks" className={`reveal${visible.frameworks ? ' visible' : ''}`} style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ textAlign: 'center' }}>Supported Frameworks</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Every standard. One platform.
          </h2>
          <p className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 56, maxWidth: 480, margin: '0 auto 56px' }}>
            Generate reports aligned to the world's leading sustainability disclosure standards without changing your workflow.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {frameworks.map((f, i) => (
              <div key={i} className="framework-pill">{f}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 800, height: 400, background: 'rgba(16,185,129,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div data-id="cta" className={`reveal${visible.cta ? ' visible' : ''}`} style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.4))', margin: '0 auto 48px' }} />
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24 }}>
            Ready to monitor<br /><em style={{ color: '#10b981' }}>what matters?</em>
          </h2>
          <p className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 48, lineHeight: 1.8 }}>
            Join the companies using LUMA to turn raw biome data into verified sustainability intelligence.
          </p>
          <button className="btn-primary" onClick={() => navigate('/record')} style={{ fontSize: 14, padding: '18px 48px' }}>
            Launch Platform →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 80px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#080c0a', fontSize: 12 }}>L</div>
          <span className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>LUMA Biome Platform</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <button className="footer-link" onClick={() => navigate('/about')}>About Us</button>
          <button className="footer-link" onClick={() => navigate('/contact')}>Contact</button>
          <a href="https://luma.earth" target="_blank" rel="noreferrer" className="footer-link">luma.earth ↗</a>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
          © 2025 LUMA Earth. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
