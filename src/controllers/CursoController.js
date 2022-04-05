'use strict'

var Curso = require('../models/Curso');

var controller = 
{
    save: (req, res) => 
    {
        var params = req.body;

        var curso = new Curso();

        curso.tipo = params.tipo;
        curso.nombre = params.nombre;
        curso.poblacion = params.poblacion;
        curso.entidad = params.entidad;
        curso.fecha_ini = params.fecha_ini;
        curso.fecha_fin = params.fecha_fin;
        curso.archivado = false;

        curso.save((err,cursoStored) =>
        {
            if(err || !cursoStored)
            {
                return res.status(404).send(
                    {
                        status: 'error',
                        message: 'El curso no se ha guardado!'
                    });
            }

            return res.status(200).send(
                {
                    status: 'success',
                    cursoStored
                });
        });
    },

    getCursos: (req, res) => 
    {
        var query = Curso.find({});

        query.sort('nombre').exec((err,cursos) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer los cursos"
                });
            }
            
            if(!cursos)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay cursos para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    cursos
                });
        });
    },

    getCurso: (req, res) => 
    {
        var cursoId = req.params.id;
        var query = Curso.find({_id: cursoId});

        query.sort('nombre').exec((err,curso) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer los cursos"
                });
            }
            
            if(!curso)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay cursos para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    curso
                });
        });
    },

    edit: (req, res) => 
    {
        var cursoId = req.params.id;
        var params = req.body;
        var newParams =
        {
            tipo : params.tipo,
            nombre : params.nombre,
            poblacion : params.poblacion,
            entidad : params.entidad,
            fecha_ini : params.fecha_ini,
            fecha_fin : params.fecha_fin,
            archivado : params.archivado
        };
        Curso.findOneAndUpdate({_id:cursoId}, newParams, (err, cursoUpdate) =>
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al actualizar el curso!"
                });
            }

            if(!cursoUpdate)
            {
                return res.status(404).send(
                {
                    status: "error",
                    message: "No hay parametros nuevos"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    cursoUpdate
                });
        })
    },

    delete: (req, res) => 
    {
        var cursoId = req.params.id;
        Curso.findOneAndDelete({_id: cursoId}, (err,cursoRemoved) => 
        {
            if(err)
            {
                return res.status(500).send(
                    {
                        status:"error",
                        message: "Error al eliminar!"
                    });

            }

            if(!cursoRemoved)
            {
                return res.status(404).send(
                    {
                        status:"error",
                        message: "No se ha encontrado el curso a eliminar"
                    });
            }

            return res.status(200).send(
                {
                    status: "success",
                    curso: cursoRemoved
                });
        });
    }
};

module.exports = controller;