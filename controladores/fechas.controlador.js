const fechasRepositorio = require("../repositorios/fechas.repositorio");

exports.validarFecha = (solicitud, respuesta) => {
    const { dia, mes, anio } = solicitud.params;

    // Valida que se ingresen todos los datos en la busqueda
    if (!dia || !mes || !anio || isNaN(dia) || isNaN(mes) || isNaN(anio)) {
    }

    const diaNum = parseInt(dia, 10);
    const mesNum = parseInt(mes, 10);
    const anioNum = parseInt(anio, 10);

    // Valida si la fecha ingresada cumple con los parametros de la busqueda
    const fecha = new Date(anioNum, mesNum - 1, diaNum);
    if (
        fecha.getFullYear() !== anioNum ||
        fecha.getMonth() !== mesNum - 1 ||
        fecha.getDate() !== diaNum
    ) {
        return respuesta.status(400).send({ mensaje: "Fecha no válida" });
    }

    fechasRepositorio.buscarPorFecha(diaNum, mesNum, anioNum, (error, tipos) => {
        if (error) {
            return respuesta.status(500).send({
                mensaje: "Error al consultar fecha"
            });
        }

        if (tipos) {
            return respuesta.send({ mensaje: `El ${dia}/${mes}/${anio} es festivo: ${tipos.nombre}` });
        } else {
            return respuesta.send({ mensaje: `El ${dia}/${mes}/${anio} no es festivo` });
        }
    });
};