// Definición del modelo de comentarios con validación
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Comment',
		{ 
			texto :  {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "Falta introducir el comentario"}}
			},
			publicado: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		});
}