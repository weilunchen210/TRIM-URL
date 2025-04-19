import Url from '../models/url.js'

export class urlService{

    async save(input) {
        const savedModel =  await Url(input.body).save();
        return savedModel
    }
}