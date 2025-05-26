import { Router } from "express";
import { createTruckDriver, deleteTruckDriver, getAllTruckDrivers, getTruckDriversById, updateTruckDriver } from "../controllers/truckDrivers.controller";
import { adminOrEmployeeOnly } from "../middlewares/role.middlewares";
import { authToken } from "../middlewares/auth.middlewares";

const routerTruckDrivers = Router();

routerTruckDrivers.get("/", adminOrEmployeeOnly, getAllTruckDrivers);
routerTruckDrivers.get("/:id", adminOrEmployeeOnly, getTruckDriversById);
routerTruckDrivers.post("/", authToken, adminOrEmployeeOnly, createTruckDriver);
routerTruckDrivers.put("/:id", adminOrEmployeeOnly, updateTruckDriver);
routerTruckDrivers.delete("/:id", adminOrEmployeeOnly, deleteTruckDriver);

export default routerTruckDrivers;