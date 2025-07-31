import React, { useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';
import ecuadorGeoJSON from '../data/ecuador.js';

/**
 * Obtiene un color moderno basado en la intensidad del valor
 */
const getIntensityColor = (normalizedValue) => {
  if (normalizedValue === 0) return '#64748b'; // Sin datos - gris elegante
  if (normalizedValue <= 0.2) return '#e0f2fe'; // Muy bajo - azul muy claro
  if (normalizedValue <= 0.4) return '#81d4fa'; // Bajo - azul claro
  if (normalizedValue <= 0.6) return '#29b6f6'; // Medio - azul medio
  if (normalizedValue <= 0.8) return '#1976d2'; // Alto - azul intenso
  return '#0d47a1'; // Muy alto - azul oscuro
};

/**
 * Obtiene la opacidad basada en la intensidad
 */
const getIntensityOpacity = (normalizedValue) => {
  if (normalizedValue === 0) return 0.3;
  return Math.max(0.4, 0.5 + normalizedValue * 0.5);
};

/**
 * Normaliza un nombre de provincia para comparación
 */
const normalizeProvinceName = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s]/g, '') // Solo letras, números y espacios
    .trim();
};

/**
 * Encuentra los datos de tendencia para una provincia
 */
const findProvinceData = (provinceName, trendsData) => {
  if (!trendsData || !Array.isArray(trendsData)) return null;
  
  const normalizedSearch = normalizeProvinceName(provinceName);
  
  return trendsData.find(trend => {
    const normalizedTrend = normalizeProvinceName(trend.location || '');
    return normalizedTrend === normalizedSearch;
  });
};

/**
 * Mapeo de nombres de provincias para compatibilidad
 */
const PROVINCE_NAME_MAPPING = {
  // Provincias que NO vienen con "Provincia de..."
  'AZUAY': 'Azuay',
  'EL ORO': 'El Oro',
  'GUAYAS': 'Guayas',
  'ISLAS GALAPAGOS': 'Islas Galápagos',
  'GALAPAGOS': 'Islas Galápagos',
  'LOJA': 'Loja',
  'LOS RIOS': 'Los Ríos',
  'MANABI': 'Manabí',
  'PICHINCHA': 'Pichincha',
  'TUNGURAHUA': 'Tungurahua',
  
  // Provincias amazónicas - mapeo correcto con "Provincia de..."
  'MORONA SANTIAGO': 'Provincia de Morona Santiago',
  'PASTAZA': 'Provincia de Pastaza',
  'ZAMORA CHINCHIPE': 'Provincia de Zamora Chinchipe',
  'ORELLANA': 'Provincia de Orellana',
  'SUCUMBIOS': 'Provincia de Sucumbíos',
  
  // Otras provincias que vienen con "Provincia de..."
  'BOLIVAR': 'Provincia de Bolívar',
  'CANAR': 'Provincia de Cañar',
  'CARCHI': 'Provincia de Carchi',
  'CHIMBORAZO': 'Provincia de Chimborazo',
  'COTOPAXI': 'Provincia de Cotopaxi',
  'ESMERALDAS': 'Provincia de Esmeraldas',
  'IMBABURA': 'Provincia de Imbabura',
  'NAPO': 'Provincia de Napo',
  'SANTA ELENA': 'Provincia de Santa Elena',
  'SANTO DOMINGO DE LOS TSACHILAS': 'Provincia de Santo Domingo de los Tsáchilas',
  'SANTO DOMINGO': 'Provincia de Santo Domingo de los Tsáchilas',
  
  // Variaciones con tildes
  'SUCUMBÍOS': 'Provincia de Sucumbíos',
  'CAÑAR': 'Provincia de Cañar',
  'BOLÍVAR': 'Provincia de Bolívar',
  'MANABÍ': 'Manabí'
};

