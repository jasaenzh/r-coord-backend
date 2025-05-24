import { createPool, Pool } from "mysql2/promise";
import dbConfig from "./config";

class MySQLConnection {
    private static instance: MySQLConnection;
    private pool: Pool;

    constructor() {
        this.pool = createPool(dbConfig);
    }
    public static getInstance(): MySQLConnection {
        if (!MySQLConnection.instance) {
            MySQLConnection.instance = new MySQLConnection();
        }
        return MySQLConnection.instance;
    }

    public async executeQuery(query: string, params: any[] = []): Promise<any> {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.query(query, params);
            return rows;
        } finally {
            connection.release();
        }
    }
}

export default MySQLConnection;
