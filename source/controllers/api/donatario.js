module.exports = function(server) {

    var Donatario = require('../../models/donatario');
    var User = require('../../models/user');
    var auth = require('../../middlewares/authorise');
    var moment = require('moment');

    getDonatarios = function(req, res){
        Donatario.find({}, function(err, donatarios){
            if (err) {
                res.statusCode = 404;
                return res.send('Donatarios not found');
            }else{
                var idDonatorios = [];
                for (var i = 0; i < donatarios.length ; i++) {
                    idDonatorios.push(donatarios[i].id_usuario);
                };
                User.find({'_id' : {$in:idDonatorios}}, function(err, usuarios){
                    if (err) {
                        res.statusCode = 404;
                        return res.send('Destinatarios not found');
                    }else{
                        res.statusCode = 200;
                        return res.send(usuarios);
                    }
                });
            }
        });
    }

    getBeneficiados = function(req, res){
        Donatario.find({'have_recived_transplant':true}, function(err, donatarios){
            if (err) {
                res.statusCode = 404;
                return res.send('Donatarios not found');
            }else{
                var idDonatorios = [];
                for (var i = 0; i < donatarios.length ; i++) {
                    idDonatorios.push(donatarios[i].id_usuario);
                };
                User.find({'_id' : {$in:idDonatorios}}, function(err, usuarios){
                    if (err) {
                        res.statusCode = 404;
                        return res.send('Destinatarios not found');
                    }else{
                        res.statusCode = 200;
                        return res.send(usuarios);
                    }
                });
            }
        });
    }

    addDonatario = function(req, res) {
        var newDonatario = new Donatario({
            id_usuario: req.body.id_usuario
        });

        newDonatario.save(function(err) {
            if (err) {
                console.log('ERROR: ' + err);
                res.statusCode = 400;
                return res.send('Error');
            } else {
                console.log('Donatario Successfully Saved');
                return res.send(newDonatario);
            }
        });
    };

    updateDonatario = function(req, res) {
        Donatario.findById(req.body.id_donatario, function(err, donatario){
            if (donatario) {
                donatario.have_recived_transplant = true;
                donatario.last_transplant = moment(new Date()).format('YYYY-MM-DD');
                donatario.save(function(err){
                    if (err) {
                        res.statusCode = 304;
                        return res.send('Donatario not modified');
                    }else{
                        res.statusCode = 202;
                        return res.send('Donatario modified');
                    }
                });
            }else{
                Donatario.findOne({'id_usuario': req.body.id_donatario}, function(err, donatario){
                    donatario.have_recived_transplant = true;
                    donatario.last_transplant = moment(new Date()).format('YYYY-MM-DD');
                    donatario.save(function(err){
                        if (err) {
                            res.statusCode = 304;
                            return res.send('Donatario not modified');
                        }else{
                            res.statusCode = 202;
                            return res.send('Donatario modified');
                        }
                    });
                });
            }
        });
    };

    //API Routes 
    server.get('/donatario', auth.Authorise, getDonatarios);
    server.get('/benefeciado', auth.Authorise, getBeneficiados);
    server.post('/donatario', auth.Authorise , addDonatario);
    server.patch('/donatario', auth.Authorise, updateDonatario);
}