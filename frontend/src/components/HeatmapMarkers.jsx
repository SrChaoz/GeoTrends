import { CircleMarker, Popup } from 'react-leaflet';

// Coordenadas aproximadas del centro de cada provincia de Ecuador
const ECUADOR_PROVINCES_COORDS = {
  'Azuay': [-2.9001, -79.0059],
  'Bolívar': [-1.5936, -79.0036],
  'Provincia de Bolívar': [-1.5936, -79.0036], // Alias
  'Cañar': [-2.5597, -78.9370],
  'Carchi': [0.6638, -77.9336],
  'Provincia de Carchi': [0.6638, -77.9336], // Alias
  'Chimborazo': [-1.6635, -78.6536],
  'Cotopaxi': [-0.9313, -78.6158],
  'El Oro': [-3.2581, -79.9553],
  'Esmeraldas': [0.9592, -79.6522],
  'Galápagos': [-0.7632, -90.3042],
  'Islas Galápagos': [-0.7632, -90.3042], // Alias
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
 * Obtiene un color basado en la intensidad del valor
 */
const getColorByIntensity = (value) => {
  if (value === 0) return '#4b5563'; // Gris oscuro para Sin Datos
  if (value <= 30) return '#9ca3af'; // Gris medio para Bajo
  if (value <= 70) return '#fbbf24'; // Amarillo medio para Medio
  return '#f59e0b'; // Amarillo/naranja intenso para Alto
};

/**
 * Obtiene la opacidad basada en la intensidad
 */
const getOpacityByIntensity = (value) => {
  if (value === 0) return 0.2;
  if (value <= 20) return 0.4;
  if (value <= 40) return 0.6;
  if (value <= 60) return 0.7;
  if (value <= 80) return 0.8;
  return 0.9;
};

const HeatmapMarkers = ({ heatData }) => {
  if (!heatData || Object.keys(heatData).length === 0) {
    return null;
  }

  // Encontrar el valor máximo para normalizar los radios
  const maxValue = Math.max(...Object.values(heatData));

  return (
    <>
      {Object.entries(heatData).map(([province, value]) => {
        const coords = ECUADOR_PROVINCES_COORDS[province];
        
        if (!coords || value <= 0) {
          return null;
        }

        // Normalizar el valor para el radio del círculo
        const normalizedValue = (value / maxValue) * 100;
        const radius = Math.max(8, normalizedValue * 0.4); // Radio mínimo 8, máximo 40

        return (
          <CircleMarker
            key={province}
            center={coords}
            radius={radius}
            pathOptions={{
              color: getColorByIntensity(value),
              fillColor: getColorByIntensity(value),
              fillOpacity: getOpacityByIntensity(value),
              weight: 2
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg">{province}</h3>
                <p className="text-gray-600">
                  Intensidad: <span className="font-semibold">{value}</span>
                </p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
};

export default HeatmapMarkers;
