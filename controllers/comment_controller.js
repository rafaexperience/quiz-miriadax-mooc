var models = require('../models/models.js');

// Autoload :id comentarios
exports.load = function (request, response, next, commentId) {
	models.Comment.find({
		where: {
			id: Number (commentId)
		}
	}).then(function(comment) {
		if (comment) {
			request.comment = comment;
			next();
		} else {
			next(new Error("No existe commentId= " + commentId))};
		}
	).catch(function(error){next(error)});
};

// GET /quizes/:quizId/comments/new
exports.new = function (request, response) {
	response.render('comments/new.ejs', {quizid: request.params.quizId, errors: []});	
};

// POST /quizes/:quizId/comments
exports.create = function (request, response) {
	var comment = models.Comment.build(
	{
		texto: request.body.comment.texto,
		QuizId: request.params.quizId		
	});
	
	comment.validate().then(
		function (err) {
			if (err) {
				response.render('comments/new.ejs',
					{comment: comment, quizid: request.params.quizId, errors: err.errors});
			} else {
				comment.save().then( function(){ response.redirect('/quizes/'+request.params.quizId)})
			}
		}
	).catch(function(error){ next(error)});
	
	/*var errors = comment.validate();
	if (errors) {
		var i=0; 
		var errores=new Array(); // Se convierte en [] con la propiedad message por compatibilidad con layout
		
		for (var prop in errors) errores[i++]={
			message: errors[prop]
		};
		
		response.render('comments/new.ejs', {
			comment: comment, quizid: request.params.quizId, errors: errores
		});
		
	} else {
		comment.save().then( function() { response.redirect('/quizes/'+request.params.quizId)})
	}*/
};
	
// GET /quizes/:quizId/comments/:commentId/publish
exports.publish = function(request, response) {
	request.comment.publicado = true;
	
	request.comment.save({fields: ["publicado"]}).then( function(){
		response.redirect('/quizes/'+request.params.quizId);} )
		.catch(function(error){ next(error)
	});	
}
