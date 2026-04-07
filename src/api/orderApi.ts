import axiosClient from "./axiosClient";
import type { CheckoutRequest, OrderResponse } from "../types/order";

export const orderApi = {
    checkout: async (data: CheckoutRequest): Promise<OrderResponse> => {
        return axiosClient.post('/orders/checkout', data);
    }
};