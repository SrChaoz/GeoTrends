import { getPlacesHeatmapData } from '../services/googleService.js';

export const searchPlaces = async (req, res) => {
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
