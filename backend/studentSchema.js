const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String},
    mobileNo: { type: String},
    dateOfBirth: { type: String},
    workExperience: { type: String},
    resumeTitle: { type: String},
    currentLocation: { type: String},
    postalAddress: { type: String},
    currentEmployer: { type: String},
    currentDesignation: { type: String},
});

module.exports = mongoose.model('Student', studentSchema);