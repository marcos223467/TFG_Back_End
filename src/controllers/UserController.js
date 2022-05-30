'use strict'

var User = require('../models/User');

var controller = 
{
    save: (req, res) => 
    {
        var params = req.body;

        var user = new User();

        user.email = params.email;
        user.password = params.password;
        user.nombre = params.nombre;
        user.apellidos = params.apellidos;
        user.tipo = params.tipo;
        user.cursos = params.cursos;

        user.save((err,userStored) =>
        {
            if(err || !userStored)
            {
                return res.status(404).send(
                    {
                        status: 'error',
                        message: 'El usuario no se ha guardado!'
                    });
            }

            return res.status(200).send(
                {
                    status: 'success',
                    userStored
                });
        });
    },

    getUsers: (req, res) => 
    {
        var query = User.find({});

        query.sort('apellidos').exec((err,users) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer los usuarios"
                });
            }
            
            if(!users)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay usuarios para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    users
                });
        });
    },

    getUser: (req, res) => 
    {
        var userId = req.params.id;
        var query = User.find({_id: userId});

        query.sort('apellidos').exec((err,user) => 
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al extraer el usuarios"
                });
            }
            
            if(!user)
            {
                return res.status(404).send(
                {
                    status:"error",
                    message: "No hay usuarios para mostrar"
                });
            }

            return res.status(200).send(
                {
                    status:"success",
                    user
                });
        });
    },

    edit: (req, res) => 
    {
        var userId = req.params.id;
        var params = req.body;
        var newParams =
        {
            email : params.email,
            nombre : params.nombre,
            apellidos : params.apellidos,
            tipo : params.tipo,
            cursos : params.cursos
        };

        User.findOneAndUpdate({_id:userId}, newParams, (err, userUpdate) =>
        {
            if(err)
            {
                return res.status(500).send(
                {
                    status: "error",
                    message: "Error al actualizar el usuario!"
                });
            }

            if(!userUpdate)
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
                    userUpdate
                });
        })
    },

    delete: (req, res) => 
    {
        var userId = req.params.id;

        User.findOneAndDelete({_id: userId}, (err,userRemoved) => 
        {
            if(err)
            {
                return res.status(500).send(
                    {
                        status:"error",
                        message: "Error al eliminar!"
                    });

            }

            if(!userRemoved)
            {
                return res.status(404).send(
                    {
                        status:"error",
                        message: "No se ha encontrado el usuario a eliminar"
                    });
            }

            return res.status(200).send(
                {
                    status: "success",
                    user: userRemoved
                });
        });
    }
};

module.exports = controller;