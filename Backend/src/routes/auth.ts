import express from 'express'
import { handleLogin } from '../controllers/authController'

const router = express.Router()

router.route('/')
    router.post(handleLogin)

export default handleLogin