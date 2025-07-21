# Servicios Frontend - GeoTrends

Esta carpeta contiene los servicios centralizados para el manejo de APIs y configuración en el frontend.

## Estructura

```
src/services/
├── apiService.js    # Servicio principal para conexiones API
├── config.js        # Configuración centralizada
└── README.md        # Esta documentación
```

## apiService.js

Servicio principal que maneja todas las conexiones con el backend.

### Funciones disponibles:

- `fetchTrends(keyword)` - Obtiene tendencias para una palabra clave
- `getEnvironmentInfo()` - Información del entorno actual (Docker/Local)

### Ejemplo de uso:

```javascript
import { fetchTrends, getEnvironmentInfo } from '../services/apiService';

// Obtener tendencias
try {
  const data = await fetchTrends('pizza');
  console.log(data);
} catch (error) {
  console.error('Error:', error.message);
}

// Información del entorno
const envInfo = getEnvironmentInfo();
console.log(`Ejecutándose en: ${envInfo.environment}`);
```

## config.js

Configuración centralizada que maneja todas las variables de entorno.

### Configuraciones disponibles:

- `API_CONFIG` - URLs del backend para diferentes entornos
- `APP_CONFIG` - Configuración general de la aplicación
- `DEV_CONFIG` - Configuración específica de desarrollo

### Ejemplo de uso:

```javascript
import { API_CONFIG, APP_CONFIG } from '../services/config';

console.log(`App: ${APP_CONFIG.NAME} v${APP_CONFIG.VERSION}`);
console.log(`Backend Local: ${API_CONFIG.BACKEND.LOCAL}`);
```

## Variables de Entorno

Las variables de entorno se configuran en el archivo `.env` en la raíz del frontend:

```env
# URLs del backend
VITE_BACKEND_URL_LOCAL=http://localhost:3000
VITE_BACKEND_URL_DOCKER=http://backend:3000

# Configuración de la app
VITE_APP_NAME=GeoTrends
VITE_APP_VERSION=1.0.0

# Debug
VITE_DEBUG_API=true
```

## Detección Automática de Entorno

El sistema detecta automáticamente si se está ejecutando en:

- **Local**: `localhost` o `127.0.0.1`
- **Docker**: Cualquier otro hostname

Y ajusta las URLs de conexión automáticamente.

## Mejores Prácticas

1. **Siempre usar el apiService**: No hacer fetch directamente desde componentes
2. **Variables de entorno**: Todas las URLs van en `.env`
3. **Manejo de errores**: El apiService ya maneja errores básicos
4. **Logging**: Se activa automáticamente en desarrollo

## Agregar Nuevos Endpoints

Para agregar un nuevo endpoint:

1. Añadir la ruta en `config.js`:
```javascript
ENDPOINTS: {
  TRENDS: '/api/trends',
  NEW_ENDPOINT: '/api/new-endpoint'  // Nuevo endpoint
}
```

2. Crear la función en `apiService.js`:
```javascript
export const fetchNewData = async (params) => {
  const baseUrl = getBackendBaseUrl();
  const url = `${baseUrl}${API_CONFIG.ENDPOINTS.NEW_ENDPOINT}`;
  // ... lógica de fetch
};
```

3. Usar desde el componente:
```javascript
import { fetchNewData } from '../services/apiService';
```
