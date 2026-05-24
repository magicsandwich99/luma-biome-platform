import { useState } from 'react'
import { useTheme, themeColors } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import treeService1 from '../../assets/Service1/Tree service 1.PNG'
import treeService2 from '../../assets/Service1/Tree service 2.jpg'
import treeService3 from '../../assets/Service1/Tree service 3.jpg'
import treeService4 from '../../assets/Service1/Tree service 4.jpg'
import treeService5 from '../../assets/Service1/Tree service 5.jpg'

import consulting1 from '../../assets/Service2/Consulting1.jpeg'
import consulting2 from '../../assets/Service2/Consulting2.jpeg'
import consulting3 from '../../assets/Service2/Consulting3.jpg'
import consulting4 from '../../assets/Service2/Consulting4.jpg'
import consulting5 from '../../assets/Service2/Consulting5.jpg'
import consulting6 from '../../assets/Service2/Consulting6.jpg'
import consulting7 from '../../assets/Service2/Consulting7.jpg'

import drone1 from '../../assets/Service3/Drone1.jpg'
import drone2 from '../../assets/Service3/Drone2.jpg'

import climate1 from '../../assets/Service5/Climate1.jpg'
import climate2 from '../../assets/Service5/Climate2.jpg'
import climate3 from '../../assets/Service5/Climate3.jpg'
import climate4 from '../../assets/Service5/Climate4.png'
import climate5 from '../../assets/Service5/Climate5.jpg'
import climate6 from '../../assets/Service5/Climate6.JPG'
import climate7 from '../../assets/Service5/Climate7.JPG'
import climate8 from '../../assets/Service5/Climate8.JPG'
import climate9 from '../../assets/Service5/Climate9.JPG'

import biome1 from '../../assets/Service8/Biome1.JPG'
import biome2 from '../../assets/Service8/Biome2.JPG'
import biome3 from '../../assets/Service8/Biome3.JPG'

import stewardship1 from '../../assets/Service9/Stewardship1.JPG'
import stewardship2 from '../../assets/Service9/Stewardship2.JPG'
import stewardship3 from '../../assets/Service9/Stewardship3.JPG'
import stewardship4 from '../../assets/Service9/Stewardship4.JPG'
import stewardship5 from '../../assets/Service9/Stewardship5.JPG'
import stewardship6 from '../../assets/Service9/Stewardship6.JPG'
import stewardship7 from '../../assets/Service9/Stewardship7.JPG'
import stewardship8 from '../../assets/Service9/Stewardship8.JPG'

import serviceBG2 from '../../assets/ServiceBG1.jpg'

