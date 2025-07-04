import { format } from 'date-fns';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

import { Request, Response, NextFunction } from 'express';

export const logEvents = async (message: string, logName: string) => {
    const timeDate = `${format(new Date(), "ss:mm:HH\tddMMyyyy")}`
    const logItem = `${timeDate}: ${message}\n`

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        } 
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch(err) {
        console.log(err)
    }
}

export const logger = async (req: Request, res: Response, next: NextFunction ) => {
    const method = req.method 
    const url = req.originalUrl || req.url
    const host = req.headers.host || "localhost"
    const message = `${method} ${url} ${host}`
    await logEvents(message, 'reqLog.txt')
    next()
}
