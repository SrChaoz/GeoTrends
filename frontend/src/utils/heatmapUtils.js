import L from 'leaflet';

/**
 * Obtiene un color basado en la intensidad del valor
 * @param {number} value - Valor de intensidad (0-100)
 * @returns {string} Color en formato hex
 */
export const getColorByIntensity = (value) => {
  if (value === 0) return '#f0f0f0'; // Gris claro para 0
  if (value <= 20) return '#fed7d7'; // Rojo muy claro
  if (value <= 40) return '#feb2b2'; // Rojo claro
  if (value <= 60) return '#fc8181'; // Rojo medio
  if (value <= 80) return '#f56565'; // Rojo
  return '#e53e3e'; // Rojo intenso
};

/**
 * Obtiene la opacidad basada en la intensidad
 * @param {number} value - Valor de intensidad (0-100)
 * @returns {number} Opacidad (0-1)
 */
export const getOpacityByIntensity = (value) => {
  if (value === 0) return 0.1;
  if (value <= 20) return 0.3;
  if (value <= 40) return 0.5;
  if (value <= 60) return 0.7;
  if (value <= 80) return 0.8;
  return 0.9;
};

/**
 * Coordenadas aproximadas del centro de cada provincia de Ecuador
 * Estas coordenadas son aproximadas y se usan para mostrar los datos
 * En una implementación real, se usaría un archivo GeoJSON con los límites exactos
 */
export const ECUADOR_PROVINCES_COORDS = {
  'Azuay': [-2.9001, -79.0059],
  'Bolívar': [-1.5936, -79.0036],
  'Cañar': [-2.5597, -78.9370],
  'Carchi': [0.6638, -77.9336],
  'Chimborazo': [-1.6635, -78.6536],
  'Cotopaxi': [-0.9313, -78.6158],
  'El Oro': [-3.2581, -79.9553],
  'Esmeraldas': [0.9592, -79.6522],
  'Galápagos': [-0.7632, -90.3042],
  'Guayas': [-2.1701, -79.9224],
  'Imbabura': [0.3518, -78.1141],
  'Loja': [-3.9972, -79.2072],
  'Los Ríos': [-1.0656, -79.4615],
  'Manabí': [-1.0539, -80.4518],
  'Morona Santiago': [-2.3084, -78.1198],
  'Napo': [-1.0138, -77.8076],
  'Orellana': [-0.4615, -76.9871],
  'Pastaza': [-1.4965, -78.0038],
  'Pichincha': [-0.1807, -78.4678],
  'Santa Elena': [-2.2269, -80.8559],
  'Santo Domingo de los Tsáchilas': [-0.2500, -79.1753],
  'Sucumbíos': [0.0939, -76.8977],
  'Tungurahua': [-1.2544, -78.6267],
  'Zamora Chinchipe': [-4.0669, -78.9547]
};

/**
 * Crea marcadores de círculo para cada provincia con datos
 * @param {Object} trendsData - Datos de tendencias por provincia
 * @returns {L.LayerGroup|null} Grupo de capas con los marcadores
 */
export const createHeatmapLayer = (trendsData) => {
  if (!trendsData || Object.keys(trendsData).length === 0) {
    return null;
  }

  const markers = [];
  
  // Encontrar el valor máximo para normalizar
  const maxValue = Math.max(...Object.values(trendsData));
  
  Object.entries(trendsData).forEach(([province, value]) => {
    const coords = ECUADOR_PROVINCES_COORDS[province];
    
    if (coords && value > 0) {
      // Normalizar el valor para el radio del círculo
      const normalizedValue = (value / maxValue) * 100;
      const radius = Math.max(10, normalizedValue * 0.5); // Radio mínimo 10, máximo 50
      
      const circle = L.circleMarker(coords, {
        color: getColorByIntensity(value),
        fillColor: getColorByIntensity(value),
        fillOpacity: getOpacityByIntensity(value),
        radius: radius,
        weight: 2
      });
      
      // Popup con información
      circle.bindPopup(`
        <div class="text-center">
          <h3 class="font-bold text-lg">${province}</h3>
          <p class="text-gray-600">Intensidad: <span class="font-semibold">${value}</span></p>
        </div>
      `);
      
      // Tooltip que aparece al hacer hover
      circle.bindTooltip(`${province}: ${value}`, {
        permanent: false,
        direction: 'top'
      });
      
      markers.push(circle);
    }
  });
  
  return markers.length > 0 ? L.layerGroup(markers) : null;
};

/**
 * Obtiene estadísticas de los datos de tendencias
 * @param {Object} trendsData - Datos de tendencias por provincia
 * @returns {Object} Estadísticas calculadas
 */
export const getTrendsStatistics = (trendsData) => {
  if (!trendsData || Object.keys(trendsData).length === 0) {
    return {
      total: 0,
      max: 0,
      min: 0,
      average: 0,
      provinces: 0
    };
  }
  
  const values = Object.values(trendsData).filter(v => v > 0);
  const total = values.reduce((sum, val) => sum + val, 0);
  
  return {
    total,
    max: Math.max(...values),
    min: Math.min(...values),
    average: Math.round(total / values.length),
    provinces: values.length
  };
};
