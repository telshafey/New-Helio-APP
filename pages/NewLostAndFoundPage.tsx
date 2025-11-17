import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunity } from '../context/AppContext';
import { ArrowLeftIcon } from '../components/common/Icons';
import ImageUploader from '../components/common/ImageUploader';
import { InputField, TextareaField } from '../components/common/FormControls';

const NewLostAndFoundPage: React.FC = () => {
    const navigate = useNavigate();
    const { handleSaveLostAndFoundItem } = useCommunity();
    const [formData, setFormData] = React.useState({
        type: 'lost' as 'lost' | 'found',
        title: '',
        description: '',
        location: '',
        contactInfo: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [image, setImage] = React.useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSaveLostAndFoundItem({
            ...formData,
            imageUrl: image[0] || undefined,
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
                    <h1 className="text-2xl font-bold mb-6">إضافة بلاغ جديد</h1>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">نوع البلاغ</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                                <option value="lost">مفقود</option>
                                <option value="found">تم العثور عليه</option>
                            </select>
                        </div>
                        <InputField name="title" label="العنوان" value={formData.title} onChange={handleChange} required placeholder={formData.type === 'lost' ? 'مثال: فقدت مفاتيح سيارتي' : 'مثال: وجدت هاتف محمول'} />
                        <TextareaField name="description" label="الوصف" value={formData.description} onChange={handleChange} required />
                        <ImageUploader initialImages={image} onImagesChange={setImage} multiple={false} label="صورة (اختياري)" />
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField name="location" label="الموقع التقريبي" value={formData.location} onChange={handleChange} required placeholder="مثال: الحديقة المركزية"/>
                            <InputField name="date" label="تاريخ الفقد/العثور" type="date" value={formData.date} onChange={handleChange} required />
                        </div>
                        <InputField name="contactInfo" label="معلومات التواصل (هاتف أو بريد إلكتروني)" value={formData.contactInfo} onChange={handleChange} required />
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

export default NewLostAndFoundPage;