'use strict'

var Asistencia = require('../models/Asistencia');

var controller =
{
    save: (req, res) => 
    {
        var params = req.body;

        var asistencia = new Asistencia();

        asistencia.id_alumno = params.id_alumno;
        asistencia.nombre_alumno = params.nombre_alumno;
        asistencia.nombre_curso = params.nombre_curso;
        asistencia.fecha = params.fecha;
        asistencia.estado = params.estado;
        asistencia.justificada = params.justificada;
        asistencia.save((err,asistenciaStored) =>
        {
            if(err || !asistenciaStored)
            {
                return res.status(404).send(
                    {
                        status: 'error',
                        message: 'La asistencia no se ha guardado!'
                    });
            }

            return res.status(200).send(
                {
                    status: 'success',
                    asistenciaStored
                });
        });
    },

    //HAY QUE VER COMO USAR JQUERY
    save_file: (req, res) =>
    {
        var file = req.params.file;

        jquery.fetch('controllers/FileUploadController.php', {
            method: 'post',
            headers: {
                'Accept' : 'application/json'
            },
            body: file
        });

        return res.status(200).send({
            status: 'success'
        })
    },
    getAsistencias: (req, res) => 
    {
        var curso = req.params.curso;
        var fecha_act = new Date();
        var _fecha = fecha_act.getDate() + "-" + (fecha_act.getMonth() + 1) + "-" + fecha_act.getFullYear();
        var query = Asistencia.find({fecha: _fecha, nombre_curso: curso});
        query.sort('nombre_alumno').exec((err,asistencias) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer las asistencias"
                });
            }
            
            if(!asistencias)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay asistencias para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    asistencias
                });
        });
    },

    getAsistenciasCurso: (req, res) => 
    {
        var curso = req.params.curso;
        var query = Asistencia.find({nombre_curso: curso});
        query.sort('nombre_alumno').exec((err,asistencia) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer las asistencias"
                });
            }
            
            if(!asistencia)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay asistencias para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    asistencia
                });
        });
    },

    getAsistencia: (req, res) => 
    {
        var curso = req.params.curso;
        var id_alumno = req.params.id_alumno;
        var fecha_act = new Date();
        var _fecha = fecha_act.getDate() + "-" + (fecha_act.getMonth() + 1) + "-" + fecha_act.getFullYear();
        var query = Asistencia.find({fecha: _fecha, nombre_curso: curso, id_alumno: id_alumno});
        query.sort('nombre_alumno').exec((err,asistencia) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer las asistencias"
                });
            }
            
            if(!asistencia)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay asistencias para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    asistencia
                });
        });
    },

    getAsistenciaAlumno: (req, res) => 
    {
        var curso = req.params.curso;
        var id_alumno = req.params.id_alumno;
        var query = Asistencia.find({nombre_curso: curso, id_alumno: id_alumno});
        query.sort('fecha').exec((err,alasis) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer las asistencias"
                });
            }
            
            if(!alasis)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay asistencias para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    alasis
                });
        });
    },

    edit: (req, res) => 
    {
        var asistenciaId = req.params.id;  
        var params = req.body;      
        
        var newParams = 
        {
            id_alumno : params.id_alumno,
            nombre_alumno : params.nombre_alumno,
            nombre_curso : params.nombre_curso,
            fecha : params.fecha,
            estado : params.estado,
            justificada : params.justificada
        };
        Asistencia.findOneAndUpdate({_id:asistenciaId},newParams,(err, asistenciaUpdate) =>
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al actualizar la asistencia!"
                });
            }

            if(!asistenciaUpdate)
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
                    asistenciaUpdate
                });
        })
    },

    delete: (req, res) => 
    {
        var asistenciaId = req.params.id;

        Asistencia.findOneAndDelete({_id: asistenciaId}, (err,asistenciaRemoved) => 
        {
            if(err)
            {
                return res.status(500).send(
                    {
                        status:"error",
                        message: "Error al eliminar!"
                    });

            }

            if(!asistenciaRemoved)
            {
                return res.status(404).send(
                    {
                        status:"error",
                        message: "No se ha encontrado la asistecia a eliminar"
                    });
            }

            return res.status(200).send(
                {
                    status: "success",
                    asistencia: asistenciaRemoved
                });
        });
    }
};

module.exports = controller;