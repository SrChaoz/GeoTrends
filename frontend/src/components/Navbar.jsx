// frontend/src/components/Navbar.jsx
"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import logo from "./images/geotrendslogo.png"

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  useEffect(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      const darkMode = savedTheme === 'dark';
      setIsDark(darkMode);
      document.documentElement.classList.toggle('dark', darkMode);
    } else {
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, [])

  const toggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }

  return (
    <nav className="bg-white/10 dark:bg-white/90 backdrop-blur-md border-b border-white/20 dark:border-gray-200 shadow-2xl">
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
              <h1 className="text-2xl font-bold text-white dark:text-gray-900">
                Geo<span className="text-ecuador-300 dark:text-ecuador-600">Trends</span>
              </h1>
              <p className="text-white/60 dark:text-gray-600 text-sm">
                Tendencias Geográficas de Ecuador
              </p>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-4">
            {/* Indicador de estado */}
            <div className="hidden md:flex items-center gap-2 bg-white/10 dark:bg-gray-100 backdrop-blur-sm px-4 py-2 rounded-xl border dark:border-gray-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 dark:text-gray-700 text-sm font-medium">En línea</span>
            </div>

            {/* Botón de información */}
            <button
              onClick={() => setShowAboutModal(true)}
              className="p-3 rounded-xl bg-white/10 dark:bg-gray-100 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-gray-200 transition-all duration-200 hover:scale-105 group border dark:border-gray-200"
              title="Acerca de GeoTrends"
            >
              <svg className="w-5 h-5 text-white/80 dark:text-gray-700 group-hover:text-white dark:group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Toggle tema */}
            <button
              onClick={toggle}
              className="p-3 rounded-xl bg-white/10 dark:bg-gray-100 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-gray-200 transition-all duration-200 hover:scale-105 group border dark:border-gray-200"
              aria-label="Cambiar tema"
              title={isDark ? "Modo claro" : "Modo oscuro"}
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-300 dark:text-yellow-600 group-hover:text-yellow-200 dark:group-hover:text-yellow-700 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.343 6.343l-1.414-1.414m12.728 0l-1.414 1.414M6.343 17.657l-1.414 1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white/80 dark:text-gray-700 group-hover:text-white dark:group-hover:text-gray-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>

            {/* Menú hamburguesa para móvil */}
            <button className="md:hidden p-3 rounded-xl bg-white/10 dark:bg-gray-100 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-gray-200 transition-all duration-200 border dark:border-gray-200">
              <svg className="w-5 h-5 text-white/80 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Información adicional en móvil */}
        <div className="sm:hidden mt-4 pt-4 border-t border-white/10 dark:border-gray-200">
          <h1 className="text-xl font-bold text-white dark:text-gray-900">
            Geo<span className="text-ecuador-300 dark:text-ecuador-600">Trends</span>
          </h1>
          <p className="text-white/60 dark:text-gray-600 text-sm">
            Tendencias Geográficas de Ecuador
          </p>
        </div>
      </div>

      {/* Modal "Acerca de GeoTrends" renderizado como Portal */}
      {showAboutModal && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 dark:border-gray-700">
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-ecuador-500 to-ecuador-600 dark:from-ecuador-400 dark:to-ecuador-500 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Geo<span className="text-ecuador-200">Trends</span>
                    </h2>
                    <p className="text-ecuador-100 text-sm">Versión 1.0.0</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-105"
                  title="Cerrar"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 space-y-6">
              {/* Descripción Principal */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  🗺️ Plataforma de Análisis de Tendencias Geográficas
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  GeoTrends es una herramienta innovadora que te permite explorar y visualizar las tendencias de búsqueda más populares en cada provincia del Ecuador de manera interactiva y en tiempo real.
                </p>
              </div>

              {/* Características Principales */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-blue-800 dark:text-blue-200">Análisis en Tiempo Real</h4>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Obtén datos actualizados sobre las tendencias de búsqueda más relevantes en Ecuador.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-2xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-green-800 dark:text-green-200">Visualización Interactiva</h4>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Mapa de calor interactivo que muestra la intensidad de las tendencias por provincia.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-2xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-purple-800 dark:text-purple-200">Búsqueda Inteligente</h4>
                  </div>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    Filtra por categorías, períodos de tiempo y obtén sugerencias automáticas.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-2xl border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-orange-800 dark:text-orange-200">Insights Profundos</h4>
                  </div>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">
                    Comprende patrones regionales y toma decisiones informadas basadas en datos.
                  </p>
                </div>
              </div>

              {/* Casos de Uso */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-ecuador-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  ¿Para qué puedes usar GeoTrends?
                </h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-ecuador-400 rounded-full"></span>
                    <strong>Marketing Digital:</strong> Identifica oportunidades regionales para campañas publicitarias
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-ecuador-400 rounded-full"></span>
                    <strong>Investigación de Mercado:</strong> Analiza el interés por productos/servicios por región
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-ecuador-400 rounded-full"></span>
                    <strong>Planificación Estratégica:</strong> Toma decisiones basadas en datos geográficos reales
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-ecuador-400 rounded-full"></span>
                    <strong>Análisis de Tendencias:</strong> Descubre qué buscan los ecuatorianos en cada provincia
                  </li>
                </ul>
              </div>

              {/* Footer del Modal */}
              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Desarrollado con ❤️ para Ecuador | Datos en tiempo real via Google Trends
                </p>
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="bg-gradient-to-r from-ecuador-500 to-ecuador-600 hover:from-ecuador-600 hover:to-ecuador-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  ¡Entendido!
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </nav>
  )
}
