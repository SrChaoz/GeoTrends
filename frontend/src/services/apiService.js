/**
 * Servicio centralizado para conexiones API
 * Maneja la detección automática de entornos y configuración de URLs
 */
import { API_CONFIG, DEV_CONFIG } from './config';

/**
 * Detecta el entorno de ejecución de la aplicación
 * @returns {string} 'production', 'docker', o 'local'
 */
const getEnvironment = () => {
  const hostname = window.location.hostname;

  // Producción: Vercel, Render, Cloud Run
  if (
    hostname.includes('vercel.app') ||
    hostname.includes('onrender.com') ||
    hostname.includes('run.app')
  ) {
    return 'production';
  }

  // Docker
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    return 'docker';
  }

  // Local
  return 'local';
};

/**
 * Obtiene la URL base del backend según el entorno
 * @returns {string} URL base del backend
 */
const getBackendBaseUrl = () => {
  const environment = getEnvironment();
  
  switch (environment) {
    case 'production':
      return API_CONFIG.BACKEND.PRODUCTION;
    case 'docker':
      return API_CONFIG.BACKEND.DOCKER;
    case 'local':
    default:
      return API_CONFIG.BACKEND.LOCAL;
  }
};

/**
 * Realiza una petición POST para obtener tendencias
 * @param {string} keyword - Palabra clave para buscar tendencias
 * @returns {Promise<Object>} Datos de tendencias
 */
export const fetchTrends = async (keyword) => {
  const baseUrl = getBackendBaseUrl();
  const url = `${baseUrl}${API_CONFIG.ENDPOINTS.TRENDS}`;
  const environment = getEnvironment();
  
  if (DEV_CONFIG.ENABLE_LOGS) {
    console.log(`Consultando backend en: ${url} (Entorno: ${environment})`);
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword: keyword.trim() }),
    });

    if (!response.ok) {
      // Intentar obtener información detallada del error del backend
      try {
        const errorData = await response.json();
        
        if (response.status === 429 && errorData.tipo === 'RATE_LIMITED') {
          throw new Error(
            errorData.mensaje || 
            'Google Trends ha bloqueado temporalmente las consultas. Espera 15-30 minutos antes de intentar nuevamente.'
          );
        }
        
        if (response.status === 503 && errorData.tipo === 'SERVICE_ERROR') {
          throw new Error(
            errorData.mensaje || 
            'El servicio de tendencias no está disponible temporalmente.'
          );
        }
        
        // Para otros errores con información del backend
        throw new Error(errorData.mensaje || errorData.error || `Error HTTP: ${response.status}`);
        
      } catch {
        // Si no se puede parsear la respuesta, usar error genérico
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error('Error en fetchTrends:', error);
    
    // No envolver el error si ya tiene un mensaje específico
    if (error.message.includes('Google Trends') || 
        error.message.includes('servicio de tendencias') ||
        error.message.includes('bloqueado temporalmente')) {
      throw error;
    }
    
    // Para otros errores, usar el mensaje original o uno genérico
    throw new Error(`Error al obtener tendencias: ${error.message}`);
  }
};

/**
 * Utilidad para obtener información del entorno actual
 * @returns {Object} Información del entorno
 */
export const getEnvironmentInfo = () => {
  const environment = getEnvironment();
  return {
    environment: environment,
    hostname: window.location.hostname,
    backendUrl: getBackendBaseUrl(),
    isProduction: environment === 'production',
    isDocker: environment === 'docker',
    isLocal: environment === 'local'
  };
};

export default {
  fetchTrends,
  getEnvironmentInfo
};
