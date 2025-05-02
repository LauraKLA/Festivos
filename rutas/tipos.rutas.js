module.exports = (app) => {
    const controlador = require("../controladores/tipos.controlador");

    app.get("/tipos/verificar", controlador.listar);
};