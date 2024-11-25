import { Router } from 'express';
import { userController } from './user.controller.js';
import { body } from '../middleware/body.middleware.js';
import { createUserSchema } from './user.schema.js';

export const userRouter = Router();

userRouter.get('/user/:id', userController.getUser);
userRouter.post('/user', body(createUserSchema), userController.createUser);
