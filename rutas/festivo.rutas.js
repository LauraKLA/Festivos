module.exports = (app) => {
    const controlador = require("../controladores/festivo.controlador");

    app.get("/festivos/:id", controlador.listar);

    app.get("/festivos/anio/:anio", controlador.listarPorAnio);
};