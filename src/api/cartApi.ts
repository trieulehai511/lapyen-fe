import type { CartItemRequest, CartItemsResponse } from "../types/cart";
import axiosClient from "./axiosClient";

export const CartApi = {
    getMyCart: async (): Promise<CartItemsResponse> =>{
        return axiosClient.get('/cart');
    },
    addToCart: async (data: CartItemRequest): Promise<string> => {
        return axiosClient.post('/cart/add-items', data);
    },
    
    // Xóa item
    removeCartItem: async (productId: string): Promise<string> => {
        return axiosClient.delete(`/cart/items/${productId}`);
    },

    updateQuantity: async (productId: string, quantity: number): Promise<string> => {
        return axiosClient.put(`/cart/items/${productId}?quantity=${quantity}`);
    }
}