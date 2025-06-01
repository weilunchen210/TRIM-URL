import express from 'express';
import mongoose from 'mongoose';
import url  from './routes/urlRoutes.js';
import user from './routes/userRoutes.js'
import urlStatistics from './routes/urlStatisticsRoutes.js'
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173'], // Frontend URLs
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/url', url);
app.use('/user', user);
app.use('/statistics', urlStatistics);

console.log(process.env.MONGODB_URL)

mongoose.connect(process.env.MONGODB_URL, {
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})