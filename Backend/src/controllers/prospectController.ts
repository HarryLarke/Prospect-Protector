import { Request, Response } from 'express';
import bcrypt, { compare } from 'bcrypt'
import { send } from 'process';
//keep it simple for now and then more features...

export const addProspect = async (req: Request, res: Response ) => {
    const { prospectname, comapany, role, rep, notes} = req.body
    const duplicate = prospect.findOne({prospectname: prospectname}) //Same names exists in company twice, can be same names present on db, as long as they are a different company.

    //will have to typegard this object??
    const newProspect = {name: prospectname, comapany, role, asignedRep: rep, notes}
    //Use db to assign default role of prospect - using the db *generally need to come up with a way to figurate db and role assignment!
    if(!prospectname || !comapany) {
        res.status(400).json({message: "Prospect's name and company are required."})
        return
    } else if (duplicate) {
        res.status(204).json({message: 'Prospect already add to company'})
        return 
    }
    try {

        await prospect(newProspect)
        res.sendStatus(201).json({message: `New prospect created: ${prospectname}`})
    } catch(err: unknown | any) {   
        res.sendStatus(500).json([{msesage: err?.message}])
        return
    }
}

//Maybe guard this for admins only or only allow prospects to delete there accounts. 
//THis coudl be done, with get prospect function, that only gets id of your prospect, then admin have access to all prospect and perform crud ops.

export const getprospect = async (req: Request, res: Response) => {
    const { _id } = req.params 
    if(!_id) {
        res.status(400).json({message: 'prospect id is required.'})
        return
    } 
    const prospect = await getprospect(_id) 
    if(!prospect) {
        res.status(204).json({message: `Cannot find prospect ${_id}`})
    }
    res.json(prospect)
}

export const editprospect = async (req: Request, res: Response) => {
    const { _id } = req.params 
    const { prospectname, role } = req.body 

    if(!_id ) {
        res.status(400).json({message: 'prospect ID is required to edit prospect.'})
        return
    }  
    const prospect = await findOne(_id)
    //Find a systen that I can input new edited info into db 
}

export const deleteprospect = async (req: Request, res: Response) => {
    const { _id } = req.params
    if(!_id) {
        res.status(400).json({message: 'A prospect Id is required!'})
        return
    }
    try{
        await delete({id:_id})
        res.sendStatus(204).json({message: `prospect ${_id} deleted.`})
    }catch(err: unknown | any) {
        res.sendStatus(500).json({message: err?.message})
    } 
}

//make sure to protect this route! 
export const getAllprospects = async (req: Request, res: Response) => {
    const prospects = find()
    if(!prospects) {
        res.status(204).json({message: 'No prospects to display.'})
        return
    }
    res.json(prospects)
}
