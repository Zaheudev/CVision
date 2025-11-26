const Candidate = require('../models/Candidate');
const Employer = require('../models/Employer');

const getUserById = require('./getUser').getUserById;

// in accest controller implementam functii comune pentru employer si candidat
// si le expunem ca si route-uri. e doar pentru a face codul mai usor de intretinut
// si a evita duplicarea codului in celelalte controllere.
// reultand folosirea cu usurinta a apiului si a codului backend.
exports.getProfileData = async (req, res) => {
    console.log(req.user.id);
    try {
        const user = await getUserById(req.user.id);
        delete user.passwordHash;
        if(user instanceof Candidate) {
            return res.status(200).json({user, userType: 'candidate'});
        } else if (user instanceof Employer) {
            return res.status(200).json({user, userType: 'employer'});
        }
        return res.status(404).json({ message: 'Profile not found' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
}