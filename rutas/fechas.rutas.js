module.exports = (app) => {
    const controlador = require("../controladores/fechas.controlador");

    app.get("/fechas/:dia([0-9]+)/:mes([0-9]+)/:anio([0-9]+)", controlador.validarFecha);

    app.get("/fechas/*", (solicitud, respuesta) => {
        respuesta.status(400).send({ mensaje: "Debe suministrar todos los datos para proceder con la consulta" });
    });
};