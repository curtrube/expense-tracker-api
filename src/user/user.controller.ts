import type { Request, Response } from 'express';
import { userService } from './user.service.js';
import type { ICreateUserSchema } from './user.schema.js';

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
    try {
      const result = await userService.CreateUser(data);
      return response.status(200).json({ message: 'User created successfully' });
    } catch (err) {
      console.info(`Unable to create new user: ${err}`);
      return response.status(400).json({ message: 'Error email address is already taken' });
    }
  }
}

export const userController = new UserController();
