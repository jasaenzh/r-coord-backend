import dotenv from "dotenv";
import { Server } from "./services/server.service";
dotenv.config();

const server = new Server();

server.listen();
