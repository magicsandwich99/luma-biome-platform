import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useTheme, themeColors } from '../context/ThemeContext'
import { translations } from '../i18n/translations'
import smoothDrone from '../../assets/SmootherDrone.mp4'
import goalBG2 from '../../assets/GoalBG.jpg'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

import serviceThumb1 from '../../assets/Service1/Tree service 1.PNG'
import serviceThumb2 from '../../assets/Service2/Consulting1.jpeg'
import serviceThumb3 from '../../assets/Service3/Drone1.jpg'
import serviceThumb4 from '../../assets/Service5/Climate1.jpg'
import serviceThumb5 from '../../assets/Service5/Climate2.jpg'
import serviceThumb6 from '../../assets/Service5/Climate3.jpg'
import serviceThumb7 from '../../assets/Service5/Climate4.png'
import serviceThumb8 from '../../assets/Service8/Biome1.JPG'
import serviceThumb9 from '../../assets/Service9/Stewardship1.JPG'

import johannesPhoto from '../../assets/Johannes.jpg'
import gisselaPhoto from '../../assets/Gissela.jpg'

const frameworks = ['GRI Standards', 'TNFD', 'CDP', 'EU Taxonomy', 'CSRD', 'TCFD']

const heroSub = {
  en: 'Luma is an all-in-one service provider to help companies to achieve real-world impact & meaningful insights into their biodiversity and climate adaptation resilience projects.',
  de: 'Luma ist ein All-in-One-Dienstleister, der Unternehmen dabei unterstützt, echte Wirkung zu erzielen und aussagekräftige Einblicke in ihre Biodiversitäts- und Klimaanpassungsprojekte zu gewinnen.',
}

