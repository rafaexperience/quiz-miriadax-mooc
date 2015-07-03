// Definición del modelo de Quiz
// Estructura de la tabla
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{ 
			pregunta: DataTypes.STRING,
			respuesta: DataTypes.STRING,
		});
}