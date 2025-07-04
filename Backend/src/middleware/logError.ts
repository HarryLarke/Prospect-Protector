import { logEvents } from "./logEvents";
import { Request, Response, ErrorRequestHandler } from "express";

const logError = (err: any | unknown, req: Request, res: Response) => {
    const name = err.name
    const errorMessage = err.message
    const message = `${name} ${errorMessage}` 
    logEvents(message, 'errLog.txt')
    res.status(500).send(err.message)
}

export default logError
//Maybe see if there is a better type cast for err?