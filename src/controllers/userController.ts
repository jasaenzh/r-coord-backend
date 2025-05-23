import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
    res.json({
        msg: "getUsers API - controller",
    });
};

export const getUser = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({
        msg: "getUser API - controller",
        id,
    });
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
        id
    });
};
