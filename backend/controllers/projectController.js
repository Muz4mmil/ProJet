import { Project } from "../models/projectModel";

export const createProject = async (req, res) => {
    try {
        const project = req.body;
        
        const newProject = await Project.create(project)

        if (newProject) res.status(201).json(newProject)
        else res.status(400).send({ message: 'Failed to create project' })

    } catch (error) {
        res.status(500).send("Failed to create project")
    }
}

export const getProjects = async (req, res) => {
    try {
        const { id, user } = req.query;

        let data = {}

        if (id) data = await Project.findById(id)
        else if (user) data= await Project.find({ owner: user })
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
        const deleted = await Project.findByIdAndDelete(req.params.id)

        if (deleted) return res.status(200).json(deleted)
        else return res.status(400).send({ message: 'Failed to delete project' })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}