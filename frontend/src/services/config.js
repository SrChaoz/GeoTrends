/**
 * Configuración centralizada de la aplicación
 * Maneja todas las variables de entorno y configuraciones
 */

/**
 * Configuración de URLs según el entorno
 */
export const API_CONFIG = {
  // URLs del backend
  BACKEND: {
    LOCAL: import.meta.env.VITE_BACKEND_URL_LOCAL || 'http://localhost:3000',
    DOCKER: import.meta.env.VITE_BACKEND_URL_DOCKER || 'http://backend:3000',
    PRODUCTION: import.meta.env.VITE_BACKEND_URL_PRODUCTION || 'https://geotrends-backend.onrender.com'
  },

  // Endpoints disponibles
  ENDPOINTS: {
    TRENDS: '/api/trends',
    HEALTH: '/api/health'
  }
};

/**
 * Configuración de la aplicación
 */
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'GeoTrends',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  ENVIRONMENT: import.meta.env.MODE || 'development'
};

/**
 * Configuración de desarrollo
 */
export const DEV_CONFIG = {
  // Habilitar logs en desarrollo
  ENABLE_LOGS: import.meta.env.MODE === 'development',
  
  // Configuración de debug
  DEBUG_API: import.meta.env.VITE_DEBUG_API === 'true'
};

/**
 * Utilidad para obtener toda la configuración actual
 * @returns {Object} Configuración completa
 */
export const getFullConfig = () => ({
  api: API_CONFIG,
  app: APP_CONFIG,
  dev: DEV_CONFIG
});

export default {
  API_CONFIG,
  APP_CONFIG,
  DEV_CONFIG,
  getFullConfig
};
