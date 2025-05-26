import MySQLConnection from "../database/mysql.connection";
import { TruckDriver } from "../interfaces/truckDriver.interface";
import { UserServices } from "./users.services";

export class TruckDriversServices {
    TABLE_NAME = "truck_drivers";
    db = new MySQLConnection();


    async getAllTruckDrivers(): Promise<TruckDriver[]> {
        const query = `SELECT * FROM ${this.TABLE_NAME}`;
        const truckDrivers = await this.db.executeQuery(query);
        return truckDrivers;
    }

    async getTruckDriverById(id: number): Promise<TruckDriver | string> {
        const query = `SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`;
        const truckDrivers = await this.db.executeQuery(query, [id]);
        if (truckDrivers.length === 0) {
            return "usuario no encontrado";
        } else {
            return truckDrivers;
        }
    }

    async createTruckDriver(truckDriverData: Omit<TruckDriver, "id">): Promise<TruckDriver> {
        const query = `INSERT INTO ${this.TABLE_NAME} (user_id, truck_license, max_capacity, current_weight, status, truck_license_plate) VALUES (?,?,?,?,?,?)`;
        const newTruckDriver = await this.db.executeQuery(query, [
            truckDriverData.user_id,
            truckDriverData.truck_license,
            truckDriverData.max_capacity,
            truckDriverData.current_weight,
            truckDriverData.status,
            truckDriverData.truck_license_plate
        ]);
        const insertedTruckDriver = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [newTruckDriver.insertId]);
        return insertedTruckDriver[0] as TruckDriver;
    }

    async findUserByIdInputTruckDriver(id: number): Promise<string> {
        const userService = new UserServices();
        const user = await userService.getUserById(Number(id));
        if (Array.isArray(user)) {
            const rolUserInput = user[0]?.role;
            if (rolUserInput === "empleado") {
                return rolUserInput
            }
        }
        return "user_id no es empleado";

    }
}

