import { Router } from 'express';
import { userController } from './user.controller.js';

export const userRouter = Router();

userRouter.post('/user', userController.createUser);
userRouter.get('/user/:id', userController.getUser);
