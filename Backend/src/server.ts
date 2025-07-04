require('dotenv').config()

import express from 'express';
import cors from 'cors';

import corsOptions from './config/corsOptions';
import logError from './middleware/logError';

import { logger } from './middleware/logEvents';


const PORT = process.env.PORT || 3500;
const app = express();

app.use(logger)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.all('/', (req, res) => {
    res.status(404)
    if(req.accepts('json')) {
        res.json({error: "404 Page Not Found."})
    } else res.type('txt').send("404 Page Not Found.")
})

app.use(logError)

app.listen(PORT, () =>  console.log(`running on PORT ${PORT}`))