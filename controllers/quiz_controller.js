var models = require('../models/models.js');

// Autoload - factoriza el código si la ruta incluye :quizId
exports.load = function(request, response, next, quizId) {
	models.Quiz.find(quizId).then(
		function (quiz) {
			if (quiz) {
				request.quiz = quiz;
				next();
			} else {
				next(new Error("No existe quizId = " + quizId));
			}
		}
		).catch(function(error) { next(error);});
};


// GET /quizes
/*exports.index = function (request, response) {
	models.Quiz.findAll().then(function(quizes) {
		response.render('quizes/index', {quizes: quizes});
	}
	).catch(function(error) { next(error);});
};*/
exports.index = function (request, response) {
	
 	var search = request.query.search;
	
	if (search == null) { // Mostrar todas las preguntas
		
		models.Quiz.findAll().then(function(quizes) {
			response.render('quizes/index', {quizes: quizes, mensaje: false, errors: []});
		}).catch(function(error) { next(error);});
		
	} else { // Búsqueda de preguntas
	
		// Búsqueda de frases
		search = '%'+request.query.search.replace(/ /, '%')+'%';
	
		models.Quiz.findAll({where: ["pregunta like ?", search], order:'pregunta ASC'}).then(function(quizes) {
			
			console.log("contenido de quizes: " + quizes + " longitud: " + quizes.length);
			
			if (quizes.length == 0){
				models.Quiz.findAll().then(function(quizes) {
					response.render('quizes/index', {quizes: quizes, mensaje: true, errors: []});
				}).catch(function(error) { next(error);});
				
			} else {
			response.render('quizes/index', {quizes: quizes, mensaje: false, errors: []}); }
		}
		).catch(function(error) { next(error);});
	}
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
/*exports.show = function (request, response) {
	models.Quiz.find(request.params.quizId).then(function(quiz) {
		response.render('quizes/show', {title: 'Quiz', quiz: quiz});
	});
};*/
exports.show = function (request, response) {
	response.render('quizes/show', {quiz: request.quiz, errors: []});
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
/*exports.answer = function (request, response) {
	models.Quiz.find(request.params.quizId).then(function(quiz) {
		if (request.query.respuesta === quiz.respuesta) {
			response.render('quizes/answer', {title: 'Quiz', quiz: quiz, respuesta: 'Correcta'});
		} else {
			response.render('quizes/answer', {title: 'Quiz', quiz: quiz, respuesta: 'Incorrecta'});
		}
	});
};*/
exports.answer = function (request, response) {
	var resultado = "Incorrecta";
	if (request.query.respuesta === request.quiz.respuesta) {
		resultado = "Correcta";
	}
	response.render('quizes/answer', {quiz: request.quiz, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new = function (request, response) {
	var quiz = models.Quiz.build( // Crea objeto quiz
		{
			pregunta: "Pregunta",
			respuesta: "Respuesta",
			indice: "Indice"
		});
	response.render('quizes/new', {quiz: quiz, errors: []});
};


/*exports.create = function (request, response) {
	var quiz = models.Quiz.build(request.body.quiz);
	
	// Validación de campos de entrada y almacenamiento de los campos pregunta y respuesta de quiz en la BBDD
	quiz.validate().then(
		function (err) {
			if (err) {
				response.render('quizes/new', {quiz: quiz, errors: err.errors});			
			} else {
				quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
				response.redirect('/quizes'); });
			}	
		}
	);	
};*/

// POST /quizes/create
exports.create = function(request, response){
	var quiz = models.Quiz.build( request.body.quiz );

	var errors = quiz.validate(); // Objeto errors no tiene then
	if (errors) {
		var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilidad con layout
		for (var prop in errors) errores[i++]={message: errors[prop]};
		response.render('quizes/new', {quiz: quiz, errors: errores});
	} else {
		quiz.save({fields: ["pregunta", "respuesta", "indice"]}).then( function(){ response.redirect('/quizes')}) ;
	}
};
	// Guarda los campos pregunta y respuesta de quiz en la BBDD
	/*quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		response.redirect('/quizes'); // Redirección HTTP - Lista de preguntas
	});*/

// GET /quizes/:id/edit
exports.edit = function(request, response) {
	var quiz = request.quiz; // Autoload de instancia de quiz
	response.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function (request, response) {
	request.quiz.pregunta = request.body.quiz.pregunta;
	request.quiz.respuesta = request.body.quiz.respuesta;
	request.quiz.indice = request.body.quiz.indice;
	
	var errors = request.quiz.validate(); // Objeto errors no tiene then
	if (errors) {
		var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilidad con layout
		for (var prop in errors) errores[i++]={message: errors[prop]};
		response.render('quizes/edit', {quiz: request.quiz, errors: errores});
	} else {
		request.quiz.save({fields: ["pregunta", "respuesta", "indice"]}).then(function(){
		response.redirect('/quizes'); });
	}
};
	
	/*request.quiz.validate().then(	
		function (err) {
			if (err) {
				response.render('quizes/edit', {quiz: request.quiz, errors: err.errors});			
			} else {
				request.quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
				response.redirect('/quizes'); });
			}	
		}
	);
};*/

// DELETE /quizes/:id
exports.destroy = function (request, response) {
	request.quiz.destroy().then( function (){
		response.redirect('/quizes');
	}).catch(function (error) { next(error)});
};

// GET /author
exports.author = function (request, response) {
	response.render('author', {nombre:'Jesús', apellido:'Iglesias', errors: []});
}