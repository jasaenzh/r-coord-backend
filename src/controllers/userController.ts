import { Request, Response } from "express";
import { UserModel } from "../services/users.services";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userModel = new UserModel();
        const usuarios = await userModel.getAllUsers();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        console.log(id);
        const userModel = new UserModel();
        const usuario = await userModel.getUserById(Number(id));

        if (typeof usuario === "string") {
            res.status(404).json({ error: usuario });
            return;
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuario" });
    }
};

export const postUser = (req: Request, res: Response) => {
    const { body } = req;

    res.json({
        msg: "postUser API - controller",
        body,
    });
};

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
