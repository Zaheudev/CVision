const Candidate = require('../models/Candidate');

// functia asta ar putea fii considerata duplicata cu cea din profileController
// dar ar putea fii utila daca vrem sa accesam direct profilul unui candidat
// fara a trece prin logica comuna din profileController.
// poate fi scoasa functia. o lasam momentan aici pentru claritate.
// ar putea fi folosita si pentru a o accesa dupa ce trece un middleleware
// de securitate.
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