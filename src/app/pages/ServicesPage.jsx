import { useState } from 'react'
import { useTheme, themeColors } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { useNavigate } from 'react-router-dom'

// Plan / Consult images
import consulting1 from '../../assets/Service2/Consulting1.jpeg'
import consulting3 from '../../assets/Service2/Consulting3.jpg'
import consulting5 from '../../assets/Service2/Consulting5.jpg'
import consulting6 from '../../assets/Service2/Consulting6.jpg'

// Install / Plant images
import jope5 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope5.jpg'
import jope8 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope8.jpg'
import stewardship3 from '../../assets/Service9/Stewardship3.JPG'
import climate2 from '../../assets/Service5/Climate2.jpg'

// Stewardship images
import stewardship1 from '../../assets/Service9/Stewardship1.JPG'
import stewardship5 from '../../assets/Service9/Stewardship5.JPG'
import treeService2 from '../../assets/Service1/Tree service 2.jpg'
import treeService3 from '../../assets/Service1/Tree service 3.jpg'

// Monitor images
import drone1 from '../../assets/Service3/Drone1.jpg'
import biome2 from '../../assets/Service8/Biome2.JPG'
import climate6 from '../../assets/Service5/Climate6.JPG'

import serviceBG from '../../assets/ServiceBG1.jpg'

