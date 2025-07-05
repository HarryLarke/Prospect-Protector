import { Request, Response } from "express";


//How company is made may automatically occcur when new one is assigned to prospect, and then make a selectable option afterwards...
export const getCompany = async (req: Request, res: Response) => {
    const { _id } = req.params
    if(!_id) {
        res.status(500).json({messagee: 'Company ID is required.'})
        return
    }
    res.json()
 }