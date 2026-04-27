import { useState, useRef } from 'react'
import { useLang } from '../context/LangContext'
import { useTheme, themeColors } from '../context/ThemeContext'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [35, 57],
  iconAnchor: [17, 57],
  popupAnchor: [1, -46],
  shadowSize: [57, 57],
})

const projects = [
  { id: 1, name: 'Fungal Leaves Compostsystem', category: 'Soil & Microbiome', location: [52.4965, 13.4308], district: 'Neukölln', year: '2024', client: null, address: null },
  { id: 2, name: 'BL (Blankenburg) BEW:Vattenfall', category: 'Urban Greening', location: [52.5747, 13.4408], district: 'Blankenburg', year: '2024', client: 'BEW:Vattenfall', address: null },
  { id: 3, name: 'MV Willow Dome BEW', category: 'Habitat Structures', location: [52.5779, 13.3513], district: 'Märkisches Viertel', year: '2024', client: 'BEW', address: null },
  { id: 4, name: 'MV (Märkisches Viertel) BEW:Vattenfall', category: 'Urban Greening', location: [52.5810, 13.3490], district: 'Märkisches Viertel', year: '2024', client: 'BEW:Vattenfall', address: null },
  { id: 5, name: 'H14 (Hermannstraße 14) JOPE', category: 'Tree Care', location: [52.4726, 13.4332], district: 'Neukölln', year: '2024', client: 'JOPE Real Estate', address: 'Hermannstraße 14, 12049 Berlin' },
  { id: 6, name: 'Mobile Forests, HTW', category: 'Innovation', location: [52.4567, 13.5258], district: 'Oberschöneweide', year: '2024', client: 'HTW Berlin', address: null },
  { id: 7, name: 'PP (Preußenpark) Bezirksamt Charlottenburg', category: 'Public Space', location: [52.4974, 13.3050], district: 'Charlottenburg', year: '2024', client: 'Bezirksamt Charlottenburg', address: null },
  { id: 8, name: 'LE (Langen Enden) BEW:Vattenfall', category: 'Urban Greening', location: [52.4385, 13.5502], district: 'Köpenick', year: '2024', client: 'BEW:Vattenfall', address: null },
  { id: 9, name: 'Clearing WISAG Berlin', category: 'Tree Care', location: [52.5200, 13.4050], district: 'Mitte', year: '2024', client: 'WISAG', address: null },
  { id: 10, name: 'AG (Alt-Glienicke) BEW:Vattenfall', category: 'Urban Greening', location: [52.3978, 13.5297], district: 'Alt-Glienicke', year: '2024', client: 'BEW:Vattenfall', address: null },
  { id: 11, name: 'R95 (Raschdorfstraße) JOPE', category: 'Tree Care', location: [52.5698, 13.3827], district: 'Reinickendorf', year: '2024', client: 'JOPE Real Estate', address: 'Raschdorfstraße 95, 13409 Berlin' },
  { id: 12, name: 'P85 (Prinzenallee) JOPE', category: 'Tree Care', location: [52.5589, 13.3826], district: 'Wedding', year: '2024', client: 'JOPE Real Estate', address: null },
  { id: 13, name: 'S3 (Sickingenstraße 3) JOPE', category: 'Tree Care', location: [52.5272, 13.3345], district: 'Moabit', year: '2024', client: 'JOPE Real Estate', address: 'Sickingenstraße 2, 10553 Berlin' },
  { id: 14, name: 'P15 (Putlitzstraße) JOPE', category: 'Tree Care', location: [52.5308, 13.3398], district: 'Moabit', year: '2024', client: 'JOPE Real Estate', address: 'Putlitzstraße 15, 10551 Berlin' },
  { id: 15, name: 'X13 (Kreuzbergstraße) JOPE', category: 'Tree Care', location: [52.4878, 13.3812], district: 'Kreuzberg', year: '2024', client: 'JOPE Real Estate', address: 'Kreuzbergstraße 13, 10965 Berlin' },
  { id: 16, name: 'Wild-Bee-Hive Project', category: 'Habitat Structures', location: [52.5120, 13.3890], district: 'Tiergarten', year: '2024', client: null, address: null },
  { id: 17, name: 'SH (Scharnhorsstraße) BEW:Vattenfall', category: 'Urban Greening', location: [52.5340, 13.3670], district: 'Mitte', year: '2024', client: 'BEW:Vattenfall', address: null },
]

const categoryColors = {
  'Soil & Microbiome': '#10b981',
  'Urban Greening': '#3b82f6',
  'Habitat Structures': '#f59e0b',
  'Tree Care': '#8b5cf6',
  'Innovation': '#ec4899',
  'Public Space': '#06b6d4',
}

function FlyToMarker({ project }) {
  const map = useMap()
  if (project) {
    map.flyTo(project.location, 14, { duration: 1.2 })
  }
  return null
}

