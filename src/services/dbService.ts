import pg from 'pg';
import type { PoolClient, Pool, QueryResultRow } from 'pg';

interface IDbService {
  query: <T extends QueryResultRow>(sql: string, values?: (boolean | number | string)[]) => Promise<T[]>;
}

class DbService implements IDbService {
  private readonly dbInstance: Pool;

  constructor(dbPool?: Pool) {
    this.dbInstance = dbPool ?? new pg.Pool();
  }

  async query<T extends QueryResultRow>(sql: string, values?: (boolean | number | string)[]): Promise<T[]> {
    let client: PoolClient | undefined;
    try {
      client = await this.dbInstance.connect();
      const res = await client.query<T>(sql, values);
      console.log(res);
      return res.rows;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`Database query failed: ${errorMessage}`);
      throw new Error(errorMessage);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}

export default DbService;
