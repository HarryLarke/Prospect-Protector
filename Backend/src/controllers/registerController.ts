import { Request, Response } from "express";
import bcrypt from 'bcrypt'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, pwd } = req.body
    const duplicate = await User.findOne(user: username) 

    if(!username || !pwd) {
        res.status(400).json({message: 'Username and password are required.'})
        return
    } else if(duplicate) {
        res.status(409).json({message: 'Username already taken, try another.'})
        return
    }
    //this is made up for now, will get it to search the db to make sure there is no matching usernamers
    try{
        const hashedPwd = await bcrypt.hash(pwd, 10)
        //Again this will all be sent to the sql processes..
        await User.create({
            'username' : username,
            'pwd': hashedPwd
        })
        res.status(201).json({message: `New user ${username} made.`})

    } catch(err : unknown | any) {
        res.status(500).json({message: err?.message})
    }
}

//Will need to properly typecast my errors!