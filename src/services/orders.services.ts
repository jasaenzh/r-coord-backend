import MySQLConnection from "../database/mysql.connection";
import { AddressResult, ShippingOrder } from "../interfaces/order.interface";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();



export class OrderServices {
    TABLE_NAME = "shipping_orders";
    db = new MySQLConnection();


    // Crear una nueva orden de envio
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

    // Validar dirección de envio con HERE API
    async findAddress(address: string): Promise<AddressResult[] | null> {
        const apikey_here = process.env.API_KEY_HERE;
        const searchAddress = address;
        // Validar direccion de envio
        const response = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${searchAddress}&apiKey=${apikey_here}`);
        if (response.data.items.length === 0) {
            return null;
        }
        // Extraer y transformar la informacion relevante
        const filteredResults = response.data.items.map((item: any) => ({
            title: item.title,
            countryName: item.address.countryName,
            county: item.address.county,
            city: item.address.city,
            district: item.address.district,
            postalCode: item.address.postalCode,
            lat: item.position.lat,
            lng: item.position.lng,
        }));

        return filteredResults;
        /*
        Funciona  pero no es preciso a veces trae correctas y otras no
        else if (response.data.items.length > 1) {
            return response.data.items[0].address.label;
        }
        const addressList = response.data.items.map((itemaddress: { address: string; }) => itemaddress.address).map((itemstreet: { street: string; }) => itemstreet.street);
        return addressList.reduce((bestMatch: string, currentAddress: string) => {
            return address.localeCompare(currentAddress) > bestMatch.localeCompare(address)
                ? currentAddress
                : bestMatch;
        }, "");
        */
    }

    // Obtener ordenes de envio por usuario
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