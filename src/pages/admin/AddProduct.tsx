import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { categoryApi } from '../../api/categoryApi';
import { productApi } from '../../api/productApi';
import type { Category, ProductRequest } from '../../types/product';

type CategoryOption = Pick<Category, 'id' | 'name'>;

type ProductFormData = {
    name: string;
    description: string;
    price: number;
    unit: string;
    stock: number;
    imageUrl: string;
    categoryId: string;
    isActive: boolean;
};

const defaultFormData: ProductFormData = {
    name: '',
    description: '',
    price: 0,
    unit: 'Món',
    stock: 0,
    imageUrl: '',
    categoryId: '',
    isActive: true,
};

const AddProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(isEditMode);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const catData = await categoryApi.getAll();
                setCategories(catData.map(({ id, name }) => ({ id, name })));

                if (isEditMode && id) {
                    const productInfo = await productApi.getById(id);
                    setFormData({
                        name: productInfo.name,
                        description: productInfo.description || '',
                        price: productInfo.price,
                        unit: productInfo.unit || 'Món',
                        stock: productInfo.stock,
                        imageUrl: productInfo.imageUrl || '',
                        categoryId: productInfo.categoryId.toString(),
                        isActive: productInfo.isActive,
                    });
                }
            } catch (error) {
                console.error(error);
                alert('Lỗi khi tải dữ liệu. Hãy kiểm tra lại kết nối!');
            } finally {
                setFetchingData(false);
            }
        };

        loadInitialData();
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
            return;
        }

        if (name === 'price' || name === 'stock') {
            setFormData((prev) => ({ ...prev, [name]: Number(value) }));
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload: ProductRequest = {
                ...formData,
                categoryId: Number(formData.categoryId),
            };

            if (isEditMode && id) {
                await productApi.update(id, payload);
                alert('Đã cập nhật sản phẩm thành công!');
            } else {
                await productApi.create(payload);
                alert('Đã thêm sản phẩm mới vào kho!');
            }

            navigate('/admin/products');
        } catch (error) {
            console.error(error);
            alert('Thao tác thất bại. Hãy kiểm tra lại thông tin!');
        } finally {
            setLoading(false);
        }
    };

    if (fetchingData) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin text-[#1A202C]" size={40} />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl border border-[#DED6C4] bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-4 border-b border-[#DED6C4] pb-6">
                <Link to="/admin/products" className="rounded-full p-2 text-[#4A5568] transition-colors hover:bg-[#EBE7DF] hover:text-[#1A202C]">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h2 className="font-serif text-3xl italic text-[#1A202C]">
                        {isEditMode ? 'Chỉnh Sửa Sản Phẩm' : 'Nhập Sản Phẩm Mới'}
                    </h2>
                    <p className="mt-1 font-serif text-sm text-[#8B8378]">
                        {isEditMode ? 'Cập nhật lại thông tin của vật phẩm.' : 'Bổ sung vật phẩm mới vào kho lưu trữ.'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#8B8378]">Tên vật phẩm *</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-[#DED6C4] bg-[#F8F5EF] p-3 font-serif focus:border-[#1A202C] focus:outline-none" placeholder="VD: Muối hồng Aethelgard..." />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#8B8378]">Phân loại *</label>
                        <select required name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full border border-[#DED6C4] bg-[#F8F5EF] p-3 font-serif focus:border-[#1A202C] focus:outline-none">
                            <option value="" disabled>-- Chọn phân loại --</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#8B8378]">Giá quy đổi (VND) *</label>
                        <input required type="number" min="0" name="price" value={formData.price} onChange={handleChange} className="w-full border border-[#DED6C4] bg-[#F8F5EF] p-3 font-serif focus:border-[#1A202C] focus:outline-none" />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#8B8378]">Số lượng kho *</label>
                        <input required type="number" min="0" name="stock" value={formData.stock} onChange={handleChange} className="w-full border border-[#DED6C4] bg-[#F8F5EF] p-3 font-serif focus:border-[#1A202C] focus:outline-none" />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#8B8378]">Đơn vị đo lường</label>
                        <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="w-full border border-[#DED6C4] bg-[#F8F5EF] p-3 font-serif focus:border-[#1A202C] focus:outline-none" placeholder="VD: Món, Lọ, Quyển..." />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#8B8378]">Hình ảnh (URL) *</label>
                    <input required type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full border border-[#DED6C4] bg-[#F8F5EF] p-3 font-sans text-sm focus:border-[#1A202C] focus:outline-none" placeholder="https://..." />
                    {formData.imageUrl && (
                        <div className="mt-4 flex h-32 w-32 items-center justify-center border border-[#DED6C4] bg-[#1A1A1A] p-2">
                            <img src={formData.imageUrl} alt="Preview" className="max-h-full max-w-full object-contain" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150?text=Image+Error')} />
                        </div>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#8B8378]">Mô tả</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full resize-none border border-[#DED6C4] bg-[#F8F5EF] p-3 font-serif focus:border-[#1A202C] focus:outline-none" placeholder="Ghi chép về nguồn gốc của sản phẩm..." />
                </div>

                <div className="flex items-center gap-3 border border-[#DED6C4] bg-[#EBE7DF] p-4">
                    <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-5 w-5 cursor-pointer accent-[#1A202C]" />
                    <label htmlFor="isActive" className="cursor-pointer font-serif font-bold text-[#1A202C]">Cho phép lưu thông trên thị trường (Active)</label>
                </div>

                <div className="flex justify-end border-t border-[#DED6C4] pt-6">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-sm bg-[#1A202C] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#F5F2EB] transition-colors hover:bg-[#2C3338] disabled:opacity-50">
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {isEditMode ? 'Lưu Thay Đổi' : 'Tạo Mới'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
