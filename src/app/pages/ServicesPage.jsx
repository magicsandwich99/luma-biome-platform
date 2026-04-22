import { useTheme, themeColors } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'

const serviceDetails = {
  en: [
    { number: '01', title: 'Tree Care & Tree Assessment', desc: 'Professional assessment and care of urban trees. We evaluate health, structural integrity and biodiversity value, and develop tailored maintenance plans to preserve your green assets long-term.' },
    { number: '02', title: 'Consulting & Conceptual Design', desc: 'Strategic consulting for nature-positive urban development. We design biodiversity concepts from the ground up — integrating ecological goals with architectural and landscape planning.' },
    { number: '03', title: 'Drone Surveys & Remote Sensing', desc: 'High-resolution aerial surveys using drone technology and remote sensing. We map vegetation cover, detect changes over time and generate detailed site reports for planning and reporting.' },
    { number: '04', title: 'Installation', desc: 'On-site implementation of all biodiversity and greening measures. Our experienced team installs green infrastructure professionally, from green roofs to habitat structures and sensor networks.' },
    { number: '05', title: 'Climate Resilience Measures', desc: 'Designing and implementing measures that make urban spaces resilient to climate change. We focus on heat reduction, water retention, flood protection and microclimate improvement.' },
    { number: '06', title: 'Habitat Structures', desc: 'Creating and installing custom habitat structures for urban wildlife. From insect hotels to bird nesting boxes and bat shelters — we design structures that genuinely support local biodiversity.' },
    { number: '07', title: 'Green Roofs & Living Walls', desc: 'Design, installation and maintenance of extensive and intensive green roofs and living wall systems. We combine aesthetic appeal with measurable ecological and thermal performance.' },
    { number: '08', title: 'BIOME Platform', desc: 'Our digital intelligence layer for continuous biodiversity monitoring. Sensor data from your sites feeds directly into the BIOME platform for real-time analysis, compliance reporting and long-term trend tracking.' },
    { number: '09', title: 'Long-Term Stewardship', desc: 'Ongoing monitoring, maintenance and reporting to ensure your green investments continue to deliver. We provide annual assessments, adaptive management and sustainability documentation.' },
  ],
  de: [
    { number: '01', title: 'Baumpflege & Baumgutachten', desc: 'Professionelle Begutachtung und Pflege von Stadtbäumen. Wir bewerten Gesundheit, Standsicherheit und Biodiversitätswert und entwickeln maßgeschneiderte Pflegepläne.' },
    { number: '02', title: 'Beratung & Konzeptplanung', desc: 'Strategische Beratung für naturpositive Stadtentwicklung. Wir entwickeln Biodiversitätskonzepte von Grund auf — integriert in Architektur- und Landschaftsplanung.' },
    { number: '03', title: 'Drohnenerhebungen & Fernerkundung', desc: 'Hochauflösende Luftaufnahmen mit Drohnentechnologie und Fernerkundung. Wir kartieren Vegetationsdecken, erkennen Veränderungen und erstellen detaillierte Standortberichte.' },
    { number: '04', title: 'Installation', desc: 'Vor-Ort-Umsetzung aller Biodiversitäts- und Begrünungsmaßnahmen. Unser erfahrenes Team installiert grüne Infrastruktur professionell — von Gründächern bis zu Habitatstrukturen.' },
    { number: '05', title: 'Klimaresilienzmaßnahmen', desc: 'Planung und Umsetzung von Maßnahmen für klimaresiliente Stadträume. Schwerpunkte: Hitzeminderung, Wasserrückhalt, Hochwasserschutz und Mikroklima-Verbesserung.' },
    { number: '06', title: 'Habitatstrukturen', desc: 'Entwicklung und Installation maßgeschneiderter Habitatstrukturen für Stadtwildtiere. Von Insektenhotels bis zu Vogelniststätten — Strukturen, die lokale Biodiversität fördern.' },
    { number: '07', title: 'Gründächer & Fassadenbegrünung', desc: 'Planung, Installation und Pflege von extensiven und intensiven Gründächern sowie Fassadenbegrünungssystemen mit messbarer ökologischer und thermischer Leistung.' },
    { number: '08', title: 'BIOME-Plattform', desc: 'Unsere digitale Intelligenzschicht für kontinuierliches Biodiversitätsmonitoring. Sensordaten Ihrer Standorte fließen direkt in die BIOME-Plattform für Echtzeit-Analysen und Compliance-Berichte.' },
    { number: '09', title: 'Langfristige Pflege', desc: 'Laufendes Monitoring, Pflege und Berichterstattung, damit Ihre grünen Investitionen dauerhaft wirken. Wir liefern jährliche Bewertungen und Nachhaltigkeitsdokumentation.' },
  ],
}

export default function ServicesPage() {
  const { theme } = useTheme()
  const { lang } = useLang()
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, bg, fg, fgMuted, fgSubtle, borderColor, cardBg, cardBorder } = c
  const t = translations[lang].nav
  const services = serviceDetails[lang]

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .mono { font-family: 'DM Mono', monospace; }
        .service-tile {
          border: 1px solid ${cardBorder};
          background: ${cardBg};
          padding: 40px;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background 0.3s, box-shadow 0.4s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .service-tile::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: ${accent};
          opacity: 0;
          transition: opacity 0.3s;
        }
        .service-tile:hover {
          transform: scale(1.03) translateY(-4px);
          border-color: ${accent}40;
          background: ${accent}08;
          box-shadow: 0 20px 60px ${accent}15;
        }
        .service-tile:hover::before { opacity: 1; }
      `}</style>

      {/* Header band */}
      <div style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderBottom: `1px solid ${borderColor}`, padding: '80px 80px 64px' }}>
        <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>{t.services}</div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: fg, marginBottom: 20 }}>
          What LUMA offers.
        </h1>
        <p className="mono" style={{ fontSize: 14, color: fgMuted, maxWidth: 560, lineHeight: 1.8, fontWeight: 300 }}>
          {lang === 'en'
            ? 'From ecological consulting to digital biodiversity monitoring — our services cover the full lifecycle of nature-positive urban development.'
            : 'Von ökologischer Beratung bis zum digitalen Biodiversitätsmonitoring — unsere Leistungen decken den gesamten Lebenszyklus naturpositiver Stadtentwicklung ab.'}
        </p>
      </div>

      {/* Services grid */}
      <div style={{ padding: '80px 80px 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {services.map((service, i) => (
            <div key={i} className="service-tile">
              <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.15em', marginBottom: 20 }}>{service.number}</div>
              <div style={{ width: 32, height: 1, background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)', marginBottom: 20 }} />
              <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 16, color: fg, lineHeight: 1.2 }}>{service.title}</h3>
              <p className="mono" style={{ fontSize: 12, color: fgMuted, lineHeight: 1.8, fontWeight: 300 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}