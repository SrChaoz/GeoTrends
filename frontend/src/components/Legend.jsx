const Legend = ({ maxValue }) => {
  const items = [
    { color: "#f59e0b", label: "Alto" },
    { color: "#fbbf24", label: "Medio" },
    { color: "#9ca3af", label: "Bajo" },
    { color: "#6b7280", label: "Sin Datos" },
  ]

  return (
    <div className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Leyenda</h3>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: it.color }} />
            <span className="text-gray-800 dark:text-gray-300 font-medium">{it.label}</span>
          </div>
        ))}
      </div>
      {maxValue && (
        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Valor máximo: <span className="font-semibold text-gray-800 dark:text-white">{maxValue}</span>
          </p>
        </div>
      )}
    </div>
)
}

export default Legend
