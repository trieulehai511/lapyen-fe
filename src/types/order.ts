export interface CheckoutRequest {
    shippingAddress: string;
    phoneNumber: string;
}

export interface OrderResponse {
    id: string;
    totalPrice: number;
    shippingAddress: string;
    phoneNumber: string;
    orderStatus: string;
    paymentUrl: string; // Link VNPay
}