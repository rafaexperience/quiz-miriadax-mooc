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

// GET /author
exports.author = function (request, response) {
	console.log("Dentro de authot render");
	response.render('author', {title: 'Quiz', nombre:'Jesús', apellido:'Iglesias', prueba:'prueba2'});
}