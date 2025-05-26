import { Request, Response } from "express";
import { TruckDriversServices } from "../services/truckDrivers.services";
import { TruckDriverStatus } from "../interfaces/truckDriver.interface";

export const getAllTruckDrivers = async (req: Request, res: Response) => {
    try {
        const truckDrivers = await new TruckDriversServices().getAllTruckDrivers();
        res.status(200).json(truckDrivers)
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener conductores de camiones: " + (error.message || "Error desconocido") });
    }
};

export const getTruckDriversById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const truckDriver = await new TruckDriversServices().getTruckDriverById(Number(id));
        if (typeof truckDriver === "string") {
            res.status(404).json({ error: truckDriver });
            return;
        }
        res.status(200).json(truckDriver);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener conductor de camiones por ID: " + (error.message || "Error desconocido") });
    }
};

export const createTruckDriver = async (req: Request, res: Response) => {
    try {
        const { user_id, truck_license, max_capacity, current_weight, truck_license_plate } = req.body;

        const findUserId = await new TruckDriversServices().findUserByIdInputTruckDriver(user_id);

        if (findUserId !== "empleado") {
            res.status(400).json({
                error: "Id del usaurio no es un empleado",
            });
        }

        if (!user_id || !truck_license || !max_capacity || !current_weight) {
            res.status(400).json({ error: "Faltan datos" });
            return;
        }
        const newTruckDriver = {
            user_id,
            truck_license,
            max_capacity,
            current_weight,
            status: TruckDriverStatus.Disponible,
            truck_license_plate,
        };
        const truckDriver = await new TruckDriversServices().createTruckDriver(newTruckDriver);
        truckDriver.max_capacity = Number(truckDriver.max_capacity);
        truckDriver.current_weight = Number(truckDriver.current_weight);
        res.status(201).json(truckDriver);
    } catch (error: any) {
        res.status(500).json({ error: "Error al registrar orden: " + (error.message || "Error desconocido") });
    }
};

export const updateTruckDriver = async (req: Request, res: Response) => {
    res.status(201).json({
        message: "Estas en el controlador Crear conductor de camiones",
    });
};

export const deleteTruckDriver = async (req: Request, res: Response) => {
    res.status(201).json({
        message: "Estas en el controlador Eliminar conductor de camiones",
    });
};
