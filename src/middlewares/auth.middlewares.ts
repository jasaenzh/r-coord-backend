import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.services";

// Extender la interfaz Request de Express
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            };
        }
    }
}

export const authToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtener el token del header de autorizacion
        const token = req.header("Authorization")?.replace("Bearer ", "");

        // Verificar si el token está presente
        if (!token) {
            res
                .status(401)
                .json({ error: "Acceso no autorizado. Token no proporcionado." });
            return;
        }

        // Verificar si el token es válido
        const validateToken = new AuthService().validateToken(token);
        if (!validateToken) {
            res
                .status(401)
                .json({ error: "Acceso no autorizado. Token inválido." });
            return;
        }

        req.user = validateToken;

        next();
    } catch (error: any) {
        // Manejo específico de errores
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Token expirado' });
        } else if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Token inválido' });
        } else {
            console.error('Error en autenticación:', error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
        return;
    }
};
