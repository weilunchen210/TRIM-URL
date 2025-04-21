
import {Request, Response} from "express";
import { UserDto } from "../dto/userDto";
import { userService } from "../services/userService";

export class userController{
    private urlService: userService

    constructor(){
        this.urlService = new userService();
    }

    async register(req: Request, res:Response){
        try{
            const input: UserDto = req.body;
            const result = await this.urlService.save(input);
            return res.status(201).json(result);
        }catch (error){
            res.status(400).json({error: error.message});
        }
    }

}