const db = require('pg-promise')()({
  host: 'database', // El nombre del servicio en docker-compose
  port: 5432, // Puerto predeterminado de PostgreSQL
  database: 'pokemon', // Nombre de la base de datos
  user: 'alumno', // Usuario configurado en el contenedor de PostgreSQL
  password: 'alumno', // Contraseña configurada en el contenedor de PostgreSQL
});


module.exports = db;
