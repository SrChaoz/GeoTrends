# Deploy GeoTrends en Google Cloud

Este documento explica cómo deployar GeoTrends en Google Cloud usando Cloud Run con las imágenes Docker existentes.

## Prerrequisitos

1. **Google Cloud CLI instalado**: [Instalar gcloud CLI](https://cloud.google.com/sdk/docs/install)
2. **Docker instalado**: Para pruebas locales
3. **Proyecto de Google Cloud**: Crear uno en [Google Cloud Console](https://console.cloud.google.com)

## Configuración Inicial

### 1. Autenticarse con Google Cloud

```bash
# Iniciar sesión
gcloud auth login

# Configurar el proyecto (reemplaza con tu PROJECT_ID)
gcloud config set project TU_PROJECT_ID

# Verificar configuración
gcloud config list
```

### 2. Habilitar APIs necesarias

```bash
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com
```

## Deploy Automático

### Opción 1: Script de Deploy Completo

```bash
# Desde el directorio raíz del proyecto
./deploy.sh TU_PROJECT_ID us-central1
```

### Opción 2: Cloud Build Manual

```bash
# Submit build to Cloud Build
gcloud builds submit \
    --config=cloudbuild.yaml \
    --substitutions=_REGION=us-central1
```

## Deploy Manual por Servicio

### 1. Build y Push de Imágenes

```bash
# Service (Python/Flask)
docker build -t gcr.io/TU_PROJECT_ID/geotrends-service ./service
docker push gcr.io/TU_PROJECT_ID/geotrends-service

# Backend (Node.js/Express)
docker build -t gcr.io/TU_PROJECT_ID/geotrends-backend ./backend
docker push gcr.io/TU_PROJECT_ID/geotrends-backend

# Frontend (React/Nginx)
docker build -t gcr.io/TU_PROJECT_ID/geotrends-frontend \
    --build-arg VITE_BACKEND_URL_PRODUCTION=https://geotrends-backend-us-central1-TU_PROJECT_ID.a.run.app \
    ./frontend
docker push gcr.io/TU_PROJECT_ID/geotrends-frontend
```

### 2. Deploy en Cloud Run

```bash
# Deploy Service
gcloud run deploy geotrends-service \
    --image gcr.io/TU_PROJECT_ID/geotrends-service \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated \
    --port 5001 \
    --memory 1Gi \
    --cpu 1

# Deploy Backend
gcloud run deploy geotrends-backend \
    --image gcr.io/TU_PROJECT_ID/geotrends-backend \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated \
    --port 3000 \
    --memory 512Mi \
    --cpu 1 \
    --set-env-vars DOCKER_URL=https://geotrends-service-us-central1-TU_PROJECT_ID.a.run.app/trends

# Deploy Frontend
gcloud run deploy geotrends-frontend \
    --image gcr.io/TU_PROJECT_ID/geotrends-frontend \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated \
    --port 80 \
    --memory 512Mi \
    --cpu 1
```

## URLs Finales

Después del deploy, tus servicios estarán disponibles en:

- **Frontend**: `https://geotrends-frontend-us-central1-TU_PROJECT_ID.a.run.app`
- **Backend**: `https://geotrends-backend-us-central1-TU_PROJECT_ID.a.run.app`
- **Service**: `https://geotrends-service-us-central1-TU_PROJECT_ID.a.run.app`

## Comandos Útiles

### Verificar servicios
```bash
gcloud run services list --region=us-central1
```

### Ver logs
```bash
gcloud run services logs tail geotrends-frontend --region=us-central1
gcloud run services logs tail geotrends-backend --region=us-central1
gcloud run services logs tail geotrends-service --region=us-central1
```

### Actualizar servicio
```bash
gcloud run services update geotrends-frontend \
    --region=us-central1 \
    --image=gcr.io/TU_PROJECT_ID/geotrends-frontend:latest
```

### Eliminar servicios
```bash
gcloud run services delete geotrends-frontend --region=us-central1
gcloud run services delete geotrends-backend --region=us-central1
gcloud run services delete geotrends-service --region=us-central1
```

## Configuración de Variables de Entorno

Para configurar variables de entorno específicas:

```bash
gcloud run services update geotrends-backend \
    --region=us-central1 \
    --set-env-vars="NODE_ENV=production,CUSTOM_VAR=value"
```

## Monitoreo y Troubleshooting

### Health Checks

- **Backend**: `https://geotrends-backend-us-central1-TU_PROJECT_ID.a.run.app/api/health`
- **Service**: `https://geotrends-service-us-central1-TU_PROJECT_ID.a.run.app/health`

### Debugging

1. **Ver logs en tiempo real**:
   ```bash
   gcloud run services logs tail SERVICE_NAME --region=us-central1
   ```

2. **Verificar configuración**:
   ```bash
   gcloud run services describe SERVICE_NAME --region=us-central1
   ```

3. **Revisar métricas**: En la consola de Google Cloud > Cloud Run > [Servicio] > Métricas

## Costos

Cloud Run cobra por:
- **CPU y Memoria**: Solo cuando se ejecutan requests
- **Requests**: $0.40 por millón de requests
- **Network**: Egress de datos

Para una aplicación pequeña-mediana, los costos suelen ser de $5-20/mes.

## Ventajas de esta Configuración

✅ **Escalamiento automático**: De 0 a múltiples instancias según demanda  
✅ **Serverless**: Solo pagas por uso  
✅ **Multi-región**: Fácil de replicar en diferentes regiones  
✅ **SSL automático**: HTTPS incluido  
✅ **CI/CD integrado**: Con Cloud Build  
✅ **Monitoring**: Logs y métricas integradas  

## Siguientes Pasos

1. **Dominio personalizado**: Configurar un dominio propio
2. **CDN**: Usar Cloud CDN para el frontend
3. **Database**: Agregar Cloud SQL o Firestore si es necesario
4. **Monitoring**: Configurar alertas en Cloud Monitoring
5. **Backup**: Implementar estrategias de backup si almacenas datos
