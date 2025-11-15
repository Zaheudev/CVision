const express = require('express');
const router = express.Router();
const { registerCandidate, loginCandidate, registerEmployer, loginEmployer } = require('../controllers/authController');

// endpoints pentru înregistrare și autentificare a candidatilor
router.post('/registerCandidate', registerCandidate);
router.post('/loginCandidate', loginCandidate);

// endpoints pentru înregistrare și autentificare a employers
router.post('/registerEmployer', registerEmployer);
router.post('/loginEmployer', loginEmployer);

module.exports = router;