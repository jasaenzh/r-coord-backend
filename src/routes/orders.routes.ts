import { Router } from "express";
import { registerOrder, getOrdersByUserId, getAllAddress } from '../controllers/orders.controller'
import { authToken } from "../middlewares/auth.middlewares";

const routerOrders = Router();

routerOrders.post("/register", authToken, registerOrder);
routerOrders.get("/findAllAddress", authToken, getAllAddress);
routerOrders.get("/ordersByUserId", authToken, getOrdersByUserId);

export default routerOrders;