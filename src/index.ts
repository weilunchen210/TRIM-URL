import express from 'express';
import mongoose from 'mongoose';
import url  from './routes/urlRoutes.js';
import user from './routes/userRoutes.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());


app.use('/url', url);
app.use('/user', user);

console.log(process.env.MONGODB_URL)

mongoose.connect(process.env.MONGODB_URL, {
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})