# Backend Dockerfile - Optimizado para producción
FROM node:22-alpine

WORKDIR /app

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copiar package files
COPY package*.json ./

# Instalar dependencias (solo producción)
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente
COPY . .

# Cambiar ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Variables de entorno
ENV NODE_ENV=production

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando para producción
CMD ["npm", "start"]