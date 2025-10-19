
// Am generat cu copilot un script pt a pornit un server express foarte simplu dupa care il vom dezvolta pe parcurs
// este pentru testare momentan
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root
app.get('/', (req, res) => {
    res.json({ message: 'CVision backend running' });
});

// Health check
app.get('/health', (req, res) => {
    res.sendStatus(200);
});

// Example POST endpoint
app.post('/echo', (req, res) => {
    res.json({ received: req.body });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});