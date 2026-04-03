import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductResponse } from '../types/product';

interface Props {
    product: ProductResponse;
}

const priceFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <Link
            to={`/products/${product.id}`}
            className="group flex h-full flex-col bg-[#F5F2EB] border border-[#DED6C4] transition-all duration-500 w-full hover:shadow-xl shadow-sm"
        >
            <div className="relative bg-[#1A1A1A] p-3 mb-6 flex justify-center items-center overflow-hidden aspect-square">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = 'https://images.unsplash.com/photo-1615484478335-ebf29f795db2?q=80&w=400&auto=format&fit=crop';
                    }}
                />

                {!product.isActive && (
                    <div className="absolute top-3 right-3 bg-red-900/90 text-[#F5F2EB] text-[10px] tracking-widest uppercase px-3 py-1 font-sans backdrop-blur-sm">
                        Het hang
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-grow text-center px-4 pb-5">
                <p className="text-[#8B8378] text-[10px] font-sans uppercase tracking-[0.2em] mb-3">
                    {product.categoryName || 'Bi an'}
                </p>

                <h3
                    className="font-serif text-2xl text-[#1A202C] mb-3 line-clamp-1 group-hover:text-[#8B8378] transition-colors"
                    title={product.name}
                >
                    {product.name}
                </h3>

                <p className="text-[#6B7280] text-sm italic mb-6 line-clamp-2 max-w-[90%] mx-auto font-serif">
                    {product.description || 'Chua co loi sam truyen nao cho vat pham nay...'}
                </p>

                <div className="mt-auto flex justify-between items-center border-t border-[#D3Cbc0] pt-4">
                    <span className="font-serif font-medium text-lg text-[#1A202C]">
                        {priceFormatter.format(product.price)}
                    </span>

                    <span className="text-[11px] font-sans uppercase tracking-widest text-[#1A202C] font-bold group-hover:text-[#8B8378] transition-colors flex items-center gap-1">
                        Xem chi tiet <span className="text-lg leading-none">+</span>
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
