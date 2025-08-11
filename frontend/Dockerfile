# Multi-stage build para producción optimizada
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias (incluye dev dependencies para el build)
RUN npm ci

# Copiar código fuente
COPY . .

# Argument para URL del backend
ARG VITE_BACKEND_URL_PRODUCTION
ENV VITE_BACKEND_URL_PRODUCTION=$VITE_BACKEND_URL_PRODUCTION

# Build para producción
RUN npm run build

# Stage de producción con nginx
FROM nginx:alpine

# Copiar build files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Comando
CMD ["nginx", "-g", "daemon off;"]
