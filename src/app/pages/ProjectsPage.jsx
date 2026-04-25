import { useState } from 'react'
import { useTheme, themeColors } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import serviceBG2 from '../../assets/ServiceBG2.jpeg'

// AG (Alt-Glienicke) BEW
import ag1 from '../../assets/ProjectsPage/AG (Alt-Glienicke) BEW/AG1.jpg'

// BL (Blankenburg) BEW Vattenfall
import bew1 from '../../assets/ProjectsPage/BL (Blankenburg) BEW Vattenfall/BEW1.jpg'
import bew2 from '../../assets/ProjectsPage/BL (Blankenburg) BEW Vattenfall/BEW2.jpg'
import bew3 from '../../assets/ProjectsPage/BL (Blankenburg) BEW Vattenfall/BEW3.jpg'
import bew4 from '../../assets/ProjectsPage/BL (Blankenburg) BEW Vattenfall/BEW4.jpg'
import bew5 from '../../assets/ProjectsPage/BL (Blankenburg) BEW Vattenfall/BEW5.jpg'
import bew6 from '../../assets/ProjectsPage/BL (Blankenburg) BEW Vattenfall/BEW6.JPG'
import bew7 from '../../assets/ProjectsPage/BL (Blankenburg) BEW Vattenfall/BEW7.JPG'
import bew8 from '../../assets/ProjectsPage/BL (Blankenburg) BEW Vattenfall/BEW8.JPG'
import bew9 from '../../assets/ProjectsPage/BL (Blankenburg) BEW Vattenfall/BEW9.JPG'
import bew10 from '../../assets/ProjectsPage/BL (Blankenburg) BEW Vattenfall/BEW10.jpg'

// Clearing WISAG
import cw1 from '../../assets/ProjectsPage/Clearing WISAG/CW1.jpeg'
import cw2 from '../../assets/ProjectsPage/Clearing WISAG/CW2.jpeg'

// Fungus Leaves Compostsystems
import fungus1 from '../../assets/ProjectsPage/Fungus Leaves Compostsystems/Fungus1.jpg'
import fungus2 from '../../assets/ProjectsPage/Fungus Leaves Compostsystems/Fungus2.jpg'
import fungus3 from '../../assets/ProjectsPage/Fungus Leaves Compostsystems/Fungus3.jpg'
import fungus4 from '../../assets/ProjectsPage/Fungus Leaves Compostsystems/Fungus4.jpg'
import fungus5 from '../../assets/ProjectsPage/Fungus Leaves Compostsystems/Fungus5.jpg'
import fungus6 from '../../assets/ProjectsPage/Fungus Leaves Compostsystems/Fungus6.jpg'

// H14 (Hermannstrase 14) JOPE
import jope1 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope1.jpg'
import jope2 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope2.JPG'
import jope3 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope3.JPG'
import jope4 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope4.JPG'
import jope5 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope5.jpg'
import jope6 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope6.jpg'
import jope7 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope7.jpg'
import jope8 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope8.jpg'
import jope9 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope9.jpg'
import jope10 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope10.jpg'
import jope11 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope11.jpg'
import jope12 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope12.JPG'
import jope13 from '../../assets/ProjectsPage/H14 (Hermannstrase 14) JOPE/Jope13.JPG'

// LE
import le1 from '../../assets/ProjectsPage/LE/LE.jpg'

// Mobile Forest
import mf1 from '../../assets/ProjectsPage/Mobile Forest/MF1.JPG'
import mf2 from '../../assets/ProjectsPage/Mobile Forest/MF2.JPG'
import mf3a from '../../assets/ProjectsPage/Mobile Forest/MF3.jpeg'
import mf3b from '../../assets/ProjectsPage/Mobile Forest/MF3.JPG'

