import { Router } from "express";
import { registerOrder } from '../controllers/orders.controller'

const routerOrders = Router();

routerOrders.post("/register", registerOrder);

export default routerOrders;