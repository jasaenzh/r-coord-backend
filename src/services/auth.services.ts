import bcrypt from "bcryptjs";
import { UserServices } from "../services/users.services";
import { User } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";

export class AuthService {
    SALT_ROUNDS: number = 10;

    async register(userData: { email: string; password: string; name: string }) {
        // Verificar si el usuario ya existe
        const existingUser = await new UserServices().findUserByEmail(
            userData.email
        );
        if (existingUser) {
            throw new Error("El usuario ya existe");
        }

        // Hash de la contraseña
        const hashPassword = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

        // Creo el usuario en la base de datos
        const user = await new UserServices().createUser({
            name: userData.name,
            email: userData.email,
            password: hashPassword,
            state: 1,
        });

        // Generar el token
        const token = this.generateToken(user);

        return { token, user };
    }

    //  Generar el token
    generateToken(user: User): string {
        const secret = process.env.JWT_SECRET;
        const expiresIn = "1h";

        if (!secret) {
            throw new Error("Faltan variables de entorno: JWT_SECRET");
        }

        return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn });
    }

    // Iniciar sesion
    async login(email: string, password: string) {
        // Buscar el usuario por su email
        const user = await new UserServices().findUserByEmail(email);
        if (!user) {
            throw new Error("Validar datos de acceso");
        }
        // Desencriptar la contraseña y comparar
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Validar datos de acceso");
        }

        // Generar el token
        const token = this.generateToken(user);

        return {
            token, user: {
                id: user.id,
                name: user.name,
                email: user.email,
                state: user.state
            }
        };
    }

    // Verificar el token
    validateToken(token: string): { id: number, email: string } {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("Error: Faltan datos de entorno: JWT_SECRET");
        }

        const decoded = jwt.verify(token, secret);

        if (typeof decoded === 'string' || !decoded) {
            throw new Error("Error: Token inválido");
        }

        return {
            id: (decoded as any).id,
            email: (decoded as any).email,
        };

        // return jwt.verify(token, secret) as User
    }
}
