import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

const controller = new userController();

router.post('/',(req,res) => {
    controller.register(req,res);
})



export default router;