import { useState, useRef, useEffect, useCallback } from 'react'
import { useData } from '../context/DataContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Plus, Trash2, Filter, Clock, TrendingUp, Maximize2, Radio, FileBarChart, Workflow, ArrowRight, ArrowLeft } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Input } from '../components/ui/input'

const GRID_SIZE = 40
const NODE_WIDTH = 200
const NODE_HEIGHT = 100

const categoryColors = {
  'Air Quality': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/50' },
  'Water Quality': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/50' },
  'Soil Health': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/50' },
  'Biodiversity': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/50' },
  'Climate': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/50' },
}

const filterIcons = {
  filter: <Filter className="w-4 h-4" />,
  timestamp: <Clock className="w-4 h-4" />,
  aggregate: <TrendingUp className="w-4 h-4" />,
  normalize: <Maximize2 className="w-4 h-4" />,
}

function NodeComponent({ node, onDragStart, onDelete, onStartConnection, isSelected }) {
  const { sensors } = useData()
  const sensor = sensors.find(s => s.id === node.data.sensorId)

  const getNodeStyle = () => {
    if (node.type === 'sensor') {
      const colors = sensor ? categoryColors[sensor.category] || categoryColors['Air Quality'] : categoryColors['Air Quality']
      return { bg: colors.bg, border: colors.border, icon: <Radio className="w-4 h-4" /> }
    } else if (node.type === 'filter') {
      return { bg: 'bg-purple-500/10', border: 'border-purple-500/50', icon: filterIcons[node.data.filterType || 'filter'] }
    } else {
      return { bg: 'bg-blue-500/10', border: 'border-blue-500/50', icon: <FileBarChart className="w-4 h-4" /> }
    }
  }

  const style = getNodeStyle()

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, node.id)}
      className={`absolute cursor-move ${style.bg} ${style.border} border-2 rounded-lg shadow-lg transition-all hover:shadow-xl ${isSelected ? 'ring-2 ring-purple-500' : ''}`}
      style={{ left: `${node.position.x}px`, top: `${node.position.y}px`, width: `${NODE_WIDTH}px`, minHeight: `${NODE_HEIGHT}px` }}
    >
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1">
            <div className="mt-0.5">{style.icon}</div>
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-100 mb-1">{node.data.label}</div>
              {node.type === 'sensor' && sensor && (
                <div className="text-xs text-gray-400">{sensor.category}</div>
              )}
              {node.type === 'filter' && (
                <div className="text-xs text-purple-400 capitalize">{node.data.filterType}</div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => { e.stopPropagation(); onDelete(node.id) }}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-6 w-6 p-0"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full">
        <button
          onClick={(e) => { e.stopPropagation(); onStartConnection(node.id, 'input') }}
          className="flex items-center gap-1 bg-[#1e293b] border-2 border-green-500 rounded px-2 py-1 hover:bg-[#334155] transition-all"
        >
          <ArrowLeft className="w-3 h-3 text-green-400" />
          <span className="text-xs text-green-400 font-medium">IN</span>
        </button>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full">
        <button
          onClick={(e) => { e.stopPropagation(); onStartConnection(node.id, 'output') }}
          className="flex items-center gap-1 bg-[#1e293b] border-2 border-purple-500 rounded px-2 py-1 hover:bg-[#334155] transition-all"
        >
          <span className="text-xs text-purple-400 font-medium">OUT</span>
          <ArrowRight className="w-3 h-3 text-purple-400" />
        </button>
      </div>
    </div>
  )
}

