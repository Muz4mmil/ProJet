const express = require("express");
const { createProject, deleteProject, getProjects, updateProject } = require("../controllers/projectController.js");
const { verify } = require("../middleware/authMiddleware.js");
const multer = require("multer");
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderName = req.body.name.toLowerCase();
        const uploadPath = path.join('/tmp/uploads', folderName);

        // Check if the folder exists, and create it if it doesn't
        if (!fs.existsSync(uploadPath)) {
            console.log('creating new')
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        console.log('exist')
        return cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', getProjects);
router.post('/getSaved', getProjects);
router.post('/', verify, upload.array('images', 20), createProject);
router.put('/:id', verify, updateProject);
router.delete('/:id', verify, deleteProject);

module.exports = router;