const serviceDetails = {
  en: [
    {
      number: '01',
      title: 'Tree Care & Tree Assessment',
      summary: 'Professional pruning, assessment and care of urban trees in line with German industry standards.',
      images: [treeService1, treeService2, treeService3, treeService4, treeService5],
      points: [
        {
          title: 'Pruning & Crown Work',
          bullets: [
            'Professional pruning and deadwood removal in line with ZTV-Baumpflege and FLL guidelines',
            'Crown maintenance, crown reduction, crown bracing (static & dynamic systems)',
            'Rope access techniques (SRT/DRT) for demanding operations without MEWP access',
            'Formative pruning and crown development for young trees',
          ],
        },
        {
          title: 'Tree Safety & Diagnostics',
          bullets: [
            'Tree safety assessments for public liability (detailed FLL inspection)',
            'Damage diagnostics: fungal infections, bark damage, root damage, cracks',
            'Stability and fracture risk assessment (pull testing, resistograph, sonic tomography)',
            'Emergency and storm damage response',
          ],
        },
        {
          title: 'Felling & Documentation',
          bullets: [
            'Felling including stump removal in urban environments (sectional felling via rope access)',
            'Digital tree cadastre with photo documentation and GPS coordinates',
          ],
        },
      ],
    },
    {
      number: '02',
      title: 'Consulting & Conceptual Design',
      summary: 'Planning and development of urban greening concepts tailored to site conditions, biodiversity goals and climate resilience.',
      images: [consulting1, consulting2, consulting3, consulting4, consulting5, consulting6, consulting7],
      points: [
        {
          title: 'Site Assessment & Concept Development',
          bullets: [
            'On-site assessment and site inventory (soil, existing vegetation, microclimate, sealing level)',
            'Development of tailored greening and planting concepts',
            'Selection criteria: biodiversity, aesthetics, amenity value, climate resilience, safety',
            'Climate-resilient future-proof tree species (urban climate species lists)',
          ],
        },
        {
          title: 'Planting & Ecological Upgrading',
          bullets: [
            'Planting plans including understory, perennial and wildflower schemes',
            'Ecological upgrading of existing areas (management conversion, lean meadows, flowering areas)',
            'Cost estimates and life-cycle considerations',
          ],
        },
        {
          title: 'Stakeholder & Grant Support',
          bullets: [
            'Grant application consulting (municipal climate adaptation and biodiversity programmes)',
            'Citizen participation and stakeholder workshops for neighbourhood projects',
          ],
        },
      ],
    },
    {
      number: '03',
      title: 'Drone Surveys & Remote Sensing',
      summary: 'Aerial vegetation and area analysis using drone technology and multispectral imaging.',
      images: [drone1, drone2],
      points: [
        {
          title: 'Aerial Analysis',
          bullets: [
            'NDVI analysis to assess vitality of vegetation structures',
            'Multispectral and thermal imaging (drought stress, early pest detection)',
            'High-resolution orthophotos and 3D models for site planning',
          ],
        },
        {
          title: 'Mapping & Monitoring',
          bullets: [
            'Canopy mapping and crown volume calculation',
            'Longitudinal monitoring — data feeds directly into the BIOME Platform',
          ],
        },
      ],
    },
    {
      number: '04',
      title: 'Installation',
      summary: 'Execution of soil preparation and planting measures using advanced substrates and root space techniques.',
      images: [],
      points: [
        {
          title: 'Soil Preparation & Substrates',
          bullets: [
            'Planting pit preparation following FLL (substrate exchange, infiltration trenches, root space extension)',
            'Urban tree substrates and aerated root spaces following the sponge city principle',
            'Use of biochar as a substrate component (in cooperation with partner producers)',
            'Remediation of compacted soils (AirSpade / air injection, root zone decompaction)',
          ],
        },
        {
          title: 'Planting & Establishment',
          bullets: [
            'Planting of standard trees, solitaires, shrubs, perennials, wildflowers',
            'Anchoring (tripod, underground guying) and trunk protection',
            'Establishment care during the first three years',
            'Mulching with fungi-friendly material (wood chips, leaf litter)',
          ],
        },
      ],
    },
    {
      number: '05',
      title: 'Climate Resilience Measures',
      summary: 'Stormwater management, sponge city principles and soil microbiome optimisation for climate-resilient urban spaces.',
      images: [climate1, climate2, climate3, climate4, climate5, climate6, climate7, climate8, climate9],
      points: [
        {
          title: 'Stormwater Management & Sponge City',
          bullets: [
            'Tree trenches following the Stockholm / sponge city principle',
            'Infiltration swales, retention areas, unsealed tree pits',
            'Connection of roof and traffic area runoff to tree locations',
            'Irrigation systems: tree bags, drip irrigation, sensor-controlled irrigation',
            'Urban heat island reduction through strategic shading and evapotranspiration concepts',
            'Selection of climate-resilient future species',
          ],
        },
        {
          title: 'Soil Microbiome Optimisation',
          bullets: [
            'High organic matter inputs to increase water holding capacity — soil acts as a buffer during heavy rainfall',
            'Active introduction of fungi via fungal-dominated LUMA compost',
            'Site-adapted compost production',
            'LUMA Inoculant: transfer of a biodiverse soil microbiome to degraded urban sites',
            'Soil analysis: texture, pH, nutrients, soil organisms via microscopy (Soil Food Web)',
            'Assessment of microbial diversity (bacteria-fungi ratio, protozoa, nematode trophic groups)',
            'Monitoring of microbial establishment after 6 / 12 / 24 months',
          ],
        },
      ],
    },
    {
      number: '06',
      title: 'Habitat Structures',
      summary: 'Creating micro- and macro-habitats for urban biodiversity through structural installations and terrain modelling.',
      images: [],
      points: [
        {
          title: 'Micro-Habitats',
          bullets: [
            'Deadwood installations, stone piles, wild bee nesting aids, beetle cellars',
            'Nesting and roosting modules for birds and bats',
            'Deadwood zones as structurally rich habitats',
          ],
        },
        {
          title: 'Macro-Habitats & Terrain',
          bullets: [
            'Terrain modelling: loam and steep-face walls for wild bees and swallows, sand habitats, dry stone walls, damp hollows',
            'Green space management to maintain open soil structures (sand, bare soil areas)',
            'Habitat connectivity (stepping stone biotopes, neighbourhood biotope network)',
          ],
        },
      ],
    },
    {
      number: '07',
      title: 'Green Roofs & Living Walls',
      summary: 'Planning and installation of biodiverse building greening systems for roofs and façades.',
      images: [],
      points: [
        {
          title: 'Green Roof Systems',
          bullets: [
            'Planning and installation of intensive and extensive green roofs',
            'Biodiverse substrate mixes and species compositions (instead of sedum monocultures)',
            'Irrigation and retention concepts for roof areas',
            'Structural and building physics pre-assessment',
          ],
        },
        {
          title: 'Living Walls & Façade Greening',
          bullets: [
            'Ground-based and wall-bound living wall systems',
            'Integration of habitat structures on roofs and façades',
            'Cooperation with established manufacturers and system partners',
          ],
        },
      ],
    },
    {
      number: '08',
      title: 'BIOME Platform',
      summary: 'Data-driven climate resilience and biodiversity monitoring — from sensor data to decision-ready reports.',
      images: [biome1, biome2, biome3],
      points: [
        {
          title: 'Data Collection & Integration',
          bullets: [
            'Collection and aggregation of sensor data: soil moisture, soil temperature, air temperature, humidity, stem growth, PAR, CO₂',
            'Integration of monitoring data: NDVI trends, drone surveys, tree cadastres, damage records',
            'Inclusion of biodiversity data: species monitoring, eDNA analyses, microbiome profiles, bioacoustics',
            'Central data structure with APIs to existing GIS and specialist systems',
          ],
        },
        {
          title: 'Reporting & Visualisation',
          bullets: [
            'Data processing and visual representation in dashboards',
            'Simplified, decision-ready reports — complex data is "channelled" for end users',
            'Customisable views per user group',
            'Long-term trend analyses and early warning system for vitality decline',
          ],
        },
        {
          title: 'Target Groups',
          bullets: [
            'Architecture and planning offices',
            'Parks departments, municipalities and public authorities',
            'Corporate biodiversity teams and state institutions',
          ],
        },
      ],
    },
    {
      number: '09',
      title: 'Long-Term Stewardship',
      summary: 'Multi-year care contracts, monitoring and adaptive management for lasting ecological performance.',
      images: [stewardship1, stewardship2, stewardship3, stewardship4, stewardship5, stewardship6, stewardship7, stewardship8],
      points: [
        {
          title: 'Care & Maintenance',
          bullets: [
            'Multi-year care contracts (development and maintenance care)',
            'Regular vitality checks and tree inspections',
            'Irrigation management during drought periods',
            'Re-inoculation and compost refreshment',
          ],
        },
        {
          title: 'Monitoring & Reporting',
          bullets: [
            'Microbiome monitoring after 6 / 12 / 24 months',
            'Annual reports including NDVI trends — delivered directly from the BIOME Platform',
            'Adaptation of care concepts to climate change',
          ],
        },
      ],
    },
  ],
  de: [
    {
      number: '01',
      title: 'Baumpflege & Baumgutachten',
      summary: 'Professionelle Pflege, Begutachtung und Fällung von Stadtbäumen gemäß ZTV-Baumpflege und FLL-Richtlinien.',
      images: [treeService1, treeService2, treeService3, treeService4, treeService5],
      points: [
        {
          title: 'Schnitt- & Kronenarbeiten',
          bullets: [
            'Professionelle Schnitt- und Totholzentfernung gemäß ZTV-Baumpflege und FLL-Richtlinien',
            'Kronenpflege, Kronenrückschnitt, Kronensicherung (statische & dynamische Systeme)',
            'Klettertechniken (SRT/DRT) für anspruchsvolle Einsätze ohne Hubarbeitsbühne',
            'Erziehungsschnitt und Kronenentwicklung bei Jungbäumen',
          ],
        },
        {
          title: 'Baumkontrolle & Schadensdiagnostik',
          bullets: [
            'Baumkontrolle für die Verkehrssicherungspflicht (eingehende FLL-Kontrolle)',
            'Schadensdiagnostik: Pilzbefall, Rindenschäden, Wurzelschäden, Risse',
            'Stand- und Bruchsicherheitsbewertung (Zugversuch, Resistograph, Schalltomographie)',
            'Notfall- und Sturmschadenseinsätze',
          ],
        },
        {
          title: 'Fällung & Dokumentation',
          bullets: [
            'Fällung inkl. Stubbenentfernung im urbanen Umfeld (Stückfällung per Klettertechnik)',
            'Digitales Baumkataster mit Fotodokumentation und GPS-Koordinaten',
          ],
        },
      ],
    },
    {
      number: '02',
      title: 'Beratung & Konzeptplanung',
      summary: 'Planung und Entwicklung urbaner Begrünungskonzepte, angepasst an Standortbedingungen, Biodiversitätsziele und Klimaresilienz.',
      images: [consulting1, consulting2, consulting3, consulting4, consulting5, consulting6, consulting7],
      points: [
        {
          title: 'Standortanalyse & Konzeptentwicklung',
          bullets: [
            'Vor-Ort-Begehung und Bestandsaufnahme (Boden, Bestandsvegetation, Mikroklima, Versiegelungsgrad)',
            'Entwicklung maßgeschneiderter Begrünungs- und Pflanzkonzepte',
            'Auswahlkriterien: Biodiversität, Ästhetik, Erholungswert, Klimaresilienz, Sicherheit',
            'Klimaresiliente Zukunftsbaumarten (urbane Klimaartenlisten)',
          ],
        },
        {
          title: 'Pflanzplanung & Ökologische Aufwertung',
          bullets: [
            'Pflanzpläne inkl. Unterpflanzung, Staudenpflanzungen und Wildblumensaaten',
            'Ökologische Aufwertung von Bestandsflächen (Pflegeumstellung, Magerflächen, Blühflächen)',
            'Kostenschätzung und Lebenszyklusbetrachtungen',
          ],
        },
        {
          title: 'Förderberatung & Beteiligung',
          bullets: [
            'Förderberatung (kommunale Klimaanpassungs- und Biodiversitätsprogramme)',
            'Bürgerbeteiligung und Stakeholder-Workshops für Quartiersprojekte',
          ],
        },
      ],
    },
    {
      number: '03',
      title: 'Drohnenerhebungen & Fernerkundung',
      summary: 'Luftgestützte Vegetations- und Flächenanalyse mit Drohnentechnologie und Multispektralbildgebung.',
      images: [drone1, drone2],
      points: [
        {
          title: 'Luftbildanalyse',
          bullets: [
            'NDVI-Analyse zur Vitalitätsbewertung von Vegetationsstrukturen',
            'Multispektral- und Thermalaufnahmen (Trockenstress, Frühbefallerkennung)',
            'Hochauflösende Orthophotos und 3D-Modelle für die Standortplanung',
          ],
        },
        {
          title: 'Kartierung & Monitoring',
          bullets: [
            'Kronenraumkartierung und Kronenvolumenberechnung',
            'Längsschnittmonitoring — Daten fließen direkt in die BIOME-Plattform',
          ],
        },
      ],
    },
    {
      number: '04',
      title: 'Installation',
      summary: 'Durchführung von Bodenvorbereitungs- und Pflanzmaßnahmen mit modernen Substraten und Wurzelraumtechniken.',
      images: [],
      points: [
        {
          title: 'Bodenvorbereitung & Substrate',
          bullets: [
            'Pflanzgrubenherstellung nach FLL (Substrataustausch, Sickergräben, Wurzelraumvergrößerung)',
            'Stadtbaumsubstrate und belüftete Wurzelräume nach dem Schwammstadtprinzip',
            'Einsatz von Biokohle als Substratkomponente (in Kooperation mit Partnerherstellern)',
            'Sanierung verdichteter Böden (AirSpade / Luftinjektion, Wurzelraumlockerung)',
          ],
        },
        {
          title: 'Pflanzung & Anwachspflege',
          bullets: [
            'Pflanzung von Hochstämmen, Solitären, Sträuchern, Stauden, Wildblumen',
            'Verankerung (Dreibock, Unterflurverankerung) und Stammschutz',
            'Anwachspflege in den ersten drei Jahren',
            'Mulchung mit pilzfreundlichem Material (Holzhackschnitzel, Laubstreu)',
          ],
        },
      ],
    },
    {
      number: '05',
      title: 'Klimaresilienzmaßnahmen',
      summary: 'Regenwassermanagement, Schwammstadtprinzipien und Bodenmikrobiom-Optimierung für klimaresiliente Stadträume.',
      images: [climate1, climate2, climate3, climate4, climate5, climate6, climate7, climate8, climate9],
      points: [
        {
          title: 'Regenwassermanagement & Schwammstadt',
          bullets: [
            'Baumrigolen nach dem Stockholmer / Schwammstadtprinzip',
            'Versickerungsmulden, Retentionsflächen, entsiegelte Baumscheiben',
            'Anbindung von Dach- und Verkehrsflächenabfluss an Baumstandorte',
            'Bewässerungssysteme: Baumbewässerungssäcke, Tropfbewässerung, sensorgesteuerte Bewässerung',
            'Reduktion der städtischen Wärmeinsel durch strategische Beschattung und Evapotranspirationskonzepte',
            'Auswahl klimaresilienter Zukunftsarten',
          ],
        },
        {
          title: 'Bodenmikrobiom-Optimierung',
          bullets: [
            'Hohe organische Einträge zur Steigerung der Wasserhaltekapazität — Boden als Puffer bei Starkregenereignissen',
            'Aktive Pilzeinbringung über pilzdominiertes LUMA-Kompost',
            'Standortangepasste Kompostherstellung',
            'LUMA Inokulat: Transfer eines biodiviersen Bodenmikrobioms auf degradierte Stadtstandorte',
            'Bodenanalyse: Textur, pH, Nährstoffe, Bodenorganismen per Mikroskopie (Soil Food Web)',
            'Bewertung der mikrobiellen Diversität (Bakterien-Pilz-Verhältnis, Protozoen, Nematoden-Trophiegruppen)',
            'Monitoring der mikrobiellen Etablierung nach 6 / 12 / 24 Monaten',
          ],
        },
      ],
    },
    {
      number: '06',
      title: 'Habitatstrukturen',
      summary: 'Schaffung von Mikro- und Makrohabitaten für die urbane Biodiversität durch strukturelle Installationen und Geländemodellierungen.',
      images: [],
      points: [
        {
          title: 'Mikrohabitate',
          bullets: [
            'Totholzinstallationen, Steinhaufen, Wildbienen-Nisthilfen, Käferkeller',
            'Nist- und Schlafplatzmodule für Vögel und Fledermäuse',
            'Totholzzonen als strukturreiche Habitate',
          ],
        },
        {
          title: 'Makrohabitate & Geländegestaltung',
          bullets: [
            'Geländemodellierung: Lehm- und Steilwände für Wildbienen und Schwalben, Sandhabitate, Trockenmauern, Feuchtmulden',
            'Grünflächenmanagement zur Erhaltung offener Bodenstrukturen (Sand, Offenbodenbereiche)',
            'Habitatvernetzung (Trittstein-Biotope, Quartiersbiotobnetz)',
          ],
        },
      ],
    },
    {
      number: '07',
      title: 'Gründächer & Fassadenbegrünung',
      summary: 'Planung und Installation biodiverser Gebäudebegrünungssysteme für Dächer und Fassaden.',
      images: [],
      points: [
        {
          title: 'Gründachsysteme',
          bullets: [
            'Planung und Installation von Intensiv- und Extensivgründächern',
            'Biodiverse Substratmischungen und Artenzusammensetzungen (statt Sedum-Monokulturen)',
            'Bewässerungs- und Retentionskonzepte für Dachflächen',
            'Bautechnische und bauphysikalische Vorprüfung',
          ],
        },
        {
          title: 'Fassadenbegrünung & Wandbegrünung',
          bullets: [
            'Bodengebundene und wandgebundene Fassadenbegrünungssysteme',
            'Integration von Habitatstrukturen auf Dächern und Fassaden',
            'Zusammenarbeit mit namhaften Herstellern und Systempartnern',
          ],
        },
      ],
    },
    {
      number: '08',
      title: 'BIOME-Plattform',
      summary: 'Datengestützte Klimaresilienz und Biodiversitätsmonitoring — von Sensordaten bis zu entscheidungsreifen Berichten.',
      images: [biome1, biome2, biome3],
      points: [
        {
          title: 'Datenerfassung & Integration',
          bullets: [
            'Erfassung und Aggregation von Sensordaten: Bodenfeuchte, Bodentemperatur, Lufttemperatur, Luftfeuchte, Stammwachstum, PAR, CO₂',
            'Integration von Monitoringdaten: NDVI-Trends, Drohnenbefliegungen, Baumkataster, Schadensmeldungen',
            'Einbindung von Biodiversitätsdaten: Artenmonitoring, eDNA-Analysen, Mikrobiomprofile, Bioakustik',
            'Zentrale Datenstruktur mit APIs zu bestehenden GIS- und Fachsystemen',
          ],
        },
        {
          title: 'Berichterstattung & Visualisierung',
          bullets: [
            'Datenverarbeitung und visuelle Aufbereitung in Dashboards',
            'Vereinfachte, entscheidungsreife Berichte — komplexe Daten werden für Endnutzer "kanalisiert"',
            'Anpassbare Ansichten je Nutzergruppe',
            'Langzeit-Trendanalysen und Frühwarnsystem bei Vitalitätsverlust',
          ],
        },
        {
          title: 'Zielgruppen',
          bullets: [
            'Architektur- und Planungsbüros',
            'Grünflächenämter, Kommunen und Behörden',
            'Corporate Biodiversity Teams und staatliche Institutionen',
          ],
        },
      ],
    },
    {
      number: '09',
      title: 'Langfristige Pflege',
      summary: 'Mehrjährige Pflegeverträge, Monitoring und adaptives Management für nachhaltige ökologische Leistung.',
      images: [stewardship1, stewardship2, stewardship3, stewardship4, stewardship5, stewardship6, stewardship7, stewardship8],
      points: [
        {
          title: 'Pflege & Wartung',
          bullets: [
            'Mehrjährige Pflegeverträge (Entwicklungs- und Unterhaltungspflege)',
            'Regelmäßige Vitalitätschecks und Baumkontrollen',
            'Bewässerungsmanagement in Trockenphasen',
            'Nachinokulation und Kompostauffrischung',
          ],
        },
        {
          title: 'Monitoring & Berichterstattung',
          bullets: [
            'Mikrobiom-Monitoring nach 6 / 12 / 24 Monaten',
            'Jahresberichte inkl. NDVI-Trends — direkt aus der BIOME-Plattform geliefert',
            'Anpassung der Pflegekonzepte an den Klimawandel',
          ],
        },
      ],
    },
  ],
}

