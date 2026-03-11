export interface ProductResponse{
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

export interface PageResponse<T> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalElements: number;
    items: T[]; 
}
