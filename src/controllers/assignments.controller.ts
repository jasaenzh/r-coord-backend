import { Request, Response } from "express";

export const assignOrderToDriver = async (req: Request, res: Response) => {
    res.status(201).json({
        message: "Estas en el controlador de asignaciones",
    });
}