
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true,
    },
    shortenedUrl:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const Url = mongoose.model('URL', urlSchema);

export default Url;