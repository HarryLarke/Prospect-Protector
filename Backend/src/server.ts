require('dotenv').config()

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import corsOptions from './config/corsOptions';
import logError from './middleware/logError';
import credentials from './middleware/credentials';

import register from './routes/register';
import logout from './routes/logout';
import auth from './routes/auth';
import prospects from './routes/api/prospects'
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
app.use('/reg', register)
app.use('/logout', )
app.use('/auth', auth)

//verify jwt...

//PROTECTED ROUTES
app.use('/prospects', prospects)
app.use('/users', users)
app.use('/sales', )``
//Will need role protection -- which00000 can be done in the routes!  

app.all('/', (req, res) => {
    res.status(404)
    if(req.accepts('json')) {
        res.json({error: "404 Page Not Found."})
    } else res.type('txt').send("404 Page Not Found.")
})

app.use(logError)

app.listen(PORT, () =>  console.log(`running on PORT ${PORT}`))

