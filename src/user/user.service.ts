import { db } from '../db/db.js';
import type { User } from './user.interface.js';
import type { ICreateUserSchema } from './user.schema.js';

class UserService {
  async getUserById(id: number): Promise<User | null> {
    const result = await db.query<User>(
      `
      SELECT id, email, password, first_name, last_name, created, is_active, role
      FROM user_account
      WHERE id = $1;
      `,
      [id],
    );
    const user = result[0];

    if (!user) {
      console.log(`Unable to fetch user no user with id: ${id} found`);
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user.first_name,
      lastName: user.last_name,
      created: user.created,
      isActive: user.is_active,
      role: user.role,
    };
  }

  async CreateUser(userData: ICreateUserSchema): Promise<User | null> {
    const { email, password, firstName, lastName } = userData;
    const values = [email, password, firstName, lastName, new Date(), true, 'user'];
    const result = await db.query<User>(
      `
      INSERT into user_account(email, password, first_name, last_name, created, is_active, role)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      values,
    );

    const user = result[0];
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user.first_name,
      lastName: user.last_name,
      created: user.created,
      isActive: user.is_active,
      role: user.role,
    };
  }
}

export const userService = new UserService();
