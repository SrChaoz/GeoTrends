"use client"

import { useState } from "react"

export default function SearchBar({ keyword, setKeyword, setHeatData }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!keyword.trim()) return

    setLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/trends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: keyword.trim() }),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setHeatData(data)
    } catch (error) {
      console.error("Error fetching trends:", error)
      alert("Error al obtener las tendencias: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-700 rounded-2xl p-6 border border-gray-600">
      <h2 className="text-xl font-semibold text-white mb-6">Seleccion de Datos</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="tema" className="block text-sm font-medium text-gray-300 mb-3">
            Tema de Interes
          </label>
          <select
            id="tema"
            className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 1rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "3rem",
            }}
            disabled={loading}
          >
            <option>Seleccionar Tema de Interes</option>
            <option value="turismo">Turismo</option>
            <option value="comida">Comida</option>
            <option value="tecnologia">Tecnología</option>
            <option value="deportes">Deportes</option>
          </select>
        </div>

        <div>
          <label htmlFor="producto" className="block text-sm font-medium text-gray-300 mb-3">
            Producto
          </label>
          <input
            type="text"
            id="producto"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Seleccionar Producto"
            className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="periodo" className="block text-sm font-medium text-gray-300 mb-3">
            Periodo
          </label>
          <select
            id="periodo"
            className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 1rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "3rem",
            }}
            disabled={loading}
          >
            <option>Ultimo Mes</option>
            <option value="week">Última Semana</option>
            <option value="month">Último Mes</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Año</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Aplicando...
            </>
          ) : (
            "Aplicar Filtros"
          )}
        </button>
      </form>
    </div>
  )
}
