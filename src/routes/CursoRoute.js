'use strict'

var express = require('express');

var Curso = require('../controllers/CursoController');

var router = express.Router();

router.post('/save_curso', Curso.save);

router.get('/cursos', Curso.getCursos);

router.get('/get_curso/:id', Curso.getCurso);

router.put('/curso/:id', Curso.edit);

router.delete('/delete_curso/:id', Curso.delete);

module.exports = router;