module.exports = (app) => {
    const controlador = require("../controladores/festivo.controlador");

    app.get("/festivos/verificar/:id", controlador.listar);

    app.get("/festivos/verificar/anio/:anio", controlador.listarPorAnio);
};