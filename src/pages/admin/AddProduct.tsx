import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, ImagePlus, Loader2 } from 'lucide-react';
import { productApi } from '../../api/productApi';
import { categoryApi } from '../../api/categoryApi';
import type { Category, ProductRequest } from '../../types/product';

const AddProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductRequest>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            unit: '',
            stock: 0,
            imageUrl: '',
            isActive: true,
        },
    });

    useEffect(() => {
        categoryApi.getAll().then(setCategories);

        if (!isEditMode || !id) {
            return;
        }

        productApi.getById(id)
            .then((product) => {
                setValue('name', product.name);
                setValue('description', product.description ?? '');
                setValue('price', product.price);
                setValue('unit', product.unit ?? '');
                setValue('stock', product.stock ?? 0);
                setValue('imageUrl', product.imageUrl ?? '');
                setValue('isActive', product.isActive);
                setValue('categoryId', product.categoryId);
                setImagePreview(product.imageUrl);
            })
            .catch((error) => {
                console.error(error);
                alert('Khong tim thay thong tin mat hang nay!');
                navigate('/admin/products');
            });
    }, [id, isEditMode, navigate, setValue]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) {
            return;
        }

        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
    };

    const onSubmit = async (data: ProductRequest) => {
        try {
            setUploading(true);

            let finalImageUrl = imagePreview || '/media/img_default.png';
            if (file) {
                finalImageUrl = await productApi.uploadImage(file);
            }

            const payload: ProductRequest = {
                ...data,
                name: data.name.trim(),
                description: data.description?.trim() || '',
                unit: data.unit?.trim() || '',
                price: Number(data.price),
                stock: Number(data.stock ?? 0),
                imageUrl: finalImageUrl,
                categoryId: Number(data.categoryId),
                isActive: true,
            };

            if (isEditMode && id) {
                await productApi.update(id, payload);
                alert('Da cap nhat san pham thanh cong!');
            } else {
                await productApi.create(payload);
                alert('Da them san pham moi!');
            }

            navigate('/admin/products');
        } catch (error) {
            console.error(error);
            alert('Co loi xay ra khi luu san pham!');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-vintage-card p-8 border-2 border-vintage-primary shadow-[15px_15px_0px_0px_rgba(139,90,43,0.1)]">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-vintage-primary mb-6 hover:underline font-serif"
            >
                <ArrowLeft size={18} /> Quay lai
            </button>

            <h3 className="text-3xl font-serif text-vintage-primary mb-8 text-center border-b-2 border-vintage-secondary pb-4 italic">
                {isEditMode ? 'SỬA SẢN PHẨM' : 'THÊM SẢN PHẨM'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-serif">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-vintage-secondary p-4 bg-white/30">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-40 h-40 object-cover border-2 border-vintage-primary shadow-md mb-4"
                        />
                    ) : (
                        <ImagePlus size={48} className="text-vintage-secondary mb-2" />
                    )}

                    <label className="bg-vintage-secondary text-vintage-bg px-4 py-2 cursor-pointer hover:bg-vintage-primary transition-all">
                        {imagePreview ? 'Doi anh khac' : 'Chon anh san pham'}
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block mb-1 font-bold">Ten san pham</label>
                        <input
                            {...register('name', { required: true })}
                            className="w-full bg-transparent border-b border-vintage-secondary p-2 outline-none focus:border-vintage-primary"
                        />
                        {errors.name && (
                            <p className="text-red-700 text-xs italic mt-1">Vui long nhap ten san pham.</p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1 font-bold">Mo ta</label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="w-full bg-transparent border border-vintage-secondary p-2 outline-none focus:border-vintage-primary resize-none"
                            placeholder="Them mo ta cho san pham..."
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-bold">Gia ban (VND)</label>
                        <input
                            type="number"
                            {...register('price', { required: true, valueAsNumber: true })}
                            className="w-full bg-transparent border-b border-vintage-secondary p-2 outline-none"
                        />
                        {errors.price && (
                            <p className="text-red-700 text-xs italic mt-1">Vui long nhap gia ban.</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-bold">Don vi</label>
                        <input
                            {...register('unit')}
                            className="w-full bg-transparent border-b border-vintage-secondary p-2 outline-none"
                            placeholder="Cai, kg, ly..."
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-bold">So luong ton</label>
                        <input
                            type="number"
                            min={0}
                            {...register('stock', { required: true, valueAsNumber: true, min: 0 })}
                            className="w-full bg-transparent border-b border-vintage-secondary p-2 outline-none"
                        />
                        {errors.stock && (
                            <p className="text-red-700 text-xs italic mt-1">Vui long nhap so luong hop le.</p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1 font-bold">Phan loai</label>
                        <select
                            {...register('categoryId', { required: true, valueAsNumber: true })}
                            className="w-full bg-vintage-card border border-vintage-secondary p-2 outline-none"
                            defaultValue=""
                        >
                            <option value="">-- Chon danh muc --</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <p className="text-red-700 text-xs italic mt-1">Vui long chon danh muc.</p>
                        )}
                    </div>
                </div>

                <button
                    disabled={uploading}
                    type="submit"
                    className="w-full bg-vintage-primary text-vintage-bg py-4 flex items-center justify-center gap-3 hover:bg-vintage-text transition-all font-bold"
                >
                    {uploading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Luu san pham</>}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
