//Need to import db User data here...
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Request, Response } from 'express'

export const handleLogin = async (req: Request, res: Response) => {
    const { user, pwd } = req.body
    if(!user || !pwd) {
        res.status(400).json({message: 'Username and password are required!'})
        return
    } 
    const foundUser = await findUser(user) //hmm prefer to send id?? -- but that' because I love id's <3 
    if(!findUser) {
        res.sendStatus(401) 
        return
    }

    const matchPwd = await bcrypt.compare(pwd, foundUser.pwd)
    if(!macthPwd) {
        res.sendStatus(401)
        return
    } 
    else if(matchPwd) {
        const roles = Object.values(foundUser.roles).filter(Boolean) //Next few lines of code will inser roles ni the JWT!!!

        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username" : foundUser.user,
                    "roles": roles
                }}, 
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '4m'}
        )

        const refreshToken = jwt.sign(
            {"username": foundUser.user}, 
            process.env.REFRESH_TOKEN_SECRET, 
            {expiresIn: '30m'}
        )

        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()  //So... I don't know if I will accomodate RT's on my DB??? but, can they be stored as http cookies?? 
        console.log(result) //remove in prod! 
    } else {res.sendStatus(401)}
}
