import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../packages/shared-logic/context/UsersContext';
import { useServices } from '../../packages/shared-logic/context/ServicesContext';
import { useAuth } from '../../packages/shared-logic/context/AuthContext';
import { useUI } from '../../packages/shared-logic/context/UIContext';
import { ArrowLeftIcon, UserCircleIcon, PencilIcon, StarIcon, ChatBubbleOvalLeftIcon, HeartIconSolid, TrashIcon, Cog6ToothIcon, SunIcon, MoonIcon, ComputerDesktopIcon } from '../components/common/Icons';
import Modal from '../components/common/Modal';
import ImageUploader from '../components/common/ImageUploader';
import type { AppUser, Theme } from '../../packages/shared-logic/types';
import ServiceCard from '../components/common/ServiceCard';

const EditProfileForm: React.FC<{ user: AppUser; onSave: (data: Omit<AppUser, 'joinDate' | 'status' | 'role' | 'password'>) => void; onClose: () => void }> = ({ user, onSave, onClose }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState([user.avatar]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: user.id, name, email, avatar: avatar[0] });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <ImageUploader initialImages={avatar} onImagesChange={setAvatar} multiple={false} label="الصورة الرمزية" />
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الاسم</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-600 rounded-md hover:bg-slate-200 dark:hover:bg-slate-500">إلغاء</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600">حفظ التغييرات</button>
            </div>
        </form>
    );
};

const ThemeSelector: React.FC = () => {
    const { theme, setTheme } = useUI();
    
    const options: { value: Theme, label: string, icon: React.ReactNode }[] = [
        { value: 'light', label: 'فاتح', icon: <SunIcon className="w-5 h-5"/> },
        { value: 'dark', label: 'داكن', icon: <MoonIcon className="w-5 h-5"/> },
        { value: 'system', label: 'النظام', icon: <ComputerDesktopIcon className="w-5 h-5"/> },
    ];

    return (
        <div className="bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg flex gap-1">
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                        theme === option.value 
                        ? 'bg-white dark:bg-slate-800 shadow text-cyan-500' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                    }`}
                >
                    {option.icon}
                    {option.label}
                </button>
            ))}
        </div>
    );
}

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { requestAccountDeletion } = useUsers();
    const { services } = useServices();
    const { currentPublicUser, updateProfile, publicLogout } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const userReviews = useMemo(() => {
        if (!currentPublicUser) return [];
        return services.flatMap(service =>
            service.reviews
                .filter(review => review.userId === currentPublicUser.id)
                .map(review => ({ ...review, serviceName: service.name }))
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [currentPublicUser, services]);

    const favoriteServices = useMemo(() => {
        if (!currentPublicUser) return [];
        return services.filter(service => service.isFavorite);
    }, [currentPublicUser, services]);

    if (!currentPublicUser) {
        return null; // Or a loading/error state
    }
    
    const handleSaveProfile = (data: Omit<AppUser, 'joinDate' | 'status' | 'password' | 'role'>) => {
        updateProfile({ ...currentPublicUser, ...data });
    };

    const handleConfirmDeletion = () => {
        if (currentPublicUser) {
            requestAccountDeletion(currentPublicUser.id);
            setIsDeleteModalOpen(false);
            setTimeout(() => {
                publicLogout();
                navigate('/');
            }, 1000);
        }
    };

    return (
        <div className="animate-fade-in" dir="rtl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                            <img src={currentPublicUser.avatar} alt={currentPublicUser.name} className="w-32 h-32 rounded-full object-cover ring-4 ring-cyan-500/50" />
                            <div className="text-center sm:text-right flex-grow">
                                <h1 className="text-3xl font-bold text-gray-800 dark:text