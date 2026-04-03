export interface APIResponse<T>{
    code: number;
    message?: string;
    data: T;
}

export interface PageResponse<T> {
    currentPage: number; 
    totalPages: number;   
    pageSize: number;     
    totalElements: number; 
    items: T[];            
}