import MySQLConnection from "../database/mysql.connection";
import { ShippingOrder } from "../interfaces/order.interface"

export class OrderServices {
    TABLE_NAME = "shipping_orders";
    db = new MySQLConnection();

    // Crear una nueva orden de envío
    async createOrder(orderData: Omit<ShippingOrder, "id">): Promise<ShippingOrder> {
        const query = `INSERT INTO ${this.TABLE_NAME} (user_id, tracking_number, recipient_name, recipient_address, package_description, weight, order_status) VALUES (?,?,?,?,?,?,?)`;
        const newOrder = await this.db.executeQuery(query, [
            orderData.user_id,
            orderData.tracking_number,
            orderData.recipient_name,
            orderData.recipient_address,
            orderData.package_description,
            orderData.weight,
            orderData.order_status,
        ]);
        return newOrder;
        // const insertedOrder = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [newOrder.insertId]);
        // return insertedOrder[0] as ShippingOrder;
    }


}