const pillars = {
  en: [
    {
      id: 'plan',
      num: '01',
      verb: 'Plan.',
      title: 'We think before we dig.',
      description: 'Every project starts with an honest site assessment: soil condition, existing vegetation, microclimate, sealing level. We develop tailored greening concepts that balance biodiversity, aesthetics and climate resilience — and help clients navigate grants and stakeholder processes.',
      subservices: [
        'Site assessment & ecological inventory',
        'Biodiversity & climate resilience concepts',
        'Planting plans — understory, perennials, wildflowers',
        'Grant application consulting',
        'Stakeholder workshops & citizen participation',
        'Cost estimates & lifecycle planning',
      ],
      images: [consulting1, consulting6, consulting3, consulting5],
    },
    {
      id: 'install',
      num: '02',
      verb: 'Install & Plant.',
      title: 'Craft at ground level.',
      description: 'Soil rehabilitation, precision planting, habitat structures, irrigation — done with care and expertise. We work from compacted courtyards to rooftop systems. Every installation is the beginning of a living system, not a finished product.',
      subservices: [
        'Soil remediation — soil lance, AirSpade, substrate exchange',
        'Tree, shrub, perennial & wildflower planting',
        'Habitat structures — deadwood, wild bee nesting, stone features',
        'Green roofs & living wall systems',
        'Solar-powered automated irrigation (IBC, drip)',
        'Mulching with fungi-friendly material',
      ],
      images: [jope8, jope5, stewardship3, climate2],
    },
    {
      id: 'steward',
      num: '03',
      verb: 'Steward.',
      title: 'The contract that grows the ecosystem.',
      description: 'Installation is just the beginning. Multi-year stewardship contracts are where an ecosystem actually develops. Tree safety assessments, microbiome re-inoculation, adaptive management — we stay with every site and watch it improve every season.',
      subservices: [
        'Multi-year care contracts (development & maintenance)',
        'Tree care — pruning, crown work, ZTV-Baumpflege standards',
        'Tree safety assessment & damage diagnostics',
        'Irrigation management during drought periods',
        'Soil microbiome re-inoculation & compost refreshment',
        'Adaptive management responding to seasonal change',
      ],
      images: [stewardship1, treeService2, stewardship5, treeService3],
    },
    {
      id: 'monitor',
      num: '04',
      verb: 'Monitor.',
      title: 'Data that proves ecosystem health.',
      description: 'Drone NDVI surveys, sensor networks, microbiome analysis — all feeding the BIOME Platform. We turn complex ecological data into decision-ready reports for housing companies, municipalities and planning offices.',
      subservices: [
        'BIOME Platform — sensor dashboards & trend analysis',
        'Drone surveys — NDVI, multispectral, thermal imaging',
        'Microbiome monitoring at 6 / 12 / 24 months',
        'Annual biodiversity reports',
        'Long-term vitality tracking & early warning',
        'API integration with GIS and planning systems',
      ],
      images: [drone1, biome2, climate6],
    },
  ],
  de: [
    {
      id: 'plan',
      num: '01',
      verb: 'Planen.',
      title: 'Wir denken, bevor wir graben.',
      description: 'Jedes Projekt beginnt mit einer ehrlichen Standortaufnahme: Bodenzustand, Bestandsvegetation, Mikroklima, Versiegelungsgrad. Wir entwickeln maßgeschneiderte Begrünungskonzepte, die Biodiversität, Ästhetik und Klimaresilienz verbinden — und begleiten Förderanträge und Beteiligungsprozesse.',
      subservices: [
        'Standortanalyse & ökologische Bestandsaufnahme',
        'Biodiversitäts- & Klimaresilienzkonzepte',
        'Pflanzpläne — Unterpflanzung, Stauden, Wildblumen',
        'Förderberatung',
        'Stakeholder-Workshops & Bürgerbeteiligung',
        'Kostenschätzung & Lebenszyklusplanung',
      ],
      images: [consulting1, consulting6, consulting3, consulting5],
    },
    {
      id: 'install',
      num: '02',
      verb: 'Installieren & Pflanzen.',
      title: 'Handwerk auf Bodenniveau.',
      description: 'Bodensanierung, präzise Pflanzung, Habitatstrukturen, Bewässerung — mit Sorgfalt und Expertise ausgeführt. Wir arbeiten von verdichteten Innenhöfen bis zu Dachsystemen. Jede Installation ist der Anfang eines lebendigen Systems, kein fertiges Produkt.',
      subservices: [
        'Bodensanierung — Bodenlanze, AirSpade, Substrataustausch',
        'Baum-, Strauch-, Stauden- & Wildblumenpflanzung',
        'Habitatstrukturen — Totholz, Wildbienen-Nisthilfen, Steinsetzungen',
        'Gründächer & Fassadenbegrünungssysteme',
        'Solare Bewässerungsautomatik (IBC, Tröpfchenbewässerung)',
        'Mulchung mit pilzfreundlichem Material',
      ],
      images: [jope8, jope5, stewardship3, climate2],
    },
    {
      id: 'steward',
      num: '03',
      verb: 'Steuardship.',
      title: 'Der Vertrag, der das Ökosystem wachsen lässt.',
      description: 'Die Pflanzung ist nur der Anfang. Langzeitpflegeverträge sind der Ort, wo ein Ökosystem wirklich entsteht. Baumkontrolle, Mikrobiom-Nachinokulation, adaptives Management — wir bleiben an jedem Standort und sehen ihn jede Saison besser werden.',
      subservices: [
        'Mehrjährige Pflegeverträge (Entwicklungs- & Unterhaltungspflege)',
        'Baumpflege — Kronenschnitt, ZTV-Baumpflege-Standards',
        'Baumkontrolle & Schadensdiagnostik',
        'Bewässerungsmanagement in Trockenphasen',
        'Mikrobiom-Nachinokulation & Kompostauffrischung',
        'Adaptives Management saisonaler Entwicklung',
      ],
      images: [stewardship1, treeService2, stewardship5, treeService3],
    },
    {
      id: 'monitor',
      num: '04',
      verb: 'Monitoring.',
      title: 'Daten, die Ökosystem-Gesundheit beweisen.',
      description: 'Drohnen-NDVI, Sensornetzwerke, Mikrobiomanalysen — alles fließt in die BIOME-Plattform. Wir verwandeln komplexe ökologische Daten in entscheidungsreife Berichte für Wohnungsgesellschaften, Kommunen und Planungsbüros.',
      subservices: [
        'BIOME-Plattform — Sensor-Dashboards & Trendanalyse',
        'Drohnenerhebungen — NDVI, Multispektral, Thermal',
        'Mikrobiom-Monitoring nach 6 / 12 / 24 Monaten',
        'Jährliche Biodiversitätsberichte',
        'Langzeit-Vitalitätstracking & Frühwarnsystem',
        'API-Integration mit GIS- und Fachsystemen',
      ],
      images: [drone1, biome2, climate6],
    },
  ],
}

