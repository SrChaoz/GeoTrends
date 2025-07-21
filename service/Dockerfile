# Trends Service Dockerfile - Simple para desarrollo
FROM python:3.11-alpine

WORKDIR /app

# Copiar requirements
COPY requirements.txt ./

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 5001

# Comando para desarrollo
CMD ["python", "app.py"]