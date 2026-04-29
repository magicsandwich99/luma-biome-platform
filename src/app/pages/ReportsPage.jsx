import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { useTheme, themeColors } from '../context/ThemeContext'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Minus, Download, Calendar, Sun, Moon } from 'lucide-react'

// ── i18n ─────────────────────────────────────────────────────────────────────
const T = {
  en: {
    title: 'Reports & Analytics',
    desc: 'Visualize trends and export data from your sensors',
    average: 'Average',
    minimum: 'Minimum',
    maximum: 'Maximum',
    trend: 'Trend',
    trendUp: 'Rising',
    trendDown: 'Falling',
    trendStable: 'Stable',
    lastDays: (n) => `Last ${n} days`,
    visualization: 'Sensor Data Visualization',
    last7: 'Last 7 days',
    last14: 'Last 14 days',
    last30: 'Last 30 days',
    areaChart: 'Area Chart',
    lineChart: 'Line Chart',
    barChart: 'Bar Chart',
    exportTitle: 'Export Data',
    exportDesc: 'Download sensor data for external analysis',
    exportCsv: 'Export CSV',
    exportJson: 'Export JSON',
    labelSensor: 'Sensor',
    labelCategory: 'Category',
    labelDataPoints: 'Data Points',
    labelStatus: 'Status',
    sensors: [
      { name: 'Forest CO₂ Monitor',    category: 'Air Quality' },
      { name: 'River pH Sensor',        category: 'Water Quality' },
      { name: 'Wildlife Camera',        category: 'Biodiversity' },
      { name: 'Soil Moisture Station',  category: 'Soil Health' },
    ],
  },
  de: {
    title: 'Berichte & Analysen',
    desc: 'Trends visualisieren und Sensordaten exportieren',
    average: 'Durchschnitt',
    minimum: 'Minimum',
    maximum: 'Maximum',
    trend: 'Trend',
    trendUp: 'Steigend',
    trendDown: 'Fallend',
    trendStable: 'Stabil',
    lastDays: (n) => `Letzte ${n} Tage`,
    visualization: 'Sensordaten-Visualisierung',
    last7: 'Letzte 7 Tage',
    last14: 'Letzte 14 Tage',
    last30: 'Letzte 30 Tage',
    areaChart: 'Flächendiagramm',
    lineChart: 'Liniendiagramm',
    barChart: 'Balkendiagramm',
    exportTitle: 'Daten exportieren',
    exportDesc: 'Sensordaten für externe Analysen herunterladen',
    exportCsv: 'CSV exportieren',
    exportJson: 'JSON exportieren',
    labelSensor: 'Sensor',
    labelCategory: 'Kategorie',
    labelDataPoints: 'Datenpunkte',
    labelStatus: 'Status',
    sensors: [
      { name: 'Wald-CO₂-Monitor',       category: 'Luftqualität' },
      { name: 'Fluss-pH-Sensor',         category: 'Wasserqualität' },
      { name: 'Wildtierkamera',          category: 'Biodiversität' },
      { name: 'Bodenfeuchte-Station',    category: 'Bodengesundheit' },
    ],
  },
}

// ── Mock sensor history ───────────────────────────────────────────────────────
function generateHistory(base, variance, points = 60, drift = 0) {
  const now = Date.now()
  return Array.from({ length: points }, (_, i) => ({
    timestamp: new Date(now - (points - i) * 86400000),
    value: parseFloat((base + (Math.random() - 0.5) * variance + drift * i).toFixed(2)),
  }))
}

