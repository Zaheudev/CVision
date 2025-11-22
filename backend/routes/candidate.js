const express = require('express');
const router = express.Router();
const { updateCandidateProfile } = require('../controllers/candidateController');
const authenticate = require('../middleware/authenticate');

// endpoints pentru candidat
router.put('/update', authenticate , updateCandidateProfile);

module.exports = router;