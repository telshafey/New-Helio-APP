
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect, useMemo } from 'react';
import type { ToastMessage, UIContextType, Theme, ConfirmationState, GeolocationState } from '../types';
import { storage } from '../utils/storage';

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUI = (): UIContextType => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};

const initialConfirmationState: ConfirmationState = {
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
};

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const isWeb = typeof window !== 'undefined';
    
    const [theme, setThemeState] = useState<Theme>(() => {
        const storedTheme = storage.getItem('theme') as Theme | null;
        if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
            return storedTheme;
        }
        return 'system'; 
    });
    
    const [isSystemDark, setIsSystemDark] = useState(false);

    const [confirmation, setConfirmation] = useState<ConfirmationState>(initialConfirmationState);

    const [dismissedNotificationIds, setDismissedNotificationIds] = useState<Set<number>>(() => {
        try {
            const item = storage.getItem('dismissedNotificationIds');
            return item ? new Set(JSON.parse(item)) : new Set();
        } catch (error) {
            console.error(error);
            return new Set();
        }
    });

    const [geolocation, setGeolocation] = useState<GeolocationState>({
        loading: false,
        location: null,
        error: null,
    });

    useEffect(() => {
        try {
            storage.setItem('dismissedNotificationIds', JSON.stringify(Array.from(dismissedNotificationIds)));
        } catch (error) {
            console.error(error);
        }
    }, [dismissedNotificationIds]);

    const isDarkMode = useMemo(() => {
        if (theme === 'system') return isSystemDark;
        return theme === 'dark';
    }, [theme, isSystemDark]);

    const setTheme = useCallback((newTheme: Theme) => {
        storage.setItem('theme', newTheme);
        setThemeState(newTheme);
    }, []);

    const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const dismissToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const showConfirmation = useCallback((title: string, message: string, onConfirm: () => void) => {
        setConfirmation({ isOpen: true, title, message, onConfirm });
    }, []);

    const hideConfirmation = useCallback(() => {
        setConfirmation(initialConfirmationState);
    }, []);

    const dismissNotification = useCallback((id: number) => {
        setDismissedNotificationIds(prev => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
        });
    }, []);
    
    const dismissAllNotifications = useCallback((allIds: number[]) => {
        setDismissedNotificationIds(prev => {
            const newSet = new Set(prev);
            allIds.forEach(id => newSet.add(id));
            return newSet;
        });
    }, []);

    const requestLocation = useCallback(() => {
        // Stub for mobile geolocation
         setGeolocation({ loading: false, location: null, error: 'Geolocation not fully implemented on mobile yet.' });
    }, []);

    const value: UIContextType = {
        theme,
        setTheme,
        isDarkMode,
        toasts,
        showToast,
        dismissToast,
        confirmation,
        showConfirmation,
        hideConfirmation,
        dismissedNotificationIds,
        dismissNotification,
        dismissAllNotifications,
        geolocation,
        requestLocation,
    };

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    );
};