// aici impmentam mai multe functii care utilizatorul (angajator sau candidat) 
// in functie de de datele din parametru,

const Candidate = require('../models/Candidate');
const Employer = require('../models/Employer');

exports.getUserByEmail = async (email) => {
    try {
        const candidate = await Candidate.findOne({ email });
        if (candidate) {
            return candidate;
        }
        const employer = await Employer.findOne({ email });
        if (employer) {
            return employer;
        }
    } catch (err) {
        console.log("Error in getUserByEmail");
        return null;
    }
};

exports.getUserById = async (id) => {
    try {
        const candidate = await Candidate.findById(id);
        if (candidate) {
            return candidate;
        }
        const employer = await Employer.findById(id);
        if (employer) {
            return employer;
        }
    } catch (err) {
        console.log("Error in getUserById");
        return null;
    }
};