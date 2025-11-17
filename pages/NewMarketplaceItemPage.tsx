import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunity } from '../context/AppContext';
import { ArrowLeftIcon } from '../components/common/Icons';
import ImageUploader from '../components/common/ImageUploader';
import { InputField, TextareaField } from '../components/common/FormControls';

const NewMarketplaceItemPage: React.FC = () => {
    const navigate = useNavigate();
    const { handleSaveMarketplaceItem } = useCommunity();
    const [formData, setFormData] = React.useState({
        title: '', description: '', price: '', category: '', contactPhone: '', duration: 30,
    });
    const [images, setImages] = React.useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) {
            alert('يرجى إضافة صورة واحدة على الأقل.');
            return;
        }
        handleSaveMarketplaceItem({
            ...formData,
            price: parseFloat(formData.price) || 0,
            images,
            duration: Number(formData.duration),
        });
        navigate('/community');
    };

    return (
        <div className="animate-fade-in container mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
            <div className="max-w-2xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-500 hover:underline mb-6">
                    <ArrowLeftIcon className="w-5 h-5"/>
                    <span>العودة إلى المجتمع</span>
                </button>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">إضافة إعلان جديد للبيع</h1>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <ImageUploader initialImages={images} onImagesChange={setImages} multiple maxFiles={5} label="صور المنتج" />
                        <InputField name="title" label="عنوان الإعلان" value={formData.title} onChange={handleChange} required />
                        <TextareaField name="description" label="الوصف" value={formData.description} onChange={handleChange} required />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField name="price" label="السعر (بالجنيه)" type="number" value={formData.price} onChange={handleChange} required />
                            <InputField name="category" label="الفئة" value={formData.category} onChange={handleChange} required placeholder="مثال: أثاث, إلكترونيات..."/>
                        </div>
                        <InputField name="contactPhone" label="رقم هاتف للتواصل" value={formData.contactPhone} onChange={handleChange} required />
                        <div>
                            <label className="block text-sm font-medium mb-1">مدة عرض الإعلان</label>
                            <select name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                                <option value={30}>30 يوم</option>
                                <option value={60}>60 يوم</option>
                                <option value={90}>90 يوم</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                            <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">إرسال للمراجعة</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewMarketplaceItemPage;