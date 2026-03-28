const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Connexion à MySQL via variables d'environnement
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql', // nom du service MySQL dans OpenShift
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'AppPass123',
  database: process.env.DB_NAME || 'appdb'
});

connection.connect(err => {
  if (err) {
    console.error('Erreur MySQL :', err);
    return;
  }
  console.log('Connecté à MySQL');
});

app.get('/', (req, res) => {
  connection.query('SELECT NOW() AS now', (err, results) => {
    if (err) return res.send('Erreur DB');
    res.send(`Connexion DB OK, serveur temps : ${results[0].now}`);
  });
});

app.listen(port, () => {
  console.log(`Serveur Node.js démarré sur http://localhost:${port}`);
});