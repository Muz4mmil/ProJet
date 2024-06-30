import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const verify = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1]

                const decode = jwt.verify(token, process.env.JWT_SECRET)
                
                req.user = await User.findById(decode.id)

                return next();    
            } catch (error) {
                console.log(error)
                res.status(401).send({ message: "Not authorized"})
            }
        } 

        if (!token) res.status(401).send({ message: "No Auth Token Found"})
    } catch (error) {
        console.log(error)    
        res.status(400).send({ message: error.message })    
    }
}