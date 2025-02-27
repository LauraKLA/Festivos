const bd = require("./bd");
const { calcularPascua, ajustarFecha, trasladarAlLunes, calcularDomingoRamos } = require("../servicios/fecha.servicios");

const FechasRepositorio = {

    // Busca la fecha ingresada
    buscarPorFecha: async (dia, mes, anio, respuesta) => {
        const basedatos = bd.obtenerBD();
        try {
            const resultado = await basedatos.collection("tipos").find().toArray();

            // Valida los festivos de tipo 2
            for (let tipo of resultado) {
                if (tipo.id === 2) {
                    for (let festivo of tipo.festivos) {
                        let fechaOriginal = { dia: festivo.dia, mes: festivo.mes, anio };
                        let fechaFinal = trasladarAlLunes(fechaOriginal);

                        if (dia === fechaOriginal.dia && mes === fechaOriginal.mes && (fechaOriginal.dia !== fechaFinal.dia || fechaOriginal.mes !== fechaFinal.mes)) {
                            return respuesta(null, null);
                        }

                        if (dia === fechaFinal.dia && mes === fechaFinal.mes) {
                            return respuesta(null, { nombre: festivo.nombre });
                        }
                    }
                }
            }

            // Valida el Domingo de Ramos
            const domingoRamos = calcularDomingoRamos(anio);
            if (dia === domingoRamos.dia && mes === domingoRamos.mes) {
                return respuesta(null, { nombre: "Domingo de Ramos" });
            }

            // Valida el Domingo de Pascua
            const pascua = calcularPascua(anio);
            if (dia === pascua.dia && mes === pascua.mes) {
                return respuesta(null, { nombre: "Domingo de Pascua" });
            }

            // Busca el festivo normal
            for (let tipo of resultado) {
                for (let festivo of tipo.festivos) {
                    if (festivo.dia === dia && festivo.mes === mes) {
                        return respuesta(null, festivo);
                    }
                }
            }

            // Busca los festivos tipo 3 y 4
            for (let tipo of resultado) {
                if (tipo.id === 3 || tipo.id === 4) {
                    for (let festivo of tipo.festivos) {
                        if (festivo.diasPascua !== undefined) {
                            let fechaAjustada = ajustarFecha(pascua, festivo.diasPascua);

                            if (tipo.id === 4) {
                                fechaAjustada = trasladarAlLunes(fechaAjustada);
                            }

                            if (dia === fechaAjustada.dia && mes === fechaAjustada.mes) {
                                return respuesta(null, { nombre: festivo.nombre });
                            }
                        }
                    }
                }
            }

            return respuesta(null, null);
        } catch (error) {
            return respuesta(error, null);
        }
    }

};

module.exports = FechasRepositorio;