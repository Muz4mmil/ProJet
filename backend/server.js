import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import userRouter from './routers/userRouter.js'

dotenv.config();
const PORT = process.env.PORT

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', userRouter)

app.listen(PORT, () => console.log('Listening to Port ' + PORT))