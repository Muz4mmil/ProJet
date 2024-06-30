import express from "express";
import { createProject, deleteProject, getProjects, updateProject } from "../controllers/projectController.js";
import { verify } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/', getProjects)
router.post('/', verify, createProject)
router.put('/:id', verify, updateProject)
router.delete('/:id', verify, deleteProject)

export default router;