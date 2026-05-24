import malte from '../../assets/Malte.jpg'
import evan from '../../assets/Evan.jpeg'
import inessa from '../../assets/Inessa.jpeg'
import stuvat from '../../assets/Stuvat.jpg'
import zoey from '../../assets/Zoey.jpeg'
import { useLang } from '../context/LangContext'
import { useTheme, themeColors } from '../context/ThemeContext'

export default function AboutPage() {
  const { lang } = useLang()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, bg, fg, fgMuted, fgSubtle, borderColor, cardBg, cardBorder } = c

  const companyBlocks = {
    en: [
      {
        number: '01',
        heading: 'Founded on a bet.',
        body: 'Malte and Lukas founded LUMA in 2023, after years of working together at MIYA e.V. and on independent projects. They started LUMA on a simple bet: that the best way to solve the biodiversity and climate crisis in cities is to combine ecological craftsmanship, soil science, and software in one company — and to do it without outside investors pulling the company in directions that could compromise the work in early stages.',
      },
      {
        number: '02',
        heading: 'Bootstrapped by design.',
        body: 'LUMA is bootstrapped and self-funded by design. Every euro reinvested comes from work we have actually done. This gives us full freedom over what we build, who we work with, and how long we are willing to wait for results that matter. We are truly dedicated to have a meaningful impact.',
      },
      {
        number: '03',
        heading: 'Small, senior, direct.',
        body: 'The team is small, senior, and direct. We work on a foundation of mutual trust built over years of shared projects, but we run on critical feedback, not consensus — every decision is open to challenge, and the best argument wins. We are deliberate about what we say yes to, because every yes is also a no to something else.',
      },
      {
        number: '04',
        heading: 'What drives us.',
        body: 'What drives us is simple. The challenges in front of us are existential. We believe entrepreneurship — done with discipline, transparency, and the right kind of partners — is one of the most powerful tools available to change the trajectory. And we genuinely enjoy the work. That part matters too.',
      },
    ],
    de: [
      {
        number: '01',
        heading: 'Gegründet auf einer Überzeugung.',
        body: 'Malte und Lukas gründeten LUMA im Jahr 2023, nachdem sie jahrelang gemeinsam bei MIYA e.V. und an unabhängigen Projekten gearbeitet hatten. Sie starteten LUMA mit einer einfachen Überzeugung: Der beste Weg, die Biodiversitäts- und Klimakrise in Städten zu bewältigen, besteht darin, ökologisches Handwerk, Bodenkunde und Software in einem Unternehmen zu vereinen – und dies ohne externe Investoren, die das Unternehmen in Richtungen lenken könnten, die die Qualität der Arbeit gefährden würden.',
      },
      {
        number: '02',
        heading: 'Eigenfinanziert by design.',
        body: 'LUMA ist von Anfang an eigenfinanziert. Jeder reinvestierte Euro stammt aus Arbeit, die wir tatsächlich geleistet haben. Das gibt uns volle Freiheit darüber, was wir entwickeln, mit wem wir zusammenarbeiten und wie lange wir bereit sind, auf Ergebnisse zu warten, die wirklich zählen.',
      },
      {
        number: '03',
        heading: 'Klein, erfahren, direkt.',
        body: 'Das Team ist klein, erfahren und direkt. Wir arbeiten auf der Grundlage gegenseitigen Vertrauens, das über Jahre gemeinsamer Projekte gewachsen ist, aber wir leben von kritischem Feedback, nicht von Konsens. Jede Entscheidung kann hinterfragt werden, und das beste Argument gewinnt. Wir überlegen genau, wozu wir Ja sagen, denn jedes Ja ist auch ein Nein zu etwas anderem.',
      },
      {
        number: '04',
        heading: 'Was uns antreibt.',
        body: 'Was uns antreibt, ist einfach. Die Herausforderungen, vor denen wir stehen, sind existenziell. Wir sind fest entschlossen, einen bedeutenden Beitrag zur urbanen Biodiversität und Klimaresilienz zu leisten. Wir glauben, dass Unternehmertum – mit Disziplin, Transparenz und den richtigen Partnern – eines der mächtigsten Werkzeuge ist, um die Richtung zu ändern. Und wir haben echte Freude an der Arbeit. Auch das ist wichtig.',
      },
    ],
  }

  const lumaTeam = [
    {
      name: 'Malte Larsen',
      nameLabel: 'Co-Founder',
      degree: 'M.Sc. International Forest Ecosystem Management, HNEE Eberswalde',
      quote: {
        en: '"Malte still cultivates mushrooms in his apartment and built his own laminar flow hood."',
        de: '„Malte züchtet immer noch Pilze in seiner Wohnung und hat sich seine Laminar-Flow-Box selbst gebaut."',
      },
      bio: {
        en: 'Malte connects ecological expertise with product development and storytelling. He leads LUMA\'s research into fungal composting and soil microbiome inoculants, develops new products from concept to prototype, and builds the partnerships that turn projects into long-term collaborations. After years working with MIYA e.V. on European reforestation projects, he co-founded LUMA in 2023 to bring the same rigor to urban environments. His role spans research, business development, and the public face of the company.',
        de: 'Malte verbindet ökologische Expertise mit Produktentwicklung und Storytelling. Er leitet LUMAs Forschung zu pilzbasierter Kompostierung und Bodenmikrobiom-Inokulanten, entwickelt neue Produkte vom Konzept bis zum Prototyp und baut die Partnerschaften auf, aus denen langfristige Zusammenarbeiten werden. Nach Jahren bei MIYA e.V. mit Schwerpunkt auf europäischen Aufforstungsprojekten gründete er 2023 LUMA mit, um die gleiche fachliche Tiefe in urbane Räume zu bringen. Seine Rolle umfasst Forschung, Geschäftsentwicklung und die Außendarstellung des Unternehmens.',
      },
      skills: {
        en: ['Fungal composting & soil microbiome research', 'Product development', 'Drone-based remote sensing & NDVI analysis', 'Partnerships & business development', 'Project management'],
        de: ['Pilzbasierte Kompostierung & Bodenmikrobiom-Forschung', 'Produktentwicklung', 'Drohnen-Fernerkundung & NDVI-Analyse', 'Partnerschaften & Business Development', 'Projektmanagement'],
      },
      photo: malte,
    },
    {
      name: 'Lukas Steingässer',
      nameLabel: 'Co-Founder',
      degree: 'M.Sc. International Forest Ecosystem Management, HNEE Eberswalde',
      quote: {
        en: '"Lukas prefers his tent over a hotel. Always looking for the next adventure and story to tell."',
        de: '„Lukas bevorzugt sein Zelt gegenüber jedem Hotel. Immer auf der Suche nach dem nächsten Abenteuer und der nächsten Geschichte."',
      },
      bio: {
        en: 'Lukas brings structure to complexity. Where Malte builds the vision, Lukas builds the systems that make it work — operational processes, project frameworks, and the long-term relationships with municipalities and institutional clients that make scaling possible. He thrives on hard problems and takes lead on LUMA\'s most demanding multi-stakeholder projects. His balance of technical depth and people skills is what holds the most complicated assignments together.',
        de: 'Lukas bringt Struktur in Komplexität. Wo Malte die Vision entwickelt, baut Lukas die Systeme, die sie tragen – operative Prozesse, Projektrahmen und die langfristigen Beziehungen zu Kommunen und institutionellen Auftraggebern, die Skalierung erst möglich machen. Er blüht an schwierigen Problemen auf und übernimmt die Führung bei LUMAs anspruchsvollsten Multi-Stakeholder-Projekten. Seine Balance aus technischer Tiefe und Menschenkenntnis hält die kompliziertesten Aufträge zusammen.',
      },
      skills: {
        en: ['Operations & process design', 'Complex project leadership', 'Institutional & municipal partnerships', 'Product development', 'Stakeholder management'],
        de: ['Operations & Prozessdesign', 'Leitung komplexer Projekte', 'Institutionelle & kommunale Partnerschaften', 'Produktentwicklung', 'Stakeholder-Management'],
      },
      photo: null,
    },
    {
      name: 'Robert Boden',
      nameLabel: lang === 'en' ? 'Project Manager & Engineer' : 'Projektleiter & Ingenieur',
      degree: lang === 'en' ? 'Environmental Engineer' : 'Umweltingenieur',
      quote: {
        en: '"Nickname: The Maschine. There nobody like Robert when it comes to power output versus food input."',
        de: '„Spitzname: Die Maschine. Niemand schlägt Robert, wenn es um Leistungsabgabe pro Kalorie Input geht."',
      },
      bio: {
        en: 'Robert leads LUMA\'s most technically demanding installations — rainwater management systems, sponge city infrastructure, sensor-based monitoring, and large-scale planting projects with multiple trades and stakeholders. His engineering background means LUMA can take on projects where ecological design has to integrate with structural, hydraulic, and digital infrastructure. He keeps complex sites moving under pressure and delivers what was specified, on time.',
        de: 'Robert leitet LUMAs technisch anspruchsvollste Installationen – Regenwassermanagement-Systeme, Schwammstadt-Infrastruktur, sensorbasiertes Monitoring und großflächige Pflanzprojekte mit mehreren Gewerken und Beteiligten. Sein Ingenieursprofil ermöglicht es LUMA, Projekte zu übernehmen, bei denen ökologische Planung mit baulicher, hydraulischer und digitaler Infrastruktur verschränkt werden muss. Er hält komplexe Baustellen unter Druck am Laufen und liefert das, was spezifiziert wurde, termingerecht.',
      },
      skills: {
        en: ['Rainwater management & sponge city infrastructure', 'Technical monitoring & sensor systems', 'Large-scale installation project management', 'Multi-stakeholder coordination'],
        de: ['Regenwassermanagement & Schwammstadt-Infrastruktur', 'Technisches Monitoring & Sensorsysteme', 'Projektleitung großflächiger Installationen', 'Multi-Stakeholder-Koordination'],
      },
      photo: null,
    },
    {
      name: 'Johanna Juncker',
      nameLabel: lang === 'en' ? 'Head of Ecological Maintenance' : 'Leitung Ökologische Pflege',
      degree: '',
      quote: {
        en: '"Johanna can identify 400+ species of central European wildflowers."',
        de: '„Johanna erkennt über 400 Arten mitteleuropäischer Wildblumen."',
      },
      bio: {
        en: 'Johanna runs the long phase that decides whether a project actually succeeds: the years after planting. She leads LUMA\'s ecological maintenance program, developing each site through its first three years until the planting establishes the species composition and ecological function it was designed for. Her plant identification expertise spans native and ornamental species, and she manages the careful interventions — selective weeding, supportive cuts, gap planting, microbiome refreshing — that distinguish ecological gardening from conventional landscape maintenance.',
        de: 'Johanna verantwortet die Phase, die über den langfristigen Erfolg eines Projekts entscheidet: die Jahre nach der Pflanzung. Sie leitet LUMAs ökologisches Pflegeprogramm und entwickelt jeden Standort durch die ersten drei Jahre, bis sich die geplante Artenzusammensetzung und ökologische Funktion etabliert hat. Ihre Artenkenntnis umfasst heimische und ornamentale Pflanzenarten, und sie steuert die feinen Eingriffe – selektives Jäten, unterstützender Schnitt, Nachpflanzung, Mikrobiom-Auffrischung – die ökologische Pflege von konventioneller Grünflächenpflege unterscheiden.',
      },
      skills: {
        en: ['Ecological maintenance & long-term project care', 'Native plant identification & species management', 'Establishment-phase intervention', 'Biodiversity-focused gardening'],
        de: ['Ökologische Pflege & langfristige Projektbetreuung', 'Bestimmung & Steuerung heimischer Arten', 'Etablierungsphase-Begleitung', 'Biodiversitätsorientierte Gartenarbeit'],
      },
      photo: null,
    },
    {
      name: 'Anselm',
      nameLabel: lang === 'en' ? 'Ecological Maintenance & Site Operations' : 'Ökologische Pflege & Standortbetrieb',
      degree: '',
      quote: {
        en: '"A true legend, a living multitool. Anselm keeps all motors running."',
        de: '„Eine echte Legende, ein lebendiges Multitool. Anselm hält jeden Motor am Laufen."',
      },
      bio: {
        en: 'Anselm is the person who makes sure everything on site actually runs. His combination of practical gardening, machine operation, and hands-on repair skills means LUMA projects don\'t lose days waiting for an external mechanic or a missing trade. He works alongside Johanna on ecological maintenance and brings deep species knowledge to the field, while also handling all equipment management — from chainsaws and chippers to irrigation systems and small construction tasks on site.',
        de: 'Anselm ist die Person, die dafür sorgt, dass auf der Baustelle alles wirklich funktioniert. Seine Kombination aus praktischer Gartenarbeit, Maschinenbedienung und handwerklicher Reparaturkompetenz bedeutet, dass LUMA-Projekte keine Tage verlieren, wenn der externe Mechaniker fehlt oder ein Gewerk ausfällt. Er arbeitet mit Johanna in der ökologischen Pflege zusammen, bringt fundierte Artenkenntnis ins Feld und übernimmt das gesamte Geräte- und Maschinenmanagement – von Motorsägen und Häckslern bis zu Bewässerungssystemen und kleineren Bauarbeiten vor Ort.',
      },
      skills: {
        en: ['Ecological maintenance', 'Equipment operation & repair', 'Hands-on site work & small-scale construction', 'Native species knowledge'],
        de: ['Ökologische Pflege', 'Maschinenbedienung & -reparatur', 'Handwerkliche Standortarbeit & kleine Baumaßnahmen', 'Kenntnis heimischer Arten'],
      },
      photo: null,
    },
  ]

  const platformStudents = [
    { name: 'Stuvat', role: lang === 'en' ? 'Platform Developer' : 'Plattformentwickler', photo: stuvat },
    { name: 'Inessa', role: lang === 'en' ? 'Platform Developer' : 'Plattformentwicklerin', photo: inessa },
    { name: 'Zoey', role: lang === 'en' ? 'Platform Developer' : 'Plattformentwicklerin', photo: zoey },
    { name: 'Evan', role: lang === 'en' ? 'Platform Developer' : 'Plattformentwickler', photo: evan },
    { name: 'Malte Larsen', role: lang === 'en' ? 'Project Sponsor' : 'Projektbetreuer', photo: malte },
  ]

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        .mono { font-family: 'Space Mono', monospace; }
        .team-card { transition: transform 0.3s; }
        .team-card:hover { transform: translateY(-4px); }
        .block-card:hover .block-number { color: ${accent} !important; }
        .block-card { transition: border-color 0.25s; }
        .block-card:hover { border-color: ${accent}40 !important; }
        .skill-pill { transition: background 0.2s, color 0.2s; }
        .skill-pill:hover { background: ${accent}20 !important; color: ${accent} !important; }
      `}</style>

      {/* ── HERO HEADER ── */}
      <div className="page-hero" style={{ position: 'relative', borderBottom: `1px solid ${borderColor}`, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', right: -20, transform: 'translateY(-50%)',
          fontSize: 'clamp(120px, 18vw, 220px)', fontWeight: 400, lineHeight: 1,
          color: isDark ? 'rgba(16,185,129,0.04)' : 'rgba(10,118,82,0.05)',
          letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          LUMA
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
            {lang === 'en' ? 'The Company' : 'Das Unternehmen'}
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.0 }}>
            {lang === 'en' ? 'Meet LUMA.' : 'Lernen Sie LUMA kennen.'}
          </h1>
        </div>
      </div>

      {/* ── COMPANY STORY — 4 numbered blocks ── */}
      <div className="page-section" style={{ paddingBottom: 0 }}>
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          {companyBlocks[lang].map((block, i) => (
            <div
              key={i}
              className="block-card"
              style={{
                padding: '44px 48px',
                border: `1px solid ${cardBorder}`,
                background: cardBg,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                className="block-number"
                style={{
                  position: 'absolute', top: 20, right: 28,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 72, fontWeight: 400, lineHeight: 1,
                  color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  letterSpacing: '-0.05em', transition: 'color 0.3s',
                  userSelect: 'none',
                }}
              >
                {block.number}
              </div>
              <div className="mono" style={{ fontSize: 10, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>
                {block.number}
              </div>
              <h3 style={{
                fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)', fontWeight: 400,
                letterSpacing: '-0.02em', color: fg, lineHeight: 1.15, marginBottom: 20,
              }}>
                {block.heading}
              </h3>
              <div style={{ width: 32, height: 1, background: `${accent}50`, marginBottom: 20 }} />
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: fgMuted, lineHeight: 1.9, fontWeight: 300 }}>
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── LUMA TEAM MEMBERS ── */}
      <div className="page-section" style={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 56 }}>
          <div style={{ width: 40, height: 1, background: accent }} />
          <div className="mono" style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {lang === 'en' ? 'Team Members' : 'Teammitglieder'}
          </div>
          <div style={{ flex: 1, height: 1, background: borderColor }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {lumaTeam.map((member, i) => (
            <div
              key={i}
              className="team-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '260px 1fr',
                border: `1px solid ${cardBorder}`,
                background: cardBg,
                overflow: 'hidden',
              }}
            >
              {/* Photo */}
              <div style={{ position: 'relative', minHeight: 340, background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                {member.photo ? (
                  <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 340 }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', minHeight: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', border: `1px dashed ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 20, color: fgSubtle, opacity: 0.4 }}>+</span>
                    </div>
                    <span className="mono" style={{ fontSize: 10, color: fgSubtle, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {lang === 'en' ? 'Photo coming soon' : 'Foto folgt'}
                    </span>
                  </div>
                )}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: `linear-gradient(to bottom, ${accent}, ${accent}00)` }} />
              </div>

              {/* Info */}
              <div style={{ padding: '36px 44px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 24 }}>
                  <div className="mono" style={{ fontSize: 10, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
                    {member.nameLabel}
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', fontWeight: 400, letterSpacing: '-0.02em', color: fg, lineHeight: 1.1, marginBottom: 6 }}>
                    {member.name}
                  </h2>
                  {member.degree && (
                    <div className="mono" style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.03em' }}>{member.degree}</div>
                  )}
                </div>

                {/* Quote */}
                <div style={{
                  background: isDark ? `${accent}08` : `${accent}06`,
                  borderLeft: `3px solid ${accent}`,
                  padding: '14px 18px',
                  marginBottom: 22,
                }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: fg, lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                    {member.quote[lang]}
                  </p>
                </div>

                {/* Bio */}
                <p className="mono" style={{ fontSize: 12, color: fgMuted, lineHeight: 1.9, fontWeight: 300, marginBottom: 24 }}>
                  {member.bio[lang]}
                </p>

                {/* Skills as pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                  {member.skills[lang].map((skill, j) => (
                    <span
                      key={j}
                      className="skill-pill mono"
                      style={{
                        fontSize: 10, letterSpacing: '0.05em',
                        padding: '5px 10px',
                        border: `1px solid ${borderColor}`,
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                        color: fgSubtle,
                        borderRadius: 2,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PLATFORM TEAM ── */}
      <div className="page-section-lg">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 56 }}>
          <div style={{ width: 40, height: 1, background: accent }} />
          <div className="mono" style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {lang === 'en' ? 'About Us' : 'Über uns'}
          </div>
          <div style={{ flex: 1, height: 1, background: borderColor }} />
        </div>

        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 16 }}>
          {lang === 'en'
            ? <><span>Meet the team behind</span><br /><em style={{ color: accent }}>LUMA Biome Platform.</em></>
            : <><span>Das Team hinter der</span><br /><em style={{ color: accent }}>LUMA Biome Platform.</em></>}
        </h2>
        <p className="mono" style={{ fontSize: 13, color: fgMuted, maxWidth: 520, lineHeight: 1.8, marginBottom: 56, fontWeight: 300 }}>
          {lang === 'en'
            ? 'Built by students passionate about sustainability and technology, supported by LUMA Earth — pioneering nature-positive business intelligence.'
            : 'Entwickelt von Studierenden mit Leidenschaft für Nachhaltigkeit und Technologie, unterstützt von LUMA Earth.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3 }}>
          {platformStudents.map((member, i) => (
            <div
              key={i}
              className="team-card"
              style={{
                border: `1px solid ${i === 4 ? accent + '35' : cardBorder}`,
                background: i === 4 ? (isDark ? `${accent}07` : `${accent}04`) : cardBg,
                overflow: 'hidden',
              }}
            >
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)', position: 'relative' }}>
                {member.photo ? (
                  <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', border: `1px dashed ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 16, color: fgSubtle, opacity: 0.3 }}>+</span>
                    </div>
                    <span className="mono" style={{ fontSize: 9, color: fgSubtle, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {lang === 'en' ? 'Photo' : 'Foto'}
                    </span>
                  </div>
                )}
                {i === 4 && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }} />
                )}
              </div>
              <div style={{ padding: '16px 18px 20px' }}>
                <div style={{ fontSize: 14, marginBottom: 5, letterSpacing: '-0.01em', color: fg }}>{member.name}</div>
                <div className="mono" style={{ fontSize: 10, color: i === 4 ? accent : fgMuted, letterSpacing: '0.05em', opacity: i === 4 ? 0.85 : 1 }}>
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}