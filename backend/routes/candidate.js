const express = require('express');
const router = express.Router();
const { updateCandidateProfile, applyToJob, generateCVContent } = require('../controllers/candidateController');
const authenticate = require('../middleware/authenticate');

// endpoints pentru candidat
router.put('/update', authenticate , updateCandidateProfile);
router.post('/apply/:jobId', authenticate , applyToJob);
router.get("/generate-cv", authenticate, generateCVContent);

module.exports = router;