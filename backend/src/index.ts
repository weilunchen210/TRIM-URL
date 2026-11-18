import 'dotenv/config';
import express from 'express';
import { prisma } from './db.js';
import url  from './routes/urlRoutes.js';
import user from './routes/userRoutes.js'
import urlStatistics from './routes/urlStatisticsRoutes.js'
import health from './routes/healthRoutes.js'
import cors from 'cors';

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
app.use('/health', health);

prisma.$connect().catch((error) => {
    console.error('Failed to connect to PostgreSQL:', error);
    process.exit(1);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})