// MV (Markisches Viertel) BEW Vattenfall
import vatten1 from '../../assets/ProjectsPage/MV (Markisches Viertel)BEW Vattenfall/Vatten1.JPG'
import vatten2 from '../../assets/ProjectsPage/MV (Markisches Viertel)BEW Vattenfall/Vatten2.jpg'
import vatten3 from '../../assets/ProjectsPage/MV (Markisches Viertel)BEW Vattenfall/Vatten3.jpg'
import vatten4 from '../../assets/ProjectsPage/MV (Markisches Viertel)BEW Vattenfall/Vatten4.jpg'

// MV Willow Dome BEW
import willow1 from '../../assets/ProjectsPage/MV Willow Dome BEW/Willow1.jpg'
import willow2 from '../../assets/ProjectsPage/MV Willow Dome BEW/Willow2.JPG'
import willow3 from '../../assets/ProjectsPage/MV Willow Dome BEW/Willow3.JPG'
import willow4 from '../../assets/ProjectsPage/MV Willow Dome BEW/Willow4.JPG'
import willow5 from '../../assets/ProjectsPage/MV Willow Dome BEW/Willow5.JPG'
import willow6 from '../../assets/ProjectsPage/MV Willow Dome BEW/Willow6.JPG'
import willow7 from '../../assets/ProjectsPage/MV Willow Dome BEW/Willow7.JPG'
import willow8 from '../../assets/ProjectsPage/MV Willow Dome BEW/Willow8.JPG'

// P15 (Putlizstraße)
import p151 from '../../assets/ProjectsPage/P15 (Putlizstraße)/P151.jpg'

// P85 (Prinzenallee)
import p851 from '../../assets/ProjectsPage/P85 (Prinzenallee)/P851.jpeg'
import p852 from '../../assets/ProjectsPage/P85 (Prinzenallee)/P852.jpeg'
import p853 from '../../assets/ProjectsPage/P85 (Prinzenallee)/P853.jpeg'

// PP (Preußenpark)
import pp1 from '../../assets/ProjectsPage/PP (Preußenpark)/PP1.jpeg'
import pp2 from '../../assets/ProjectsPage/PP (Preußenpark)/PP2.jpeg'
import pp3 from '../../assets/ProjectsPage/PP (Preußenpark)/PP3.jpg'
import pp4 from '../../assets/ProjectsPage/PP (Preußenpark)/PP4.jpg'
import pp5 from '../../assets/ProjectsPage/PP (Preußenpark)/PP5.jpg'
import pp6 from '../../assets/ProjectsPage/PP (Preußenpark)/PP6.jpg'
import pp7 from '../../assets/ProjectsPage/PP (Preußenpark)/PP7.JPG'
import pp8 from '../../assets/ProjectsPage/PP (Preußenpark)/PP8.JPG'
import pp9 from '../../assets/ProjectsPage/PP (Preußenpark)/PP9.JPG'

// R95 (Raschdorfstraße) JOPE
import r951 from '../../assets/ProjectsPage/R95 (Raschdorfstraße) JOPE/R951.jpg'
import r952 from '../../assets/ProjectsPage/R95 (Raschdorfstraße) JOPE/R952.jpeg'
import r953 from '../../assets/ProjectsPage/R95 (Raschdorfstraße) JOPE/R953.jpg'

// S3 (Sickingenstraße 3)
import s31 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S31.JPG'
import s32 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S32.JPG'
import s33 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S33.JPG'
import s34 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S34.JPG'
import s35 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S35.jpg'
import s36 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S36.jpg'
import s37 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S37.jpg'
import s38 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S38.jpg'
import s39 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S39.JPG'
import s40 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S40.JPG'
import s41 from '../../assets/ProjectsPage/S3 (Sickingenstraße 3)/S41.jpg'

// SH (Scharnhorsstraße)
import sh1 from '../../assets/ProjectsPage/SH (Scharnhorsstraße)/SH1.jpg'

