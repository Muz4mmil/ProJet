import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import axios from 'axios'

export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).send({ message: "Enter All Fields" })
        }

        const userExist = await User.findOne({ email })

        if (userExist) {
            res.status(400).send({ message: "User Already Exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            saved: [],
            password: hashedPassword,
        })

        if (user) {
            const token = generateToken(user.id)
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                saved: user.saved,
                token,
            })
        } else {
            res.status(500).send({ message: "Failed to create user" })
        }

    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send({ message: "Enter All Fields" })
        }

        const user = await User.findOne({ email })
        let isMatch
        if(user){
            isMatch = bcrypt.compare(password, user.password)
        }

        if (user && isMatch) {
            const token = generateToken(user.id)
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                token,
                saved: user.saved
            })
        } else {
            res.status(400).send({ message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Invalid Credentials" })
    }

}

export const googleLogin = async (req, res) => {
    try {
        const accessToken = req.body.googleAuthUser.access_token
        console.log(accessToken);
        let gUser;
        await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
            .then((res) => {
                gUser = res.data
            })
            .catch((err) => console.log(err));

        const email = gUser.email
        const user = await User.findOne({ email })

        if (user) {
            const token = generateToken(user.id)
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                token,
                picture: user.picture,
                saved: user.saved
            })
        } else {
            const newUser = await User.create({
                name: gUser.name,
                email: gUser.email,
                saved: [],
                picture: gUser.picture
            })

            if (newUser) {
                const token = generateToken(newUser.id)
                res.status(200).json({
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    picture: newUser.picture,
                    saved: newUser.saved,
                    token,
                })
            } else {
                res.status(400).send({ message: "Error Login with Google" })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

export const getMe = async (req, res) => {
    try {
        const { _id, name, email, saved } = await User.findById(req.user.id)

        res.status(200).json({
            id: _id,
            name,
            email,
            saved
        })
    } catch (error) {
        console.log(error);
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}