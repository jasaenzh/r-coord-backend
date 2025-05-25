import { Request, Response } from "express";
import { OrderServices } from "../services/orders.services";

export const registerOrder = async (req: Request, res: Response) => {

    try {
        const userID = req.user?.id;
        console.log("UserID", userID);
        if (!userID) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }
        const { tracking_number, recipient_name, recipient_address, package_description, weight, order_status } = req.body;
        if (!tracking_number || !recipient_name || !recipient_address || !package_description || !weight || !order_status) {
            res.status(400).json({ error: "Faltan campos obligatorios" });
            return;
        }
        const { } = await new OrderServices().createOrder({ user_id: userID, tracking_number, recipient_name, recipient_address, package_description, weight, order_status });
        res.json({
            order: {
                user_id: userID,
                tracking_number,
                recipient_name,
                recipient_address,
                package_description,
                weight,
                order_status
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar orden" });
    }
};