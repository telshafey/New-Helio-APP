import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';
import { 
    mockEmergencyContacts, mockServiceGuides,
    mockPublicPagesContent,
} from '../data/mock-data';
// FIX: Corrected import path for types from the shared logic package.
import type { 
    EmergencyContact, ServiceGuide,
    PublicPagesContent,
    DataContextType
} from '../../packages/shared-logic/src/types';
import { useUI } from './UIContext';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { showToast, showConfirmation } = useUI();

    // State
    const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(mockEmergencyContacts);
    const [serviceGuides, setServiceGuides] = useState<ServiceGuide[]>(mockServiceGuides);
    const [publicPagesContent, setPublicPagesContent] = useState<PublicPagesContent>(mockPublicPagesContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setEmergencyContacts(mockEmergencyContacts);
            setServiceGuides(mockServiceGuides);
            setPublicPagesContent(mockPublicPagesContent);
            setLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // --- GENERIC HELPERS ---
    const genericSave = <T extends { id?: number }>(
        items: T[],
        setItems: React.Dispatch<React.SetStateAction<T[]>>,
        newItemData: Partial<T> & { id?: number },
        defaults: Partial<Omit<T, 'id'>>,
        itemName: string
    ) => {
        if (newItemData.id) {
            setItems(prev => prev.map(item => item.id === newItemData.id ? { ...item, ...newItemData } : item));
            showToast(`تم تحديث ${itemName}.`);
        } else {
            const newItem = {
                ...defaults,
                ...newItemData,
                id: Math.max(0, ...items.map(i => i.id ?? 0)) + 1,
            };
            setItems(prev => [newItem as T, ...prev]);
            showToast(`تمت إضافة ${itemName}.`);
        }
    };
    
    const genericDelete = <T extends {id: number}>(
        setItems: React.Dispatch<React.SetStateAction<T[]>>,
        itemId: number,
        itemType: string
    ) => {
        showConfirmation(
            `تأكيد حذف ${itemType}`,
            `هل أنت متأكد أنك تريد حذف هذا الـ ${itemType}؟ لا يمكن التراجع عن هذا الإجراء.`,
            () => {
                setItems(prev => prev.filter(item => item.id !== itemId));
                showToast(`تم حذف ${itemType}.`);
            }
        );
    };
        
    // --- OTHER DATA HANDLERS ---
    const handleSaveEmergencyContact = useCallback((contact: Omit<EmergencyContact, 'id'> & { id?: number }) => genericSave<EmergencyContact>(emergencyContacts, setEmergencyContacts, contact, {}, 'رقم الطوارئ'), [emergencyContacts, genericSave]);
    
    const handleDeleteEmergencyContact = useCallback((contactId: number) => genericDelete(setEmergencyContacts, contactId, 'رقم الطوارئ'), [genericDelete]);

    const handleSaveServiceGuide = useCallback((guide: Omit<ServiceGuide, 'id'> & { id?: number }) => genericSave<ServiceGuide>(serviceGuides, setServiceGuides, guide, {}, 'دليل الخدمة'), [serviceGuides, genericSave]);
    
    const handleDeleteServiceGuide = useCallback((guideId: number) => genericDelete(setServiceGuides, guideId, 'دليل الخدمة'), [genericDelete]);

    const handleUpdatePublicPageContent = useCallback(<K extends keyof PublicPagesContent>(page: K, content: PublicPagesContent[K]) => {
        setPublicPagesContent(prev => ({...prev, [page]: content}));
        showToast('تم تحديث محتوى الصفحة بنجاح.');
    }, [showToast]);

    const value: DataContextType = {
        emergencyContacts, serviceGuides,
        publicPagesContent,
        // FIX: Added missing 'loading' property to the context value.
        loading,
        handleSaveEmergencyContact, handleDeleteEmergencyContact,
        handleSaveServiceGuide, handleDeleteServiceGuide,
        handleUpdatePublicPageContent,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};