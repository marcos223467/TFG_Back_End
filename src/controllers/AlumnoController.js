'use strict'

var Alumno = require('../models/Alumno');

var controller = 
{
    save: (req, res) => 
    {
        var params = req.body;

        var alumno = new Alumno();

        alumno.nombre = params.nombre;
        alumno.apellidos = params.apellidos;
        alumno.fecha_nacimiento = params.fecha_nacimiento;
        alumno.cursos = params.cursos;

        alumno.save((err,alumnoStored) =>
        {
            if(err || !alumnoStored)
            {
                return res.status(404).send(
                    {
                        status: 'error',
                        message: 'El alumno no se ha guardado!'
                    });
            }

            return res.status(200).send(
                {
                    status: 'success',
                    alumnoStored
                });
        });
    },

    getAlumnos: (req, res) => 
    {
        var curso = req.params.curso;
        var query = Alumno.find({cursos: curso});

        query.sort('apellidos').exec((err,alumnos) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer los alumnos"
                });
            }
            
            if(!alumnos)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay alumnos para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    alumnos
                });
        });
    },

    getAlumno: (req, res) => 
    {
        var alumnId = req.params.id;
        var query = Alumno.find({_id: alumnId});

        query.sort('apellidos').exec((err,alumno) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer los alumnos"
                });
            }
            
            if(!alumno)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay alumnos para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    alumno
                });
        });
    },

    getAlums: (req, res) => 
    {
        var query = Alumno.find({});

        query.sort('apellidos').exec((err,alumnos) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer los alumnos"
                });
            }
            
            if(!alumnos)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay alumnos para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    alumnos
                });
        });
    },

    edit: (req, res) => 
    {
        var alumnoId = req.params.id;  
        var params = req.body;      
        
        var newParams = 
        {
            nombre : params.nombre,
            apellidos : params.apellidos,
            fecha_nacimiento : params.fecha_nacimiento,
            cursos : params.cursos
        };
        Alumno.findOneAndUpdate({_id:alumnoId},newParams,(err, alumnoUpdate) =>
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al actualizar el alumno!"
                });
            }

            if(!alumnoUpdate)
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
                    alumnoUpdate
                });
        })
    },

    delete: (req, res) => 
    {
        var alumnoId = req.params.id;

        Alumno.findOneAndDelete({_id: alumnoId}, (err,alumnoRemoved) => 
        {
            if(err)
            {
                return res.status(500).send(
                    {
                        status:"error",
                        message: "Error al eliminar!"
                    });

            }

            if(!alumnoRemoved)
            {
                return res.status(404).send(
                    {
                        status:"error",
                        message: "No se ha encontrado el alumno a eliminar"
                    });
            }

            return res.status(200).send(
                {
                    status: "success",
                    alumno: alumnoRemoved
                });
        });
    }
};

module.exports = controller;