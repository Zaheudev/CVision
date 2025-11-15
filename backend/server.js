const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const errorHandler = require('./middleware/errorHandler');

const corsOptions = {
   origin: '*', // Replace with your frontend URL
};

app.use(cors(corsOptions))
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
app.use('/api/candidate', require('./routes/candidate'));
app.use('/api/employer', require('./routes/employer'));

//Error handling middleware
app.use(errorHandler);