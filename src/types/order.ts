export interface CheckoutItemRequest {
    productId: string;
    quantity: number;
    price: number;
}

export interface CheckoutRequest {
    shippingAddress: string;
    phoneNumber: string;
    items: CheckoutItemRequest[];
}

export interface OrderResponse {
    id: string;
    totalPrice: number;
    shippingAddress: string;
    phoneNumber: string;
    orderStatus: string;
    paymentUrl: string; // Link VNPay
}