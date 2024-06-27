import express from "express";
import { getMe, loginUser, registerUser } from "../controllers/userController.js";
import { verify } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', verify, getMe)

export default router;