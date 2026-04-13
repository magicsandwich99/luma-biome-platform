import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DataProvider } from './app/context/DataContext'
import MapPage from './app/pages/MapPage'
import RefinePage from './app/pages/RefinePage'
import ReportsPage from './app/pages/ReportsPage'
import HomePage from './app/pages/HomePage'
import { Map, GitBranch, BarChart2, Home } from 'lucide-react'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#0f1117] text-white flex flex-col">
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center font-bold text-black text-sm">L</div>
                <div>
                  <div className="font-semibold text-white">LUMA Biome Platform</div>
                  <div className="text-xs text-white/50">Biodiversity & Sustainability Data</div>
                </div>
              </div>
              <nav className="flex items-center gap-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-green-500 text-black font-medium' : 'text-white/60 hover:text-white hover:bg-white/10'}`
                  }
                >
                  <Home size={16} /> Home
                </NavLink>
                <NavLink
                  to="/record"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-green-500 text-black font-medium' : 'text-white/60 hover:text-white hover:bg-white/10'}`
                  }
                >
                  <Map size={16} /> Record
                </NavLink>
                <NavLink
                  to="/refine"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-green-500 text-black font-medium' : 'text-white/60 hover:text-white hover:bg-white/10'}`
                  }
                >
                  <GitBranch size={16} /> Refine
                </NavLink>
                <NavLink
                  to="/reports"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-green-500 text-black font-medium' : 'text-white/60 hover:text-white hover:bg-white/10'}`
                  }
                >
                  <BarChart2 size={16} /> Report
                </NavLink>
              </nav>
            </header>
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/record" element={<MapPage />} />
                <Route path="/refine" element={<RefinePage />} />
                <Route path="/reports" element={<ReportsPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </DataProvider>
    </QueryClientProvider>
  )
}
