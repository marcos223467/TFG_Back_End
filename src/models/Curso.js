'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var CursoSchema = new Schema({

    anyo : String,
    nombre : String,
    carrera : String,
    entidad : String,
    fecha_ini : Date,
    fecha_fin : Date,
    archivado : Boolean

})

module.exports = mongoose.model('Curso', CursoSchema);