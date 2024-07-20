const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true
    },
    teamType: {
        type: String,
        require: true
    },
    teamMembers: [Object],
    
    isOrganisationProject: {
        type: Boolean,
        require: true
    },
    organisation: {
        type: String,
        require: true
    },
    githubLink: {
        type: String,
    },
    hostedLink: {
        type: String,
    },
    images: {
        type: [String],
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
