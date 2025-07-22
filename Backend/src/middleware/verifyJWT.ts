import  jwt  from "jsonwebtoken"

import { Request, Response, NextFunction } from "express"

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {å
    const authHeader = req.headers.authorization || req.headers.authorization
    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401)

    const accessToken = authHeader.split(' ')[1]
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if(err) return res.sendStatus(403)
                //Data being inserted into the request here, which is handy, since I will need not need to constantly decode the AT
                req.roles = decoded.UserInfo.roles
                req.user = decoded.UserInfo.username
                //Will need to double check what info I send in token!!! 
                //Will need to insert this info in the payload info for jwt
                next() 
        }
    )

}

export default verifyJWT