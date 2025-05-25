import { Router } from "express";
import { registerOrder, getOrdersByUserId } from '../controllers/orders.controller'
import { authToken } from "../middlewares/auth.middlewares";

const routerOrders = Router();

routerOrders.post("/register", authToken, registerOrder);
routerOrders.get("/orders_by_user_id", authToken, getOrdersByUserId);

export default routerOrders;