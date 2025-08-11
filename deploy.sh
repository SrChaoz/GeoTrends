#!/bin/bash

# Script de deploy para Google Cloud Run
set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "docker-compose.yml" ]; then
    print_error "Este script debe ejecutarse desde el directorio raíz del proyecto"
    exit 1
fi

# Configuración
PROJECT_ID=${1:-""}
REGION=${2:-"us-central1"}

if [ -z "$PROJECT_ID" ]; then
    print_error "Uso: $0 <PROJECT_ID> [REGION]"
    print_error "Ejemplo: $0 mi-proyecto-geotrends us-central1"
    exit 1
fi

print_status "🚀 Iniciando deploy de GeoTrends en Google Cloud Run"
print_status "📋 Proyecto: $PROJECT_ID"
print_status "🌍 Región: $REGION"

# Configurar proyecto
print_status "🔧 Configurando proyecto de Google Cloud..."
gcloud config set project $PROJECT_ID

# Habilitar APIs necesarias
print_status "🔌 Habilitando APIs necesarias..."
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com

# Ejecutar Cloud Build
print_status "🏗️  Iniciando build y deploy con Cloud Build..."
gcloud builds submit \
    --config=cloudbuild.yaml \
    --substitutions=_REGION=$REGION \
    .

if [ $? -eq 0 ]; then
    print_success "✅ Deploy completado exitosamente!"
    echo ""
    print_status "🌐 URLs de los servicios:"
    echo "   Frontend: https://geotrends-frontend-$REGION-$PROJECT_ID.a.run.app"
    echo "   Backend:  https://geotrends-backend-$REGION-$PROJECT_ID.a.run.app"
    echo "   Service:  https://geotrends-service-$REGION-$PROJECT_ID.a.run.app"
    echo ""
    print_status "📊 Verificar estado de los servicios:"
    echo "   gcloud run services list --region=$REGION"
    echo ""
    print_status "📝 Ver logs:"
    echo "   gcloud run services logs tail geotrends-frontend --region=$REGION"
    echo "   gcloud run services logs tail geotrends-backend --region=$REGION"
    echo "   gcloud run services logs tail geotrends-service --region=$REGION"
else
    print_error "❌ Error durante el deploy"
    exit 1
fi
