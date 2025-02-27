const bd = require("./bd");

const FestivoRepositorio = () => { };

// Lista los festivos
FestivoRepositorio.listar = async (idTipo, respuesta) => {
    const basedatos = bd.obtenerBD();
    try {
        // Código MONGO para obtener lista de festivos
        const resultado = await basedatos.collection("tipos")
            .aggregate([
                {$match: {id: parseInt(idTipo)}},
                {
                    $project:{
                        'festivos.dia': 1,
                        'festivos.mes': 1,
                        'festivos.nombre': 1
                    }
                }])  
            .toArray();
        //

        return respuesta(null, resultado);
    }
    catch (error) {
        return respuesta(error, null);
    }
};

module.exports = FestivoRepositorio;