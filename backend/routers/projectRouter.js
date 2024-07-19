import express from "express";
import { createProject, deleteProject, getProjects, updateProject } from "../controllers/projectController.js";
import { verify } from "../middleware/authMiddleware.js";
import multer from "multer";
import fs from 'fs'
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderName = req.body.name.toLowerCase();
        const uploadPath = path.join(__dirname, 'uploads', folderName);

        // Check if the folder exists, and create it if it doesn't
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        return cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const router = express.Router()

router.get('/', getProjects)
router.post('/getSaved', getProjects)
router.post('/', verify, upload.array('images', 20), createProject)
router.put('/:id', verify, updateProject)
router.delete('/:id', verify, deleteProject)

export default router;