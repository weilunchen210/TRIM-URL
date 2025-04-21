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

    bcrypt.genSalt(10, function(error,salt){
        if(error) return next(error);

        bcrypt.hash(user.password, salt, function (error,hash){
            if (error) return next (error);
            user.password = hash;
            next();
        })
    })
}
)

const User = mongoose.model('User', userSchema);

export default User;