import express, { Application } from "express";
import userRoutes from "../routes/userRoutes";
import cors from "cors";
import MySQLConnection from "../database/mysql.connection";

class Server {
    private app: Application;
    private port: string;
    private db: MySQLConnection;
    private apiPaths = {
        users: "/api/users",
    };

    constructor() {
        // Variables
        this.app = express();
        this.port = process.env.PORT || "8001";

        // Configuracion de la base de datos
        this.db = new MySQLConnection();
        this.connectDB();

        // Configuracion de middlewares y rutas
        this.middlewares();
        this.routes()
    }

    private async connectDB() {
        try {
            await this.db.executeQuery("SELECT 1"); // Prueba conexión con MySQL
            console.log("Conexion a la base de datos establecida");
        } catch (error) {
            console.error("Error conectando a la base de datos:", error);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor escuchando en el puerto " + this.port);
        });
    }
}

export default Server;
