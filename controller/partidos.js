const { response, request } = require('express');
//Importación del modelo
const Partido = require('../model/partidos');
const moment = require('moment');

const postPartido = async (req = request, res = response) => {
    //Desestructuración
    const dia = moment()
    const fecha = dia.format("DD-MM-YYYY");
    console.log(fecha);
    const { horas, nombre, telefono, clase, precio } = req.body;

    const data = {
        horas,
        nombre,
        telefono,
        clase,
        precio,
        fecha

    }
    const partidoGuardadoDB = new Partido(data);
    //Guardar en BD
    await partidoGuardadoDB.save();

    res.json({
        msg: 'Post Api - crear Partido',
        partidoGuardadoDB
    });
}

const getTotalDia = async (req = request, res = response) => {
    try {
      const fechaActual = moment().format('DD-MM-YYYY');
      const partidos = await Partido.find({ fecha: fechaActual });
      let totalDiaActual = 0;
  
      partidos.forEach((partido) => {
        const precioPartido = partido.precio;
        totalDiaActual += precioPartido;
      });
  
      res.json({
        msg: 'Get api - mostrar total por día',
        totalDiaActual
    });
    } catch (error) {
        return res.status(400).json({
            msg: 'Hubo un error al mostrar los totales / agregar partidos puede que no existan '
        });
    }
  };

 //mostrar total por semanas, se actualiza semanalmente 
 const getTotalSemanal = async (req = request, res = response) => {
    try {
      const fechaActual = moment();
      const fechaInicioSemana = fechaActual.clone().startOf('isoWeek');
      const fechaFinSemana = fechaActual.clone().endOf('isoWeek');
      const diasSemana = [];
      let totalSemanal = 0;
  
      for (let fecha = fechaInicioSemana; fecha.isSameOrBefore(fechaFinSemana); fecha.add(1, 'day')) {
        diasSemana.push(fecha.format('DD-MM-YYYY'));
      }
  
      const partidos = await Partido.find({ fecha: { $in: diasSemana } });
  
      partidos.forEach((partido) => {
        let precioPartido = partido.precio;
        totalSemanal += precioPartido;
      });
  
      res.json({
        msg: 'Get API - mostrar total por semana',
        totalSemanal
      });
    } catch (error) {
        console.log(error);
      return res.status(400).json({
        msg: 'Hubo un error al mostrar los totales / agregar partidos puede que no existan'
      });
    }
  };

  const getTotalMensual = async (req = request, res = response) => {
  try {
    const fechaActual = moment();
    const fechaInicioMes = fechaActual.clone().startOf('isoMonth');
    const fechaFinMes = fechaActual.clone().endOf('isoMonth');
    const diasMes = [];
    let totalMensual = 0;

    for (let fecha = fechaInicioMes; fecha.isSameOrBefore(fechaFinMes); fecha.add(1, 'day')) {
      diasMes.push(fecha.format('DD-MM-YYYY'));
    }

    const partidos = await Partido.find({ fecha: { $in: diasMes } });

    partidos.forEach((partido) => {
      const precioPartido = partido.precio;
      totalMensual += precioPartido;
    });

    res.json({
      msg: 'Get API - mostrar total por mes',
      totalMensual
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Hubo un error al mostrar los totales / agregar partidos puede que no existan'
    });
  }
};

const getPartidos = async (req = request, res = response) => {

    const listaPartidos = await Promise.all([
        Partido.countDocuments(),
        Partido.find()
    ]);

    res.json({
        msg: 'get Api - mostrar Partidos',
        listaPartidos
    });


}
// este metodo muestra los partidos de la semana (lunes-domingo)
const getPartidosSemana = async (req = request, res = response) => {
    try {
      const fechaActual = moment();
      const inicioSemana = fechaActual.clone().startOf('isoWeek');
      const finSemana = fechaActual.clone().endOf('isoWeek');
      const diasSemana = [];
    
      for (let fecha = inicioSemana; fecha.isSameOrBefore(finSemana); fecha.add(1, 'day')) {
        diasSemana.push(fecha.format('DD-MM-YYYY'));
      }
    
      const listaPartidos = await Partido.find({
        fecha: { $in: diasSemana }
      });
    
      res.json({
        msg: 'Get API - mostrar partidos por semana',
        listaPartidos
      });
    } catch (error) {
      return res.status(400).json({
        msg: 'Hubo un error al mostrar los partidos de la semana'
      });
    }
  };
