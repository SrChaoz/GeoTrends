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
    next(error);
  }
};

module.exports = {
  searchPlaces,
  getTrends
};


