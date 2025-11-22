const express = require('express');
const app = express();
const PORT = 3000;

// Logica de test 1: Fara middleware, fara rute externe, fara DB
app.get('/', (req, res) => {
    console.log('Cerere primita pe ruta radacina.');
    res.send('Salut! Serverul functioneaza.');
});

// In loc de app.listen(PORT, ...)
app.listen(PORT, '127.0.0.1', () => { 
    console.log(`Serverul ruleaza pe 127.0.0.1:${PORT}`); 
});