import { Project } from "../models/projectModel.js";
import { deleteFiles, uploadFile } from '../utils/firebase-upload.js'

export const createProject = async (req, res) => {
    try {
        const formData = req.body; 
        const files = req.files;

        const project = {
            ...formData,
            images: [],
            teamMembers: JSON.parse(formData.teamMembers) 
        }

        const newProject = await Project.create(project)
        const imageURLs = await uploadFile(newProject._id, files)
        const update = await Project.findByIdAndUpdate(newProject._id, {...project, images: imageURLs }, { new: true})
        
        if (newProject && update) res.status(201).json(update)
        else res.status(400).send({ message: 'Failed to new create project' })

    } catch (error) {
        res.status(500).send("Failed in function to create project "+ error.message)
    }
}

export const getProjects = async (req, res) => {
    try {
        const { id, user } = req.query;
        const saved = req.body.saved
        let data = {}

        if (id) data = await Project.findById(id)
        else if (user) data= await Project.find({ owner: user })
        else if (saved) data = await Project.find({ _id: { $in: saved }})
        else data = await Project.find({})

        return res.status(200).json(data)

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message })
    }
}

export const updateProject = async (req, res) => {
    try {
        const newProject = req.body

        const update = await Project.findByIdAndUpdate(req.params.id, newProject, { new: true})

        if (update) return res.status(200).json(update)
        else return res.status(400).send({ message: 'Failed to update project' })
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

export const deleteProject = async (req, res) => {
    try {
        await deleteFiles(req.params.id)

        const deleted = await Project.findByIdAndDelete(req.params.id)

        if (deleted) return res.status(200).json(deleted)
        else return res.status(400).send({ message: 'Failed to delete project' })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
