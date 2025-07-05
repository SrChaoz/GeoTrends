"use client"

import { useState } from "react"
import SearchBar from "../components/SearchBar"
import HeatmapMarkers from "../components/HeatmapMarkers"
import Legend from "../components/Legend"
import Navbar from "../components/Navbar"
import { MapContainer, TileLayer } from "react-leaflet"

export default function HeatmapPage() {
  const [keyword, setKeyword] = useState("")
  const [heatData, setHeatData] = useState({})

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />

      <main className="max-w-full mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel lateral */}
          <div className="lg:col-span-1 space-y-6">
            <SearchBar keyword={keyword} setKeyword={setKeyword} setHeatData={setHeatData} />
          </div>

          {/* Mapa y Leyenda */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mapa */}
            <div className="bg-gray-700 rounded-2xl border border-gray-600 overflow-hidden">
              <div className="p-4 border-b border-gray-600">
                <h2 className="text-xl font-semibold text-white">Mapa Interactivo</h2>
              </div>
              <div className="h-[400px] w-full">
                <MapContainer
                  center={[-1.8312, -78.1834]}
                  zoom={6}
                  className="h-full w-full"
                  style={{ backgroundColor: "#e5e7eb" }}
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    opacity={0.3}
                  />
                  <HeatmapMarkers heatData={heatData} />
                </MapContainer>
              </div>
            </div>

            {/* Leyenda */}
            <Legend maxValue={Object.keys(heatData).length > 0 ? Math.max(...Object.values(heatData)) : null} />
          </div>
        </div>
      </main>
    </div>
  )
}
