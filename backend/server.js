
// Am generat cu copilot un script pt a pornit un server express foarte simplu dupa care il vom dezvolta pe parcurs
// este pentru testare momentan
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
dotenv.config();

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

app.use('/api/auth', require('./routes/auth'));

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