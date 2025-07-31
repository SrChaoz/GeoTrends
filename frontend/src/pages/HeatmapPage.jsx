"use client"

import { useState } from "react"
import SearchBar from "../components/SearchBar"
import EcuadorHeatmapLayer from "../components/EcuadorHeatmapLayer"
import Legend from "../components/Legend"
import Navbar from "../components/Navbar"
import { MapContainer, TileLayer } from "react-leaflet"

export default function HeatmapPage() {
  const [keyword, setKeyword] = useState("")
  const [heatData, setHeatData] = useState({})

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-blue-50 dark:via-white dark:to-blue-50">
      <Navbar />

      <main className="w-full px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Panel lateral para búsqueda */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-1">
              <SearchBar 
                keyword={keyword} 
                setKeyword={setKeyword} 
                setHeatData={setHeatData} 
              />
            </div>

            {/* Mapa principal */}
            <div className="xl:col-span-3">
              <div className="bg-white/10 dark:bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-200 overflow-hidden shadow-2xl h-[700px] lg:h-[830px] flex flex-col">
                <div className="px-6 py-4 bg-gradient-to-r from-ecuador-500 to-ecuador-600 dark:from-ecuador-400 dark:to-ecuador-500 border-b border-white/20 dark:border-gray-200">
                  <h2 className="text-2xl font-bold text-white dark:text-white flex items-center gap-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Mapa de Tendencias - Ecuador
                  </h2>
                  <p className="text-ecuador-100 dark:text-white text-sm mt-1">
                    Explora las tendencias por provincia
                  </p>
                </div>
                
                <div className="flex-1 w-full relative">
                  <MapContainer
                    center={[-1.8312, -78.1834]} // Centro de Ecuador
                    zoom={7}
                    minZoom={6}
                    maxZoom={10}
                    className="h-full w-full rounded-b-3xl"
                    style={{ backgroundColor: "#f8fafc" }}
                    zoomControl={false}
                    attributionControl={false}
                  >
                    {/* Capa base sutil para contexto */}
                    <TileLayer
                      attribution=""
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      opacity={0.4}
                    />
                    
                    {/* Capa de provincias de Ecuador con datos de heat */}
                    <EcuadorHeatmapLayer heatData={heatData} />
                  </MapContainer>
                  
                  {/* Controles personalizados */}
                  <div className="absolute top-4 right-4 z-[1000] space-y-2">
                    <button 
                      className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white/100 transition-all duration-200 hover:scale-105"
                      onClick={() => window.location.reload()}
                      title="Reiniciar vista"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>

                  {/* Indicador de datos */}
                  {Object.keys(heatData).length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-[999]">
                      <div className="bg-white/90 dark:bg-white/95 backdrop-blur-sm p-8 rounded-2xl text-center shadow-2xl">
                        <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-800 mb-2">
                          Busca una tendencia
                        </h3>
                        <p className="text-gray-500 dark:text-gray-600">
                          Ingresa un término para ver los datos en el mapa
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Leyenda horizontal abajo del mapa */}
          <div className="w-full">
            <Legend 
              maxValue={Object.keys(heatData).length > 0 ? Math.max(...Object.values(heatData)) : null} 
              horizontal={true}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
