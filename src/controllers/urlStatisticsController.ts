
import {Request, Response} from "express";
import { urlStatisticsService } from '../services/urlStatisticsService.js';

export class urlStatisticsController{
    private urlStatisticsService: urlStatisticsService

    constructor(){
            this.urlStatisticsService = new urlStatisticsService();
    }

    async getStatistics(req: Request, res:Response){
            try{
                const result = await this.urlStatisticsService.getStatistics("683b1a26d6b11478c90ca15b");
                return res.status(201).json(result);
            }catch (error){
                res.status(400).json({error: error.message});
            }
        }
}