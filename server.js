const express = require('express');
const mysql = require('mysql2');
const app = express();

// Port par défaut sur OpenShift est souvent 8080
const port = process.env.PORT || 8080;

// Configuration de la connexion à la base de données via variables d'environnement
const dbConfig = {
    host: process.env.DB_HOST || 'mysql', // 'mysql' correspond au Service Name créé à l'Action 1
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root123',
    database: process.env.DB_NAME || 'testdb'
};

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur la VM 2 (Zone DMZ)</h1><p>Serveur Node.js déployé avec succès sur OpenShift !</p>');
});

app.get('/test-db', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    
    connection.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la DB:', err);
            res.status(500).send('Erreur de connexion à la base de données (Le LAN est injoignable).');
            return;
        }
        res.send('<h3>Succès !</h3><p>Le serveur Web (DMZ) a réussi à se connecter à MySQL (LAN) !</p>');
        connection.end();
    });
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
