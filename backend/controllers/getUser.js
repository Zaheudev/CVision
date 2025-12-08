// aici impmentam mai multe functii care returneaza utilizatorul
//  (angajator sau candidat) dupa un anumit criteriu de search.
// functiile sunt folosite in mai multe locuri in backend, deci intern,
// nu le exportam ca si route-uri. Ele returneaza un obiect user folosite de 
// alte functii din backend pentru a evita duplicarea codului si 
// a face codul mai usor de intretinut. 
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
        const candidate = await Candidate.findById(id).select('-passwordHash');
        if (candidate) {
            return candidate;
        }
        const employer = await Employer.findById(id).select('-passwordHash');
        if (employer) {
            return employer;
        }
    } catch (err) {
        console.log("Error in getUserById");
        return null;
    }
};