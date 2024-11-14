import { Router } from 'express';
import { userController } from './user.controller.js';

export const userRouter = Router();

userRouter.post('/user', (req, res) => userController.createUser(req, res));
userRouter.get('/user/:id', (req, res) => userController.getUser(req, res));
