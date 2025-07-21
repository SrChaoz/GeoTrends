/**
 * Servicio centralizado para conexiones API
 * Maneja la detección automática de entornos y configuración de URLs
 */
import { API_CONFIG, DEV_CONFIG } from './config';

/**
 * Detecta si la aplicación está ejecutándose en Docker o localmente
 * @returns {boolean} true si está en Docker, false si es local
 */
const isDockerEnvironment = () => {
  // En Docker, el hostname será diferente de 'localhost'
  return window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
};

/**
 * Obtiene la URL base del backend según el entorno
 * @returns {string} URL base del backend
 */
const getBackendBaseUrl = () => {
  if (isDockerEnvironment()) {
    return API_CONFIG.BACKEND.DOCKER;
  } else {
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
  
  if (DEV_CONFIG.ENABLE_LOGS) {
    console.log(`Consultando backend en: ${url} (Entorno: ${isDockerEnvironment() ? 'Docker' : 'Local'})`);
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
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en fetchTrends:', error);
    throw new Error(`Error al obtener tendencias: ${error.message}`);
  }
};

/**
 * Utilidad para obtener información del entorno actual
 * @returns {Object} Información del entorno
 */
export const getEnvironmentInfo = () => {
  return {
    isDocker: isDockerEnvironment(),
    hostname: window.location.hostname,
    backendUrl: getBackendBaseUrl(),
    environment: isDockerEnvironment() ? 'Docker' : 'Local Development'
  };
};

export default {
  fetchTrends,
  getEnvironmentInfo
};
