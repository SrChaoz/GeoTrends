import axios from 'axios';

export const getPlacesHeatmapData = async (query) => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
    params: {
      query,
      key: API_KEY,
    },
  });

  // Procesamos la respuesta para extraer coordenadas
  const heatmapPoints = response.data.results.map((place) => ({
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
  }));

  return heatmapPoints;
};
// Este servicio se encarga de interactuar con la API de Google Places para obtener datos de lugares.
// Utiliza axios para realizar solicitudes HTTP y obtener resultados basados en un término de búsqueda.
// La función getPlacesHeatmapData toma un término de búsqueda (query) y devuelve un array de puntos geográficos (latitud y longitud) que se pueden usar para generar un mapa de calor.
// Asegúrate de que la variable de entorno GOOGLE_API_KEY esté configurada correctamente para que la API funcione.
// Este servicio es parte de la estructura del backend y se utiliza para manejar la lógica de búsqueda de lugares.
// Asegúrate de que la variable de entorno GOOGLE_API_KEY esté configurada correctamente para que la API funcione.          