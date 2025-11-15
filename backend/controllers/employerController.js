const Employer = require('../models/Employer');

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