
import {Request, Response} from "express";
import { UserDto } from "../dto/userDto";
import { userService } from "../services/userService";
import { editProfileDto } from "../dto/editProfileDto";

export class userController{
    private userService: userService

    constructor(){
        this.userService = new userService();
    }

    async register(req: Request, res:Response){
        try{
            const input: UserDto = req.body;
            const result = await this.userService.save(input);
            return res.status(201).json(result);
        }catch (error){
            res.status(400).json({error: error.message});
        }
    }

    async login(req: Request, res:Response){
        try{
            const input: UserDto = req.body;
            const result = await this.userService.login(input);
            return res.status(201).json(result);
        }catch (error){
            res.status(400).json({error: error.message});
        }
    }

    async editProfile(req:Request, res:Response){
        try{
            const input:editProfileDto = req.body
            const userId = req.userId.id
            const result = await this.userService.editProfile(input,userId);
            return res.status(201).json(result);
        }catch (error){
            res.status(400).json({error: error.message});
        }
    }

    async dummyLogin(req:Request, res:Response){
        try{
            const result = await this.userService.dummyLogin();
            return res.status(201).json(result);
        }catch (error){
            res.status(400).json({error: error.message});
        }
    }

}