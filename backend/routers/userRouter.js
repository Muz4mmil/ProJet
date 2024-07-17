import express from "express";
import { getMe, getUserInfo, googleLogin, loginUser, registerUser, saveProject } from "../controllers/userController.js";
import { verify } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/googleAuth', googleLogin)
router.get('/me', verify, getMe)
router.get('/user', getUserInfo)
router.put('/save', verify, saveProject)

export default router;