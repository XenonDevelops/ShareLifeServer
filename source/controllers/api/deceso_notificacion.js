module.exports = function(server) {

    var DecesoNotificacion = require('../../models/deceso_notificacion');
    var User = require('../../models/user');
    var Donador = require('../../models/donador');
    var auth = require('../../middlewares/authorise');
    var moment = require('moment');

    getDecesos = function(req, res){
        DecesoNotificacion.find({}, function(err, decesos){
            if (err) {
                res.statusCode = 204;
                return res.send('Decesos not found');
            }else{
                var idDecesos = [];
                for (var i = 0; i < decesos.length ; i++) {
                    idDecesos.push(decesos[i].id_donante);
                }
                Donador.find({'_id': {$in:idDecesos}}, function(err, donadores){
                    if (donadores) {
                        User.find({'_id':donadores}, function(err, usuarios){
                            if (usuarios) {
                                res.statusCode = 200;
                                return res.send(usuarios);
                            }else{
                                res.statusCode = 404;
                                return res.send('Usuarios not found');
                            }
                        });
                    }else{
                        res.statusCode = 404;
                        return res.send('Donadores not found');
                    }
                });
            }
        });
    }

    addDeceso = function(req, res) {
        User.findById(req.body.id_donante, function(err, usuario){
            if (usuario) {
                Donador.find({'id_usuario':usuario._id}, function(err, donador){
                    if (donador) {
                        var newDeceso =  new DecesoNotificacion({
                            id_donante : donador.id_donante,
                            nombre_donante : usuario.nombre_donante,
                            tipo_sangre : usuario.tipo_sangre,
                            latitud : req.body.latitud,
                            longitud : req.body.longitud
                        });

                        newDeceso.save(function(err){
                            if (err) {
                                res.statusCode = 304;
                                return res.send('Deceso not saved');
                            }else{
                                res.statusCode = 201;
                                return res.send('Deceso saved');
                            }
                        });
                    }else{
                        res.statusCode = 404;
                        return res.send('Donador not found');
                    }
                });
            }else{
                Donador.findById(req.body.id_donante, function(err, donador){
                    if (donador) {
                        User.findById(donador.id_usuario, function(err,usuario){
                            if (usuario) {
                                var newDeceso =  new DecesoNotificacion({
                                    id_donante : donador.id_donante,
                                    nombre_donante : usuario.nombre_donante,
                                    tipo_sangre : usuario.tipo_sangre,
                                    latitud : req.body.latitud,
                                    longitud : req.body.longitud
                                });

                                newDeceso.save(function(err){
                                    if (err) {
                                        res.statusCode = 304;
                                        return res.send('Deceso not saved');
                                    }else{
                                        res.statusCode = 201;
                                        return res.send('Deceso saved');
                                    }
                                });
                            }else{
                                res.statusCode = 404;
                                return res.send('Usario not found');
                            }
                        });
                    }else{
                        res.statusCode = 404;
                        return res.send('Donador not found');
                    }
                });
            }
        });
        
    };

    //API Routes 
    server.get('/deceso', auth.Authorise, getDecesos);
    server.post('/deceso', auth.Authorise, addDeceso);
}