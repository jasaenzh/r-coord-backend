export enum UserRole {
    Administrador = "administrador",
    Empleado = "empleado",
    Cliente = "cliente"
}
export interface User {
    id: number;
    name: string;
    email: string;
    state: number;
    password: string;
    role: UserRole;
}