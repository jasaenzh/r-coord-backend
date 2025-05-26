import { Router } from "express";
import { authToken } from "../middlewares/auth.middlewares";
import { assignOrderToDriver, updateAssignmentStatus } from "../controllers/assignments.controller";
import { adminOrEmployeeOnly } from "../middlewares/role.middlewares";

const routerAssignments = Router();

routerAssignments.post("/assign", authToken, adminOrEmployeeOnly, assignOrderToDriver);
routerAssignments.put("/update", authToken, adminOrEmployeeOnly, updateAssignmentStatus);

export default routerAssignments;