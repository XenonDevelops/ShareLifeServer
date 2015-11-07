module.exports = function(server) {

    var User = require('../../models/user');
    var auth = require('../../middlewares/authorise');
    var moment = require('moment');

    authUser = function(req, res) {
        console.log(req.body.email + req.body.password);
        User.findOne({'email' : req.body.email, 'password': req.body.password}, function(err, usuario){
            console.log(usuario);
            if (usuario) {
                res.statuCode = 200;
                return res.send(usuario);
            }else{
                res.statuCode = 401;
                return res.send('Credenciales no validas');
            }
        });
    };

    //API Routes 
    server.post('/auth', authUser);
}