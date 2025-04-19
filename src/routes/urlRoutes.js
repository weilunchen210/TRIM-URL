import express from 'express';
import { urlController } from '../controllers/urlController.js';

const router = express.Router();


// router.use('/', (req, res) => {
//     try{
        
//     }catch (error){
//         res.status(400).json({error: error.message});
//     }
// }
// )

const controller = new urlController()

router.post('/',(req,res) => {
    controller.createShortenedURL(req,res);
})

export default router;