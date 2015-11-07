
User = require('../models/user');

exports.Authorise = function (req, res, next) {
    //validamos que el usuario este activo y en registrado
    User.findOne({'email':req.headers['email'], 'password':req.headers['password']}, function(err, user) {
        if (user){
            return next();
        } else {
            res.statusCode = 401;
            return res.send('Credenciales no validas');
        }
    });
}