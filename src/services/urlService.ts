import { UrlDto } from '../dto/UrlDto.js';
import Url from '../models/url.js'

export class urlService{
    

    async save(input: UrlDto) {
        const url = new Url({originalUrl: input.originalUrl, 
            shortenedUrl: input.shortenedUrl});
        const savedModel =  await url.save();
        return savedModel
    }

    async getOriginalLink(input: String) {
        const savedModel =  await Url.findOne({'shortenedUrl':input});
        const originalUrl = savedModel.originalUrl;
        return originalUrl    
    }

    async getAll() {
        const UrlList =  await Url.find();
        return UrlList
    }

}