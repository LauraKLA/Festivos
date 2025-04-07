const festivoRepositorio = require("../repositorios/festivo.repositorio");

// Listar festivos por tipo
exports.listar = (solicitud, respuesta) => {
    festivoRepositorio.listar(solicitud.params.id, (error, datos) => {
        if (error) {
            return respuesta.status(500).send({
                mensaje: "Error obteniendo lista de festivos"
            });
        }
        return respuesta.send(datos);
    });
};

// Listar festivos por año
exports.listarPorAnio = (solicitud, respuesta) => {
    const anio = parseInt(solicitud.params.anio, 10);
    if (isNaN(anio)) {
        return respuesta.status(400).send({ mensaje: "Año inválido" });
    }

    festivoRepositorio.listarPorAnio(anio, (error, datos) => {
        if (error) {
            return respuesta.status(500).send({
                mensaje: "Error obteniendo festivos del año"
            });
        }
        return respuesta.send(datos);
    });
};
