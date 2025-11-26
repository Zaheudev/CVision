const mongoose = require('mongoose');

// asta e modelul pentru useri in baza de date, urmeaza sa adaugam 
// campuri pe masura ce dezvoltam aplicatia.

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    skills: {
        type: [String],
        default: []
    },
    experience: [{
        type: String
    }],
    // campul pt educatie o sa fie compus din mai multe subcampuri, liceu si universitate
    education: {
        highscool: {
            type: String,
            trim: true
        },
        bachelor: {
            type: String,
            trim: true
        }
    },
    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Candidate', candidateSchema);