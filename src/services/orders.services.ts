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
        const insertedOrder = await this.db.executeQuery(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [newOrder.insertId]);
        return insertedOrder[0] as ShippingOrder;
    }

    // Obtener ordenes de envío por usuario
    async findOrdersByUserId(userId: number): Promise<ShippingOrder[]> {
        const query = `SELECT * FROM ${this.TABLE_NAME} WHERE user_id = ?`;
        const result = await this.db.executeQuery(query, [userId]);
        if (result.length === 0) {
            return [];
        }
        const orders = result.map((order: ShippingOrder) => (
            {
                id: order.id,
                user_id: order.user_id,
                tracking_number: order.tracking_number,
                recipient_name: order.recipient_name,
                recipient_address: order.recipient_address,
                package_description: order.package_description,
                weight: Number(order.weight),
                order_status: order.order_status,
            }
        ));
        return orders as ShippingOrder[];
    }

}