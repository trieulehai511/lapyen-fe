import type { Category } from '../types/product';
import axiosClient from './axiosClient';

export const categoryApi = {
    getAll: async (): Promise<Category[]> =>{
        const url = '/categories';
        return axiosClient.get(url);
    },

    create: async (category: Partial<Category>): Promise<Category> =>{
        const url = '/categories';
        return axiosClient.post(url, category)
    }
}