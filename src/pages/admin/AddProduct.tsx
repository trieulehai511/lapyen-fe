import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { productApi } from '../../api/productApi';
import { categoryApi } from '../../api/categoryApi';
import type { Category, ProductRequest } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, ImagePlus, Loader2 } from 'lucide-react';

const AddProduct: React.FC = () => {
    const { register, handleSubmit } = useForm<ProductRequest>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        categoryApi.getAll().then(setCategories);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

    const onSubmit = async (data: ProductRequest) => {
        try {
            setUploading(true);
            let finalImageUrl = "/media/img_default.png";
            if (file) {
                finalImageUrl = await productApi.uploadImage(file);
            }

            data.imageUrl = finalImageUrl;
            data.categoryId = Number(data.categoryId);
            data.isActive = true;

            await productApi.create(data); 
            alert("Hàng đã về kho!");
            navigate('/admin/products'); 
        } catch (error) {
            console.error(error);
            alert("Lỗi rồi sếp ơi!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-vintage-card p-8 border-2 border-vintage-primary shadow-[15px_15px_0px_0px_rgba(139,90,43,0.1)]">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-vintage-primary mb-6 hover:underline font-serif">
                <ArrowLeft size={18} /> Quay lại sổ cái
            </button>

            <h2 className="text-3xl font-serif text-vintage-primary mb-8 text-center border-b-2 border-vintage-secondary pb-4 italic">
                Nhập Thêm Mặt Hàng
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-serif">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-vintage-secondary p-4 bg-white/30">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover border-2 border-vintage-primary shadow-md mb-4" />
                    ) : (
                        <ImagePlus size={48} className="text-vintage-secondary mb-2" />
                    )}
                    
                    <label className="bg-vintage-secondary text-vintage-bg px-4 py-2 cursor-pointer hover:bg-vintage-primary transition-all">
                        {imagePreview ? "Đổi ảnh khác" : "Chọn ảnh mặt hàng"}
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block mb-1 font-bold">Tên mặt hàng</label>
                        <input {...register("name", { required: true })} className="w-full bg-transparent border-b border-vintage-secondary p-2 outline-none focus:border-vintage-primary" />
                    </div>
                    <div>
                        <label className="block mb-1 font-bold">Giá bán (VNĐ)</label>
                        <input type="number" {...register("price", { required: true })} className="w-full bg-transparent border-b border-vintage-secondary p-2 outline-none" />
                    </div>
                    <div>
                        <label className="block mb-1 font-bold">Đơn vị</label>
                        <input {...register("unit")} className="w-full bg-transparent border-b border-vintage-secondary p-2 outline-none" placeholder="Cái, kg, ly..." />
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-1 font-bold">Phân loại</label>
                        <select {...register("categoryId", { required: true })} className="w-full bg-vintage-card border border-vintage-secondary p-2 outline-none">
                            <option value="">-- Chọn danh mục --</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>
                <button 
                    disabled={uploading}
                    type="submit" 
                    className="w-full bg-vintage-primary text-vintage-bg py-4 flex items-center justify-center gap-3 hover:bg-vintage-text transition-all font-bold"
                >
                    {uploading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <><Save size={20} /> Đóng dấu lưu kho</>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
