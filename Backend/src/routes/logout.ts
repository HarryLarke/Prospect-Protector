import express from 'express'
import  logoutController  from '../controllers/logoutController'


const router = express.Router()

router.route('/')
    .get(logoutController)

export default router