// src/pages/CartPage.tsx
import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import type { CheckoutRequest } from '../types/order';
import { orderApi } from '../api/orderApi';

const priceFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

const CartPage: React.FC = () => {
    const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCartStore();
    
    // State cục bộ cho Form giao hàng (Controlled Components)
    const [recipient, setRecipient] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [isProcessing, setIsProcessing] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('raven'); // raven hoặc caravan

    // Cước phí vận chuyển (giả lập)
    const courierFee = deliveryMethod === 'raven' ? 50000 : 30000;
    const tax = totalPrice * 0.08; // Thuế 8%
    const finalTotal = totalPrice + tax + courierFee;

    const handleCheckout = async () => {
        if (!recipient || !address || !phoneNumber) {
            alert("Sứ giả không thể giao hàng nếu thiếu tên và địa chỉ của ngài!");
            return;
        }
        try{
            setIsProcessing(true);
            const orderItems = items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }));

            // 2. Gom Payload
            const payload: CheckoutRequest = {
                shippingAddress: `${address} (Người nhận: ${recipient})`,
                phoneNumber: phoneNumber,
                items: orderItems
            };

            // Gọi API
            const response = await orderApi.checkout(payload);
            if (response.paymentUrl) {
                clearCart(); 
                window.location.href = response.paymentUrl; 
            } else {
                alert("Thiết lập giao ước thành công nhưng không tìm thấy cổng thanh toán!");
            }
        }catch (error) {
            console.error("Lỗi checkout:", error);
            alert("Lễ tế thất bại, vui lòng thử lại sau!");
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-serif text-[#1A202C] mb-4">Túi Đồ Trống Rỗng</h2>
                <p className="text-[#8B8378] italic mb-8">Ngài chưa lựa chọn được thánh tích nào cho mình.</p>
                <Link to="/products" className="bg-[#1A202C] text-[#F5F2EB] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#2C3338] transition">
                    Trở lại kho lưu trữ
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <p className="text-[#8B8378] text-xs tracking-[0.3em] uppercase mb-4 font-sans">
                    Vật phẩm chuẩn bị thu nạp
                </p>
                <h1 className="text-4xl md:text-5xl font-serif text-[#1A202C]">
                    Túi Đồ Của Ngài
                </h1>
                <div className="h-[1px] w-24 bg-[#D3Cbc0] mx-auto mt-6"></div>
            </div>

            {/* Layout chia 2 cột */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* CỘT TRÁI: Danh sách hàng & Form nhập */}
                <div className="lg:col-span-8 bg-[#EBE7DF]/50 p-6 md:p-10 border border-[#DED6C4]">
                    
                    <h2 className="text-2xl font-serif text-[#1A202C] mb-8 italic">Thánh tích đã chọn</h2>
                    
                    {/* Danh sách sản phẩm */}
                    <div className="space-y-8 mb-12">
                        {items.map((item) => (
                            <div key={item.productId} className="flex flex-col sm:flex-row gap-6 border-b border-[#DED6C4] pb-6 last:border-0">
                                {/* Ảnh */}
                                <div className="w-24 h-24 bg-[#1A1A1A] p-2 flex-shrink-0">
                                    <img src={item.productImageUrl} alt={item.productName} className="w-full h-full object-contain" />
                                </div>
                                
                                {/* Info */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-serif text-lg text-[#1A202C]">{item.productName}</h3>
                                            <p className="text-xs text-[#8B8378] uppercase tracking-widest mt-1">Vật phẩm tinh lọc</p>
                                        </div>
                                        <span className="font-serif font-medium">{priceFormatter.format(item.price)}</span>
                                    </div>
                                    
                                    {/* Action: Tăng giảm số lượng & Xóa */}
                                    <div className="flex items-center gap-6 mt-4">
                                        <div className="flex items-center gap-4 text-sm">
                                            <button onClick={() => updateQuantity(item.productId, -1)} className="text-[#8B8378] hover:text-[#1A202C]">&#8722;</button>
                                            <span className="font-serif">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.productId, 1)} className="text-[#8B8378] hover:text-[#1A202C]">&#43;</button>
                                        </div>
                                        <button 
                                            onClick={() => removeItem(item.productId)}
                                            className="text-xs text-[#8B8378] uppercase tracking-widest hover:text-red-800 transition"
                                        >
                                            Loại bỏ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form Địa chỉ */}
                    <h2 className="text-2xl font-serif text-[#1A202C] mb-6 italic">Thông tin điểm đến</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#8B8378] mb-2">Danh xưng người nhận</label>
                            <input 
                                type="text" 
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                placeholder="VD: Pháp sư Alaric..."
                                className="w-full bg-transparent border-b border-[#A0AEC0] p-2 focus:outline-none focus:border-[#1A202C] font-serif placeholder-[#A0AEC0]/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#8B8378] mb-2">Mã truyền tin (Số điện thoại)</label>
                            <input 
                                type="tel" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="VD: 0987xxxxxx..."
                                className="w-full bg-transparent border-b border-[#A0AEC0] p-2 focus:outline-none focus:border-[#1A202C] font-serif placeholder-[#A0AEC0]/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#8B8378] mb-2">Tọa độ thánh đường (Địa chỉ)</label>
                            <textarea 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Nhập địa chỉ nhận thư báo..."
                                className="w-full bg-transparent border-b border-[#A0AEC0] p-2 focus:outline-none focus:border-[#1A202C] font-serif placeholder-[#A0AEC0]/50 resize-none h-20"
                            />
                        </div>
                        
                        {/* Phương thức giao hàng */}
                        <div className="pt-4">
                            <label className="block text-xs uppercase tracking-widest text-[#8B8378] mb-4">Phương thức vận chuyển</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className={`border p-4 cursor-pointer transition ${deliveryMethod === 'raven' ? 'border-[#1A202C] bg-[#EBE7DF]' : 'border-[#DED6C4] bg-transparent hover:border-[#A0AEC0]'}`}>
                                    <input type="radio" name="delivery" value="raven" checked={deliveryMethod === 'raven'} onChange={() => setDeliveryMethod('raven')} className="hidden" />
                                    <p className="font-serif text-sm font-bold text-[#1A202C]">Quạ Đen Tốc Hành</p>
                                    <p className="text-xs text-[#8B8378] mt-1">1-2 bình minh • 50.000 ₫</p>
                                </label>
                                <label className={`border p-4 cursor-pointer transition ${deliveryMethod === 'caravan' ? 'border-[#1A202C] bg-[#EBE7DF]' : 'border-[#DED6C4] bg-transparent hover:border-[#A0AEC0]'}`}>
                                    <input type="radio" name="delivery" value="caravan" checked={deliveryMethod === 'caravan'} onChange={() => setDeliveryMethod('caravan')} className="hidden" />
                                    <p className="font-serif text-sm font-bold text-[#1A202C]">Thương Đoàn Tiêu Chuẩn</p>
                                    <p className="text-xs text-[#8B8378] mt-1">5-7 bình minh • 30.000 ₫</p>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CỘT PHẢI: Bảng tính tiền (Sticky) */}
                <div className="lg:col-span-4">
                    <div className="bg-[#EBE7DF]/80 p-8 border border-[#DED6C4] sticky top-28">
                        <h2 className="text-2xl font-serif text-[#1A202C] mb-8 italic">Phép Tính Lệ Phí</h2>
                        
                        <div className="space-y-4 text-sm font-serif mb-8 border-b border-[#DED6C4] pb-8">
                            <div className="flex justify-between text-[#4A5568]">
                                <span>Giá trị vật phẩm:</span>
                                <span>{priceFormatter.format(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between text-[#4A5568]">
                                <span>Lệ phí bến bãi (Thuế):</span>
                                <span>{priceFormatter.format(tax)}</span>
                            </div>
                            <div className="flex justify-between text-[#4A5568]">
                                <span>Phí vận chuyển:</span>
                                <span>{priceFormatter.format(courierFee)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-8">
                            <span className="text-xs font-sans uppercase tracking-[0.2em] font-bold">Tổng cộng:</span>
                            <span className="text-2xl font-serif font-bold text-[#1A202C]">
                                {priceFormatter.format(finalTotal)}
                            </span>
                        </div>

                        <div className="bg-[#D3Cbc0]/30 p-4 mb-8 border-l-4 border-[#8B8378]">
                            <p className="text-xs text-[#6B7280] italic font-serif">
                                "Bằng việc ký kết giao ước này, ngài chấp nhận các rủi ro thần bí có thể phát sinh trong quá trình vận chuyển..."
                            </p>
                        </div>

                        <button 
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full bg-[#1A202C] text-[#F5F2EB] py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#2C3338] transition font-bold disabled:opacity-50"
                        >
                            {isProcessing ? "Đang khắc ấn..." : "Thiết Lập Giao Ước \u2192"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;
