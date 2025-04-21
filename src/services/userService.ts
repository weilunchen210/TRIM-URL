import { UserDto } from "../dto/userDto";
import User from "../models/user";

export class userService{
    

    async save(input: UserDto) {
        const url = new User({
            email: input.email, 
            username: input.username,
            password: input.password}
        );
        const savedModel =  await url.save();
        return savedModel
    }


}