// Importa mongoose y la configuración desde el archivo bd.config.js
const mongoose = require('mongoose');
const config = require('./bd.config');

// Función para conectar a la base de datos MongoDB
const conectar = () => {
    // Construye la URL de conexión a MongoDB utilizando los valores del archivo de configuración
    const url = `mongodb://${config.SERVIDOR}:${config.PUERTO}/${config.BASE}`;

    // Conecta a MongoDB usando Mongoose
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err);
    });
};

// Exporta la función conectar para que sea utilizada en otros archivos
module.exports = {
    conectar
};
