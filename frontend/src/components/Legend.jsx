const Legend = ({ maxValue, horizontal = false }) => {
  const legendItems = [
    { 
      color: "#0d47a1", 
      label: "Muy Alto", 
      range: "80-100%",
      gradient: "from-blue-800 to-blue-900"
    },
    { 
      color: "#1976d2", 
      label: "Alto", 
      range: "60-80%",
      gradient: "from-blue-600 to-blue-700"
    },
    { 
      color: "#29b6f6", 
      label: "Medio", 
      range: "40-60%",
      gradient: "from-blue-400 to-blue-500"
    },
    { 
      color: "#81d4fa", 
      label: "Bajo", 
      range: "20-40%",
      gradient: "from-blue-200 to-blue-300"
    },
    { 
      color: "#e0f2fe", 
      label: "Muy Bajo", 
      range: "0-20%",
      gradient: "from-blue-50 to-blue-100"
    },
    { 
      color: "#64748b", 
      label: "Sin Datos", 
      range: "0%",
      gradient: "from-gray-400 to-gray-500"
    },
  ];

  if (horizontal) {
    return (
      <div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 dark:bg-gradient-to-r dark:from-white/95 dark:via-gray-50/95 dark:to-white/95 backdrop-blur-xl border border-white/10 dark:border-gray-200 rounded-3xl p-8 shadow-2xl">
        {/* Header elegante */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-ecuador-400 to-ecuador-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 dark:from-gray-900 dark:to-gray-700 bg-clip-text text-transparent">
              Intensidad de Búsquedas
            </h3>
          </div>
          <p className="text-gray-400 dark:text-gray-600 text-lg">
            Nivel de interés por provincia en Ecuador
          </p>
        </div>

        {/* Barra de intensidad visual */}
        <div className="mb-8">
          <div className="relative h-12 rounded-2xl overflow-hidden shadow-inner bg-gray-800/50">
            {/* Gradiente de colores */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-200 via-blue-400 via-blue-600 to-blue-900 opacity-90"></div>
            
            {/* Marcadores en la barra */}
            <div className="absolute inset-0 flex items-center">
              {legendItems.slice(0, -1).map((item, index) => (
                <div 
                  key={index}
                  className="flex-1 flex items-center justify-center relative"
                >
                  {/* Línea divisoria */}
                  {index > 0 && (
                    <div className="absolute left-0 top-1 bottom-1 w-px bg-white/30"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Etiquetas de rango */}
          <div className="flex justify-between mt-3 px-2">
            <span className="text-sm font-medium text-gray-300 dark:text-gray-600">0%</span>
            <span className="text-sm font-medium text-gray-300 dark:text-gray-600">25%</span>
            <span className="text-sm font-medium text-gray-300 dark:text-gray-600">50%</span>
            <span className="text-sm font-medium text-gray-300 dark:text-gray-600">75%</span>
            <span className="text-sm font-medium text-gray-300 dark:text-gray-600">100%</span>
          </div>
        </div>

        {/* Items de leyenda con diseño moderno */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {legendItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/5 dark:bg-white/80 hover:bg-white/10 dark:hover:bg-white/90 rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10 dark:border-gray-200 hover:border-white/20 dark:hover:border-gray-300"
            >
              {/* Efecto de brillo al hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 dark:via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 text-center">
                {/* Indicador de color mejorado */}
                <div className="mx-auto mb-3 relative">
                  <div
                    className="w-8 h-8 rounded-xl shadow-lg border-2 border-white/20 dark:border-gray-300 group-hover:border-white/40 dark:group-hover:border-gray-400 transition-all duration-300 mx-auto"
                    style={{ backgroundColor: item.color }}
                  />
                  {/* Efecto de resplandor */}
                  <div
                    className="absolute inset-0 w-8 h-8 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm mx-auto"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                
                {/* Texto */}
                <div className="text-center">
                  <div className="text-sm font-bold text-white/90 dark:text-gray-900 group-hover:text-white dark:group-hover:text-gray-800 transition-colors mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-600 group-hover:text-gray-300 dark:group-hover:text-gray-500 transition-colors font-medium">
                    {item.range}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer con estadísticas */}
        {maxValue && (
          <div className="border-t border-white/10 dark:border-gray-200 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-300 dark:text-gray-600">
                  <svg className="w-5 h-5 text-ecuador-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
                  </svg>
                  <span className="text-sm font-medium">Valor máximo:</span>
                  <span className="text-lg font-bold text-white dark:text-gray-900">{maxValue}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 dark:text-gray-600">
                  <svg className="w-5 h-5 text-ecuador-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-sm font-medium">Provincias activas:</span>
                  <span className="text-lg font-bold text-ecuador-300 dark:text-ecuador-600">24/24</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8 8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                Haz clic en cualquier provincia para ver detalles
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white/10 dark:bg-white/90 backdrop-blur-md border border-white/20 dark:border-gray-200 rounded-3xl p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-ecuador-400 to-ecuador-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          Leyenda
        </h3>
        <p className="text-white/70 dark:text-gray-600 text-sm">
          Intensidad de tendencias por provincia
        </p>
      </div>

      {/* Legend items */}
      <div className="space-y-4">
        {legendItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 p-3 rounded-xl bg-white/5 dark:bg-white/80 hover:bg-white/10 dark:hover:bg-white/90 transition-all duration-200 group"
          >
            {/* Color indicator with gradient */}
            <div className="relative">
              <div 
                className="w-6 h-6 rounded-lg shadow-lg border border-white/20 dark:border-gray-300"
                style={{ backgroundColor: item.color }}
              />
              <div className="absolute inset-0 w-6 h-6 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            
            {/* Label and range */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-white dark:text-gray-900 font-semibold text-sm">
                  {item.label}
                </span>
                <span className="text-white/60 dark:text-gray-600 text-xs font-medium">
                  {item.range}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      {maxValue && (
        <div className="mt-6 pt-6 border-t border-white/20 dark:border-gray-200">
          <div className="bg-gradient-to-r from-ecuador-500/20 to-ecuador-600/20 dark:from-ecuador-400/20 dark:to-ecuador-500/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80 dark:text-gray-700 font-medium text-sm">
                Estadísticas
              </span>
              <svg className="w-5 h-5 text-ecuador-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
              </svg>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white/70 dark:text-gray-600 text-sm">Valor máximo:</span>
                <span className="text-white dark:text-gray-900 font-bold text-lg">{maxValue}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/70 dark:text-gray-600 text-sm">Provincias activas:</span>
                <span className="text-ecuador-300 dark:text-ecuador-600 font-semibold">
                  {/* Este valor se puede calcular dinámicamente */}
                  24 de 24
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info footer */}
      <div className="mt-4 text-center">
        <p className="text-white/50 dark:text-gray-500 text-xs">
          💡 Haz clic en cualquier provincia para ver detalles
        </p>
      </div>
    </div>
  );
};

export default Legend;