function ServiceModal({ service, onClose, isDark, c }) {
  const [imgIndex, setImgIndex] = useState(0)
  const { accent, fg, fgMuted, fgSubtle, borderColor } = c

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }} />
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', background: isDark ? '#001219' : '#F3E0A8', border: `1px solid ${borderColor}`, borderRadius: 4, maxWidth: 860, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 40px 120px rgba(0,0,0,0.5)', animation: 'modalIn 0.35s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.94) translateY(24px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: fg, zIndex: 10, transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}
        >
          <X size={16} />
        </button>

        <div style={{ position: 'relative', height: 360, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)', borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {service.images && service.images.length > 0 ? (
            <>
              <img
                src={service.images[imgIndex]}
                alt={`${service.title} ${imgIndex + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: '4px 12px' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#fff', letterSpacing: '0.05em' }}>{imgIndex + 1} / {service.images.length}</span>
              </div>
              {service.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex(i => (i - 1 + service.images.length) % service.images.length)}
                    style={{ position: 'absolute', left: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={() => setImgIndex(i => (i + 1) % service.images.length)}
                    style={{ position: 'absolute', right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                  >
                    <ChevronRight size={22} />
                  </button>
                  <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                    {service.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        style={{ width: i === imgIndex ? 24 : 8, height: 8, borderRadius: 4, background: i === imgIndex ? accent : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', border: `1px dashed ${borderColor}`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: fgSubtle, fontSize: 24 }}>+</span>
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: fgSubtle, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Images coming soon</p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button style={{ width: 40, height: 40, borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: `1px solid ${borderColor}`, cursor: 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: fgSubtle }}><ChevronLeft size={18} /></button>
                <button style={{ width: 40, height: 40, borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: `1px solid ${borderColor}`, cursor: 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: fgSubtle }}><ChevronRight size={18} /></button>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '40px 48px 48px' }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>{service.number}</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, letterSpacing: '-0.02em', color: fg, marginBottom: 12, lineHeight: 1.1 }}>{service.title}</h2>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: fgMuted, marginBottom: 40, lineHeight: 1.7, fontWeight: 300 }}>{service.summary}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {service.points.map((point, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${accent}20`, border: `1px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: accent, fontWeight: 500 }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 400, color: fg, letterSpacing: '-0.01em' }}>{point.title}</h3>
                </div>
                <div style={{ paddingLeft: 40, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {point.bullets.map((bullet, j) => (
                    <div key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: accent, marginTop: 7, flexShrink: 0 }} />
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: fgMuted, lineHeight: 1.75, fontWeight: 300 }}>{bullet}</p>
                    </div>
                  ))}
                </div>
                {i < service.points.length - 1 && <div style={{ height: 1, background: borderColor, marginTop: 32 }} />}
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
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, bg, fg, fgMuted, fgSubtle, borderColor, cardBg, cardBorder } = c
  const t = translations[lang].nav
  const services = serviceDetails[lang]
  const [selectedService, setSelectedService] = useState(null)

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        .mono { font-family: 'Space Mono', monospace; }
        .service-tile {
          border: 1px solid ${cardBorder};
          background: ${cardBg};
          padding: 40px;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background 0.3s, box-shadow 0.4s;
          cursor: pointer;
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
          border-color: ${accent}50;
          background: ${accent}08;
          box-shadow: 0 20px 60px ${accent}15;
        }
        .service-tile:hover::before { opacity: 1; }
      `}</style>

      {/* Header band with background image */}
      <div className="page-hero" style={{ position: 'relative', borderBottom: `1px solid ${borderColor}`, overflow: 'hidden' }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${serviceBG2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        {/* Dark tint so text stays readable */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isDark
            ? 'linear-gradient(to right, rgba(0,18,25,0.82) 0%, rgba(0,18,25,0.55) 60%, rgba(0,18,25,0.2) 100%)'
            : 'linear-gradient(to right, rgba(0,18,25,0.72) 0%, rgba(0,18,25,0.45) 60%, rgba(0,18,25,0.1) 100%)',
        }} />
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>{t.services}</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#ffffff', marginBottom: 20 }}>
            {lang === 'en' ? 'What LUMA offers.' : 'Was LUMA bietet.'}
          </h1>
          <p className="mono" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 560, lineHeight: 1.8, fontWeight: 300 }}>
            {lang === 'en'
              ? 'From ecological consulting to digital biodiversity monitoring — our services cover the full lifecycle of nature-positive urban development. Click any service to learn more.'
              : 'Von ökologischer Beratung bis zum digitalen Biodiversitätsmonitoring — unsere Leistungen decken den gesamten Lebenszyklus ab. Klicken Sie auf eine Leistung für mehr Informationen.'}
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="page-section-lg">
        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {services.map((service, i) => (
            <div key={i} className="service-tile" onClick={() => setSelectedService(service)}>
              <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.15em', marginBottom: 20 }}>{service.number}</div>
              <div style={{ width: 32, height: 1, background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)', marginBottom: 20 }} />
              <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 16, color: fg, lineHeight: 1.2 }}>{service.title}</h3>
              <p className="mono" style={{ fontSize: 12, color: fgMuted, lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>{service.summary}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {lang === 'en' ? 'Learn more →' : 'Mehr erfahren →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} isDark={isDark} c={c} />
      )}
    </div>
  )
}