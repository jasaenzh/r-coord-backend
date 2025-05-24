import { Router } from "express";
import {
    deleteUser,
    getUser,
    getUsers,
    postUser,
    putUser,
} from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Obtiene todos los usuarios
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Lista de usuarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.get("/", getUsers);

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
 *              type: number
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
router.get("/:id", getUser);


router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

export default router;
