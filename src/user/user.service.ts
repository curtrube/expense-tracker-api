import { catchError } from '../utils/catchError.js';
import { db } from '../database/db.js';
import type { User, DbUser } from './user.interface.js';
import type { ICreateUserSchema } from './user.schema.js';

function mapDbUserToUser(dbUser: DbUser): User {
  return {
    id: dbUser.id,
    email: dbUser.email,
    password: dbUser.password,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
    created: dbUser.created,
    isActive: dbUser.is_active,
    role: dbUser.role,
  };
}

class UserService {
  async getUserById(id: number): Promise<User | null> {
    const sql = `
        SELECT id, email, password, first_name, last_name, created, is_active, role
        FROM user_account
        WHERE id = $1;
      `;
    const [err, result] = await catchError(db.query<DbUser>(sql, [id]));
    if (err) {
      console.error(`An error occured: ${err}`);
      return null;
    } else if (!result[0]) {
      console.log(`No user found with id: ${id}`);
      return null;
    }
    return mapDbUserToUser(result[0]);
  }

  async createUser(userData: ICreateUserSchema): Promise<User | null> {
    const { email, password, firstName, lastName } = userData;
    const sql = `
      INSERT into user_account(email, password, first_name, last_name, created, is_active, role)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [email, password, firstName, lastName, new Date(), true, 'user'];
    const [err, result] = await catchError(db.query<DbUser>(sql, values));
    if (err) {
      console.error(`Error while creating new user: ${err.message}`);
      throw new Error();
    } else if (!result[0]) {
      return null;
    }
    return mapDbUserToUser(result[0]);
  }
}

export const userService = new UserService();
