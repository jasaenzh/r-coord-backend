import dotenv from "dotenv";
import { Server } from "./services/server.services";
dotenv.config();

const server = new Server();

server.listen();
