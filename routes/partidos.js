//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const {  postPartido,putPartido,deletePartido,
         getPartidos, getPartidosSemana, getLunes,
         getMartes, getMiercoles, getJueves,getViernes,
         getSabado, getDomingo, getUltimoDiaMes,
         getTotalDia,getTotalSemanal, getTotalMensual} = require('../controller/partidos');
const {validarCampos}= require('../middlewares/validar-campos');
const {existePartidoId} = require ('../helpers/db-partidos');

const router = Router();
// mostrar los partidos guardados
router.get('/mostrarPartidos/', getPartidos);

// agregar Partidos (ver el model los datos que necesita para guardar)
router.post(
  "/agregarPartido",
  [
    check("horas", "horas por alquiler debe ser número").isNumeric(),
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("telefono","se requiere un numero de telefono").not().isEmpty(),
    check ("clase", "no es una clase válida (Torneo o Alquilado)").isIn(['Torneo','Alquilado']),
    check("precio", "el precio es necesario ").not().isEmpty(),
    check("precio", "el precio es necesario que sea un numero").isNumeric(),
    validarCampos
],
postPartido
);
// editar algun partido
router.put('/editarPartido/:id',
    [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existePartidoId ),
    check("horas","horas por alquiler debe ser número").isNumeric(),
    check("nombre","el nombre es obligatorio").not().isEmpty(),
    check("telefono","se requiere un numero de telefono").not().isEmpty(),
    check("precio", "el precio es necesario ").not().isEmpty(),
    
      validarCampos,
    ],
    putPartido
  );

  //eliminar algun partido
  router.delete('/eliminarPartido/:id', [

      check('id', 'No es un ID válido').isMongoId(),
      check('id').custom( existePartidoId ),
  ] ,deletePartido);

// mostrar los partidos que se guardaron en la semana en curso
router.get('/mostrarPartidosSemana', getPartidosSemana);
 // muestran la fecha de los dias en la semana / fin de mes - se actualizan semanal mente
router.get('/mostrarLunes', getLunes);
router.get('/mostrarMartes', getMartes);
router.get('/mostrarMiercoles', getMiercoles);
router.get('/mostrarJueves', getJueves);
router.get('/mostrarViernes', getViernes);
router.get('/mostrarSabado', getSabado);
router.get('/mostrarDomingo', getDomingo);
router.get('/mostrarUltimoDiaMes', getUltimoDiaMes);

router.get('/totalDia', getTotalDia);
router.get('/totalSemana', getTotalSemanal);
router.get('/totalMes', getTotalMensual);
  
module.exports = router;


// ROUTES