const SENSOR_DATA = [
  { id: '1', unit: 'ppm',            color: '#10b981', history: generateHistory(412, 18, 60,  0.08)  },
  { id: '2', unit: 'pH',             color: '#3b82f6', history: generateHistory(7.2, 0.4, 60, -0.005) },
  { id: '3', unit: 'detections/day', color: '#8b5cf6', history: generateHistory(24,  12, 60,  0.15)  },
  { id: '4', unit: '% VWC',          color: '#f59e0b', history: generateHistory(38,  10, 60, -0.12)  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
function fmtDate(d) {
  const dt = d instanceof Date ? d : new Date(d)
  return `${MONTHS[dt.getMonth()]} ${dt.getDate()}`
}

function calcStats(history) {
  if (!history?.length) return { avg: 0, min: 0, max: 0, trend: 'stable' }
  const vals   = history.map(d => d.value)
  const avg    = vals.reduce((a, b) => a + b, 0) / vals.length
  const min    = Math.min(...vals)
  const max    = Math.max(...vals)
  const mid    = Math.floor(vals.length / 2)
  const first  = vals.slice(0, mid).reduce((a, b) => a + b, 0) / mid
  const second = vals.slice(mid).reduce((a, b) => a + b, 0) / (vals.length - mid)
  const trend  = second > first * 1.03 ? 'up' : second < first * 0.97 ? 'down' : 'stable'
  return { avg, min, max, trend }
}

// ── Sub-components ────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label, unit, isDark }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: isDark ? 'rgba(10,14,26,0.96)' : 'rgba(248,250,252,0.97)',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(12px)',
    }}>
      <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: 11, marginBottom: 4 }}>{label}</p>
      <p style={{ color: payload[0].stroke || payload[0].fill, fontWeight: 700, fontSize: 16 }}>
        {payload[0].value}{' '}
        <span style={{ fontSize: 11, fontWeight: 400, color: isDark ? '#9ca3af' : '#6b7280' }}>{unit}</span>
      </p>
    </div>
  )
}

function StyledSelect({ value, onChange, children, icon, isDark, borderColor }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      {icon && (
        <span style={{ position: 'absolute', left: 10, color: isDark ? '#6b7280' : '#9ca3af', pointerEvents: 'none' }}>
          {icon}
        </span>
      )}
      <select value={value} onChange={onChange} style={{
        background: isDark ? '#1e293b' : '#f1f5f9',
        border: `1px solid ${borderColor}`,
        borderRadius: 8, color: isDark ? '#d1d5db' : '#374151',
        fontSize: 12, cursor: 'pointer', outline: 'none', appearance: 'none',
        padding: `6px 28px 6px ${icon ? '28px' : '10px'}`,
      }}>
        {children}
      </select>
      <span style={{ position: 'absolute', right: 8, color: isDark ? '#6b7280' : '#9ca3af', pointerEvents: 'none', fontSize: 10 }}>▾</span>
    </div>
  )
}

function ExportBtn({ onClick, label, isDark, borderColor, fg }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: 8,
      color: fg, fontSize: 12, padding: '7px 14px', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = isDark ? '#1e293b' : '#f1f5f9'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <Download size={13} /> {label}
    </button>
  )
}

