export enum AssignmentStatus {
    Asignado = "Asignado",
    En_Progreso = "En progreso",
    Completado = "Completado"
}

export interface AssignmentRoute {
    id: number;
    order_id: number;
    truck_driver_id: number;
    assignment_date?: Date;
    estimated_delivery?: Date;
    status?: AssignmentStatus;
}