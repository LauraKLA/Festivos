# Usa una imagen base de Node.js
FROM node:16

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto (incluyendo index.js) al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expón el puerto que usará la API
EXPOSE 3030

# Comando para iniciar la aplicación
CMD ["npm", "start"]
