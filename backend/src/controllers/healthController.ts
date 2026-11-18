import { Request, Response } from "express";
import { HealthRepository } from '../repositories/healthRepository.js';

export class healthController {

    constructor(private readonly healthRepository = new HealthRepository()) {}

    async check(req: Request, res: Response) {
        try {
            await this.healthRepository.ping();
            return res.status(200).json({ status: 'ok', database: 'ok' });
        } catch (error) {
            console.error('Health check failed:', error);
            return res.status(503).json({ status: 'error', database: 'unreachable' });
        }
    }
}
