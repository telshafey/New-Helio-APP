import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeftIcon, MagnifyingGlassIcon, UserPlusIcon, PencilSquareIcon, 
    TrashIcon, UserGroupIcon, UserCircleIcon, CheckCircleIcon, ClockIcon, NoSymbolIcon, UserMinusIcon,
    ArrowUpCircleIcon, ArrowDownCircleIcon
} from '../components/common/Icons';
import { useUsers } from '../context/UsersContext';
import { useAuth } from '../context/AuthContext';
import type { AppUser, AdminUser, UserStatus, UserRole } from '../types';
import Modal from '../components/common/Modal';
import ImageUploader from '../components/common/ImageUploader';
import EmptyState from '../components/common/EmptyState';
import KpiCard from '../components/common/KpiCard';
import StatusBadge from '../components/common/StatusBadge';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; icon: React.ReactNode }> = ({ active, onClick, children, icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-md transition-colors focus:outline-none text-sm ${
            active
                ? 'bg-cyan-500 text-white shadow'
                : 'bg-slate-200/50 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
    >
        {icon}
        {children}
    </button>
);

const UserForm: React.FC<{
    user: AppUser | null;
    onSave: (user: Omit<AppUser, 'id' | 'joinDate'> & { id?: number }) => void;
    onClose: () => void;
}> = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        status: user?.status || 'active',
    });
    const [avatar, setAvatar] = useState<string[]>(user?.avatar ? [user.avatar] : []);

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, email: user.email, status: user.status });
            setAvatar(user.avatar ? [user.avatar] : []);
        } else {
            setFormData({ name: '', email: '', status: 'active' });
            setAvatar([]);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: user?.id,
            ...formData,
            status: formData.status as UserStatus,
            avatar: avatar[0] || `https://picsum.photos/200/200?random=${Date.now()}`,
            role: user?.role || 'user',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الاسم</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الحالة</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500">
                    <option value="active">مفعل</option>
                    <option value="pending">معلق</option>
                    <option value="banned">محظور</option>
                    <option value="deletion_requested">طلب حذف</option>
                </select>
            </div>
            <ImageUploader initialImages={avatar} onImagesChange={setAvatar} multiple={false} label="الصورة الرمزية" />
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-600 rounded-md hover:bg-slate-200 dark:hover:bg-slate-500">إلغاء</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600">حفظ</button>
            </div>
        </form>
    );
};

const AdminForm: React.FC<{
    admin: AdminUser | null;
    onSave: (admin: Omit<AdminUser, 'id'> & { id?: number }) => void;
    onClose: () => void;
}> = ({ admin, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: admin?.name || '',
        email: admin?.email || '',
        role: admin?.role || 'مسؤول ادارة الخدمات',
    });
    const [avatar, setAvatar] = useState<string[]>(admin?.avatar ? [admin.avatar] : []);

    useEffect(() => {
        if (admin) {
            setFormData({ name: admin.name, email: admin.email, role: admin.role });
            setAvatar(admin.avatar ? [admin.avatar] : []);
        } else {
            setFormData({ name: '', email: '', role: 'مسؤول ادارة الخدمات' });
            setAvatar([]);
        }
    }, [admin]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: admin?.id,
            ...formData,
            role: formData.role as AdminUser['role'],
            avatar: avatar[0] || `https://picsum.photos/200/200?random=${Date.now()}`,
        });
    };
    
    const adminRoles: AdminUser['role'][] = ['مسؤول العقارات', 'مسؤول الاخبار والاعلانات والاشعارات', 'مسؤول الباصات', 'مسؤول ادارة الخدمات', 'مدير عام'];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الاسم</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الدور</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500">
                    {adminRoles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
            </div>
            <ImageUploader initialImages={avatar} onImagesChange={setAvatar} multiple={false} label="الصورة الرمزية" />
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-600 rounded-md hover:bg-slate-200 dark:hover:bg-slate-500">إلغاء</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600">حفظ</button>
            </div>
        </form>
    );
};

