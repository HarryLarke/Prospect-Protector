import { Request, Response } from 'express'
//AGain will need to import some get user function for my SQL side...
import jwt from 'jsonwebtoken'
import { send } from 'process'

export const refreshTokenController = async (req: Request, res: Response) => {
    const { cookies } = req 
    if(!cookies.jwt) return res.sendStatus(401)
    console.log(cookies.jwt) //Removed in Production...
    const refreshToken = cookies.jwt

    const foundUser = await User.foundUser({refreshToken}).exec() //This will find the refresh token in the DB...
    if(!foundUser) return res.sendStatus(403)
    
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET, 
            (err, decoded) => {
                if(err || foundUser.user !== decoded?.user) return res.sendStatus(403)

                const roles = Object.values(foundUser.roles)
                const accessToken = jwt.sign(
                   { "userInfo": {
                        "user": decoded?.user,
                        "roles": roles
                   }},
                   process.env.ACCESS_TOKEN_SECRET, 
                   {expiresIn: '2m'}
                )
                res.json({accessToken})
            }
        )
}