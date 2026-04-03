export interface CartItem {
    id: number;
    productId: string;
    productName: string;
    productImageUrl: string;
    price: number;
    quantity: number;
}

export interface CartResponse {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}