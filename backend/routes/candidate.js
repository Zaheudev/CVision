const express = require('express');
const router = express.Router();
const { getCandidateProfile } = require('../controllers/candidateController');
const authenticate = require('../middleware/authenticate');

// endpoints pentru înregistrare și autentificare
router.get('/',authenticate ,getCandidateProfile);

module.exports = router;