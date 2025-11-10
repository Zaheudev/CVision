const express = require('express');
const router = express.Router();
const { registerCandidate, loginCandidate } = require('../controllers/authController');

// endpoints pentru înregistrare și autentificare
router.post('/register', registerCandidate);
router.post('/login', loginCandidate);

module.exports = router;