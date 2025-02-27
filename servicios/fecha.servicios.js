// Calcula el Domingo de Pascua
const calcularPascua = (anio) => {
    const a = anio % 19;
    const b = anio % 4;
    const c = anio % 7;
    const d = (19 * a + 24) % 30;
    const e = (2 * b + 4 * c + 6 * d + 5) % 7;

    let dia = 22 + d + e;
    let mes = 3;

    if (dia > 31) {
        mes = 4;
        dia -= 31;
    }

    return { dia, mes, anio };
};

// Ajusta la fecha 
const ajustarFecha = (fecha, dias) => {
    let nuevaFecha = new Date(fecha.anio, fecha.mes - 1, fecha.dia);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    return { dia: nuevaFecha.getDate(), mes: nuevaFecha.getMonth() + 1, anio: fecha.anio };
};

// Traslada el festivo al siguiente Lunes
const trasladarAlLunes = (fecha) => {
    let nuevaFecha = new Date(fecha.anio, fecha.mes - 1, fecha.dia);
    let diaSemana = nuevaFecha.getDay();

    if (diaSemana !== 1) {
        let diasHastaLunes = (8 - diaSemana) % 7;
        nuevaFecha.setDate(nuevaFecha.getDate() + diasHastaLunes);
    }

    return { dia: nuevaFecha.getDate(), mes: nuevaFecha.getMonth() + 1, anio: fecha.anio };
};

// Calcula el Domingo de Ramos
const calcularDomingoRamos = (anio) => {
    const pascua = calcularPascua(anio);
    return ajustarFecha(pascua, -7); 
};

module.exports = {
    calcularPascua,
    ajustarFecha,
    trasladarAlLunes,
    calcularDomingoRamos
    
};