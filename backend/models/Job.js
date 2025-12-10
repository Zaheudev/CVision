const mongoose = require('mongoose');
const Employer = require('./Employer');

// asta e modelul pentru joburi in baza de date, urmeaza sa adaugam 
// campuri pe masura ce dezvoltam aplicatia.

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true,
        trim: true,
    },
    tags: [{
        type: String
    }],
    requirements: {
        type: String
    },
    salary: {
        type: Number,
        default: null
    },
    benefits: [{
        type: String
    }],
    level: {
        type: String,
        enum: ['entry', 'mid', 'senior', 'lead'],
        required: true
    },
    type: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'closed', 'draft'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', jobSchema);