function PillarSection({ pillar, index, isDark, accent, fg, fgMuted, fgSubtle, borderColor, bg, lang }) {
  const isEven = index % 2 === 0
  const [hoveredImg, setHoveredImg] = useState(0)

  return (
    <div style={{ borderBottom: `1px solid ${borderColor}` }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr',
        minHeight: 640,
      }}>
        {/* Image panel */}
        <div
          className="services-img-panel"
          style={{
            order: isEven ? 2 : 1,
            position: 'relative',
            overflow: 'hidden',
            background: isDark ? '#000d11' : '#e8d9c0',
          }}
        >
          {pillar.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: hoveredImg === i ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            />
          ))}
          {/* Dot nav for images */}
          <div style={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 6, zIndex: 2,
          }}>
            {pillar.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setHoveredImg(i)}
                style={{
                  width: i === hoveredImg ? 20 : 6,
                  height: 6, borderRadius: 3,
                  background: i === hoveredImg ? accent : 'rgba(255,255,255,0.4)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
          {/* subtle number watermark */}
          <div style={{
            position: 'absolute', top: 24, right: 28, zIndex: 2,
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em',
          }}>
            {pillar.num}
          </div>
        </div>

        {/* Text panel */}
        <div
          style={{
            order: isEven ? 1 : 2,
            padding: 'clamp(48px, 6vw, 80px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            background: isDark
              ? (isEven ? 'transparent' : 'rgba(255,255,255,0.015)')
              : (isEven ? 'transparent' : 'rgba(0,0,0,0.015)'),
          }}
        >
          {/* Pillar verb */}
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: accent,
            marginBottom: 8,
          }}>
            {pillar.verb}
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: fg,
            marginBottom: 20,
            lineHeight: 1.3,
          }}>
            {pillar.title}
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: fgMuted,
            lineHeight: 1.85,
            fontWeight: 300,
            marginBottom: 36,
            maxWidth: 480,
          }}>
            {pillar.description}
          </p>

          {/* Sub-services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {pillar.subservices.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '10px 0',
                  borderTop: `1px solid ${borderColor}`,
                }}
              >
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9, color: accent,
                  letterSpacing: '0.1em', marginTop: 3, flexShrink: 0,
                  minWidth: 16,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13, color: fgMuted,
                  lineHeight: 1.5, fontWeight: 300,
                }}>
                  {s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const { theme } = useTheme()
  const { lang } = useLang()
  const navigate = useNavigate()
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, bg, fg, fgMuted, fgSubtle, borderColor } = c
  const services = pillars[lang]

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        .mono { font-family: 'Space Mono', monospace; }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .services-img-panel { min-height: 280px !important; order: 1 !important; }
          .services-text-panel { order: 2 !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="page-hero" style={{ position: 'relative', borderBottom: `1px solid ${borderColor}`, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${serviceBG})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: isDark
            ? 'linear-gradient(to right, rgba(0,18,25,0.88) 0%, rgba(0,18,25,0.6) 60%, rgba(0,18,25,0.2) 100%)'
            : 'linear-gradient(to right, rgba(0,18,25,0.80) 0%, rgba(0,18,25,0.5) 60%, rgba(0,18,25,0.1) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
            {lang === 'en' ? 'Services' : 'Leistungen'}
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#ffffff', marginBottom: 20 }}>
            {lang === 'en' ? 'Four ways we work.' : 'Vier Arten, wie wir arbeiten.'}
          </h1>
          <p className="mono" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 520, lineHeight: 1.8, fontWeight: 300 }}>
            {lang === 'en'
              ? 'Plan, install, steward and monitor — a full lifecycle approach to urban ecosystems. Every service connects to the next.'
              : 'Planen, installieren, pflegen, monitoren — ein ganzheitlicher Ansatz für urbane Ökosysteme. Jede Leistung verbindet sich mit der nächsten.'}
          </p>
        </div>
      </div>

      {/* Four pillars */}
      {services.map((pillar, i) => (
        <PillarSection
          key={pillar.id}
          pillar={pillar}
          index={i}
          isDark={isDark}
          accent={accent}
          fg={fg}
          fgMuted={fgMuted}
          fgSubtle={fgSubtle}
          borderColor={borderColor}
          bg={bg}
          lang={lang}
        />
      ))}

      {/* CTA strip */}
      <div style={{ borderTop: `1px solid ${borderColor}`, padding: '72px 40px', textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
          {lang === 'en' ? 'Ready to start?' : 'Bereit loszulegen?'}
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.03em', color: fg, marginBottom: 32 }}>
          {lang === 'en' ? 'Let\'s talk about your site.' : 'Lass uns über deine Fläche sprechen.'}
        </h2>
        <button
          onClick={() => navigate('/contact')}
          style={{
            background: accent, color: '#001219',
            border: 'none', cursor: 'pointer',
            fontFamily: "'Space Mono', monospace",
            fontSize: 12, letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '16px 36px',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 32px ${accent}50` }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
        >
          {lang === 'en' ? 'Request a free consultation →' : 'Kostenlose Erstberatung anfragen →'}
        </button>
      </div>
    </div>
  )
}
