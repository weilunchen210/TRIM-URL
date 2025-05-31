import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

const controller = new userController();

router.post('/register',(req,res) => {
    controller.register(req,res);
})

router.post('/login',(req,res) => {
    controller.login(req,res);
})

export default router;