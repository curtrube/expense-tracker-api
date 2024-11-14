import pg from 'pg';
import type { Pool, QueryResultRow, QueryResult } from 'pg';

class DBService {
  private readonly dbInstance: Pool;

  constructor() {
    this.dbInstance = new pg.Pool({
      user: 'postgres',
      password: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'expense_tracker',
      // connectionString: 'postgresql://user:password@localhost/mydb'
    });
  }

  async query<T extends QueryResultRow>(sql: string, values?: (boolean | number | string | Date)[]): Promise<T[]> {
    let client;
    try {
      client = await this.dbInstance.connect();
      const res: QueryResult<T> = await client.query<T>(sql, values);
      return res.rows;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        console.error(`An unknown database error occurred.`);
      }
      return [];
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}

export const db = new DBService();
