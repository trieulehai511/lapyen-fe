// src/store/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartApi } from '../api/cartApi';
import type { FlatServerCartItem, ServerCartItem } from '../types/cart';

// Định nghĩa kiểu dữ liệu cho 1 món hàng trong giỏ
export interface CartItem {
    productId: string;
    productName: string;
    productImageUrl: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;

    // Actions
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    updateQuantity: (productId: string, delta: number) => void;
    fetchCart: () => void;
}

const isNestedServerCartItem = (item: ServerCartItem | FlatServerCartItem): item is ServerCartItem => {
    return 'product' in item && !!item.product;
};

const normalizeServerCartItem = (item: ServerCartItem | FlatServerCartItem): CartItem => {
    if (isNestedServerCartItem(item)) {
        return {
            productId: item.product.id,
            productName: item.product.name,
            productImageUrl: item.product.imageUrl,
            price: item.product.price,
            quantity: item.quantity,
        };
    }

    return {
        productId: item.productId,
        productName: item.productName,
        productImageUrl: item.productImageUrl,
        price: item.price,
        quantity: item.quantity,
    };
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            totalItems: 0,
            totalPrice: 0,

            addItem: async (newItem) => {

                const previousItems = get().items;
                const previousTotalItems = get().totalItems;
                const previousTotalPrice = get().totalPrice;

                const existingItemIndex = previousItems.findIndex(item => item.productId === newItem.productId);
                let updatedItems;
                if (existingItemIndex >= 0) {
                    updatedItems = [...previousItems];
                    updatedItems[existingItemIndex].quantity += 1;
                } else {
                    updatedItems = [...previousItems, { ...newItem, quantity: 1 }];
                }
                const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
                const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                set({ items: updatedItems, totalItems, totalPrice });
                try {
                    await CartApi.addToCart({
                        productId: newItem.productId,
                        quantity: 1
                    });
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    console.error("Lỗi đồng bộ Backend, Rollback giỏ hàng!");
                    set({ items: previousItems, totalItems: previousTotalItems, totalPrice: previousTotalPrice });
                    alert("Lỗi kết nối tới kho chứa! Đã hoàn tác thao tác.");
                }
            },

            removeItem: async (productId) => {

                const previousItems = get().items;
                const previousTotalItems = get().totalItems;
                const previousTotalPrice = get().totalPrice;

                const updatedItems = previousItems.filter(item => item.productId !== productId);

                const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
                const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                set({ items: updatedItems, totalItems, totalPrice });

                try {
                    await CartApi.removeCartItem(productId);

                } catch (error) {
                    console.error("Lỗi khi xóa thánh tích từ Backend:", error);

                    set({ items: previousItems, totalItems: previousTotalItems, totalPrice: previousTotalPrice });

                    alert("Lực lượng hắc ám đã chặn kết nối! Thánh tích vẫn còn trong túi đồ.");
                }
            },

            updateQuantity: async (productId, delta) => {
                const previousItems = get().items;
                const previousTotalItems = get().totalItems;
                const previousTotalPrice = get().totalPrice;

                const itemToUpdate = previousItems.find(item => item.productId === productId);
                if (!itemToUpdate) return;

                const newQuantity = itemToUpdate.quantity + delta;
                if (newQuantity < 1) return; 

                const updatedItems = previousItems.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                );

                const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
                const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                set({ items: updatedItems, totalItems, totalPrice });

                try {

                    await CartApi.updateQuantity(productId, newQuantity);
                } catch (error) {
                    console.error("Lỗi khi cập nhật số lượng xuống Backend:", error);

                    set({ items: previousItems, totalItems: previousTotalItems, totalPrice: previousTotalPrice });
                    alert("Năng lượng truyền tải bị đứt đoạn! Đã khôi phục số lượng cũ.");
                }
            },




            clearCart: () => {
                set({ items: [], totalItems: 0, totalPrice: 0 });
            },

            fetchCart: async () => {
                try {
                    const response = await CartApi.getMyCart();

                    const serverItems = response.items.map(normalizeServerCartItem);
                    const totalItems = serverItems.reduce((sum, i) => sum + i.quantity, 0);
                    const totalPrice = serverItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
                    set({ items: serverItems, totalItems, totalPrice });
                    console.log(">>> Đã thỉnh giỏ hàng từ DB về RAM thành công!");
                } catch (error) {
                    console.error("Lỗi khi đòi nợ giỏ hàng từ Backend:", error);
                    set({ items: [], totalItems: 0, totalPrice: 0 });
                }
            }
        }),
        {
            name: 'lapyen-cart-storage',
        }
    )
);
