var express = require('express');
var router = express.Router();

// Importación del controlador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// HTTP-GET: Preguntas y respuestas
//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

// Añadiendo más preguntas
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

// HTTP-GET: Autor
router.get('/author', quizController.author);

module.exports = router;
