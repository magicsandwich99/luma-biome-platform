import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Plus, Radio, Upload, Trash2, MapPin } from 'lucide-react'
import { useData } from '../context/DataContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const categoryColors = {
  'Air Quality': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
  'Water Quality': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Soil Health': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  'Biodiversity': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'Climate': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' },
}

function AddSensorForm({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'automatic',
    dataSource: 'stream',
    category: 'Air Quality',
    unit: 'ppm',
    lat: 51.505,
    lng: -0.09,
  })

  function handleSubmit(e) {
    e.preventDefault()
    onAdd({
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      lat: formData.lat,
      lng: formData.lng,
      dataSource: formData.dataSource,
      status: 'active',
      category: formData.category,
      unit: formData.unit,
      lastReading: null,
    })
    setOpen(false)
    setFormData({ name: '', type: 'automatic', dataSource: 'stream', category: 'Air Quality', unit: 'ppm', lat: 51.505, lng: -0.09 })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20">
          <Plus className="w-4 h-4 mr-2" /> Add Sensor
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#131621] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Add New Sensor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-300">Sensor Name</Label>
            <Input
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Forest CO2 Monitor"
              className="bg-[#1e293b] border-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Type</Label>
              <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                <SelectTrigger className="bg-[#1e293b] border-gray-700 text-gray-100"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Data Source</Label>
              <Select value={formData.dataSource} onValueChange={v => setFormData({ ...formData, dataSource: v })}>
                <SelectTrigger className="bg-[#1e293b] border-gray-700 text-gray-100"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="stream">Stream</SelectItem>
                  <SelectItem value="upload">Upload</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Category</Label>
              <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                <SelectTrigger className="bg-[#1e293b] border-gray-700 text-gray-100"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Air Quality">Air Quality</SelectItem>
                  <SelectItem value="Water Quality">Water Quality</SelectItem>
                  <SelectItem value="Soil Health">Soil Health</SelectItem>
                  <SelectItem value="Biodiversity">Biodiversity</SelectItem>
                  <SelectItem value="Climate">Climate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Unit</Label>
              <Input
                value={formData.unit}
                onChange={e => setFormData({ ...formData, unit: e.target.value })}
                placeholder="e.g., ppm, pH, %"
                className="bg-[#1e293b] border-gray-700 text-gray-100"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Latitude</Label>
              <Input
                type="number"
                step="0.000001"
                value={formData.lat}
                onChange={e => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                className="bg-[#1e293b] border-gray-700 text-gray-100"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Longitude</Label>
              <Input
                type="number"
                step="0.000001"
                value={formData.lng}
                onChange={e => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                className="bg-[#1e293b] border-gray-700 text-gray-100"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20">
            Add Sensor
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function MapPage() {
  const { sensors, deleteSensor, addSensor } = useData()

  const center = sensors.length > 0
    ? [sensors[0].lat, sensors[0].lng]
    : [51.505, -0.09]

  return (
    <div className="flex h-[calc(100vh-65px)]">
      {/* Sidebar */}
      <div className="w-80 bg-[#0f1419] border-r border-gray-800 p-4 flex flex-col gap-4 overflow-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-100">Sensors</h2>
          <AddSensorForm onAdd={addSensor} />
        </div>

        <div className="text-sm text-gray-400 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          Manage your biodiversity sensors and monitoring stations
        </div>

        <div className="space-y-2">
          {sensors.map(sensor => {
            const colors = categoryColors[sensor.category] || categoryColors['Air Quality']
            return (
              <Card key={sensor.id} className="p-3 bg-[#131621] border-gray-800 hover:border-gray-700 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-sm text-gray-100">{sensor.name}</h3>
                      <Badge className={`text-xs ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {sensor.status}
                      </Badge>
                    </div>
                    <div className="space-y-1.5">
                      <div className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${colors.bg} ${colors.text} w-fit`}>
                        {sensor.type === 'automatic' ? <Radio className="w-3 h-3" /> : <Upload className="w-3 h-3" />}
                        <span className="capitalize">{sensor.type}</span>
                        <span>•</span>
                        <span>{sensor.category}</span>
                      </div>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {sensor.lat.toFixed(4)}, {sensor.lng.toFixed(4)}
                      </p>
                      {sensor.lastReading && (
                        <p className={`text-xs font-medium ${colors.text}`}>
                          Last: {sensor.lastReading} {sensor.unit}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSensor(sensor.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {/* Legend */}
        <div className="absolute top-4 right-4 z-[1000] bg-[#131621] border border-gray-800 shadow-xl rounded-lg p-4 max-w-xs">
          <h3 className="font-semibold text-sm text-gray-100 mb-2">Sensor Map</h3>
          <p className="text-xs text-gray-400 mb-3">
            Geographic distribution of {sensors.length} active monitoring {sensors.length === 1 ? 'station' : 'stations'}
          </p>
          {Object.entries(categoryColors).map(([type, colors]) => (
            <div key={type} className="flex items-center gap-2 mb-1.5">
              <div className={`w-2 h-2 rounded-full ${colors.bg.replace('/10', '')} shadow-sm`} />
              <span className="text-xs text-gray-400">{type}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="absolute bottom-4 left-4 z-[1000] flex gap-3">
          <div className="bg-[#131621] border border-gray-800 shadow-xl rounded-lg px-4 py-3">
            <div className="text-2xl font-bold text-green-400">{sensors.filter(s => s.status === 'active').length}</div>
            <div className="text-xs text-gray-400">Active Sensors</div>
          </div>
          <div className="bg-[#131621] border border-gray-800 shadow-xl rounded-lg px-4 py-3">
            <div className="text-2xl font-bold text-purple-400">{sensors.length}</div>
            <div className="text-xs text-gray-400">Total Sensors</div>
          </div>
        </div>

        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sensors.map(sensor => (
            <Marker key={sensor.id} position={[sensor.lat, sensor.lng]}>
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{sensor.name}</div>
                  <div className="text-gray-500">{sensor.category}</div>
                  <div className="text-gray-500 capitalize">{sensor.type}</div>
                  {sensor.lastReading && (
                    <div className="mt-1 font-medium">Last: {sensor.lastReading} {sensor.unit}</div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}