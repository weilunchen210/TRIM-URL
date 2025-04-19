import express from 'express';
import { urlController } from '../controllers/urlController.js';

const router = express.Router();

const controller = new urlController()

router.post('/',(req,res) => {
    controller.createShortenedURL(req,res);
})

router.get('/:shortenedUrl', (req, res) => {
    controller.getOriginalLink(req, res);
});

router.get('/', (req, res) => {
    controller.getAll(req, res);
});

export default router;