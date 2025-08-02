import express from 'express'
import { getUser, addUser, getAllUsers, editUser, deleteUser } from '../../controllers/userController'

const router = express.Router()

router.route('/') 
    .get(getAllUsers)
    .post(addUser)
    
router.route('/:_id')
    .get(getUser)
    .delete(deleteUser) 
    .put(editUser)

export default router
     