import Router from 'express'
import UserController from '../controllers/user_controller.js'
import User from "../models/user.js";

const userRoutes = new Router()


userRoutes.post('/sign-up', UserController.createUser)
userRoutes.get('/users', UserController.getUsers)
userRoutes.post('/sign-in', UserController.auth)
userRoutes.put('/update', UserController.updateUser)
userRoutes.delete('/delete',  UserController.deleteUser)

export default userRoutes