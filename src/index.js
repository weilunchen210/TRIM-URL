import express from 'express';
import mongoose from 'mongoose';
import url  from './routes/urlRoutes.js';

const app = express();
app.use(express.json());


app.use('/api', url);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})