const visionMissionContent = {
  en: {
    title: 'Vision & Mission',
    sections: [
      {
        heading: 'Vision Statement: What drives us?',
        body: 'Our overarching goal is to improve and preserve the livelihoods, resilience, and well-being of as many living beings and people as possible — to foster harmonious coexistence in the long term.',
      },
      {
        heading: 'Mission Statement: How do we achieve this?',
        body: 'With a passion for craftsmanship and modular, innovative, and intelligent solutions, we transform urban spaces into climate-resilient, species-rich oases that invite people to linger and offer a high quality of life. We combine data science with craftsmanship and ecology to deliver all-in-one service solutions.',
      },
      {
        heading: 'Vivid Vision (adaptive description of a future we envision):',
        body: `The year is 2036. The climate crisis is accelerating faster than scientific predictions assumed. A series of hot summer weeks is cooking Berlin — air temperatures sit at 39°C and barely cool down at night. The asphalt holds the heat. The buildings hold the heat. The city has become its own oven. People are suffering, especially the elderly and children, the populations who never had a way out of the urban heat island.

But there are cool spots in the city now. Step into one of them and the air drops by 4–5°C, sometimes more. These are LUMA's urban micro-forests — dense, multi-layered, native plantings that the city and dozens of property owners invested in years ago, when biodiversity was still treated as decoration. Today they are infrastructure. Each one functions as a living air conditioner, a habitat for hundreds of species, a refuge for residents, and an architectural signature of Berlin's resilience strategy. People sit under their canopies on benches designed into the planting. Children find beetles. Wild bees nest in sand walls. The forests are not just functional — they are beautiful. We made beauty a goal alongside biodiversity, because humans only protect what they love, and a city only defends what it finds worth living in.

When the heavy storms come — and they come more often now, more violent than the climate models predicted — none of these sites flood. The microbiome-enhanced soil absorbs water within minutes, holding it like a sponge instead of shedding it onto the streets. Combined with LUMA's broader rainwater management — intermittent storage containers, biodiverse green roofs, hybrid bioretention cells — Berlin's stormwater system has stopped being a procedure and started behaving like a sponge city. Buildings that would have flooded a decade ago now stay dry.

This works because we never pretended biodiversity was simple. We measured the right things, not just the easy things — soil biology, functional diversity, ecosystem services in euros. We were honest when restorations failed, and we adapted instead of hiding it. We kept the craftsmanship alive: the arborists climbing, the gardeners planting, the soil scientists kneeling in the dirt. The data is only as good as the work beneath it. We respected what traditional land stewards have always known and integrated their knowledge into modern science instead of replacing it. That earned us legitimacy. Greenwashing got harder. Real work got rewarded.

Because we began tracking this work over a decade ago and built sophisticated data systems around it, the evidence has piled up. Investment in green assets reduces costs. Improves long-term asset value. Has measurable effects on local quality of life and biodiversity. Investing in living infrastructure has become as reliable and accessible as it has ever been. The BIOME platform — scientifically backed, independently verified, built on open standards — has emerged as the central hub for the entire urban biodiversity industry. Landscape architects pull verified species performance data from it before specifying a plant. Municipalities issue maintenance contracts through it. Specialized service providers — wild bee experts, soil microbiologists, deadwood habitat builders, green roof engineers — connect with the projects that need them. Researchers at universities draw on years of standardized field data. Insurers price urban ecology into risk models because the data is finally good enough. Tiered access — free for community gardens and citizen scientists, subscription-based for professionals. We built the hub. We do not own the data.

A biodiversity standard, comparable in rigor to carbon accounting, has emerged through our framework — not because we declared it, but because the data was open, the methods transparent, and the results replicable across continents. Companies prove their ecological commitments to authorities and investors with documented track records spanning decades.

LUMA started its European expansion in 2030. Today we are active in France, Italy, Slovenia, Sweden, Spain, Portugal, and most other EU countries. Since politics shifted radically toward renewables and preservation, worldwide demand for our services has grown rapidly — and we are now expanding into Asia, Africa, and the Americas through a LUMA-certified network of practitioners trained in our methods. The work reaches places we will never personally visit. Our team is cross-disciplinary by design — ecologists alongside software engineers alongside arborists alongside designers — because the problems we solve sit at the intersections.

Our customers stay with us because we keep listening. Subscriptions grow not from lock-in but from genuine value. Community feedback drives every release. We forge real partnerships, because we fight for the same purpose.

LUMA contributes to the worldwide movement to preserve life on this planet for generations to come. We are not landscaping. We are not a software company. We are the living infrastructure layer of the cities of the future — proving, every day, that humans and all other life forms can share the same ground, with trust as the foundation, data as the language, beauty as the goal, and craftsmanship as the soul.

This is where we are going. The path will change. The destination will not.`,
      },
    ],
  },
  de: {
    title: 'Vision & Mission',
    sections: [
      {
        heading: 'Vision Statement: Was treibt uns an?',
        body: 'Unser großes Ziel ist es, die Lebensgrundlage, Resilienz und das Wohlbefinden möglichst vieler Lebewesen und Menschen zu verbessern und zu erhalten, um ein harmonisches Zusammenleben langfristig zu fördern.',
      },
      {
        heading: 'Mission Statement: Wie wollen wir das erreichen?',
        body: 'Mit Leidenschaft für handwerkliche Qualität & modularen, innovativen und intelligenten Lösungen verwandeln wir urbane Räume in klimaresiliente, artenreiche Oasen, die Menschen zum Verweilen einladen und eine hohe Lebensqualität bieten. Wir verbinden dabei Data Science mit Handwerk und Ökologie um All-In-One Servicelösungen anbieten zu können.',
      },
      {
        heading: 'Vivid Vision (eine flexible Beschreibung der Zukunft, die wir uns vorstellen):',
        body: `Wir schreiben das Jahr 2036. Die Klimakrise beschleunigt sich schneller, als wissenschaftliche Prognosen es angenommen hatten. Eine Serie heißer Sommerwochen kocht Berlin – die Lufttemperatur liegt bei 39°C und kühlt auch nachts kaum ab. Der Asphalt hält die Hitze. Die Gebäude halten die Hitze. Die Stadt ist zu ihrem eigenen Backofen geworden. Die Menschen leiden, insbesondere ältere Menschen und Kinder, also jene Bevölkerungsgruppen, die nie einen Ausweg aus dem urbanen Hitzeinseleffekt hatten.

Aber es gibt jetzt kühle Orte in der Stadt. Tritt in einen davon hinein, und die Luft fällt um 4 bis 5°C, manchmal mehr. Das sind LUMAs urbane Mikrowälder – dichte, mehrschichtige, heimische Pflanzungen, in die die Stadt und Dutzende Eigentümerinnen vor Jahren investiert haben, als Biodiversität noch als Dekoration behandelt wurde. Heute sind sie Infrastruktur. Jeder dieser Wälder funktioniert als lebende Klimaanlage, als Lebensraum für hunderte Arten, als Rückzugsort für Anwohnerinnen und als architektonische Signatur der Resilienzstrategie Berlins. Menschen sitzen unter ihren Kronen auf Bänken, die in die Pflanzung integriert wurden. Kinder finden Käfer. Wildbienen nisten in Sandwänden. Diese Wälder sind nicht nur funktional – sie sind schön. Wir haben Schönheit zum Ziel gemacht, gleichberechtigt neben Biodiversität, denn Menschen schützen nur, was sie lieben, und eine Stadt verteidigt nur, was sie für lebenswert hält.

Wenn die schweren Stürme kommen – und sie kommen häufiger und heftiger, als die Klimamodelle es vorhergesagt hatten – wird keiner dieser Standorte überflutet. Der durch Mikrobiom-Inokulation aufgewertete Boden nimmt Wasser innerhalb von Minuten auf und speichert es wie ein Schwamm, anstatt es auf die Straßen abzugeben. In Kombination mit LUMAs ganzheitlichem Regenwassermanagement – Zwischenspeichern, biodiversen Dachbegrünungen, hybriden Versickerungsmulden – hat Berlins Stadtentwässerung aufgehört, ein Verfahren zu sein, und beginnt, sich wie eine Schwammstadt zu verhalten. Gebäude, die vor einem Jahrzehnt überflutet worden wären, bleiben heute trocken.

Das funktioniert, weil wir nie so getan haben, als wäre Biodiversität einfach. Wir haben die richtigen Dinge gemessen, nicht nur die einfachen – Bodenbiologie, funktionale Diversität, Ökosystemleistungen in Euro. Wir waren ehrlich, wenn Restaurierungen scheiterten, und haben angepasst, statt es zu verstecken. Wir haben das Handwerk lebendig gehalten: die Baumpflegerinnen beim Klettern, die Gärtnerinnen beim Pflanzen, die Bodenwissenschaftlerinnen knietief im Dreck. Daten sind nur so gut wie die Arbeit, die ihnen zugrunde liegt. Wir haben respektiert, was traditionelle Landpflegerinnen schon immer wussten, und ihr Wissen in moderne Wissenschaft integriert, statt es zu ersetzen. Das hat uns Legitimität verschafft. Greenwashing wurde schwerer. Echte Arbeit wurde belohnt.

Weil wir vor über einem Jahrzehnt begonnen haben, diese Arbeit zu dokumentieren und ausgereifte Datensysteme darum herum zu entwickeln, sind die Belege immer dichter geworden. Investitionen in grüne Vermögenswerte senken Kosten. Sie verbessern den langfristigen Wert von Immobilien. Sie haben messbare Effekte auf die lokale Lebensqualität und auf die Biodiversität. Investitionen in lebendige Infrastruktur sind so verlässlich und zugänglich geworden wie nie zuvor. Die BIOME-Plattform – wissenschaftlich fundiert, unabhängig verifiziert, auf offenen Standards aufgebaut – ist zum zentralen Hub für die gesamte urbane Biodiversitätsbranche geworden. Landschaftsarchitektinnen ziehen verifizierte Artperformance-Daten heraus, bevor sie eine einzige Pflanze spezifizieren. Kommunen vergeben Pflegeaufträge über die Plattform. Spezialisierte Dienstleisterinnen – Wildbienenexpertinnen, Bodenmikrobiologinnen, Totholz-Habitatbauerinnen, Gründachingenieurinnen – finden über sie zu den Projekten, die sie brauchen. Forschende an Universitäten greifen auf Jahre standardisierter Felddaten zurück. Versicherungen bepreisen urbane Ökologie in ihren Risikomodellen, weil die Daten endlich gut genug sind. Gestaffelter Zugang – kostenlos für Gemeinschaftsgärten und Citizen Scientists, abonnementbasiert für Profis. Wir haben den Hub gebaut. Die Daten gehören uns nicht.

Ein Biodiversitätsstandard, vergleichbar in seiner Strenge mit der Kohlenstoffbilanzierung, ist durch unser Framework entstanden – nicht weil wir ihn proklamiert haben, sondern weil die Daten offen waren, die Methoden transparent und die Ergebnisse über Kontinente hinweg reproduzierbar. Unternehmen weisen ihre ökologischen Verpflichtungen Behörden und Investor*innen mit dokumentierten Erfolgsbilanzen über Jahrzehnte nach.

LUMA hat 2030 mit der europäischen Expansion begonnen. Heute sind wir in Frankreich, Italien, Slowenien, Schweden, Spanien, Portugal und in den meisten anderen EU-Ländern aktiv. Seit sich die Politik radikal in Richtung erneuerbarer Energien und Naturschutz verschoben hat, ist die weltweite Nachfrage nach unseren Leistungen rapide gewachsen – und wir expandieren nun nach Asien, Afrika und in die Amerikas, getragen von einem LUMA-zertifizierten Netzwerk aus Praktikerinnen, die in unseren Methoden geschult sind. Die Arbeit erreicht Orte, die wir persönlich nie besuchen werden. Unser Team ist interdisziplinär by design – Ökologinnen neben Softwareentwicklerinnen neben Baumpflegerinnen neben Designer*innen – weil die Probleme, die wir lösen, an den Schnittstellen liegen.

Unsere Kund*innen bleiben bei uns, weil wir zuhören. Abonnements wachsen nicht durch Bindung, sondern durch echten Mehrwert. Community-Feedback bestimmt jedes Release. Wir schmieden echte Partnerschaften, weil wir für denselben Zweck kämpfen.

LUMA leistet einen Beitrag zur weltweiten Bewegung, das Leben auf diesem Planeten für kommende Generationen zu bewahren. Wir sind kein Garten- und Landschaftsbauunternehmen. Wir sind kein Softwareunternehmen. Wir sind die lebendige Infrastrukturebene der Städte der Zukunft – und beweisen Tag für Tag, dass Menschen und alle anderen Lebensformen denselben Boden teilen können: mit Vertrauen als Fundament, Daten als Sprache, Schönheit als Ziel und Handwerk als Seele.

Dahin gehen wir. Der Weg wird sich ändern. Das Ziel nicht.`,
      },
    ],
  },
}

