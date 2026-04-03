// src/types/product.ts
export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export interface ProductResponse {
    id: string; 
    name: string;
    description: string;
    price: number; 
    unit: string;
    stock: number;
    imageUrl: string;
    isActive: boolean;
    categoryId: number;
    categoryName: string;
}

export type ProductRequest = Omit<ProductResponse, 'id' | 'categoryName'>;