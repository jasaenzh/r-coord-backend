import { Router } from "express";
import { authToken } from "../middlewares/auth.middlewares";
import { assignOrderToDriver } from "../controllers/assignments.controller";

const routerAssignments = Router();

// TODO: Debo de implemetar la logica para adminOnly
routerAssignments.post("/assign", authToken, assignOrderToDriver);

export default routerAssignments;