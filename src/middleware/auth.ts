import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.config';

declare global {
    namespace Express {
        interface Request {
            userId?: any;
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Authentication required' });
            return 
        }
        
        const token = authHeader.split(' ')[1];
        
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded token:', decoded);
        
        req.userId = decoded;

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
    }
};