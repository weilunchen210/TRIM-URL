import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import url  from './routes/urlRoutes.js';
import user from './routes/userRoutes.js'
import urlStatistics from './routes/urlStatisticsRoutes.js'
import cors from 'cors';

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
    throw new Error('MONGODB_URL environment variable is required');
}

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

mongoose.connect(MONGODB_URL)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})