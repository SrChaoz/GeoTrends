const Legend = ({ maxValue }) => {
  const legendItems = [
    { color: "#f59e0b", label: "Alto" }, // Orange/Yellow
    { color: "#fbbf24", label: "Medio" }, // Light Orange
    { color: "#9ca3af", label: "Bajo" }, // Gray
    { color: "#6b7280", label: "Sin Datos" }, // Dark Gray
  ]

  return (
    <div className="bg-gray-700 rounded-2xl p-6 border border-gray-600">
      <h3 className="text-xl font-semibold text-white mb-4">Leyenda</h3>
      <div className="space-y-3">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-gray-300 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      {maxValue && (
        <div className="mt-4 pt-4 border-t border-gray-600">
          <p className="text-sm text-gray-400">
            Valor máximo: <span className="font-semibold text-white">{maxValue}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default Legend
