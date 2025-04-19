import { UrlDto } from '../dto/UrlDto.js';
import Url from '../models/url.js'

export class urlService{
    

    async save(input: UrlDto) {
        const savedModel =  await new Url(input).save();
        return savedModel
    }
}