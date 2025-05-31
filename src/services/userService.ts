import { UserDto } from "../dto/userDto";
import User from "../models/user";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginDto } from "../dto/loginDto";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/jwt.config";

export class userService{
    

    async save(input: UserDto) {

        const existingUser = await User.findOne({ email: input.email });
                if (existingUser) {
                    throw new Error('User with this email already exists');
                }

        const url = new User({
            email: input.email, 
            username: input.username,
            password: input.password,
            profilePictureURL: input.profilePictureURL
        }
        );
        const savedModel =  await url.save();
        return savedModel
    }

    async login(input:LoginDto){

        const user = await User.findOne({ email: input.email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        
        const isPasswordValid = await bcrypt.compare(input.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign(
            {id: user._id.toString()},
            JWT_SECRET,
            { expiresIn:JWT_EXPIRES_IN} as jwt.SignOptions
        )

        return {
            id:user._id,
            email:user.email,
            username:user.username,
            token
        }
    }


}