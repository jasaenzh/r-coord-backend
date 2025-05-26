import { Router } from "express";
import { authToken } from "../middlewares/auth.middlewares";
import { assignOrderToDriver } from "../controllers/assignments.controller";
import { adminOrEmployeeOnly } from "../middlewares/role.middlewares";

const routerAssignments = Router();

routerAssignments.post("/assign", authToken, adminOrEmployeeOnly, assignOrderToDriver);

export default routerAssignments;