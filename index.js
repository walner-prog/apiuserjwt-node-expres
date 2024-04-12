const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const db = require('./db'); 
const cors = require('cors');

const app = express();
const port = 3000;




// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para habilitar CORS
app.use(cors());

// Ruta de registro
app.post('/registro', (req, res) => {
  const { username, email, password } = req.body;
  // Hash de la contraseña
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).send('Error interno al registrar bcrypt');
      return;
      console.log(res)
    }
    // Guardar el usuario en la base de datos
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err, result) => {
      if (err) {
        res.status(500).send('Error interno al registrar en la bd');
        return;
      }
      res.status(200).send('Usuario registrado con éxito');
    });
  });
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Buscar usuario por nombre de usuario
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      res.status(500).send('Error interno al iniciar sesión');
      return;
    }
    if (results.length === 0) {
      res.status(401).send('Usuario no encontrado');
      return;
    }
    // Comparar la contraseña con el hash almacenado
    bcrypt.compare(password, results[0].password, (err, result) => {
      if (err) {
        res.status(500).send('Error interno al iniciar sesión');
        return;
      }
      if (!result) {
        res.status(401).send('Contraseña incorrecta');
        return;
      }
      res.status(200).send('Inicio de sesión exitoso');
    });
  });
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  // Consulta SQL para seleccionar todos los usuarios
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Error interno al obtener usuarios');
      return;
    }
    // Enviar la lista de usuarios como respuesta
    res.status(200).json(results);
  });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
