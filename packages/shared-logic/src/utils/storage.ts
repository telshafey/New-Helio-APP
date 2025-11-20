
const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// In-memory fallback for environments without localStorage (like React Native initial load or server-side)
const memoryStorage = new Map<string, string>();
const memorySession = new Map<string, string>();

export const storage = {
    // Persistent Storage (localStorage)
    getItem: (key: string): string | null => {
        if (isWeb) {
            try {
                return window.localStorage.getItem(key);
            } catch (e) {
                console.warn('LocalStorage access denied', e);
                return memoryStorage.get(key) || null;
            }
        }
        return memoryStorage.get(key) || null;
    },
    setItem: (key: string, value: string): void => {
        if (isWeb) {
            try {
                window.localStorage.setItem(key, value);
            } catch (e) {
                console.warn('LocalStorage access denied', e);
            }
        }
        memoryStorage.set(key, value);
    },
    removeItem: (key: string): void => {
        if (isWeb) {
            try {
                window.localStorage.removeItem(key);
            } catch (e) {
                console.warn('LocalStorage access denied', e);
            }
        }
        memoryStorage.delete(key);
    },

    // Session Storage
    getSessionItem: (key: string): string | null => {
        if (isWeb) {
            try {
                return window.sessionStorage.getItem(key);
            } catch (e) {
                return memorySession.get(key) || null;
            }
        }
        return memorySession.get(key) || null;
    },
    setSessionItem: (key: string, value: string): void => {
        if (isWeb) {
            try {
                window.sessionStorage.setItem(key, value);
            } catch (e) {
                console.warn('SessionStorage access denied', e);
            }
        }
        memorySession.set(key, value);
    },
    removeSessionItem: (key: string): void => {
        if (isWeb) {
            try {
                window.sessionStorage.removeItem(key);
            } catch (e) {
                 console.warn('SessionStorage access denied', e);
            }
        }
        memorySession.delete(key);
    }
};
