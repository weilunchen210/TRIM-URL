import { UrlDto } from '../dto/UrlDto.js';
import Url from '../models/url.js'
import UrlClickHistory from '../models/urlClickHistory.js';
import User from '../models/user.js';
import { safeBrowsingService, SafetyCheckResult } from './urlCheckService.js';

export class urlService{
    

    async save(input: UrlDto, userId:string) {

        if (!input.originalUrl.startsWith('http://') && !input.originalUrl.startsWith('https://')) {
            input.originalUrl = 'https://' + input.originalUrl;
        }

        const safetyCheck: SafetyCheckResult = await safeBrowsingService.checkUrl(input.originalUrl);
        
        if (!safetyCheck.isSafe) {
                const threatTypes = safetyCheck.threats?.join(', ') || 'Unknown threats';
                console.log(`🚫 BLOCKING malicious URL: ${input.originalUrl}`);
                
                throw new Error(`🚫 URL is flagged as malicious. Threats detected: ${threatTypes}`);
            }

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

    async update(id: string, input: any) {     
        const result = await Url.findByIdAndUpdate(
            id,
            { ...input }, 
            { 
                new: true, 
                runValidators: true 
            }
        );
        
        if (!result) {
            throw new Error('URL not found');
        }
        
        return result;
    }
}