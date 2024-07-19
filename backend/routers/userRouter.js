const express = require("express");
const {
    getMe,
    getUserInfo,
    googleLogin,
    loginUser,
    registerUser,
    saveProject,
} = require("../controllers/userController");
const { verify } = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/googleAuth', googleLogin);
router.get('/me', verify, getMe);
router.get('/user', getUserInfo);
router.put('/save', verify, saveProject);

module.exports = router;
