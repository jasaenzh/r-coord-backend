import MySQLConnection from "../database/mysql.connection";

export interface User {
    id?: number;
    name: string;
    email: string;
    state: number;
}

class UserModel {
    TABLE_NAME = "users";
    db = new MySQLConnection();

    async getAllUsers(): Promise<User[]> {
        const query = `SELECT id, name, email, state FROM ${this.TABLE_NAME}`;
        const users = await this.db.executeQuery(query);
        return users;
    }

    async getUserById(id: number): Promise<User | string> {
        if (isNaN(id) || id <= 0) {
            console.error("ID inválido:", id);
            return "ID inválido";
        }

        const query = `SELECT id, name, email, state FROM ${this.TABLE_NAME} WHERE id = ?`;
        const user = await this.db.executeQuery(query, [id]);
        if (user.length === 0) {
            return "usuario no encontrado";
        } else {
            return user;
        }
    }
}

export { UserModel };
