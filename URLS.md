# URLs de GeoTrends en Google Cloud Run

## Información del Proyecto
- **Proyecto ID**: geotrends-462904
- **Región**: us-central1

## URLs de los Servicios (después del deploy)

### Frontend (Aplicación principal)
```
https://geotrends-frontend-3p4zaaeqba-uc.a.run.app
```

### Backend (API Node.js)
```
https://geotrends-backend-3p4zaaeqba-uc.a.run.app
```

### Service (API Python)
```
https://geotrends-service-3p4zaaeqba-uc.a.run.app
```

## Health Checks (para verificar que funcionen)

### Backend Health
```
https://geotrends-backend-3p4zaaeqba-uc.a.run.app/api/health
```

### Service Health
```
https://geotrends-service-3p4zaaeqba-uc.a.run.app/health
```

## Comandos de Deploy

### Deploy completo (recomendado)
```bash
./deploy.sh geotrends-462904 us-central1
```

### Deploy con Cloud Build
```bash
gcloud builds submit --config=cloudbuild.yaml --substitutions=_REGION=us-central1
```

## Comandos Útiles

### Ver estado de servicios
```bash
gcloud run services list --region=us-central1
```

### Ver logs
```bash
gcloud run services logs tail geotrends-frontend --region=us-central1
gcloud run services logs tail geotrends-backend --region=us-central1
gcloud run services logs tail geotrends-service --region=us-central1
```

### Verificar configuración actual
```bash
gcloud config list
```

---
**Nota**: Asegúrate de haber habilitado la facturación antes de ejecutar el deploy.
