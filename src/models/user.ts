import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save', async function(next) {
    var user =this 

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
})

const User = mongoose.model('User', userSchema);

export default User;