import { Request, Response, NextFunction } from "express"

const verifyRoles = (...allowedRoles: string[]) => {

    return(req: Request, res: Response, next: NextFunction) => {
        const { roles } = req
        if(!roles) return res.sendStatus(401)

        const rolesArray = [...allowedRoles] //may not need this depends on how data is inserted, just be weary of type casting here!!
        const result = roles.map(role => rolesArray.includes(role)).find(val => val === true) //best way to see if roles match?

        if(!result) return res.sendStatus(401) 
        next() 
    }

}

export default verifyRoles