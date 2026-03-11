// src/components/ProductCard.tsx
import React from 'react';
import type { ProductResponse } from '../types';

interface Props {
    product: ProductResponse;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    // Format tiền tệ chuẩn Việt Nam
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="bg-vintage-card border border-vintage-secondary/40 rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
            {/* Ảnh sản phẩm - thêm hiệu ứng ám vàng (sepia) nhẹ */}
            <div className="relative h-48 overflow-hidden bg-vintage-primary/10">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover sepia-[.2] hover:sepia-0 transition-all duration-500"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300?text=No+Image' }}
                />
                {!product.isActive && (
                    <div className="absolute top-2 right-2 bg-red-800 text-white text-xs px-2 py-1 rounded font-serif">
                        Ngừng bán
                    </div>
                )}
            </div>

            {/* Thông tin */}
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs text-vintage-secondary font-semibold uppercase tracking-wider mb-1">
                    {product.categoryName || 'Danh mục'}
                </p>
                <h3 className="font-serif text-xl font-bold text-vintage-text mb-2 line-clamp-1" title={product.name}>
                    {product.name}
                </h3>
                <p className="text-vintage-primary/80 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description || 'Chưa có mô tả cho sản phẩm này...'}
                </p>
                
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-vintage-secondary/20">
                    <div>
                        <p className="text-xs text-vintage-secondary mb-1">Giá bán</p>
                        <span className="font-bold text-lg text-vintage-accent">
                            {formatPrice(product.price)}
                        </span>
                    </div>
                    <button className="bg-vintage-primary hover:bg-vintage-text text-vintage-bg px-4 py-2 rounded-sm text-sm font-semibold transition-colors duration-300">
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;