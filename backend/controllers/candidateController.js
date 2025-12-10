const Candidate = require('../models/Candidate');
const Job = require('../models/Job');

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

exports.applyToJob = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.user.id);
        const job = await Job.findById(req.params.jobId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }else if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Verificam daca candidatul a aplicat deja la acest job
        if (candidate.appliedJobs.includes(req.params.jobId) && job.applicants.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already applied to this job' });
        }else {
            candidate.appliedJobs.push(req.params.jobId);
            job.applicants.push(req.user.id);
            await job.save();
            await candidate.save();
            return res.status(200).json({ message: 'Applied to job successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
}

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