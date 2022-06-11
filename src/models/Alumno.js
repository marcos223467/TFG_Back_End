'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var AlumnoSchema = new Schema({

    nombre : String,
    apellidos : String,
    fecha_nacimiento : Date,
    cursos : []
})

module.exports = mongoose.model('Alumno', AlumnoSchema);