"use client"

import { useState } from "react"
import { fetchTrends } from "../services/apiService"

export default function SearchBar({ keyword, setKeyword, setHeatData }) {
  const [loading, setLoading] = useState(false)

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

  return (
    <div className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-6">
        Seleccion de Datos
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tema de Interes */}
        <div>
          <label htmlFor="tema" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-3">
            Tema de Interes
          </label>
          <select
            id="tema"
            disabled={loading}
            className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-white border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 1rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            <option>Seleccionar Tema de Interes</option>
            <option value="turismo">Turismo</option>
            <option value="comida">Comida</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="deportes">Deportes</option>
          </select>
        </div>

        {/* Producto */}
        <div>
          <label htmlFor="producto" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-3">
            Producto
          </label>
          <input
            id="producto"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            disabled={loading}
            placeholder="Seleccionar Producto"
            className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-white placeholder-gray-400 border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Periodo */}
        <div>
          <label htmlFor="periodo" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-3">
            Periodo
          </label>
          <select
            id="periodo"
            disabled={loading}
            className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-white border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 1rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            <option>Ultimo Mes</option>
            <option value="week">Ultima Semana</option>
            <option value="month">Ultimo Mes</option>
            <option value="quarter">Ultimo Trimestre</option>
            <option value="year">Ultimo Ano</option>
          </select>
        </div>

        {/* Boton */}
        <button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="w-full py-3 px-4 rounded-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
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