//nos muestra la fecha de los lunes (dentro de la semana) / la fecha del lunes actual
const getLunes = async (req = request, res = response) => {

    const fechaActual = moment();
    const inicioSemana = fechaActual.startOf('isoWeek');
    const inicioFechaSemana = inicioSemana.format('DD-MM-YYYY');
    res.json({
        msg: 'get Api - mostrar Los lunes ',
        inicioFechaSemana
    });

};

//nos muestra la fecha de los martes (dentro de la semana) / la fecha del martes actual
const getMartes = async (req = request, res = response) => {

    const fechaActual = moment();
    const obtenerMartes = fechaActual.startOf('isoWeek').add(1, 'days');
    const martes = obtenerMartes.format('DD-MM-YYYY');
    res.json({
        msg: 'get Api - mostrar Los Martes ',
        martes
    });

};
//nos muestra la fecha de los Miercoles (dentro de la semana) / la fecha del miercoles actual
const getMiercoles = async (req = request, res = response) => {

    const fechaActual = moment();
    const obtenerMiercoles = fechaActual.startOf('isoWeek').add(2, 'days');
    const miercoles = obtenerMiercoles.format('DD-MM-YYYY');
    res.json({
        msg: 'get Api - mostrar Los Miercoles ',
        miercoles
    });

};
//nos muestra la fecha de los jueves (dentro de la semana) / la fecha del jueves actual
const getJueves = async (req = request, res = response) => {

    const fechaActual = moment();
    const obtenerJueves = fechaActual.startOf('isoWeek').add(3, 'days');
    const jueves = obtenerJueves.format('DD-MM-YYYY');
    res.json({
        msg: 'get Api - mostrar Los jueves ',
        jueves
    });

};


//nos muestra la fecha de los Viernes (dentro de la semana) / la fecha del viernes actual
const getViernes = async (req = request, res = response) => {

    const fechaActual = moment();
    const obtenerViernes = fechaActual.startOf('isoWeek').add(4, 'days');
    const viernes = obtenerViernes.format('DD-MM-YYYY');
    res.json({
        msg: 'get Api - mostrar Los viernes ',
        viernes
    });

};

//nos muestra la fecha de los sabados (dentro de la semana) / la fecha del sabado actual
const getSabado = async (req = request, res = response) => {

    const fechaActual = moment();
    const obtenerSabado = fechaActual.startOf('isoWeek').add(5, 'days');
    const sabado = obtenerSabado.format('DD-MM-YYYY');
    res.json({
        msg: 'get Api - mostrar Los sabados ',
        sabado
    });

};

//nos mostrara la fecha de el domingo proximo (mas cercano o de ese domingo si estamos en el)
const getDomingo = async (req = request, res = response) => {

    const fechaActual = moment();
    const inicioSemana = fechaActual.startOf('isoWeek');
    const finSemana = inicioSemana.clone().endOf('isoWeek');
    const fechaUltimoDiaSemana = finSemana.format('DD-MM-YYYY');
    console.log(fechaUltimoDiaSemana);
    res.json({
        msg: 'get Api - mostrar Los domingos ',
        fechaUltimoDiaSemana
    });

};
// mostrar la fecha del ultimo dia del mes
const getUltimoDiaMes = async (req = request, res = response) => {

    const fechaActual = moment();
    const inicioMes = fechaActual.startOf('Month');
    const finMes = inicioMes.clone().endOf('Month');
    const fechaUltimoDiaMes = finMes.format('DD-MM-YYYY');
    res.json({
        msg: 'get Api - mostrar dia domingo ',
        fechaUltimoDiaMes
    });

};

const putPartido = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const { _id, fecha, ...resto } = req.body;

    const partidoDB = await Partido.findById(id); // usuario que se desea modificar
    if (!partidoDB) {
        return res.status(401).json({
            msg: ' partido no existe en la base de datos '
        })
    }
    //Editar partido por el id que proporciona mongo
    const partidoEditado = await Partido.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT api - editar Partido',
        partidoEditado
    });
}

const deletePartido = async (req = request, res = response) => {
    const { id } = req.params;

    const partidoDB = await Partido.findById(id);
    if (!partidoDB) {
        return res.status(400).json({
            msg: 'NO existe el partido que desea eliminar'
        });
    }

    const partidoEliminado = await Partido.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api - eliminar Partido',
        partidoEliminado
    });
}
//exportar cada funcion para llamarlos en las rutas
module.exports = {
    postPartido,
    getPartidos,
    getPartidosSemana,
    getLunes,
    getMartes,
    getMiercoles,
    getJueves,
    getViernes,
    getSabado,
    getDomingo,
    getUltimoDiaMes,
    putPartido,
    deletePartido,
    getTotalDia,
    getTotalSemanal,
    getTotalMensual
}