const reviews = [
  {
    name: 'Johannes Klar',
    nameDE: 'Johannes Klar',
    role: 'Vorstand, JOPE AG',
    roleDE: 'Vorstand, JOPE AG',
    textEN: 'Thanks to LUMA, the Tiny Forest has become a fixed part of our outdoor design concepts. Wilderness and life are emerging in what are otherwise often clean-cut, dreary courtyards, leading residents to increasingly use these spaces for relaxation and leisure. Across our last 5 construction projects, we have planted over 5,000 plants — many times more than required — contributing to a healthy urban climate. Thank you to Lukas and Malte — more of this!',
    textDE: 'Dank LUMA ist der Tiny Forest ein fester Bestandteil unserer Außenanlagenkonzepte geworden. Es entsteht Wildnis und Leben in den ansonsten oftmals clean gestalteten, tristen Innenhöfen, was dazu führt, dass die Bewohner den Hof vermehrt als Erholungsort und Aufenthaltsraum nutzen. In den letzten 5 Bauprojekten haben wir so über 5.000 Pflanzen gesetzt, das ist ein Vielfaches von dem geforderten und trägt zum gesunden Stadtklima bei. Danke an Lukas und Malte - mehr davon!',
    avatar: johannesPhoto,
    side: 'left',
  },
  {
    name: 'Gissela Riccio',
    nameDE: 'Gissela Riccio',
    role: 'Biodiversity Manager, BEW Berliner Energie und Wärme AG',
    roleDE: 'Biodiversity Managerin, BEW Berliner Energie und Wärme AG',
    textEN: 'Together with the LUMA team, we have scientifically assessed the biodiversity potential of our decentralized BEW facilities and decided on and implemented a range of suitable measures. Their dedicated and professional commitment has given us a highly competent partner by our side. We look forward to continuing this partnership and realizing further projects together.',
    textDE: 'Wir haben zusammen mit dem Team von LUMA das Biodiversitätspotenzial unserer dezentralen Anlagen der BEW wissenschaftlich ausgewertet und verschiedenen passende Maßnahmen dafür entschieden und umgesetzt. Durch Ihren engagierten und professionellen Einsatz haben wir einen sehr kompetenten Partner an unserer Seite. Wir werden diese Partnerschaft weiter fortsetzen und weitere Projekten zusammen realisieren.',
    avatar: gisselaPhoto,
    side: 'right',
  },
]

