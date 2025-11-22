const express = require('express');
const router = express.Router();
const { registerCandidate, registerEmployer, login } = require('../controllers/authController');

// endpoints pentru înregistrare a candidatilor
router.post('/registerCandidate', registerCandidate);

// endpoints pentru înregistrare a angajatorilor
router.post('/registerEmployer', registerEmployer);

//endpoint pentru logarea utilizatorului, indififerent daca este candidat sau angajator
router.post('/login', login);

module.exports = router;