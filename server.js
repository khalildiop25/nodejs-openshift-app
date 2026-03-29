const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Connexion à MySQL via variables d'environnement
const connection = mysql.createConnection({
   host: '10.0.2.2',     
  user: 'nodeuser',
  password: '1230',
  database: 'studentdb'
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