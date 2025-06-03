
import mongoose from 'mongoose';

const urlClickHistorySchema = new mongoose.Schema({
    Url:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'URL'
    },
    clickedDate:{
        type:Date,
        default:Date.now,
    }
})

const UrlClickHistory = mongoose.model('URLClickHistory', urlClickHistorySchema);

export default UrlClickHistory;