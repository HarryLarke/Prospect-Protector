import { Request, Response } from "express";
import bcrypt from 'bcrypt'

import { getUserbyUsername, addNewUser } from "../models/userModel";

//Need to adapt this so we register our new users!

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, pwd } = req.body
    console.log(username, pwd)
    if(!username || !pwd) {
        res.status(400).json({message: 'Username and password are required.'})
        return
    }

    try{
        //const hashedPwd = await bcrypt.hash(pwd, 10)
    
        await addNewUser(username, pwd)
        res.status(201).json({message: `New user ${username} made.`})

    } catch(err : unknown | any) {
        res.status(500).json({message: err?.message})
    }
}
