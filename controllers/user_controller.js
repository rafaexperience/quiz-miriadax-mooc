var users = {
	admin: {id: 1, username: "admin", password: "12345"},
	pepe: {id: 2, username: "pepe", password: "67890"} 
};

// Comprueba si el usuario está registrado en users
// Si la autenticación falla o existen errores se ejecuta: callback(error)
exports.autenticar = function (login, password, callback){
	if (users[login]) {
		if (password === users[login].password) {
			callback(null, users[login]);
		} else {
			callback(new Error('Password erróneo'));
		}
	} else {
			callback(new Error('Usuario inexistente'));
	}
}