import { catchError } from '../utils/catchError.js';
import { userService } from './user.service.js';
import type { Request, Response } from 'express';
import type { ICreateUserSchema } from './user.schema.js';
import { createUserSchema } from './user.schema.js';

class UserController {
  async getUser(request: Request<{ id: string }>, response: Response) {
    const id = request.params.id;
    try {
      const user = await userService.getUserById(Number(id));
      response.send(user);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Unable to get user by id: ${err}`);
      }
    }
  }

  async createUser(request: Request, response: Response) {
    const data = request.body as ICreateUserSchema;
    const [err, user] = await catchError(userService.createUser(data));
    if (err) {
      response.status(400).json({ message: `Error email address is taken` });
    }
    if (user) {
      response.status(201).json({ message: `User created successfully`, user: user.email });
    }
  }
}

export const userController = new UserController();
