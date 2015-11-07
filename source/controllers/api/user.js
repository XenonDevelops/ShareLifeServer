module.exports = function(server) {

    var User = require('../../models/user');
    var Donador = require('../../models/donador');
    var Donatario = require('../../models/donatario');
    var auth = require('../../middlewares/authorise');
    var moment = require('moment');

    addUser = function(req, res) {
        
        if (!req.body.email) {
            res.statusCode = 400;
            return res.send('Email not found');
        }else if (!req.body.password) {
            res.statusCode = 400;
            return res.send('Password not found');
        }else if (!req.body.name) {
            res.statusCode = 400;
            return res.send('Name not found');
        }else if (!req.body.last_name) {
            res.statusCode = 400;
            return res.send('Lastname not found');
        }else if (!req.body.birthdate) {
            res.statusCode = 400;
            return res.send('Birthdate not found');
        }else if (!req.body.sex) {
            res.statusCode = 400;
            return res.send('Sex not found');
        }

        var newUser = new User({
            email: req.body.email,
            password : req.body.password,
            name : req.body.name,
            last_name : req.body.last_name,
            birthdate : moment(req.body.birthdate).format('YYYY-MM-DD'),
            sex : req.body.sex,
            phone : req.body.phone,
            url_image : req.body.url_image
        });

        if (req.body.is_admin) {
            newUser.type_user = 'admin';
        }

        newUser.save(function(err) {
            if (err) {
                console.log('ERROR: ' + err);
                res.statusCode = 409;
                return res.send('Duplicated email');
            } else {
                if (req.body.is_donador) {
                    var newDonador = new Donador({
                        id_usuario: newUser.id,
                        status : true
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
                }else if(req.body.is_donatario){
                    var newDonatario = new Donatario({
                        organo_requerido: req.body.organo_requerido,
                        id_usuario: newUser.id
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
                }else{
                    console.log('User Successfully Saved');
                    res.statusCode = 201;
                    return res.send(newUser);
                }
            }
        });
    };

    //API Routes 
    server.post('/user', addUser);
}