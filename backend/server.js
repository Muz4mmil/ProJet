const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const userRouter = require('./routers/userRouter');
const projectRouter = require('./routers/projectRouter');
const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);

connectDB();

app.listen(PORT, () => console.log('Listening to Port ' + PORT));

module.exports = app;
