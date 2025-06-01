import { UserDto } from "../dto/userDto";
import User from "../models/user";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginDto } from "../dto/loginDto";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/jwt.config";
import { editProfileDto } from "../dto/editProfileDto";

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

    async editProfile(updateData:editProfileDto, userId:string){
        try {
        
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            throw new Error('User not found');
        }

        if (updateData.email && updateData.email !== existingUser.email) {
            const emailExists = await User.findOne({ 
                email: updateData.email, 
                _id: { $ne: userId } 
            });
            if (emailExists) {
                throw new Error('Email is already taken by another user');
            }
        }

        const isCurrentPasswordValid = await bcrypt.compare(updateData.currentPassword, existingUser.password);
        if (!isCurrentPasswordValid) {
            throw new Error('Invalid email or password');
        }

        if (updateData.newPassword) {
            const saltRounds = 10;
            updateData.newPassword = await bcrypt.hash(updateData.newPassword, saltRounds);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {   
                username: updateData.username,
                email: updateData.email,
                password: updateData.newPassword,
                profilePictureURL: updateData.profilePictureURL
            },
            { new: true, }
        ).select('-password');

        return updatedUser;

        } catch (error) {
            throw new Error(`Failed to update profile: ${error.message}`);
        }
    }


}