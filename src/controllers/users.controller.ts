import { Request, Response } from "express";
import { UserServices } from "../services/users.services";
import { AuthService } from "../services/auth.services";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userService = new UserServices();
        const usuarios = await userService.getAllUsers();
        res.status(200).json(usuarios);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener usuarios" + (error.message || "Error desconocido") });
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userService = new UserServices();
        const usuario = await userService.getUserById(Number(id));

        if (typeof usuario === "string") {
            res.status(404).json({ error: usuario });
            return;
        }

        res.json(usuario);
    } catch (error: any) {
        res.status(404).json({ error: "Error al obtener usuario" + (error.message || "Error desconocido") });
    }
};

export const registertUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: "Faltan campos obligatorios" });
            return;
        }
        const { user, token } = await new AuthService().register({ name, email, password, role });
        res.status(201).json({ user, token });
    } catch (error: any) {
        res.status(400).json({
            error: "Error al registrar: " + (error.message || "Error desconocido"),
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Faltan campos obligatorios" });
            return;
        }
        const { user, token } = await new AuthService().login(email, password);
        res.status(200).json({ user, token });
    } catch (error: any) {
        res.status(400).json({
            error: "Error al loguear: " + (error.message || "Error desconocido"),
        });
    }
}

export const putUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: "putUser API - controller",
        body,
    });
};

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: "deleteUser API - controller",
        id,
    });
};
