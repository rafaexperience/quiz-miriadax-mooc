// Definición del modelo de Quiz
// Estructura de la tabla
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{ 
			/*
			pregunta: DataTypes.STRING,
			respuesta: DataTypes.STRING,
			*/
			pregunta: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "Falta introducir la pregunta"}}
			},
			respuesta: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "Falta introducir la respuesta"}}
			},
			indice: DataTypes.STRING,
		});
}