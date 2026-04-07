import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { ProductResponse } from '../types/product';
import { productApi } from '../api/productApi';
import { useCartStore } from '../store/useCartStore';

const priceFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
})

const ProductDetail = () => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [product,setProduct] = useState<ProductResponse | null >(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const addItemToCart = useCartStore(state => state.addItem);

    const handleAddtoCart = () =>{
        if (!product) return;

        addItemToCart({
            productId: product.id,
            productName: product.name,
            productImageUrl: product.imageUrl,
            price: product.price
        });
        alert(`Đã đưa "${product.name}" vào túi đồ của bạn!`);
    }

    useEffect(()=>{
        let isMounted = true;

        const fetchDetail = async () =>{
            if(!id) return;
            try{
                setLoading(true);
                const data = await productApi.getById(id);
                if (isMounted) setProduct(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            }catch (err) {
                if (isMounted) setError("Không thể tìm thấy cổ vật này trong kho lưu trữ.");
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchDetail();
        return () => {isMounted = false;};
    }, [id]);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-[#8B8378] font-serif italic animate-pulse">Đang giở lại sổ sách...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh]">
                <h2 className="text-2xl font-serif text-[#1A202C] mb-4">{error}</h2>
                <button onClick={() => navigate('/products')} className="text-[#8B8378] underline uppercase tracking-widest text-sm">
                    Quay lại cửa hàng
                </button>
            </div>
        );
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
            {/* Breadcrumb / Nút back */}
            <Link to="/products" className="text-[#8B8378] hover:text-[#1A202C] transition-colors text-xs uppercase tracking-widest font-sans flex items-center gap-2 mb-12">
                <span>&#8592;</span> Trở về kho
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Cột trái: Ảnh sản phẩm (Giữ nguyên style khung đen lọt thỏm) */}
                <div className="bg-[#1A1A1A] p-8 md:p-16 flex justify-center items-center aspect-square shadow-2xl relative">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            e.currentTarget.onerror = null; 
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1615484478335-ebf29f795db2?q=80&w=400&auto=format&fit=crop'; 
                        }}
                    />
                    {!product.isActive && (
                        <div className="absolute top-6 right-6 bg-red-900 text-[#F5F2EB] text-xs tracking-widest uppercase px-4 py-2">
                            Hết hàng
                        </div>
                    )}
                </div>

                {/* Cột phải: Thông tin & Hành động */}
                <div className="flex flex-col justify-center">
                    <p className="text-[#8B8378] text-xs font-sans uppercase tracking-[0.3em] mb-4">
                        {product.categoryName || 'Danh mục bí ẩn'}
                    </p>
                    
                    <h1 className="text-4xl md:text-5xl font-serif text-[#1A202C] mb-6 leading-tight">
                        {product.name}
                    </h1>
                    
                    <div className="h-[1px] w-16 bg-[#D3Cbc0] mb-8"></div>
                    
                    <span className="font-serif text-3xl text-[#1A202C] mb-8 block">
                        {priceFormatter.format(product.price)} 
                        <span className="text-sm text-[#8B8378] ml-2 italic">/ {product.unit || 'món'}</span>
                    </span>

                    <p className="text-[#4A5568] text-base leading-relaxed font-serif italic mb-10 whitespace-pre-line">
                        {product.description || 'Chưa có ghi chép nào về nguồn gốc của vật phẩm này.'}
                    </p>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-xs uppercase tracking-widest text-[#8B8378]">Số lượng còn lại:</span>
                            <span className="font-serif font-bold text-[#1A202C]">{product.stock}</span>
                        </div>

                        <button
                            onClick={handleAddtoCart} 
                            disabled={!product.isActive || product.stock <= 0}
                            className="bg-[#1A202C] text-[#F5F2EB] py-4 px-8 uppercase tracking-[0.2em] text-sm hover:bg-[#2C3338] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto text-center"
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail