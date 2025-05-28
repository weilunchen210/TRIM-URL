import { UrlDto } from '../dto/UrlDto.js';
import Url from '../models/url.js'

export class urlService{
    

    async save(input: UrlDto, userId:string) {
        const url = new Url({
            originalUrl: input.originalUrl,
            User: userId,
            shortenedUrl: input.shortenedUrl
        });
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

    async delete(id: string) {
        const result = await Url.findByIdAndDelete(id);
        if (!result) {
            throw new Error('URL not found');
        }
        return { message: 'URL deleted successfully' };
    }
}