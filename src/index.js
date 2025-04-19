import express from 'express';
import mongoose from 'mongoose';
import url  from './routes/urlRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());


app.use('/api', url);

console.log(process.env.MONGODB_URL)

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})