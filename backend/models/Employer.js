const mongoose = require('mongoose');

// asta e modelul pentru angajatori in baza de date, urmeaza sa adaugam 
// campuri pe masura ce dezvoltam aplicatia.
// modelul asta este unul similar cu cel al candidatului.
// pt a te loga ca si angajator va trebui sa creezi un endpoint separat
// si sa faci modificarile necesare in controllerul de auth
// pentru ca altfel nu prea imi vine in minte cum sa functioneze.
// doar sa mai fac inca un model care sa contina email si parola si de acolo
// sa adaug camp nou in fiecare model cu referinta la userul respectiv creat
// dar ar fii bataie de cap cand am face request si asa mai departe
// cel mai simplu si eficient ar fii sa avem endpoint separat pentru angajatori
// intr-un real caz poate ar fii o idee mai buna sa fie un model separat pt parola si email
// dar pentru scopul aplicatiei noastre momentan cred ca e ok asa

const employerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    industry: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Employer', employerSchema);