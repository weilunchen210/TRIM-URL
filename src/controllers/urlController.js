import {urlService} from '../services/urlService.js'

export class urlController{

    constructor(){
        this.urlService = new urlService();
    }

    async createShortenedURL(req, res){
        try{
            const result = await this.urlService.save(req);
            return res.status(201).json(result);
        }catch (error){
            res.status(400).json({error: error.message});
        }
    }
}