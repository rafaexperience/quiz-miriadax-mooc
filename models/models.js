// Construye la DB y el modelo importándolo de quiz.js

var path = require('path');

// Cargar modelo ORM - sequelize.js
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"}); 

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

// Crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function() {
	// Success() - ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count) {
		if (count === 0) { // Si tabla vacía, se inicializa
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			})
		.success(function () { console.log('Base de datos inicializada'); });
		};
	});
});