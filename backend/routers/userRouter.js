import express from "express";
import { getMe, loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/me', getMe)

export default router;