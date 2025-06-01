
import {Request, Response} from "express";
import { urlStatisticsService } from '../services/urlStatisticsService.js';

export class urlStatisticsController{
    private urlStatisticsService: urlStatisticsService

    constructor(){
            this.urlStatisticsService = new urlStatisticsService();
    }

    async getStatistics(req: Request, res:Response){
            try{
                const userId = req.userId.id;
                const result = await this.urlStatisticsService.getStatistics(userId);
                return res.status(201).json(result);
            }catch (error){
                res.status(400).json({error: error.message});
            }
        }
}