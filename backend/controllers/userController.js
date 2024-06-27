import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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

        const hashedPassword = bcrypt.hash(password, 9)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        if (user) {
            const token = generateToken(user.id)
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
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

        const isMatch = bcrypt.compare(password, user.password)

        const token = generateToken(user.id)

        if (user && isMatch) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token,
            })
        } else {
            res.status(400).send({ message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

export const getMe = async (req, res) => {
    try {
        const { _id, name, email } = User.findById(req.user.id)
        res.status(200).json({
            id: _id,
            name,
            email,
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