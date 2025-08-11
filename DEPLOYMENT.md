# GeoTrends - Despliegue en Google Cloud

¡Felicidades! La aplicación GeoTrends ha sido desplegada exitosamente en Google Cloud Run.

## URLs de los Servicios

### Frontend (Aplicación React)
- **URL:** https://geotrends-frontend-3p4zaaeqba-uc.a.run.app
- **Descripción:** Interfaz de usuario principal con mapa interactivo de Ecuador y heatmap de tendencias

### Backend (API Node.js)
- **URL:** https://geotrends-backend-3p4zaaeqba-uc.a.run.app
- **Health Check:** https://geotrends-backend-3p4zaaeqba-uc.a.run.app/api/health
- **Descripción:** API REST que orquesta las consultas de tendencias

### Servicio Python (Análisis de Tendencias)
- **URL:** https://geotrends-service-3p4zaaeqba-uc.a.run.app
- **Health Check:** https://geotrends-service-3p4zaaeqba-uc.a.run.app/health
- **Descripción:** Servicio Flask que procesa datos de Google Trends y genera heatmaps

## Arquitectura Desplegada

```
Frontend (React + Nginx)
       ↓ HTTP API calls
Backend (Node.js Express)
       ↓ HTTP requests
Service (Python Flask + PyTrends)
       ↓ API calls
Google Trends API
```

## Características

✅ **Escalabilidad Automática:** Cloud Run escala automáticamente según la demanda
✅ **Alta Disponibilidad:** Servicios distribuidos en múltiples instancias
✅ **HTTPS:** Todos los servicios cuentan con certificados SSL automáticos
✅ **Monitoreo:** Logs y métricas disponibles en Google Cloud Console
✅ **Costo Optimizado:** Solo pagas por las solicitudes recibidas

## Próximos Pasos

1. **Configurar Dominio Personalizado** (Opcional)
   - Puedes mapear un dominio personalizado usando Cloud Run Domain Mapping

2. **Configurar CDN** (Opcional)
   - Implementar Cloud CDN para mejorar la velocidad de carga global

3. **Monitoreo y Alertas**
   - Configurar alertas en Cloud Monitoring para supervisar la salud de los servicios

## Comandos Útiles

### Ver logs en tiempo real
```bash
# Logs del frontend
gcloud run services logs tail geotrends-frontend --region=us-central1

# Logs del backend
gcloud run services logs tail geotrends-backend --region=us-central1

# Logs del servicio
gcloud run services logs tail geotrends-service --region=us-central1
```

### Actualizar servicios
```bash
# Ejemplo: Actualizar frontend
docker build -t gcr.io/geotrends-462904/geotrends-frontend:latest ./frontend
docker push gcr.io/geotrends-462904/geotrends-frontend:latest
gcloud run deploy geotrends-frontend --image gcr.io/geotrends-462904/geotrends-frontend:latest --region us-central1
```

## Información del Proyecto

- **Proyecto Google Cloud:** geotrends-462904
- **Región:** us-central1
- **Container Registry:** gcr.io/geotrends-462904/

---

**Nota:** Todos los servicios están configurados para permitir acceso público sin autenticación. En producción, considera implementar autenticación y autorización según tus necesidades.
