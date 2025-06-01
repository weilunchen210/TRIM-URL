import { UrlDto } from '../dto/UrlDto.js';
import Url from '../models/url.js'
import UrlClickHistory from '../models/urlClickHistory.js';
import User from '../models/user.js';

export class urlService{
    

    async save(input: UrlDto, userId:string) {
        const url = new Url({
            name:input.name,
            originalUrl: input.originalUrl,
            User: userId,
            shortenedUrl: input.shortenedUrl
        });
        const savedModel =  await url.save();
        return savedModel
    }

    async getOriginalLink(input: string) {
        const savedModel =  await Url.findOneAndUpdate(
            {'shortenedUrl':input},
            {$inc:{clicks:1}},
            {new:true}
        );

        if(!savedModel){
            throw new Error("Shortened URL not found")
        }

        let originalUrl = savedModel.originalUrl;

        if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
            originalUrl = 'https://' + originalUrl;
        }
        
        const urlClicked = new UrlClickHistory({
            Url:savedModel._id
        })

        await urlClicked.save();
        return originalUrl    
    }

    async getAllUrl(userId:string) {
        const UrlList =  await Url.find({User:userId});
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