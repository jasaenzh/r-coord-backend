import MySQLConnection from "../database/mysql.connection";
import { User } from "../interfaces/user.interface";

export class UserServices {
    TABLE_NAME = "users";
    db = new MySQLConnection();

    // Obtener todos los usuarios
    async getAllUsers(): Promise<User[]> {
        const query = `SELECT id, name, email, state, role FROM ${this.TABLE_NAME}`;
        const users = await this.db.executeQuery(query);
        return users;
    }

    // Obtener un usuario por ID
    async getUserById(id: number): Promise<User | string> {
        if (isNaN(id) || id <= 0) {
            console.error("ID inválido:", id);
            return "ID inválido";
        }

        const query = `SELECT id, name, email, state, role FROM ${this.TABLE_NAME} WHERE id = ?`;
        const user = await this.db.executeQuery(query, [id]);
        if (user.length === 0) {
            return "usuario no encontrado";
        } else {
            return user;
        }
    }

    // Buscar un usuario por su email
    async findUserByEmail(email: string): Promise<User | null> {
        const query = `SELECT id, name, email, password, state, role FROM ${this.TABLE_NAME} WHERE email = ?`;
        const user = await this.db.executeQuery(query, [email]);
        if (user.length === 0) {
            return null;
        }

        return user[0];
    }

    // Crear un nuevo usuario
    async createUser(userData: Omit<User, "id">): Promise<User> {
        const query = `INSERT INTO ${this.TABLE_NAME} (name,email,password,state, role) VALUES (?,?,?,?,?)`;
        const newUser = await this.db.executeQuery(query, [
            userData.name,
            userData.email,
            userData.password,
            userData.state,
            userData.role,
        ]);
        const insertedUser = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [newUser.insertId]);
        return insertedUser[0] as User;
    }
}