function ThemeToggle({ theme, toggleTheme, isDark }) {
  return (
    <button onClick={toggleTheme} title={isDark ? 'Light mode' : 'Dark mode'} style={{
      width: 40, height: 40, borderRadius: '50%', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
      background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: isDark ? '#f3f4f6' : '#374151', transition: 'all 0.2s', flexShrink: 0,
    }}
      onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.1)'}
      onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const { lang }               = useLang()
  const { theme, toggleTheme } = useTheme()
  const isDark                 = theme === 'dark'
  const c                      = themeColors[theme]
  const { fg, fgMuted, fgSubtle, borderColor } = c

  const t = T[lang]

  const [selectedIdx, setSelectedIdx] = useState(0)
  const [chartType, setChartType]     = useState('area')
  const [timeRange, setTimeRange]     = useState(30)

  const sensorMeta = t.sensors[selectedIdx]
  const sensorData = SENSOR_DATA[selectedIdx]
  const history    = sensorData.history.slice(-timeRange)
  const chartData  = history.map(e => ({ date: fmtDate(e.timestamp), value: e.value }))
  const stats      = calcStats(history)
  const { color }  = sensorData

  function handleExport(fmt) {
    const rows = sensorData.history.map(e => ({
      timestamp: (e.timestamp instanceof Date ? e.timestamp : new Date(e.timestamp)).toISOString(),
      value: e.value, sensor: sensorMeta.name, unit: sensorData.unit,
    }))
    const filename = `${sensorMeta.name.replace(/\s+/g, '_')}_${Date.now()}`
    let blob
    if (fmt === 'csv') {
      const csv = [['Timestamp','Value','Sensor','Unit'], ...rows.map(r => [r.timestamp, r.value, r.sensor, r.unit])]
        .map(r => r.join(',')).join('\n')
      blob = new Blob([csv], { type: 'text/csv' })
    } else {
      blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' })
    }
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `${filename}.${fmt}`; a.click()
  }

  const tooltipEl  = <CustomTooltip unit={sensorData.unit} isDark={isDark} />
  const gridStroke = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const tickFill   = isDark ? '#6b7280' : '#9ca3af'
  const gridProps  = { strokeDasharray: '3 3', stroke: gridStroke }
  const axisProps  = { stroke: 'transparent', fontSize: 11, tick: { fill: tickFill } }
  const interval   = Math.floor(chartData.length / 6)

  function renderChart() {
    const common = { data: chartData, margin: { top: 8, right: 16, left: 0, bottom: 0 } }
    if (chartType === 'line') return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart {...common}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="date" {...axisProps} interval={interval} />
          <YAxis {...axisProps} domain={['auto','auto']} />
          <Tooltip content={tooltipEl} />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: color }} />
        </LineChart>
      </ResponsiveContainer>
    )
    if (chartType === 'bar') return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart {...common}>
          <defs>
            <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={color} stopOpacity={0.9} />
              <stop offset="100%" stopColor={color} stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="date" {...axisProps} interval={interval} />
          <YAxis {...axisProps} domain={['auto','auto']} />
          <Tooltip content={tooltipEl} />
          <Bar dataKey="value" fill="url(#barG)" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    )
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart {...common}>
          <defs>
            <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="date" {...axisProps} interval={interval} />
          <YAxis {...axisProps} domain={['auto','auto']} />
          <Tooltip content={tooltipEl} />
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill="url(#areaG)" />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  const trendLabel = stats.trend === 'up' ? t.trendUp : stats.trend === 'down' ? t.trendDown : t.trendStable
  const trendColor = stats.trend === 'up' ? '#10b981' : stats.trend === 'down' ? '#ef4444' : (isDark ? '#6b7280' : '#9ca3af')
  const trendIcon  = stats.trend === 'up'
    ? <TrendingUp  size={16} color="#10b981" />
    : stats.trend === 'down'
    ? <TrendingDown size={16} color="#ef4444" />
    : <Minus size={16} color={isDark ? '#6b7280' : '#9ca3af'} />

  const panelBg    = isDark ? '#111827' : '#ffffff'
  const panelBord  = isDark ? '#1f2937' : '#e5e7eb'
  const chartInner = isDark ? '#0a0f1e' : '#f8fafc'
  const chartBord  = isDark ? '#1a2035' : '#e2e8f0'
  const exportBg   = isDark ? '#0d1424' : '#f1f5f9'

  return (
    <div style={{
      padding: '28px 32px', maxWidth: 1200, margin: '0 auto',
      fontFamily: "'DM Sans', sans-serif", color: fg,
      transition: 'background 0.3s, color 0.3s',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: fg, margin: 0 }}>{t.title}</h1>
          <p style={{ fontSize: 13, color: fgMuted, marginTop: 4 }}>{t.desc}</p>
        </div>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} isDark={isDark} />
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: t.average, value: stats.avg.toFixed(2), icon: <TrendingUp  size={14} />, accent: '#10b981' },
          { label: t.minimum, value: stats.min.toFixed(2), icon: <TrendingDown size={14} />, accent: '#3b82f6' },
          { label: t.maximum, value: stats.max.toFixed(2), icon: <TrendingUp  size={14} />, accent: '#f59e0b' },
          { label: t.trend,   value: trendLabel,           icon: trendIcon,                  accent: trendColor, isText: true },
        ].map(card => (
          <div key={card.label} style={{
            background: `linear-gradient(135deg, ${card.accent}12, ${card.accent}05)`,
            border: `1px solid ${card.accent}30`,
            borderRadius: 14, padding: '20px 22px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: fgMuted, fontWeight: 500 }}>{card.label}</span>
              <span style={{ color: card.accent }}>{card.icon}</span>
            </div>
            <div style={{
              fontSize: card.isText ? 20 : 26, fontWeight: 700, color: card.accent,
              fontFamily: card.isText ? 'inherit' : "'DM Mono', monospace",
            }}>
              {card.value}
            </div>
            <div style={{ fontSize: 11, color: fgSubtle, marginTop: 4 }}>
              {card.label === t.trend ? t.lastDays(timeRange) : sensorData.unit}
            </div>
          </div>
        ))}
      </div>

      {/* Chart card */}
      <div style={{ background: panelBg, border: `1px solid ${panelBord}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: fg, margin: 0 }}>{t.visualization}</h2>
          <div style={{ display: 'flex', gap: 10 }}>
            <StyledSelect value={timeRange} onChange={e => setTimeRange(Number(e.target.value))} icon={<Calendar size={13} />} isDark={isDark} borderColor={panelBord}>
              <option value={7}>{t.last7}</option>
              <option value={14}>{t.last14}</option>
              <option value={30}>{t.last30}</option>
            </StyledSelect>
            <StyledSelect value={chartType} onChange={e => setChartType(e.target.value)} isDark={isDark} borderColor={panelBord}>
              <option value="area">{t.areaChart}</option>
              <option value="line">{t.lineChart}</option>
              <option value="bar">{t.barChart}</option>
            </StyledSelect>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {SENSOR_DATA.map((s, i) => {
            const meta   = t.sensors[i]
            const active = selectedIdx === i
            return (
              <button key={s.id} onClick={() => setSelectedIdx(i)} style={{
                background: active ? `${s.color}18` : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${active ? s.color + '60' : panelBord}`,
                borderRadius: 10, padding: '12px 14px', cursor: 'pointer',
                textAlign: 'left', transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: active ? s.color : fg, marginBottom: 2 }}>{meta.name}</div>
                <div style={{ fontSize: 11, color: fgMuted }}>{meta.category}</div>
                {active && <div style={{ marginTop: 6, width: 24, height: 2, background: s.color, borderRadius: 2 }} />}
              </button>
            )
          })}
        </div>

        <div style={{ background: chartInner, borderRadius: 12, padding: '20px 12px 12px', border: `1px solid ${chartBord}` }}>
          {renderChart()}
        </div>
      </div>

      {/* Export card */}
      <div style={{ background: panelBg, border: `1px solid ${panelBord}`, borderRadius: 16, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: fg, margin: 0 }}>{t.exportTitle}</h2>
            <p style={{ fontSize: 12, color: fgMuted, marginTop: 4 }}>{t.exportDesc}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <ExportBtn onClick={() => handleExport('csv')}  label={t.exportCsv}  isDark={isDark} borderColor={panelBord} fg={fg} />
            <ExportBtn onClick={() => handleExport('json')} label={t.exportJson} isDark={isDark} borderColor={panelBord} fg={fg} />
          </div>
        </div>
        <div style={{ background: exportBg, border: `1px solid ${panelBord}`, borderRadius: 10, padding: '16px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, fontSize: 13 }}>
            {[
              { label: t.labelSensor,     value: sensorMeta.name },
              { label: t.labelCategory,   value: sensorMeta.category },
              { label: t.labelDataPoints, value: sensorData.history.length },
              { label: t.labelStatus,     value: 'active', badge: true },
            ].map(item => (
              <div key={item.label}>
                <div style={{ color: fgMuted, fontSize: 11, marginBottom: 4 }}>{item.label}:</div>
                {item.badge ? (
                  <span style={{ background: '#10b98120', color: '#10b981', border: '1px solid #10b98140', borderRadius: 6, padding: '2px 10px', fontSize: 12 }}>
                    {item.value}
                  </span>
                ) : (
                  <div style={{ fontWeight: 600, color: fg }}>{item.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}