import { User } from "../models/userModel.js";

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

        const user = await User.create({
            name,
            email,
            password
        })

        if (user) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
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

        if (user && user.password == password) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
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