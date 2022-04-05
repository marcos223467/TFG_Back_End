'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var CursoSchema = new Schema({

    tipo : String,
    nombre : String,
    poblacion : String,
    entidad : String,
    fecha_ini : Date,
    fecha_fin : Date,
    archivado : Boolean

})

module.exports = mongoose.model('Curso', CursoSchema);