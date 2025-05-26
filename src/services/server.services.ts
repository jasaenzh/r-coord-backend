import express, { Application } from "express";
import usersRoutes from "../routes/users.routes";
import ordersRoutes from "../routes/orders.routes";
import assignmentsRoutes from "../routes/assignments.routes";
import truckDriversRoutes from "../routes/truckDrivers.routes";
import cors from "cors";
import MySQLConnection from "../database/mysql.connection";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "../docs/swagger";

export class Server {
    private app: Application;
    private port: string;
    private db: MySQLConnection;
    private apiPaths = {
        users: "/api/users",
        orders: "/api/orders",
        assignments: "/api/assignments",
        truckDrivers: "/api/truck-drivers",
    };

    constructor() {
        // Variables
        this.app = express();
        this.port = process.env.PORT_SERVER || "8001";

        // Configuracion de la base de datos
        this.db = new MySQLConnection();
        this.connectDB();

        // Configuracion de middlewares y rutas
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        try {
            await this.db.executeQuery("SELECT 1"); // Prueba conexión con MySQL
            console.log("Conexion a la base de datos establecida");
        } catch (error) {
            console.error("Error conectando a la base de datos:", error);
        }
    }

    middlewares() {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(
            "/documentacion",
            swaggerUi.serve,
            swaggerUi.setup(swaggerSetup)
        );
    }

    routes() {
        this.app.use(this.apiPaths.users, usersRoutes);
        this.app.use(this.apiPaths.orders, ordersRoutes);
        this.app.use(this.apiPaths.assignments, assignmentsRoutes);
        this.app.use(this.apiPaths.truckDrivers, truckDriversRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor escuchando en el puerto " + this.port);
        });
    }
}
