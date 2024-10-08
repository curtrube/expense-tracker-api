import pg from 'pg';
import type { PoolClient, Pool, QueryResultRow } from 'pg';

class DbService {
  private readonly dbInstance: Pool;

  constructor() {
    this.dbInstance = new pg.Pool();
  }

  async query<T extends QueryResultRow>(sql: string, values?: (boolean | number | string)[]): Promise<T[]> {
    let client: PoolClient | undefined;
    try {
      client = await this.dbInstance.connect();
      const res = await client.query<T>(sql, values);
      console.log(res);
      return res.rows;
    } catch (err) {
      console.error(`Database query failed: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}

export default DbService;
