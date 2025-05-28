import express from 'express';
import { urlController } from '../controllers/urlController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

const controller = new urlController()

router.post('/',auth,(req,res) => {
    controller.createShortenedURL(req,res);
})

router.get('/:shortenedUrl', (req, res) => {
    controller.getOriginalLink(req, res);
});

router.get('/',auth, (req, res) => {
    controller.getAll(req, res);
});

export default router;