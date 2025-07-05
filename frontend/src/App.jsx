import { Routes, Route } from "react-router-dom"
import HeatmapPage from "./pages/HeatmapPage"

export default function App() {
  return (
    <div className="min-h-screen">
      <main>
        <Routes>
          <Route path="/" element={<HeatmapPage />} />
        </Routes>
      </main>
    </div>
  )
}
