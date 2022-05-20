'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var AsistenciaSchema = new Schema({

    id_alumno : {},
    nombre_alumno : String,
    nombre_curso : String,
    fecha : String,
    estado : String,
    justificada: String,
})

module.exports = mongoose.model('Asistencia', AsistenciaSchema);