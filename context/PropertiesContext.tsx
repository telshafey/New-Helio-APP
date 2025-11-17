import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { mockProperties } from '../data/mock-data';
// FIX: Corrected import path for types from the shared logic package.
import type { Property, PropertiesContextType } from '../packages/shared-logic/src/types';
import { useUI } from './UIContext';

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export const useProperties = (): PropertiesContextType => {
    const context = useContext(PropertiesContext);
    if (context === undefined) {
        throw new Error('useProperties must be used within a PropertiesProvider');
    }
    return context;
};

export const PropertiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { showToast, showConfirmation } = useUI();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProperties(mockProperties);
            setLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

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

    const handleSaveProperty = useCallback((propertyData: Omit<Property, 'id' | 'views' | 'creationDate'> & { id?: number }) => {
        if (propertyData.id) {
            setProperties(prev => prev.map(p => (p.id === propertyData.id ? { ...p, ...propertyData } : p)));
            showToast('تم تحديث العقار بنجاح!');
        } else {
            const newProperty: Property = {
                id: Math.max(0, ...properties.map(p => p.id)) + 1,
                views: 0,
                creationDate: new Date().toISOString().split('T')[0],
                ...propertyData,
            };
            setProperties(prev => [newProperty, ...prev]);
            showToast('تمت إضافة العقار بنجاح!');
        }
    }, [properties, showToast]);

    const handleDeleteProperty = useCallback((propertyId: number) => {
        genericDelete(setProperties, propertyId, 'العقار');
    }, [genericDelete]);

    const value: PropertiesContextType = {
        properties,
        loading,
        handleSaveProperty,
        handleDeleteProperty,
    };

    return (
        <PropertiesContext.Provider value={value}>
            {children}
        </PropertiesContext.Provider>
    );
};