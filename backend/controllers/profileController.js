const Candidate = require('../models/Candidate');
const Employer = require('../models/Employer');

exports.getProfileData = async (req, res) => {
    console.log(req.user.id);
    try {
        const candidate = await Candidate.findById(req.user.id).select('-passwordHash');
        if (!candidate) {
            const employer = await Employer.findById(req.user.id).select('-passwordHash');
            if (!employer) {
                return res.status(404).json({ message: 'Profile not found' });
            }else {
                return res.status(200).json(employer);
            }
        }
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
}