const serviceThumbs = {
  en: [serviceThumb1, serviceThumb2, serviceThumb3, serviceThumb4, serviceThumb5, serviceThumb6, serviceThumb7, serviceThumb8, serviceThumb9],
  de: [serviceThumb1, serviceThumb2, serviceThumb3, serviceThumb4, serviceThumb5, serviceThumb6, serviceThumb7, serviceThumb8, serviceThumb9],
}

function VisionModal({ onClose, isDark, c, lang: initialLang }) {
  const { accent, fg, fgMuted, fgSubtle, borderColor } = c
  const [modalLang, setModalLang] = useState(initialLang)
  const content = visionMissionContent[modalLang]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }} />
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', background: isDark ? '#001219' : '#F3E0A8', border: `1px solid ${borderColor}`, borderRadius: 4, maxWidth: 780, width: '100%', maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 40px 120px rgba(0,0,0,0.6)', animation: 'modalIn 0.35s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.94) translateY(24px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
        <div style={{ padding: '40px 48px 32px', borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: isDark ? '#001219' : '#F3E0A8', zIndex: 10 }}>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>{modalLang === 'en' ? 'Purpose & Direction' : 'Zweck & Ausrichtung'}</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, letterSpacing: '-0.02em', color: fg, lineHeight: 1.1 }}>{content.title}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${borderColor}`, borderRadius: 3, overflow: 'hidden' }}>
              <button onClick={e => { e.stopPropagation(); setModalLang('en') }} style={{ padding: '5px 12px', fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.08em', background: modalLang === 'en' ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)') : 'transparent', color: modalLang === 'en' ? fg : fgSubtle, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>EN</button>
              <div style={{ width: 1, height: 16, background: borderColor }} />
              <button onClick={e => { e.stopPropagation(); setModalLang('de') }} style={{ padding: '5px 12px', fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.08em', background: modalLang === 'de' ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)') : 'transparent', color: modalLang === 'de' ? fg : fgSubtle, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>DE</button>
            </div>
            <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: fg, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}>
              <X size={16} />
            </button>
          </div>
        </div>
        <div style={{ padding: '40px 48px 56px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {content.sections.map((section, i) => (
            <div key={i}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 400, color: fg, marginBottom: 16, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{section.heading}</h3>
              <div style={{ height: 1, background: `${accent}30`, marginBottom: 20 }} />
              {section.body.split('\n\n').map((para, j) => (
                <p key={j} style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: fgMuted, lineHeight: 1.9, fontWeight: 300, marginBottom: j < section.body.split('\n\n').length - 1 ? 20 : 0 }}>{para}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AQIWidget({ isDark, accent, fg, fgMuted, fgSubtle, accentBorder }) {
  const [aqi, setAqi] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&current=european_aqi,pm10,pm2_5,nitrogen_dioxide')
      .then(r => r.json())
      .then(data => {
        setAqi({ aqi: data.current?.european_aqi ?? 42, pm25: data.current?.pm2_5?.toFixed(1) ?? '8.2', pm10: data.current?.pm10?.toFixed(1) ?? '12.4', no2: data.current?.nitrogen_dioxide?.toFixed(1) ?? '18.1' })
        setLoading(false)
      })
      .catch(() => { setAqi({ aqi: 42, pm25: '8.2', pm10: '12.4', no2: '18.1' }); setLoading(false) })
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
    <div style={{ padding: 24, border: `1px solid ${accentBorder}`, background: isDark ? 'rgba(0,18,25,0.85)' : 'rgba(243,224,168,0.9)', backdropFilter: 'blur(20px)', minWidth: 220 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Live — Air Quality</div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: info.color, boxShadow: `0 0 8px ${info.color}` }} />
      </div>
      <div style={{ fontSize: 48, letterSpacing: '-0.03em', color: info.color, lineHeight: 1, marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
        {loading ? '—' : aqi.aqi}<span style={{ fontSize: 16, color: fgMuted, marginLeft: 4, fontFamily: "'Space Mono', monospace" }}>AQI</span>
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: info.color, fontWeight: 500, marginBottom: 12 }}>{info.label}</div>
      {!loading && aqi && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Mono', monospace", fontSize: 10, color: fgSubtle }}><span>PM2.5</span><span>{aqi.pm25} µg/m³</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Mono', monospace", fontSize: 10, color: fgSubtle }}><span>PM10</span><span>{aqi.pm10} µg/m³</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Mono', monospace", fontSize: 10, color: fgSubtle }}><span>NO₂</span><span>{aqi.no2} µg/m³</span></div>
        </div>
      )}
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: fgSubtle, marginTop: 8 }}>Berlin, DE</div>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const [visible, setVisible] = useState({})
  const [visionOpen, setVisionOpen] = useState(false)
  const [activeReview, setActiveReview] = useState(0)
  const { lang } = useLang()
  const { theme } = useTheme()
  const t = translations[lang].home
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, accentHover, accentMuted, accentBorder, bg, fg, fgMuted, fgSubtle, borderColor, cardBg, cardBorder } = c

  const gridColor = isDark ? 'rgba(8,170,86,0.04)' : 'rgba(8,170,86,0.04)'
  const fadeLeft = isDark ? 'linear-gradient(to right, #001219, transparent)' : 'linear-gradient(to right, #F3E0A8, transparent)'
  const fadeRight = isDark ? 'linear-gradient(to left, #001219, transparent)' : 'linear-gradient(to left, #F3E0A8, transparent)'
  const statsBg = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'
  const thumbs = serviceThumbs[lang]

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true })) }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const review = reviews[activeReview]
  const reviewText = lang === 'en' ? review.textEN : review.textDE
  const reviewName = lang === 'en' ? review.name : review.nameDE
  const reviewRole = lang === 'en' ? review.role : review.roleDE

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: bg, color: fg, overflowX: 'hidden', transition: 'background 0.3s, color 0.3s', letterSpacing: '-0.01em' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .mono { font-family: 'Space Mono', monospace; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes scroll-cards { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes glow-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.9; } }
        @keyframes reviewFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .hero-title { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .hero-sub { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .hero-cta { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .hero-badge { animation: fadeIn 1s ease 0.1s both; }
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .services-track { display: flex; width: max-content; animation: scroll-cards 40s linear infinite; gap: 24px; }
        .services-track:hover { animation-play-state: paused; }
        .service-card { width: 320px; min-height: 260px; flex-shrink: 0; transition: border-color 0.3s, background 0.3s, transform 0.3s; cursor: pointer; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent-color); opacity: 0; transition: opacity 0.3s; z-index: 2; }
        .service-card:hover { transform: translateY(-6px); }
        .service-card:hover::before { opacity: 1; }
        .service-card .card-img { width: 100%; height: 160px; object-fit: cover; display: block; transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .service-card:hover .card-img { transform: scale(1.05); }
        .card-img-wrap { overflow: hidden; height: 160px; }
        .card-body { padding: 28px 36px 36px; }
        .orb { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; animation: glow-pulse 4s ease-in-out infinite; }
        .framework-pill { padding: 8px 20px; font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: 0.05em; transition: all 0.2s; cursor: default; }
        .section-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
        .footer-link { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; background: none; border: none; cursor: pointer; text-decoration: none; transition: opacity 0.2s; }
        .footer-link:hover { opacity: 0.7; }
        .footer-legal { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.2rem, 2vw, 1.8rem); font-weight: 400; text-decoration: underline; cursor: pointer; background: none; border: none; transition: opacity 0.2s; padding: 0; text-align: left; }
        .footer-legal:hover { opacity: 0.7; }
        .learn-more-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; background: transparent; border: 1px solid rgba(255,255,255,0.35); color: #ffffff; font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, border-color 0.2s; margin-top: 32px; }
        .learn-more-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.6); }
        .review-nav-btn { width: 44px; height: 44px; border-radius: 50%; border: 1px solid ${borderColor}; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; color: ${fgMuted}; }
        .review-nav-btn:hover { border-color: ${accent}; color: ${accent}; background: ${accent}10; }
        .review-dot { width: 8px; height: 8px; border-radius: 50%; cursor: pointer; transition: all 0.3s; border: none; padding: 0; }
        .review-content { animation: reviewFade 0.4s ease both; }
      `}</style>

      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 80px 80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
            <source src={smoothDrone} type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,18,25,0.72) 0%, rgba(0,18,25,0.5) 40%, rgba(0,18,25,0.82) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, zIndex: 2, background: `linear-gradient(to bottom, transparent, ${bg})`, pointerEvents: 'none' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none', opacity: 0.4 }} />
        <div className="orb" style={{ width: 600, height: 600, background: isDark ? 'rgba(8,170,86,0.1)' : 'rgba(8,170,86,0.07)', top: -100, right: -100, zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
          <div className="hero-badge" style={{ marginBottom: 32 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: accentMuted, border: `1px solid ${accentBorder}`, color: accent, fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block', animation: 'pulse-ring 2s ease-out infinite' }} />
              {t.badge}
            </span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.02, letterSpacing: '-0.03em', marginBottom: 32, fontWeight: 400, color: '#ffffff' }}>
            {t.heroTitle1}<br /><em style={{ color: accent }}>{t.heroTitle2}</em>
          </h1>
          <p className="hero-sub mono" style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', maxWidth: 560, marginBottom: 48, fontWeight: 300 }}>
            {heroSub[lang]}
          </p>
          <div className="hero-cta" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/projects')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: accent, color: '#ffffff', fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = accentHover} onMouseLeave={e => e.currentTarget.style.background = accent}>{t.enterPlatform}</button>
            <button onClick={() => navigate('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'transparent', color: '#ffffff', fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer' }}>{t.viewReports}</button>
          </div>
        </div>
        <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)', animation: 'float 6s ease-in-out infinite', opacity: 0.9, zIndex: 2 }}>
          <AQIWidget isDark={isDark} accent={accent} fg={fg} fgMuted={fgMuted} fgSubtle={fgSubtle} accentBorder={accentBorder} />
        </div>
      </section>

      {/* Trust stats bar */}
      <section style={{ padding: '48px 80px', borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, background: statsBg }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {t.stats.map((stat, i) => (
            <div key={i} style={{ padding: '24px 32px', borderRight: i < 3 ? `1px solid ${borderColor}` : 'none', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: accent, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>{stat.value}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: fgMuted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Services */}
      <section style={{ padding: '100px 0', borderBottom: `1px solid ${borderColor}`, overflow: 'hidden', background: statsBg }}>
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
              <div key={i} className="service-card" style={{ border: `1px solid ${cardBorder}`, background: cardBg, '--accent-color': accent }}>
                <div className="card-img-wrap">
                  <img src={thumbs[i % thumbs.length]} alt={service.title} className="card-img" />
                </div>
                <div className="card-body">
                  <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.15em', marginBottom: 16 }}>{service.number}</div>
                  <div style={{ width: 32, height: 1, background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', marginBottom: 16 }} />
                  <h3 style={{ fontSize: 20, fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 12, color: fg }}>{service.title}</h3>
                  <span className="mono" style={{ fontSize: 11, color: isDark ? 'rgba(16,185,129,0.5)' : 'rgba(10,118,82,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.learnMore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ position: 'relative', borderBottom: `1px solid ${borderColor}`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${goalBG2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'local' }} />
        <div style={{ position: 'absolute', inset: 0, background: isDark ? 'rgba(0,18,25,0.55)' : 'rgba(0,18,25,0.45)', backdropFilter: 'blur(1px)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '120px 80px' }}>
          <div data-id="vision" className={`reveal${visible.vision ? ' visible' : ''}`}>
            <div className="section-label" style={{ color: accent }}>{lang === 'en' ? 'Purpose & Direction' : 'Zweck & Ausrichtung'}</div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#ffffff', marginBottom: 80, maxWidth: 700 }}>
              {lang === 'en' ? 'What is Our Goal?' : 'Was ist unser Ziel?'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                  <div style={{ width: 40, height: 1, background: accent }} />
                  <span className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{lang === 'en' ? 'Our Vision' : 'Unsere Vision'}</span>
                </div>
                <h3 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#ffffff', marginBottom: 24 }}>
                  {lang === 'en' ? 'For every living being.' : 'Für jedes Lebewesen.'}
                </h3>
                <p className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, fontWeight: 300 }}>
                  {lang === 'en' ? 'Our great goal is to improve and maintain the livelihoods and well-being of as many living beings as possible in order to promote harmonious coexistence and climate resilience in urban spaces. From bees to humans.' : 'Unser großes Ziel ist es, die Lebensgrundlagen und das Wohlbefinden möglichst vieler Lebewesen zu verbessern und zu erhalten, um ein harmonisches Miteinander und Klimaresilienz in urbanen Räumen zu fördern. Von Bienen bis Menschen.'}
                </p>
                <button className="learn-more-btn" onClick={() => setVisionOpen(true)}>
                  {lang === 'en' ? 'Learn More →' : 'Mehr erfahren →'}
                </button>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                  <div style={{ width: 40, height: 1, background: accent }} />
                  <span className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{lang === 'en' ? 'Our Mission' : 'Unsere Mission'}</span>
                </div>
                <h3 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#ffffff', marginBottom: 24 }}>
                  {lang === 'en' ? 'Craftsmanship meets ecology.' : 'Handwerk trifft Ökologie.'}
                </h3>
                <p className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, fontWeight: 300 }}>
                  {lang === 'en' ? 'We are passionate about quality craftsmanship, modular, and intelligent solutions. We transform urban spaces into climate-resilient, species-rich oases that invite you to linger.' : 'Wir sind leidenschaftlich begeistert von Qualitätshandwerk, modularen und intelligenten Lösungen. Wir verwandeln urbane Räume in klimaresiliente, artenreiche Oasen, die zum Verweilen einladen.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Feedback */}
      <section style={{ padding: '100px 80px', borderBottom: `1px solid ${borderColor}`, background: statsBg }}>
        <div style={{ marginBottom: 64, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="section-label" style={{ color: accent }}>{lang === 'en' ? 'Client Feedback' : 'Kundenstimmen'}</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: fg }}>
              {lang === 'en' ? 'Trusted by those\nwho care for cities.' : 'Vertrauen derer,\ndie Städte gestalten.'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="review-nav-btn" onClick={() => setActiveReview(i => (i - 1 + reviews.length) % reviews.length)}>
              <ChevronLeft size={18} />
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              {reviews.map((_, i) => (
                <button key={i} className="review-dot" style={{ background: i === activeReview ? accent : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)') }} onClick={() => setActiveReview(i)} />
              ))}
            </div>
            <button className="review-nav-btn" onClick={() => setActiveReview(i => (i + 1) % reviews.length)}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          key={activeReview}
          className="review-content"
          style={{ display: 'grid', gridTemplateColumns: review.side === 'left' ? '340px 1fr' : '1fr 340px', border: `1px solid ${cardBorder}`, background: cardBg, overflow: 'hidden', minHeight: 400 }}
        >
          {review.side === 'left' && (
            <div style={{ position: 'relative', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 3, height: '100%', background: `linear-gradient(to bottom, ${accent}, ${accent}00)` }} />
              <img src={review.avatar} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
            </div>
          )}

          <div style={{ padding: '64px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 120, lineHeight: 0.8, color: accent, opacity: isDark ? 0.08 : 0.06, position: 'absolute', top: 32, left: review.side === 'left' ? 56 : 'auto', right: review.side === 'right' ? 56 : 'auto', userSelect: 'none' }}>"</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: fg, lineHeight: 1.7, fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 40, fontStyle: 'italic' }}>
                "{reviewText}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 40, height: 1, background: accent }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 400, color: fg, letterSpacing: '-0.01em', marginBottom: 4 }}>{reviewName}</div>
                  <div className="mono" style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.05em' }}>{reviewRole}</div>
                </div>
              </div>
            </div>
          </div>

          {review.side === 'right' && (
            <div style={{ position: 'relative', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: `linear-gradient(to bottom, ${accent}, ${accent}00)` }} />
              <img src={review.avatar} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
            </div>
          )}
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
          <button onClick={() => navigate('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 48px', background: accent, color: '#ffffff', fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = accentHover} onMouseLeave={e => e.currentTarget.style.background = accent}>{t.launchPlatform}</button>
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
            <a href="mailto:info@luma.earth" style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: fgMuted, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = fgMuted}>{t.footerEmail}</a>
          </div>
        </div>
        <div style={{ padding: '40px 80px', borderTop: `1px solid ${borderColor}` }}>
          <button onClick={() => navigate('/privacy')} className="footer-legal" style={{ color: fg }}>{t.footerLegal}</button>
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

      {visionOpen && <VisionModal onClose={() => setVisionOpen(false)} isDark={isDark} c={c} lang={lang} />}
    </div>
  )
}