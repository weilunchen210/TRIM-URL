import express from 'express';

const router = express.Router();


router.use('/', (req, res) => {
    try{
        
    }catch (error){
        res.status(400).json({error: error.message});
    }
}
)

export default router;