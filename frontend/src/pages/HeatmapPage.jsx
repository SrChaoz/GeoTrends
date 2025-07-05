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
    <div className="min-h-screen w-screen bg-gray-800">
      <Navbar />

      <main className="w-full px-2 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
          {/* Panel lateral */}
          <div className="lg:col-span-1 space-y-4">
            <SearchBar keyword={keyword} setKeyword={setKeyword} setHeatData={setHeatData} />
          </div>

          {/* Mapa y Leyenda */}
          <div className="lg:col-span-3 space-y-4">
            {/* Mapa */}
            <div className="bg-gray-700 rounded-2xl border border-gray-600 overflow-hidden w-full">
              <div className="p-4 border-b border-gray-600">
                <h2 className="text-xl font-semibold text-white">Mapa Interactivo</h2>
              </div>
              <div className="h-[500px] w-full">
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
