import { Request, Response } from "express";
import { AssignmentServices } from "../services/assignments.services";

export const assignOrderToDriver = async (req: Request, res: Response) => {

    try {
        const { tracking_number, truck_driver_id } = req.body;
        const searchTrackingNumber = await new AssignmentServices().seachtracking_numberOrderId(tracking_number);
        const order_id: number = searchTrackingNumber;
        const routeAssignment = await new AssignmentServices().createRouteAssignment({
            order_id,
            truck_driver_id,
        });
        res.status(201).json(routeAssignment);
    } catch (error: any) {
        res.status(500).json({ error: "Error al registrar nueva ruta: " + (error.message || "Error desconocido") });
    }
};

export const updateAssignmentStatus = async (req: Request, res: Response) => {
    try {
        const { id, truck_driver_id, status, estimated_delivery } = req.body;
        const formattedDate = estimated_delivery.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
        const parsedDate = new Date(formattedDate);
        const updateupdateAssignmentStatus = await new AssignmentServices().updateAssignmentStatus(id, truck_driver_id, status, parsedDate);
        res.status(200).json(updateupdateAssignmentStatus);
    } catch (error: any) {
        res.status(500).json({ error: "Error al registrar nueva ruta: " + (error.message || "Error desconocido") });
    }
};
