const express = require('express');
const mysql = require('mysql2');

const app = express();

// Configuration PORT (OpenShift)
const PORT = process.env.PORT || 3000;

// Connexion MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'appdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur connexion DB:', err);
  } else {
    console.log('Connecté à MySQL ');
  }
});

// Route principale
app.get('/', (req, res) => {
  res.send('Mon application Node.js fonctionne sur OpenShift 🚀');
});

// Test DB
app.get('/db', (req, res) => {
  connection.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      res.send('Erreur DB');
    } else {
      res.send('Résultat DB: ' + results[0].result);
    }
  });
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`App started on PORT ${PORT}`);
});