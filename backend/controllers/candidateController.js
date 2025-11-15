const Candidate = require('../models/Candidate');

exports.getCandidateProfile = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.user.id).select('-passwordHash');
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};

exports.updateCandidateProfile = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-passwordHash');
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};