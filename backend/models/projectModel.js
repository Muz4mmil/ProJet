import mongoose from "mongoose";

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
    teamMembers: {
        type: [String],
    },
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
    projectImagesURLs: {
        type: [String],
    }
})

export const Project = mongoose.model('Project', projectSchema)

