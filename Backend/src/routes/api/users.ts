import express from 'express'
import { getUser, addUser, getAllUsers, editUser, deleteUser } from '../../controllers/userController'

const router = express.Router()

router.route('/') 
    .get(getUser)
    .post(addUser)
    .put(editUser)
    .delete(deleteUser) //Will send params here!
     