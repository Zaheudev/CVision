const express = require('express');
const router = express.Router();
const { getCandidateProfile, updateCandidateProfile } = require('../controllers/candidateController');
const authenticate = require('../middleware/authenticate');

// endpoints pentru înregistrare și autentificare
router.get('/', authenticate ,getCandidateProfile);
router.put('/update', authenticate , updateCandidateProfile);

module.exports = router;