export default function MapPage() {
  const { lang } = useLang()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterOpen, setFilterOpen] = useState(false)
  const markerRefs = useRef({})

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

  const filteredProjects = projects.filter(p => {
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const { accent, bg, fg, fgMuted, fgSubtle, borderColor, cardBg, cardBorder } = c

  const handleSelectProject = (project) => {
    const isSame = selectedProject?.id === project.id
    setSelectedProject(isSame ? null : project)
    if (!isSame && markerRefs.current[project.id]) {
      markerRefs.current[project.id].openPopup()
    }
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', fontFamily: "'DM Serif Display', Georgia, serif", background: bg, overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .mono { font-family: 'DM Mono', monospace; }
        .project-item { transition: background 0.2s, border-color 0.2s; cursor: pointer; }
        .project-item:hover { background: ${accent}10 !important; border-color: ${accent}40 !important; }
        .project-item.active { background: ${accent}15 !important; border-color: ${accent}60 !important; }
        .leaflet-popup-content-wrapper { background: ${isDark ? '#0f1117' : '#ffffff'} !important; border: 1px solid ${borderColor} !important; border-radius: 4px !important; box-shadow: 0 8px 32px rgba(0,0,0,0.3) !important; }
        .leaflet-popup-content { color: ${fg} !important; margin: 0 !important; }
        .leaflet-popup-tip { background: ${isDark ? '#0f1117' : '#ffffff'} !important; }
        .leaflet-popup-close-button { color: ${fgMuted} !important; }
        .search-input { width: 100%; background: transparent; border: none; outline: none; font-family: 'DM Mono', monospace; font-size: 12px; color: ${fg}; }
        .search-input::placeholder { color: ${fgSubtle}; }
        .filter-option { display: flex; align-items: center; gap: 10px; padding: 8px 12px; cursor: pointer; transition: background 0.15s; border-radius: 3px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.05em; color: ${fgMuted}; }
        .filter-option:hover { background: ${accent}10; color: ${fg}; }
        .filter-option.selected { color: ${accent}; background: ${accent}10; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${borderColor}; border-radius: 2px; }
      `}</style>

      {/* Sidebar */}
      <div style={{ width: 340, flexShrink: 0, background: bg, borderRight: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '28px 24px 20px', borderBottom: `1px solid ${borderColor}` }}>
          <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
            {lang === 'en' ? 'Project Map' : 'Projektkarte'}
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 400, letterSpacing: '-0.02em', color: fg, lineHeight: 1.1, marginBottom: 8 }}>
            {lang === 'en' ? 'Berlin Projects.' : 'Berliner Projekte.'}
          </h1>
          <p className="mono" style={{ fontSize: 12, color: fgMuted, lineHeight: 1.7, fontWeight: 300 }}>
            {lang === 'en'
              ? `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} across the city`
              : `${filteredProjects.length} Projekt${filteredProjects.length !== 1 ? 'e' : ''} in der Stadt`}
          </p>
        </div>

        {/* Search + Filter */}
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${borderColor}`, display: 'flex', gap: 8, position: 'relative' }}>
          {/* Search bar */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: `1px solid ${borderColor}`, borderRadius: 3, background: cardBg }}>
            <Search size={13} color={fgSubtle} style={{ flexShrink: 0 }} />
            <input
              className="search-input"
              placeholder={lang === 'en' ? 'Search projects...' : 'Projekte suchen...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: fgSubtle, display: 'flex' }}>
                <X size={12} />
              </button>
            )}
          </div>

          {/* Filter button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
                border: `1px solid ${filterCategory !== 'All' ? accent : borderColor}`,
                borderRadius: 3, background: filterCategory !== 'All' ? `${accent}15` : cardBg,
                cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: 11,
                color: filterCategory !== 'All' ? accent : fgMuted, letterSpacing: '0.05em',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
            >
              <SlidersHorizontal size={13} />
              {filterCategory === 'All' ? (lang === 'en' ? 'Filter' : 'Filter') : filterCategory.split(' ')[0]}
              <ChevronDown size={11} style={{ transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>

            {/* Dropdown */}
            {filterOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 100,
                background: isDark ? '#0f1117' : '#ffffff', border: `1px solid ${borderColor}`,
                borderRadius: 4, padding: '6px', minWidth: 200,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}>
                <div className="mono" style={{ fontSize: 10, color: fgSubtle, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 12px 8px' }}>
                  {lang === 'en' ? 'Category' : 'Kategorie'}
                </div>
                {categories.map(cat => (
                  <div
                    key={cat}
                    className={`filter-option ${filterCategory === cat ? 'selected' : ''}`}
                    onClick={() => { setFilterCategory(cat); setFilterOpen(false) }}
                  >
                    {cat !== 'All' && (
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: categoryColors[cat] || accent, flexShrink: 0 }} />
                    )}
                    {cat === 'All' ? (lang === 'en' ? 'All categories' : 'Alle Kategorien') : cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active filter pill */}
        {filterCategory !== 'All' && (
          <div style={{ padding: '8px 16px', borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: categoryColors[filterCategory] || accent }} />
            <span className="mono" style={{ fontSize: 11, color: categoryColors[filterCategory] || accent, letterSpacing: '0.05em' }}>{filterCategory}</span>
            <button
              onClick={() => setFilterCategory('All')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: fgSubtle, display: 'flex', marginLeft: 'auto', padding: 0 }}
            >
              <X size={11} />
            </button>
          </div>
        )}

        {/* Project list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          {filteredProjects.length === 0 ? (
            <div className="mono" style={{ fontSize: 12, color: fgSubtle, textAlign: 'center', padding: '32px 0', letterSpacing: '0.05em' }}>
              {lang === 'en' ? 'No projects found' : 'Keine Projekte gefunden'}
            </div>
          ) : filteredProjects.map(project => (
            <div
              key={project.id}
              className={`project-item ${selectedProject?.id === project.id ? 'active' : ''}`}
              style={{ padding: '14px 16px', marginBottom: 4, border: `1px solid ${cardBorder}`, background: cardBg, borderRadius: 3 }}
              onClick={() => handleSelectProject(project)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: categoryColors[project.category] || accent, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 400, color: fg, letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 4 }}>
                    {project.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span className="mono" style={{ fontSize: 10, color: categoryColors[project.category] || accent, letterSpacing: '0.08em' }}>
                      {project.category}
                    </span>
                    <span className="mono" style={{ fontSize: 10, color: fgSubtle }}>·</span>
                    <span className="mono" style={{ fontSize: 10, color: fgSubtle, letterSpacing: '0.05em' }}>
                      {project.district}
                    </span>
                    {project.client && (
                      <>
                        <span className="mono" style={{ fontSize: 10, color: fgSubtle }}>·</span>
                        <span className="mono" style={{ fontSize: 10, color: fgMuted, letterSpacing: '0.04em' }}>
                          {project.client}
                        </span>
                      </>
                    )}
                  </div>
                  {project.address && (
                    <div className="mono" style={{ fontSize: 10, color: fgSubtle, marginTop: 4, letterSpacing: '0.03em' }}>
                      {project.address}
                    </div>
                  )}
                </div>
                <span className="mono" style={{ fontSize: 10, color: fgSubtle, flexShrink: 0 }}>{project.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${borderColor}` }}>
          <div className="mono" style={{ fontSize: 10, color: fgSubtle, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
            {lang === 'en' ? 'Categories' : 'Kategorien'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {Object.entries(categoryColors).map(([cat, color]) => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span className="mono" style={{ fontSize: 10, color: fgMuted, letterSpacing: '0.05em' }}>{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative' }} onClick={() => setFilterOpen(false)}>
        <MapContainer
          center={[52.52, 13.405]}
          zoom={11}
          style={{ width: '100%', height: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {selectedProject && <FlyToMarker project={selectedProject} />}
          {filteredProjects.map(project => (
            <Marker
              key={project.id}
              position={project.location}
              icon={selectedProject?.id === project.id ? goldIcon : greenIcon}
              ref={ref => { if (ref) markerRefs.current[project.id] = ref }}
              eventHandlers={{ click: () => handleSelectProject(project) }}
            >
              <Popup>
                <div style={{ padding: '12px 4px', minWidth: 210 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: categoryColors[project.category] || accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {project.category}
                  </div>
                  <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 15, fontWeight: 400, color: fg, letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 8 }}>
                    {project.name}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: fgSubtle, marginBottom: 2 }}>
                          {lang === 'en' ? 'District' : 'Bezirk'}
                        </div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: fg }}>{project.district}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: fgSubtle, marginBottom: 2 }}>
                          {lang === 'en' ? 'Year' : 'Jahr'}
                        </div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: fg }}>{project.year}</div>
                      </div>
                    </div>
                    {project.client && (
                      <div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: fgSubtle, marginBottom: 2 }}>
                          {lang === 'en' ? 'Client' : 'Auftraggeber'}
                        </div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: fg }}>{project.client}</div>
                      </div>
                    )}
                    {project.address && (
                      <div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: fgSubtle, marginBottom: 2 }}>
                          {lang === 'en' ? 'Address' : 'Adresse'}
                        </div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: fg }}>{project.address}</div>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Selected project overlay */}
        {selectedProject && (
          <div style={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 1000,
            background: isDark ? 'rgba(15,17,23,0.95)' : 'rgba(240,239,232,0.95)',
            border: `1px solid ${accent}40`, borderRadius: 4, padding: '16px 24px',
            backdropFilter: 'blur(12px)', minWidth: 320, maxWidth: 480,
            boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div className="mono" style={{ fontSize: 10, color: categoryColors[selectedProject.category] || accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {selectedProject.category} · {selectedProject.district}
                  {selectedProject.client && ` · ${selectedProject.client}`}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 400, color: fg, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: selectedProject.address ? 6 : 0 }}>
                  {selectedProject.name}
                </div>
                {selectedProject.address && (
                  <div className="mono" style={{ fontSize: 11, color: fgMuted, marginTop: 4 }}>
                    {selectedProject.address}
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: fgSubtle, display: 'flex', padding: 0, flexShrink: 0, marginTop: 2 }}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}