module.exports = function(server) {

    var Donador = require('../../models/donador');
    var User = require('../../models/user');
    var auth = require('../../middlewares/authorise');
    var moment = require('moment');
    var twiter = require('../../connections/twitter')

    getDonadores = function(req, res){
        Donador.find({}, function(err, donadores){
            if (!err) {
                var idDonadores = [];
                for (var i = 0; i < donadores.length ; i++) {
                    idDonadores.push(donadores[i].id_usuario);
                };
                User.find({'_id': {$in: idDonadores}}, function(err, usuarios){
                    if (!err) {
                        res.statusCode = 200;
                        return res.send(usuarios);
                    }else{
                        res.statusCode = 404;
                        return res.send('Usuarios not found');
                    }
                });
            }else{
                res.statusCode = 404;
                return res.send('Usuarios not found');
            }
        });
    }

    getHeroes = function(req, res){
        Donador.find({'have_donated' : true}, function(err, donadores){
            if (!err) {
                var idDonadores = [];
                for (var i = 0; i < donadores.length ; i++) {
                    idDonadores.push(donadores[i].id_usuario);
                };
                User.find({'_id': {$in: idDonadores}}, function(err, usuarios){
                    if (!err) {
                        res.statusCode = 200;
                        return res.send(usuarios);
                    }else{
                        res.statusCode = 404;
                        return res.send('Usuarios not found');
                    }
                });
            }else{
                res.statusCode = 404;
                return res.send('Usuarios not found');
            }
        });
    }

    addDonador = function(req, res) {
        var newDonador = new Donador({
            id_usuario: req.body.id_usuario,
            organo_requerido : req.body.organo_requerido
        });

        newDonador.save(function(err) {
            if (err) {
                console.log('ERROR: ' + err);
                res.statusCode = 400;
                return res.send('Error');
            } else {
                console.log('Donador Successfully Saved');
                return res.send(newDonador);
            }
        });
    };

    updateState = function(req, res){
        Donador.findById(req.body.id_donador, function(err, donador){
            if (donador) {
                donador.have_donated = true;
                donador.last_donate = moment(new Date()).format('YYYY-DD-MM');
                donador.save(function(err){
                    if (err) {
                        res.statusCode = 304;
                        return res.send('Donador dont modified');
                    }else{
                        twiter('Hello #HackathonMorelos from ShareLife #UTEZ #elnieves #tengosueño');
                        res.statusCode = 202;
                        return res.send('Donador modified');
                    }
                });
            }else{
                User.findById(req.body.id_donador, function(err, usuario){
                    if (err) {
                        res.statusCode = 404;
                        return res.send('Donador not found');
                    }else{
                        Donador.findOne({'id_usuario' : usuario.id}, function(err, donador){
                            if (donador) {
                                donador.have_donated = true;
                                donador.last_donate = moment(new Date()).format('YYYY-DD-MM');
                                donador.save(function(err){
                                    if (err) {
                                        res.statusCode = 304;
                                        return res.send('Donador not modified');
                                    }else{
                                        twiter('Hello #HackathonMorelos from ShareLife #UTEZ #elnieves #tengosueño');
                                        res.statusCode = 202;
                                        return res.send('Donador modified');
                                    }
                                });
                            }else{
                                res.statusCode = 404;
                                return res.send('Donador not found');
                            }
                        });
                    }
                });
            }
        });
    }

    //API Routes 
    server.get('/donador', auth.Authorise, getDonadores);
    server.post('/donador', auth.Authorise , addDonador);
    server.patch('/donador', auth.Authorise , updateState);
    server.get('/heroe', auth.Authorise, getHeroes);
}