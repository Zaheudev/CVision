const express = require('express');
const router = express.Router();
const { getProfileData } = require('../controllers/profileController');
const authenticate = require('../middleware/authenticate');
const checkOwnership = require('../middleware/checkOwnership');

// endppoints comune pentru angajator si candidat
router.get('/', authenticate, getProfileData);
router.post("/login", getProfileData);
router.post("/register", getProfileData);

module.exports = router;