const festivoRepositorio = require("../repositorios/festivo.repositorio");

exports.listar = (solicitud, respuesta) => {
    festivoRepositorio.listar(solicitud.params.id,(error, datos) => {
        if (error) {
            return respuesta.status(500).send({
                mensaje: "Error obteniendo lista de festivos"
            });
        }
        return respuesta.send(datos);
    })
}