// Wild Bee Hive
import hive1 from '../../assets/ProjectsPage/Wild Bee Hive/Hive1.jpg'

// X13 (Kreuzbergstraße)
import x131 from '../../assets/ProjectsPage/X13 (Kreuzbergstraße)/X131.JPG'

const projects = [
  {
    id: 1,
    name: 'Fungal Leaves Compostsystem',
    nameDE: 'Fungal Leaves Compostsystem',
    category: 'Soil & Microbiome',
    categoryDE: 'Boden & Mikrobiom',
    description: 'Development and implementation of a fungal-dominated compost system using leaf litter and wood chip inputs to build biodiverse soil structure and establish mycorrhizal networks in urban green spaces.',
    descriptionDE: 'Entwicklung und Umsetzung eines pilzdominierten Kompostsystems auf Basis von Laubstreu und Holzhackschnitzeln zur Aufbau biodiverser Bodenstrukturen und mykorrhizaler Netzwerke in urbanen Grünflächen.',
    location: 'Berlin, DE',
    year: '2024',
    images: [fungus1, fungus2, fungus3, fungus4, fungus5, fungus6],
  },
  {
    id: 2,
    name: 'BL (Blankenburg) BEW:Vattenfall',
    nameDE: 'BL (Blankenburg) BEW:Vattenfall',
    category: 'Urban Greening',
    categoryDE: 'Stadtbegrünung',
    description: 'Ecological upgrading of residential green spaces in the Blankenburg district in partnership with BEW and Vattenfall. Focus on climate-resilient planting, soil improvement and biodiversity enhancement.',
    descriptionDE: 'Ökologische Aufwertung von Wohnumfeldgrünflächen im Bezirk Blankenburg in Kooperation mit BEW und Vattenfall. Schwerpunkt auf klimaresiliente Bepflanzung, Bodenverbesserung und Biodiversitätsförderung.',
    location: 'Berlin-Blankenburg, DE',
    year: '2024',
    images: [bew1, bew2, bew3, bew4, bew5, bew6, bew7, bew8, bew9, bew10],
  },
  {
    id: 3,
    name: 'MV Willow Dome BEW',
    nameDE: 'MV Willow Dome BEW',
    category: 'Habitat Structures',
    categoryDE: 'Habitatstrukturen',
    description: 'Construction of a living willow dome structure in Märkisches Viertel as a habitat feature and community space. A natural play and shelter structure woven from living willow rods, integrated into the surrounding green space.',
    descriptionDE: 'Errichtung einer lebenden Weidendom-Struktur im Märkischen Viertel als Habitatelement und Gemeinschaftsraum. Eine natürliche Spiel- und Schutzstruktur aus lebenden Weidenruten, eingebettet in die umgebende Grünfläche.',
    location: 'Berlin-Märkisches Viertel, DE',
    year: '2024',
    images: [willow1, willow2, willow3, willow4, willow5, willow6, willow7, willow8],
  },
  {
    id: 4,
    name: 'MV (Märkisches Viertel) BEW:Vattenfall',
    nameDE: 'MV (Märkisches Viertel) BEW:Vattenfall',
    category: 'Urban Greening',
    categoryDE: 'Stadtbegrünung',
    description: 'Large-scale green space transformation in Märkisches Viertel. Comprehensive ecological redesign of residential outdoor areas including wildflower meadows, native shrub planting and soil decompaction measures.',
    descriptionDE: 'Großflächige Grünflächentransformation im Märkischen Viertel. Umfassende ökologische Neugestaltung von Wohnumfeldflächen mit Wildblumenwiesen, heimischen Gehölzpflanzungen und Bodenlockerungsmaßnahmen.',
    location: 'Berlin-Märkisches Viertel, DE',
    year: '2024',
    images: [vatten1, vatten2, vatten3, vatten4],
  },
  {
    id: 5,
    name: 'H14 (Hermannstraße 14) JOPE',
    nameDE: 'H14 (Hermannstraße 14) JOPE',
    category: 'Tree Care',
    categoryDE: 'Baumpflege',
    description: 'Professional tree care and urban tree management at Hermannstraße 14. Includes crown work, deadwood removal, safety assessment and soil improvement measures to support long-term tree vitality.',
    descriptionDE: 'Professionelle Baumpflege und Stadtbaummanagement an der Hermannstraße 14. Umfasst Kronenarbeiten, Totholzentfernung, Sicherheitsbegutachtung und Bodenverbesserungsmaßnahmen.',
    location: 'Berlin-Neukölln, DE',
    year: '2024',
    images: [jope1, jope2, jope3, jope4, jope5, jope6, jope7, jope8, jope9, jope10, jope11, jope12, jope13],
  },
  {
    id: 6,
    name: 'Mobile Forests, HTW',
    nameDE: 'Mobile Forests, HTW',
    category: 'Innovation',
    categoryDE: 'Innovation',
    description: 'Pilot project with HTW Berlin developing mobile forest units — containerised tree and shrub assemblages that can be repositioned across urban sites to test biodiversity effects and provide temporary greening.',
    descriptionDE: 'Pilotprojekt mit der HTW Berlin zur Entwicklung mobiler Waldeinheiten — containerisierte Baum- und Strauchensembles, die an verschiedenen urbanen Standorten neu positioniert werden können.',
    location: 'Berlin, HTW Campus, DE',
    year: '2024',
    images: [mf1, mf2, mf3a, mf3b],
  },
  {
    id: 7,
    name: 'PP (Preußenpark) Bezirksamt Charlottenburg',
    nameDE: 'PP (Preußenpark) Bezirksamt Charlottenburg',
    category: 'Public Space',
    categoryDE: 'Öffentlicher Raum',
    description: 'Ecological consultancy and implementation work for the Bezirksamt Charlottenburg-Wilmersdorf at Preußenpark. Habitat assessment, species-rich planting design and management conversion for biodiversity uplift.',
    descriptionDE: 'Ökologische Beratung und Umsetzungsarbeiten für das Bezirksamt Charlottenburg-Wilmersdorf am Preußenpark. Habitatbewertung, artenreiche Pflanzplanung und Pflegeumstellung.',
    location: 'Berlin-Charlottenburg, DE',
    year: '2024',
    images: [pp1, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9],
  },
  {
    id: 8,
    name: 'LE (Langen Enden) BEW:Vattenfall',
    nameDE: 'LE (Langen Enden) BEW:Vattenfall',
    category: 'Urban Greening',
    categoryDE: 'Stadtbegrünung',
    description: 'Green space enhancement in the Langen Enden residential area in collaboration with BEW and Vattenfall. Native plantings, soil restoration and long-term stewardship to improve ecological quality and resident well-being.',
    descriptionDE: 'Grünflächenaufwertung im Wohngebiet Langen Enden in Zusammenarbeit mit BEW und Vattenfall. Heimische Bepflanzungen, Bodenrestaurierung und langfristige Pflege.',
    location: 'Berlin, DE',
    year: '2024',
    images: [le1],
  },
  {
    id: 9,
    name: 'Clearing WISAG Berlin',
    nameDE: 'Clearing WISAG Berlin',
    category: 'Tree Care',
    categoryDE: 'Baumpflege',
    description: 'Tree clearing and professional felling operations in collaboration with WISAG. Urban tree removal, stump management and site preparation for replanting programmes across multiple Berlin locations.',
    descriptionDE: 'Baumfällungen und professionelle Fällarbeiten in Zusammenarbeit mit WISAG. Stadtbaumfällungen, Stubbenmanagement und Standortvorbereitung für Neupflanzprogramme.',
    location: 'Berlin, DE',
    year: '2024',
    images: [cw1, cw2],
  },
  {
    id: 10,
    name: 'AG (Alt-Glienicke) BEW:Vattenfall',
    nameDE: 'AG (Alt-Glienicke) BEW:Vattenfall',
    category: 'Urban Greening',
    categoryDE: 'Stadtbegrünung',
    description: 'Residential green space improvement in Alt-Glienicke with BEW and Vattenfall. Focused on biodiversity-led planting, soil health improvement and creating structured habitats within existing housing estate landscapes.',
    descriptionDE: 'Aufwertung von Wohnumfeldgrünflächen in Alt-Glienicke mit BEW und Vattenfall. Schwerpunkt auf biodiversitätsorientierter Bepflanzung und Bodengesundheit.',
    location: 'Berlin-Alt-Glienicke, DE',
    year: '2024',
    images: [ag1],
  },
  {
    id: 11,
    name: 'R95 (Raschdorfstraße) JOPE',
    nameDE: 'R95 (Raschdorfstraße) JOPE',
    category: 'Tree Care',
    categoryDE: 'Baumpflege',
    description: 'Urban tree management and care programme at Raschdorfstraße 95. Comprehensive crown assessment, pruning works and soil aeration to extend the lifespan and improve the vitality of existing street trees.',
    descriptionDE: 'Stadtbaummanagement und Pflegeprogramm an der Raschdorfstraße 95. Umfassende Kronenbegutachtung, Schnittarbeiten und Bodenbelüftung.',
    location: 'Berlin, DE',
    year: '2024',
    images: [r951, r952, r953],
  },
  {
    id: 12,
    name: 'P85 (Prinzenallee) JOPE',
    nameDE: 'P85 (Prinzenallee) JOPE',
    category: 'Tree Care',
    categoryDE: 'Baumpflege',
    description: 'Tree care and urban greening works along Prinzenallee. Crown maintenance, safety inspection and underplanting with shade-tolerant native species to improve the ecological value of the street corridor.',
    descriptionDE: 'Baumpflege- und Stadtbegrünungsarbeiten entlang der Prinzenallee. Kronenpflege, Sicherheitskontrolle und Unterpflanzung mit schattentoleranten heimischen Arten.',
    location: 'Berlin-Wedding, DE',
    year: '2024',
    images: [p851, p852, p853],
  },
  {
    id: 13,
    name: 'S3 (Sickingenstraße 3) JOPE',
    nameDE: 'S3 (Sickingenstraße 3) JOPE',
    category: 'Tree Care',
    categoryDE: 'Baumpflege',
    description: 'Professional tree surgery and assessment at Sickingenstraße 3. Deadwood removal, crown reduction and structural bracing to ensure long-term safety and vitality of urban trees in a dense residential environment.',
    descriptionDE: 'Professionelle Baumpflege und -begutachtung an der Sickingenstraße 3. Totholzentfernung, Kronenrückschnitt und Kronensicherung.',
    location: 'Berlin-Moabit, DE',
    year: '2024',
    images: [s31, s32, s33, s34, s35, s36, s37, s38, s39, s40, s41],
  },
  {
    id: 14,
    name: 'P15 (Putlitzstraße) JOPE',
    nameDE: 'P15 (Putlitzstraße) JOPE',
    category: 'Tree Care',
    categoryDE: 'Baumpflege',
    description: 'Urban tree care programme at Putlitzstraße 15. Full crown inspection, formative pruning and soil improvement works to support the health and structural integrity of mature urban trees.',
    descriptionDE: 'Stadtbaumpflegeprogramm an der Putlitzstraße 15. Vollständige Kroneninspektion, Erziehungsschnitt und Bodenverbesserungsmaßnahmen.',
    location: 'Berlin-Moabit, DE',
    year: '2024',
    images: [p151],
  },
  {
    id: 15,
    name: 'X13 (Kreuzbergstraße) JOPE',
    nameDE: 'X13 (Kreuzbergstraße) JOPE',
    category: 'Tree Care',
    categoryDE: 'Baumpflege',
    description: 'Tree management and care at Kreuzbergstraße 13. Includes detailed tree safety assessment, targeted crown work and root zone treatment to improve tree health in a high-footfall urban environment.',
    descriptionDE: 'Baummanagement und -pflege an der Kreuzbergstraße 13. Umfasst detaillierte Baumkontrolle, gezielte Kronenarbeiten und Wurzelzonenbehandlung.',
    location: 'Berlin-Kreuzberg, DE',
    year: '2024',
    images: [x131],
  },
  {
    id: 16,
    name: 'Wild-Bee-Hive Project',
    nameDE: 'Wild-Bee-Hive Projekt',
    category: 'Habitat Structures',
    categoryDE: 'Habitatstrukturen',
    description: 'Design and installation of custom wild bee nesting structures across urban green spaces. Combining aesthetic timber craftsmanship with functional habitat engineering to support solitary bee populations in the city.',
    descriptionDE: 'Entwurf und Installation maßgeschneiderter Wildbienen-Niststrukturen in urbanen Grünflächen. Verbindung von ästhetischem Holzhandwerk mit funktionalem Habitatdesign.',
    location: 'Berlin, DE',
    year: '2024',
    images: [hive1],
  },
  {
    id: 17,
    name: 'SH (Scharnhorsstraße) BEW:Vattenfall',
    nameDE: 'SH (Scharnhorsstraße) BEW:Vattenfall',
    category: 'Urban Greening',
    categoryDE: 'Stadtbegrünung',
    description: 'Green space redesign at Scharnhorsstraße in collaboration with BEW and Vattenfall. Species-rich underplanting, soil decompaction and habitat feature installation to transform a degraded residential green space.',
    descriptionDE: 'Grünflächenneugestaltung an der Scharnhorsstraße in Zusammenarbeit mit BEW und Vattenfall. Artenreiche Unterpflanzung, Bodenlockerung und Habitatinstallationen.',
    location: 'Berlin, DE',
    year: '2024',
    images: [sh1],
  },
]

