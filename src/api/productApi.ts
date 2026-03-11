// src/api/productApi.ts
import axiosClient from './axiosClient';
import type { PageResponse, ProductResponse } from '../types';

export const productApi = {
    // Truyền page và size để lấy phân trang. 
    // Mặc định Spring Boot đếm trang từ 0, ta lấy size 8 cho đẹp UI.
    getProducts: async (page: number = 0, size: number = 8): Promise<PageResponse<ProductResponse>> => {
        const url = `/products`;
        // axiosClient đã tự động bóc lớp 'data' của APIResponse rồi nhé
        return axiosClient.get(url, { params: { page, size } });
    }
};