export default function RefinePage() {
  const { sensors, flowNodes, flowConnections, addFlowNode, updateFlowNode, deleteFlowNode, addFlowConnection, deleteFlowConnection } = useData()
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [connectingFrom, setConnectingFrom] = useState(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newNodeType, setNewNodeType] = useState('filter')
  const [newFilterType, setNewFilterType] = useState('filter')
  const [newNodeLabel, setNewNodeLabel] = useState('')
  const canvasRef = useRef(null)

  const snapToGrid = useCallback((x, y) => ({
    x: Math.round(x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(y / GRID_SIZE) * GRID_SIZE,
  }), [])

  const handleDragStart = (e, nodeId) => {
    e.dataTransfer.setData('nodeId', nodeId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const nodeId = e.dataTransfer.getData('nodeId')
    if (!nodeId || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - NODE_WIDTH / 2
    const y = e.clientY - rect.top - NODE_HEIGHT / 2
    updateFlowNode(nodeId, { position: snapToGrid(x, y) })
  }

  const handleStartConnection = (nodeId, type) => {
    if (connectingFrom === null) {
      if (type === 'output') setConnectingFrom({ nodeId, type })
    } else {
      if (type === 'input' && nodeId !== connectingFrom.nodeId) {
        addFlowConnection({ id: `conn-${Date.now()}`, source: connectingFrom.nodeId, target: nodeId })
        setConnectingFrom(null)
      }
    }
  }

  const handleAddNode = () => {
    addFlowNode({
      id: `node-${Date.now()}`,
      type: newNodeType,
      position: { x: 400, y: 200 },
      data: {
        label: newNodeLabel || (newNodeType === 'filter' ? `${newFilterType} Filter` : 'Report Output'),
        filterType: newNodeType === 'filter' ? newFilterType : undefined,
      },
    })
    setShowAddDialog(false)
    setNewNodeLabel('')
  }

  const getNodeById = (id) => flowNodes.find(n => n.id === id)

  const getConnectionPoint = (node, type) => {
    if (type === 'output') return { x: node.position.x + NODE_WIDTH, y: node.position.y + NODE_HEIGHT / 2 }
    return { x: node.position.x, y: node.position.y + NODE_HEIGHT / 2 }
  }

  useEffect(() => {
    sensors.forEach((sensor, index) => {
      const existingNode = flowNodes.find(n => n.data.sensorId === sensor.id)
      if (!existingNode) {
        addFlowNode({
          id: `sensor-${sensor.id}`,
          type: 'sensor',
          position: snapToGrid(80, 80 + index * 160),
          data: { label: sensor.name, sensorId: sensor.id },
        })
      }
    })
  }, [sensors.length])

  return (
    <div className="flex h-[calc(100vh-65px)]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f1419] border-r border-gray-800 p-4 flex flex-col gap-4 overflow-auto">
        <div>
          <h2 className="font-semibold text-gray-100 mb-2">Refine Flow</h2>
          <p className="text-xs text-gray-400">Connect sensors to filters and create report outputs</p>
        </div>

        <Button onClick={() => setShowAddDialog(true)} className="bg-purple-600 hover:bg-purple-700 w-full">
          <Plus className="w-4 h-4 mr-2" /> Add Node
        </Button>

        {connectingFrom && (
          <Card className="p-3 bg-purple-500/10 border-purple-500/30">
            <p className="text-xs text-purple-400 mb-2 font-medium">Connection mode active</p>
            <p className="text-xs text-gray-400 mb-2">Click an IN port to connect</p>
            <Button size="sm" variant="outline" onClick={() => setConnectingFrom(null)} className="w-full text-xs border-gray-700">
              Cancel
            </Button>
          </Card>
        )}

        <div className="flex-1">
          <h3 className="text-xs font-semibold text-gray-300 mb-2 uppercase">Instructions</h3>
          <div className="space-y-2 text-xs text-gray-400 mb-4">
            <p>• Drag nodes to reposition</p>
            <p>• Click OUT port, then IN port to connect</p>
            <p>• Click × on line to delete connection</p>
          </div>

          <h3 className="text-xs font-semibold text-gray-300 mb-2 uppercase">Legend</h3>
          <div className="space-y-2 mb-4">
            <Card className="p-2 bg-green-500/10 border-green-500/30">
              <div className="flex items-center gap-2"><Radio className="w-3 h-3 text-green-400" /><span className="text-xs text-gray-300">Sensor Node</span></div>
            </Card>
            <Card className="p-2 bg-purple-500/10 border-purple-500/30">
              <div className="flex items-center gap-2"><Filter className="w-3 h-3 text-purple-400" /><span className="text-xs text-gray-300">Filter Node</span></div>
            </Card>
            <Card className="p-2 bg-blue-500/10 border-blue-500/30">
              <div className="flex items-center gap-2"><FileBarChart className="w-3 h-3 text-blue-400" /><span className="text-xs text-gray-300">Report Node</span></div>
            </Card>
          </div>

          <h3 className="text-xs font-semibold text-gray-300 mb-2 uppercase">Stats</h3>
          <div className="space-y-1 text-xs text-gray-400">
            <div className="flex justify-between"><span>Sensors:</span><span className="text-green-400">{flowNodes.filter(n => n.type === 'sensor').length}</span></div>
            <div className="flex justify-between"><span>Filters:</span><span className="text-purple-400">{flowNodes.filter(n => n.type === 'filter').length}</span></div>
            <div className="flex justify-between"><span>Reports:</span><span className="text-blue-400">{flowNodes.filter(n => n.type === 'report').length}</span></div>
            <div className="flex justify-between"><span>Connections:</span><span className="text-gray-300">{flowConnections.length}</span></div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="flex-1 bg-[#0a0e1a] relative overflow-auto"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0" style={{ width: '3000px', height: '2000px' }}>
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            <defs>
              <pattern id="grid-dots" width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
                <circle cx={GRID_SIZE / 2} cy={GRID_SIZE / 2} r="1.5" fill="#374151" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-dots)" />
          </svg>
        </div>

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-gray-600 pointer-events-none z-10">
          <Workflow className="w-5 h-5" />
          <span className="text-sm font-medium">Flow Canvas</span>
        </div>

        {/* Connections */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5, width: '3000px', height: '2000px' }}>
          {flowConnections.map((conn) => {
            const sourceNode = getNodeById(conn.source)
            const targetNode = getNodeById(conn.target)
            if (!sourceNode || !targetNode) return null
            const start = getConnectionPoint(sourceNode, 'output')
            const end = getConnectionPoint(targetNode, 'input')
            const distance = Math.abs(end.x - start.x)
            const controlOffset = Math.min(distance / 2, 100)
            return (
              <g key={conn.id}>
                <defs>
                  <linearGradient id={`gradient-${conn.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d={`M ${start.x} ${start.y} C ${start.x + controlOffset} ${start.y}, ${end.x - controlOffset} ${end.y}, ${end.x} ${end.y}`}
                  stroke={`url(#gradient-${conn.id})`}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <polygon points={`${end.x},${end.y} ${end.x - 8},${end.y - 5} ${end.x - 8},${end.y + 5}`} fill="#3b82f6" />
                <g
                  transform={`translate(${(start.x + end.x) / 2 - 12}, ${(start.y + end.y) / 2 - 12})`}
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  onClick={() => deleteFlowConnection(conn.id)}
                >
                  <circle cx="12" cy="12" r="12" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                  <text x="12" y="12" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="16" fontWeight="bold" style={{ pointerEvents: 'none' }}>×</text>
                </g>
              </g>
            )
          })}
        </svg>

        {/* Nodes */}
        <div className="relative" style={{ zIndex: 10, width: '3000px', height: '2000px' }}>
          {flowNodes.map((node) => (
            <NodeComponent
              key={node.id}
              node={node}
              onDragStart={handleDragStart}
              onDelete={deleteFlowNode}
              onStartConnection={handleStartConnection}
              isSelected={selectedNodeId === node.id}
            />
          ))}
        </div>

        {flowNodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center">
              <Workflow className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-100 mb-2">No nodes yet</h3>
              <p className="text-sm text-gray-400">Add sensors in the Record tab to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Node Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-[#131621] border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-100">Add Node</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Node Type</Label>
              <Select value={newNodeType} onValueChange={setNewNodeType}>
                <SelectTrigger className="bg-[#1e293b] border-gray-700 text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="filter">Filter</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newNodeType === 'filter' && (
              <div>
                <Label className="text-gray-300">Filter Type</Label>
                <Select value={newFilterType} onValueChange={setNewFilterType}>
                  <SelectTrigger className="bg-[#1e293b] border-gray-700 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="filter">Filter (Remove Outliers)</SelectItem>
                    <SelectItem value="aggregate">Aggregate (Combine Data)</SelectItem>
                    <SelectItem value="timestamp">Timestamp (Align Time)</SelectItem>
                    <SelectItem value="normalize">Normalize (Scale Values)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label className="text-gray-300">Label (Optional)</Label>
              <Input
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                placeholder={newNodeType === 'filter' ? 'e.g., CO2 Filter' : 'e.g., Monthly Report'}
                className="bg-[#1e293b] border-gray-700 text-gray-100"
              />
            </div>
            <Button onClick={handleAddNode} className="w-full bg-purple-600 hover:bg-purple-700">
              Add Node
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
