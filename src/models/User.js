'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({

    email : String,
    password : String,
    nombre : String,
    apellidos : String,
    tipo : String,
    cursos: []

})

module.exports = mongoose.model('User', UserSchema);