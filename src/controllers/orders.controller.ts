import { Request, Response } from "express";
import { OrderServices } from "../services/orders.services";
import { StatusOrder } from "../interfaces/order.interface";
import { nanoid } from 'nanoid';


// Registrar una nueva orden de envio
export const registerOrder = async (req: Request, res: Response) => {

    try {
        const userID = req.user?.id;
        const orderStatus = StatusOrder.En_espera;
        const trackingNumber = nanoid(10);


        if (!userID) {
            res.status(401).json({ error: "Usuario no autenticado" });
            return;
        }
        const { recipient_name, recipient_address, package_description, weight } = req.body;
        if (!recipient_name || !recipient_address || !package_description || !weight) {
            res.status(400).json({ error: "Faltan campos obligatorios" });
            return;
        }

        // Crear la orden de envio
        const order = await new OrderServices().createOrder({
            user_id: userID,
            tracking_number: trackingNumber,
            recipient_name,
            recipient_address,
            package_description,
            weight,
            order_status: orderStatus,
        });
        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({ error: "Error al registrar orden: " + (error.message || "Error desconocido") });
    }
};

export const getAllAddress = async (req: Request, res: Response) => {
    try {
        const { recipient_address } = req.body;
        const validateAddress = await new OrderServices().findAddress(recipient_address);
        if (!validateAddress) {
            res.status(400).json({ error: "Dirección no válida" });
            return;
        }
        res.status(200).json(validateAddress);
    } catch (error: any) {
        res.status(500).json({ error: "Error al validar dirección: " + (error.message || "Error desconocido") });
    }
}

// Obtener ordenes de envio por usuario
export const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const userID = req.user?.id;
        if (!userID) {
            res.status(401).json({ error: "Usuario no autenticado" });
            return;
        }
        const orders = await new OrderServices().findOrdersByUserId(userID);
        res.status(200).json(orders);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener ordenes: " + (error.message || "Error desconocido") });
    }
};