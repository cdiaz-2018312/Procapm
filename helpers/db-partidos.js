
const Partido = require("../model/partidos");


//Este archivo maneja validaciones personalizadas

const existePartidoId= async (id) => {
  //Verificamos si el partido existe en la db
  const existePartido = await Partido.findById(id);

  //Si no existe  lanzamos excepción
  if (!existePartido) {
        throw new Error(`El partido con ${id} no existe en la DB`);
  }
};


module.exports = {
  
  existePartidoId
};
