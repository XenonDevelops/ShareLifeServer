var express      = require('express'),
	swig         = require('swig'),
	http         = require('http'),
	passport     = require('passport'),
	session      = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser   = require('body-parser');
var server       = express();//<-------------------------------creamos el server de express
var server_socket = http.createServer(server).listen(8000);//<-creamos el server de sockets
var io = require('socket.io').listen(server_socket);//<--------el servidor de eventos escuchara en el mismo puerto que nuestro server de express

swig.setDefaults({
	cache:false,
	varControls: ['<%=', '%>'] //<-----------------------------tags que se usarán en el html para usar swig
});

//configuracion de express
server.use(bodyParser.urlencoded({ extended : true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({ secret            : 'ShaR3_2015_@ñ', 
					 key               : 'sid',
	                 saveUninitialized : true,
	                 resave            : true}));

//configuracion de  passport
server.use( passport.initialize() );
server.use( passport.session() );

passport.serializeUser(function(user,done){
	done(null,user);
});

passport.deserializeUser(function(user,done){
	done(null,user);
});

//config swig
server.engine('html',swig.renderFile);//<----------------------el motor de templates es swig
server.set('view engine','html');
server.set('views',__dirname + '/client');//<------------------en donde van a estar las vistas o templates
server.set('uploadDir', './client/uploads');//<----------------carpeta en la que se guardaran las cosas que subamos
server.use(express.static('./client'));//<---------------------aqui colocamos los ccs,js,img y toda la informacion publica.
server.use('/bower_components',  express.static(__dirname + '/bower_components'));
server.use('/node_modules',  express.static(__dirname + '/node_modules'));



//controllers
require('./source/controllers/api/api')(server);
require('./source/controllers/app/app')(server);