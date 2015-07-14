// Autorización de accesos HTTP restringidos
exports.loginRequired = function (request, response, next) {
	if (request.session.user) {
		next();
	} else {
		response.redirect('/login');
	}
};

// GET login - Formulario de login
exports.new = function (request, response) {
	
	var errors = request.session.errors || {};
	request.session.errors = {};
	
	response.render('session/new', {errors: errors});
}

// POST login - Crear la sesión de usuario
exports.create = function (request, response) {
	var login = request.body.login;
	var password = request.body.password;
	
	var userController = require('./user_controller');
	
	userController.autenticar(login, password, function (error, user) {
		
		if (error) { // Si hay error, se retorna los mensajes de error de sesión
			request.session.errors = [{"message": 'Se ha producido un error: ' + error}];
			response.redirect("/login");
			return;
		}
		
		// Crear request.session.user y guardar los campos id y username 
		// La sesión se define por la existencia de: request.session.user
		request.session.user = {id: user.id, username: user.username};
		
		response.redirect(request.session.redir.toString()); // Redirección a path anterior a login 
	});
}

// DELETE /logout - Destruir la sesión
exports.destroy = function (request, response) {
	delete request.session.user;
	response.redirect(request.session.redir.toString()); // Redirección a path anterior a login 
	
}

