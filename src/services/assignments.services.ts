import MySQLConnection from "../database/mysql.connection";

export class AssignmentServices {
    TABLE_NAME = "shipping_orders";
    db = new MySQLConnection();
}