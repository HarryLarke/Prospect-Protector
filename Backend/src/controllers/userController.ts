import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { addNewUser, getUsers, getUserById } from '../models/userModel'


export const addUser = async (req: Request, res: Response ) => {
    const { username, pwd } = req.body
    if(!username || !pwd) {
        res.status(400).json({message: 'Username, password and role are required.'})
        return
    } 
    try {
        await addNewUser(username, pwd)
        res.sendStatus(201).json({message: `New user created: ${username}`})
    } catch(err: unknown | any) {   
        res.sendStatus(500).json([{msesage: err?.message}])
        return
    }
}

//Maybe guard this for admins only or only allow users to delete there accounts. 
//THis coudl be done, with get user function, that only gets id of your user, then admin have access to all user and perform crud ops.

export const getUser = async (req: Request, res: Response) => {
    const { _id } = req.params 
    if(!_id) {
        res.status(400).json({message: 'User id is required.'})
        return
    } 
    const user = await getUserById(_id) 
    if(!user) {
        res.status(204).json({message: `Cannot find user ${_id}`})
    }
    res.json(user)
}

export const editUser = async (req: Request, res: Response) => {
    const { _id } = req.params 
    const { username, role } = req.body 

    if(!_id ) {
        res.status(400).json({message: 'User ID is required to edit user.'})
        return
    }  
    const user = await findOne(_id)
    //Find a systen that I can input new edited info into db 
}

export const deleteUser = async (req: Request, res: Response) => {
    const { _id } = req.params
    if(!_id) {
        res.status(400).json({message: 'A user Id is required!'})
        return
    }
    try{
        await delete({id:_id})
        res.sendStatus(204).json({message: `User ${_id} deleted.`})
    }catch(err: unknown | any) {
        res.sendStatus(500).json({message: err?.message})
    } 
}

//make sure to protect this route! 
export const getAllUsers = async (req: Request, res: Response) => {
    const users = await getUsers()
    if(!users) {
        res.status(204).json({message: 'No users to display.'})
        return
    }
    console.log(users)
    res.json(users)
}
