module.exports = function(server) {

    var Experiencia = require('../../models/experiencia');
    var User = require('../../models/user');
    var Donatario = require('../../models/donatario');
    var auth = require('../../middlewares/authorise');
    var moment = require('moment');

    getExperiencias = function(req, res){
        Experiencia.find({}, function(err, experiencias){
            if (experiencias) {
                res.statusCode = 200;
                return res.send(experiencias);
            }else{
                res.statusCode = 404;
                return res.send('Experiencias not found');
            }
        });
    }

    addExperiencia = function(req, res) {
        Donatario.findById(req.body.id_donatario, function(err, donatario){
            if (donatario) {
                User.findById(donatario.id_usuario, function(err, usuario){
                    if (usuario) {
                        var newExperiencia = new Experiencia({
                            id_donatario : donatario.id_donatario,
                            titulo : req.body.titulo,
                            contenido : req.body.contenido,
                            imagenes : req.body.imagenes,
                            created_by : usuario.name+' '+ usuario.last_name,
                            img_creator: usuario.url_image
                        });

                        newExperiencia.save(function(err) {
                            if (err) {
                                console.log('ERROR: ' + err);
                                res.statusCode = 400;
                                return res.send('Error');
                            } else {
                                console.log('Experiencia Successfully Saved');
                                return res.send(newExperiencia);
                            }
                        }); 
                    }else{
                        res.statusCode = 404;
                        return res.send('Usuario not found');
                    }
                });       
            }else{
                Donatario.findOne({'id_usuario':req.body.id_donatario}, function(err, donatario){
                    if (donatario) {
                        User.findById(donatario.id_usuario, function(err, usuario){
                            if (usuario) {
                                var newExperiencia = new Experiencia({
                                    id_donatario : donatario.id_donatario,
                                    titulo : req.body.titulo,
                                    contenido : req.body.contenido,
                                    imagenes : req.body.imagenes,
                                    created_by : usuario.name+' '+ usuario.last_name,
                                    img_creator: usuario.url_image
                                });

                                newExperiencia.save(function(err) {
                                    if (err) {
                                        console.log('ERROR: ' + err);
                                        res.statusCode = 400;
                                        return res.send('Error');
                                    } else {
                                        console.log('Experiencia Successfully Saved');
                                        return res.send(newExperiencia);
                                    }
                                }); 
                            }else{
                                res.statusCode = 404;
                                return res.send('Usuario not found');
                            }
                        });
                    }else{
                        res.statusCode = 404;
                        return res.send('Donatario not found');
                    }
                });
            }
        });
    };

    updateExperiencia = function(req, res){
        Experiencia.findById(req.body.id_experiencia, function(err, experiencia){
            if (experiencia) {
                experiencia.status = false;
                experiencia.save(function(err){
                    if (err) {
                        res.statusCode = 304;
                        return res.send('Experiencia not modified');
                    }else{
                        res.statusCode = 202;
                        return res.send('Experiencia modified');
                    }
                });
            }else{
                res.statusCode = 304;
                return res.send('Experiencia not modified');
            }
        });
    }

    //API Routes 
    server.get('/experiencia', auth.Authorise, getExperiencias);
    server.post('/experiencia', auth.Authorise, addExperiencia);
    server.patch('/experiencia', auth.Authorise, updateExperiencia);

}