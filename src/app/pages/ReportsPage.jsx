import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Download, TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { format } from 'date-fns'

const categoryColors = {
  'Air Quality': '#10b981',
  'Water Quality': '#3b82f6',
  'Soil Health': '#f59e0b',
  'Biodiversity': '#8b5cf6',
  'Climate': '#ec4899',
}

export default function ReportsPage() {
  const { sensors } = useData()
  const [selectedSensorId, setSelectedSensorId] = useState(sensors[0]?.id?.toString() || '')
  const [chartType, setChartType] = useState('area')
  const [timeRange, setTimeRange] = useState('30')

  const selectedSensor = sensors.find(s => s.id?.toString() === selectedSensorId)

  function handleExport(exportFormat) {
    if (!selectedSensor || !selectedSensor.dataHistory?.length) return

    const data = selectedSensor.dataHistory.map(entry => ({
      timestamp: entry.timestamp instanceof Date ? entry.timestamp.toISOString() : entry.timestamp,
      value: entry.value,
      sensor: selectedSensor.name,
      unit: selectedSensor.unit,
    }))

    if (exportFormat === 'csv') {
      const csv = [
        ['Timestamp', 'Value', 'Sensor', 'Unit'],
        ...data.map(row => [row.timestamp, row.value, row.sensor, row.unit]),
      ].map(row => row.join(',')).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${selectedSensor.name.replace(/\s+/g, '_')}_${Date.now()}.csv`
      a.click()
    } else {
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${selectedSensor.name.replace(/\s+/g, '_')}_${Date.now()}.json`
      a.click()
    }
  }

  function calculateStats() {
    if (!selectedSensor || !selectedSensor.dataHistory?.length) {
      return { avg: 0, min: 0, max: 0, trend: 'stable' }
    }
    const values = selectedSensor.dataHistory.map(d => d.value)
    const avg = values.reduce((a, b) => a + b, 0) / values.length
    const min = Math.min(...values)
    const max = Math.max(...values)
    const midpoint = Math.floor(values.length / 2)
    const firstHalfAvg = values.slice(0, midpoint).reduce((a, b) => a + b, 0) / midpoint
    const secondHalfAvg = values.slice(midpoint).reduce((a, b) => a + b, 0) / (values.length - midpoint)
    const trend = secondHalfAvg > firstHalfAvg * 1.05 ? 'up' : secondHalfAvg < firstHalfAvg * 0.95 ? 'down' : 'stable'
    return { avg, min, max, trend }
  }

  const stats = calculateStats()

  const chartData = selectedSensor?.dataHistory?.length
    ? selectedSensor.dataHistory.slice(-parseInt(timeRange)).map(entry => ({
        date: format(entry.timestamp instanceof Date ? entry.timestamp : new Date(entry.timestamp), 'MMM dd'),
        value: parseFloat(entry.value.toFixed(2)),
      }))
    : []

  const sensorColor = selectedSensor ? categoryColors[selectedSensor.category] || '#10b981' : '#10b981'

  const tooltipStyle = {
    contentStyle: { backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px', color: '#e5e7eb' },
    labelStyle: { color: '#9ca3af' },
  }

  function renderChart() {
    const commonProps = { data: chartData, margin: { top: 5, right: 30, left: 20, bottom: 5 } }

    if (chartType === 'line') return (
      <ResponsiveContainer width="100%" height={350}>
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ color: '#9ca3af' }} />
          <Line type="monotone" dataKey="value" stroke={sensorColor} strokeWidth={3} dot={{ fill: sensorColor, r: 4 }} activeDot={{ r: 6 }} name={selectedSensor?.unit || 'Value'} />
        </LineChart>
      </ResponsiveContainer>
    )

    if (chartType === 'bar') return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart {...commonProps}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sensorColor} stopOpacity={0.8} />
              <stop offset="100%" stopColor={sensorColor} stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ color: '#9ca3af' }} />
          <Bar dataKey="value" fill="url(#barGradient)" name={selectedSensor?.unit || 'Value'} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )

    return (
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sensorColor} stopOpacity={0.6} />
              <stop offset="100%" stopColor={sensorColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ color: '#9ca3af' }} />
          <Area type="monotone" dataKey="value" stroke={sensorColor} strokeWidth={2} fill="url(#areaGradient)" name={selectedSensor?.unit || 'Value'} />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-semibold text-gray-100 mb-1">Reports & Analytics</h1>
        <p className="text-sm text-gray-400">Visualize trends and export data from your sensors</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Average</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">{stats.avg.toFixed(2)}</div>
          <div className="text-xs text-gray-400 mt-1">{selectedSensor?.unit || ''}</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Minimum</span>
            <TrendingDown className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">{stats.min.toFixed(2)}</div>
          <div className="text-xs text-gray-400 mt-1">{selectedSensor?.unit || ''}</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Maximum</span>
            <TrendingUp className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-orange-400">{stats.max.toFixed(2)}</div>
          <div className="text-xs text-gray-400 mt-1">{selectedSensor?.unit || ''}</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Trend</span>
            {stats.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-400" /> : stats.trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-400" /> : <Minus className="w-4 h-4 text-gray-400" />}
          </div>
          <div className={`text-2xl font-bold capitalize ${stats.trend === 'up' ? 'text-green-400' : stats.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>{stats.trend}</div>
          <div className="text-xs text-gray-400 mt-1">Last {timeRange} days</div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6 mb-6 bg-[#131621] border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-100">Sensor Data Visualization</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 h-8 bg-[#1e293b] border-gray-700 text-gray-100"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="14">Last 14 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-32 h-8 bg-[#1e293b] border-gray-700 text-gray-100"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4">
          <Select value={selectedSensorId} onValueChange={setSelectedSensorId}>
            <SelectTrigger className="w-full bg-[#1e293b] border-gray-700 text-gray-100"><SelectValue /></SelectTrigger>
            <SelectContent>
              {sensors.map(sensor => (
                <SelectItem key={sensor.id} value={sensor.id?.toString()}>
                  <div className="flex items-center gap-2">
                    <span>{sensor.name}</span>
                    <Badge className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">{sensor.category}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedSensor && chartData.length > 0 ? (
          <div className="bg-[#0a0e1a] rounded-lg p-4 border border-gray-800">{renderChart()}</div>
        ) : (
          <div className="text-center py-16 text-gray-400">No data available for selected sensor</div>
        )}
      </Card>

      {/* Export */}
      <Card className="p-6 bg-[#131621] border-gray-800 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-100 mb-1">Export Data</h2>
            <p className="text-sm text-gray-400">Download sensor data for external analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => handleExport('csv')} variant="outline" disabled={!selectedSensor} className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
            <Button onClick={() => handleExport('json')} variant="outline" disabled={!selectedSensor} className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Download className="w-4 h-4 mr-2" /> Export JSON
            </Button>
          </div>
        </div>
        {selectedSensor && (
          <div className="bg-[#1e293b] rounded-lg p-4 border border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-gray-400">Sensor:</span><p className="font-medium text-gray-100">{selectedSensor.name}</p></div>
              <div><span className="text-gray-400">Category:</span><p className="font-medium text-gray-100">{selectedSensor.category}</p></div>
              <div><span className="text-gray-400">Data Points:</span><p className="font-medium text-gray-100">{selectedSensor.dataHistory?.length || 0}</p></div>
              <div>
                <span className="text-gray-400">Status:</span>
                <Badge className={`mt-1 block w-fit ${selectedSensor.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                  {selectedSensor.status}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* All sensors overview */}
      <Card className="p-6 bg-[#131621] border-gray-800">
        <h2 className="font-semibold text-gray-100 mb-4">All Sensors Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sensors.map(sensor => {
            const color = categoryColors[sensor.category] || '#10b981'
            return (
              <Card key={sensor.id} className="p-4 bg-[#1e293b] border-gray-700 hover:border-gray-600 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-sm text-gray-100 mb-1">{sensor.name}</h3>
                    <Badge style={{ backgroundColor: `${color}20`, color, borderColor: `${color}50` }}>
                      {sensor.category}
                    </Badge>
                  </div>
                  <Badge className={sensor.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}>
                    {sensor.status}
                  </Badge>
                </div>
                {sensor.lastReading && (
                  <div className="mb-2">
                    <span className="text-2xl font-bold" style={{ color }}>{sensor.lastReading}</span>
                    <span className="text-sm text-gray-400 ml-1">{sensor.unit}</span>
                  </div>
                )}
                <div className="text-xs text-gray-400">{sensor.dataHistory?.length || 0} data points</div>
              </Card>
            )
          })}
        </div>
      </Card>
    </div>
  )
}