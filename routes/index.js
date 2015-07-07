var express = require('express');
var router = express.Router();

// Importación del controlador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
// Método param(), solo invoqua a quizController.load si existe el parámetro :quizId 
router.param('quizId', quizController.load);

// HTTP-GET: Preguntas y respuestas
//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

// Añadiendo más preguntas
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// Crear preguntas
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

// HTTP-GET: Autor
router.get('/author', quizController.author);

module.exports = router;
