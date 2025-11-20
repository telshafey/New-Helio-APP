
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
    
    // Safe check for system preference
    const [isSystemDark, setIsSystemDark] = useState(() => {
        if (isWeb && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false; // Default to light if not on web or not supported
    });

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
        if (isWeb && window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent) => setIsSystemDark(e.matches);
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [isWeb]);

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

    useEffect(() => {
        if (isWeb && window.document) {
            const root = window.document.documentElement;
            root.classList.toggle('dark', isDarkMode);
        }
    }, [isDarkMode, isWeb]);

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
        // Web Geolocation
        if (isWeb && typeof navigator !== 'undefined' && navigator.geolocation) {
            setGeolocation({ loading: true, location: null, error: null });
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeolocation({
                        loading: false,
                        location: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                        error: null,
                    });
                },
                (error) => {
                    setGeolocation({
                        loading: false,
                        location: null,
                        error: error.message,
                    });
                }
            );
        } else {
            // TODO: Implement React Native specific geolocation (e.g. expo-location) in future
            setGeolocation({ loading: false, location: null, error: 'Geolocation is not supported or implemented on this device.' });
        }
    }, [isWeb]);

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
