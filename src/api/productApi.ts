// src/api/productApi.ts
import type { PageResponse } from '../types/common';
import type { ProductRequest, ProductResponse } from '../types/product';
import axiosClient from './axiosClient';
import axios from 'axios';
export const productApi = {

    getProducts: async (page: number = 0, size: number = 8): Promise<PageResponse<ProductResponse>> => {
        const url = `/products`;
        return axiosClient.get(url, { params: { page, size } });
    },

    create: async (payload: ProductRequest): Promise<ProductResponse> => {
        const url = '/products';
        return axiosClient.post(url, payload);
    },

    update: async (id: string, payload: ProductRequest): Promise<ProductResponse> => {
        const url = `/products/${id}`;
        return axiosClient.put(url, payload);
    },

    delete: async (id: string): Promise<void> => {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
    uploadImage: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'lapyen_preset');

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/djnqdlfyx/image/upload",
            formData
        );
        return response.data.secure_url;
    },
    getById: async(id: string): Promise<ProductResponse> => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    }
};
