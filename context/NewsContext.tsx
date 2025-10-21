import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
// FIX: Corrected import paths for monorepo structure
import { mockNews, mockNotifications, mockAdvertisements } from '../data/mock-data';
import type { News, Notification, Advertisement, NewsContextType } from '../types';
import { useUI } from './UIContext';

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNews = (): NewsContextType => {
    const context = useContext(NewsContext);
    if (context === undefined) {
        throw new Error('useNews must be used within a NewsProvider');
    }
    return context;
};

export const NewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { showToast, showConfirmation } = useUI();

    const [news, setNews] = useState<News[]>(mockNews);
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [advertisements, setAdvertisements] = useState<Advertisement[]>(mockAdvertisements);

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
    
    const handleSaveNews = useCallback((newsItem: Omit<News, 'id' | 'date' | 'author' | 'views'> & { id?: number }) => {
        genericSave<News>(news, setNews, newsItem, {author: 'Admin', date: new Date().toISOString().split('T')[0], views: 0 }, 'الخبر');
    }, [news, genericSave]);

    const handleDeleteNews = useCallback((newsId: number) => genericDelete(setNews, newsId, 'الخبر'), [genericDelete]);

    const handleSaveNotification = useCallback((notification: Omit<Notification, 'id'> & { id?: number }) => genericSave<Notification>(notifications, setNotifications, notification, {}, 'الإشعار'), [notifications, genericSave]);

    const handleDeleteNotification = useCallback((notificationId: number) => genericDelete(setNotifications, notificationId, 'الإشعار'), [genericDelete]);
    
    const handleSaveAdvertisement = useCallback((ad: Omit<Advertisement, 'id'> & { id?: number }) => genericSave<Advertisement>(advertisements, setAdvertisements, ad, {}, 'الإعلان'), [advertisements, genericSave]);
    
    const handleDeleteAdvertisement = useCallback((adId: number) => genericDelete(setAdvertisements, adId, 'الإعلان'), [genericDelete]);

    const value: NewsContextType = {
        news,
        notifications,
        advertisements,
        handleSaveNews,
        handleDeleteNews,
        handleSaveNotification,
        handleDeleteNotification,
        handleSaveAdvertisement,
        handleDeleteAdvertisement,
    };

    return (
        <NewsContext.Provider value={value}>
            {children}
        </NewsContext.Provider>
    );
};