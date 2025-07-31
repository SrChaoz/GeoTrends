# Trends Service Dockerfile - Robusto para desarrollo
FROM python:3.12-slim

WORKDIR /app

# Instalar dependencias del sistema para compilar paquetes Python
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt ./

# Instalar dependencias Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 5001

# Comando para desarrollo
CMD ["python", "app.py"]