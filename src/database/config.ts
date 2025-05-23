import { PoolOptions } from 'mysql2/promise';

interface DBConfig extends PoolOptions {
    host: string;
    user: string;
    password: string;
    database: string;
    port?: number;
}

const dbConfig: DBConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'jashamom',
    database: process.env.DB_NAME || 'coordinadoradb',
    port: parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

export default dbConfig;