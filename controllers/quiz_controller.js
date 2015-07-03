var models = require('../models/models.js');


// GET /quizes/question

// Versión sin base de datos
/*exports.question = function (request, response) {
	response.render('quizes/question',  {title: 'Quiz', pregunta: 'Capital de Italia' });
};*/

// Versión con base de datos
exports.question = function (request, response) {
	models.Quiz.findAll().success(function(quiz) {
		response.render('quizes/question', {title: 'Quiz', pregunta: quiz[0].pregunta});
	});
};

// GET /quizes/answer

// Versión sin base de datos
/*exports.answer = function (request, response) {
	if (request.query.respuesta === 'Roma') {
		response.render('quizes/answer', {title: 'Quiz', respuesta: 'Correcta'});
	} else {
		response.render('quizes/answer', {title: 'Quiz', respuesta: 'Incorrecta'});
	}
}; */

// Versión con base de datos
exports.answer = function (request, response) {
	models.Quiz.findAll().success(function(quiz) {
		if (request.query.respuesta === quiz[0].respuesta) {
			response.render('quizes/answer', {title: 'Quiz', respuesta: 'Correcta'});
		} else {
			response.render('quizes/answer', {title: 'Quiz', respuesta: 'Incorrecta'});
		}
	});
};

// GET /author
exports.author = function (request, response) {
	response.render('author', {title: 'Quiz', nombre:'Jesús', apellido:'Iglesias'});
}