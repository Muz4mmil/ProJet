const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).send({ message: "Enter All Fields" });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            res.status(400).send({ message: "User Already Exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            saved: [],
            password: hashedPassword,
        });

        if (user) {
            const token = generateToken(user.id);
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                saved: user.saved,
                token,
            });
        } else {
            res.status(500).send({ message: "Failed to create user" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send({ message: "Enter All Fields" });
        }

        const user = await User.findOne({ email });
        let isMatch;
        if (user) {
            isMatch = bcrypt.compare(password, user.password);
        }

        if (user && isMatch) {
            const token = generateToken(user.id);
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                token,
                saved: user.saved,
            });
        } else {
            res.status(400).send({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Invalid Credentials" });
    }
};

const googleLogin = async (req, res) => {
    try {
        const accessToken = req.body.googleAuthUser.access_token;
        let gUser;
        await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        })
            .then((response) => {
                gUser = response.data;
            })
            .catch((err) => console.log(err));

        const email = gUser.email;
        const user = await User.findOne({ email });

        if (user) {
            const token = generateToken(user.id);
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                token,
                picture: user.picture,
                saved: user.saved,
            });
        } else {
            const newUser = await User.create({
                name: gUser.name,
                email: gUser.email,
                saved: [],
                picture: gUser.picture,
            });

            if (newUser) {
                const token = generateToken(newUser.id);
                res.status(200).json({
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    picture: newUser.picture,
                    saved: newUser.saved,
                    token,
                });
            } else {
                res.status(400).send({ message: "Error Login with Google" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        const { id, name, email, saved, picture } = await User.findById(req.user.id);

        res.status(200).json({
            id: id,
            name,
            email,
            saved,
            picture,
        });
    } catch (error) {
        console.log(error);
    }
};

const getUserInfo = async (req, res) => {
    try {
        const { uid } = req.query;
        const { id, name, email, saved, picture } = await User.findById(uid);

        res.status(200).json({
            id: id,
            name,
            email,
            saved,
            picture,
        });
    } catch (error) {
        console.log(error);
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const saveProject = async (req, res) => {
    try {
        const id = req.query.id;
        const user = req.user.id;

        const userDoc = await User.findById(user);

        if (userDoc.saved.includes(id)) {
            userDoc.saved = userDoc.saved.filter((item) => item !== id);
        } else {
            userDoc.saved.push(id);
        }

        await userDoc.save();

        return res.status(200).json(userDoc.saved);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    getMe,
    getUserInfo,
    saveProject,
};
