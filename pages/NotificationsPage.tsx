import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon, PencilSquareIcon, TrashIcon, BellAlertIcon } from '../components/common/Icons';
import type { Notification, Service } from '../types';
import { useNews } from '../context/NewsContext';
import { useServices } from '../context/ServicesContext';
import Modal from '../components/common/Modal';
import ImageUploader from '../components/common/ImageUploader';
import EmptyState from '../components/common/EmptyState';

const NotificationForm: React.FC<{
    onSave: (notification: Omit<Notification, 'id'> & { id?: number }) => void;
    onClose: () => void;
    notification: Omit<Notification, 'id'> & { id?: number } | null;
    services: Service[];
}> = ({ onSave, onClose, notification, services }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [externalUrl, setExternalUrl] = useState('');
    const [serviceId, setServiceId] = useState<number | undefined>(undefined);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        if (notification) {
            setTitle(notification.title || '');
            setContent(notification.content || '');
            setImages(notification.imageUrl ? [notification.imageUrl] : []);
            setExternalUrl(notification.externalUrl || '');
            setServiceId(notification.serviceId);
            setStartDate(notification.startDate || '');
            setEndDate(notification.endDate || '');
        } else {
            setTitle('');
            setContent('');
            setImages([]);
            setExternalUrl('');
            setServiceId(undefined);
            const today = new Date().toISOString().split('T')[0];
            setStartDate(today);
            setEndDate(today);
        }
    }, [notification]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ 
            id: notification?.id, 
            title, 
            content, 
            imageUrl: images.length > 0 ? images[0] : undefined, 
            externalUrl, 
            serviceId, 
            startDate, 
            endDate 
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">العنوان</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500"/>
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">المحتوى</label>
                <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required rows={3} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500"></textarea>
            </div>
            <ImageUploader 
                initialImages={images} 
                onImagesChange={setImages} 
                multiple={false} 
                label="صورة (اختياري)"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">تاريخ البدء</label>
                    <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">تاريخ الانتهاء</label>
                    <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500" />
                </div>
            </div>
            <div>
                <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ربط بخدمة (اختياري)</label>
                <select id="serviceId" value={serviceId || ''} onChange={e => setServiceId(e.target.value ? parseInt(e.target.value) : undefined)} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500">
                    <option value="">-- لا يوجد --</option>
                    {services.map(service => <option key={service.id} value={service.id}>{service.name}</option>)}
                </select>
            </div>
             <div>
                <label htmlFor="externalUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">رابط خارجي (اختياري)</label>
                <input type="url" id="externalUrl" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500"/>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-600 rounded-md hover:bg-slate-200 dark:hover:bg-slate-500">إلغاء</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600">حفظ الإشعار</button>
            </div>
        </form>
    );
};

const StatusBadge: React.FC<{ startDate: string, endDate: string }> = ({ startDate, endDate }) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) {
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">مجدول</span>;
    } else if (today >= start && today <= end) {
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">نشط</span>;
    } else {
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">منتهي</span>;
    }
};

const NotificationsPage: React.FC = () => {
    const navigate = useNavigate();
    const { notifications, handleSaveNotification, handleDeleteNotification } = useNews();
    const { services } = useServices();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotification, setEditingNotification] = useState<Notification | null>(null);

    const handleAddClick = () => {
        setEditingNotification(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (notification: Notification) => {
        setEditingNotification(notification);
        setIsModalOpen(true);
    };
    
    return (
        <div className="animate-fade-in">
            <button onClick={() => navigate(-1)} className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-500 dark:text-cyan-400 hover:underline mb-6">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>العودة إلى لوحة التحكم</span>
            </button>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <BellAlertIcon className="w-8 h-8"/>
                        إدارة الإشعارات
                    </h1>
                    <button onClick={handleAddClick} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
                        <PlusIcon className="w-5 h-5" />
                        <span>إضافة إشعار جديد</span>
                    </button>
                </div>
                
                {notifications.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">العنوان</th>
                                    <th scope="col" className="px-6 py-3">الحالة</th>
                                    <th scope="col" className="px-6 py-3">فترة الصلاحية</th>
                                    <th scope="col" className="px-6 py-3">الخدمة المرتبطة</th>
                                    <th scope="col" className="px-6 py-3">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notifications.map(notification => (
                                    <tr key={notification.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{notification.title}</td>
                                        <td className="px-6 py-4"><StatusBadge startDate={notification.startDate} endDate={notification.endDate} /></td>
                                        <td className="px-6 py-4 text-xs font-mono">{notification.startDate} <br/> {notification.endDate}</td>
                                        <td className="px-6 py-4">{notification.serviceId ? services.find(s => s.id === notification.serviceId)?.name : 'لا يوجد'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEditClick(notification)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md"><PencilSquareIcon className="w-5 h-5" /></button>
                                                <button onClick={() => handleDeleteNotification(notification.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md"><TrashIcon className="w-5 h-5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState
                      icon={<BellAlertIcon className="w-16 h-16 text-slate-400" />}
                      title="لا توجد إشعارات حالياً"
                      message="يمكنك البدء بإضافة إشعار جديد لإعلام سكان المدينة بآخر المستجدات."
                    >
                        <button onClick={handleAddClick} className="flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
                            <PlusIcon className="w-5 h-5" />
                            <span>إضافة إشعار</span>
                        </button>
                    </EmptyState>
                )}
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title={editingNotification ? 'تعديل الإشعار' : 'إضافة إشعار جديد'}
            >
                <NotificationForm 
                    onSave={handleSaveNotification}
                    onClose={() => setIsModalOpen(false)}
                    notification={editingNotification}
                    services={services}
                />
            </Modal>
        </div>
    );
};

export default NotificationsPage;
