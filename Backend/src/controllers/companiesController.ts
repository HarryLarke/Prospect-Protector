import { compare } from "bcrypt";
import { Request, Response } from "express";


//How company is made may automatically occcur when new one is assigned to prospect, and then make a selectable option afterwards...
export const getCompany = async (req: Request, res: Response) => {
    const { _id } = req.params
    if(!_id) {
        res.status(400).json({messagee: 'Company ID is required.'})
        return
    }
    const company = findOne(_id)
    if(!company) {
        res.status(204).json({message: `Cannot find company ${_id}`})
    }
    res.json(company)
}

export const addCompany = async (req: Request, res: Response) => {
    const { name, employees, revenue, address, notes, totalSales} = req.body
    const newCompany = { name, employees, revenue, address, notes}
    if(!name || employees?.employee) {
        res.status(400).json({message: 'Each company requires a name and atleast one employee.'})
        return
    }
    try{
        await Company(newCompany)
        res.sendStatus(201).json({message: `${name} added!`})
    }catch(err: unknown | any ) {
        res.sendStatus(500).json({message: `Unable to add company ${name}`})
    } 
}

export const editCompany = async (req: Request, res: Response) => {
    const { _id } = req.params 
    //employees - wiill have to be an array? That should be fine?
    const { name, employees, revenue, address, notes} = req.body

}