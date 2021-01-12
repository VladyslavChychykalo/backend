import { Pool, QueryResult } from 'pg';

interface IConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

class Database {
  private config: IConfig;

  private pool: Pool;

  constructor() {
    this.config = {
      user: 'postgres',
      host: 'localhost',
      database: 'test',
      password: '123456',
      port: 5432,
    };

    this.pool = new Pool(this.config);
  }

  public query(request: string): Promise<QueryResult> {
    return this.pool.query(request);
  }

  public close(): void {
    this.pool.end();
  }
}

export default new Database();
