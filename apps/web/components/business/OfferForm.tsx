import React, { useState } from 'react';
import type { ExclusiveOffer, Service } from '@helio/shared-logic';
import { InputField, TextareaField } from '../common/FormControls';
import ImageUploader from '../common/ImageUploader';

const OfferForm: React.FC<{
    onClose: () => void;
    onSave: (data: any) => void;
    services: Service[];
    offer: ExclusiveOffer | null;
}> = ({ onClose, onSave, services, offer }) => {
    const [formData, setFormData] = useState({
        title: offer?.title || '',
        description: offer?.description || '',
        serviceId: offer?.serviceId || (services.length > 0 ? services[0].id : ''),
        promoCode: offer?.promoCode || '',
        startDate: offer?.startDate || new Date().toISOString().split('T')[0],
        endDate: offer?.endDate || new Date().toISOString().split('T')[0],
    });
    const [image, setImage] = useState<string[]>(offer?.imageUrl ? [offer.imageUrl] : []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (image.length === 0) { alert('الرجاء إضافة صورة للعرض.'); return; }
        if (!formData.serviceId) { alert('الرجاء اختيار الخدمة المرتبطة بالعرض.'); return; }
        
        onSave({
            id: offer?.id,
            ...formData,
            serviceId: Number(formData.serviceId),
            imageUrl: image[0],
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <ImageUploader initialImages={image} onImagesChange={setImage} multiple={false} label="صورة العرض" />
            <InputField name="title" label="عنوان العرض" value={formData.title} onChange={handleChange} required />
            <TextareaField name="description" label="وصف العرض" value={formData.description} onChange={handleChange} required />
            <div>
                <label className="block text-sm font-medium mb-1">الخدمة المرتبطة</label>
                <select name="serviceId" value={formData.serviceId} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                    {services.length > 0 ? (
                        services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)
                    ) : (
                        <option value="" disabled>-- لا توجد خدمات متاحة --</option>
                    )}
                </select>
            </div>
            <InputField name="promoCode" label="كود الخصم (اختياري)" value={formData.promoCode} onChange={handleChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField name="startDate" label="تاريخ البدء" type="date" value={formData.startDate} onChange={handleChange} required />
                <InputField name="endDate" label="تاريخ الانتهاء" type="date" value={formData.endDate} onChange={handleChange} required />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">{offer ? 'حفظ التغييرات' : 'إرسال للمراجعة'}</button>
            </div>
        </form>
    );
};

export default OfferForm;