const EcuadorHeatmapLayer = ({ trendsData, heatData }) => {
  // Determinar qué tipo de datos usar
  const dataToUse = useMemo(() => {
    const data = trendsData || (heatData ? Object.entries(heatData).map(([location, value]) => ({ location, value })) : []);
    
    // Debug: mostrar datos disponibles
    if (data && data.length > 0) {
      console.log('📊 Datos de tendencias disponibles:');
      data.forEach(item => {
        console.log(`  • ${item.location}: ${item.value}`);
      });
      
      // Verificar específicamente provincias amazónicas
      const amazonicas = data.filter(item => 
        item.location && (
          item.location.toLowerCase().includes('morona') ||
          item.location.toLowerCase().includes('pastaza') ||
          item.location.toLowerCase().includes('zamora') ||
          item.location.toLowerCase().includes('orellana') ||
          item.location.toLowerCase().includes('sucumbios') ||
          item.location.toLowerCase().includes('sucumbíos')
        )
      );
      
      if (amazonicas.length > 0) {
        console.log('🌳 Provincias amazónicas encontradas en datos:', amazonicas);
      } else {
        console.log('⚠️ No se encontraron provincias amazónicas en los datos');
      }
    }
    
    return data;
  }, [trendsData, heatData]);

  // Memoizar el valor máximo para normalización
  const maxValue = useMemo(() => {
    if (!dataToUse || !Array.isArray(dataToUse)) return 1;
    return Math.max(...dataToUse.map(item => item.value || 0), 1);
  }, [dataToUse]);

  // Función para obtener el estilo de cada provincia
  const getFeatureStyle = (feature) => {
    const provinceName = feature.properties.nombre || feature.properties.dpa_despro;
    const mappedName = PROVINCE_NAME_MAPPING[provinceName.toUpperCase()] || provinceName;
    const provinceData = findProvinceData(mappedName, dataToUse);
    const value = provinceData?.value || 0;
    const normalizedValue = maxValue > 0 ? value / maxValue : 0;

    // Debug para provincias amazónicas
    if (provinceName && provinceName.toUpperCase().includes('MORONA') || 
        provinceName.toUpperCase().includes('PASTAZA') ||
        provinceName.toUpperCase().includes('ZAMORA') ||
        provinceName.toUpperCase().includes('ORELLANA') ||
        provinceName.toUpperCase().includes('SUCUMBIOS')) {
      console.log(`🌳 Provincia amazónica - Original: "${provinceName}", Mapeado: "${mappedName}", Datos encontrados:`, provinceData, `Valor: ${value}`);
    }

    return {
      fillColor: getIntensityColor(normalizedValue),
      weight: 1.5,
      opacity: 1,
      color: '#ffffff',
      dashArray: '',
      fillOpacity: getIntensityOpacity(normalizedValue)
    };
  };

  // Función para el popup de cada provincia
  const onEachFeature = (feature, layer) => {
    const provinceName = feature.properties.nombre || feature.properties.dpa_despro;
    const mappedName = PROVINCE_NAME_MAPPING[provinceName.toUpperCase()] || provinceName;
    const provinceData = findProvinceData(mappedName, dataToUse);
    const value = provinceData?.value || 0;
    const normalizedValue = maxValue > 0 ? value / maxValue : 0;

    // Función para obtener el ranking textual
    const getRanking = () => {
      if (value === 0) return 'Sin datos';
      if (normalizedValue <= 0.2) return 'Muy bajo';
      if (normalizedValue <= 0.4) return 'Bajo';
      if (normalizedValue <= 0.6) return 'Medio';
      if (normalizedValue <= 0.8) return 'Alto';
      return 'Muy alto';
    };

    // Crear contenido del popup
    const popupContent = `
      <div style="font-family: Inter, sans-serif; min-width: 200px;">
        <div style="
          background: linear-gradient(135deg, #1976d2, #29b6f6); 
          color: white; 
          padding: 12px; 
          margin: -8px -8px 12px -8px;
          border-radius: 8px 8px 0 0;
        ">
          <h3 style="
            font-size: 18px; 
            font-weight: bold; 
            margin: 0 0 4px 0;
          ">
            ${provinceName}
          </h3>
          <p style="
            font-size: 12px; 
            opacity: 0.9; 
            margin: 0;
          ">
            Provincia del Ecuador
          </p>
        </div>
        
        <div style="padding: 0 4px;">
          <div style="
            display: flex; 
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          ">
            <span style="font-size: 14px; color: #64748b;">
              Intensidad:
            </span>
            <span style="
              font-size: 20px; 
              font-weight: bold; 
              color: ${value > 0 ? '#1976d2' : '#64748b'};
            ">
              ${value}
            </span>
          </div>
          
          <div style="
            display: flex; 
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          ">
            <span style="font-size: 14px; color: #64748b;">
              Nivel:
            </span>
            <span style="
              font-size: 14px; 
              font-weight: bold;
              color: ${getIntensityColor(normalizedValue)};
              background: ${getIntensityColor(normalizedValue)}20;
              padding: 2px 8px;
              border-radius: 12px;
            ">
              ${getRanking()}
            </span>
          </div>
          
          <div style="
            background: #f8fafc; 
            padding: 8px; 
            border-radius: 6px;
            font-size: 12px;
            color: #64748b;
            text-align: center;
          ">
            ${normalizedValue > 0 
              ? `${(normalizedValue * 100).toFixed(1)}% del máximo (${maxValue})`
              : 'No hay datos disponibles'
            }
          </div>
        </div>
      </div>
    `;

    layer.bindPopup(popupContent, {
      closeButton: true,
      autoClose: true,
      className: 'custom-popup'
    });

    // Efectos hover
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          color: '#fbbf24',
          dashArray: '',
          fillOpacity: Math.min(getIntensityOpacity(normalizedValue) + 0.2, 1)
        });
        layer.bringToFront();
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(getFeatureStyle(feature));
      }
    });
  };

  if (!ecuadorGeoJSON || !ecuadorGeoJSON.features) {
    return null;
  }

  return (
    <GeoJSON
      data={ecuadorGeoJSON}
      style={getFeatureStyle}
      onEachFeature={onEachFeature}
      key={JSON.stringify(dataToUse)} // Re-render cuando cambien los datos
    />
  );
};

export default EcuadorHeatmapLayer;
