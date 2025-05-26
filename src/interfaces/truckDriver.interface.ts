export enum TruckDriverStatus {
    Disponible = "Disponible",
    En_Ruta = "En ruta",
    No_Disponible = "No disponible"
}

export interface TruckDriver {
    id: number;
    user_id: number;
    truck_license: string;
    max_capacity: number;
    current_weight: number;
    status: TruckDriverStatus;
    truck_license_plate: string;
}