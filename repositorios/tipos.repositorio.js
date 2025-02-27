const bd = require("./bd");

const TiposRepositorio = () => { };

    // Lista los festivos de acuerdo a su tipo
    TiposRepositorio.listar = async (respuesta) => {
        const basedatos = bd.obtenerBD();
        try {
            // Código MONGO para obtener lista de tipos
            const resultado = await basedatos.collection("tipos")
                .find()
                .project({
                    id: 1,
                    tipo: 1,
                    modoCalculo: 1,
                })
                .toArray();
                //

            return respuesta(null, resultado);
        } catch (error) {
            return respuesta(error, null);
        }
    },

module.exports = TiposRepositorio;