const tiposRepositorio = require("../repositorios/tipos.repositorio");

exports.listar = (solicitud, respuesta) => {
    tiposRepositorio.listar((error, datos) => {
        if (error) {
            return respuesta.status(500).send({
                mensaje: "Error obteniendo listado"
            });
        }
        return respuesta.send(datos);
    });
};