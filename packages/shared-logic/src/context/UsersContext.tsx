import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { mockUsers, mockAdmins, mockAuditLogs } from '../data/mock-data';
// FIX: Corrected import path for types from the shared logic package.
import type { AppUser, AdminUser, AuditLog, UsersContextType, UserRole } from '../types';
import { useUI } from './UIContext';

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const useUsers = (): UsersContextType => {
    const context = useContext(UsersContext);
    if (context === undefined) {
        throw new Error('useUsers must be used within a UsersProvider');
    }
    return context;
};

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { showToast, showConfirmation } = useUI();

    const [users, setUsers] = useState<AppUser[]>(mockUsers);
    const [admins, setAdmins] = useState<AdminUser[]>(mockAdmins);
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

    const genericDelete = useCallback((setItems: React.Dispatch<React.SetStateAction<any[]>>, itemId: number, itemType: string) => {
        showConfirmation(
            `تأكيد حذف ${itemType}`,
            `هل أنت متأكد أنك تريد حذف هذا الـ ${itemType}؟ لا يمكن التراجع عن هذا الإجراء.`,
            () => {
                setItems(prev => prev.filter(item => item.id !== itemId));
                showToast(`تم حذف ${itemType}.`);
            }
        );
    }, [showConfirmation, showToast]);

    const requestAccountDeletion = useCallback((userId: number) => {
        setUsers(prev => prev.map(u => (u.id === userId ? { ...u, status: 'deletion_requested' } : u)));
        showToast('تم استلام طلب حذف حسابك بنجاح.');
    }, [showToast]);

    const handleSaveUser = useCallback((userData: Omit<AppUser, 'id' | 'joinDate'> & { id?: number }) => {
        if (userData.id) {
            setUsers(prev => prev.map(u => u.id === userData.id ? { ...u, ...userData } : u));
            showToast('تم تحديث بيانات المستخدم.');
        } else {
            const newUser: AppUser = {
                id: Math.max(...users.map(u => u.id), 0) + 1, joinDate: new Date().toISOString().split('T')[0], ...userData
            } as AppUser;
            setUsers(prev => [newUser, ...prev]);
            showToast('تمت إضافة المستخدم.');
        }
    }, [users, showToast]);

    const handleDeleteUser = useCallback((userId: number) => {
        genericDelete(setUsers, userId, 'المستخدم');
    }, [genericDelete]);
    
    const updateUserRole = useCallback((userId: number, role: UserRole) => {
        setUsers(prev => prev.map(user => user.id === userId ? { ...user, role } : user));
        const roleText = role === 'service_provider' ? 'مقدم خدمة' : 'مستخدم عادي';
        showToast(`تم تحديث دور المستخدم إلى ${roleText}.`);
    }, [showToast]);

    const handleSaveAdmin = useCallback((adminData: Omit<AdminUser, 'id'> & { id?: number }) => {
        if (adminData.id) {
            setAdmins(prev => prev.map(a => a.id === adminData.id ? { ...a, ...adminData } : a));
            showToast('تم تحديث بيانات المدير.');
        } else {
            const newAdmin: AdminUser = {
                id: Math.max(...admins.map(a => a.id), 0) + 1, ...adminData
            } as AdminUser;
            setAdmins(prev => [newAdmin, ...prev]);
            showToast('تمت إضافة المدير.');
        }
    }, [admins, showToast]);

    const handleDeleteAdmin = useCallback((adminId: number) => {
        genericDelete(setAdmins, adminId, 'المدير');
    }, [genericDelete]);
    
    const value: UsersContextType = {
        users,
        admins,
        auditLogs,
        requestAccountDeletion,
        handleSaveUser,
        handleDeleteUser,
        updateUserRole,
        handleSaveAdmin,
        handleDeleteAdmin
    };

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    );
};