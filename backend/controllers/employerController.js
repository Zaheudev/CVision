const Employer = require('../models/Employer');

// functia asta ar putea fii considerata duplicata cu cea din profileController
// dar ar putea fii utila daca vrem sa accesam direct profilul unui angajator
// fara a trece prin logica comuna din profileController.
// poate fi scoasa functia. o lasam momentan aici pentru claritate.
// ar putea fi folosita si pentru a o accesa dupa ce trece un middleleware
// de securitate.
exports.getEmployerProfile = async (req, res) => {
    try {
        const employer = await Employer.findById(req.user.id).select('-passwordHash');
        if (!employer) {
            return res.status(404).json({ message: 'Employer not found' });
        }
        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};

exports.updateEmployerProfile = async (req, res) => {
    try {
        const employer = await Employer.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-passwordHash');
        if (!employer) {
            return res.status(404).json({ message: 'Employer not found' });
        }
        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};