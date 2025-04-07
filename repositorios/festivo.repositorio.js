const bd = require("./bd");

const FestivoRepositorio = () => { };

// Lista festivos
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

// Lista festivos por año
FestivoRepositorio.listarPorAnio = async (anio, respuesta) => {
    const basedatos = bd.obtenerBD();
    try {
        const tipos = await basedatos.collection("tipos").find().toArray();

        const { calcularPascua, ajustarFecha, trasladarAlLunes, calcularDomingoRamos } = require("../servicios/fecha.servicios");

        const festivosAnio = [];

        for (let tipo of tipos) {
            for (let festivo of tipo.festivos) {
                let fechaFinal = { dia: festivo.dia, mes: festivo.mes, anio };
                let nombre = festivo.nombre;

                if (tipo.id === 2) {
                    // Trasladar al lunes
                    let original = { dia: festivo.dia, mes: festivo.mes, anio };
                    let trasladada = trasladarAlLunes(original);
                    fechaFinal = trasladada;
                }

                if (tipo.id === 3 || tipo.id === 4) {
                    const pascua = calcularPascua(anio);
                    let ajustada = ajustarFecha(pascua, festivo.diasPascua);
                    if (tipo.id === 4) {
                        ajustada = trasladarAlLunes(ajustada);
                    }
                    fechaFinal = ajustada;
                }

                festivosAnio.push({ nombre, ...fechaFinal });
            }
        }

        return respuesta(null, festivosAnio);
    } catch (error) {
        return respuesta(error, null);
    }
};

module.exports = FestivoRepositorio;