function ProjectModal({ project, onClose, isDark, c, lang }) {
  const [imgIndex, setImgIndex] = useState(0)
  const { accent, fg, fgMuted, fgSubtle, borderColor } = c

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
      onClick={onClose}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }} />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: isDark ? '#0f1117' : '#f0efe8',
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          maxWidth: 900,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
          animation: 'modalIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
        }}
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

        <div style={{ position: 'relative', height: 380, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)', borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {project.images && project.images.length > 0 ? (
            <>
              <img src={project.images[imgIndex]} alt={`${project.name} ${imgIndex + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: '4px 12px' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#fff', letterSpacing: '0.05em' }}>{imgIndex + 1} / {project.images.length}</span>
              </div>
              {project.images.length > 1 && (
                <>
                  <button onClick={() => setImgIndex(i => (i - 1 + project.images.length) % project.images.length)} style={{ position: 'absolute', left: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><ChevronLeft size={22} /></button>
                  <button onClick={() => setImgIndex(i => (i + 1) % project.images.length)} style={{ position: 'absolute', right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><ChevronRight size={22} /></button>
                  <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                    {project.images.map((_, i) => (
                      <button key={i} onClick={() => setImgIndex(i)} style={{ width: i === imgIndex ? 24 : 8, height: 8, borderRadius: 4, background: i === imgIndex ? accent : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', border: `1px dashed ${borderColor}`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: fgSubtle, fontSize: 28 }}>+</span>
              </div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: fgSubtle, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {lang === 'en' ? 'Images coming soon' : 'Bilder demnächst'}
              </p>
            </div>
          )}
        </div>

        <div style={{ padding: '40px 48px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', border: `1px solid ${accent}30`, padding: '4px 10px' }}>
              {lang === 'en' ? project.category : project.categoryDE}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: fgSubtle, letterSpacing: '0.1em' }}>{project.year}</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, letterSpacing: '-0.02em', color: fg, marginBottom: 8, lineHeight: 1.1 }}>
            {lang === 'en' ? project.name : project.nameDE}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: accent }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: fgSubtle, letterSpacing: '0.08em' }}>{project.location}</span>
          </div>
          <div style={{ height: 1, background: borderColor, marginBottom: 28 }} />
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: fgMuted, lineHeight: 1.85, fontWeight: 300 }}>
            {lang === 'en' ? project.description : project.descriptionDE}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const { theme } = useTheme()
  const { lang } = useLang()
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, bg, fg, fgMuted, fgSubtle, borderColor, cardBg, cardBorder } = c
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .mono { font-family: 'DM Mono', monospace; }
        .project-tile { cursor: pointer; position: relative; overflow: hidden; }
        .project-tile .overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.35s ease;
          display: flex; align-items: flex-end; padding: 28px;
        }
        .project-tile:hover .overlay { background: rgba(0,0,0,0.55); }
        .project-tile .overlay-text {
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .project-tile:hover .overlay-text { opacity: 1; transform: translateY(0); }
        .project-tile img, .project-tile .placeholder {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .project-tile:hover img, .project-tile:hover .placeholder { transform: scale(1.04); }
      `}</style>

      {/* Header with background image */}
      <div style={{ position: 'relative', borderBottom: `1px solid ${borderColor}`, padding: '80px 80px 64px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${serviceBG2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: isDark
            ? 'linear-gradient(to right, rgba(8,12,10,0.72) 0%, rgba(8,12,10,0.5) 60%, rgba(8,12,10,0.2) 100%)'
            : 'linear-gradient(to right, rgba(8,12,10,0.65) 0%, rgba(8,12,10,0.4) 60%, rgba(8,12,10,0.1) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
            {lang === 'en' ? 'Projects' : 'Projekte'}
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#ffffff', marginBottom: 20 }}>
            {lang === 'en' ? 'Our Projects.' : 'Unsere Projekte.'}
          </h1>
          <p className="mono" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 560, lineHeight: 1.8, fontWeight: 300 }}>
            {lang === 'en'
              ? 'A selection of our work across urban greening, tree care, habitat structures and ecological consulting. Click any project to learn more.'
              : 'Eine Auswahl unserer Arbeiten in den Bereichen Stadtbegrünung, Baumpflege, Habitatstrukturen und ökologische Beratung. Klicken Sie auf ein Projekt für mehr Informationen.'}
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <div style={{ padding: '80px 80px 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
          {projects.map((project, i) => {
            const heights = [380, 460, 320, 420, 360, 480, 340, 400, 440, 360, 420, 380, 460, 320, 400, 440, 380]
            const h = heights[i % heights.length]
            return (
              <div
                key={project.id}
                className="project-tile"
                style={{ height: h }}
                onClick={() => setSelectedProject(project)}
              >
                {project.images && project.images.length > 0 ? (
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div
                    className="placeholder"
                    style={{
                      width: '100%',
                      height: '100%',
                      background: isDark
                        ? `hsl(${140 + (i * 17) % 40}, 12%, ${8 + (i * 3) % 10}%)`
                        : `hsl(${100 + (i * 17) % 60}, 18%, ${82 + (i * 2) % 12}%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                        {String(project.id).padStart(2, '0')}
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {lang === 'en' ? 'Photo coming soon' : 'Foto folgt'}
                      </div>
                    </div>
                  </div>
                )}
                <div className="overlay">
                  <div className="overlay-text">
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
                      {lang === 'en' ? project.category : project.categoryDE}
                    </div>
                    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 400, color: '#ffffff', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 8 }}>
                      {lang === 'en' ? project.name : project.nameDE}
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em' }}>
                      {project.location} · {project.year}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isDark={isDark}
          c={c}
          lang={lang}
        />
      )}
    </div>
  )
}