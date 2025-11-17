import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunity } from '../context/AppContext';
import { ArrowLeftIcon } from '../components/common/Icons';
import { InputField, TextareaField } from '../components/common/FormControls';
// FIX: Corrected import path for types.
import type { JobPosting } from '../../packages/shared-logic/src/types';

const NewJobPage: React.FC = () => {
    const navigate = useNavigate();
    const { handleSaveJobPosting } = useCommunity();
    const [formData, setFormData] = React.useState({
        title: '', companyName: '', description: '', location: 'هليوبوليس الجديدة',
        type: 'دوام كامل' as JobPosting['type'], contactInfo: '', duration: 30,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSaveJobPosting({
            ...formData,
            type: formData.type as JobPosting['type'],
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
                    <h1 className="text-2xl font-bold mb-6">إضافة إعلان وظيفة</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField name="title" label="المسمى الوظيفي" value={formData.title} onChange={handleChange} required />
                        <InputField name="companyName" label="اسم الشركة" value={formData.companyName} onChange={handleChange} required />
                        <TextareaField name="description" label="وصف الوظيفة" value={formData.description} onChange={handleChange} required />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField name="location" label="الموقع" value={formData.location} onChange={handleChange} required />
                            <div>
                                <label className="block text-sm font-medium mb-1">نوع الدوام</label>
                                <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                                    <option value="دوام كامل">دوام كامل</option>
                                    <option value="دوام جزئي">دوام جزئي</option>
                                    <option value="عقد">عقد</option>
                                    <option value="تدريب">تدريب</option>
                                </select>
                            </div>
                        </div>
                        <InputField name="contactInfo" label="معلومات التواصل (بريد إلكتروني أو هاتف)" value={formData.contactInfo} onChange={handleChange} required />
                        <div>
                            <label className="block text-sm font-medium mb-1">مدة عرض الإعلان</label>
                            <select name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                                <option value={30}>30 يوم</option>
                                <option value={60}>60 يوم</option>
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

export default NewJobPage;