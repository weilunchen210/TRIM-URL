import express from 'express';
import { auth } from '../middleware/auth.js';
import { urlStatisticsController } from '../controllers/urlStatisticsController.js';

const router = express.Router();

const controller = new urlStatisticsController()

router.get('/',auth, (req, res) => {
    controller.getStatistics(req, res);
});



export default router;