// frontend/src/components/Navbar.jsx
"use client"

import { useState, useEffect } from "react"
import logo from "./images/geotrendslogo.png"

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo y marca */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 overflow-hidden rounded-2xl bg-gradient-to-br from-ecuador-400 to-ecuador-600 p-2 shadow-lg">
              <img
                src={logo}
                alt="GeoTrends Logo"
                width={56}
                height={56}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white">
                Geo<span className="text-ecuador-300">Trends</span>
              </h1>
              <p className="text-white/60 text-sm">
                Tendencias Geográficas de Ecuador
              </p>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-4">
            {/* Indicador de estado */}
            <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-medium">En línea</span>
            </div>

            {/* Botón de información */}
            <button
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 hover:scale-105 group"
              title="Acerca de GeoTrends"
            >
              <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Toggle tema */}
            <button
              onClick={toggle}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 hover:scale-105 group"
              aria-label="Cambiar tema"
              title={isDark ? "Modo claro" : "Modo oscuro"}
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-300 group-hover:text-yellow-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.343 6.343l-1.414-1.414m12.728 0l-1.414 1.414M6.343 17.657l-1.414 1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>

            {/* Menú hamburguesa para móvil */}
            <button className="md:hidden p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200">
              <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Información adicional en móvil */}
        <div className="sm:hidden mt-4 pt-4 border-t border-white/10">
          <h1 className="text-xl font-bold text-white">
            Geo<span className="text-ecuador-300">Trends</span>
          </h1>
          <p className="text-white/60 text-sm">
            Tendencias Geográficas de Ecuador
          </p>
        </div>
      </div>
    </nav>
  )
}
