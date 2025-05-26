import { Request, Response, NextFunction } from "express";
import { UserRole } from "../interfaces/user.interface";

export const adminOrEmployeeOnly = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    // Validar si el usuario está definido
    if (!user) {
        res.status(401).json({
            error: "Acceso denegado: Usuario no autenticado"
        });
        return;
    }
    const allowedRoles: UserRole[] = [UserRole.Administrador, UserRole.Empleado];
    if (!allowedRoles.includes(user.role)) {
        res.status(403).json({
            error: "Acceso denegado: Se requiere otro rol"
        });
        return;
    }
    next();
}