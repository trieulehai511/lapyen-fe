// src/types/index.ts

/**
 * Cấu trúc Response chung từ Backend
 */
export interface APIResponse<T> {
    code: number;
    message?: string;
    data: T;
}

/**
 * Cấu trúc Phân trang
 */
export interface PageResponse<T> {
    currentPage: number; 
    totalPages: number;   
    pageSize: number;     
    totalElements: number; 
    items: T[];            
}

/**
 * Danh mục sản phẩm (Category)
 */
export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
}

/**
 * Sản phẩm - Response
 */
export interface ProductResponse {
    id: string; // UUID trong Java tương ứng string trong TS
    name: string;
    description: string;
    price: number; // BigDecimal tương ứng number
    unit: string;
    stock: number;
    imageUrl: string;
    isActive: boolean;
    categoryId: number;
    categoryName: string;
}

/**
 * Sản phẩm - Request (Dùng khi tạo/sửa sản phẩm)
 */
export interface ProductRequest {
    name: string;
    description?: string;
    price: number;
    unit?: string;
    stock: number;
    imageUrl: string;
    isActive: boolean;
    categoryId: number;
}

/**
 * Người dùng - Response
 */
export interface UserResponse {
    id: string;
    username: string;
    fullName: string;
    email: string;
    active: boolean;
    roles: string[]; // Set<String> tương ứng string[]
}

/**
 * Người dùng - Request (Dùng khi đăng ký)
 */
export interface UserCreationRequest {
    username: string;
    password?: string;
    fullName: string;
    email: string;
}

// Xác thực người dùng - Authentication


export interface AuthenticationRequest{
    username: string;
    password: string;
}
export interface AuthenticationResponse{
    token: string;
    authenticated: boolean;
}


