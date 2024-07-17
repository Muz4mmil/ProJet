import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import userRouter from './routers/userRouter.js'
import projectRouter from './routers/projectRouter.js'
import cors from 'cors'
import multer from "multer";
const upload = multer({ dest: 'uploads/' });

dotenv.config();
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/projects', projectRouter)

connectDB()

app.listen(PORT, () => console.log('Listening to Port ' + PORT))