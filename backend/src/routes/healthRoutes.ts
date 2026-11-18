import express from 'express';
import { healthController } from '../controllers/healthController.js';

const router = express.Router();

const controller = new healthController();

router.get('/', (req, res) => {
    controller.check(req, res);
});

export default router;
