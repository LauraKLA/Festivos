const express = require("express");
const app = express();

// Conecta a la Base Datos
const bd = require("./repositorios/bd");
bd.conectar();

app.use(express.json()); 

require("./rutas/tipos.rutas")(app);
require("./rutas/festivo.rutas")(app);
require("./rutas/fechas.rutas")(app);

const puerto = 3030;

app.listen(puerto, () => {
    console.log(`API escuchando en el puerto ${puerto}`);
});