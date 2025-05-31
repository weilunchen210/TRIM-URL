
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    originalUrl:{
        type:String,
        required:true,
    },
    shortenedUrl:{
        type:String,
        required:true,
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const Url = mongoose.model('URL', urlSchema);

export default Url;