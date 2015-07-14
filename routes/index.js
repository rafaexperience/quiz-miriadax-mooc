var express = require('express');
var router = express.Router();

// Importación del controlador
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
// Método param(), solo invoqua a quizController.load si existe el parámetro :quizId 
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

// RUTAS DE SESIÓN
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

// RUTAS QUIZES
// HTTP-GET: Preguntas y respuestas
//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

// Añadiendo más preguntas
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// Crear preguntas
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
// Editar y actualizar preguntas
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
// Eliminar preguntas
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

// RUTAS COMENTARIOS - Crear comentario
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

// HTTP-GET: Autor
router.get('/author', quizController.author);

module.exports = router;
