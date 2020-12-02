//REQUIRES
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore')
const app = express()
const Usuario = require('../models/usuario');
const {verificaToken,verificaAdminRole} = require('../middlewares/autenticacion');


//REQUIRES

//Obtener usuarios
app.get('/usuario',verificaToken, (req, res) => {

    let desde = req.query.desde || 0
    desde = Number(desde)
    
    let limite = req.query.limite || 5;
    limite = Number(limite)


    //si le envio un segundo argumento a la función find de Usuarios
    //con el nombre de los campos que quiero mostrar, este me los filtra----> 'nombre email'

    Usuario.find({ estado: true }, 'nombre email role estado')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
          
            Usuario.estimatedDocumentCount({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo 
                })
            })
       

        })
})
//Crear usuarios
app.post('/usuario',[verificaToken,verificaAdminRole],function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        usuarioDB.password = null

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });


});
//Actualizar usuarios
app.put('/usuario/:id',[verificaToken,verificaAdminRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role'])

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
           
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
})
//Borrar usuarios
app.delete('/usuario/:id',[verificaToken,verificaAdminRole], (req, res) => {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };


        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });




});


module.exports = app



