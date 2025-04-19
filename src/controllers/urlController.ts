import { UrlDto } from '../dto/UrlDto.js';
import {urlService} from '../services/urlService.js'
import {Request, Response} from "express";

export class urlController{
    private urlService: urlService

    constructor(){
        this.urlService = new urlService();
    }

    async createShortenedURL(req: Request, res:Response){
        try{
            const input: UrlDto = req.body;
            const result = await this.urlService.save(input);
            return res.status(201).json(result);
        }catch (error){
            res.status(400).json({error: error.message});
        }
    }

    async getOriginalLink(req: Request, res:Response){
        try{
            const {shortenedUrl} = req.params;
            const result = await this.urlService.getOriginalLink(shortenedUrl);
            return res.redirect(301, result)
        }catch (error){
            res.status(400).json({error: error.message});
        }
    }

    async getAll(req: Request, res:Response){
        try{
            const result = await this.urlService.getAll();
            return res.status(200).json(result)
        }catch (error){
            res.status(400).json({error: error.message});
        }
    }
}