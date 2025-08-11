const { getPlacesHeatmapData } = require('../services/placesService');
const { fetchTrendsFromService } = require('../services/trendsService');

const searchPlaces = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Falta el parámetro de búsqueda (q)' });

    const heatmapData = await getPlacesHeatmapData(q);
    res.json(heatmapData);
  } catch (error) {
    console.error('Error en searchPlaces:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getTrends = async (req, res, next) => {
  const { keyword } = req.body;
  if (!keyword) return res.status(400).json({ error: 'Falta el campo keyword' });

  try {
    const data = await fetchTrendsFromService(keyword);
    res.json(data);
  } catch (error) {
    // Manejar errores específicos del servicio de trends
    if (error.code === 'RATE_LIMITED') {
      return res.status(429).json({
        error: 'Límite de consultas excedido',
        mensaje: error.message,
        tipo: 'RATE_LIMITED',
        recomendacion: 'Espera 15-30 minutos antes de intentar nuevamente'
      });
    }
    
    if (error.code === 'SERVICE_ERROR') {
      return res.status(503).json({
        error: 'Error en el servicio de tendencias',
        mensaje: error.message,
        tipo: 'SERVICE_ERROR'
      });
    }
    
    // Para otros errores, usar el middleware de manejo de errores
    next(error);
  }
};

module.exports = {
  searchPlaces,
  getTrends
};


