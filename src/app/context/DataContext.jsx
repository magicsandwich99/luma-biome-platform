import { createContext, useContext, useState } from 'react'

const DataContext = createContext(null)

const INITIAL_SENSORS = [
  { id: 1, name: 'Forest CO2 Monitor', type: 'Air Quality', category: 'Air Quality', mode: 'Automatic', status: 'active', lat: 51.5050, lng: -0.0900, lastReading: '412 ppm' },
  { id: 2, name: 'River pH Sensor', type: 'Water Quality', category: 'Water Quality', mode: 'Automatic', status: 'active', lat: 51.5150, lng: -0.1000, lastReading: '7.2 pH' },
  { id: 3, name: 'Wildlife Camera', type: 'Biodiversity', category: 'Biodiversity', mode: 'Manual', status: 'active', lat: 51.5200, lng: -0.0800, lastReading: '23 species count' },
  { id: 4, name: 'Soil Moisture Station', type: 'Soil Health', category: 'Soil Health', mode: 'Automatic', status: 'active', lat: 51.5100, lng: -0.1200, lastReading: '34%' },
]

export function DataProvider({ children }) {
  const [sensors, setSensors] = useState(INITIAL_SENSORS)
  const [flowNodes, setFlowNodes] = useState([])
  const [flowConnections, setFlowConnections] = useState([])

  function addSensor(sensor) {
    setSensors(prev => [...prev, { ...sensor, id: Date.now(), status: 'active', category: sensor.type }])
  }

  function deleteSensor(id) {
    setSensors(prev => prev.filter(s => s.id !== id))
  }

  function addFlowNode(node) {
    setFlowNodes(prev => {
      if (prev.find(n => n.id === node.id)) return prev
      return [...prev, node]
    })
  }

  function updateFlowNode(nodeId, updates) {
    setFlowNodes(prev => prev.map(n => n.id === nodeId ? { ...n, ...updates } : n))
  }

  function deleteFlowNode(nodeId) {
    setFlowNodes(prev => prev.filter(n => n.id !== nodeId))
    setFlowConnections(prev => prev.filter(c => c.source !== nodeId && c.target !== nodeId))
  }

  function addFlowConnection(connection) {
    setFlowConnections(prev => {
      if (prev.find(c => c.source === connection.source && c.target === connection.target)) return prev
      return [...prev, connection]
    })
  }

  function deleteFlowConnection(connId) {
    setFlowConnections(prev => prev.filter(c => c.id !== connId))
  }

  return (
    <DataContext.Provider value={{
      sensors, addSensor, deleteSensor,
      flowNodes, flowConnections,
      addFlowNode, updateFlowNode, deleteFlowNode,
      addFlowConnection, deleteFlowConnection
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
