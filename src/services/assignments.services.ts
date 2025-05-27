import MySQLConnection from "../database/mysql.connection";
import { AssignmentRoute } from "../interfaces/routeAssignment.interface";
import { OrderServices } from "./orders.services";
import { TruckDriversServices } from "./truckDrivers.services";

export class AssignmentServices {
    TABLE_NAME = "route_assignments";
    TABLE_NAME_ORDERS = "shipping_orders";
    db = new MySQLConnection();
    async createRouteAssignment(routeAssignmenData: Omit<AssignmentRoute, "id">): Promise<AssignmentRoute> {

        // Calcular la capacidad del conductor
        const capMax = await new TruckDriversServices().getDriverCapacity(
            routeAssignmenData.truck_driver_id
        );
        console.log("capMax", capMax);

        // Calcular el peso del pedido
        const weightOrder = await new OrderServices().calculateWeightOrderById(routeAssignmenData.order_id)

        console.log("weightOrder", weightOrder);

        // Verificar si el conductor tiene capacidad para llevar el pedido
        if (weightOrder > capMax) {
            throw new Error("El conductor no tiene capacidad para el pedido (CapaMax:" + capMax + ", PesoPed:" + weightOrder + ")");
        }

        const query = `INSERT INTO ${this.TABLE_NAME} (order_id, truck_driver_id) VALUES (?,?)`;
        const newRouteAssignment = await this.db.executeQuery(query, [
            routeAssignmenData.order_id,
            routeAssignmenData.truck_driver_id
        ]);

        const insertedRouteAssignment = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [newRouteAssignment.insertId]);
        return insertedRouteAssignment[0] as AssignmentRoute;

    }

    async seachtracking_numberOrderId(tracking_number: string): Promise<number> {

        const query = `SELECT id FROM ${this.TABLE_NAME_ORDERS} WHERE tracking_number = ?`;
        const order = await this.db.executeQuery(query, [tracking_number]);

        const order_id = order[0].id
        return order_id
    }

    async updateAssignmentStatus(id: number, truck_driver_id: number, status: string, estimated_delivery: Date): Promise<AssignmentRoute> {
        // status = si | estimated_delivery = si | truck_driver_id = si
        if (typeof id !== "undefined" && typeof status !== "undefined" && typeof estimated_delivery !== "undefined" && typeof truck_driver_id !== "undefined") {
            const queryStatusEstimatedDeliveryTruckDrive = `UPDATE ${this.TABLE_NAME} SET status = ?, estimated_delivery = ?, truck_driver_id = ? WHERE id = ?`;
            await this.db.executeQuery(queryStatusEstimatedDeliveryTruckDrive, [status, estimated_delivery, truck_driver_id, id]);
            const updateAssignment = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [id]);
            return updateAssignment[0] as AssignmentRoute;
        }
        //  status = si | estimated_delivery = si | truck_driver_id = no
        else if (typeof id !== "undefined" && typeof status !== "undefined" && typeof estimated_delivery !== "undefined" && typeof truck_driver_id === "undefined") {
            const queryEstimated_delivery = `UPDATE ${this.TABLE_NAME} SET status = ?, estimated_delivery = ? WHERE id = ?`;
            await this.db.executeQuery(queryEstimated_delivery, [status, estimated_delivery, id]);
            const updateAssignmentStatus = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [id]);
            return updateAssignmentStatus[0] as AssignmentRoute;
        }
        // status = si | estimated_delivery = no | truck_driver_id = si
        else if (typeof id !== "undefined" && typeof status !== "undefined" && typeof estimated_delivery === "undefined" && typeof truck_driver_id !== "undefined") {
            const queryStatusTruckDriver = `UPDATE ${this.TABLE_NAME} SET status = ?, truck_driver_id = ? WHERE id = ?`;
            await this.db.executeQuery(queryStatusTruckDriver, [status, truck_driver_id, id]);
            const updateAssignmentStatus = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [id]);
            return updateAssignmentStatus[0] as AssignmentRoute;
        }
        //  status = si | estimated_delivery = no | truck_driver_id = no
        else if (typeof id !== "undefined" && typeof status !== "undefined" && typeof estimated_delivery === "undefined" && typeof truck_driver_id === "undefined") {
            const queryStatus = `UPDATE ${this.TABLE_NAME} SET status = ? WHERE id = ?`;
            await this.db.executeQuery(queryStatus, [status, id]);
            const updateAssignmentStatus = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [id]);
            return updateAssignmentStatus[0] as AssignmentRoute;
        }
        //  status = no | estimated_delivery = si | truck_driver_id = si
        else if (typeof id !== "undefined" && typeof status === "undefined" && typeof estimated_delivery !== "undefined" && typeof truck_driver_id !== "undefined") {
            const queryEstimatedDeliveryTruckDriver = `UPDATE ${this.TABLE_NAME} SET estimated_delivery = ?, truck_driver_id = ? WHERE id = ?`;
            await this.db.executeQuery(queryEstimatedDeliveryTruckDriver, [estimated_delivery, truck_driver_id, id]);
            const updateEstimatedDeliveryTruckDriver = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [id]);
            return updateEstimatedDeliveryTruckDriver[0] as AssignmentRoute;
        }
        // status = no | estimated_delivery = si | truck_driver_id = no
        else if (typeof id !== "undefined" && typeof status === "undefined" && typeof estimated_delivery !== "undefined" && typeof truck_driver_id === "undefined") {
            const queryEstimatedDelivery = `UPDATE ${this.TABLE_NAME} SET estimated_delivery = ? WHERE id = ?`;
            await this.db.executeQuery(queryEstimatedDelivery, [estimated_delivery, id]);
            const updateEstimatedDelivery = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [id]);
            return updateEstimatedDelivery[0] as AssignmentRoute;
        }
        // status = no | estimated_delivery = no | truck_driver_id = si
        else if (typeof id !== "undefined" && typeof status === "undefined" && typeof estimated_delivery === "undefined" && typeof truck_driver_id !== "undefined") {
            const queryStatus = `UPDATE ${this.TABLE_NAME} SET truck_driver_id = ? WHERE id = ?`;
            await this.db.executeQuery(queryStatus, [truck_driver_id, id]);
            const updateAssignmentRoute = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [id]);
            return updateAssignmentRoute[0] as AssignmentRoute;
        }
        //status = no | estimated_delivery = no | truck_driver_id = no
        else {
            return [] as any;
        }

    }
}