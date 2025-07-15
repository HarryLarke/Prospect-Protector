import { Request, Response } from "express";

export const handleLogout = async (req: Request, res: Response) => {

    const { cookies } = req 
    if(!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({refreshToken}).exec()
    if(! foundUser) {
        res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204)
    }
    foundUser.refreshToken = ''
    const result = await foundUser.save()  //Clearing rt from db 
    console.log(result) //Remove for production??

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000}) //clearing rt from client
    res.sendStatus(204)
}