const RegularUsersTab: React.FC<{ onAdd: () => void; onEdit: (user: AppUser) => void; }> = ({ onAdd, onEdit }) => {
    const { users, handleDeleteUser, updateUserRole } = useUsers();
    const { hasPermission } = useAuth();
    const canManage = hasPermission(['مدير عام']);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = statusFilter === 'all' || user.status === statusFilter;
            return matchesSearch && matchesFilter;
        });
    }, [users, searchTerm, statusFilter]);

    return (
        <div className="animate-fade-in">
             <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative flex-grow w-full sm:w-auto">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2" />
                    <input type="text" placeholder="بحث بالاسم أو البريد..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"/>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'all')} className="flex-grow sm:flex-grow-0 w-full sm:w-40 bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
                        <option value="all">كل الحالات</option>
                        <option value="active">مفعل</option>
                        <option value="pending">معلق</option>
                        <option value="banned">محظور</option>
                        <option value="deletion_requested">طلب حذف</option>
                    </select>
                     {canManage && (
                        <button onClick={onAdd} className="flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
                            <UserPlusIcon className="w-5 h-5" />
                            <span>إضافة</span>
                        </button>
                     )}
                </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">المستخدم</th>
                            <th scope="col" className="px-6 py-3">الدور</th>
                            <th scope="col" className="px-6 py-3">الحالة</th>
                            <th scope="col" className="px-6 py-3">تاريخ الانضمام</th>
                            {canManage && <th scope="col" className="px-6 py-3">إجراءات</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" loading="lazy"/>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                                            <div className="text-xs">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                 <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === 'service_provider' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300'}`}>
                                        {user.role === 'service_provider' ? 'مقدم خدمة' : 'مستخدم'}
                                    </span>
                                </td>
                                <td className="px-6 py-4"><StatusBadge status={user.status} /></td>
                                <td className="px-6 py-4">{user.joinDate}</td>
                                {canManage && (
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            {user.role === 'user' ? (
                                                <button onClick={() => updateUserRole(user.id, 'service_provider')} className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-md" title="ترقية إلى مقدم خدمة"><ArrowUpCircleIcon className="w-5 h-5" /></button>
                                            ) : (
                                                <button onClick={() => updateUserRole(user.id, 'user')} className="p-2 text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-md" title="تخفيض إلى مستخدم عادي"><ArrowDownCircleIcon className="w-5 h-5" /></button>
                                            )}
                                            <button onClick={() => onEdit(user)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md" title="تعديل"><PencilSquareIcon className="w-5 h-5" /></button>
                                            <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md" title="حذف"><TrashIcon className="w-5 h-5" /></button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredUsers.length === 0 && <p className="text-center py-8">لا يوجد مستخدمون يطابقون البحث.</p>}
            </div>
        </div>
    )
};

const AdminUsersTab: React.FC<{ onAdd: () => void; onEdit: (admin: AdminUser) => void; }> = ({ onAdd, onEdit }) => {
    const { admins, handleDeleteAdmin } = useUsers();
    const { hasPermission } = useAuth();
    const canManage = hasPermission(['مدير عام']);

    const roleCounts = useMemo(() => {
        return admins.reduce((acc, admin) => {
            acc[admin.role] = (acc[admin.role] || 0) + 1;
            return acc;
        }, {} as Record<AdminUser['role'], number>);
    }, [admins]);

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">ملخص أدوار المديرين</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.entries(roleCounts).map(([role, count]) => (
                        <div key={role} className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-center">
                            <p className="text-2xl font-bold text-cyan-500">{count as React.ReactNode}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{role}</p>
                        </div>
                    ))}
                </div>
            </div>

             {canManage && (
                <div className="flex justify-end mb-6">
                    <button onClick={onAdd} className="flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
                        <UserPlusIcon className="w-5 h-5" />
                        <span>إضافة مدير</span>
                    </button>
                </div>
             )}
             {admins.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">المدير</th>
                                <th scope="col" className="px-6 py-3">الدور</th>
                                {canManage && <th scope="col" className="px-6 py-3">إجراءات</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(admin => (
                                <tr key={admin.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={admin.avatar} alt={admin.name} className="w-10 h-10 rounded-full object-cover" loading="lazy"/>
                                            <div>
                                                <div className="font-semibold text-gray-900 dark:text-white">{admin.name}</div>
                                                <div className="text-xs">{admin.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300">{admin.role}</span>
                                    </td>
                                    {canManage && (
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => onEdit(admin)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md" title="تعديل"><PencilSquareIcon className="w-5 h-5" /></button>
                                                <button onClick={() => handleDeleteAdmin(admin.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md" title="حذف"><TrashIcon className="w-5 h-5" /></button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             ) : (
                <EmptyState
                    icon={<UserCircleIcon className="w-16 h-16 text-slate-400" />}
                    title="لا يوجد مديرون مضافون"
                    message="ابدأ بإضافة حسابات للمديرين والمشرفين للوصول إلى لوحة التحكم."
                >
                    {canManage && (
                        <button onClick={onAdd} className="flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
                            <UserPlusIcon className="w-5 h-5" />
                            <span>إضافة مدير جديد</span>
                        </button>
                    )}
                </EmptyState>
             )}
        </div>
    );
};

const UsersPage: React.FC = () => {
    const navigate = useNavigate();
    const { users, admins, handleSaveUser, handleSaveAdmin } = useUsers();
    const [activeTab, setActiveTab] = useState<'users' | 'admins'>('users');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<AppUser | null>(null);
    const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);

    const userStats = useMemo(() => {
        const total = users.length;
        const active = users.filter(u => u.status === 'active').length;
        const pending = users.filter(u => u.status === 'pending').length;
        const banned = users.filter(u => u.status === 'banned').length;
        const deletionRequested = users.filter(u => u.status === 'deletion_requested').length;
        return { total, active, pending, banned, deletionRequested };
    }, [users]);

    const handleOpenUserModal = (user: AppUser | null) => {
        setEditingUser(user);
        setEditingAdmin(null);
        setIsModalOpen(true);
    };
    
    const handleOpenAdminModal = (admin: AdminUser | null) => {
        setEditingAdmin(admin);
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setEditingAdmin(null);
    };
    
    const handleSaveAndCloseUser = (user: Omit<AppUser, 'id' | 'joinDate'> & { id?: number }) => {
        handleSaveUser(user);
        handleCloseModal();
    };

    const handleSaveAndCloseAdmin = (admin: Omit<AdminUser, 'id'> & { id?: number }) => {
        handleSaveAdmin(admin);
        handleCloseModal();
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <RegularUsersTab onAdd={() => handleOpenUserModal(null)} onEdit={handleOpenUserModal} />;
            case 'admins':
                return <AdminUsersTab onAdd={() => handleOpenAdminModal(null)} onEdit={handleOpenAdminModal} />;
            default:
                return null;
        }
    }

    return (
        <div className="animate-fade-in">
            <button onClick={() => navigate(-1)} className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-500 dark:text-cyan-400 hover:underline mb-6">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>العودة إلى لوحة التحكم</span>
            </button>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">إدارة المستخدمين</h1>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <KpiCard title="إجمالي المستخدمين" value={userStats.total.toString()} icon={<UserGroupIcon className="w-8 h-8 text-cyan-400"/>} />
                    <KpiCard title="المستخدمون النشطون" value={userStats.active.toString()} icon={<CheckCircleIcon className="w-8 h-8 text-green-400"/>} />
                    <KpiCard title="مستخدمون قيد المراجعة" value={userStats.pending.toString()} icon={<ClockIcon className="w-8 h-8 text-yellow-400"/>} />
                    <KpiCard title="طلبات حذف" value={userStats.deletionRequested.toString()} icon={<UserMinusIcon className="w-8 h-8 text-orange-400"/>} />
                    <KpiCard title="المستخدمون المحظورون" value={userStats.banned.toString()} icon={<NoSymbolIcon className="w-8 h-8 text-red-400"/>} />
                </div>
                
                <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<UserGroupIcon className="w-5 h-5" />}>المستخدمون</TabButton>
                    <TabButton active={activeTab === 'admins'} onClick={() => setActiveTab('admins')} icon={<UserCircleIcon className="w-5 h-5" />}>المديرون</TabButton>
                </div>

                {renderContent()}

            </div>
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                title={
                    activeTab === 'users' 
                        ? (editingUser ? 'تعديل مستخدم' : 'إضافة مستخدم جديد') 
                        : (editingAdmin ? 'تعديل مدير' : 'إضافة مدير جديد')
                }
            >
                {activeTab === 'users' ? (
                    <UserForm user={editingUser} onSave={handleSaveAndCloseUser} onClose={handleCloseModal} />
                ) : (
                    <AdminForm admin={editingAdmin} onSave={handleSaveAndCloseAdmin} onClose={handleCloseModal} />
                )}
            </Modal>
        </div>
    );
};

export default UsersPage;