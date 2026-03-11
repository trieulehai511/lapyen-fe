// src/pages/Products.tsx
import React, { useEffect, useState } from 'react';
import { productApi } from '../api/productApi';
import type { PageResponse, ProductResponse } from '../types';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
    const [pageData, setPageData] = useState<PageResponse<ProductResponse> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const fetchProducts = async (page: number) => {
        try {
            setLoading(true);
            const response = await productApi.getProducts(page, 8); // Lấy 8 sản phẩm/trang
            setPageData(response);
        } catch (error) {
            console.error("Lỗi khi tải sản phẩm", error);
        } finally {
            setLoading(false);
        }
    };

    // Chạy mỗi khi currentPage thay đổi
    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    return (
        <div className="py-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-serif text-vintage-text mb-3">Tạp hoá Lapyen</h1>
                <div className="h-1 w-24 bg-vintage-secondary mx-auto"></div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl font-serif text-vintage-primary animate-pulse">Đang tải hàng hoá...</p>
                </div>
            ) : (
                <>
                    {/* Lưới sản phẩm */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pageData?.items.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Điều hướng phân trang (Pagination) */}
                    {pageData && pageData.totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-4 mt-12">
                            <button 
                                disabled={currentPage === 0}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-4 py-2 border-2 border-vintage-secondary text-vintage-primary disabled:opacity-50 hover:bg-vintage-secondary hover:text-white transition-colors"
                            >
                                Trang trước
                            </button>
                            <span className="font-serif font-bold text-vintage-text">
                                {currentPage + 1} / {pageData.totalPages}
                            </span>
                            <button 
                                disabled={currentPage === pageData.totalPages - 1}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-4 py-2 border-2 border-vintage-secondary text-vintage-primary disabled:opacity-50 hover:bg-vintage-secondary hover:text-white transition-colors"
                            >
                                Trang sau
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Products;