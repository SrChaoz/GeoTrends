const axios = require('axios');

const fetchTrendsFromService = async (keyword) => {
  // Detectar automáticamente el entorno y usar la URL apropiada
  let trendsUrl;
  
  if (process.env.DOCKER_URL) {
    // Configuración para Docker Compose
    trendsUrl = process.env.DOCKER_URL;
  } else if (process.env.K_SERVICE) {
    // Estamos en Cloud Run, usar la URL del servicio Python
    trendsUrl = 'https://geotrends-service-3p4zaaeqba-uc.a.run.app/trends';
  } else {
    // Entorno local
    trendsUrl = 'http://localhost:5001/trends';
  }
  
  console.log(`Consultando trends service en: ${trendsUrl}`);
  
  try {
    const response = await axios.post(trendsUrl, { keyword });
    return response.data;
  } catch (error) {
    // Si el servicio Python devuelve información estructurada del error, propagarla
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      
      // Crear un error más descriptivo para errores 429 (Too Many Requests)
      if (error.response.status === 429) {
        const customError = new Error(
          errorData.mensaje || 
          'Google Trends ha bloqueado temporalmente las consultas. Espera 15-30 minutos antes de intentar nuevamente.'
        );
        customError.code = 'RATE_LIMITED';
        customError.originalError = errorData;
        throw customError;
      }
      
      // Para otros errores del servicio Python
      const customError = new Error(errorData.error || error.message);
      customError.code = 'SERVICE_ERROR';
      customError.originalError = errorData;
      throw customError;
    }
    
    // Para errores de conexión u otros
    throw error;
  }
};

module.exports = { fetchTrendsFromService };
