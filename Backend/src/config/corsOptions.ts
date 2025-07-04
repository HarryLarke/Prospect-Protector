import { CorsOptions } from 'cors';

import allowOrigins from './allowOrigins';

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if(!origin || allowOrigins.indexOf(origin) != -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus : 200
}

export default corsOptions