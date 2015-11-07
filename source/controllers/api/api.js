module.exports = function(server){
	require('./auth')(server);
	require('./deceso_notificacion')(server);
	require('./donador')(server);
	require('./donatario')(server);
	require('./experiencia')(server);
	require('./user')(server);
}