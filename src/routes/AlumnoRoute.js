'use strict'

var express = require('express');

var Alumno = require('../controllers/AlumnoController');

var router = express.Router();

router.post('/save_alumno', Alumno.save);

router.get('/alumnos/:curso', Alumno.getAlumnos);

router.get('/get_alumno/:id', Alumno.getAlumno);

router.get('/alums',Alumno.getAlums);

router.put('/alumno/:id', Alumno.edit);

router.delete('/delete_alumno/:id', Alumno.delete);

module.exports = router;