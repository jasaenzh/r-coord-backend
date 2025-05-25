import { Router } from "express";
import {
    deleteUser,
    getUser,
    getUsers,
    registertUser,
    putUser,
    loginUser,
} from "../controllers/users.controller";
import { authToken } from "../middlewares/auth.middlewares";

const routerUsers = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
routerUsers.get("/", authToken, getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: Obtiene un usuario por id
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Id del usuario
 *      responses:
 *          200:
 *              description: Usuario encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: Usuario no encontrado
 */
routerUsers.get("/:id", authToken, getUser);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
routerUsers.post("/register", registertUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Error en la solicitud
 */
routerUsers.post("/login", loginUser);

routerUsers.put("/:id", authToken, putUser);
routerUsers.delete("/:id", authToken, deleteUser);

export default routerUsers;
