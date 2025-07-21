# Trends Service Dockerfile - Simple para desarrollo
FROM python:3.12-alpine

WORKDIR /app

# Instalar dependencias del sistema necesarias para compilar paquetes Python
RUN apk add --no-cache \
    gcc \
    musl-dev \
    linux-headers \
    g++ \
    libffi-dev

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