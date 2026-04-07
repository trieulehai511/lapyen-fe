export interface CartItem {
    id: number;
    productId: string;
    productName: string;
    productImageUrl: string;
    price: number;
    quantity: number;
}

export interface ServerProduct {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
}

export interface ServerCartItem {
    quantity: number;
    product: ServerProduct;
}

export interface FlatServerCartItem {
    id?: number;
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

export interface CartItemsResponse {
    items: Array<ServerCartItem | FlatServerCartItem>;
    totalItems: number;
    totalPrice: number;
}

export interface CartItemRequest {
    productId: string;
    quantity: number;
}
