import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { 
    mockInternalSupervisor, mockExternalSupervisor, mockInternalDrivers, mockWeeklySchedule, mockExternalRoutes,
    mockInternalRoutes
} from '../data/mock-data';
// FIX: Corrected import path for types from the shared logic package.
import type { 
    Driver, WeeklyScheduleItem, Supervisor, ExternalRoute,
    TransportationContextType,
    InternalRoute
} from '../packages/shared-logic/src/types';
import { useUI } from './UIContext';

const TransportationContext = createContext<TransportationContextType | undefined>(undefined);

export const useTransportation = (): TransportationContextType => {
    const context = useContext(TransportationContext);
    if (context === undefined) {
        throw new Error('useTransportation must be used within a TransportationProvider');
    }
    return context;
};

export const TransportationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { showToast, showConfirmation } = useUI();

    const [internalSupervisor, setInternalSupervisor] = useState<Supervisor>(mockInternalSupervisor);
    const [externalSupervisor, setExternalSupervisor] = useState<Supervisor>(mockExternalSupervisor);
    const [internalDrivers, setInternalDrivers] = useState<Driver[]>(mockInternalDrivers);
    const [weeklySchedule, setWeeklySchedule] = useState<WeeklyScheduleItem[]>(mockWeeklySchedule);
    const [externalRoutes, setExternalRoutes] = useState<ExternalRoute[]>(mockExternalRoutes);
    const [internalRoutes, setInternalRoutes] = useState<InternalRoute[]>(mockInternalRoutes);

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

    const handleSaveSupervisor = useCallback((type: 'internal' | 'external', supervisor: Supervisor) => {
        if (type === 'internal') setInternalSupervisor(supervisor);
        else setExternalSupervisor(supervisor);
        showToast('تم حفظ بيانات المشرف.');
    }, [showToast]);

    const handleSaveDriver = useCallback((driver: Omit<Driver, 'id'> & { id?: number }) => {
        genericSave<Driver>(internalDrivers, setInternalDrivers, driver, {}, 'السائق');
    }, [internalDrivers, genericSave]);
    
    const handleDeleteDriver = useCallback((driverId: number) => {
        genericDelete(setInternalDrivers, driverId, 'السائق');
    }, [genericDelete]);

    const handleSaveRoute = useCallback((route: Omit<ExternalRoute, 'id'> & { id?: number }) => {
        genericSave<ExternalRoute>(externalRoutes, setExternalRoutes, route, {}, 'المسار');
    }, [externalRoutes, genericSave]);

    const handleDeleteRoute = useCallback((routeId: number) => {
        genericDelete(setExternalRoutes, routeId, 'المسار');
    }, [genericDelete]);

    const handleSaveSchedule = useCallback((schedule: WeeklyScheduleItem[]) => {
        setWeeklySchedule(schedule);
        showToast('تم حفظ الجدول الأسبوعي.');
    }, [showToast]);

    const value: TransportationContextType = {
        transportation: {
            internalSupervisor,
            externalSupervisor,
            internalDrivers,
            weeklySchedule,
            externalRoutes,
            internalRoutes,
        },
        handleSaveSupervisor,
        handleSaveDriver,
        handleDeleteDriver,
        handleSaveRoute,
        handleDeleteRoute,
        handleSaveSchedule,
    };

    return (
        <TransportationContext.Provider value={value}>
            {children}
        </TransportationContext.Provider>
    );
};