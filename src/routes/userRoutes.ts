import express from 'express';
import { userController } from '../controllers/userController';
import { auth } from '../middleware/auth.js';

const router = express.Router();

const controller = new userController();

router.post('/register',(req,res) => {
    controller.register(req,res);
})

router.post('/login',(req,res) => {
    controller.login(req,res);
})

router.put('/edit',auth,(req,res) => {
    controller.editProfile(req,res);
})

export default router;