 const { Schema, model } = require('mongoose');

const PartidosSchema = Schema({
    // cantidad de tiempo (horas) en el que se alquilarán las canchas
    horas: {
        type: Number,
        required: true 
        
    },
    nombre: { 
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true
    },
   
    clase: {
        type: String,
        required: true, 
        Enum: ['Alquilado','Torneo'],
        default: 'Alquilado' 
    },
    precio: {
        type: Number,
        required: true,
        default: 150 
    },
    fecha: {
        type: Date,
        required: true,
         
    }
    

});
// convertir la fecha a (dia - mes - año)
PartidosSchema.methods.getFormattedFecha = function() {
    return moment(this.fecha).format('DD-MM-YYYY');
};


module.exports = model('Partidos', PartidosSchema);