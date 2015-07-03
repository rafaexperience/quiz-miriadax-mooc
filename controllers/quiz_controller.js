var models = require('../models/models.js');

// GET /quizes
exports.index = function (request, response) {
	models.Quiz.findAll().then(function(quizes) {
		response.render('quizes/index', {title: 'Quiz', quizes: quizes});
	});
};

// GET /quizes/question

// Versión sin base de datos
/*exports.question = function (request, response) {
	response.render('quizes/question',  {title: 'Quiz', pregunta: 'Capital de Italia' });
};*/

// Versión con base de datos
/*exports.question = function (request, response) {
	models.Quiz.findAll().success(function(quiz) {
		response.render('quizes/question', {title: 'Quiz', pregunta: quiz[0].pregunta});
	});
};*/
// GET /quizes/:id
exports.show = function (request, response) {
	models.Quiz.find(request.params.quizId).then(function(quiz) {
		response.render('quizes/show', {title: 'Quiz', quiz: quiz});
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
/*exports.answer = function (request, response) {
	models.Quiz.findAll().success(function(quiz) {
		if (request.query.respuesta === quiz[0].respuesta) {
			response.render('quizes/answer', {title: 'Quiz', respuesta: 'Correcta'});
		} else {
			response.render('quizes/answer', {title: 'Quiz', respuesta: 'Incorrecta'});
		}
	});
};*/

// GET /quizes/:id/answer
exports.answer = function (request, response) {
	models.Quiz.find(request.params.quizId).then(function(quiz) {
		if (request.query.respuesta === quiz.respuesta) {
			response.render('quizes/answer', {title: 'Quiz', quiz: quiz, respuesta: 'Correcta'});
		} else {
			response.render('quizes/answer', {title: 'Quiz', quiz: quiz, respuesta: 'Incorrecta'});
		}
	});
};

// GET /author
exports.author = function (request, response) {
	response.render('author', {title: 'Quiz', nombre:'Jesús', apellido:'Iglesias'});
}