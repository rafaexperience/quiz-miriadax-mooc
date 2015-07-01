// GET /quizes/question
exports.question = function (request, response) {
	response.render('quizes/question',  {title: 'Quiz', pregunta: 'Capital de Italia' });
};

// GET /quizes/answer
exports.answer = function (request, response) {
	if (request.query.respuesta === 'Roma') {
		response.render('quizes/answer', {title: 'Quiz', respuesta: 'Correcta'});
	} else {
		response.render('quizes/answer', {title: 'Quiz', respuesta: 'Incorrecta'});
	}
};