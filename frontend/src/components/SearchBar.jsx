"use client"

import { useState } from "react"
import { fetchTrends } from "../services/apiService"

export default function SearchBar({ keyword, setKeyword, setHeatData }) {
  const [loading, setLoading] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!keyword.trim()) return

    setLoading(true)
    try {
      const data = await fetchTrends(keyword)
      setHeatData(data)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const themes = [
    { value: "turismo", label: "🏖️ Turismo", color: "from-blue-500 to-cyan-500" },
    { value: "comida", label: "🍽️ Comida", color: "from-orange-500 to-red-500" },
    { value: "tecnologia", label: "💻 Tecnología", color: "from-purple-500 to-pink-500" },
    { value: "deportes", label: "⚽ Deportes", color: "from-green-500 to-emerald-500" },
    { value: "musica", label: "🎵 Música", color: "from-indigo-500 to-purple-500" },
    { value: "educacion", label: "📚 Educación", color: "from-yellow-500 to-orange-500" },
  ]

  const periods = [
    { value: "week", label: "Última Semana" },
    { value: "month", label: "Último Mes" },
    { value: "quarter", label: "Último Trimestre" },
    { value: "year", label: "Último Año" },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-ecuador-400 to-ecuador-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
          Filtros de Búsqueda
        </h2>
        <p className="text-white/70 text-sm">
          Personaliza tu búsqueda de tendencias
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tema de Interés */}
        <div className="space-y-3">
          <label htmlFor="tema" className="block text-sm font-semibold text-white">
            Tema de Interés
          </label>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.value}
                type="button"
                onClick={() => setSelectedTheme(theme.value)}
                disabled={loading}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedTheme === theme.value
                    ? `bg-gradient-to-r ${theme.color} text-white scale-105 shadow-lg`
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:scale-102'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>

        {/* Producto/Término */}
        <div className="space-y-3">
          <label htmlFor="producto" className="block text-sm font-semibold text-white">
            Término de Búsqueda
          </label>
          <div className="relative">
            <input
              id="producto"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              disabled={loading}
              placeholder="Ej: iPhone, pizza, fútbol..."
              className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ecuador-400 focus:border-transparent transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Período */}
        <div className="space-y-3">
          <label htmlFor="periodo" className="block text-sm font-semibold text-white">
            Período de Análisis
          </label>
          <div className="grid grid-cols-2 gap-2">
            {periods.map((period) => (
              <button
                key={period.value}
                type="button"
                onClick={() => setSelectedPeriod(period.value)}
                disabled={loading}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedPeriod === period.value
                    ? 'bg-ecuador-500 text-white scale-105 shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:scale-102'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botón de búsqueda */}
        <button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-ecuador-500 to-ecuador-600 hover:from-ecuador-600 hover:to-ecuador-700 text-white disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg disabled:scale-100"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analizando Tendencias...
            </>
          ) : (
            <>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Buscar Tendencias
            </>
          )}
        </button>

        {/* Indicador de estado */}
        {keyword && !loading && (
          <div className="text-center text-white/70 text-sm">
            <span className="inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Listo para buscar: <span className="font-semibold">"{keyword}"</span>
            </span>
          </div>
        )}
      </form>
    </div>
  )
}
