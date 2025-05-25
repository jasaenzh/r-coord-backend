export enum StatusOrder {
    En_espera = "En espera",
    En_transito = "En transito",
    Entregado = "Entregado"
}

export interface ShippingOrder {
    id: number;
    user_id: number;
    tracking_number: string;
    recipient_name: string;
    recipient_address: string;
    package_description: string;
    weight: number;
    order_status: StatusOrder.En_espera;
}