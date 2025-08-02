require('dotenv').config()

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import corsOptions from './config/corsOptions';
import logError from './middleware/logError';
import credentials from './middleware/credentials';
import verifyJWT from './middleware/verifyJWT';

import logout from './routes/logout';
import auth from './routes/auth';

import users from './routes/api/users'

import { logger } from './middleware/logEvents';


const PORT = process.env.PORT || 3500;
const app = express();

app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cookieParser())

//UNPROTECTED ROUTES
app.use('/users', users)

//verify jwt...

//PROTECTED ROUTES


//Will need role protection -- which00000 can be done in the routes!  

app.all('/', (req, res) => {
    res.status(404)
    if(req.accepts('json')) {
        res.json({error: "404 Page Not Found."})
    } else res.type('txt').send("404 Page Not Found.")
})

app.use(logError)

app.listen(PORT, () =>  console.log(`running on PORT ${PORT}`))

